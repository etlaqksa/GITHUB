import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';

// GA4 Measurement ID (hardcoded fallback). If you also provide an env var, it takes precedence.
const GA_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-LWFKJ1J1HY';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

function ensureGtag() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    };
  }
}

function loadGtagScript(id: string) {
  const existing = document.querySelector(
    `script[src^="https://www.googletagmanager.com/gtag/js?id=${id}"]`
  ) as HTMLScriptElement | null;

  if (existing) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    s.onload = () => resolve();
    s.onerror = () => resolve(); // don't hard-crash the app if blockers exist
    document.head.appendChild(s);
  });
}

export default function Analytics() {
  const [location] = useLocation();
  const [ready, setReady] = useState(false);

  // Optional debugging: add ?ga_debug=1 to the URL to see events in GA4 DebugView.
  const debugMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      return new URLSearchParams(window.location.search).get('ga_debug') === '1';
    } catch {
      return false;
    }
  }, []);

  // Bootstrap GA once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!GA_ID) return;

    let cancelled = false;

    (async () => {
      ensureGtag();
      await loadGtagScript(GA_ID);
      if (cancelled) return;

      ensureGtag();
      window.gtag?.('js', new Date());

      // For SPAs, we manually send page_view on route changes.
      // Disable automatic page_view to avoid duplicates.
      window.gtag?.('config', GA_ID, {
        send_page_view: false,
        ...(debugMode ? { debug_mode: true } : {}),
      });

      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [debugMode]);

  // Send page_view for every route (including the first)
  useEffect(() => {
    if (!ready) return;
    if (!GA_ID) return;
    if (typeof window === 'undefined') return;
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', 'page_view', {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [ready, location]);

  return null;
}
