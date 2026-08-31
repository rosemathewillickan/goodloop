"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { roleHome } from "@/lib/profile";
import type { Role } from "@/lib/supabase/types";

export type FormState = { error: string | null };

export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const role = String(formData.get("role") ?? "") as Role;
  const organizationName = String(formData.get("organization_name") ?? "");

  if (!["restaurant", "volunteer", "ngo"].includes(role)) {
    return { error: "Choose a valid account type." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role, name, phone, organization_name: organizationName } },
  });

  if (error) return { error: error.message };
  if (!data.session) {
    return { error: "Check your inbox to confirm your email, then log in." };
  }

  redirect(roleHome[role]);
}

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
