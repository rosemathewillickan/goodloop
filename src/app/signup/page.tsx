"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUp, type FormState } from "@/app/auth/actions";
import type { Role } from "@/lib/supabase/types";

const initialState: FormState = { error: null };

const ROLES: { value: Role; label: string; hint: string }[] = [
  { value: "restaurant", label: "Restaurant / Hotel", hint: "Donate surplus food" },
  { value: "volunteer", label: "Volunteer", hint: "Run food pickups & drop-offs" },
  { value: "ngo", label: "NGO / Community partner", hint: "Verify need, coordinate distribution" },
];

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signUp, initialState);
  const [role, setRole] = useState<Role>("restaurant");
  const needsOrg = role === "restaurant" || role === "ngo";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-semibold text-stone-900">Create an account</h1>
      <p className="mt-1 text-sm text-stone-500">Join the GoodLoop network.</p>

      <form action={formAction} className="mt-8 space-y-4">
        <div>
          <span className="block text-sm font-medium text-stone-700">I am a...</span>
          <div className="mt-2 space-y-2">
            {ROLES.map((r) => (
              <label
                key={r.value}
                className={`flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2 text-sm ${
                  role === r.value ? "border-emerald-600 bg-emerald-50" : "border-stone-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={r.value}
                  checked={role === r.value}
                  onChange={() => setRole(r.value)}
                  className="mt-0.5"
                />
                <span>
                  <span className="block font-medium text-stone-900">{r.label}</span>
                  <span className="block text-xs text-stone-500">{r.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {needsOrg && (
          <div>
            <label className="block text-sm font-medium text-stone-700" htmlFor="organization_name">
              Organization name
            </label>
            <input
              id="organization_name"
              name="organization_name"
              required
              className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-stone-700" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={6}
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {pending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-stone-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-emerald-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
