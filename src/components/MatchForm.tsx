"use client";

import { useActionState, useState } from "react";
import { Soup, MapPinned } from "lucide-react";
import { createMatch, type FormState } from "@/app/admin/actions";
import { formatDateTime, timeUntil } from "@/lib/format";
import type { Donation, NeedZone, Profile } from "@/lib/supabase/types";

const initial: FormState = { error: null };

export function MatchForm({
  donations,
  zones,
  volunteers,
  ngos,
}: {
  donations: Donation[];
  zones: NeedZone[];
  volunteers: Profile[];
  ngos: Profile[];
}) {
  const [state, formAction, pending] = useActionState(createMatch, initial);
  const [donationId, setDonationId] = useState<string | null>(null);
  const [zoneId, setZoneId] = useState<string | null>(null);

  return (
    <form action={formAction} className="mt-6 space-y-6">
      <input type="hidden" name="donation_id" value={donationId ?? ""} />
      <input type="hidden" name="need_zone_id" value={zoneId ?? ""} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium text-sand-500">1. Pick an available donation</h2>
          <div className="mt-2 space-y-2">
            {donations.map((d) => (
              <label
                key={d.id}
                className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                  donationId === d.id ? "border-role-restaurant bg-role-restaurant-bg" : "border-sand-200 bg-white hover:bg-sand-50"
                }`}
              >
                <input
                  type="radio"
                  name="donation_pick"
                  className="sr-only"
                  checked={donationId === d.id}
                  onChange={() => setDonationId(d.id)}
                />
                <Soup className="mt-0.5 h-4 w-4 shrink-0 text-role-restaurant" strokeWidth={2.25} />
                <span>
                  <span className="font-medium text-sand-900">{d.food_type}</span> · {d.quantity_meals} meals
                  <div className="text-xs text-sand-500">
                    Deadline {formatDateTime(d.pickup_deadline)} ({timeUntil(d.pickup_deadline)})
                  </div>
                </span>
              </label>
            ))}
            {donations.length === 0 && <p className="text-sm text-sand-500">No available donations right now.</p>}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-sand-500">2. Pick a verified need zone</h2>
          <div className="mt-2 space-y-2">
            {zones.map((z) => (
              <label
                key={z.id}
                className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                  zoneId === z.id ? "border-role-ngo bg-role-ngo-bg" : "border-sand-200 bg-white hover:bg-sand-50"
                }`}
              >
                <input
                  type="radio"
                  name="zone_pick"
                  className="sr-only"
                  checked={zoneId === z.id}
                  onChange={() => setZoneId(z.id)}
                />
                <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-role-ngo" strokeWidth={2.25} />
                <span>
                  <span className="font-medium text-sand-900">{z.location_text}</span>
                  <div className="text-xs text-sand-500">
                    {z.estimated_people ? `~${z.estimated_people} people` : "no estimate"} · {z.urgency} urgency
                  </div>
                </span>
              </label>
            ))}
            {zones.length === 0 && <p className="text-sm text-sand-500">No active need zones yet.</p>}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-sand-500">3. Optionally pre-assign a runner</h2>
        <p className="text-xs text-sand-500">Leave blank to let any available volunteer accept it from their dashboard.</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <select name="volunteer_id" className="rounded-xl border border-sand-300 px-3 py-2 text-sm">
            <option value="">— No pre-assigned volunteer —</option>
            {volunteers.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.phone || "no phone"})
              </option>
            ))}
          </select>
          <select name="ngo_id" className="rounded-xl border border-sand-300 px-3 py-2 text-sm">
            <option value="">— No pre-assigned NGO —</option>
            {ngos.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending || !donationId || !zoneId}
        className="rounded-full bg-accent-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700 disabled:opacity-60"
      >
        {pending ? "Matching..." : "Create match"}
      </button>
    </form>
  );
}
