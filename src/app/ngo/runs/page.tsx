import { requireRole } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { RunCard, type RunWithRelations } from "@/components/RunCard";

export default async function NgoRunsPage() {
  const profile = await requireRole("ngo");
  const supabase = await createClient();

  const [{ data: myRuns }, { data: openRuns }] = await Promise.all([
    supabase
      .from("food_runs")
      .select("*, donation:donations(*), need_zone:need_zones(*)")
      .eq("ngo_id", profile.id)
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
      <h1 className="text-2xl font-semibold text-stone-900">Runs</h1>

      {myRuns && myRuns.length > 0 && (
        <>
          <h2 className="mt-6 text-sm font-medium text-stone-500">Your runs</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {myRuns.map((r) => (
              <RunCard key={r.id} run={r} href={`/ngo/runs/${r.id}`} />
            ))}
          </div>
        </>
      )}

      <h2 className="mt-8 text-sm font-medium text-stone-500">Open runs you can coordinate</h2>
      {!openRuns || openRuns.length === 0 ? (
        <p className="mt-2 text-sm text-stone-500">Nothing open right now.</p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {openRuns.map((r) => (
            <RunCard key={r.id} run={r} href={`/ngo/runs/${r.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
