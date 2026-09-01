"use client";

import { useState } from "react";
import { Bike, MapPin, Clock, Soup, CheckCircle2, PartyPopper } from "lucide-react";
import { DemoBadge } from "@/components/DemoBadge";
import { ConversionPrompt } from "@/components/ConversionPrompt";
import { HelpingHandsIllustration } from "@/components/illustrations/HelpingHands";
import { DEMO_RUN, DEMO_RUN_STEPS } from "@/lib/demoData";

export default function DemoRunPage() {
  // -1 = not accepted yet, 0..steps.length-1 = current step index
  const [stepIndex, setStepIndex] = useState(-1);
  const started = stepIndex >= 0;
  const done = stepIndex === DEMO_RUN_STEPS.length - 1;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="text-center">
        <HelpingHandsIllustration className="mx-auto h-28 w-auto" />
        <DemoBadge />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">Take a food run</h1>
        <p className="mx-auto mt-3 max-w-md text-sand-600">You have 45 minutes and a bike. Here&apos;s a run nearby.</p>
      </div>

      <div className="mt-8 rounded-2xl border-2 border-sand-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-role-restaurant-bg text-role-restaurant">
            <Soup className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="font-semibold text-sand-900">{DEMO_RUN.restaurant}</p>
            <p className="text-sm text-sand-500">{DEMO_RUN.meals} meals · pickup by {DEMO_RUN.pickupDeadline}</p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-sand-50 p-4 text-sm">
          <div>
            <dt className="flex items-center gap-1 text-sand-500">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} />
              Pickup
            </dt>
            <dd className="font-medium text-sand-900">{DEMO_RUN.distanceToPickupKm} km away</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-sand-500">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} />
              Drop-off
            </dt>
            <dd className="font-medium text-sand-900">{DEMO_RUN.distanceToDropoffKm} km away</dd>
          </div>
          <div className="col-span-2">
            <dt className="flex items-center gap-1 text-sand-500">
              <Clock className="h-3.5 w-3.5" strokeWidth={2.25} />
              Estimated total time
            </dt>
            <dd className="font-medium text-sand-900">{DEMO_RUN.estimatedMinutes} min</dd>
          </div>
        </dl>

        {!started ? (
          <button
            onClick={() => setStepIndex(0)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-4 py-3 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700"
          >
            <Bike className="h-4 w-4" strokeWidth={2.25} />
            Accept Demo Run
          </button>
        ) : (
          <div className="mt-6">
            <ol className="space-y-4">
              {DEMO_RUN_STEPS.map((step, i) => {
                const reached = i <= stepIndex;
                const current = i === stepIndex;
                return (
                  <li key={step.key} className="flex gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        reached ? "bg-brand-600 text-white" : "bg-sand-100 text-sand-400"
                      }`}
                    >
                      {reached ? <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} /> : i + 1}
                    </span>
                    <div>
                      <p className={`text-sm font-medium ${reached ? "text-sand-900" : "text-sand-400"}`}>{step.label}</p>
                      {current && <p className="text-sm text-sand-500">{step.detail}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>

            {!done ? (
              <button
                onClick={() => setStepIndex((i) => Math.min(i + 1, DEMO_RUN_STEPS.length - 1))}
                className="mt-5 w-full rounded-full bg-brand-600 px-4 py-3 text-sm font-medium text-white hover:bg-brand-700"
              >
                {DEMO_RUN_STEPS[stepIndex + 1]?.label}
              </button>
            ) : (
              <div className="mt-6 rounded-xl bg-brand-50 p-4 text-center">
                <PartyPopper className="mx-auto h-6 w-6 text-brand-600" strokeWidth={2} />
                <p className="mt-2 font-semibold text-sand-900">You just completed a GoodLoop run.</p>
                <p className="text-sm text-sand-600">{DEMO_RUN.meals} meals successfully moved.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {done && (
        <div className="mt-8">
          <ConversionPrompt question="Want to do this for real?" ctaLabel="Become a Food Runner" href="/signup?role=volunteer" />
        </div>
      )}
    </div>
  );
}
