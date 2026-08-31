const STYLES: Record<string, string> = {
  available: "bg-sky-100 text-sky-800",
  assigned: "bg-amber-100 text-amber-800",
  picked_up: "bg-amber-100 text-amber-800",
  distributed: "bg-emerald-100 text-emerald-800",
  expired: "bg-stone-200 text-stone-700",
  cancelled: "bg-stone-200 text-stone-700",
  failed: "bg-red-100 text-red-800",
  pending_verification: "bg-amber-100 text-amber-800",
  pending: "bg-amber-100 text-amber-800",
  active: "bg-emerald-100 text-emerald-800",
  verified: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  open: "bg-sky-100 text-sky-800",
  resolved: "bg-emerald-100 text-emerald-800",
  escalated: "bg-red-100 text-red-800",
  low: "bg-stone-100 text-stone-700",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STYLES[status] ?? "bg-stone-100 text-stone-700";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
