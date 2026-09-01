// The recurring GoodLoop visual language: a thick, hand-drawn, irregular
// ribbon that winds top-to-bottom, changing colour as it passes each stage
// (restaurant -> volunteer -> NGO). Two-stroke technique (dark outline +
// flat colour, same as every other illustration in the app) with a slow
// flowing dash animation to suggest movement. Stretches to fill its parent
// height (preserveAspectRatio="none"), same technique as WindingRoad.
const OUTLINE = "#241a10";

const SEGMENTS = [
  { d: "M60 20C118 55 100 130 52 178C12 218 22 270 62 300", color: "var(--color-brand-500)" },
  { d: "M62 300C110 328 128 388 90 428C58 462 42 494 62 526", color: "var(--color-sky-500)" },
  { d: "M62 526C82 550 92 574 72 600", color: "var(--color-berry-500)" },
] as const;

function Arrow({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <path
      d="M-6 -5 L6 0 L-6 5Z"
      fill={OUTLINE}
      transform={`translate(${x} ${y}) rotate(${rotate})`}
    />
  );
}

export function LoopRibbon({ className = "", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 160 620" preserveAspectRatio="none" className={className} aria-hidden="true">
      {SEGMENTS.map((seg, i) => (
        <path key={`outline-${i}`} d={seg.d} stroke={OUTLINE} strokeWidth="20" strokeLinecap="round" fill="none" />
      ))}
      {SEGMENTS.map((seg, i) => (
        <path
          key={`color-${i}`}
          d={seg.d}
          stroke={seg.color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="20 12"
          fill="none"
          className={animated ? "gl-animate-dash" : undefined}
        />
      ))}
      <Arrow x={58} y={150} rotate={110} />
      <Arrow x={78} y={400} rotate={125} />
    </svg>
  );
}
