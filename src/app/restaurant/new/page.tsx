"use client";

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { createDonation, type FormState } from "@/app/restaurant/actions";

const MapPicker = dynamic(() => import("@/components/MapPicker").then((m) => m.MapPicker), {
  ssr: false,
  loading: () => <div className="h-[280px] animate-pulse rounded-md border border-stone-300 bg-stone-100" />,
});

const initialState: FormState = { error: null };

function inHours(h: number) {
  const d = new Date(Date.now() + h * 3600_000);
  d.setSeconds(0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default function NewDonationPage() {
  const [state, formAction, pending] = useActionState(createDonation, initialState);
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-stone-900">Donate surplus food</h1>
      <p className="mt-1 text-sm text-stone-500">Takes about a minute. This becomes visible to operators once submitted.</p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700" htmlFor="food_type">
            Food type
          </label>
          <input
            id="food_type"
            name="food_type"
            required
            placeholder="e.g. Vegetable biryani + rotis"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700" htmlFor="quantity_meals">
              Approx. meals
            </label>
            <input
              id="quantity_meals"
              name="quantity_meals"
              type="number"
              min={1}
              required
              className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700" htmlFor="pickup_deadline">
              Pickup deadline
            </label>
            <input
              id="pickup_deadline"
              name="pickup_deadline"
              type="datetime-local"
              defaultValue={inHours(2)}
              required
              className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700" htmlFor="dietary_info">
            Dietary / handling info
          </label>
          <input
            id="dietary_info"
            name="dietary_info"
            placeholder="e.g. Vegetarian, contains nuts, keep refrigerated"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700" htmlFor="address_text">
            Pickup address (optional label)
          </label>
          <input
            id="address_text"
            name="address_text"
            placeholder="e.g. Back entrance, Green Leaf Restaurant"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-stone-700">Pickup location</span>
          <div className="mt-1">
            <MapPicker value={pin} onChange={setPin} />
          </div>
          <input type="hidden" name="lat" value={pin?.lat ?? ""} />
          <input type="hidden" name="lng" value={pin?.lng ?? ""} />
        </div>

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {pending ? "Listing..." : "List this donation"}
        </button>
      </form>
    </div>
  );
}
