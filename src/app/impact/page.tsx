import { HandHeart, Package, Bike, MapPinned, CheckCircle2 } from "lucide-react";
import { DemoBadge } from "@/components/DemoBadge";
import { ConversionPrompt } from "@/components/ConversionPrompt";
import { AvatarFace } from "@/components/illustrations/AvatarFace";
import { ImpactCounter } from "@/components/ImpactCounter";
import { DEMO_IMPACT_STATS } from "@/lib/demoData";

const ICONS = [HandHeart, Package, Bike, MapPinned, CheckCircle2];
const FACE_SEEDS = ["priya", "rahul", "amara", "leo", "nadia", "sam", "kofi", "mira"];

export default function ImpactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <DemoBadge label="Example impact dashboard" />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
          What GoodLoop measures
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sand-600">
          Every donation is only counted once it&apos;s actually distributed — not when it&apos;s listed, not
          when it&apos;s claimed. These are example numbers showing what the platform tracks, not a live
          production count.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
          {FACE_SEEDS.map((seed, i) => (
            <AvatarFace
              key={seed}
              seed={seed}
              className={`h-11 w-11 rounded-full ring-2 ring-sand-50 ${i % 2 === 0 ? "-rotate-3" : "rotate-3"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {DEMO_IMPACT_STATS.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <div key={s.label} className="rounded-2xl border-2 border-sand-200 bg-white p-4 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="mt-3 text-2xl font-semibold text-sand-900">
                <ImpactCounter value={s.value} />
              </p>
              <p className="mt-0.5 text-xs text-sand-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <ConversionPrompt
          question="Want to help keep the loop going?"
          body="Every role — restaurant, runner, or NGO — adds to numbers like these."
          ctaLabel="Get involved"
          href="/get-involved"
        />
      </div>
    </div>
  );
}
