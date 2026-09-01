// A cute bakery/restaurant storefront, in the spirit of a striped-awning
// shopfront illustration — used to give the restaurant flows some warmth.
export function ShopFrontIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 260" className={className} aria-hidden="true">
      <rect x="0" y="200" width="320" height="10" fill="var(--color-sand-300)" />
      <rect x="20" y="60" width="280" height="150" rx="6" fill="var(--color-brand-100)" />

      {/* striped awning */}
      <path d="M10 70 L160 30 L310 70 L310 95 L10 95 Z" fill="var(--color-sand-50)" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${10 + i * 43} 70 L${10 + i * 43 + 20} 63 L${10 + i * 43 + 43} 70 L${10 + i * 43 + 43} 95 L${10 + i * 43} 95 Z`}
          fill={i % 2 === 0 ? "var(--color-accent-500)" : "var(--color-sand-50)"}
        />
      ))}

      {/* windows either side of the door */}
      <rect x="40" y="110" width="70" height="70" rx="6" fill="var(--color-sand-50)" stroke="var(--color-sand-400)" strokeWidth="3" />
      <rect x="210" y="110" width="70" height="70" rx="6" fill="var(--color-sand-50)" stroke="var(--color-sand-400)" strokeWidth="3" />
      <circle cx="75" cy="140" r="14" fill="var(--color-sun-300)" />
      <circle cx="245" cy="140" r="14" fill="var(--color-accent-300)" />
      <rect x="55" y="158" width="40" height="10" rx="4" fill="var(--color-brand-300)" />
      <rect x="225" y="158" width="40" height="10" rx="4" fill="var(--color-brand-300)" />

      {/* door */}
      <rect x="135" y="120" width="50" height="90" rx="4" fill="var(--color-brand-600)" />
      <circle cx="175" cy="165" r="3" fill="var(--color-sun-300)" />

      {/* sign */}
      <rect x="120" y="98" width="80" height="20" rx="10" fill="white" stroke="var(--color-sand-400)" strokeWidth="2" />
      <text x="160" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-brand-700)">
        OPEN
      </text>

      <circle cx="30" cy="40" r="5" fill="var(--color-sun-400)" />
      <circle cx="295" cy="45" r="4" fill="var(--color-berry-300)" />
    </svg>
  );
}
