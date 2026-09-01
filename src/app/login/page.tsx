"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { signIn, type FormState } from "@/app/auth/actions";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

const initialState: FormState = { error: null };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <div className="relative mx-auto flex min-h-[75vh] max-w-sm flex-col justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, var(--color-sun-100) 0%, transparent 40%), radial-gradient(circle at 85% 85%, var(--color-brand-100) 0%, transparent 40%)",
        }}
      />
      <div className="rounded-3xl border-2 border-sand-200 bg-white p-8 shadow-sm shadow-sand-900/5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white">
          <Leaf className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-sand-900">Log in</h1>
        <p className="mt-1 text-sm text-sand-500">Welcome back to GoodLoop.</p>

        <div className="mt-6">
          <GoogleSignInButton />
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-sand-200" />
          <span className="text-xs text-sand-400">or</span>
          <span className="h-px flex-1 bg-sand-200" />
        </div>

        <form action={formAction} className="space-y-4">
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
            {pending ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-sand-500">
        New here?{" "}
        <Link href="/signup" className="font-medium text-brand-700 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
