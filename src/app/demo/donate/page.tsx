"use client";

import { useState } from "react";
import { PackagePlus, MapPin, ArrowRight } from "lucide-react";
import { DemoBadge } from "@/components/DemoBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { ConversionPrompt } from "@/components/ConversionPrompt";
import { DEMO_DONATE_RESULTS } from "@/lib/demoData";

const STEPS = [
  { key: "foodType", label: "Food type", placeholder: "e.g. Vegetarian meals", default: "Vegetarian" },
  { key: "quantity", label: "Quantity", placeholder: "e.g. 40 meals", default: "40 meals" },
  { key: "preparedAt", label: "Prepared at", placeholder: "e.g. 8:00 PM", default: "8:00 PM" },
  { key: "pickupDeadline", label: "Pickup deadline", placeholder: "e.g. 9:30 PM", default: "9:30 PM" },
  { key: "handling", label: "Additional handling information", placeholder: "e.g. Keep refrigerated (optional)", default: "" },
];

export default function DemoDonatePage() {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(STEPS.map((s) => [s.key, s.default]))
  );
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <div className="text-center">
        <DemoBadge />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">Try donating surplus</h1>
        <p className="mx-auto mt-3 max-w-md text-sand-600">See what listing a donation feels like for a restaurant.</p>
      </div>

      {!submitted ? (
        <div className="mt-8 rounded-2xl border border-sand-200 bg-white p-6">
          <div className="mb-5 flex gap-1.5">
            {STEPS.map((s, i) => (
              <span key={s.key} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-role-restaurant" : "bg-sand-200"}`} />
            ))}
          </div>

          <p className="text-xs font-medium text-sand-400">STEP {step + 1} OF {STEPS.length}</p>
          <label className="mt-1 block text-lg font-semibold text-sand-900" htmlFor={current.key}>
            {current.label}
          </label>
          <input
            id={current.key}
            value={values[current.key]}
            onChange={(e) => setValues((v) => ({ ...v, [current.key]: e.target.value }))}
            placeholder={current.placeholder}
            className="mt-3 w-full rounded-xl border border-sand-300 px-3 py-2.5 text-sm focus:border-role-restaurant focus:outline-none focus:ring-1 focus:ring-role-restaurant"
          />

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-full border border-sand-300 px-4 py-2 text-sm font-medium text-sand-700 hover:enabled:bg-sand-100 disabled:opacity-40"
            >
              Back
            </button>
            {!isLast ? (
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="flex items-center gap-1.5 rounded-full bg-role-restaurant px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Next
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="flex items-center gap-1.5 rounded-full bg-accent-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700"
              >
                Find distribution paths
                <PackagePlus className="h-4 w-4" strokeWidth={2.25} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5 text-center">
            <p className="font-semibold text-brand-800">
              GoodLoop found {DEMO_DONATE_RESULTS.length} potential distribution paths.
            </p>
            <p className="text-sm text-brand-700/80">
              {values.quantity} of {values.foodType.toLowerCase()} food, pickup by {values.pickupDeadline}.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {DEMO_DONATE_RESULTS.map((r) => (
              <div key={r.zone} className="rounded-2xl border border-sand-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-1.5 font-semibold text-sand-900">
                    <MapPin className="h-4 w-4 text-role-ngo" strokeWidth={2.25} />
                    {r.zone}
                  </p>
                  <StatusBadge status={r.urgency} />
                </div>
                <p className="mt-1 text-sm text-sand-500">{r.distanceKm} km away</p>
                <p className="mt-1 text-sm text-sand-600">{r.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ConversionPrompt
              question="Ready to list your real surplus?"
              ctaLabel="Create a Restaurant Account"
              href="/signup?role=restaurant"
            />
          </div>
        </div>
      )}
    </div>
  );
}
