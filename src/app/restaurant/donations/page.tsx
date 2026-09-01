import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { DonationCard } from "@/components/DonationCard";
import { EmptyState } from "@/components/EmptyState";
import { EmptyDonationsIllustration } from "@/components/illustrations/EmptyDonations";
import type { Donation } from "@/lib/supabase/types";

export default async function DonationHistoryPage() {
  const profile = await requireRole("restaurant");
  const supabase = await createClient();

  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("restaurant_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-sand-900">Donation history</h1>
      {!donations || donations.length === 0 ? (
        <div className="mt-4">
          <EmptyState illustration={<EmptyDonationsIllustration />} title="No donations yet" hint="Your listed donations will show up here." />
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {donations.map((d: Donation) => (
            <DonationCard key={d.id} donation={d} href={`/restaurant/donations/${d.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
