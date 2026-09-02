import Link from "next/link";
import { HandHeart, Users2 } from "lucide-react";
import { DemoBadge } from "@/components/DemoBadge";
import { PledgeForm } from "@/components/PledgeForm";
import { ImpactCounter } from "@/components/ImpactCounter";
import { Doodle } from "@/components/illustrations/Doodle";
import { getSupporterTotals } from "./actions";

export default async function SupportPage() {
  const totals = await getSupporterTotals();

  return (
    <div className="relative overflow-hidden">
      <Doodle kind="heart" color="var(--color-role-supporter)" className="pointer-events-none absolute left-[10%] top-10 h-8 w-8" />
      <Doodle kind="sparkle" color="var(--color-sun-400)" className="pointer-events-none absolute right-[12%] top-16 h-6 w-6" />

      <div className="relative mx-auto max-w-2xl px-4 py-14">
        <div className="text-center">
          <DemoBadge label="No real payment is processed — this records your pledge only" />
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
            Support GoodLoop directly
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sand-600">
            Pledge an amount to help cover pickups, packaging and outreach — the costs behind every
            meal that moves through the loop. No account needed.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-sand-200 bg-white p-4 text-center">
            <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--color-role-supporter-bg)", color: "var(--color-role-supporter)" }}>
              <HandHeart className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <p className="mt-2 text-xl font-semibold text-sand-900">
              ₹<ImpactCounter value={totals.total_amount_inr.toLocaleString("en-IN")} />
            </p>
            <p className="text-xs text-sand-500">Pledged so far</p>
          </div>
          <div className="rounded-2xl border-2 border-sand-200 bg-white p-4 text-center">
            <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--color-role-supporter-bg)", color: "var(--color-role-supporter)" }}>
              <Users2 className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <p className="mt-2 text-xl font-semibold text-sand-900">
              <ImpactCounter value={totals.total_pledges.toLocaleString("en-IN")} />
            </p>
            <p className="text-xs text-sand-500">Supporters</p>
          </div>
        </div>

        <div className="mt-8">
          <PledgeForm />
        </div>

        <p className="mt-8 text-center text-sm text-sand-500">
          Prefer to see the bigger picture first?{" "}
          <Link href="/impact" className="font-medium text-brand-700 hover:underline">
            View GoodLoop&apos;s impact
          </Link>
        </p>
      </div>
    </div>
  );
}
