import Link from "next/link";
import { MapPinned, Link2, Bike, PackagePlus, ArrowRight } from "lucide-react";
import { DemoBadge } from "@/components/DemoBadge";

const DEMOS = [
  {
    icon: MapPinned,
    color: "var(--color-role-ngo)",
    bg: "var(--color-role-ngo-bg)",
    title: "Food map",
    body: "See a sample micro-market: restaurants, need zones and available runners.",
    href: "/demo/map",
  },
  {
    icon: Link2,
    color: "var(--color-brand-700)",
    bg: "var(--color-brand-50)",
    title: "Matching decision",
    body: "Given a donation and three possible zones, which one should GoodLoop prioritise?",
    href: "/demo/match",
  },
  {
    icon: Bike,
    color: "var(--color-role-volunteer)",
    bg: "var(--color-role-volunteer-bg)",
    title: "Take a food run",
    body: "Experience the volunteer journey from accept to distribution complete.",
    href: "/demo/run",
  },
  {
    icon: PackagePlus,
    color: "var(--color-role-restaurant)",
    bg: "var(--color-role-restaurant-bg)",
    title: "Try donating surplus",
    body: "Walk through listing a donation the way a restaurant would.",
    href: "/demo/donate",
  },
];

export default function DemoHubPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <DemoBadge />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
          Explore a live example
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sand-600">
          Nothing here touches a real account or a real donation — it&apos;s all sample data, so you can click
          around freely and see exactly how GoodLoop behaves.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {DEMOS.map((d) => (
          <Link
            key={d.title}
            href={d.href}
            className="flex flex-col rounded-2xl border border-sand-200 bg-white p-6 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sand-900/5"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ color: d.color, backgroundColor: d.bg }}
            >
              <d.icon className="h-6 w-6" strokeWidth={2} />
            </span>
            <h2 className="mt-4 font-semibold text-sand-900">{d.title}</h2>
            <p className="mt-1 text-sm text-sand-500">{d.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
              Try it
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
