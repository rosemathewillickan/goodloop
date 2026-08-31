"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn, type FormState } from "@/app/auth/actions";

const initialState: FormState = { error: null };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-semibold text-stone-900">Log in</h1>
      <p className="mt-1 text-sm text-stone-500">Welcome back to GoodLoop.</p>

      <form action={formAction} className="mt-8 space-y-4">
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
          {pending ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-stone-500">
        New here?{" "}
        <Link href="/signup" className="font-medium text-emerald-700 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
