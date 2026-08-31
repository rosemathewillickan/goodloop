import { formatDateTime } from "@/lib/format";
import type { DonationEvent } from "@/lib/supabase/types";

const LABELS: Record<string, string> = {
  created: "Donation listed",
  matched: "Matched to a need zone",
  run_accepted: "Runner accepted the run",
  picked_up: "Food picked up",
  distributed: "Food distributed",
  run_failed: "Run could not be completed",
  cancelled: "Donation cancelled",
};

export function Timeline({ events }: { events: DonationEvent[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-stone-500">No activity yet.</p>;
  }

  return (
    <ol className="space-y-4 border-l border-stone-200 pl-4">
      {events.map((e) => (
        <li key={e.id} className="relative">
          <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-600" />
          <p className="text-sm font-medium text-stone-900">{LABELS[e.event_type] ?? e.event_type}</p>
          {e.note && <p className="text-sm text-stone-500">{e.note}</p>}
          <p className="text-xs text-stone-400">{formatDateTime(e.created_at)}</p>
        </li>
      ))}
    </ol>
  );
}
