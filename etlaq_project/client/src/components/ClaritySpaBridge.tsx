import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

/**
 * Clarity SPA route tracking
 * - Clarity snippet runs once on initial page load.
 * - For client-side navigation, we tag the current URL and emit a lightweight event.
 * This helps Clarity segment recordings/heatmaps by route without requiring a full reload.
 */
export default function ClaritySpaBridge() {
  const [loc] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prefer the actual browser URL (includes /ar or /en base + query).
    const url = window.location.pathname + window.location.search;

    const c = window.clarity;
    if (typeof c !== "function") return;

    try {
      // Custom tag (official API): key/value tags for filtering in Clarity
      c("set", "page", url);
      c("set", "route", loc);

      // Custom event (official API): appears in Clarity as an event marker
      c("event", "route_change");
    } catch {
      // no-op (never break app due to analytics)
    }
  }, [loc]);

  return null;
}
