import { StatusBadge } from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/format";
import type { NeedZone } from "@/lib/supabase/types";

export function NeedZoneCard({ zone }: { zone: NeedZone }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-stone-900">{zone.location_text}</p>
          <p className="text-sm text-stone-500">
            {zone.estimated_people ? `~${zone.estimated_people} people` : "Estimate not given"}
            {zone.recurring && " · recurring"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={zone.status} />
          <StatusBadge status={zone.urgency} />
        </div>
      </div>
      <p className="mt-2 text-xs text-stone-400">Reported {formatDateTime(zone.created_at)}</p>
    </div>
  );
}
