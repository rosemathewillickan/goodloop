import Link from "next/link";
import { PackagePlus, PackageOpen, HandHeart, AlertCircle } from "lucide-react";
import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { DonationCard } from "@/components/DonationCard";
import { StatCard } from "@/components/StatCard";
import { EmptyState } from "@/components/EmptyState";
import { EmptyDonationsIllustration } from "@/components/illustrations/EmptyDonations";
import type { Donation } from "@/lib/supabase/types";

export default async function RestaurantHome() {
  const profile = await requireRole("restaurant");
  const supabase = await createClient();

  const [{ data: donations }, { data: distributedRows }] = await Promise.all([
    supabase.from("donations").select("*").eq("restaurant_id", profile.id).order("created_at", { ascending: false }).limit(6),
    supabase.from("donations").select("quantity_meals").eq("restaurant_id", profile.id).eq("status", "distributed"),
  ]);

  const active = (donations ?? []).filter((d: Donation) => !["distributed", "cancelled", "expired"].includes(d.status));
  const totalMeals = (distributedRows ?? []).reduce((sum, d) => sum + d.quantity_meals, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-sand-900">Welcome, {profile.name || "there"}</h1>
        <Link
          href="/restaurant/new"
          className="flex items-center gap-1.5 rounded-full bg-accent-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700"
        >
          <PackagePlus className="h-4 w-4" strokeWidth={2.25} />
          Donate food
        </Link>
      </div>

      {profile.verification_status !== "verified" && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-sun-300 bg-sun-100 px-3 py-2 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          Your account is {profile.verification_status}. An operator needs to verify you before you can list donations.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-sm">
        <StatCard icon={PackageOpen} label="Active donations" value={active.length} color="var(--color-role-restaurant)" bg="var(--color-role-restaurant-bg)" />
        <StatCard icon={HandHeart} label="Meals redistributed" value={totalMeals} color="var(--color-accent-600)" bg="var(--color-accent-50)" />
      </div>

      <h2 className="mt-8 text-sm font-medium text-sand-500">Active donations</h2>
      {active.length === 0 ? (
        <div className="mt-3">
          <EmptyState illustration={<EmptyDonationsIllustration />} title="Nothing active right now" hint="List surplus food and it'll show up here." />
        </div>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {active.map((d: Donation) => (
            <DonationCard key={d.id} donation={d} href={`/restaurant/donations/${d.id}`} />
          ))}
        </div>
      )}

      <Link href="/restaurant/donations" className="mt-6 inline-block text-sm font-medium text-brand-700 hover:underline">
        View full history →
      </Link>
    </div>
  );
}
