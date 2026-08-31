"use client";

import { useActionState } from "react";
import { resolveIncident, type FormState } from "@/app/admin/actions";

const initial: FormState = { error: null };

export function ResolveIncidentForm({ incidentId }: { incidentId: string }) {
  const [state, formAction, pending] = useActionState(resolveIncident, initial);

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <input type="hidden" name="incident_id" value={incidentId} />
      <textarea
        name="resolution_note"
        placeholder="Resolution note"
        rows={2}
        className="w-full rounded-md border border-stone-300 px-3 py-1.5 text-sm"
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          name="escalate"
          value="false"
          disabled={pending}
          className="rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          Mark resolved
        </button>
        <button
          type="submit"
          name="escalate"
          value="true"
          disabled={pending}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
        >
          Escalate
        </button>
      </div>
    </form>
  );
}
