const OUTLINE = "#241a10";

export function EmptyZonesIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
      <ellipse cx="80" cy="104" rx="52" ry="8" fill="var(--color-sand-200)" />
      <path
        d="M80 26c15.5 0 28 12.3 28 27.4C108 74 80 100 80 100S52 74 52 53.4C52 38.3 64.5 26 80 26z"
        fill="var(--color-berry-100)"
        stroke={OUTLINE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M80 61c-8.5-7.7-14-13-14-19.3 0-4.3 3.4-7.7 7.7-7.7 2.5 0 4.9 1.2 6.3 3.2 1.4-2 3.8-3.2 6.3-3.2 4.3 0 7.7 3.4 7.7 7.7 0 6.3-5.5 11.6-14 19.3z"
        fill="var(--color-berry-600)"
        stroke={OUTLINE}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="40" r="4" fill="var(--color-sky-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="126" cy="30" r="5" fill="var(--color-sun-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="136" cy="48" r="3" fill="var(--color-brand-300)" stroke={OUTLINE} strokeWidth="1.4" />
    </svg>
  );
}
