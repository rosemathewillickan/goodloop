import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [pendingProfiles, activeDonations, pendingZones, openIncidents] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("verification_status", "pending"),
    supabase.from("donations").select("*", { count: "exact", head: true }).in("status", ["available", "assigned", "picked_up"]),
    supabase.from("need_zones").select("*", { count: "exact", head: true }).eq("status", "pending_verification"),
    supabase.from("incidents").select("*", { count: "exact", head: true }).eq("status", "open"),
  ]);

  const cards = [
    { label: "Pending verifications", value: pendingProfiles.count ?? 0, href: "/admin/verify" },
    { label: "Active donations", value: activeDonations.count ?? 0, href: "/admin/match" },
    { label: "Need zones awaiting review", value: pendingZones.count ?? 0, href: "/admin/zones" },
    { label: "Open incidents", value: openIncidents.count ?? 0, href: "/admin/incidents" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Operations console</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-lg border border-stone-200 bg-white p-4 hover:border-emerald-300 hover:shadow-sm">
            <p className="text-3xl font-semibold text-stone-900">{c.value}</p>
            <p className="mt-1 text-sm text-stone-500">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
