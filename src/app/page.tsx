import Link from "next/link";
import { ChefHat, Bike, HeartHandshake, Heart, Leaf, ArrowRight, ShieldCheck, Package } from "lucide-react";
import { getCurrentProfile, roleHome } from "@/lib/profile";
import { redirect } from "next/navigation";
import { EcosystemLoop } from "@/components/illustrations/EcosystemLoop";
import { FoodClusterIllustration } from "@/components/illustrations/FoodCluster";
import { AvatarFace, PersonFigure } from "@/components/illustrations/AvatarFace";
import { Doodle } from "@/components/illustrations/Doodle";
import { LoopNetwork } from "@/components/illustrations/LoopNetwork";

const FACE_SEEDS = ["priya", "rahul", "amara", "leo", "nadia", "sam"];

const LOOP_ROLES = [
  {
    icon: ChefHat,
    tag: "Donors",
    title: "Restaurants & Hotels",
    quote: "We have food to share.",
    color: "var(--color-role-restaurant)",
    bg: "var(--color-role-restaurant-bg)",
    href: "/demo/donate",
  },
  {
    icon: Bike,
    tag: "Movers",
    title: "Volunteers",
    quote: "We'll keep it moving.",
    color: "var(--color-role-volunteer)",
    bg: "var(--color-role-volunteer-bg)",
    href: "/demo/run",
  },
  {
    icon: HeartHandshake,
    tag: "Connectors",
    title: "NGOs",
    quote: "We'll get it where it matters.",
    color: "var(--color-role-ngo)",
    bg: "var(--color-role-ngo-bg)",
    href: "/explore",
  },
  {
    icon: Heart,
    tag: "Receivers",
    title: "Communities",
    quote: "Good food, right when it's needed.",
    color: "var(--color-role-supporter)",
    bg: "var(--color-role-supporter-bg)",
    href: "/impact",
  },
] as const;

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
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-sand-900 sm:text-6xl">
              Keep good food
              <span className="relative inline-block text-accent-600">
                {" "}
                going
                <svg viewBox="0 0 120 18" className="absolute -bottom-1 left-0 h-3 w-full text-sun-400" aria-hidden="true">
                  <path d="M2 12c20-10 96-10 116 0" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              .
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
                className="rounded-full border-2 border-sand-300 bg-white px-6 py-3 text-sm font-medium text-sand-700 hover:bg-sand-100"
              >
                I&apos;m ready to help
              </Link>
            </div>
            <p className="mt-4 text-sm text-sand-500">No account needed to look around.</p>

            <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
              <div className="flex -space-x-2.5">
                {FACE_SEEDS.map((seed) => (
                  <AvatarFace key={seed} seed={seed} className="h-9 w-9 rounded-full ring-2 ring-sand-50" />
                ))}
              </div>
              <span className="text-xs text-sand-500">already part of the loop</span>
            </div>
          </div>

          <EcosystemLoop className="mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-none" />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <FoodClusterIllustration className="pointer-events-none absolute top-36 left-1/2 h-auto w-full max-w-xl -translate-x-1/2 opacity-40 sm:top-40" />
        <div className="relative mx-auto max-w-5xl px-4 pb-16">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-sand-900 sm:text-3xl">Meet the GoodLoop.</h2>
            <p className="mt-2 text-sand-600">Everyone has a part to play.</p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LOOP_ROLES.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="group relative block rounded-2xl border-2 border-sand-200 bg-white p-5 transition-transform hover:-translate-y-1 hover:-rotate-1 hover:shadow-lg hover:shadow-sand-900/5"
              >
                <Doodle
                  kind="sparkle"
                  color={r.color}
                  className="absolute -right-2 -top-2 h-6 w-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:rotate-6"
                  style={{ color: r.color, backgroundColor: r.bg }}
                >
                  <r.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span
                  className="mt-4 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ color: r.color, backgroundColor: r.bg }}
                >
                  {r.tag}
                </span>
                <h3 className="mt-1.5 font-semibold text-sand-900">{r.title}</h3>
                <p className="mt-1 text-sm italic leading-relaxed text-sand-600">&ldquo;{r.quote}&rdquo;</p>
                <span className="mt-3 inline-block text-sm font-medium text-brand-700">Try it out →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-sand-900 sm:text-3xl">
            Good food is already moving.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sand-600">
            See how one small pickup can become part of something much bigger.
          </p>
        </div>
        <LoopNetwork className="mt-8" />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="flex items-start gap-4 rounded-2xl border-2 border-sand-200 bg-white p-6">
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

      <section className="relative overflow-hidden bg-brand-900 py-16">
        <Doodle kind="star" color="var(--color-sun-400)" className="absolute left-[8%] top-10 h-8 w-8" />
        <Doodle kind="heart" color="var(--color-berry-500)" className="absolute right-[10%] top-16 h-7 w-7" />
        <Doodle kind="sparkle" color="var(--color-sun-300)" className="absolute bottom-10 left-[15%] h-6 w-6" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Be part of the loop.</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Whether you donate, deliver, distribute or support — there&apos;s a place for you here.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/get-involved"
              className="flex items-center gap-2 rounded-full bg-sun-400 px-6 py-3 text-sm font-semibold text-brand-900 shadow-md transition-transform hover:-translate-y-0.5 hover:bg-sun-300"
            >
              Join GoodLoop
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link
              href="/explore"
              className="rounded-full border-2 border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Explore first
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            {[
              { seed: "cta-chef", pose: "wave" as const, bg: "var(--color-role-restaurant-bg)" },
              { seed: "cta-volunteer", pose: "carry" as const, bg: "var(--color-role-volunteer-bg)" },
              { seed: "cta-ngo", pose: "stand" as const, bg: "var(--color-role-ngo-bg)" },
            ].map((p) => (
              <span
                key={p.seed}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full ring-4 ring-white/20 sm:h-20 sm:w-20"
                style={{ backgroundColor: p.bg }}
              >
                <svg viewBox="0 0 60 155" className="h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]" aria-hidden="true">
                  <PersonFigure seed={p.seed} pose={p.pose} />
                </svg>
              </span>
            ))}
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 ring-4 ring-white/20 sm:h-20 sm:w-20">
              <Package className="h-7 w-7 text-white sm:h-8 sm:w-8" strokeWidth={2} />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
