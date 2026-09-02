-- Adds a "support the mission" money-pledge feature for the Supporter role.
-- No real payment processing happens anywhere in this build (no card data
-- is ever collected) — this records the intent/pledge only, same spirit as
-- the mocked OTP/WhatsApp integrations elsewhere in the app. Open to anyone,
-- logged in or not, matching the product's "no account needed to support"
-- framing.
--
-- Run once in the Supabase SQL Editor after 0001_init.sql.

create table public.supporter_pledges (
  id uuid primary key default gen_random_uuid(),
  supporter_name text,
  amount_inr int not null check (amount_inr > 0 and amount_inr <= 1000000),
  message text,
  created_at timestamptz not null default now()
);

alter table public.supporter_pledges enable row level security;

-- Anyone can record a pledge — no account needed to support the mission.
create policy supporter_pledges_insert on public.supporter_pledges for insert
  to anon, authenticated with check (true);

-- Only admin can browse the raw list (names/messages); everyone else gets
-- the aggregate totals below instead.
create policy supporter_pledges_admin_select on public.supporter_pledges for select
  to authenticated using (public.is_admin());

-- Public aggregate (no names/messages) for the impact/support pages.
create function public.supporter_pledge_totals()
  returns table(total_amount_inr bigint, total_pledges bigint)
  language sql stable security definer set search_path = public as $$
  select coalesce(sum(amount_inr), 0)::bigint, count(*)::bigint from public.supporter_pledges;
$$;

grant execute on function public.supporter_pledge_totals() to anon, authenticated;
