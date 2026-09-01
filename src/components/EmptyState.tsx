import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  illustration,
  title,
  hint,
}: {
  icon?: LucideIcon;
  illustration?: ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-sand-300 bg-white/60 px-6 py-8 text-center">
      {illustration ? (
        <div className="h-28 w-36">{illustration}</div>
      ) : Icon ? (
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-100 text-sand-400">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      ) : null}
      <p className="text-sm font-medium text-sand-600">{title}</p>
      {hint && <p className="text-xs text-sand-400">{hint}</p>}
    </div>
  );
}
