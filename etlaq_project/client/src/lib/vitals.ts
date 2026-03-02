/*
  Lightweight Core Web Vitals observers (no external deps).

  Captures:
  - LCP (Largest Contentful Paint)
  - CLS (Cumulative Layout Shift)
  - TTFB (Time To First Byte)

  Stores the latest values on window.__etlaqVitals and optionally calls a
  callback for reporting.

  Conceptual reference: https://web.dev/vitals/
*/

type Vitals = {
  lcp?: number;
  cls?: number;
  ttfb?: number;
};

declare global {
  interface Window {
    __etlaqVitals?: Vitals;
  }
}

function setVitals(patch: Partial<Vitals>, onReport?: (v: Vitals) => void) {
  if (typeof window === 'undefined') return;
  const cur = window.__etlaqVitals || {};
  const next = { ...cur, ...patch };
  window.__etlaqVitals = next;
  onReport?.(next);
}

export function initVitals(onReport?: (v: Vitals) => void) {
  if (typeof window === 'undefined') return;

  // TTFB from Navigation Timing
  try {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (nav) {
      setVitals({ ttfb: nav.responseStart }, onReport);
    }
  } catch {
    // ignore
  }

  // LCP
  try {
    if ('PerformanceObserver' in window) {
      const po = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as any[];
        const last = entries[entries.length - 1];
        if (last?.startTime) {
          setVitals({ lcp: last.startTime }, onReport);
        }
      });
      po.observe({ type: 'largest-contentful-paint', buffered: true } as any);
    }
  } catch {
    // ignore
  }

  // CLS
  try {
    if ('PerformanceObserver' in window) {
      let cls = 0;
      const po = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) cls += entry.value || 0;
        }
        setVitals({ cls }, onReport);
      });
      po.observe({ type: 'layout-shift', buffered: true } as any);
    }
  } catch {
    // ignore
  }
}
