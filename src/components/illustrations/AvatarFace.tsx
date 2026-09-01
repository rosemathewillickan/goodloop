// Flat-vector "bust" avatar in the chunky, diverse, hand-drawn style of a
// friendly character grid — thick outlines, flat colors, varied hairstyles
// and skin tones, simple happy face. Used to put a human face on otherwise-
// plain list rows, navbars, and dashboard headers.

export const SKIN_TONES = ["#FCD9B6", "#F3BE8C", "#D9986A", "#A9673E", "#7A4A2B", "#5C3521"];

export const HAIR_COLORS = ["#2B2118", "#4A2E1E", "#6B4226", "#8B4A2E", "#C99A3F", "#E8CD8A"];

export const OUTFIT_COLORS = [
  "var(--color-brand-500)",
  "var(--color-accent-500)",
  "var(--color-sky-500)",
  "var(--color-sun-500)",
  "var(--color-berry-500)",
  "var(--color-sand-600)",
];

export function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export const OUTLINE = "#241a10";

function Crop({ hair }: { hair: string }) {
  return (
    <path
      d="M15 23C15 11 21 4 30 4C39 4 45 11 45 23C45 26 44 28 43 29C42 20 37 15 30 15C23 15 18 20 17 29C16 28 15 26 15 23Z"
      fill={hair}
      stroke={OUTLINE}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
}

function LongWavy({ hair }: { hair: string }) {
  return (
    <>
      <path
        d="M15 23C15 11 21 4 30 4C39 4 45 11 45 23C45 25 44 27 43 28C42 19 37 15 30 15C23 15 18 19 17 28C16 27 15 25 15 23Z"
        fill={hair}
        stroke={OUTLINE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 22C14 29 13 40 16 51C19 49 20 43 19 35C19 30 18 26 16 22Z"
        fill={hair}
        stroke={OUTLINE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M44 22C46 29 47 40 44 51C41 49 40 43 41 35C41 30 42 26 44 22Z"
        fill={hair}
        stroke={OUTLINE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </>
  );
}

function Curly({ hair }: { hair: string }) {
  const c = [
    [17, 17, 7.5],
    [24, 9, 7.5],
    [31, 7, 8],
    [38, 9, 7.5],
    [44, 17, 7.5],
    [15, 26, 6.5],
    [46, 26, 6.5],
  ] as const;
  return (
    <>
      {c.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={hair} stroke={OUTLINE} strokeWidth="1.6" />
      ))}
    </>
  );
}

function Bun({ hair }: { hair: string }) {
  return (
    <>
      <path
        d="M16 24C16 12 22 5 30 5C38 5 44 12 44 24C44 26 43 27 42 28C41 20 36 16 30 16C24 16 19 20 18 28C17 27 16 26 16 24Z"
        fill={hair}
        stroke={OUTLINE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="3" r="6" fill={hair} stroke={OUTLINE} strokeWidth="1.6" />
    </>
  );
}

function Swoop({ hair }: { hair: string }) {
  return (
    <path
      d="M15 25C15 12 22 4 32 4C40 4 45 10 45 21C45 24 44 27 43 28C42 17 36 11 26 13C19 15 16 19 16 26C15 26 15 26 15 25Z"
      fill={hair}
      stroke={OUTLINE}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
}

function Bob({ hair }: { hair: string }) {
  return (
    <path
      d="M14 22C14 11 21 4 30 4C39 4 46 11 46 22V38C46 40 44 41 42 41C41 41 40 40 40 38V27C40 20 36 16 30 16C24 16 20 20 20 27V38C20 40 19 41 18 41C16 41 14 40 14 38V22Z"
      fill={hair}
      stroke={OUTLINE}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
}

export const HAIRSTYLES = [Crop, LongWavy, Curly, Bun, Swoop, Bob];

export function personTraits(seed: string) {
  return {
    skin: SKIN_TONES[hash(seed + "skin") % SKIN_TONES.length],
    hair: HAIR_COLORS[hash(seed + "hair") % HAIR_COLORS.length],
    outfit: OUTFIT_COLORS[hash(seed + "shirt") % OUTFIT_COLORS.length],
    Hairstyle: HAIRSTYLES[hash(seed + "style") % HAIRSTYLES.length],
  };
}

export function AvatarFace({ seed, className = "" }: { seed: string; className?: string }) {
  const skin = SKIN_TONES[hash(seed + "skin") % SKIN_TONES.length];
  const hair = HAIR_COLORS[hash(seed + "hair") % HAIR_COLORS.length];
  const shirt = OUTFIT_COLORS[hash(seed + "shirt") % OUTFIT_COLORS.length];
  const Hairstyle = HAIRSTYLES[hash(seed + "style") % HAIRSTYLES.length];

  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path
        d="M8 60C8 47 17 40 30 40C43 40 52 47 52 60Z"
        fill={shirt}
        stroke={OUTLINE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="27" r="16" fill={skin} stroke={OUTLINE} strokeWidth="1.6" />
      <circle cx="24" cy="27" r="1.9" fill={OUTLINE} />
      <circle cx="36" cy="27" r="1.9" fill={OUTLINE} />
      <path d="M22 33c3 4 13 4 16 0" stroke={OUTLINE} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="31" r="3" fill="#E8746A" opacity="0.35" />
      <circle cx="42" cy="31" r="3" fill="#E8746A" opacity="0.35" />
      <Hairstyle hair={hair} />
    </svg>
  );
}
