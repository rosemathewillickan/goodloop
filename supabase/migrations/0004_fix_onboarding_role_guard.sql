-- Fixes a real bug in 0003: guard_profile_update() blocks ANY authenticated
-- non-admin self-update of `role` (by design, to stop self-promotion) — but
-- that also silently reverted the role change made by
-- complete_oauth_onboarding() itself, since it runs as the calling user
-- (auth.uid() is set, not admin). Choosing "Restaurant" in onboarding would
-- "succeed" with no error, then land you back on volunteer because the
-- trigger quietly undid the update inside the same transaction.
--
-- Fix: complete_oauth_onboarding() now sets a transaction-local flag that
-- guard_profile_update() explicitly allows, so this one RPC (and only this
-- RPC) can actually change role, exactly once, while it's still true that no
-- authenticated user can rewrite the guard from plain SQL/PostgREST.
--
-- Run once in the Supabase SQL Editor after 0001-0003.

create or replace function public.guard_profile_update() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null
     and not public.is_admin()
     and coalesce(current_setting('goodloop.bypass_role_guard', true), 'false') <> 'true'
  then
    new.role := old.role;
    new.verification_status := old.verification_status;
  end if;
  return new;
end;
$$;

create or replace function public.complete_oauth_onboarding(p_role text, p_organization_name text default null)
  returns public.profiles
  language plpgsql security definer set search_path = public as $$
declare
  v_profile public.profiles;
begin
  if p_role not in ('restaurant', 'volunteer', 'ngo') then
    raise exception 'Invalid role';
  end if;

  select * into v_profile from public.profiles where id = auth.uid();
  if v_profile is null then
    raise exception 'No profile found';
  end if;
  if not v_profile.needs_role_selection then
    raise exception 'Role has already been set for this account';
  end if;

  delete from public.restaurants where profile_id = auth.uid();
  delete from public.volunteers where profile_id = auth.uid();
  delete from public.ngo_partners where profile_id = auth.uid();

  if p_role = 'restaurant' then
    insert into public.restaurants (profile_id, organization_name) values (auth.uid(), coalesce(p_organization_name, ''));
  elsif p_role = 'volunteer' then
    insert into public.volunteers (profile_id) values (auth.uid());
  elsif p_role = 'ngo' then
    insert into public.ngo_partners (profile_id, organization_name) values (auth.uid(), coalesce(p_organization_name, ''));
  end if;

  perform set_config('goodloop.bypass_role_guard', 'true', true);
  update public.profiles set role = p_role, needs_role_selection = false
  where id = auth.uid()
  returning * into v_profile;

  return v_profile;
end;
$$;

-- Anyone stuck with the wrong role from the buggy version of this RPC:
-- re-flag them so they get sent back through the (now-fixed) picker.
update public.profiles p
set needs_role_selection = true
where p.role = 'volunteer'
  and exists (
    select 1 from auth.identities i where i.user_id = p.id and i.provider = 'google'
  );
