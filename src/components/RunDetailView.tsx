import { notFound } from "next/navigation";
import { Soup, Clock, Salad, MapPin, Navigation, History } from "lucide-react";
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
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-role-volunteer-bg text-role-volunteer">
          <Soup className="h-6 w-6" strokeWidth={2} />
        </span>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-semibold text-sand-900">{run.donation.food_type}</h1>
            <StatusBadge status={run.status} />
          </div>
          <p className="text-sm text-sand-500">
            {run.donation.quantity_meals} meals from {restaurant?.organization_name}
          </p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border-2 border-sand-200 bg-white p-4 text-sm">
        <div className="col-span-2 flex items-center gap-2 text-sand-600">
          <Clock className="h-4 w-4 shrink-0 text-sun-600" strokeWidth={2.25} />
          <span>
            Pickup deadline: <span className="font-medium text-sand-900">{formatDateTime(run.donation.pickup_deadline)}</span> (
            {timeUntil(run.donation.pickup_deadline)})
          </span>
        </div>
        {run.donation.dietary_info && (
          <div className="col-span-2 flex items-center gap-2 text-sand-600">
            <Salad className="h-4 w-4 shrink-0 text-role-restaurant" strokeWidth={2.25} />
            <span>{run.donation.dietary_info}</span>
          </div>
        )}
        <dt className="text-sand-500">Pickup address</dt>
        <dd className="text-sand-900">{run.donation.address_text || restaurant?.address_text || "See map"}</dd>
        <dt className="text-sand-500">Distribution point</dt>
        <dd className="text-sand-900">{run.need_zone.location_text}</dd>
      </dl>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-brand-700">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} />
            Pickup
          </p>
          <MapView lat={run.donation.lat} lng={run.donation.lng} pinColor="brand" />
        </div>
        <div>
          <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-accent-600">
            <Navigation className="h-3.5 w-3.5" strokeWidth={2.25} />
            Drop-off
          </p>
          <MapView lat={run.need_zone.lat} lng={run.need_zone.lng} pinColor="accent" />
        </div>
      </div>

      <div className="mt-6">
        <RunActions run={run} isMine={isMine} />
      </div>

      {isMine && <IncidentForm runId={run.id} />}

      <h2 className="mt-8 flex items-center gap-1.5 text-sm font-medium text-sand-500">
        <History className="h-4 w-4" strokeWidth={2.25} />
        Timeline
      </h2>
      <div className="mt-3">
        <Timeline events={events ?? []} />
      </div>
    </div>
  );
}
