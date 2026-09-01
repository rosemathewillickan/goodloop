// Small floating decorative marks — hearts, stars, sparkles, leaves,
// scribbles — used to scatter a little life around sections without
// competing with the main illustrations. Gently animated; respects
// prefers-reduced-motion via the shared .gl-animate-* utilities.
const OUTLINE = "#241a10";

export type DoodleKind = "heart" | "star" | "sparkle" | "leaf" | "scribble" | "plus";

const MOTION: Record<DoodleKind, string> = {
  heart: "gl-animate-pulse",
  star: "gl-animate-wiggle",
  sparkle: "gl-animate-float",
  leaf: "gl-animate-float",
  scribble: "gl-animate-wiggle",
  plus: "gl-animate-pulse",
};

function Shape({ kind, color }: { kind: DoodleKind; color: string }) {
  switch (kind) {
    case "heart":
      return (
        <path
          d="M16 27c-8-6-13-10-13-16.6C3 6 6.4 3 10.6 3c2.2 0 4.3 1.1 5.4 3 1.1-1.9 3.2-3 5.4-3C25.6 3 29 6 29 10.4 29 17 24 21 16 27z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      );
    case "star":
      return (
        <path
          d="M16 2l3.6 9.4L29 15l-9.4 3.6L16 28l-3.6-9.4L3 15l9.4-3.6z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      );
    case "sparkle":
      return (
        <path
          d="M16 1l3 11 11 3-11 3-3 11-3-11-11-3 11-3z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      );
    case "leaf":
      return (
        <path
          d="M4 27c-1-13 7-22 22-23-1 15-9 23-22 23z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      );
    case "plus":
      return (
        <path
          d="M13 3h6v10h10v6H19v10h-6V19H3v-6h10z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      );
    case "scribble":
      return (
        <path
          d="M3 20c4-10 8 8 12-2s7 6 14-6"
          stroke={color}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
      );
  }
}

export function Doodle({
  kind,
  color = "var(--color-sun-400)",
  className = "",
}: {
  kind: DoodleKind;
  color?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 32 30" className={`${MOTION[kind]} ${className}`} aria-hidden="true">
      <Shape kind={kind} color={color} />
    </svg>
  );
}
