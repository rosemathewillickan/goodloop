"use client";

import { useTransition } from "react";
import { setAvailability } from "@/app/volunteer/actions";

export function AvailabilityToggle({ available }: { available: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => setAvailability(!available))}
      disabled={pending}
      className={`rounded-md px-4 py-2 text-sm font-medium disabled:opacity-60 ${
        available ? "bg-emerald-700 text-white hover:bg-emerald-800" : "border border-stone-300 text-stone-700 hover:bg-stone-100"
      }`}
    >
      {available ? "Available for runs" : "Not available"}
    </button>
  );
}
