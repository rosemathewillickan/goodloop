export function StartFlagIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <line x1="18" y1="8" x2="18" y2="52" stroke="var(--color-sand-500)" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 10 L46 17 L18 24 Z" fill="var(--color-accent-600)" />
      <circle cx="18" cy="54" r="5" fill="var(--color-sand-200)" />
    </svg>
  );
}
