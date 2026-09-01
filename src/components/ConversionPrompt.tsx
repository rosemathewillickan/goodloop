import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ConversionPrompt({
  question,
  body,
  ctaLabel,
  href,
}: {
  question: string;
  body?: string;
  ctaLabel: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6 text-center sm:p-8">
      <h3 className="text-xl font-semibold text-sand-900">{question}</h3>
      {body && <p className="mx-auto mt-1.5 max-w-md text-sm text-sand-600">{body}</p>}
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-medium text-white shadow-md shadow-accent-600/25 transition-transform hover:-translate-y-0.5 hover:bg-accent-700"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
