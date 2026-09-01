import { AlertCircle } from "lucide-react";
import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { AvailabilityToggle } from "@/components/AvailabilityToggle";
import { RunCard, type RunWithRelations } from "@/components/RunCard";
import { EmptyState } from "@/components/EmptyState";
import { EmptyRunsIllustration } from "@/components/illustrations/EmptyRuns";

export default async function VolunteerHome() {
  const profile = await requireRole("volunteer");
  const supabase = await createClient();

  const { data: volunteer } = await supabase.from("volunteers").select("*").eq("profile_id", profile.id).single();

  const [{ data: myRuns }, { data: openRuns }] = await Promise.all([
    supabase
      .from("food_runs")
      .select("*, donation:donations(*), need_zone:need_zones(*)")
      .eq("volunteer_id", profile.id)
      .in("status", ["assigned", "picked_up"])
      .order("created_at", { ascending: false })
      .returns<RunWithRelations[]>(),
    supabase
      .from("food_runs")
      .select("*, donation:donations(*), need_zone:need_zones(*)")
      .eq("status", "assigned")
      .is("volunteer_id", null)
      .is("ngo_id", null)
      .order("created_at", { ascending: false })
      .returns<RunWithRelations[]>(),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-sand-900">Welcome, {profile.name || "there"}</h1>
        <AvailabilityToggle available={!!volunteer?.available} />
      </div>

      {profile.verification_status !== "verified" && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-sun-300 bg-sun-100 px-3 py-2 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          Your account is {profile.verification_status}. An operator needs to verify you before you can accept runs.
        </p>
      )}

      {myRuns && myRuns.length > 0 && (
        <>
          <h2 className="mt-8 text-sm font-medium text-sand-500">Your active runs</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {myRuns.map((r) => (
              <RunCard key={r.id} run={r} href={`/volunteer/runs/${r.id}`} />
            ))}
          </div>
        </>
      )}

      <h2 className="mt-8 text-sm font-medium text-sand-500">Available runs nearby</h2>
      {!openRuns || openRuns.length === 0 ? (
        <div className="mt-3">
          <EmptyState
            illustration={<EmptyRunsIllustration />}
            title="No open runs right now"
            hint="Check back soon — new runs appear as operators match donations."
          />
        </div>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {openRuns.map((r) => (
            <RunCard key={r.id} run={r} href={`/volunteer/runs/${r.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
