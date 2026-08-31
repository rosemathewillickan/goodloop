import Link from "next/link";
import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { DonationCard } from "@/components/DonationCard";
import type { Donation } from "@/lib/supabase/types";

export default async function RestaurantHome() {
  const profile = await requireRole("restaurant");
  const supabase = await createClient();

  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("restaurant_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(6);

  const active = (donations ?? []).filter((d: Donation) => !["distributed", "cancelled", "expired"].includes(d.status));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Welcome, {profile.name || "there"}</h1>
        <Link href="/restaurant/new" className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
          Donate food
        </Link>
      </div>

      {profile.verification_status !== "verified" && (
        <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Your account is {profile.verification_status}. An operator needs to verify you before you can list donations.
        </p>
      )}

      <h2 className="mt-8 text-sm font-medium text-stone-500">Active donations</h2>
      {active.length === 0 ? (
        <p className="mt-2 text-sm text-stone-500">Nothing active right now.</p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {active.map((d: Donation) => (
            <DonationCard key={d.id} donation={d} href={`/restaurant/donations/${d.id}`} />
          ))}
        </div>
      )}

      <Link href="/restaurant/donations" className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:underline">
        View full history →
      </Link>
    </div>
  );
}
