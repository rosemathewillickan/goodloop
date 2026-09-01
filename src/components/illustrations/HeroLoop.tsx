// Landing-page hero: a box of groceries held up by two hands inside a heart
// — vibrant, detailed, flat-vector clipart style with the same chunky
// outlines used across the rest of the app.
const OUTLINE = "#241a10";

export function HeroLoopIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 340" className={className} aria-hidden="true">
      {/* heart backdrop */}
      <path
        d="M200,305 C115,250 45,190 45,118 C45,72 82,42 123,42 C155,42 185,63 200,98 C215,63 245,42 277,42 C318,42 355,72 355,118 C355,190 285,250 200,305 Z"
        fill="var(--color-brand-100)"
      />
      <path
        d="M200,282 C132,236 74,187 74,127 C74,90 103,66 136,66 C161,66 184,82 200,110 C216,82 239,66 264,66 C297,66 326,90 326,127 C326,187 268,236 200,282 Z"
        fill="var(--color-brand-200)"
        opacity="0.55"
      />

      {/* sparkles + tiny hearts around the frame */}
      <g fill="var(--color-sun-400)" stroke={OUTLINE} strokeWidth="1.6" strokeLinejoin="round">
        <path d="M62 75l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
      </g>
      <path
        d="M320 100c-4-3-6-5-6-8 0-2 1.6-3.6 3.6-3.6 1 0 2 .4 2.4 1.2.4-.8 1.4-1.2 2.4-1.2 2 0 3.6 1.6 3.6 3.6 0 3-2 5-6 8z"
        fill="var(--color-accent-400)"
        stroke={OUTLINE}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="90" cy="230" r="5" fill="var(--color-sky-400)" stroke={OUTLINE} strokeWidth="1.4" />
      <circle cx="315" cy="215" r="4" fill="var(--color-berry-400)" stroke={OUTLINE} strokeWidth="1.4" />

      {/* arm sleeves, reaching up from the bottom corners */}
      <path d="M14 335 L133 232" stroke={OUTLINE} strokeWidth="42" strokeLinecap="round" />
      <path d="M14 335 L133 232" stroke="var(--color-sky-500)" strokeWidth="36" strokeLinecap="round" />
      <path d="M386 335 L267 232" stroke={OUTLINE} strokeWidth="42" strokeLinecap="round" />
      <path d="M386 335 L267 232" stroke="var(--color-accent-500)" strokeWidth="36" strokeLinecap="round" />

      {/* food poking out of the box */}
      <g>
        {/* leafy greens */}
        <path d="M150 185c-6-30 4-52 20-62-2 30-6 50-20 62z" fill="var(--color-brand-500)" stroke={OUTLINE} strokeWidth="2" strokeLinejoin="round" />
        <path d="M165 185c-2-26 8-46 24-54-4 26-10 44-24 54z" fill="var(--color-brand-400)" stroke={OUTLINE} strokeWidth="2" strokeLinejoin="round" />

        {/* baguette */}
        <path
          d="M118 187c-10-30-4-55 14-66 8-5 16 1 14 10-10 4-16 14-16 28 0 12 3 20 6 28z"
          fill="#E8C48A"
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M122 165l8-4M126 150l8-4M131 137l7-5" stroke={OUTLINE} strokeWidth="2" strokeLinecap="round" />

        {/* milk carton */}
        <path d="M188 187V128l11-11 11 11v59z" fill="#FBFBF6" stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round" />
        <rect x="192" y="140" width="14" height="9" rx="1.5" fill="var(--color-sky-500)" />
        <rect x="196" y="112" width="6" height="8" fill="var(--color-sky-600)" stroke={OUTLINE} strokeWidth="1.6" />

        {/* carrot */}
        <g transform="translate(213,120) rotate(8)">
          <path d="M0 0c13 2 17 11 15 22-2 10-9 15-15 13S-4 25-2 13C-1 6-3 2 0 0z" fill="var(--color-sun-500)" stroke={OUTLINE} strokeWidth="2" strokeLinejoin="round" />
          <path d="M3 -2l-3-9M8 -2l0-10M13 -2l3-9" stroke="var(--color-brand-500)" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* cans */}
        <g>
          <rect x="242" y="152" width="20" height="35" rx="3" fill="var(--color-berry-500)" stroke={OUTLINE} strokeWidth="2" />
          <ellipse cx="252" cy="152" rx="10" ry="3.4" fill="var(--color-berry-300)" stroke={OUTLINE} strokeWidth="1.6" />
        </g>

        {/* bottle */}
        <g>
          <path
            d="M270 187v-52c0-4 2-6 5-8v-8h8v8c3 2 5 4 5 8v52z"
            fill="var(--color-sky-300)"
            stroke={OUTLINE}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="274" y="115" width="10" height="7" rx="1.5" fill="var(--color-sky-600)" stroke={OUTLINE} strokeWidth="1.4" />
        </g>
      </g>

      {/* box */}
      <path d="M138 187 L108 158 L150 150 L162 187 Z" fill="#B98858" stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M262 187 L292 158 L250 150 L238 187 Z" fill="#B98858" stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="132" y="184" width="136" height="82" rx="6" fill="#D3A374" stroke={OUTLINE} strokeWidth="2.6" strokeLinejoin="round" />
      <rect x="172" y="214" width="56" height="32" rx="4" fill="#E4C79A" stroke={OUTLINE} strokeWidth="2" />
      <path
        d="M200 238c-6-4-10-8-10-12.6C190 222 192 220 195 220c2 0 3.6.9 5 2.6 1.4-1.7 3-2.6 5-2.6 3 0 5 2 5 5.4 0 4.6-4 8.6-10 12.6z"
        fill="var(--color-accent-500)"
        stroke={OUTLINE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* hands gripping the box edges, drawn last so they read on top */}
      <g>
        <ellipse cx="122" cy="228" rx="18" ry="15" fill="#D9986A" stroke={OUTLINE} strokeWidth="2.2" />
        <path d="M133 216c4 3 6 7 5 11M141 222c3 3 4 7 3 11M145 231c2 3 2 6 1 9" stroke={OUTLINE} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
      <g>
        <ellipse cx="278" cy="228" rx="18" ry="15" fill="#F3BE8C" stroke={OUTLINE} strokeWidth="2.2" />
        <path d="M267 216c-4 3-6 7-5 11M259 222c-3 3-4 7-3 11M255 231c-2 3-2 6-1 9" stroke={OUTLINE} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
