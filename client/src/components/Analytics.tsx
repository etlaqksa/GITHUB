import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Optional GA4 support.
// Set VITE_GA_MEASUREMENT_ID in Netlify/your env to enable.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

function injectGA(id: string) {
  if (typeof document === 'undefined') return;
  // Prevent duplicate injection
  if (document.querySelector(`script[data-ga="${id}"]`)) return;

  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  s1.setAttribute('data-ga', id);
  document.head.appendChild(s1);

  const s2 = document.createElement('script');
  s2.setAttribute('data-ga', id);
  s2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${id}', { send_page_view: false });
  `;
  document.head.appendChild(s2);
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
