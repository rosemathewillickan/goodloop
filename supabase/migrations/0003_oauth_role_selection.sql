-- Lets a Google (or any future OAuth) sign-up choose their real role right
-- after first login, instead of silently landing as 'volunteer' forever —
-- Google doesn't carry our custom role field, so today every Google sign-up
-- looks identical regardless of what the person actually wanted to do.
-- Email/password sign-ups already choose a role in the signup form and are
-- unaffected by this.
--
-- Run once in the Supabase SQL Editor after 0001/0002.

alter table public.profiles
  add column needs_role_selection boolean not null default false;

create or replace function public.handle_new_user() returns trigger
  language plpgsql security definer set search_path = public as $$
declare
  v_role text := new.raw_user_meta_data->>'role';
  v_name text := coalesce(new.raw_user_meta_data->>'name', '');
  v_phone text := new.raw_user_meta_data->>'phone';
  v_org text := coalesce(new.raw_user_meta_data->>'organization_name', '');
  v_needs_role boolean := v_role is null;
begin
  if v_role is null or v_role not in ('restaurant', 'volunteer', 'ngo') then
    v_role := 'volunteer';
  end if;

  insert into public.profiles (id, role, name, phone, verification_status, needs_role_selection)
  values (new.id, v_role, v_name, v_phone, 'verified', v_needs_role);

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

-- Flag any Google account that already exists (created before this fix
-- shipped) and is still sitting at the default 'volunteer' role, so it gets
-- prompted to choose next time it logs in. Accounts an admin already
-- promoted manually (role <> 'volunteer') are left alone.
update public.profiles p
set needs_role_selection = true
where p.role = 'volunteer'
  and exists (
    select 1 from auth.identities i where i.user_id = p.id and i.provider = 'google'
  );

-- One-time, self-service role change for a fresh OAuth sign-up. This
-- deliberately bypasses guard_profile_update() (which otherwise only lets an
-- admin change role via a plain UPDATE) but only succeeds while
-- needs_role_selection is true, so it can't be reused as a general
-- "change my role whenever I want" backdoor.
create function public.complete_oauth_onboarding(p_role text, p_organization_name text default null)
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

  -- Remove whatever default role-specific row the signup trigger created.
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

  update public.profiles set role = p_role, needs_role_selection = false
  where id = auth.uid()
  returning * into v_profile;

  return v_profile;
end;
$$;

grant execute on function public.complete_oauth_onboarding(text, text) to authenticated;
