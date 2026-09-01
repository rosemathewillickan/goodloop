"use client";

import { useState } from "react";
import Link from "next/link";
import { Soup, Waypoints, Bike, MapPinned, HandHeart, ChevronDown, ArrowRight, PartyPopper } from "lucide-react";
import { WindingRoad } from "@/components/illustrations/WindingRoad";
import { StartFlagIllustration } from "@/components/illustrations/StartFlag";

const STAGES = [
  {
    n: "01",
    icon: Soup,
    color: "var(--color-role-restaurant)",
    bg: "var(--color-role-restaurant-bg)",
    title: "A restaurant has safe surplus food",
    summary: "A kitchen lists what's left over before it goes to waste.",
    example: ["40 meals available", "Pickup by 9:30 PM"],
    detail:
      "Restaurants, hotels, caterers and bakeries can list surplus food in under a minute — food type, quantity, prep time, and a pickup deadline. Nothing goes live until the account is verified.",
  },
  {
    n: "02",
    icon: Waypoints,
    color: "var(--color-brand-700)",
    bg: "var(--color-brand-50)",
    title: "GoodLoop finds a suitable path",
    summary: "The listing is matched against verified need, not guesswork.",
    example: ["Restaurant", "→ Food Runner", "→ Verified Need Zone"],
    detail:
      "An operator matches the donation to an active, NGO- or community-verified need zone — weighing distance, urgency, quantity and how much time is left before the food is no longer safe to move.",
  },
  {
    n: "03",
    icon: Bike,
    color: "var(--color-role-volunteer)",
    bg: "var(--color-role-volunteer-bg)",
    title: "A food runner accepts the run",
    summary: "A nearby volunteer picks up the run that fits their time and route.",
    example: ["2.1 km away", "35 min available", "40 meals"],
    detail:
      "Verified volunteers see open runs with everything they need to decide fast: distance, quantity, and how much time it'll take — then confirm pickup and drop-off as they go.",
  },
  {
    n: "04",
    icon: MapPinned,
    color: "var(--color-role-ngo)",
    bg: "var(--color-role-ngo-bg)",
    title: "Food reaches the distribution point",
    summary: "It arrives at a verified need zone — not a guess, a known need.",
    example: ["Distribution confirmed", "No beneficiary sign-up required"],
    detail:
      "The people receiving food never need to register, prove circumstances, or use an app. GoodLoop moves food to trusted, verified zones — community organisations and NGOs handle the last few meters.",
  },
  {
    n: "05",
    icon: HandHeart,
    color: "var(--color-accent-600)",
    bg: "var(--color-accent-50)",
    title: "The impact is recorded",
    summary: "A donation only counts as successful once it's actually distributed.",
    example: ["40 meals redistributed"],
    detail:
      "Every step is logged — created, matched, accepted, picked up, distributed — so restaurants see real impact, and operators can spot and fix failures instead of quietly losing food.",
  },
];

export default function HowItWorksPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">How GoodLoop works</h1>
        <p className="mx-auto mt-3 max-w-xl text-sand-600">
          Follow the loop, stop by stop — tap a stage for the full story, with a real example moving through
          the system.
        </p>
      </div>

      <div className="relative mt-6">
        <WindingRoad className="pointer-events-none absolute inset-0 h-full w-full" />

        <div className="relative flex flex-col gap-6 py-6">
          <div className="flex items-center gap-2 pl-2 sm:pl-6">
            <StartFlagIllustration className="h-10 w-10" />
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sand-500 shadow-sm">
              Start
            </span>
          </div>

          {STAGES.map((stage, i) => {
            const open = openIndex === i;
            const alignRight = i % 2 === 1;
            return (
              <div key={stage.n} className={`flex ${alignRight ? "justify-end" : "justify-start"} px-1 sm:px-4`}>
                <div className={`w-full max-w-sm ${alignRight ? "sm:-rotate-1" : "sm:rotate-1"}`}>
                  <button
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-start gap-3 rounded-3xl border-2 border-sand-200 bg-white p-4 text-left shadow-sm shadow-sand-900/5 transition-transform hover:-translate-y-0.5"
                  >
                    <span
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold"
                      style={{ color: stage.color, backgroundColor: stage.bg }}
                    >
                      <stage.icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-semibold tracking-wide" style={{ color: stage.color }}>
                        STOP {stage.n}
                      </span>
                      <span className="block font-semibold text-sand-900">{stage.title}</span>
                      <span className="mt-1.5 flex flex-wrap gap-1.5">
                        {stage.example.map((e) => (
                          <span
                            key={e}
                            className="rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{ color: stage.color, backgroundColor: stage.bg }}
                          >
                            {e}
                          </span>
                        ))}
                      </span>
                      {open && <span className="mt-2 block text-sm leading-relaxed text-sand-600">{stage.detail}</span>}
                    </span>
                    <ChevronDown
                      className={`mt-1 h-4 w-4 shrink-0 text-sand-400 transition-transform ${open ? "rotate-180" : ""}`}
                      strokeWidth={2.25}
                    />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center px-1 sm:px-4">
            <div className="flex max-w-sm flex-col items-center gap-1.5 rounded-3xl border border-accent-200 bg-accent-50 p-6 text-center shadow-sm">
              <PartyPopper className="h-6 w-6 text-accent-600" strokeWidth={2} />
              <p className="font-semibold text-sand-900">That&apos;s the loop, closed.</p>
              <p className="text-sm text-sand-600">Surplus food became a meal — and the cycle starts again.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/demo/match"
          className="flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-medium text-white shadow-md shadow-accent-600/25 hover:bg-accent-700"
        >
          Try the matching decision yourself
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
        <Link
          href="/explore"
          className="rounded-full border-2 border-sand-300 bg-white px-6 py-3 text-sm font-medium text-sand-700 hover:bg-sand-100"
        >
          See how each role participates
        </Link>
      </div>
    </div>
  );
}
