import { Flag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { ResolveIncidentForm } from "@/components/ResolveIncidentForm";
import { EmptyState } from "@/components/EmptyState";
import { EmptyIncidentsIllustration } from "@/components/illustrations/EmptyIncidents";
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
      <h1 className="text-2xl font-semibold text-sand-900">Incidents</h1>
      {!incidents || incidents.length === 0 ? (
        <div className="mt-6">
          <EmptyState illustration={<EmptyIncidentsIllustration />} title="No incidents reported" hint="Reports from any role will show up here for review." />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {incidents.map((i) => (
            <div key={i.id} className="rounded-2xl border border-sand-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Flag className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <div>
                    <p className="font-medium capitalize text-sand-900">{i.category.replace(/_/g, " ")}</p>
                    <p className="text-sm text-sand-600">{i.description}</p>
                    <p className="mt-1 text-xs text-sand-400">{formatDateTime(i.created_at)}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <StatusBadge status={i.severity} />
                  <StatusBadge status={i.status} />
                </div>
              </div>
              {i.resolution_note && <p className="mt-2 text-sm text-sand-600">Resolution: {i.resolution_note}</p>}
              {i.status === "open" && <ResolveIncidentForm incidentId={i.id} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
