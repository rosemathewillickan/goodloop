"use client";

import { useActionState, useState } from "react";
import { Heart, IndianRupee } from "lucide-react";
import { pledgeSupport, type FormState } from "@/app/support/actions";

const initialState: FormState = { error: null };

const PRESET_AMOUNTS = [100, 250, 500, 1000];

export function PledgeForm() {
  const [state, formAction, pending] = useActionState(pledgeSupport, initialState);
  const [selected, setSelected] = useState<number | "custom">(250);
  const [customAmount, setCustomAmount] = useState("");

  if (state.success) {
    const amount = selected === "custom" ? customAmount : selected;
    return (
      <div className="rounded-3xl border-2 border-role-supporter/30 bg-white p-8 text-center shadow-sm shadow-sand-900/5">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "var(--color-role-supporter-bg)", color: "var(--color-role-supporter)" }}>
          <Heart className="h-7 w-7" strokeWidth={2} fill="currentColor" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-sand-900">Thank you for pledging ₹{amount}!</h2>
        <p className="mt-2 text-sm leading-relaxed text-sand-600">
          Your pledge has been recorded and is already reflected in the totals below. Every bit helps keep
          pickups, packaging and outreach moving.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-3xl border-2 border-sand-200 bg-white p-8 shadow-sm shadow-sand-900/5">
      <label className="block text-sm font-medium text-sand-700">Choose an amount</label>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PRESET_AMOUNTS.map((amt) => {
          const isSelected = selected === amt;
          return (
            <button
              key={amt}
              type="button"
              onClick={() => setSelected(amt)}
              className="flex items-center justify-center gap-0.5 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors"
              style={
                isSelected
                  ? { borderColor: "var(--color-role-supporter)", backgroundColor: "var(--color-role-supporter-bg)", color: "var(--color-role-supporter)" }
                  : { borderColor: "var(--color-sand-300)", color: "var(--color-sand-700)" }
              }
            >
              <IndianRupee className="h-3.5 w-3.5" strokeWidth={2.5} />
              {amt}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setSelected("custom")}
        className="mt-2 flex w-full items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-colors"
        style={
          selected === "custom"
            ? { borderColor: "var(--color-role-supporter)", backgroundColor: "var(--color-role-supporter-bg)", color: "var(--color-role-supporter)" }
            : { borderColor: "var(--color-sand-300)", color: "var(--color-sand-700)" }
        }
      >
        <IndianRupee className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
        <input
          type="number"
          min={1}
          max={1000000}
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelected("custom");
          }}
          className="w-full bg-transparent text-sm outline-none placeholder:text-sand-400"
        />
      </button>

      <input type="hidden" name="amount_inr" value={selected === "custom" ? customAmount : selected} />

      <div className="mt-4">
        <label className="block text-sm font-medium text-sand-700" htmlFor="supporter_name">
          Your name <span className="font-normal text-sand-400">(optional)</span>
        </label>
        <input
          id="supporter_name"
          name="supporter_name"
          className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-sand-700" htmlFor="message">
          A note of encouragement <span className="font-normal text-sand-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        />
      </div>

      {state.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-sm disabled:opacity-60"
        style={{ backgroundColor: "var(--color-role-supporter)" }}
      >
        {pending ? "Recording your pledge..." : "Pledge support"}
      </button>
    </form>
  );
}
