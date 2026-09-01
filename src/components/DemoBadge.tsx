import { Sparkles } from "lucide-react";

export function DemoBadge({ label = "Demo — example data, not a real account" }: { label?: string }) {
  return (
    <span className="inline-flex -rotate-2 items-center gap-1.5 rounded-full bg-sun-100 px-3 py-1 text-xs font-medium text-amber-800 shadow-sm ring-1 ring-inset ring-sun-300">
      <Sparkles className="h-3 w-3" strokeWidth={2.5} />
      {label}
    </span>
  );
}
