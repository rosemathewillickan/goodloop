import { notFound } from "next/navigation";
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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">{donation.food_type}</h1>
          <p className="text-sm text-stone-500">{donation.quantity_meals} meals</p>
        </div>
        <StatusBadge status={effectiveStatus(donation.status, donation.pickup_deadline)} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-stone-500">Pickup deadline</dt>
        <dd className="text-stone-900">{formatDateTime(donation.pickup_deadline)}</dd>
        {donation.dietary_info && (
          <>
            <dt className="text-stone-500">Dietary / handling</dt>
            <dd className="text-stone-900">{donation.dietary_info}</dd>
          </>
        )}
        {donation.address_text && (
          <>
            <dt className="text-stone-500">Address</dt>
            <dd className="text-stone-900">{donation.address_text}</dd>
          </>
        )}
        {runner && (
          <>
            <dt className="text-stone-500">Assigned to</dt>
            <dd className="text-stone-900">
              {runner.name} ({runner.role}) {runner.phone && `· ${runner.phone}`}
            </dd>
          </>
        )}
        {donation.cancel_reason && (
          <>
            <dt className="text-stone-500">Cancel reason</dt>
            <dd className="text-stone-900">{donation.cancel_reason}</dd>
          </>
        )}
      </dl>

      <div className="mt-4">
        <MapView lat={donation.lat} lng={donation.lng} />
      </div>

      {canCancel && <CancelDonationForm donationId={donation.id} />}

      <h2 className="mt-8 text-sm font-medium text-stone-500">Timeline</h2>
      <div className="mt-3">
        <Timeline events={events ?? []} />
      </div>
    </div>
  );
}
