import Link from "next/link";
import { getCurrentProfile, roleHome } from "@/lib/profile";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await getCurrentProfile();
  if (profile) redirect(roleHome[profile.role]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">GoodLoop</p>
      <h1 className="mt-3 text-4xl font-semibold text-stone-900 sm:text-5xl">
        Turn safe surplus food into a meal before it becomes waste.
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">
        Restaurants list surplus. Verified volunteers and NGOs move it to people who need it.
        No app, registration, or payment required from the people receiving food.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/signup"
          className="rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Get started
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
        >
          Log in
        </Link>
      </div>

      <div className="mt-16 grid gap-6 text-left sm:grid-cols-3">
        {[
          { title: "Restaurants", body: "List surplus food in under a minute and see it reach someone." },
          { title: "Volunteers", body: "Find nearby food runs and complete them with clear pickup/drop steps." },
          { title: "NGOs", body: "Verify recurring need zones and coordinate larger distributions." },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="font-medium text-stone-900">{f.title}</h3>
            <p className="mt-1 text-sm text-stone-600">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
