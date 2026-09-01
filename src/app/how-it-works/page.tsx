"use client";

import { useState } from "react";
import Link from "next/link";
import { Soup, Waypoints, Bike, MapPinned, HandHeart, ChevronDown, ArrowRight } from "lucide-react";

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
          Tap a stage to see how it works, with a real example moving through the system.
        </p>
      </div>

      <ol className="mt-10 space-y-3">
        {STAGES.map((stage, i) => {
          const open = openIndex === i;
          return (
            <li key={stage.n} className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
              <button
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold"
                  style={{ color: stage.color, backgroundColor: stage.bg }}
                >
                  <stage.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="flex-1">
                  <span className="block text-xs font-medium text-sand-400">STAGE {stage.n}</span>
                  <span className="block font-semibold text-sand-900">{stage.title}</span>
                  {!open && <span className="block text-sm text-sand-500">{stage.summary}</span>}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-sand-400 transition-transform ${open ? "rotate-180" : ""}`}
                  strokeWidth={2.25}
                />
              </button>

              {open && (
                <div className="px-5 pb-5 pl-[76px]">
                  <div className="flex flex-wrap gap-2">
                    {stage.example.map((e) => (
                      <span
                        key={e}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ color: stage.color, backgroundColor: stage.bg }}
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-sand-600">{stage.detail}</p>
                </div>
              )}

              {i < STAGES.length - 1 && <div className="ml-[44px] h-3 w-px bg-sand-200" />}
            </li>
          );
        })}
      </ol>

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
          className="rounded-full border border-sand-300 bg-white px-6 py-3 text-sm font-medium text-sand-700 hover:bg-sand-100"
        >
          See how each role participates
        </Link>
      </div>
    </div>
  );
}
