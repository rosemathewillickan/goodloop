"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/profile";

export type FormState = { error: string | null };

export async function setVerification(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireRole("admin");
  const profileId = String(formData.get("profile_id") ?? "");
  const status = String(formData.get("status") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.rpc("set_verification", { p_profile_id: profileId, p_status: status });
  if (error) return { error: error.message };

  revalidatePath("/admin/verify");
  return { error: null };
}

export async function verifyNeedZone(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireRole("admin");
  const zoneId = String(formData.get("zone_id") ?? "");
  const approve = formData.get("approve") === "true";

  const supabase = await createClient();
  const { error } = await supabase.rpc("verify_need_zone", { p_zone_id: zoneId, p_approve: approve });
  if (error) return { error: error.message };

  revalidatePath("/admin/zones");
  revalidatePath("/admin/match");
  return { error: null };
}

export async function createMatch(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireRole("admin");
  const donationId = String(formData.get("donation_id") ?? "");
  const needZoneId = String(formData.get("need_zone_id") ?? "");
  const volunteerId = String(formData.get("volunteer_id") ?? "") || null;
  const ngoId = String(formData.get("ngo_id") ?? "") || null;

  if (!donationId || !needZoneId) return { error: "Pick a donation and a need zone." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("create_food_run", {
    p_donation_id: donationId,
    p_need_zone_id: needZoneId,
    p_volunteer_id: volunteerId,
    p_ngo_id: ngoId,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/match");
  revalidatePath("/admin");
  return { error: null };
}

export async function resolveIncident(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireRole("admin");
  const incidentId = String(formData.get("incident_id") ?? "");
  const resolutionNote = String(formData.get("resolution_note") ?? "");
  const escalate = formData.get("escalate") === "true";

  const supabase = await createClient();
  const { error } = await supabase.rpc("resolve_incident", {
    p_incident_id: incidentId,
    p_resolution_note: resolutionNote,
    p_escalate: escalate,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/incidents");
  return { error: null };
}
