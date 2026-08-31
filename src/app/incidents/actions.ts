"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/profile";

export type FormState = { error: string | null; success?: boolean };

export async function reportIncident(_prev: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireProfile();
  const runId = String(formData.get("run_id") ?? "");
  const category = String(formData.get("category") ?? "other");
  const severity = String(formData.get("severity") ?? "medium");
  const description = String(formData.get("description") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.from("incidents").insert({
    run_id: runId || null,
    reporter_id: profile.id,
    category,
    severity,
    description: description || null,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/incidents");
  return { error: null, success: true };
}
