import { createClient } from "@/lib/supabase/server";
import { DonationCard } from "@/components/DonationCard";
import type { Donation } from "@/lib/supabase/types";

export default async function AdminDonationsPage() {
  const supabase = await createClient();
  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Donation[]>();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">All donations</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(donations ?? []).map((d) => (
          <DonationCard key={d.id} donation={d} href={`/admin/donations/${d.id}`} />
        ))}
        {(!donations || donations.length === 0) && <p className="text-sm text-stone-500">No donations yet.</p>}
      </div>
    </div>
  );
}
