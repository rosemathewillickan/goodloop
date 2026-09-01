import Link from "next/link";
import { ChefHat, Bike, HeartHandshake, Heart, ArrowRight, LogIn } from "lucide-react";
import { FoodClusterIllustration } from "@/components/illustrations/FoodCluster";

const PATHS = [
  {
    icon: ChefHat,
    color: "var(--color-role-restaurant)",
    bg: "var(--color-role-restaurant-bg)",
    title: "Donate food",
    body: "For restaurants, hotels, caterers and bakeries.",
    cta: "Start as a Food Partner",
    href: "/signup?role=restaurant",
    note: "Leads to account creation",
  },
  {
    icon: Bike,
    color: "var(--color-role-volunteer)",
    bg: "var(--color-role-volunteer-bg)",
    title: "Move food",
    body: "For people who can make nearby pickups.",
    cta: "Become a Food Runner",
    href: "/signup?role=volunteer",
    note: "Leads to account creation",
  },
  {
    icon: HeartHandshake,
    color: "var(--color-role-ngo)",
    bg: "var(--color-role-ngo-bg)",
    title: "Strengthen the network",
    body: "For NGOs and community organisations.",
    cta: "Become a Community Partner",
    href: "/signup?role=ngo",
    note: "Leads to account creation",
  },
  {
    icon: Heart,
    color: "var(--color-role-supporter)",
    bg: "var(--color-role-supporter-bg)",
    title: "Support the mission",
    body: "Curious about the impact, or just here to cheer the loop on.",
    cta: "See our impact",
    href: "/impact",
    note: "No account needed",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="relative overflow-hidden">
      <FoodClusterIllustration className="pointer-events-none absolute top-44 left-1/2 h-auto w-full max-w-xl -translate-x-1/2 opacity-30 sm:top-48" />
      <div className="relative mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">What can you do?</h1>
        <p className="mx-auto mt-3 max-w-xl text-sand-600">
          Pick the path that fits — you&apos;ll only be asked to create an account once you&apos;re ready to
          take a real action.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PATHS.map((p) => (
          <div
            key={p.title}
            className="group flex flex-col rounded-2xl border-2 border-sand-200 bg-white p-6 text-center transition-transform hover:-translate-y-1 hover:rotate-1 hover:shadow-lg hover:shadow-sand-900/5"
          >
            <span
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:-rotate-6"
              style={{ color: p.color, backgroundColor: p.bg }}
            >
              <p.icon className="h-6 w-6" strokeWidth={2} />
            </span>
            <h2 className="mt-4 font-semibold text-sand-900">{p.title}</h2>
            <p className="mt-1 text-sm text-sand-500">{p.body}</p>

            <Link
              href={p.href}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700"
            >
              {p.cta}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <p className="mt-2 flex items-center justify-center gap-1 text-xs text-sand-400">
              {p.note === "No account needed" ? (
                <Heart className="h-3 w-3" strokeWidth={2.25} />
              ) : (
                <LogIn className="h-3 w-3" strokeWidth={2.25} />
              )}
              {p.note}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-sand-500">
        Not sure yet?{" "}
        <Link href="/explore" className="font-medium text-brand-700 hover:underline">
          Explore each role first
        </Link>
      </p>
      </div>
    </div>
  );
}
