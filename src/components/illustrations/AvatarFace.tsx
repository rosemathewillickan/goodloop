// A small, friendly hand-drawn-style face, in the spirit of a colorful
// avatar grid — used to put a human face on otherwise-plain list rows.
const HAIR_COLORS = [
  "var(--color-sand-800)",
  "var(--color-accent-600)",
  "var(--color-brand-500)",
  "var(--color-berry-600)",
  "var(--color-sky-600)",
  "var(--color-sun-600)",
];

function hashHue(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export function AvatarFace({ seed, className = "" }: { seed: string; className?: string }) {
  const hair = HAIR_COLORS[hashHue(seed) % HAIR_COLORS.length];
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path d="M6 26C6 12 16 4 30 4s24 8 24 22c0 4-1 7-3 10H9c-2-3-3-6-3-10z" fill={hair} />
      <circle cx="30" cy="32" r="20" fill="var(--color-sun-200)" />
      <circle cx="22" cy="34" r="2.4" fill="var(--color-sand-800)" />
      <circle cx="38" cy="34" r="2.4" fill="var(--color-sand-800)" />
      <path d="M21 42c3 4 15 4 18 0" stroke="var(--color-sand-800)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="17" cy="40" r="3" fill="var(--color-accent-300)" opacity="0.6" />
      <circle cx="43" cy="40" r="3" fill="var(--color-accent-300)" opacity="0.6" />
    </svg>
  );
}
