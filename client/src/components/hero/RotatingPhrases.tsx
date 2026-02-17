import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type RotatingPhrasesProps = {
  items: string[];
  intervalMs?: number;
  className?: string;
  wrapperClassName?: string;
};

/**
 * CLS-safe rotating text:
 * - Wrapper is inline-grid; all phrases sit on the same grid cell,
 *   so the width is reserved by the widest phrase.
 * - Animates opacity + translateY (transform) only.
 * - Respects prefers-reduced-motion.
 */
export default function RotatingPhrases({
  items,
  intervalMs = 2200,
  className = "",
  wrapperClassName = "",
}: RotatingPhrasesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const safeItems = useMemo(() => (items?.length ? items : [""]), [items]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (safeItems.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeItems.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion, safeItems.length, intervalMs]);

  const active = safeItems[index] ?? "";

  if (prefersReducedMotion || safeItems.length <= 1) {
    return <span className={className}>{active}</span>;
  }

  return (
    <span className={`inline-grid align-baseline ${wrapperClassName}`} aria-live="polite">
      {safeItems.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className={
            `col-start-1 row-start-1 transition-[opacity,transform] duration-300 ease-out ` +
            (i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2") +
            (className ? ` ${className}` : "")
          }
          aria-hidden={i === index ? undefined : true}
        >
          {t}
        </span>
      ))}
      <span className="sr-only">{active}</span>
    </span>
  );
}
