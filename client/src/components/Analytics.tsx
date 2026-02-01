import { useEffect } from 'react';
import { useLocation } from 'wouter';

// GA4 support
const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-LWFKJ1J1HY';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

function ensureGtag() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: any[]) => window.dataLayer!.push(args));
}

function isDebugMode() {
  if (typeof window === 'undefined') return false;
  try {
    const p = new URLSearchParams(window.location.search);
    return p.get('ga_debug') === '1' || p.get('ga_debug') === 'true';
  } catch {
    return false;
  }
}

export default function Analytics() {
  const [location] = useLocation();

  // Ensure stub exists; ga-init.js will run from /public and configure initial hit.
  useEffect(() => {
    if (!GA_ID) return;
    ensureGtag();
    // If debug requested, nudge GA with debug_mode for the current session.
    const debug = isDebugMode();
    try {
      window.gtag?.('set', { debug_mode: debug });
    } catch {
      // ignore
    }
  }, []);

  // Track SPA route changes via config update (recommended pattern for SPAs)
  useEffect(() => {
    if (!GA_ID) return;
    ensureGtag();

    const debug = isDebugMode();
    try {
      window.gtag?.('config', GA_ID, {
        page_path: location,
        page_location: window.location.href,
        debug_mode: debug,
      });
    } catch {
      // ignore
    }
  }, [location]);

  return null;
}
