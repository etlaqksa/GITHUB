import { useEffect, useState } from "react";

/**
 * Returns the current window.location.search and updates on:
 * - popstate
 * - history.pushState / history.replaceState (patched once)
 *
 * Why: the app uses Wouter with a `base` (/ar or /en). Wouter's location
 * can omit the query string, so relying on `useLocation()` won't reflect
 * ?hero=... or ?previewHero=... changes.
 */
export function useUrlSearch() {
  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.location.search || "";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => setSearch(window.location.search || "");
    update();

    // Patch history methods once to emit an event when SPA navigation occurs.
    const w = window as any;
    if (!w.__etlaq_history_patched__) {
      w.__etlaq_history_patched__ = true;
      const emit = () => window.dispatchEvent(new Event("etlaq:navigate"));

      const origPush = window.history.pushState;
      const origReplace = window.history.replaceState;

      window.history.pushState = function (...args: any[]) {
        // @ts-expect-error - variadic
        const r = origPush.apply(this, args);
        emit();
        return r;
      } as any;

      window.history.replaceState = function (...args: any[]) {
        // @ts-expect-error - variadic
        const r = origReplace.apply(this, args);
        emit();
        return r;
      } as any;
    }

    window.addEventListener("popstate", update);
    window.addEventListener("etlaq:navigate", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("etlaq:navigate", update);
    };
  }, []);

  return search;
}
