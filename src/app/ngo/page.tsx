import Link from "next/link";
import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { NeedZoneCard } from "@/components/NeedZoneCard";
import type { NeedZone } from "@/lib/supabase/types";

export default async function NgoHome() {
  const profile = await requireRole("ngo");
  const supabase = await createClient();

  const { data: zones } = await supabase
    .from("need_zones")
    .select("*")
    .eq("reporter_id", profile.id)
    .order("created_at", { ascending: false })
    .returns<NeedZone[]>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Welcome, {profile.name || "there"}</h1>
        <Link href="/need-zones/new" className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
          Report need zone
        </Link>
      </div>

      {profile.verification_status !== "verified" && (
        <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Your account is {profile.verification_status}. An operator needs to verify you before your reports go live.
        </p>
      )}

      <h2 className="mt-8 text-sm font-medium text-stone-500">Your reported need zones</h2>
      {(!zones || zones.length === 0) && <p className="mt-2 text-sm text-stone-500">Nothing reported yet.</p>}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {(zones ?? []).map((z) => (
          <NeedZoneCard key={z.id} zone={z} />
        ))}
      </div>
    </div>
  );
}
