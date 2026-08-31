"use client";

import { useActionState, useState } from "react";
import { reportIncident, type FormState } from "@/app/incidents/actions";

const initialState: FormState = { error: null };

export function IncidentForm({ runId }: { runId?: string }) {
  const [state, formAction, pending] = useActionState(reportIncident, initialState);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="mt-4 text-sm text-stone-500 underline hover:text-stone-700">
        Report an issue
      </button>
    );
  }

  if (state.success) {
    return <p className="mt-4 text-sm text-emerald-700">Reported. Operations will follow up.</p>;
  }

  return (
    <form action={formAction} className="mt-4 space-y-2 rounded-md border border-stone-200 bg-stone-50 p-3">
      {runId && <input type="hidden" name="run_id" value={runId} />}
      <div className="flex gap-2">
        <select name="category" className="rounded-md border border-stone-300 px-2 py-1.5 text-sm">
          <option value="food_safety">Food safety</option>
          <option value="pickup">Pickup</option>
          <option value="volunteer">Volunteer</option>
          <option value="distribution">Distribution</option>
          <option value="misinformation">Misinformation</option>
          <option value="other">Other</option>
        </select>
        <select name="severity" defaultValue="medium" className="rounded-md border border-stone-300 px-2 py-1.5 text-sm">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <textarea
        name="description"
        required
        placeholder="What happened?"
        rows={2}
        className="w-full rounded-md border border-stone-300 px-3 py-1.5 text-sm"
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-stone-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-stone-900 disabled:opacity-60"
        >
          {pending ? "Reporting..." : "Submit report"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-sm text-stone-500 hover:text-stone-700">
          Cancel
        </button>
      </div>
    </form>
  );
}
