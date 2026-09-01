"use client";

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { MapPinned } from "lucide-react";
import { reportNeedZone, type FormState } from "@/app/need-zones/actions";

const MapPicker = dynamic(() => import("@/components/MapPicker").then((m) => m.MapPicker), {
  ssr: false,
  loading: () => <div className="h-[280px] animate-pulse rounded-xl border-2 border-sand-300 bg-sand-100" />,
});

const initialState: FormState = { error: null };

export default function NewNeedZonePage() {
  const [state, formAction, pending] = useActionState(reportNeedZone, initialState);
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-role-ngo-bg text-role-ngo">
          <MapPinned className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-sand-900">Report a need zone</h1>
          <p className="text-sm text-sand-500">An operator will verify this before it becomes visible for matching.</p>
        </div>
      </div>

      <form action={formAction} className="mt-6 space-y-4 rounded-2xl border-2 border-sand-200 bg-white p-5">
        <div>
          <label className="block text-sm font-medium text-sand-700" htmlFor="location_text">
            Location description
          </label>
          <input
            id="location_text"
            name="location_text"
            required
            placeholder="e.g. Under the flyover near Central Station, north side"
            className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sand-700" htmlFor="estimated_people">
              Estimated people
            </label>
            <input
              id="estimated_people"
              name="estimated_people"
              type="number"
              min={1}
              className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sand-700" htmlFor="urgency">
              Urgency
            </label>
            <select
              id="urgency"
              name="urgency"
              defaultValue="medium"
              className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-sand-700">
          <input type="checkbox" name="recurring" className="rounded border-sand-300" />
          This is a recurring need, not a one-off
        </label>

        <div>
          <span className="block text-sm font-medium text-sand-700">Location on map</span>
          <div className="mt-1">
            <MapPicker value={pin} onChange={setPin} pinColor="accent" />
          </div>
          <input type="hidden" name="lat" value={pin?.lat ?? ""} />
          <input type="hidden" name="lng" value={pin?.lng ?? ""} />
        </div>

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700 disabled:opacity-60"
        >
          {pending ? "Reporting..." : "Report need zone"}
        </button>
      </form>
    </div>
  );
}
