"use client";

import { useTransition } from "react";
import { Zap } from "lucide-react";
import { setAvailability } from "@/app/volunteer/actions";

export function AvailabilityToggle({ available }: { available: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => setAvailability(!available))}
      disabled={pending}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors disabled:opacity-60 ${
        available
          ? "bg-brand-600 text-white shadow-brand-600/20 hover:bg-brand-700"
          : "border-2 border-sand-300 bg-white text-sand-600 hover:bg-sand-100"
      }`}
    >
      <span className={`relative flex h-2 w-2 rounded-full ${available ? "bg-white" : "bg-sand-400"}`}>
        {available && <span className="absolute inset-0 animate-ping rounded-full bg-white opacity-75" />}
      </span>
      {available ? (
        <>
          <Zap className="h-4 w-4" strokeWidth={2.25} />
          Available for runs
        </>
      ) : (
        "Not available"
      )}
    </button>
  );
}
