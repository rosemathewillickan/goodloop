import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { RunCard, type RunWithRelations } from "@/components/RunCard";
import { EmptyState } from "@/components/EmptyState";
import { EmptyRunsIllustration } from "@/components/illustrations/EmptyRuns";

export default async function VolunteerHistoryPage() {
  const profile = await requireRole("volunteer");
  const supabase = await createClient();

  const { data: runs } = await supabase
    .from("food_runs")
    .select("*, donation:donations(*), need_zone:need_zones(*)")
    .eq("volunteer_id", profile.id)
    .in("status", ["distributed", "failed"])
    .order("created_at", { ascending: false })
    .returns<RunWithRelations[]>();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-sand-900">Run history</h1>
      {!runs || runs.length === 0 ? (
        <div className="mt-4">
          <EmptyState illustration={<EmptyRunsIllustration />} title="No completed runs yet" hint="Runs you finish will show up here." />
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {runs.map((r) => (
            <RunCard key={r.id} run={r} href={`/volunteer/runs/${r.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
