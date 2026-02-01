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

function ensureGtag() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: any[]) => window.dataLayer!.push(args));
}

function injectGA(id: string) {
  if (typeof document === 'undefined') return;
  // If the tag is already in <head> (e.g. via index.html), don't inject again.
  if (
    document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`) ||
    document.querySelector(`script[data-ga="${id}"]`)
  ) {
    ensureGtag();
    return;
  }

  ensureGtag();

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  s.setAttribute('data-ga', id);
  s.onload = () => {
    try {
      window.gtag?.('js', new Date());
      window.gtag?.('config', id, { send_page_view: false });
    } catch {
      // ignore
    }
  };
  document.head.appendChild(s);
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
    try {
      window.gtag?.('event', 'page_view', {
        page_path: location,
        page_location: window.location.href,
      });
    } catch {
      // ignore
    }
  }, [location]);

  return null;
}
