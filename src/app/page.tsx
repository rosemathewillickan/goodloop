import Link from "next/link";
import { ChefHat, Bike, HeartHandshake, Leaf, ArrowRight, ShieldCheck } from "lucide-react";
import { getCurrentProfile, roleHome } from "@/lib/profile";
import { redirect } from "next/navigation";
import { HeroLoopIllustration } from "@/components/illustrations/HeroLoop";

export default async function Home() {
  const profile = await getCurrentProfile();
  if (profile) redirect(roleHome[profile.role]);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 15% 10%, var(--color-brand-100) 0%, transparent 45%), radial-gradient(circle at 85% 0%, var(--color-sun-100) 0%, transparent 45%), radial-gradient(circle at 60% 90%, var(--color-berry-100) 0%, transparent 40%)",
          }}
        />
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:gap-4">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200">
              <Leaf className="h-3.5 w-3.5" strokeWidth={2.5} />
              GoodLoop
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-sand-900 sm:text-5xl">
              Keep good food
              <span className="text-accent-600"> going.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-sand-600 lg:mx-0">
              Good food is often left behind while someone nearby may need a meal. GoodLoop connects
              surplus food with trusted people and places that can move it where it matters.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/how-it-works"
                className="flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-medium text-white shadow-md shadow-accent-600/25 transition-transform hover:-translate-y-0.5 hover:bg-accent-700"
              >
                Explore GoodLoop
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/get-involved"
                className="rounded-full border border-sand-300 bg-white px-6 py-3 text-sm font-medium text-sand-700 hover:bg-sand-100"
              >
                I&apos;m ready to help
              </Link>
            </div>
            <p className="mt-4 text-sm text-sand-500">
              No account needed to look around.{" "}
              <Link href="/login" className="font-medium text-brand-700 hover:underline">
                Already part of the loop? Log in
              </Link>
            </p>
          </div>

          <HeroLoopIllustration className="mx-auto w-full max-w-md lg:max-w-none" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: ChefHat,
              title: "Restaurants",
              body: "List surplus food in under a minute and see it reach someone.",
              color: "var(--color-role-restaurant)",
              bg: "var(--color-role-restaurant-bg)",
              href: "/demo/donate",
            },
            {
              icon: Bike,
              title: "Volunteers",
              body: "Find nearby food runs and complete them with clear pickup/drop steps.",
              color: "var(--color-role-volunteer)",
              bg: "var(--color-role-volunteer-bg)",
              href: "/demo/run",
            },
            {
              icon: HeartHandshake,
              title: "NGOs",
              body: "Verify recurring need zones and coordinate larger distributions.",
              color: "var(--color-role-ngo)",
              bg: "var(--color-role-ngo-bg)",
              href: "/explore",
            },
          ].map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group block rounded-2xl border border-sand-200 bg-white p-5 transition-transform hover:-translate-y-1 hover:-rotate-1 hover:shadow-lg hover:shadow-sand-900/5"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:rotate-6"
                style={{ color: f.color, backgroundColor: f.bg }}
              >
                <f.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 font-semibold text-sand-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-sand-600">{f.body}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-700">Try it out →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="flex items-start gap-4 rounded-2xl border border-sand-200 bg-white p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <ShieldCheck className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="font-semibold text-sand-900">Built around dignity, not data collection</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-sand-600">
              GoodLoop is designed so that people who need food don&apos;t need to use the app to receive it.
              No registration, no proving circumstances, no unnecessary personal information — the system
              comes to them, not the other way around.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
