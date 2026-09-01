import { Link2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { MatchForm } from "@/components/MatchForm";
import type { Donation, NeedZone, Profile } from "@/lib/supabase/types";

export default async function MatchPage() {
  const supabase = await createClient();

  const [{ data: donations }, { data: zones }, { data: volunteerRows }, { data: ngoProfiles }] = await Promise.all([
    supabase
      .from("donations")
      .select("*")
      .eq("status", "available")
      .gt("pickup_deadline", new Date().toISOString())
      .order("pickup_deadline", { ascending: true })
      .returns<Donation[]>(),
    supabase.from("need_zones").select("*").eq("status", "active").order("urgency", { ascending: false }).returns<NeedZone[]>(),
    supabase.from("volunteers").select("profile_id").eq("available", true),
    supabase.from("profiles").select("*").eq("role", "ngo").eq("verification_status", "verified").returns<Profile[]>(),
  ]);

  const availableVolunteerIds = (volunteerRows ?? []).map((v) => v.profile_id);
  let volunteers: Profile[] = [];
  if (availableVolunteerIds.length > 0) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .in("id", availableVolunteerIds)
      .eq("verification_status", "verified")
      .returns<Profile[]>();
    volunteers = data ?? [];
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-role-admin-bg text-role-admin">
          <Link2 className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-sand-900">Manual matching</h1>
          <p className="text-sm text-sand-500">Match an available donation to a verified need zone.</p>
        </div>
      </div>
      <MatchForm donations={donations ?? []} zones={zones ?? []} volunteers={volunteers} ngos={ngoProfiles ?? []} />
    </div>
  );
}
