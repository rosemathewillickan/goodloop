"use client";

import { useActionState, useState } from "react";
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
          <h2 className="text-sm font-medium text-stone-500">1. Pick an available donation</h2>
          <div className="mt-2 space-y-2">
            {donations.map((d) => (
              <label
                key={d.id}
                className={`block cursor-pointer rounded-md border px-3 py-2 text-sm ${
                  donationId === d.id ? "border-emerald-600 bg-emerald-50" : "border-stone-200 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="donation_pick"
                  className="mr-2"
                  checked={donationId === d.id}
                  onChange={() => setDonationId(d.id)}
                />
                <span className="font-medium text-stone-900">{d.food_type}</span> · {d.quantity_meals} meals
                <div className="ml-5 text-xs text-stone-500">
                  Deadline {formatDateTime(d.pickup_deadline)} ({timeUntil(d.pickup_deadline)})
                </div>
              </label>
            ))}
            {donations.length === 0 && <p className="text-sm text-stone-500">No available donations right now.</p>}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-stone-500">2. Pick a verified need zone</h2>
          <div className="mt-2 space-y-2">
            {zones.map((z) => (
              <label
                key={z.id}
                className={`block cursor-pointer rounded-md border px-3 py-2 text-sm ${
                  zoneId === z.id ? "border-emerald-600 bg-emerald-50" : "border-stone-200 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="zone_pick"
                  className="mr-2"
                  checked={zoneId === z.id}
                  onChange={() => setZoneId(z.id)}
                />
                <span className="font-medium text-stone-900">{z.location_text}</span>
                <div className="ml-5 text-xs text-stone-500">
                  {z.estimated_people ? `~${z.estimated_people} people` : "no estimate"} · {z.urgency} urgency
                </div>
              </label>
            ))}
            {zones.length === 0 && <p className="text-sm text-stone-500">No active need zones yet.</p>}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-stone-500">3. Optionally pre-assign a runner</h2>
        <p className="text-xs text-stone-500">Leave blank to let any available volunteer accept it from their dashboard.</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <select name="volunteer_id" className="rounded-md border border-stone-300 px-3 py-2 text-sm">
            <option value="">— No pre-assigned volunteer —</option>
            {volunteers.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.phone || "no phone"})
              </option>
            ))}
          </select>
          <select name="ngo_id" className="rounded-md border border-stone-300 px-3 py-2 text-sm">
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
        className="rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
      >
        {pending ? "Matching..." : "Create match"}
      </button>
    </form>
  );
}
