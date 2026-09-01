import { notFound } from "next/navigation";
import { Soup, Clock, Salad, MapPin, User, History } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { Timeline } from "@/components/Timeline";
import { MapView } from "@/components/MapView";
import { CancelDonationForm } from "@/components/CancelDonationForm";
import { effectiveStatus, formatDateTime } from "@/lib/format";
import type { Donation, DonationEvent, FoodRun, Profile } from "@/lib/supabase/types";

const TERMINAL = ["distributed", "cancelled", "expired"];

export async function DonationDetailView({ donationId, profile }: { donationId: string; profile: Profile }) {
  const supabase = await createClient();

  let query = supabase.from("donations").select("*").eq("id", donationId);
  if (profile.role === "restaurant") query = query.eq("restaurant_id", profile.id);

  const { data: donation } = await query.single<Donation>();
  if (!donation) notFound();

  const [{ data: events }, { data: run }] = await Promise.all([
    supabase
      .from("donation_events")
      .select("*")
      .eq("donation_id", donationId)
      .order("created_at", { ascending: true })
      .returns<DonationEvent[]>(),
    supabase.from("food_runs").select("*").eq("donation_id", donationId).neq("status", "failed").maybeSingle<FoodRun>(),
  ]);

  let runner: Profile | null = null;
  if (run?.volunteer_id || run?.ngo_id) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", run.volunteer_id ?? run.ngo_id)
      .single<Profile>();
    runner = data;
  }

  const isOwner = profile.role === "restaurant" && donation.restaurant_id === profile.id;
  const isAdmin = profile.role === "admin";
  const canCancel = (isOwner && donation.status === "available") || (isAdmin && !TERMINAL.includes(donation.status));

  return (
    <div className="max-w-2xl">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-role-restaurant-bg text-role-restaurant">
          <Soup className="h-6 w-6" strokeWidth={2} />
        </span>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-semibold text-sand-900">{donation.food_type}</h1>
            <StatusBadge status={effectiveStatus(donation.status, donation.pickup_deadline)} />
          </div>
          <p className="text-sm text-sand-500">{donation.quantity_meals} meals</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-sand-200 bg-white p-4 text-sm">
        <div className="col-span-2 flex items-center gap-2 text-sand-600">
          <Clock className="h-4 w-4 shrink-0 text-sun-600" strokeWidth={2.25} />
          <span>
            Pickup deadline: <span className="font-medium text-sand-900">{formatDateTime(donation.pickup_deadline)}</span>
          </span>
        </div>
        {donation.dietary_info && (
          <div className="col-span-2 flex items-center gap-2 text-sand-600">
            <Salad className="h-4 w-4 shrink-0 text-role-restaurant" strokeWidth={2.25} />
            <span>{donation.dietary_info}</span>
          </div>
        )}
        {donation.address_text && (
          <div className="col-span-2 flex items-center gap-2 text-sand-600">
            <MapPin className="h-4 w-4 shrink-0 text-sand-400" strokeWidth={2.25} />
            <span>{donation.address_text}</span>
          </div>
        )}
        {runner && (
          <div className="col-span-2 flex items-center gap-2 text-sand-600">
            <User className="h-4 w-4 shrink-0 text-role-ngo" strokeWidth={2.25} />
            <span>
              Assigned to {runner.name} ({runner.role}) {runner.phone && `· ${runner.phone}`}
            </span>
          </div>
        )}
        {donation.cancel_reason && (
          <>
            <dt className="text-sand-500">Cancel reason</dt>
            <dd className="text-sand-900">{donation.cancel_reason}</dd>
          </>
        )}
      </dl>

      <div className="mt-4">
        <MapView lat={donation.lat} lng={donation.lng} pinColor="brand" />
      </div>

      {canCancel && <CancelDonationForm donationId={donation.id} />}

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
