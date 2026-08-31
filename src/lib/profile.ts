import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Role } from "@/lib/supabase/types";

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data as Profile | null;
}

export async function requireProfile(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  return profile;
}

export async function requireRole(role: Role): Promise<Profile> {
  const profile = await requireProfile();
  if (profile.role !== role) redirect("/dashboard");
  return profile;
}

export const roleHome: Record<Role, string> = {
  restaurant: "/restaurant",
  volunteer: "/volunteer",
  ngo: "/ngo",
  admin: "/admin",
};
