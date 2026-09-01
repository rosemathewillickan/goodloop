export function EmptyRunsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
      <ellipse cx="80" cy="104" rx="52" ry="8" fill="var(--color-sand-200)" />
      <circle cx="50" cy="80" r="18" fill="none" stroke="var(--color-sky-500)" strokeWidth="4" />
      <circle cx="112" cy="80" r="18" fill="none" stroke="var(--color-sky-500)" strokeWidth="4" />
      <path d="M50 80 68 48h16M68 48l20 32M96 80h16" stroke="var(--color-sand-600)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M68 48h10" stroke="var(--color-sand-600)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="88" cy="80" r="4" fill="var(--color-sand-600)" />
      <path d="M20 60c8-2 14 2 16 8" stroke="var(--color-sky-300)" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 70c6-1 10 2 12 6" stroke="var(--color-sky-300)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="130" cy="40" r="4" fill="var(--color-sun-300)" />
      <circle cx="140" cy="55" r="3" fill="var(--color-accent-300)" />
    </svg>
  );
}
