import { redirect } from "next/navigation";
import { requireProfile, roleHome } from "@/lib/profile";

export default async function DashboardRedirect() {
  const profile = await requireProfile();
  redirect(roleHome[profile.role]);
}
