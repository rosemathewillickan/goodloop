"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireProfile, roleHome } from "@/lib/profile";

export type FormState = { error: string | null };

export async function reportNeedZone(_prev: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireProfile();
  const lat = Number(formData.get("lat"));
  const lng = Number(formData.get("lng"));
  if (!lat || !lng) return { error: "Drop a pin on the map for this location." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("report_need_zone", {
    p_location_text: String(formData.get("location_text") ?? ""),
    p_lat: lat,
    p_lng: lng,
    p_estimated_people: Number(formData.get("estimated_people")) || null,
    p_urgency: String(formData.get("urgency") ?? "medium"),
    p_recurring: formData.get("recurring") === "on",
  });
  if (error) return { error: error.message };

  revalidatePath(roleHome[profile.role]);
  redirect(roleHome[profile.role]);
}
