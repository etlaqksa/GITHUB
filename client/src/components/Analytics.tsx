import { useEffect } from 'react';
import { useLocation } from 'wouter';

// GA4 support.
// - Preferred: set VITE_GA_MEASUREMENT_ID in Netlify/your env.
// - Fallback: hard-coded ID for production tracking.
const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-LWFKJ1J1HY';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
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

function ensureGtag() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // Stub gtag until the library loads; it will drain dataLayer afterward.
  window.gtag = window.gtag || ((...args: any[]) => window.dataLayer!.push(args));
}

function configureGA(id: string) {
  ensureGtag();
  const debug = isDebugMode();
  try {
    window.gtag?.('js', new Date());
    // For SPA: we send page_view manually on route changes.
    window.gtag?.('config', id, { send_page_view: false, debug_mode: debug });
  } catch {
    // ignore
  }
}

function injectGA(id: string) {
  if (typeof document === 'undefined') return;

  // If the tag already exists in <head> (e.g. via index.html), just configure it.
  const existing =
    document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`) ||
    document.querySelector(`script[data-ga="${id}"]`);

  ensureGtag();

  if (existing) {
    configureGA(id);
    return;
  }

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  s.setAttribute('data-ga', id);
  s.onload = () => {
    configureGA(id);
  };
  document.head.appendChild(s);

  // Configure immediately as well (queued into dataLayer) so it works even if onload is delayed.
  configureGA(id);
}

export default function Analytics() {
  const [location] = useLocation();

  // Inject GA once.
  useEffect(() => {
    if (!GA_ID) return;
    injectGA(GA_ID);
  }, []);

  // Track SPA page views.
  useEffect(() => {
    if (!GA_ID) return;
    ensureGtag();

    const debug = isDebugMode();
    try {
      window.gtag?.('event', 'page_view', {
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
