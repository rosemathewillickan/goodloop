import Link from "next/link";
import { Soup, Clock } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { effectiveStatus, formatDateTime, timeUntil } from "@/lib/format";
import type { Donation } from "@/lib/supabase/types";

export function DonationCard({ donation, href }: { donation: Donation; href: string }) {
  return (
    <Link
      href={href}
      className="group flex gap-3 rounded-2xl border border-sand-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-900/5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Soup className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate font-medium text-sand-900">{donation.food_type}</p>
          <StatusBadge status={effectiveStatus(donation.status, donation.pickup_deadline)} />
        </div>
        <p className="text-sm text-sand-500">{donation.quantity_meals} meals</p>
        <p className="mt-2 flex items-center gap-1 text-xs text-sand-400">
          <Clock className="h-3 w-3" strokeWidth={2.25} />
          {formatDateTime(donation.pickup_deadline)} ({timeUntil(donation.pickup_deadline)})
        </p>
      </div>
    </Link>
  );
}
