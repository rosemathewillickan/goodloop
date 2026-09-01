import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  href,
  color = "var(--color-brand-700)",
  bg = "var(--color-brand-50)",
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  href?: string;
  color?: string;
  bg?: string;
}) {
  const content = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ color, backgroundColor: bg }}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <p className="mt-3 text-2xl font-semibold text-sand-900">{value}</p>
      <p className="mt-0.5 text-sm text-sand-500">{label}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-2xl border border-sand-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-900/5"
      >
        {content}
      </Link>
    );
  }

  return <div className="rounded-2xl border border-sand-200 bg-white p-4">{content}</div>;
}
