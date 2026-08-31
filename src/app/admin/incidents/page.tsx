import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { ResolveIncidentForm } from "@/components/ResolveIncidentForm";
import { formatDateTime } from "@/lib/format";
import type { Incident } from "@/lib/supabase/types";

export default async function IncidentsPage() {
  const supabase = await createClient();
  const { data: incidents } = await supabase
    .from("incidents")
    .select("*")
    .order("status", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<Incident[]>();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Incidents</h1>
      <div className="mt-6 space-y-3">
        {(incidents ?? []).map((i) => (
          <div key={i.id} className="rounded-lg border border-stone-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium capitalize text-stone-900">{i.category.replace(/_/g, " ")}</p>
                <p className="text-sm text-stone-600">{i.description}</p>
                <p className="mt-1 text-xs text-stone-400">{formatDateTime(i.created_at)}</p>
              </div>
              <div className="flex gap-1.5">
                <StatusBadge status={i.severity} />
                <StatusBadge status={i.status} />
              </div>
            </div>
            {i.resolution_note && <p className="mt-2 text-sm text-stone-600">Resolution: {i.resolution_note}</p>}
            {i.status === "open" && <ResolveIncidentForm incidentId={i.id} />}
          </div>
        ))}
        {(!incidents || incidents.length === 0) && <p className="text-sm text-stone-500">No incidents reported.</p>}
      </div>
    </div>
  );
}
