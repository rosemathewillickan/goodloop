"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { roleHome } from "@/lib/profile";
import type { Role } from "@/lib/supabase/types";

export type FormState = { error: string | null };

export async function completeOnboarding(_prev: FormState, formData: FormData): Promise<FormState> {
  const role = String(formData.get("role") ?? "") as Role;
  const organizationName = String(formData.get("organization_name") ?? "").trim();

  if (!["restaurant", "volunteer", "ngo"].includes(role)) {
    return { error: "Choose a valid account type." };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("complete_oauth_onboarding", {
    p_role: role,
    p_organization_name: organizationName || null,
  });
  if (error) return { error: error.message };

  redirect(roleHome[role]);
}
