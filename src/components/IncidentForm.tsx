"use client";

import { useActionState, useState } from "react";
import { reportIncident, type FormState } from "@/app/incidents/actions";

const initialState: FormState = { error: null };

export function IncidentForm({ runId }: { runId?: string }) {
  const [state, formAction, pending] = useActionState(reportIncident, initialState);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="mt-4 text-sm text-sand-500 underline hover:text-sand-700">
        Report an issue
      </button>
    );
  }

  if (state.success) {
    return <p className="mt-4 text-sm text-brand-700">Reported. Operations will follow up.</p>;
  }

  return (
    <form action={formAction} className="mt-4 space-y-2 rounded-xl border border-sand-200 bg-sand-50 p-3">
      {runId && <input type="hidden" name="run_id" value={runId} />}
      <div className="flex gap-2">
        <select name="category" className="rounded-xl border border-sand-300 px-2 py-1.5 text-sm">
          <option value="food_safety">Food safety</option>
          <option value="pickup">Pickup</option>
          <option value="volunteer">Volunteer</option>
          <option value="distribution">Distribution</option>
          <option value="misinformation">Misinformation</option>
          <option value="other">Other</option>
        </select>
        <select name="severity" defaultValue="medium" className="rounded-xl border border-sand-300 px-2 py-1.5 text-sm">
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
        className="w-full rounded-xl border border-sand-300 px-3 py-1.5 text-sm"
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-sand-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-sand-900 disabled:opacity-60"
        >
          {pending ? "Reporting..." : "Submit report"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-sm text-sand-500 hover:text-sand-700">
          Cancel
        </button>
      </div>
    </form>
  );
}
