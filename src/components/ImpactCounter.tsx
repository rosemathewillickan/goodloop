"use client";

import { useEffect, useRef, useState } from "react";

// Animates a numeric stat counting up once it scrolls into view. Accepts the
// display string as-is (e.g. "12,480") so callers don't need to separate
// formatting from the number — this parses out the leading digits/commas and
// re-applies whatever prefix/suffix text surrounded them (e.g. "8.5 Tonnes").
export function ImpactCounter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => zeroed(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduced) setDisplay(value);
        else animate(value, setDisplay);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function zeroed(value: string) {
  return value.replace(/\d/g, "0");
}

function animate(target: string, setDisplay: (v: string) => void) {
  const match = target.match(/[\d,]+(\.\d+)?/);
  if (!match) {
    setDisplay(target);
    return;
  }

  const raw = match[0];
  const targetNum = parseFloat(raw.replace(/,/g, ""));
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const before = target.slice(0, match.index);
  const after = target.slice((match.index ?? 0) + raw.length);
  const hasCommas = raw.includes(",");
  const duration = 1100;
  const start = performance.now();

  function frame(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const current = targetNum * eased;
    const formatted = hasCommas
      ? current.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })
      : current.toFixed(decimals);
    setDisplay(`${before}${formatted}${after}`);
    if (t < 1) requestAnimationFrame(frame);
    else setDisplay(target);
  }

  requestAnimationFrame(frame);
}
