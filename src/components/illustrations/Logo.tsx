// The GoodLoop logo: a hand cupping a bowl of food (with a small heart and
// sparkle rays) next to a colourful "goodloop" wordmark, per the brand
// reference. The bowl/hand icon is deliberately a thin monoline mark — a
// logo earns its own distinct linework, separate from the thick-outlined
// character illustrations used everywhere else in the app.
const LETTER_COLORS = [
  "var(--color-accent-500)", // g
  "var(--color-berry-500)", // o
  "var(--color-sun-600)", // o
  "var(--color-brand-600)", // d
  "var(--color-sky-600)", // l
  "var(--color-brand-600)", // o
  "var(--color-berry-500)", // o
  "var(--color-purple-600)", // p
];

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      {/* sparkle rays */}
      <path
        d="M22 14L20 6M30 12V4M38 14L40 6"
        stroke="var(--color-brand-600)"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* bowl rim + body */}
      <ellipse cx="30" cy="23" rx="17" ry="5.5" fill="none" stroke="var(--color-brand-600)" strokeWidth="2.4" />
      <path
        d="M13 23c-1.5 15 7 22 17 22s18.5-7 17-22"
        fill="none"
        stroke="var(--color-brand-600)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M15 27h30" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" />
      {/* heart inside the bowl */}
      <path
        d="M30 39c-4-3-6.5-5.2-6.5-8.2 0-2 1.6-3.6 3.6-3.6 1.2 0 2.3.6 2.9 1.5.6-.9 1.7-1.5 2.9-1.5 2 0 3.6 1.6 3.6 3.6 0 3-2.5 5.2-6.5 8.2z"
        fill="var(--color-accent-500)"
      />
      {/* cupping hand */}
      <path
        d="M6 41c3-3 7-4 11-3l6 1.5"
        fill="none"
        stroke="var(--color-accent-500)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M6 41c-1.2 1.6-1.2 3.4 0 4.6M10 39c-1 1.6-1 3.2 0 4.4M14 38c-.8 1.4-.8 2.8 0 4"
        fill="none"
        stroke="var(--color-accent-500)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  iconClassName = "h-8 w-8",
  textClassName = "text-lg",
  showTagline = false,
}: {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className={iconClassName} />
      <span className="flex flex-col">
        <span className={`font-semibold tracking-tight ${textClassName}`}>
          {"goodloop".split("").map((letter, i) => (
            <span key={i} style={{ color: LETTER_COLORS[i] }}>
              {letter}
            </span>
          ))}
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium uppercase tracking-wide text-sand-500">
            Food circles. Better lives.
          </span>
        )}
      </span>
    </span>
  );
}
