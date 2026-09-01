const OUTLINE = "#241a10";

export function EmptyDonationsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
      <ellipse cx="80" cy="104" rx="52" ry="8" fill="var(--color-sand-200)" />
      <path d="M32 58a48 20 0 0 1 96 0v6a48 20 0 0 1-96 0z" fill="var(--color-brand-100)" stroke={OUTLINE} strokeWidth="2.4" strokeLinejoin="round" />
      <ellipse cx="80" cy="58" rx="48" ry="20" fill="var(--color-brand-200)" stroke={OUTLINE} strokeWidth="2.4" />
      <ellipse cx="80" cy="58" rx="36" ry="13" fill="var(--color-sand-50)" stroke={OUTLINE} strokeWidth="2" />
      <path d="M56 50c4-6 12-9 24-9s20 3 24 9" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
      <circle cx="118" cy="30" r="5" fill="var(--color-sun-300)" stroke={OUTLINE} strokeWidth="1.6" />
      <circle cx="130" cy="44" r="3" fill="var(--color-accent-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="30" cy="34" r="4" fill="var(--color-sky-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <path d="M80 20v10M75 24h10" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
