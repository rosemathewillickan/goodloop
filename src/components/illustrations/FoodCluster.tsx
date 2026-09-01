// A scattered cluster of chunky, thick-outlined food icons, echoing a
// clipart-style "healthy foods" grid — used as a light decorative background.
const OUTLINE = "#241a10";

export function FoodClusterIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 200" className={className} aria-hidden="true">
      {/* apple */}
      <g transform="translate(20,20)">
        <path
          d="M14 8c8-6 20-2 20 10 0 12-10 20-17 20S0 30 0 18C0 10 6 6 14 8z"
          fill="var(--color-accent-500)"
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M15 8c0-4 2-7 6-8" stroke={OUTLINE} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>

      {/* carrot */}
      <g transform="translate(90,10) rotate(15)">
        <path
          d="M0 0c14 2 18 10 16 22-2 10-10 14-16 12S-4 24-2 12C-1 6 -4 2 0 0z"
          fill="var(--color-sun-500)"
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M4 -2l-2-8M9 -2l0-9M14 -2l3-7" stroke={OUTLINE} strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* bowl of rice/grain */}
      <g transform="translate(150,26)">
        <path d="M0 10a26 12 0 0 0 52 0z" fill="var(--color-sand-400)" stroke={OUTLINE} strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="26" cy="8" rx="26" ry="10" fill="var(--color-sand-100)" stroke={OUTLINE} strokeWidth="2" />
      </g>

      {/* broccoli */}
      <g transform="translate(230,4)">
        <circle cx="8" cy="10" r="10" fill="var(--color-brand-400)" stroke={OUTLINE} strokeWidth="1.8" />
        <circle cx="20" cy="6" r="11" fill="var(--color-brand-500)" stroke={OUTLINE} strokeWidth="1.8" />
        <circle cx="16" cy="18" r="9" fill="var(--color-brand-400)" stroke={OUTLINE} strokeWidth="1.8" />
        <rect x="14" y="24" width="8" height="16" rx="3" fill="var(--color-sand-200)" stroke={OUTLINE} strokeWidth="1.8" />
      </g>

      {/* leaf */}
      <g transform="translate(300,14)">
        <path
          d="M0 20c0-16 12-20 22-20-2 16-8 24-22 20z"
          fill="var(--color-brand-400)"
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      {/* second row, smaller + faded for depth */}
      <g opacity="0.6" transform="translate(50,110)">
        <path
          d="M14 8c8-6 20-2 20 10 0 12-10 20-17 20S0 30 0 18C0 10 6 6 14 8z"
          fill="var(--color-sun-500)"
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <g opacity="0.6" transform="translate(140,120) rotate(-10)">
        <path
          d="M0 0c14 2 18 10 16 22-2 10-10 14-16 12S-4 24-2 12C-1 6 -4 2 0 0z"
          fill="var(--color-accent-400)"
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <g opacity="0.6" transform="translate(230,108)">
        <circle cx="8" cy="10" r="10" fill="var(--color-brand-300)" stroke={OUTLINE} strokeWidth="1.8" />
        <circle cx="20" cy="6" r="11" fill="var(--color-brand-400)" stroke={OUTLINE} strokeWidth="1.8" />
      </g>
      <g opacity="0.6" transform="translate(300,120)">
        <path
          d="M0 20c0-16 12-20 22-20-2 16-8 24-22 20z"
          fill="var(--color-sky-300)"
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
