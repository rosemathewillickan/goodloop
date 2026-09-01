"use client";

import { useState } from "react";
import { Soup, Clock, MapPin, Users, CheckCircle2, XCircle } from "lucide-react";
import { DemoBadge } from "@/components/DemoBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { ConversionPrompt } from "@/components/ConversionPrompt";
import { DEMO_DONATION, DEMO_MATCH_OPTIONS, DEMO_MATCH_RECOMMENDED_ID, DEMO_MATCH_EXPLANATION } from "@/lib/demoData";

export default function DemoMatchPage() {
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === DEMO_MATCH_RECOMMENDED_ID;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="text-center">
        <DemoBadge />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
          Can you complete this GoodLoop run?
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sand-600">
          A restaurant just listed surplus food. Which zone should GoodLoop prioritise?
        </p>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-role-restaurant/30 bg-role-restaurant-bg p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-role-restaurant">
          <Soup className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <p className="font-semibold text-sand-900">{DEMO_DONATION.quantity} {DEMO_DONATION.foodType.toLowerCase()}</p>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-sand-600">
            <span>Prepared {DEMO_DONATION.preparedAt}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" strokeWidth={2.25} />
              Pickup deadline {DEMO_DONATION.pickupDeadline}
            </span>
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-sm font-medium text-sand-500">Pick a zone</h2>
      <div className="mt-3 space-y-3">
        {DEMO_MATCH_OPTIONS.map((z) => {
          const selected = picked === z.id;
          const isRecommended = z.id === DEMO_MATCH_RECOMMENDED_ID;
          return (
            <button
              key={z.id}
              onClick={() => setPicked(z.id)}
              disabled={picked !== null}
              className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors disabled:cursor-default ${
                selected
                  ? correct
                    ? "border-brand-400 bg-brand-50"
                    : "border-red-300 bg-red-50"
                  : picked && isRecommended
                    ? "border-brand-400 bg-brand-50"
                    : "border-sand-200 bg-white hover:enabled:border-sand-300"
              }`}
            >
              <div>
                <p className="flex items-center gap-2 font-semibold text-sand-900">
                  {z.zone}
                  {picked && isRecommended && <CheckCircle2 className="h-4 w-4 text-brand-600" strokeWidth={2.5} />}
                  {selected && !correct && <XCircle className="h-4 w-4 text-red-500" strokeWidth={2.5} />}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-sand-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} />
                    {z.distanceKm} km · {z.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" strokeWidth={2.25} />
                    {z.mealsNeeded} meals needed
                  </span>
                </p>
              </div>
              <StatusBadge status={z.urgency} />
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-6 rounded-2xl border-2 border-sand-200 bg-white p-5">
          <p className="font-semibold text-sand-900">
            {correct ? "Exactly right." : "Close — here's how GoodLoop would actually decide:"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-sand-600">{DEMO_MATCH_EXPLANATION}</p>
          <button
            onClick={() => setPicked(null)}
            className="mt-4 text-sm font-medium text-brand-700 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-10">
        <ConversionPrompt
          question="Know where help is needed?"
          body="NGOs and community partners verify zones like these for real."
          ctaLabel="Become a Community Partner"
          href="/signup?role=ngo"
        />
      </div>
    </div>
  );
}
