import Link from "next/link";
import { ChefHat, Bike, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";

const STAKEHOLDERS = [
  {
    icon: ChefHat,
    color: "var(--color-role-restaurant)",
    bg: "var(--color-role-restaurant-bg)",
    title: "Restaurant",
    question: "Have surplus food?",
    body: "List safe surplus in under 2 minutes.",
    cta: "See how restaurants participate",
    href: "/demo/donate",
  },
  {
    icon: Bike,
    color: "var(--color-role-volunteer)",
    bg: "var(--color-role-volunteer-bg)",
    title: "Food Runner",
    question: "Have time to help?",
    body: "Pick up nearby food and move it where it's needed.",
    cta: "See a sample food run",
    href: "/demo/run",
  },
  {
    icon: HeartHandshake,
    color: "var(--color-role-ngo)",
    bg: "var(--color-role-ngo-bg)",
    title: "NGO / Community Partner",
    question: "Know where help is needed?",
    body: "Verify recurring need zones and coordinate distribution.",
    cta: "See how partners participate",
    href: "/demo/match",
  },
  {
    icon: Sparkles,
    color: "var(--color-accent-600)",
    bg: "var(--color-accent-50)",
    title: "Supporter",
    question: "Want to make an impact?",
    body: "Explore GoodLoop's impact and discover ways to support the network.",
    cta: "See the impact",
    href: "/impact",
  },
];

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
          How you can be part of the loop
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sand-600">
          Browse freely — you don&apos;t need to pick one yet. Each leads to a live example you can try.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {STAKEHOLDERS.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="flex flex-col rounded-2xl border border-sand-200 bg-white p-6 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sand-900/5"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ color: s.color, backgroundColor: s.bg }}
            >
              <s.icon className="h-6 w-6" strokeWidth={2} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-sand-900">{s.title}</h2>
            <p className="mt-1 text-sm font-medium text-sand-700">{s.question}</p>
            <p className="mt-1 text-sm text-sand-500">{s.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: s.color }}>
              {s.cta}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-sand-500">
        Not ready to try a demo?{" "}
        <Link href="/get-involved" className="font-medium text-brand-700 hover:underline">
          Skip ahead to get involved
        </Link>
      </p>
    </div>
  );
}
