import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const getForceMotion = () => {
      try {
        // 1) Query param override for previewing animations
        const p = new URLSearchParams(window.location.search || "");
        if (p.get("motion") === "1" || p.get("forceMotion") === "1") return true;
      } catch {}
      try {
        // 2) Attribute override (set by the hero preview switch)
        return document.documentElement.getAttribute("data-force-motion") === "1";
      } catch {
        return false;
      }
    };

    // Patch history methods once so query-only navigation triggers updates.
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

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefers(Boolean(mq.matches) && !getForceMotion());

    update();

    const onNav = () => update();
    window.addEventListener("etlaq:navigate", onNav);
    window.addEventListener("popstate", onNav);

    // Safari < 14 fallback
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => {
        mq.removeEventListener("change", update);
        window.removeEventListener("etlaq:navigate", onNav);
        window.removeEventListener("popstate", onNav);
      };
    }
    mq.addListener(update);
    return () => {
      mq.removeListener(update);
      window.removeEventListener("etlaq:navigate", onNav);
      window.removeEventListener("popstate", onNav);
    };
  }, []);

  return prefers;
}
