export function HeroLoopIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 340" fill="none" className={className} aria-hidden="true">
      {/* soft background blobs */}
      <ellipse cx="90" cy="80" rx="70" ry="58" fill="var(--color-sky-100)" opacity="0.7" />
      <ellipse cx="340" cy="90" rx="60" ry="50" fill="var(--color-sun-100)" opacity="0.8" />
      <ellipse cx="330" cy="270" rx="70" ry="56" fill="var(--color-berry-100)" opacity="0.6" />
      <ellipse cx="80" cy="270" rx="65" ry="52" fill="var(--color-brand-100)" opacity="0.7" />

      {/* the loop path connecting restaurant -> volunteer -> ngo/community */}
      <path
        d="M120 90c60-40 140-40 180 10s0 130-70 150-160-10-160-90c0-30 15-52 30-65"
        stroke="var(--color-brand-300)"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
        fill="none"
      />

      {/* bowl of food, center */}
      <g transform="translate(150,120)">
        <ellipse cx="60" cy="98" rx="66" ry="12" fill="var(--color-sand-200)" />
        <path d="M0 46a60 26 0 0 0 120 0v6a60 26 0 0 1-120 0z" fill="var(--color-brand-200)" />
        <ellipse cx="60" cy="46" rx="60" ry="26" fill="var(--color-brand-300)" />
        <ellipse cx="60" cy="46" rx="46" ry="17" fill="var(--color-sand-50)" />
        <circle cx="40" cy="42" r="7" fill="var(--color-accent-500)" />
        <circle cx="62" cy="38" r="6" fill="var(--color-sun-500)" />
        <circle cx="82" cy="44" r="7" fill="var(--color-brand-500)" />
        <circle cx="52" cy="50" r="5" fill="var(--color-sky-500)" />
        <circle cx="72" cy="52" r="5" fill="var(--color-accent-300)" />
        {/* steam */}
        <path d="M40 6c-6 8 6 12 0 20M60-2c-6 8 6 12 0 20M80 6c-6 8 6 12 0 20" stroke="var(--color-brand-300)" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* heart badge, top right of bowl */}
      <g transform="translate(292,60)">
        <circle cx="24" cy="24" r="24" fill="var(--color-accent-100)" />
        <path
          d="M24 34c-11-8-18-14-18-21.6C6 7 10 3 15.4 3c3 0 6 1.6 8.6 4.4C26.6 4.6 29.6 3 32.6 3 38 3 42 7 42 12.4 42 20 35 26 24 34z"
          fill="var(--color-accent-600)"
        />
      </g>

      {/* bike badge, bottom left */}
      <g transform="translate(38,236)">
        <circle cx="26" cy="26" r="26" fill="var(--color-sky-100)" />
        <circle cx="15" cy="32" r="9" fill="none" stroke="var(--color-sky-600)" strokeWidth="3" />
        <circle cx="37" cy="32" r="9" fill="none" stroke="var(--color-sky-600)" strokeWidth="3" />
        <path d="M15 32 24 15h8M24 15l10 17M32 32h5" stroke="var(--color-sky-700)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* map pin badge, bottom right */}
      <g transform="translate(316,222)">
        <circle cx="28" cy="28" r="28" fill="var(--color-berry-100)" />
        <path
          d="M28 12c8 0 14.5 6.4 14.5 14.2C42.5 37 28 50 28 50S13.5 37 13.5 26.2C13.5 18.4 20 12 28 12z"
          fill="var(--color-berry-600)"
        />
        <circle cx="28" cy="25" r="6" fill="var(--color-berry-50)" />
      </g>

      {/* sparkles */}
      <g fill="var(--color-sun-500)">
        <path d="M220 24l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
      </g>
      <g fill="var(--color-brand-400)">
        <path d="M368 170l2.4 6.4L376 178l-5.6 2.4L368 186l-2.4-5.6L360 178l5.6-1.6z" />
      </g>
      <circle cx="40" cy="150" r="4" fill="var(--color-sun-300)" />
      <circle cx="110" cy="30" r="4" fill="var(--color-berry-300)" />
    </svg>
  );
}
