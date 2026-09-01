import Link from "next/link";
import { Soup, MapPin, Clock } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDateTime, timeUntil } from "@/lib/format";
import type { Donation, FoodRun, NeedZone } from "@/lib/supabase/types";

export type RunWithRelations = FoodRun & { donation: Donation; need_zone: NeedZone };

export function RunCard({ run, href }: { run: RunWithRelations; href: string }) {
  return (
    <Link
      href={href}
      className="group flex gap-3 rounded-2xl border-2 border-sand-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-role-volunteer/40 hover:shadow-md hover:shadow-brand-900/5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-role-volunteer-bg text-role-volunteer">
        <Soup className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate font-medium text-sand-900">{run.donation.food_type}</p>
          <StatusBadge status={run.status} />
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-sand-500">
          <span className="font-medium text-sand-700">{run.donation.quantity_meals} meals</span>
          <span className="text-sand-300">→</span>
          <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
          <span className="truncate">{run.need_zone.location_text}</span>
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs text-sand-400">
          <Clock className="h-3 w-3" strokeWidth={2.25} />
          {formatDateTime(run.donation.pickup_deadline)} ({timeUntil(run.donation.pickup_deadline)})
        </p>
      </div>
    </Link>
  );
}
