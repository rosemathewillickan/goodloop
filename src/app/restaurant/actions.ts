"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/profile";

export type FormState = { error: string | null };

export async function createDonation(_prev: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireRole("restaurant");
  if (profile.verification_status !== "verified") {
    return { error: "Your account must be verified by an operator before you can list a donation." };
  }

  const lat = Number(formData.get("lat"));
  const lng = Number(formData.get("lng"));
  if (!lat || !lng) return { error: "Drop a pin on the map for the pickup location." };

  const quantity = Number(formData.get("quantity_meals"));
  const pickupDeadline = String(formData.get("pickup_deadline"));
  if (!pickupDeadline) return { error: "Set a pickup deadline." };
  if (new Date(pickupDeadline).getTime() <= Date.now()) {
    return { error: "Pickup deadline must be in the future." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("donations")
    .insert({
      restaurant_id: profile.id,
      food_type: String(formData.get("food_type") ?? ""),
      quantity_meals: quantity,
      dietary_info: String(formData.get("dietary_info") ?? "") || null,
      pickup_deadline: new Date(pickupDeadline).toISOString(),
      address_text: String(formData.get("address_text") ?? "") || null,
      lat,
      lng,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/restaurant");
  redirect(`/restaurant/donations/${data.id}`);
}
