// A cute bakery/restaurant storefront with a thick chunky outline, matching
// the flat-vector character style used across the app — a person waiting
// out front gives the restaurant flows some warmth.
import { OUTLINE, personTraits } from "./AvatarFace";

export function ShopFrontIllustration({ className = "" }: { className?: string }) {
  const { skin, hair, outfit, Hairstyle } = personTraits("shopfront-visitor");

  return (
    <svg viewBox="0 0 320 260" className={className} aria-hidden="true">
      <rect x="0" y="200" width="320" height="10" fill="var(--color-sand-300)" />
      <rect x="20" y="60" width="280" height="150" rx="6" fill="var(--color-brand-100)" stroke={OUTLINE} strokeWidth="2.4" />

      {/* striped awning */}
      <path d="M10 70 L160 30 L310 70 L310 95 L10 95 Z" fill="var(--color-sand-50)" stroke={OUTLINE} strokeWidth="2.4" strokeLinejoin="round" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${10 + i * 43} 70 L${10 + i * 43 + 20} 63 L${10 + i * 43 + 43} 70 L${10 + i * 43 + 43} 95 L${10 + i * 43} 95 Z`}
          fill={i % 2 === 0 ? "var(--color-accent-500)" : "var(--color-sand-50)"}
          stroke={OUTLINE}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ))}

      {/* windows either side of the door */}
      <rect x="40" y="110" width="70" height="70" rx="6" fill="var(--color-sand-50)" stroke={OUTLINE} strokeWidth="2.4" />
      <rect x="210" y="110" width="70" height="70" rx="6" fill="var(--color-sand-50)" stroke={OUTLINE} strokeWidth="2.4" />
      <circle cx="75" cy="140" r="14" fill="var(--color-sun-300)" stroke={OUTLINE} strokeWidth="1.8" />
      <circle cx="245" cy="140" r="14" fill="var(--color-accent-300)" stroke={OUTLINE} strokeWidth="1.8" />
      <rect x="55" y="158" width="40" height="10" rx="4" fill="var(--color-brand-300)" stroke={OUTLINE} strokeWidth="1.4" />
      <rect x="225" y="158" width="40" height="10" rx="4" fill="var(--color-brand-300)" stroke={OUTLINE} strokeWidth="1.4" />

      {/* door */}
      <rect x="135" y="120" width="50" height="90" rx="4" fill="var(--color-brand-600)" stroke={OUTLINE} strokeWidth="2.4" />
      <circle cx="175" cy="165" r="3" fill="var(--color-sun-300)" />

      {/* sign */}
      <rect x="120" y="98" width="80" height="20" rx="10" fill="white" stroke={OUTLINE} strokeWidth="2" />
      <text x="160" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-brand-700)">
        OPEN
      </text>

      {/* a visitor waiting out front */}
      <g transform="translate(238,150) scale(0.62)">
        <rect x="18" y="108" width="13" height="40" rx="6" fill="#33415C" stroke={OUTLINE} strokeWidth="1.8" />
        <rect x="34" y="108" width="13" height="40" rx="6" fill="#33415C" stroke={OUTLINE} strokeWidth="1.8" />
        <rect x="16" y="142" width="17" height="10" rx="5" fill="#FBEFDD" stroke={OUTLINE} strokeWidth="1.8" />
        <rect x="32" y="142" width="17" height="10" rx="5" fill="#FBEFDD" stroke={OUTLINE} strokeWidth="1.8" />
        <rect x="12" y="58" width="41" height="54" rx="15" fill={outfit} stroke={OUTLINE} strokeWidth="2" />
        <path d="M16 68C14 78 14 88 16 96" stroke={outfit} strokeWidth="12" strokeLinecap="round" />
        <path d="M44 68C48 76 50 82 48 90" stroke={outfit} strokeWidth="12" strokeLinecap="round" />
        <circle cx="30" cy="26" r="16" fill={skin} stroke={OUTLINE} strokeWidth="1.8" />
        <circle cx="24" cy="26" r="1.9" fill={OUTLINE} />
        <circle cx="36" cy="26" r="1.9" fill={OUTLINE} />
        <path d="M22 32c3 4 13 4 16 0" stroke={OUTLINE} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="18" cy="30" r="3" fill="#E8746A" opacity="0.35" />
        <circle cx="42" cy="30" r="3" fill="#E8746A" opacity="0.35" />
        <Hairstyle hair={hair} />
      </g>

      <circle cx="30" cy="40" r="5" fill="var(--color-sun-400)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="295" cy="45" r="4" fill="var(--color-berry-300)" stroke={OUTLINE} strokeWidth="1.4" />
    </svg>
  );
}
