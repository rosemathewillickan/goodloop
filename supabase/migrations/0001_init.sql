-- GoodLoop MVP schema: roles, core entities, timeline, RLS, state-machine RPCs.
-- Run once in Supabase SQL Editor on a fresh project.

create extension if not exists pgcrypto;

-- ============================================================
-- 1. TABLES
-- ============================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('restaurant', 'volunteer', 'ngo', 'admin')),
  name text not null default '',
  phone text,
  verification_status text not null default 'pending' check (verification_status in ('pending', 'verified', 'rejected')),
  created_at timestamptz not null default now()
);

create table public.restaurants (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  organization_name text not null default '',
  address_text text,
  lat double precision,
  lng double precision
);

create table public.volunteers (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  vehicle_type text,
  service_radius_km numeric not null default 5,
  available boolean not null default false
);

create table public.ngo_partners (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  organization_name text not null default ''
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.profiles(id),
  food_type text not null,
  quantity_meals int not null check (quantity_meals > 0),
  dietary_info text,
  pickup_deadline timestamptz not null,
  address_text text,
  lat double precision not null,
  lng double precision not null,
  status text not null default 'available'
    check (status in ('available', 'assigned', 'picked_up', 'distributed', 'expired', 'cancelled')),
  cancel_reason text,
  created_at timestamptz not null default now()
);

create table public.donation_events (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  event_type text not null,
  actor_id uuid references public.profiles(id),
  note text,
  created_at timestamptz not null default now()
);

create table public.need_zones (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id),
  location_text text not null,
  lat double precision not null,
  lng double precision not null,
  estimated_people int,
  urgency text not null default 'medium' check (urgency in ('low', 'medium', 'high')),
  recurring boolean not null default false,
  status text not null default 'pending_verification'
    check (status in ('pending_verification', 'active', 'expired', 'rejected')),
  verified_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.food_runs (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id),
  need_zone_id uuid not null references public.need_zones(id),
  volunteer_id uuid references public.profiles(id),
  ngo_id uuid references public.profiles(id),
  status text not null default 'assigned' check (status in ('assigned', 'picked_up', 'distributed', 'failed')),
  assigned_by uuid not null references public.profiles(id),
  picked_up_at timestamptz,
  distributed_at timestamptz,
  meals_distributed int,
  failure_reason text,
  created_at timestamptz not null default now(),
  constraint chk_runner_present check (volunteer_id is not null or ngo_id is not null or status = 'assigned')
);

-- Only one non-failed run per donation.
create unique index donations_one_active_run
  on public.food_runs (donation_id)
  where status <> 'failed';

create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.food_runs(id),
  reporter_id uuid not null references public.profiles(id),
  category text not null check (category in ('food_safety', 'pickup', 'volunteer', 'distribution', 'misinformation', 'other')),
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high')),
  status text not null default 'open' check (status in ('open', 'resolved', 'escalated')),
  description text,
  resolution_note text,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  message text not null,
  channel text not null default 'app' check (channel in ('app', 'whatsapp', 'sms')),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 2. HELPERS
-- ============================================================

create function public.is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false);
$$;

