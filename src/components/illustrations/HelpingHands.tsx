// Two simple flat-vector figures, one handing something to the other —
// the "community helping" motif, used across volunteer/NGO contexts.
export function HelpingHandsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden="true">
      <ellipse cx="160" cy="205" rx="130" ry="10" fill="var(--color-sand-200)" />

      {/* left figure (volunteer) */}
      <g>
        <circle cx="90" cy="60" r="26" fill="var(--color-sun-300)" />
        <path d="M64 60a26 26 0 0 1 52 0" fill="var(--color-sand-700)" />
        <rect x="66" y="88" width="48" height="70" rx="18" fill="var(--color-role-volunteer)" />
        <rect x="52" y="150" width="18" height="46" rx="8" fill="var(--color-sand-600)" />
        <rect x="100" y="150" width="18" height="46" rx="8" fill="var(--color-sand-600)" />
        <path d="M112 110 L150 120" stroke="var(--color-role-volunteer)" strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* the parcel changing hands */}
      <rect x="140" y="102" width="34" height="28" rx="4" fill="var(--color-accent-500)" />
      <path d="M140 116h34M157 102v28" stroke="var(--color-accent-700)" strokeWidth="2" />

      {/* right figure (elder / community member) */}
      <g>
        <circle cx="230" cy="60" r="26" fill="var(--color-sun-200)" />
        <path d="M204 55c4-16 48-16 52 0" fill="var(--color-sand-300)" />
        <rect x="206" y="88" width="48" height="70" rx="18" fill="var(--color-role-ngo)" />
        <rect x="192" y="150" width="18" height="46" rx="8" fill="var(--color-sand-600)" />
        <rect x="240" y="150" width="18" height="46" rx="8" fill="var(--color-sand-600)" />
        <path d="M208 110 L170 120" stroke="var(--color-role-ngo)" strokeWidth="14" strokeLinecap="round" />
      </g>

      <path d="M42 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="var(--color-sky-300)" />
      <circle cx="280" cy="36" r="5" fill="var(--color-berry-300)" />
    </svg>
  );
}
