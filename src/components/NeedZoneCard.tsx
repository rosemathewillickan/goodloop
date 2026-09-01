import { MapPinned, Users, Repeat } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/format";
import type { NeedZone } from "@/lib/supabase/types";

export function NeedZoneCard({ zone }: { zone: NeedZone }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-sand-200 bg-white p-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-role-ngo-bg text-role-ngo">
        <MapPinned className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium text-sand-900">{zone.location_text}</p>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <StatusBadge status={zone.status} />
            <StatusBadge status={zone.urgency} />
          </div>
        </div>
        <p className="mt-1 flex items-center gap-3 text-sm text-sand-500">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" strokeWidth={2.25} />
            {zone.estimated_people ? `~${zone.estimated_people} people` : "no estimate"}
          </span>
          {zone.recurring && (
            <span className="flex items-center gap-1">
              <Repeat className="h-3.5 w-3.5" strokeWidth={2.25} />
              recurring
            </span>
          )}
        </p>
        <p className="mt-2 text-xs text-sand-400">Reported {formatDateTime(zone.created_at)}</p>
      </div>
    </div>
  );
}
