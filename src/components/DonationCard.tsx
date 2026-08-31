import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { effectiveStatus, formatDateTime, timeUntil } from "@/lib/format";
import type { Donation } from "@/lib/supabase/types";

export function DonationCard({ donation, href }: { donation: Donation; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-stone-200 bg-white p-4 hover:border-emerald-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-stone-900">{donation.food_type}</p>
          <p className="text-sm text-stone-500">{donation.quantity_meals} meals</p>
        </div>
        <StatusBadge status={effectiveStatus(donation.status, donation.pickup_deadline)} />
      </div>
      <p className="mt-2 text-xs text-stone-500">
        Pickup deadline {formatDateTime(donation.pickup_deadline)} ({timeUntil(donation.pickup_deadline)})
      </p>
    </Link>
  );
}
