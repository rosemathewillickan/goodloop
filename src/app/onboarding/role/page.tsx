import { redirect } from "next/navigation";
import { UserPlus } from "lucide-react";
import { getCurrentProfile, roleHome } from "@/lib/profile";
import { OnboardingRoleForm } from "@/components/OnboardingRoleForm";
import { LogoMark } from "@/components/illustrations/Logo";

export default async function OnboardingRolePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (!profile.needs_role_selection) redirect(roleHome[profile.role]);

  return (
    <div className="relative mx-auto flex min-h-[75vh] max-w-md flex-col justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 15% 10%, var(--color-berry-100) 0%, transparent 40%), radial-gradient(circle at 90% 90%, var(--color-sky-100) 0%, transparent 40%)",
        }}
      />
      <div className="rounded-3xl border-2 border-sand-200 bg-white p-8 shadow-sm shadow-sand-900/5">
        <LogoMark className="h-11 w-11" />
        <h1 className="mt-4 text-2xl font-semibold text-sand-900">Welcome, {profile.name || "there"}!</h1>
        <p className="mt-1 text-sm text-sand-500">
          Google doesn&apos;t tell us what you&apos;ll be doing on GoodLoop — pick the role that fits.
          You can change this later with help from an operator.
        </p>

        <div className="mt-6">
          <OnboardingRoleForm />
        </div>
      </div>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-sand-400">
        <UserPlus className="h-3 w-3" strokeWidth={2.25} />
        This only appears once, right after your first Google sign-in.
      </p>
    </div>
  );
}
