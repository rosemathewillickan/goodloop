"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/profile";

export type FormState = { error: string | null };

// The RPC itself allows either the owning restaurant (donation still 'available')
// or an admin (any non-terminal status) — this layer just needs an authenticated user.
export async function cancelDonation(_prev: FormState, formData: FormData): Promise<FormState> {
  const profile = await requireProfile();
  const donationId = String(formData.get("donation_id") ?? "");
  const reason = String(formData.get("reason") ?? "") || "Cancelled";

  const supabase = await createClient();
  const { error } = await supabase.rpc("cancel_donation", { p_donation_id: donationId, p_reason: reason });
  if (error) return { error: error.message };

  revalidatePath(`/${profile.role}/donations/${donationId}`);
  revalidatePath(`/${profile.role}`);
  return { error: null };
}
