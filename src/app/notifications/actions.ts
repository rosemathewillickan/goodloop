"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/profile";

export async function markAllRead() {
  const profile = await requireProfile();
  const supabase = await createClient();
  await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("user_id", profile.id).is("read_at", null);
  revalidatePath("/notifications");
}
