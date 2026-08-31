import { createClient } from "@/lib/supabase/server";
import { NeedZoneCard } from "@/components/NeedZoneCard";
import { VerifyZoneButtons } from "@/components/VerifyZoneButtons";
import type { NeedZone } from "@/lib/supabase/types";

export default async function AdminZonesPage() {
  const supabase = await createClient();
  const { data: zones } = await supabase
    .from("need_zones")
    .select("*")
    .order("status", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<NeedZone[]>();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Need zones</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {(zones ?? []).map((z) => (
          <div key={z.id} className="space-y-2">
            <NeedZoneCard zone={z} />
            {z.status === "pending_verification" && <VerifyZoneButtons zoneId={z.id} />}
          </div>
        ))}
        {(!zones || zones.length === 0) && <p className="text-sm text-stone-500">No need zones reported yet.</p>}
      </div>
    </div>
  );
}
