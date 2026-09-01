"use client";

import { Suspense, useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChefHat, Bike, HeartHandshake, UserPlus } from "lucide-react";
import { signUp, type FormState } from "@/app/auth/actions";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { ROLE_META } from "@/lib/roles";
import type { Role } from "@/lib/supabase/types";

const initialState: FormState = { error: null };

const ROLES: { value: Role; label: string; hint: string; icon: typeof ChefHat }[] = [
  { value: "restaurant", label: "Restaurant / Hotel", hint: "Donate surplus food", icon: ChefHat },
  { value: "volunteer", label: "Volunteer", hint: "Run food pickups & drop-offs", icon: Bike },
  { value: "ngo", label: "NGO / Community partner", hint: "Verify need, coordinate distribution", icon: HeartHandshake },
];

function roleFromParam(value: string | null): Role {
  return value === "volunteer" || value === "ngo" || value === "restaurant" ? value : "restaurant";
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState(signUp, initialState);
  const [role, setRole] = useState<Role>(() => roleFromParam(searchParams.get("role")));
  const needsOrg = role === "restaurant" || role === "ngo";

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
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white">
          <UserPlus className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-sand-900">Create an account</h1>
        <p className="mt-1 text-sm text-sand-500">Join the GoodLoop network.</p>

        <div className="mt-6">
          <GoogleSignInButton />
          <p className="mt-2 text-center text-xs text-sand-400">
            Starts as a volunteer — an operator can change your role after sign-up.
          </p>
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-sand-200" />
          <span className="text-xs text-sand-400">or sign up with a role</span>
          <span className="h-px flex-1 bg-sand-200" />
        </div>

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
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
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

          <div>
            <label className="block text-sm font-medium text-sand-700" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            />
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

          <div>
            <label className="block text-sm font-medium text-sand-700" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sand-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sand-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={6}
              required
              className="mt-1 w-full rounded-xl border-2 border-sand-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
            />
          </div>

          {state.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent-600/20 hover:bg-accent-700 disabled:opacity-60"
          >
            {pending ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-sand-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
