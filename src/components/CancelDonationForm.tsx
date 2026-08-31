"use client";

import { useActionState } from "react";
import { cancelDonation, type FormState } from "@/app/donations/actions";

const initialState: FormState = { error: null };

export function CancelDonationForm({ donationId }: { donationId: string }) {
  const [state, formAction, pending] = useActionState(cancelDonation, initialState);

  return (
    <form action={formAction} className="mt-4 flex items-start gap-2">
      <input type="hidden" name="donation_id" value={donationId} />
      <input
        name="reason"
        placeholder="Reason for cancelling (optional)"
        className="flex-1 rounded-md border border-stone-300 px-3 py-1.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
      />
      <button
        type="submit"
        disabled={pending}
        className="whitespace-nowrap rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
      >
        {pending ? "Cancelling..." : "Cancel donation"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
