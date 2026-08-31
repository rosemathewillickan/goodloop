import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDateTime, timeUntil } from "@/lib/format";
import type { Donation, FoodRun, NeedZone } from "@/lib/supabase/types";

export type RunWithRelations = FoodRun & { donation: Donation; need_zone: NeedZone };

export function RunCard({ run, href }: { run: RunWithRelations; href: string }) {
  return (
    <Link href={href} className="block rounded-lg border border-stone-200 bg-white p-4 hover:border-emerald-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-stone-900">{run.donation.food_type}</p>
          <p className="text-sm text-stone-500">{run.donation.quantity_meals} meals → {run.need_zone.location_text}</p>
        </div>
        <StatusBadge status={run.status} />
      </div>
      <p className="mt-2 text-xs text-stone-500">
        Pickup deadline {formatDateTime(run.donation.pickup_deadline)} ({timeUntil(run.donation.pickup_deadline)})
      </p>
    </Link>
  );
}
