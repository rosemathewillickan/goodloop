import {
  PackageOpen,
  Link2,
  PackageCheck,
  CheckCircle2,
  AlarmClockOff,
  XCircle,
  Clock,
  BadgeCheck,
  Flag,
  AlertTriangle,
  Circle,
  type LucideIcon,
} from "lucide-react";

const CONFIG: Record<string, { classes: string; icon?: LucideIcon }> = {
  available: { classes: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200", icon: PackageOpen },
  assigned: { classes: "bg-sun-100 text-amber-700 ring-1 ring-inset ring-sun-300", icon: Link2 },
  picked_up: { classes: "bg-sun-100 text-amber-700 ring-1 ring-inset ring-sun-300", icon: PackageCheck },
  distributed: { classes: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200", icon: CheckCircle2 },
  expired: { classes: "bg-sand-100 text-sand-600 ring-1 ring-inset ring-sand-200", icon: AlarmClockOff },
  cancelled: { classes: "bg-sand-100 text-sand-600 ring-1 ring-inset ring-sand-200", icon: XCircle },
  failed: { classes: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200", icon: XCircle },
  pending_verification: { classes: "bg-sun-100 text-amber-700 ring-1 ring-inset ring-sun-300", icon: Clock },
  pending: { classes: "bg-sun-100 text-amber-700 ring-1 ring-inset ring-sun-300", icon: Clock },
  active: { classes: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200", icon: BadgeCheck },
  verified: { classes: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200", icon: BadgeCheck },
  rejected: { classes: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200", icon: XCircle },
  open: { classes: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200", icon: Flag },
  resolved: { classes: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200", icon: CheckCircle2 },
  escalated: { classes: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200", icon: AlertTriangle },
  low: { classes: "bg-sand-100 text-sand-600 ring-1 ring-inset ring-sand-200", icon: Circle },
  medium: { classes: "bg-sun-100 text-amber-700 ring-1 ring-inset ring-sun-300", icon: Circle },
  high: { classes: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200", icon: Circle },
};

export function StatusBadge({ status }: { status: string }) {
  const config = CONFIG[status] ?? { classes: "bg-sand-100 text-sand-600 ring-1 ring-inset ring-sand-200" };
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${config.classes}`}
    >
      {Icon && <Icon className="h-3 w-3" strokeWidth={2.5} />}
      {status.replace(/_/g, " ")}
    </span>
  );
}
