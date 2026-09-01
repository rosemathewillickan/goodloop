const OUTLINE = "#241a10";

export function EmptyIncidentsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
      <ellipse cx="80" cy="104" rx="52" ry="8" fill="var(--color-sand-200)" />
      <path
        d="M80 24l26 9v20c0 18-11 30-26 35-15-5-26-17-26-35V33z"
        fill="var(--color-brand-100)"
        stroke={OUTLINE}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M68 56l8 8 16-16" stroke={OUTLINE} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="38" r="4" fill="var(--color-sky-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="132" cy="32" r="5" fill="var(--color-sun-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="140" cy="52" r="3" fill="var(--color-accent-300)" stroke={OUTLINE} strokeWidth="1.4" />
    </svg>
  );
}
