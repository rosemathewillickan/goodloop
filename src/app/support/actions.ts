"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error: string | null; success?: boolean };

export async function pledgeSupport(_prev: FormState, formData: FormData): Promise<FormState> {
  const amount = Number(formData.get("amount_inr"));
  const name = String(formData.get("supporter_name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Enter an amount greater than zero." };
  }
  if (amount > 1000000) {
    return { error: "That amount is too large for this demo — try something smaller." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("supporter_pledges").insert({
    amount_inr: Math.round(amount),
    supporter_name: name || null,
    message: message || null,
  });
  if (error) return { error: error.message };

  revalidatePath("/support");
  return { error: null, success: true };
}

export async function getSupporterTotals() {
  const supabase = await createClient();
  const { data } = await supabase.rpc("supporter_pledge_totals").single<{
    total_amount_inr: number;
    total_pledges: number;
  }>();
  return data ?? { total_amount_inr: 0, total_pledges: 0 };
}
