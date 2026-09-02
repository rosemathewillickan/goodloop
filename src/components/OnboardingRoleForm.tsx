"use client";

import { useActionState, useState } from "react";
import { ChefHat, Bike, HeartHandshake } from "lucide-react";
import { completeOnboarding, type FormState } from "@/app/onboarding/actions";
import { ROLE_META } from "@/lib/roles";
import type { Role } from "@/lib/supabase/types";

const initialState: FormState = { error: null };

const ROLES: { value: Role; label: string; hint: string; icon: typeof ChefHat }[] = [
  { value: "restaurant", label: "Restaurant / Hotel", hint: "Donate surplus food", icon: ChefHat },
  { value: "volunteer", label: "Volunteer", hint: "Run food pickups & drop-offs", icon: Bike },
  { value: "ngo", label: "NGO / Community partner", hint: "Verify need, coordinate distribution", icon: HeartHandshake },
];

export function OnboardingRoleForm() {
  const [state, formAction, pending] = useActionState(completeOnboarding, initialState);
  const [role, setRole] = useState<Role>("volunteer");
  const needsOrg = role === "restaurant" || role === "ngo";

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <span className="block text-sm font-medium text-sand-700">I am a...</span>
        <div className="mt-2 space-y-2">
          {ROLES.map((r) => {
            const meta = ROLE_META[r.value];
            const selected = role === r.value;
            return (
              <label
                key={r.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-sm transition-colors ${
                  selected ? "" : "border-sand-300 hover:bg-sand-50"
                }`}
                style={selected ? { borderColor: meta.color, backgroundColor: meta.bg } : undefined}
              >
                <input
                  type="radio"
                  name="role"
                  value={r.value}
                  checked={selected}
                  onChange={() => setRole(r.value)}
                  className="sr-only"
                />
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={selected ? { backgroundColor: meta.color, color: "white" } : { backgroundColor: "var(--color-sand-100)", color: "var(--color-sand-500)" }}
                >
                  <r.icon className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="block font-medium text-sand-900">{r.label}</span>
                  <span className="block text-xs text-sand-500">{r.hint}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {needsOrg && (
        <div>
          <label className="block text-sm font-medium text-sand-700" htmlFor="organization_name">
            Organization name
          </label>
          <input
            id="organization_name"
            name="organization_name"
            required
            className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          />
        </div>
      )}

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700 disabled:opacity-60"
      >
        {pending ? "Setting up your account..." : "Continue"}
      </button>
    </form>
  );
}
