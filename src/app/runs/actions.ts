"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/profile";

export type FormState = { error: string | null };

// Role checks live in the Postgres RPCs (accept_food_run etc. check
// is_verified('volunteer') / is_verified('ngo') themselves) — this layer only
// needs an authenticated user and revalidates whichever dashboard called it.
export async function acceptRun(_prev: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireProfile();
  const runId = String(formData.get("run_id") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.rpc("accept_food_run", { p_run_id: runId });
  if (error) return { error: error.message };

  revalidatePath(`/${profile.role}`);
  revalidatePath(`/${profile.role}/runs/${runId}`);
  return { error: null };
}

export async function confirmPickup(_prev: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireProfile();
  const runId = String(formData.get("run_id") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.rpc("confirm_pickup", { p_run_id: runId });
  if (error) return { error: error.message };

  revalidatePath(`/${profile.role}/runs/${runId}`);
  return { error: null };
}

export async function confirmDistribution(_prev: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireProfile();
  const runId = String(formData.get("run_id") ?? "");
  const meals = Number(formData.get("meals_distributed") ?? 0);
  const supabase = await createClient();
  const { error } = await supabase.rpc("confirm_distribution", { p_run_id: runId, p_meals_distributed: meals });
  if (error) return { error: error.message };

  revalidatePath(`/${profile.role}/runs/${runId}`);
  revalidatePath(`/${profile.role}/history`);
  return { error: null };
}

export async function failRun(_prev: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireProfile();
  const runId = String(formData.get("run_id") ?? "");
  const reason = String(formData.get("reason") ?? "Could not complete the run");
  const supabase = await createClient();
  const { error } = await supabase.rpc("fail_run", { p_run_id: runId, p_reason: reason });
  if (error) return { error: error.message };

  revalidatePath(`/${profile.role}/runs/${runId}`);
  revalidatePath(`/${profile.role}`);
  return { error: null };
}
