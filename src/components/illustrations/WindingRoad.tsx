// Decorative full-bleed background road for the "How it works" journey.
// Stretches to fill its parent (preserveAspectRatio="none") so it doesn't
// need to know the real pixel height of the content stacked on top of it.
const OUTLINE = "#241a10";

export function WindingRoad({ className = "" }: { className?: string }) {
  const path =
    "M100,10 C100,70 100,70 100,130 C100,190 300,190 300,320 C300,450 100,450 100,580 C100,710 300,710 300,840 C300,935 220,935 190,1020";

  return (
    <svg viewBox="0 0 400 1050" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={path} stroke="var(--color-sand-200)" strokeWidth="26" strokeLinecap="round" fill="none" />
      <path
        d={path}
        stroke="var(--color-sun-300)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray="2 22"
        fill="none"
      />

      {/* scattered trees, stars and dots for a bit of park-map charm */}
      <g opacity="0.9">
        <circle cx="230" cy="60" r="12" fill="var(--color-brand-200)" stroke={OUTLINE} strokeWidth="2" />
        <rect x="227" y="68" width="6" height="14" rx="2" fill="var(--color-sand-300)" stroke={OUTLINE} strokeWidth="1.4" />

        <circle cx="30" cy="250" r="10" fill="var(--color-brand-300)" stroke={OUTLINE} strokeWidth="2" />
        <rect x="27" y="257" width="6" height="12" rx="2" fill="var(--color-sand-300)" stroke={OUTLINE} strokeWidth="1.4" />

        <circle cx="360" cy="500" r="13" fill="var(--color-brand-200)" stroke={OUTLINE} strokeWidth="2" />
        <rect x="357" y="509" width="6" height="14" rx="2" fill="var(--color-sand-300)" stroke={OUTLINE} strokeWidth="1.4" />

        <circle cx="35" cy="760" r="11" fill="var(--color-brand-300)" stroke={OUTLINE} strokeWidth="2" />
        <rect x="32" y="768" width="6" height="12" rx="2" fill="var(--color-sand-300)" stroke={OUTLINE} strokeWidth="1.4" />
      </g>

      <g fill="var(--color-sun-500)" stroke={OUTLINE} strokeWidth="1.4" strokeLinejoin="round">
        <path d="M340,120l3,8 8,3-8,3-3,8-3-8-8-3 8-3z" />
        <path d="M60,470l2.4,6.4 6.4,2.4-6.4,2.4-2.4,6.4-2.4-6.4-6.4-2.4 6.4-2.4z" />
        <path d="M330,700l2.4,6.4 6.4,2.4-6.4,2.4-2.4,6.4-2.4-6.4-6.4-2.4 6.4-2.4z" />
      </g>
      <circle cx="140" cy="360" r="4" fill="var(--color-sky-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="270" cy="600" r="4" fill="var(--color-berry-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="90" cy="900" r="4" fill="var(--color-accent-300)" stroke={OUTLINE} strokeWidth="1.4" />
    </svg>
  );
}
