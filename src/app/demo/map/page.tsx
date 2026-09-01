"use client";

import dynamic from "next/dynamic";
import { Soup, MapPinned, Bike } from "lucide-react";
import { DemoBadge } from "@/components/DemoBadge";
import { ConversionPrompt } from "@/components/ConversionPrompt";
import { DEMO_MAP_RESTAURANTS, DEMO_MAP_ZONES, DEMO_AVAILABLE_RUNNERS } from "@/lib/demoData";

const DemoMap = dynamic(() => import("@/components/DemoMap").then((m) => m.DemoMap), {
  ssr: false,
  loading: () => <div className="h-[360px] animate-pulse rounded-2xl border border-sand-300 bg-sand-100" />,
});

export default function DemoMapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <DemoBadge label="Demo — sample micro-market, not real locations" />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
          A sample micro-market
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sand-600">
          This is what an operator sees: surplus food nearby, verified need zones, and who&apos;s available to
          move it. Need zones are shown as approximate areas — GoodLoop never pinpoints beneficiaries.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-sand-200 bg-white p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-role-restaurant-bg text-role-restaurant">
            <Soup className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-lg font-semibold text-sand-900">{DEMO_MAP_RESTAURANTS.length} listings</p>
            <p className="text-xs text-sand-500">
              {DEMO_MAP_RESTAURANTS.reduce((s, r) => s + r.meals, 0)} meals available
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-sand-200 bg-white p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-role-ngo-bg text-role-ngo">
            <MapPinned className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-lg font-semibold text-sand-900">{DEMO_MAP_ZONES.length} need zones</p>
            <p className="text-xs text-sand-500">{DEMO_MAP_ZONES.reduce((s, z) => s + z.people, 0)} people, approx.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-sand-200 bg-white p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-role-volunteer-bg text-role-volunteer">
            <Bike className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-lg font-semibold text-sand-900">{DEMO_AVAILABLE_RUNNERS} runners</p>
            <p className="text-xs text-sand-500">available right now</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <DemoMap />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium text-sand-500">Surplus listings</h2>
          <div className="mt-2 space-y-2">
            {DEMO_MAP_RESTAURANTS.map((r) => (
              <div key={r.name} className="flex items-center justify-between rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-sm">
                <span className="font-medium text-sand-900">{r.name}</span>
                <span className="text-sand-500">{r.meals} meals</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-medium text-sand-500">Need zones</h2>
          <div className="mt-2 space-y-2">
            {DEMO_MAP_ZONES.map((z) => (
              <div key={z.name} className="flex items-center justify-between rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-sm">
                <span className="font-medium text-sand-900">{z.name}</span>
                <span className="text-sand-500">~{z.people} people</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ConversionPrompt
          question="Ready to see a decision get made?"
          body="Try matching this donation to the right zone yourself."
          ctaLabel="Try the matching demo"
          href="/demo/match"
        />
      </div>
    </div>
  );
}