create function public.is_verified(p_role text) returns boolean
  language sql stable security definer set search_path = public as $$
  select coalesce(
    (select role = p_role and verification_status = 'verified' from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ============================================================
-- 3. NEW-USER PROVISIONING
-- ============================================================

create function public.handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
declare
  v_role text := new.raw_user_meta_data->>'role';
  v_name text := coalesce(new.raw_user_meta_data->>'name', '');
  v_phone text := new.raw_user_meta_data->>'phone';
  v_org text := coalesce(new.raw_user_meta_data->>'organization_name', '');
begin
  -- 'admin' can never be granted via signup metadata; only via a manual SQL promotion.
  if v_role is null or v_role not in ('restaurant', 'volunteer', 'ngo') then
    v_role := 'volunteer';
  end if;

  insert into public.profiles (id, role, name, phone)
  values (new.id, v_role, v_name, v_phone);

  if v_role = 'restaurant' then
    insert into public.restaurants (profile_id, organization_name) values (new.id, v_org);
  elsif v_role = 'volunteer' then
    insert into public.volunteers (profile_id) values (new.id);
  elsif v_role = 'ngo' then
    insert into public.ngo_partners (profile_id, organization_name) values (new.id, v_org);
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Block role/verification_status escalation from a plain profile self-update.
-- auth.uid() is NULL for raw SQL (SQL Editor, service-role) — that's already a
-- trusted context, so only enforce this guard for actual PostgREST/RPC callers.
create function public.guard_profile_update() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.role := old.role;
    new.verification_status := old.verification_status;
  end if;
  return new;
end;
$$;

create trigger profiles_guard_update
  before update on public.profiles
  for each row execute function public.guard_profile_update();

-- ============================================================
-- 4. ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.restaurants enable row level security;
alter table public.volunteers enable row level security;
alter table public.ngo_partners enable row level security;
alter table public.donations enable row level security;
alter table public.donation_events enable row level security;
alter table public.need_zones enable row level security;
alter table public.food_runs enable row level security;
alter table public.incidents enable row level security;
alter table public.notifications enable row level security;

-- profiles: any authenticated user can read basic profile info (needed to show
-- who posted/accepted a run); only the owner (non-privileged fields) or admin can write.
create policy profiles_select on public.profiles for select to authenticated using (true);
create policy profiles_update_self on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_admin());

-- restaurants / volunteers / ngo_partners: readable by any authenticated user
-- (needed for pickup coordination + operator directory); writable by owner or admin.
-- Inserts happen only via handle_new_user (security definer), so no insert policy.
create policy restaurants_select on public.restaurants for select to authenticated using (true);
create policy restaurants_update_self on public.restaurants for update to authenticated
  using (profile_id = auth.uid() or public.is_admin());

create policy volunteers_select on public.volunteers for select to authenticated using (true);
create policy volunteers_update_self on public.volunteers for update to authenticated
  using (profile_id = auth.uid() or public.is_admin());

create policy ngo_partners_select on public.ngo_partners for select to authenticated using (true);
create policy ngo_partners_update_self on public.ngo_partners for update to authenticated
  using (profile_id = auth.uid() or public.is_admin());

-- donations: owner + admin always see their/all rows; verified volunteers/ngos can
-- browse anything not cancelled (to know what's out there).
create policy donations_select on public.donations for select to authenticated using (
  restaurant_id = auth.uid()
  or public.is_admin()
  or (status <> 'cancelled' and (public.is_verified('volunteer') or public.is_verified('ngo')))
);
create policy donations_insert on public.donations for insert to authenticated with check (
  restaurant_id = auth.uid() and public.is_verified('restaurant')
);
-- Owners may only cancel their own still-available listing; every other transition
-- (assigned/picked_up/distributed/expired) is driven by the food_runs RPCs below,
-- which run as security definer and therefore bypass this owner-only policy.
create policy donations_owner_cancel on public.donations for update to authenticated
  using (restaurant_id = auth.uid() and status = 'available')
  with check (restaurant_id = auth.uid() and status = 'cancelled');
create policy donations_admin_update on public.donations for update to authenticated
  using (public.is_admin());

-- donation_events: visible to the donation's owner, the assigned volunteer/ngo, and admin.
-- No client-side insert policy: rows are written only by the security definer RPCs.
create policy donation_events_select on public.donation_events for select to authenticated using (
  public.is_admin()
  or exists (select 1 from public.donations d where d.id = donation_id and d.restaurant_id = auth.uid())
  or exists (
    select 1 from public.food_runs r
    where r.donation_id = donation_events.donation_id
      and (r.volunteer_id = auth.uid() or r.ngo_id = auth.uid())
  )
);

-- need_zones: reporter + admin always see their/all zones; everyone verified can see active ones.
create policy need_zones_select on public.need_zones for select to authenticated using (
  reporter_id = auth.uid()
  or public.is_admin()
  or (status = 'active' and (public.is_verified('volunteer') or public.is_verified('ngo') or public.is_verified('restaurant')))
);
create policy need_zones_insert on public.need_zones for insert to authenticated with check (
  reporter_id = auth.uid() and (public.is_verified('volunteer') or public.is_verified('ngo'))
);
create policy need_zones_owner_update on public.need_zones for update to authenticated
  using (reporter_id = auth.uid() and status = 'pending_verification');
create policy need_zones_admin_update on public.need_zones for update to authenticated
  using (public.is_admin());

-- food_runs: admin always; restaurant owner (via donation) can view; assigned
-- volunteer/ngo can view; any verified volunteer/ngo can see open (unclaimed) runs
-- so they can browse and accept them. All writes go through the RPCs below.
create policy food_runs_select on public.food_runs for select to authenticated using (
  public.is_admin()
  or exists (select 1 from public.donations d where d.id = donation_id and d.restaurant_id = auth.uid())
  or volunteer_id = auth.uid()
  or ngo_id = auth.uid()
  or (status = 'assigned' and volunteer_id is null and ngo_id is null
      and (public.is_verified('volunteer') or public.is_verified('ngo')))
);

-- incidents: reporter, admin, and the run's other involved parties.
create policy incidents_select on public.incidents for select to authenticated using (
  public.is_admin()
  or reporter_id = auth.uid()
  or exists (
    select 1 from public.food_runs r
    join public.donations d on d.id = r.donation_id
    where r.id = run_id and (r.volunteer_id = auth.uid() or r.ngo_id = auth.uid() or d.restaurant_id = auth.uid())
  )
);
create policy incidents_insert on public.incidents for insert to authenticated with check (
  reporter_id = auth.uid()
);
create policy incidents_admin_update on public.incidents for update to authenticated using (public.is_admin());

-- notifications: strictly own inbox.
create policy notifications_select on public.notifications for select to authenticated using (user_id = auth.uid());
create policy notifications_update_own on public.notifications for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ============================================================
-- 5. STATE-MACHINE RPCs
-- All mutation of donations/food_runs/need_zones beyond the simple cases above
-- goes through these security-definer functions, which check role/ownership/state
-- explicitly rather than relying on overlapping RLS policies for every actor.
-- ============================================================

create function public.log_event(p_donation_id uuid, p_event_type text, p_note text default null) returns void
  language plpgsql security definer set search_path = public as $$
begin
  insert into public.donation_events (donation_id, event_type, actor_id, note)
  values (p_donation_id, p_event_type, auth.uid(), p_note);
end;
$$;

create function public.notify(p_user_id uuid, p_message text) returns void
  language plpgsql security definer set search_path = public as $$
begin
  if p_user_id is not null then
    insert into public.notifications (user_id, message, channel) values (p_user_id, p_message, 'whatsapp');
  end if;
end;
$$;

create function public.report_need_zone(
  p_location_text text, p_lat double precision, p_lng double precision,
  p_estimated_people int, p_urgency text, p_recurring boolean
) returns public.need_zones
  language plpgsql security definer set search_path = public as $$
declare
  v_zone public.need_zones;
begin
  if not (public.is_verified('volunteer') or public.is_verified('ngo')) then
    raise exception 'Only a verified volunteer or NGO partner can report a need zone';
  end if;

  insert into public.need_zones (reporter_id, location_text, lat, lng, estimated_people, urgency, recurring)
  values (auth.uid(), p_location_text, p_lat, p_lng, p_estimated_people, p_urgency, p_recurring)
  returning * into v_zone;

  return v_zone;
end;
$$;

create function public.verify_need_zone(p_zone_id uuid, p_approve boolean) returns public.need_zones
  language plpgsql security definer set search_path = public as $$
declare
  v_zone public.need_zones;
begin
  if not public.is_admin() then
    raise exception 'Only an operator can verify a need zone';
  end if;

  update public.need_zones
  set status = case when p_approve then 'active' else 'rejected' end, verified_by = auth.uid()
  where id = p_zone_id and status = 'pending_verification'
  returning * into v_zone;

  if v_zone is null then
    raise exception 'Need zone not found or already reviewed';
  end if;

  return v_zone;
end;
$$;

create function public.create_food_run(
  p_donation_id uuid, p_need_zone_id uuid, p_volunteer_id uuid default null, p_ngo_id uuid default null
) returns public.food_runs
  language plpgsql security definer set search_path = public as $$
declare
  v_run public.food_runs;
  v_restaurant_id uuid;
begin
  if not public.is_admin() then
    raise exception 'Only an operator can create a match';
  end if;

  update public.donations set status = 'assigned'
  where id = p_donation_id and status = 'available'
  returning restaurant_id into v_restaurant_id;

  if v_restaurant_id is null then
    raise exception 'Donation is not available to match';
  end if;

  if not exists (select 1 from public.need_zones where id = p_need_zone_id and status = 'active') then
    raise exception 'Need zone is not active';
  end if;

  insert into public.food_runs (donation_id, need_zone_id, volunteer_id, ngo_id, assigned_by)
  values (p_donation_id, p_need_zone_id, p_volunteer_id, p_ngo_id, auth.uid())
  returning * into v_run;

  perform public.log_event(p_donation_id, 'matched', 'Matched to a verified need zone by operator');
  perform public.notify(v_restaurant_id, 'Your donation has been matched to a nearby distribution point.');
  if p_volunteer_id is not null then
    perform public.notify(p_volunteer_id, 'You have been assigned a food run.');
  end if;
  if p_ngo_id is not null then
    perform public.notify(p_ngo_id, 'You have been assigned a food run.');
  end if;

  return v_run;
end;
$$;

create function public.accept_food_run(p_run_id uuid) returns public.food_runs
  language plpgsql security definer set search_path = public as $$
declare
  v_run public.food_runs;
  v_restaurant_id uuid;
begin
  if public.is_verified('volunteer') then
    update public.food_runs set volunteer_id = auth.uid()
    where id = p_run_id and status = 'assigned' and volunteer_id is null and ngo_id is null
    returning * into v_run;
  elsif public.is_verified('ngo') then
    update public.food_runs set ngo_id = auth.uid()
    where id = p_run_id and status = 'assigned' and volunteer_id is null and ngo_id is null
    returning * into v_run;
  else
    raise exception 'Only a verified volunteer or NGO partner can accept a run';
  end if;

  if v_run is null then
    raise exception 'Run is not open to be accepted';
  end if;

  select restaurant_id into v_restaurant_id from public.donations where id = v_run.donation_id;
  perform public.log_event(v_run.donation_id, 'run_accepted', 'A food runner accepted this donation');
  perform public.notify(v_restaurant_id, 'A food runner has accepted your donation.');

  return v_run;
end;
$$;

create function public.confirm_pickup(p_run_id uuid) returns public.food_runs
  language plpgsql security definer set search_path = public as $$
declare
  v_run public.food_runs;
  v_restaurant_id uuid;
begin
  update public.food_runs set status = 'picked_up', picked_up_at = now()
  where id = p_run_id and status = 'assigned' and (volunteer_id = auth.uid() or ngo_id = auth.uid())
  returning * into v_run;

  if v_run is null then
    raise exception 'Run cannot be marked picked up (not yours, or wrong state)';
  end if;

  update public.donations set status = 'picked_up' where id = v_run.donation_id
  returning restaurant_id into v_restaurant_id;

  perform public.log_event(v_run.donation_id, 'picked_up', 'Food collected by runner');
  perform public.notify(v_restaurant_id, 'Your food has been collected.');

  return v_run;
end;
$$;

create function public.confirm_distribution(p_run_id uuid, p_meals_distributed int) returns public.food_runs
  language plpgsql security definer set search_path = public as $$
declare
  v_run public.food_runs;
  v_restaurant_id uuid;
begin
  update public.food_runs set status = 'distributed', distributed_at = now(), meals_distributed = p_meals_distributed
  where id = p_run_id and status = 'picked_up' and (volunteer_id = auth.uid() or ngo_id = auth.uid() or public.is_admin())
  returning * into v_run;

  if v_run is null then
    raise exception 'Run cannot be marked distributed (not yours, or wrong state)';
  end if;

  update public.donations set status = 'distributed' where id = v_run.donation_id
  returning restaurant_id into v_restaurant_id;

  perform public.log_event(v_run.donation_id, 'distributed', format('%s meals distributed', p_meals_distributed));
  perform public.notify(v_restaurant_id, 'Your donation has reached its distribution point.');

  return v_run;
end;
$$;

create function public.fail_run(p_run_id uuid, p_reason text) returns public.food_runs
  language plpgsql security definer set search_path = public as $$
declare
  v_run public.food_runs;
  v_donation public.donations;
  v_new_status text;
begin
  update public.food_runs set status = 'failed', failure_reason = p_reason
  where id = p_run_id and status in ('assigned', 'picked_up')
    and (volunteer_id = auth.uid() or ngo_id = auth.uid() or public.is_admin())
  returning * into v_run;

  if v_run is null then
    raise exception 'Run cannot be failed (not yours, or already finished)';
  end if;

  select * into v_donation from public.donations where id = v_run.donation_id;
  v_new_status := case when v_donation.pickup_deadline < now() then 'expired' else 'available' end;

  update public.donations set status = v_new_status where id = v_run.donation_id;

  perform public.log_event(v_run.donation_id, 'run_failed', p_reason);
  perform public.notify(v_donation.restaurant_id, 'We could not complete this distribution; support is coordinating the next step.');

  return v_run;
end;
$$;

create function public.cancel_donation(p_donation_id uuid, p_reason text) returns public.donations
  language plpgsql security definer set search_path = public as $$
declare
  v_donation public.donations;
begin
  update public.donations set status = 'cancelled', cancel_reason = p_reason
  where id = p_donation_id
    and (
      (restaurant_id = auth.uid() and status = 'available')
      or public.is_admin()
    )
  returning * into v_donation;

  if v_donation is null then
    raise exception 'Donation cannot be cancelled (not yours, or already in progress)';
  end if;

  perform public.log_event(p_donation_id, 'cancelled', p_reason);

  return v_donation;
end;
$$;

create function public.set_verification(p_profile_id uuid, p_status text) returns public.profiles
  language plpgsql security definer set search_path = public as $$
declare
  v_profile public.profiles;
begin
  if not public.is_admin() then
    raise exception 'Only an operator can change verification status';
  end if;
  if p_status not in ('pending', 'verified', 'rejected') then
    raise exception 'Invalid verification status';
  end if;

  update public.profiles set verification_status = p_status where id = p_profile_id
  returning * into v_profile;

  return v_profile;
end;
$$;

create function public.resolve_incident(p_incident_id uuid, p_resolution_note text, p_escalate boolean) returns public.incidents
  language plpgsql security definer set search_path = public as $$
declare
  v_incident public.incidents;
begin
  if not public.is_admin() then
    raise exception 'Only an operator can resolve an incident';
  end if;

  update public.incidents
  set status = case when p_escalate then 'escalated' else 'resolved' end, resolution_note = p_resolution_note
  where id = p_incident_id
  returning * into v_incident;

  return v_incident;
end;
$$;

-- Log donation creation via a trigger so the event exists even though the
-- insert itself goes through the plain RLS-guarded donations_insert policy.
create function public.log_donation_created() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  insert into public.donation_events (donation_id, event_type, actor_id, note)
  values (new.id, 'created', new.restaurant_id, null);
  return new;
end;
$$;

create trigger donations_log_created
  after insert on public.donations
  for each row execute function public.log_donation_created();
