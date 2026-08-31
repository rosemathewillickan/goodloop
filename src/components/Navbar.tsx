import Link from "next/link";
import { getCurrentProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import type { Role } from "@/lib/supabase/types";

const NAV_LINKS: Record<Role, { href: string; label: string }[]> = {
  restaurant: [
    { href: "/restaurant", label: "Home" },
    { href: "/restaurant/new", label: "Donate food" },
    { href: "/restaurant/donations", label: "History" },
  ],
  volunteer: [
    { href: "/volunteer", label: "Available runs" },
    { href: "/volunteer/history", label: "History" },
  ],
  ngo: [
    { href: "/ngo", label: "Need zones" },
    { href: "/ngo/runs", label: "Runs" },
  ],
  admin: [
    { href: "/admin", label: "Console" },
    { href: "/admin/verify", label: "Verify" },
    { href: "/admin/donations", label: "Donations" },
    { href: "/admin/zones", label: "Zones" },
    { href: "/admin/match", label: "Match" },
    { href: "/admin/incidents", label: "Incidents" },
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

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href={profile ? "/dashboard" : "/"} className="text-lg font-semibold text-emerald-800">
          GoodLoop
        </Link>

        {profile && (
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS[profile.role].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {profile ? (
            <>
              <Link href="/notifications" className="relative rounded-md p-1.5 text-sm text-stone-600 hover:bg-stone-100">
                Notifications
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-medium text-white">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>
              <span className="hidden text-sm text-stone-500 sm:inline">{profile.name || profile.role}</span>
              <form action={signOut}>
                <button className="rounded-md border border-stone-300 px-3 py-1.5 text-sm text-stone-700 hover:bg-stone-100">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-stone-600 hover:text-stone-900">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-800"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {profile && (
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-stone-100 px-4 py-1.5 sm:hidden">
          {NAV_LINKS[profile.role].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-3 py-1 text-sm text-stone-600 hover:bg-stone-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
