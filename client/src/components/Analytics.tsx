import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackEvent } from '@/lib/analytics';

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

function getPageMeta() {
  if (typeof window === 'undefined') {
    return { page_path: '/', page_location: '', page_title: '', language: 'ar' as const };
  }

  const pathname = window.location.pathname || '/';
  const search = window.location.search || '';
  const page_path = `${pathname}${search}`;
  const language = pathname.startsWith('/en') ? 'en' : 'ar';
  const page_location = window.location.href;
  const page_title = typeof document !== 'undefined' ? document.title : '';

  return { page_path, page_location, page_title, language };
}

export default function Analytics() {
  const [location] = useLocation();
  const lastPathRef = useRef<string>('');

  // Ensure stub exists; ga-init.js configures GA (send_page_view:false)
  useEffect(() => {
    if (!GA_ID) return;
    ensureGtag();

    const debug = isDebugMode();
    try {
      window.gtag?.('set', { debug_mode: debug });
    } catch {
      // ignore
    }
  }, []);

  // Track SPA route changes (including language routes /ar and /en)
  useEffect(() => {
    if (!GA_ID) return;
    ensureGtag();

    const debug = isDebugMode();
    const meta = getPageMeta();

    if (!meta.page_path) return;
    if (meta.page_path === lastPathRef.current) return;
    lastPathRef.current = meta.page_path;

    // Set user property to help segment Arabic vs English
    try {
      window.gtag?.('set', 'user_properties', { lang: meta.language });
    } catch {
      // ignore
    }

    try {
      window.gtag?.('event', 'page_view', {
        page_path: meta.page_path,
        page_location: meta.page_location,
        page_title: meta.page_title,
        language: meta.language,
        debug_mode: debug,
      });
    } catch {
      // ignore
    }
  }, [location]);

  // Track contact attempts for tel/mailto/whatsapp links across the whole site.
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      if (!href) return;

      const isTel = /^tel:/i.test(href);
      const isMail = /^mailto:/i.test(href);
      const isWa = href.includes('wa.me') || href.includes('whatsapp.com') || href.startsWith('whatsapp:');
      if (!isTel && !isMail && !isWa) return;

      // Prevent duplicate events when both capturing/bubbling handlers fire
      if (anchor.dataset.gaTracked === '1') return;
      anchor.dataset.gaTracked = '1';
      setTimeout(() => {
        try {
          delete anchor.dataset.gaTracked;
        } catch {
          // ignore
        }
      }, 1500);

      const meta = getPageMeta();
      const base = {
        language: meta.language,
        page_path: meta.page_path,
        page_location: meta.page_location,
        link_text: (anchor.textContent || '').trim() || undefined,
        placement: anchor.dataset.gaPlacement || undefined,
        intent: anchor.dataset.gaIntent || undefined,
      };

      try {
        if (isTel) {
          const phone = href.replace(/^tel:/i, '').trim();
          trackEvent('contact', { ...base, contact_method: 'phone', phone, destination: href });
        } else if (isMail) {
          const email = href.replace(/^mailto:/i, '').split('?')[0].trim();
          trackEvent('contact', { ...base, contact_method: 'email', email, destination: href });
        } else if (isWa) {
          trackEvent('contact', { ...base, contact_method: 'whatsapp', destination: href });
        }
      } catch {
        // ignore
      }
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return null;
}
