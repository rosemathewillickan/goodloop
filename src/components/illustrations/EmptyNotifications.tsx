export function EmptyNotificationsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
      <ellipse cx="80" cy="104" rx="52" ry="8" fill="var(--color-sand-200)" />
      <path
        d="M80 30c-11 0-19 8.6-19 19.2v13.6c0 3-1.2 5.9-3.4 8l-2.6 2.5h50l-2.6-2.5a11.4 11.4 0 0 1-3.4-8V49.2C99 38.6 91 30 80 30z"
        fill="var(--color-sun-200)"
        stroke="var(--color-sun-600)"
        strokeWidth="3"
      />
      <path d="M72 78a8 8 0 0 0 16 0" stroke="var(--color-sun-600)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="34" cy="36" r="4" fill="var(--color-sky-300)" />
      <circle cx="128" cy="30" r="5" fill="var(--color-berry-300)" />
      <circle cx="136" cy="50" r="3" fill="var(--color-accent-300)" />
    </svg>
  );
}
