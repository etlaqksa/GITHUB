import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

// GA4 (hardcoded). In case you also provide an env var, it will take precedence.
const GA_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-LWFKJ1J1HY';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Analytics() {
  const [location] = useLocation();
  const hasSentFirst = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!GA_ID) return;
    if (typeof window.gtag !== 'function') return;

    // The inline snippet in index.html already sends the initial page_view.
    // Avoid double-counting the first render in SPA.
    if (!hasSentFirst.current) {
      hasSentFirst.current = true;
      return;
    }

    window.gtag('config', GA_ID, {
      page_path: location,
    });
  }, [location]);

  return null;
}
