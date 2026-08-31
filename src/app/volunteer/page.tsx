import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { AvailabilityToggle } from "@/components/AvailabilityToggle";
import { RunCard, type RunWithRelations } from "@/components/RunCard";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Welcome, {profile.name || "there"}</h1>
        <AvailabilityToggle available={!!volunteer?.available} />
      </div>

      {profile.verification_status !== "verified" && (
        <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Your account is {profile.verification_status}. An operator needs to verify you before you can accept runs.
        </p>
      )}

      {myRuns && myRuns.length > 0 && (
        <>
          <h2 className="mt-8 text-sm font-medium text-stone-500">Your active runs</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {myRuns.map((r) => (
              <RunCard key={r.id} run={r} href={`/volunteer/runs/${r.id}`} />
            ))}
          </div>
        </>
      )}

      <h2 className="mt-8 text-sm font-medium text-stone-500">Available runs nearby</h2>
      {!openRuns || openRuns.length === 0 ? (
        <p className="mt-2 text-sm text-stone-500">No open runs right now — check back soon.</p>
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
