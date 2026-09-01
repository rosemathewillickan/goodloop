// Two full flat-vector people, in the same chunky-outlined character style
// as AvatarFace, exchanging a parcel — the "community helping" motif used
// across volunteer/NGO contexts.
import { OUTLINE, personTraits } from "./AvatarFace";

const PANTS = "#33415C";
const SHOE = "#FBEFDD";

function Person({ seed, reach }: { seed: string; reach: "left" | "right" }) {
  const { skin, hair, outfit, Hairstyle } = personTraits(seed);
  const reachArm =
    reach === "right"
      ? "M44 68C54 74 62 82 66 92"
      : "M16 68C6 74 -2 82 -6 92";
  const restArm = reach === "right" ? "M16 68C14 78 14 88 16 96" : "M44 68C46 78 46 88 44 96";
  const handCx = reach === "right" ? 66 : -6;

  return (
    <g>
      {/* legs */}
      <rect x="18" y="108" width="13" height="40" rx="6" fill={PANTS} stroke={OUTLINE} strokeWidth="1.6" />
      <rect x="34" y="108" width="13" height="40" rx="6" fill={PANTS} stroke={OUTLINE} strokeWidth="1.6" />
      <rect x="16" y="142" width="17" height="10" rx="5" fill={SHOE} stroke={OUTLINE} strokeWidth="1.6" />
      <rect x="32" y="142" width="17" height="10" rx="5" fill={SHOE} stroke={OUTLINE} strokeWidth="1.6" />

      {/* torso */}
      <rect x="12" y="58" width="41" height="54" rx="15" fill={outfit} stroke={OUTLINE} strokeWidth="1.8" />

      {/* arms (behind hands, drawn under head so shoulders read cleanly) */}
      <path d={restArm} stroke={outfit} strokeWidth="11" strokeLinecap="round" />
      <path d={reachArm} stroke={outfit} strokeWidth="11" strokeLinecap="round" />
      <circle cx={handCx} cy="92" r="6" fill={skin} stroke={OUTLINE} strokeWidth="1.6" />

      {/* head */}
      <circle cx="30" cy="26" r="16" fill={skin} stroke={OUTLINE} strokeWidth="1.6" />
      <circle cx="24" cy="26" r="1.9" fill={OUTLINE} />
      <circle cx="36" cy="26" r="1.9" fill={OUTLINE} />
      <path d="M22 32c3 4 13 4 16 0" stroke={OUTLINE} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="30" r="3" fill="#E8746A" opacity="0.35" />
      <circle cx="42" cy="30" r="3" fill="#E8746A" opacity="0.35" />
      <Hairstyle hair={hair} />
    </g>
  );
}

export function HelpingHandsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden="true">
      <ellipse cx="160" cy="205" rx="130" ry="10" fill="var(--color-sand-200)" />

      <g transform="translate(45,32)">
        <Person seed="helping-hands-left" reach="right" />
      </g>
      <g transform="translate(185,32)">
        <Person seed="helping-hands-right" reach="left" />
      </g>

      {/* the parcel changing hands */}
      <rect x="141" y="103" width="34" height="28" rx="4" fill="var(--color-accent-500)" stroke={OUTLINE} strokeWidth="1.8" />
      <path d="M141 117h34M158 103v28" stroke={OUTLINE} strokeWidth="2" />

      <path d="M42 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="var(--color-sky-300)" stroke={OUTLINE} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="280" cy="36" r="5" fill="var(--color-berry-300)" stroke={OUTLINE} strokeWidth="1.2" />
    </svg>
  );
}
