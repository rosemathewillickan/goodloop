"use client";

import { useActionState, useState } from "react";
import { acceptRun, confirmPickup, confirmDistribution, failRun, type FormState } from "@/app/runs/actions";
import type { FoodRun } from "@/lib/supabase/types";

const initial: FormState = { error: null };

function ActionForm({
  action,
  runId,
  label,
  pendingLabel,
  className,
  extraField,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  runId: string;
  label: string;
  pendingLabel: string;
  className: string;
  extraField?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, initial);
  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="run_id" value={runId} />
      {extraField}
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className={className}>
        {pending ? pendingLabel : label}
      </button>
    </form>
  );
}

export function RunActions({ run, isMine }: { run: FoodRun; isMine: boolean }) {
  const [showFail, setShowFail] = useState(false);
  const primaryBtn =
    "rounded-full bg-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700 disabled:opacity-60";
  const dangerBtn = "rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60";

  if (!isMine && run.status === "assigned" && !run.volunteer_id && !run.ngo_id) {
    return <ActionForm action={acceptRun} runId={run.id} label="Accept this run" pendingLabel="Accepting..." className={primaryBtn} />;
  }

  if (!isMine) return null;

  return (
    <div className="flex flex-wrap items-start gap-3">
      {run.status === "assigned" && (
        <ActionForm action={confirmPickup} runId={run.id} label="Confirm pickup" pendingLabel="Confirming..." className={primaryBtn} />
      )}
      {run.status === "picked_up" && (
        <ActionForm
          action={confirmDistribution}
          runId={run.id}
          label="Confirm distribution"
          pendingLabel="Confirming..."
          className={primaryBtn}
          extraField={
            <input
              name="meals_distributed"
              type="number"
              min={1}
              required
              placeholder="Meals distributed"
              className="w-40 rounded-xl border border-sand-300 px-2 py-1.5 text-sm"
            />
          }
        />
      )}
      {(run.status === "assigned" || run.status === "picked_up") &&
        (showFail ? (
          <ActionForm
            action={failRun}
            runId={run.id}
            label="Confirm cancellation"
            pendingLabel="Reporting..."
            className={dangerBtn}
            extraField={
              <input
                name="reason"
                required
                placeholder="Why can't this run be completed?"
                className="w-64 rounded-xl border border-sand-300 px-2 py-1.5 text-sm"
              />
            }
          />
        ) : (
          <button onClick={() => setShowFail(true)} className={dangerBtn}>
            I can&apos;t complete this run
          </button>
        ))}
    </div>
  );
}
