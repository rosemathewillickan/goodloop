import { PackagePlus, Link2, Bike, PackageCheck, CheckCircle2, XCircle, Ban, type LucideIcon } from "lucide-react";
import { formatDateTime } from "@/lib/format";
import type { DonationEvent } from "@/lib/supabase/types";

const CONFIG: Record<string, { label: string; icon: LucideIcon }> = {
  created: { label: "Donation listed", icon: PackagePlus },
  matched: { label: "Matched to a need zone", icon: Link2 },
  run_accepted: { label: "Runner accepted the run", icon: Bike },
  picked_up: { label: "Food picked up", icon: PackageCheck },
  distributed: { label: "Food distributed", icon: CheckCircle2 },
  run_failed: { label: "Run could not be completed", icon: XCircle },
  cancelled: { label: "Donation cancelled", icon: Ban },
};

export function Timeline({ events }: { events: DonationEvent[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-sand-500">No activity yet.</p>;
  }

  return (
    <ol className="space-y-5">
      {events.map((e, i) => {
        const config = CONFIG[e.event_type] ?? { label: e.event_type, icon: CheckCircle2 };
        const Icon = config.icon;
        const isLast = i === events.length - 1;
        return (
          <li key={e.id} className="relative flex gap-3 pb-1">
            {!isLast && <span className="absolute left-[15px] top-8 h-[calc(100%-4px)] w-px bg-sand-200" />}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-4 ring-white">
              <Icon className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <div className="pt-1">
              <p className="text-sm font-medium text-sand-900">{config.label}</p>
              {e.note && <p className="text-sm text-sand-500">{e.note}</p>}
              <p className="text-xs text-sand-400">{formatDateTime(e.created_at)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
