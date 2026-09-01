import { BadgeCheck, Package, MapPinned, Flag, HandHeart } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/StatCard";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [pendingProfiles, activeDonations, pendingZones, openIncidents, distributedRows] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("verification_status", "pending"),
    supabase.from("donations").select("*", { count: "exact", head: true }).in("status", ["available", "assigned", "picked_up"]),
    supabase.from("need_zones").select("*", { count: "exact", head: true }).eq("status", "pending_verification"),
    supabase.from("incidents").select("*", { count: "exact", head: true }).eq("status", "open"),
    supabase.from("donations").select("quantity_meals").eq("status", "distributed"),
  ]);

  const totalMeals = (distributedRows.data ?? []).reduce((sum, d) => sum + d.quantity_meals, 0);

  const cards = [
    { icon: BadgeCheck, label: "Pending verifications", value: pendingProfiles.count ?? 0, href: "/admin/verify", color: "var(--color-role-ngo)", bg: "var(--color-role-ngo-bg)" },
    { icon: Package, label: "Active donations", value: activeDonations.count ?? 0, href: "/admin/match", color: "var(--color-role-restaurant)", bg: "var(--color-role-restaurant-bg)" },
    { icon: MapPinned, label: "Need zones awaiting review", value: pendingZones.count ?? 0, href: "/admin/zones", color: "var(--color-sun-600)", bg: "var(--color-sun-100)" },
    { icon: Flag, label: "Open incidents", value: openIncidents.count ?? 0, href: "/admin/incidents", color: "#b91c1c", bg: "#fef2f2" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-sand-900">Operations console</h1>

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
          <HandHeart className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <p className="text-2xl font-semibold text-brand-800">{totalMeals} meals redistributed</p>
          <p className="text-sm text-brand-700/80">North-star metric — all confirmed distributions to date.</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <StatCard key={c.href} icon={c.icon} label={c.label} value={c.value} href={c.href} color={c.color} bg={c.bg} />
        ))}
      </div>
    </div>
  );
}
