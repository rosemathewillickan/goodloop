import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { Timeline } from "@/components/Timeline";
import { MapView } from "@/components/MapView";
import { RunActions } from "@/components/RunActions";
import { IncidentForm } from "@/components/IncidentForm";
import { formatDateTime, timeUntil } from "@/lib/format";
import type { Donation, DonationEvent, FoodRun, NeedZone, Profile } from "@/lib/supabase/types";

export async function RunDetailView({ runId, profile }: { runId: string; profile: Profile }) {
  const supabase = await createClient();

  const { data: run } = await supabase
    .from("food_runs")
    .select("*, donation:donations(*), need_zone:need_zones(*)")
    .eq("id", runId)
    .single<FoodRun & { donation: Donation; need_zone: NeedZone }>();

  if (!run) notFound();

  const isMine = run.volunteer_id === profile.id || run.ngo_id === profile.id;
  const isOpen = run.status === "assigned" && !run.volunteer_id && !run.ngo_id;
  if (!isMine && !isOpen) notFound();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("organization_name, address_text")
    .eq("profile_id", run.donation.restaurant_id)
    .single();

  const { data: events } = await supabase
    .from("donation_events")
    .select("*")
    .eq("donation_id", run.donation_id)
    .order("created_at", { ascending: true })
    .returns<DonationEvent[]>();

  return (
    <div className="max-w-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">{run.donation.food_type}</h1>
          <p className="text-sm text-stone-500">
            {run.donation.quantity_meals} meals from {restaurant?.organization_name}
          </p>
        </div>
        <StatusBadge status={run.status} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-stone-500">Pickup deadline</dt>
        <dd className="text-stone-900">
          {formatDateTime(run.donation.pickup_deadline)} ({timeUntil(run.donation.pickup_deadline)})
        </dd>
        {run.donation.dietary_info && (
          <>
            <dt className="text-stone-500">Dietary / handling</dt>
            <dd className="text-stone-900">{run.donation.dietary_info}</dd>
          </>
        )}
        <dt className="text-stone-500">Pickup address</dt>
        <dd className="text-stone-900">{run.donation.address_text || restaurant?.address_text || "See map"}</dd>
        <dt className="text-stone-500">Distribution point</dt>
        <dd className="text-stone-900">{run.need_zone.location_text}</dd>
      </dl>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-medium text-stone-500">Pickup</p>
          <MapView lat={run.donation.lat} lng={run.donation.lng} />
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-stone-500">Drop-off</p>
          <MapView lat={run.need_zone.lat} lng={run.need_zone.lng} />
        </div>
      </div>

      <div className="mt-6">
        <RunActions run={run} isMine={isMine} />
      </div>

      {isMine && <IncidentForm runId={run.id} />}

      <h2 className="mt-8 text-sm font-medium text-stone-500">Timeline</h2>
      <div className="mt-3">
        <Timeline events={events ?? []} />
      </div>
    </div>
  );
}
