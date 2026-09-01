import Link from "next/link";
import { MapPinned, AlertCircle } from "lucide-react";
import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { NeedZoneCard } from "@/components/NeedZoneCard";
import { EmptyState } from "@/components/EmptyState";
import { EmptyZonesIllustration } from "@/components/illustrations/EmptyZones";
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-sand-900">Welcome, {profile.name || "there"}</h1>
        <Link
          href="/need-zones/new"
          className="flex items-center gap-1.5 rounded-full bg-accent-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700"
        >
          <MapPinned className="h-4 w-4" strokeWidth={2.25} />
          Report need zone
        </Link>
      </div>

      {profile.verification_status !== "verified" && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-sun-300 bg-sun-100 px-3 py-2 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          Your account is {profile.verification_status}. An operator needs to verify you before your reports go live.
        </p>
      )}

      <h2 className="mt-8 text-sm font-medium text-sand-500">Your reported need zones</h2>
      {!zones || zones.length === 0 ? (
        <div className="mt-3">
          <EmptyState illustration={<EmptyZonesIllustration />} title="Nothing reported yet" hint="Report a location where people need food." />
        </div>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {zones.map((z) => (
            <NeedZoneCard key={z.id} zone={z} />
          ))}
        </div>
      )}
    </div>
  );
}
