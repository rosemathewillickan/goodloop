# GoodLoop — setup

## 1. Create the Supabase project

1. [supabase.com/dashboard](https://supabase.com/dashboard) → sign in with GitHub → **New Project**.
2. Name it, generate a database password (you won't need to retype it), pick the region closest to you.
3. Leave **Enable Data API** and **Automatically expose new tables** checked.
4. **Create new project**, wait ~1-2 min.

## 2. Run the schema

1. Left sidebar → **SQL Editor** → **+** → **Create a new snippet**.
2. Paste the contents of [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) → **Run**.
3. Confirm "Success. No rows returned."

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

New restaurant/volunteer/ngo accounts start `pending` — as admin, verify them under **Verify** in the nav before they can donate/accept runs/report need zones.

## 7. Golden path to test

1. As **admin**: verify a restaurant, a volunteer, and an ngo account.
2. As **restaurant**: donate surplus food (drop a pin on the map).
3. As **ngo**: report a need zone (drop a pin) — it starts `pending_verification`.
4. As **admin**: approve the need zone under **Zones**, then go to **Match** and pair the donation with the zone.
5. As **volunteer**: accept the open run, confirm pickup, confirm distribution.
6. Check the donation's timeline (restaurant view) and the **Notifications** feed (mocked WhatsApp) update at each step.

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
