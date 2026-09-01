import Link from "next/link";
import {
  Leaf,
  Home,
  PackagePlus,
  History,
  Bike,
  MapPinned,
  Route,
  LayoutDashboard,
  BadgeCheck,
  Package,
  Link2,
  Flag,
  Bell,
  Waypoints,
  Compass,
  HandHeart,
} from "lucide-react";
import { getCurrentProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { ROLE_META } from "@/lib/roles";
import type { Role } from "@/lib/supabase/types";

const PUBLIC_NAV_LINKS = [
  { href: "/how-it-works", label: "How it works", icon: Waypoints },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/impact", label: "Impact", icon: HandHeart },
];

const NAV_LINKS: Record<Role, { href: string; label: string; icon: typeof Home }[]> = {
  restaurant: [
    { href: "/restaurant", label: "Home", icon: Home },
    { href: "/restaurant/new", label: "Donate food", icon: PackagePlus },
    { href: "/restaurant/donations", label: "History", icon: History },
  ],
  volunteer: [
    { href: "/volunteer", label: "Available runs", icon: Bike },
    { href: "/volunteer/history", label: "History", icon: History },
  ],
  ngo: [
    { href: "/ngo", label: "Need zones", icon: MapPinned },
    { href: "/ngo/runs", label: "Runs", icon: Route },
  ],
  admin: [
    { href: "/admin", label: "Console", icon: LayoutDashboard },
    { href: "/admin/verify", label: "Verify", icon: BadgeCheck },
    { href: "/admin/donations", label: "Donations", icon: Package },
    { href: "/admin/zones", label: "Zones", icon: MapPinned },
    { href: "/admin/match", label: "Match", icon: Link2 },
    { href: "/admin/incidents", label: "Incidents", icon: Flag },
  ],
};

export async function Navbar() {
  const profile = await getCurrentProfile();
  let unread = 0;

  if (profile) {
    const supabase = await createClient();
    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", profile.id)
      .is("read_at", null);
    unread = count ?? 0;
  }

  const meta = profile ? ROLE_META[profile.role] : null;
  const RoleIcon = meta?.icon;

  return (
    <header className="sticky top-0 z-20 border-b border-sand-200/70 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href={profile ? "/dashboard" : "/"} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
            <Leaf className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-brand-800">GoodLoop</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {(profile ? NAV_LINKS[profile.role] : PUBLIC_NAV_LINKS).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-sand-600 hover:bg-sand-100 hover:text-sand-900"
            >
              <link.icon className="h-4 w-4" strokeWidth={2.25} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {profile ? (
            <>
              <Link
                href="/notifications"
                className="relative rounded-full p-2 text-sand-600 hover:bg-sand-100"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" strokeWidth={2.25} />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-600 text-[10px] font-semibold text-white ring-2 ring-sand-50">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>
              {meta && RoleIcon && (
                <span
                  className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium sm:flex"
                  style={{ color: meta.color, backgroundColor: meta.bg }}
                >
                  <RoleIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                  {profile.name || meta.label}
                </span>
              )}
              <form action={signOut}>
                <button className="rounded-full border border-sand-300 bg-white px-3 py-1.5 text-sm font-medium text-sand-700 hover:bg-sand-100">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-sand-600 hover:text-sand-900">
                Log in
              </Link>
              <Link
                href="/get-involved"
                className="rounded-full bg-accent-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700"
              >
                Get involved
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-sand-200/70 px-4 py-1.5 sm:hidden">
        {(profile ? NAV_LINKS[profile.role] : PUBLIC_NAV_LINKS).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm text-sand-600 hover:bg-sand-100"
          >
            <link.icon className="h-3.5 w-3.5" strokeWidth={2.25} />
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
