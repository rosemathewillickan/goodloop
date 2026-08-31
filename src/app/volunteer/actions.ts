"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/profile";

export async function setAvailability(available: boolean) {
  const profile = await requireRole("volunteer");
  const supabase = await createClient();
  const { error } = await supabase.from("volunteers").update({ available }).eq("profile_id", profile.id);
  if (error) throw new Error(error.message);
  revalidatePath("/volunteer");
}
