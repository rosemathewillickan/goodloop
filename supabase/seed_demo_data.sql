-- Seeds realistic demo data (donations, food runs, need zones, notifications)
-- for the three seeded stakeholder accounts, so each dashboard has something
-- to look at right after logging in instead of empty states.
--
-- Safe to re-run: every insert is guarded with a "not exists" check keyed on
-- a distinguishing field, so running this twice won't create duplicates.
--
-- Run once in the Supabase SQL Editor (Authentication -> SQL Editor -> New
-- snippet -> paste -> Run). Requires restaurant.test@gmail.com,
-- volunteer.test@gmail.com, ngo.test@gmail.com and admin.test@gmail.com to
-- already exist (see SETUP.md section 6).

do $$
declare
  v_restaurant uuid;
  v_volunteer uuid;
  v_ngo uuid;
  v_admin uuid;
  v_zone_active uuid;
  v_zone_pending uuid;
  v_donation uuid;
  v_run uuid;
begin
  select id into v_restaurant from auth.users where email = 'restaurant.test@gmail.com';
  select id into v_volunteer from auth.users where email = 'volunteer.test@gmail.com';
  select id into v_ngo from auth.users where email = 'ngo.test@gmail.com';
  select id into v_admin from auth.users where email = 'admin.test@gmail.com';

  if v_restaurant is null or v_volunteer is null or v_ngo is null or v_admin is null then
    raise exception 'Seed accounts not found — create restaurant.test@gmail.com, volunteer.test@gmail.com, ngo.test@gmail.com and admin.test@gmail.com first (see SETUP.md section 6)';
  end if;

  -- ============================================================
  -- Need zones (reported by the NGO test account)
  -- ============================================================

  select id into v_zone_active from public.need_zones
    where reporter_id = v_ngo and location_text = 'Riverside Community Center';
  if v_zone_active is null then
    insert into public.need_zones
      (reporter_id, location_text, lat, lng, estimated_people, urgency, recurring, status, verified_by)
    values
      (v_ngo, 'Riverside Community Center', 19.073, 72.885, 40, 'high', true, 'active', v_admin)
    returning id into v_zone_active;
  end if;

  select id into v_zone_pending from public.need_zones
    where reporter_id = v_ngo and location_text = 'Central Station Corner';
  if v_zone_pending is null then
    insert into public.need_zones
      (reporter_id, location_text, lat, lng, estimated_people, urgency, recurring, status)
    values
      (v_ngo, 'Central Station Corner', 19.089, 72.875, 22, 'medium', false, 'pending_verification')
    returning id into v_zone_pending;
  end if;

  -- ============================================================
  -- 1. Two open (unmatched) donations for the restaurant — "Active donations"
  -- ============================================================

  if not exists (select 1 from public.donations where restaurant_id = v_restaurant and food_type = 'Vegetarian thali') then
    insert into public.donations
      (restaurant_id, food_type, quantity_meals, dietary_info, pickup_deadline, address_text, lat, lng, status)
    values
      (v_restaurant, 'Vegetarian thali', 25, 'Vegetarian, nut-free', now() + interval '4 hours', 'Green Leaf Kitchen, Bandra', 19.076, 72.877, 'available');
  end if;

  if not exists (select 1 from public.donations where restaurant_id = v_restaurant and food_type = 'Bakery items') then
    insert into public.donations
      (restaurant_id, food_type, quantity_meals, dietary_info, pickup_deadline, address_text, lat, lng, status)
    values
      (v_restaurant, 'Bakery items', 15, 'Contains gluten, dairy', now() + interval '1 day', 'Green Leaf Kitchen, Bandra', 19.076, 72.877, 'available');
  end if;

  -- ============================================================
  -- 2. A donation matched + assigned to the volunteer test account
  --    (shows in the volunteer's "Your active runs")
  -- ============================================================

  if not exists (select 1 from public.donations where restaurant_id = v_restaurant and food_type = 'Rice & curry') then
    insert into public.donations
      (restaurant_id, food_type, quantity_meals, dietary_info, pickup_deadline, address_text, lat, lng, status)
    values
      (v_restaurant, 'Rice & curry', 30, 'Vegetarian', now() + interval '3 hours', 'Green Leaf Kitchen, Bandra', 19.076, 72.877, 'assigned')
    returning id into v_donation;

    insert into public.food_runs (donation_id, need_zone_id, volunteer_id, assigned_by, status)
    values (v_donation, v_zone_active, v_volunteer, v_admin, 'assigned')
    returning id into v_run;

    perform public.log_event(v_donation, 'matched', 'Matched to a verified need zone by operator');
    perform public.log_event(v_donation, 'run_accepted', 'A food runner accepted this donation');
    insert into public.notifications (user_id, message, channel) values
      (v_restaurant, 'Your donation has been matched to a nearby distribution point.', 'whatsapp'),
      (v_volunteer, 'You have been assigned a food run.', 'whatsapp');
  end if;

  -- ============================================================
  -- 3. A donation picked up by the volunteer test account, in transit
  --    (a second active run, in a different stage)
  -- ============================================================

  if not exists (select 1 from public.donations where restaurant_id = v_restaurant and food_type = 'Sandwiches & wraps') then
    insert into public.donations
      (restaurant_id, food_type, quantity_meals, dietary_info, pickup_deadline, address_text, lat, lng, status)
    values
      (v_restaurant, 'Sandwiches & wraps', 20, 'Contains dairy', now() + interval '2 hours', 'Green Leaf Kitchen, Bandra', 19.076, 72.877, 'picked_up')
    returning id into v_donation;

    insert into public.food_runs (donation_id, need_zone_id, volunteer_id, assigned_by, status, picked_up_at)
    values (v_donation, v_zone_active, v_volunteer, v_admin, 'picked_up', now() - interval '20 minutes')
    returning id into v_run;

    perform public.log_event(v_donation, 'matched', 'Matched to a verified need zone by operator');
    perform public.log_event(v_donation, 'run_accepted', 'A food runner accepted this donation');
    perform public.log_event(v_donation, 'picked_up', 'Food collected by runner');
    insert into public.notifications (user_id, message, channel) values
      (v_restaurant, 'Your donation has been matched to a nearby distribution point.', 'whatsapp'),
      (v_volunteer, 'You have been assigned a food run.', 'whatsapp'),
      (v_restaurant, 'Your food has been collected.', 'whatsapp');
  end if;

  -- ============================================================
  -- 4. A completed run handled by the NGO test account
  --    (shows in the NGO's "Runs" and bumps the restaurant's meal total)
  -- ============================================================

  if not exists (select 1 from public.donations where restaurant_id = v_restaurant and food_type = 'Dal & rice') then
    insert into public.donations
      (restaurant_id, food_type, quantity_meals, dietary_info, pickup_deadline, address_text, lat, lng, status)
    values
      (v_restaurant, 'Dal & rice', 35, 'Vegetarian, vegan', now() - interval '2 hours', 'Green Leaf Kitchen, Bandra', 19.076, 72.877, 'distributed')
    returning id into v_donation;

    insert into public.food_runs (donation_id, need_zone_id, ngo_id, assigned_by, status, picked_up_at, distributed_at, meals_distributed)
    values (v_donation, v_zone_active, v_ngo, v_admin, 'distributed', now() - interval '90 minutes', now() - interval '40 minutes', 35)
    returning id into v_run;

    perform public.log_event(v_donation, 'matched', 'Matched to a verified need zone by operator');
    perform public.log_event(v_donation, 'run_accepted', 'A food runner accepted this donation');
    perform public.log_event(v_donation, 'picked_up', 'Food collected by runner');
    perform public.log_event(v_donation, 'distributed', '35 meals distributed');
    insert into public.notifications (user_id, message, channel) values
      (v_restaurant, 'Your donation has been matched to a nearby distribution point.', 'whatsapp'),
      (v_ngo, 'You have been assigned a food run.', 'whatsapp'),
      (v_restaurant, 'Your food has been collected.', 'whatsapp'),
      (v_restaurant, 'Your donation has reached its distribution point.', 'whatsapp');
  end if;

  -- ============================================================
  -- 5. An open, unclaimed run — shows up under the volunteer's
  --    "Available runs nearby" for them to accept
  -- ============================================================

  if not exists (select 1 from public.donations where restaurant_id = v_restaurant and food_type = 'Fruits & snacks') then
    insert into public.donations
      (restaurant_id, food_type, quantity_meals, dietary_info, pickup_deadline, address_text, lat, lng, status)
    values
      (v_restaurant, 'Fruits & snacks', 18, 'Vegan, nut-free', now() + interval '5 hours', 'Green Leaf Kitchen, Bandra', 19.076, 72.877, 'assigned')
    returning id into v_donation;

    insert into public.food_runs (donation_id, need_zone_id, assigned_by, status)
    values (v_donation, v_zone_active, v_admin, 'assigned');

    perform public.log_event(v_donation, 'matched', 'Matched to a verified need zone by operator');
    insert into public.notifications (user_id, message, channel) values
      (v_restaurant, 'Your donation has been matched to a nearby distribution point.', 'whatsapp');
  end if;
end $$;
