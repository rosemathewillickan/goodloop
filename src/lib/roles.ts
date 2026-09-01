import { ChefHat, Bike, HeartHandshake, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Role } from "@/lib/supabase/types";

export const ROLE_META: Record<
  Role,
  { label: string; icon: LucideIcon; color: string; bg: string }
> = {
  restaurant: { label: "Restaurant", icon: ChefHat, color: "var(--color-role-restaurant)", bg: "var(--color-role-restaurant-bg)" },
  volunteer: { label: "Volunteer", icon: Bike, color: "var(--color-role-volunteer)", bg: "var(--color-role-volunteer-bg)" },
  ngo: { label: "NGO partner", icon: HeartHandshake, color: "var(--color-role-ngo)", bg: "var(--color-role-ngo-bg)" },
  admin: { label: "Operator", icon: ShieldCheck, color: "var(--color-role-admin)", bg: "var(--color-role-admin-bg)" },
};
