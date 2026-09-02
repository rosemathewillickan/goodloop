# GoodLoop — setup

**Live:** https://goodloop-rho.vercel.app
**Repo:** https://github.com/rosemathewillickan/goodloop

## 1. Create the Supabase project

1. [supabase.com/dashboard](https://supabase.com/dashboard) → sign in with GitHub → **New Project**.
2. Name it, generate a database password (you won't need to retype it), pick the region closest to you.
3. Leave **Enable Data API** and **Automatically expose new tables** checked.
4. **Create new project**, wait ~1-2 min.

## 2. Run the schema

1. Left sidebar → **SQL Editor** → **+** → **Create a new snippet**.
2. Paste the contents of [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) → **Run**.
3. Confirm "Success. No rows returned."
4. Repeat with [`supabase/migrations/0002_supporter_pledges.sql`](supabase/migrations/0002_supporter_pledges.sql)
   — adds the money-pledge table behind the **Supporter** role's "Support the mission" page
   (`/support`). No real payment processing is involved anywhere in this build; it only records
   the pledge amount, same spirit as the mocked OTP/WhatsApp integrations.
5. Repeat with [`supabase/migrations/0003_oauth_role_selection.sql`](supabase/migrations/0003_oauth_role_selection.sql)
   — makes a fresh Google sign-up pick a real role on first login instead of silently
   defaulting to volunteer (see "Note on roles" under step 8 below).

## 3. Turn off email confirmation (so test logins work instantly)

1. **Authentication** → **Sign In / Providers**.
2. Under **User Signups**: toggle **"Allow new users to sign up"** ON, **"Confirm email"** OFF.
3. Click **Save changes**.

## 4. Get your API keys

1. Gear icon → **Project Settings** → **Data API** → copy the **Project URL**.
2. **API Keys** tab → **Publishable and secret API keys** → copy the **Publishable key** (`sb_publishable_...`). Never use the secret key in this app.
3. Paste both into `.env.local` (already gitignored):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
   ```

## 5. Run it

```bash
npm run dev
```

Open http://localhost:3000.

## 6. Seed test accounts

Sign up once per role (restaurant, volunteer, ngo) through the app itself. There's no beneficiary account — that's intentional (see the PRD).

Already-seeded test accounts on this project (password `testpass123` for all):

| Role | Email | Name |
|---|---|---|
| restaurant | restaurant.test@gmail.com | Green Leaf Kitchen |
| volunteer | volunteer.test@gmail.com | Rahul Sharma |
| ngo | ngo.test@gmail.com | Priya Menon |
| admin | admin.test@gmail.com | Admin Operator |

To promote an account to `admin` (operator) yourself, get its id first (`select id from auth.users where email = '...'`) then:

```sql
update profiles set role = 'admin', verification_status = 'verified'
where id = '<the-id>';
```

Use the id directly, not a `where id = (select ...)` subquery matching on email — if the subquery matches zero rows (e.g. a typo) the `update` silently affects nothing and gives no error. Also note: `guard_profile_update()` in the migration only blocks role/verification changes from an authenticated PostgREST session (`auth.uid()` is set) — raw SQL Editor updates have `auth.uid() is null` and always pass through, so this promotion works even before any admin exists.

New restaurant/volunteer/ngo accounts are **auto-verified on signup** (see below) so
anyone — including a professor grading this without seeded credentials — can sign up
and immediately donate/accept runs/report need zones. The **Verify** page under admin
still exists and works if you want to demonstrate that workflow (e.g. by manually
setting an account back to `pending` first).

### Seed demo data + auto-verify all signups

Run [`supabase/seed_demo_data.sql`](supabase/seed_demo_data.sql) once in the SQL Editor
(paste and Run). It's idempotent — safe to run more than once, it just skips rows/changes
it already made. It:

- Redefines the new-user trigger so every future signup starts `verified` instead of
  `pending`, and backfills every existing non-verified account (including ones created
  by signing up through the live app, e.g. via Google) to `verified`
- Adds four open donations for the restaurant test account (so **Active donations**
  isn't 0), three of them left unclaimed so **any** newly-verified volunteer/ngo account
  sees them under "Available runs nearby" / "Open runs you can coordinate" — not just
  the seeded ones
- Adds one donation matched + assigned to the volunteer test account (active run)
- Adds one donation picked up by the volunteer test account (active run, later stage)
- Adds one completed run handled by the ngo test account (bumps meals redistributed)
- Adds an active + a pending need zone reported by the ngo test account
- Adds matching entries in each account's **Notifications** feed

A brand-new restaurant signup still starts with zero donations of its own — donations
are owned by whoever creates them, so that one's a live "click Donate food and watch it
appear" demo rather than something pre-seeded.

## 7. Golden path to test

1. As **admin**: verify a restaurant, a volunteer, and an ngo account.
2. As **restaurant**: donate surplus food (drop a pin on the map).
3. As **ngo**: report a need zone (drop a pin) — it starts `pending_verification`.
4. As **admin**: approve the need zone under **Zones**, then go to **Match** and pair the donation with the zone.
5. As **volunteer**: accept the open run, confirm pickup, confirm distribution.
6. Check the donation's timeline (restaurant view) and the **Notifications** feed (mocked WhatsApp) update at each step.

## 8. Enable Google sign-in

The code side (the "Continue with Google" button on `/login` and `/signup`, and the
`/auth/callback` route that completes the flow) is already built. Three manual steps
are needed to turn it on — they use your own Google and Supabase accounts, so they
can't be done for you.

**A. Google Cloud Console — create OAuth credentials**

1. [console.cloud.google.com](https://console.cloud.google.com) → project selector → **New Project** (separate from Supabase/Vercel) → name it → **Create**, then make sure it's selected.
2. Search bar → **Google Auth Platform** → **Get started** → fill app name + support email → **Next** → Audience: **External** → **Next** → developer contact email → **Next** → agree → **Create**.
3. Left sidebar → **Clients** → **Create OAuth client**.
   - Application type: **Web application**.
   - **Authorized JavaScript origins** → add both:
     - `http://localhost:3000`
     - `https://goodloop-rho.vercel.app`
   - **Authorized redirect URIs** → add Supabase's own callback (not your app's URL):
     - `https://jhhpgqjtbttucsvbiadg.supabase.co/auth/v1/callback`
   - **Create**. Copy the **Client ID** and **Client secret** shown (the secret won't be shown again).
4. **Publish the app** — left sidebar → **Audience** → **Publish app**. If it's greyed out, go to **Branding** first and fill in the app home page / privacy policy / terms links (reusing `https://goodloop-rho.vercel.app` for all three is fine) and add `goodloop-rho.vercel.app` under **Authorized domains** (the full subdomain, not just `vercel.app`) — then Publish. Skipping this silently restricts login to an allowlist of test users, which will block anyone who isn't you.

**B. Supabase — paste the credentials in**

1. Your project → **Authentication** → **Sign In / Providers** → find **Google** in the provider list → toggle it on.
2. Paste the **Client ID** and **Client secret** from step A.3 → **Save**.
3. Left sub-nav → **URL Configuration** → set **Site URL** to `https://goodloop-rho.vercel.app`, and under **Redirect URLs** add both:
   - `https://goodloop-rho.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback`
   → **Save changes**.

**C. That's it** — no code or env var changes needed; the button already points at whichever origin it's clicked from.

**Note on roles:** Google doesn't carry our custom role field, so a fresh Google
sign-up is sent to a one-time **"pick your role"** screen (`/onboarding/role`) right
after their first login instead of silently landing as `volunteer` — see
[`supabase/migrations/0003_oauth_role_selection.sql`](supabase/migrations/0003_oauth_role_selection.sql).
Admin is still excluded from that picker on purpose. To promote any account to admin
(or to change a role after the fact), do it manually:

Look up their id first (`select id from auth.users where email = '...'`), then use it directly — same reasoning as step 6 above:

```sql
update profiles set role = 'restaurant' -- or 'ngo' / 'admin'
where id = '<the-id>';
```

## What's mocked for this assignment build

- **OTP auth** → real Supabase email/password auth instead.
- **WhatsApp/SMS notifications** → in-app notification feed (`/notifications`), written by the same DB functions that would call a real messaging API.
- **Google Maps / routing** → Leaflet + OpenStreetMap, click-to-pin instead of address geocoding (no API key/billing needed).
- **Matching** → fully manual by the operator, per the PRD's own MVP scope.

## Deploying

```bash
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
git init && git add -A && git commit -m "Initial commit"
gh repo create <you>/goodloop --public --source=. --remote=origin --push

npx vercel login
npx vercel link --yes --project goodloop
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production --value "https://xxxx.supabase.co" --no-sensitive
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --value "sb_publishable_..." --no-sensitive
npx vercel deploy --prod
```

Then in the Vercel dashboard: **Settings → Git → Connect Git Repository** to enable auto-deploy on push.
