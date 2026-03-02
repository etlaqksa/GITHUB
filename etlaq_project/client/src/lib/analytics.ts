// Lightweight analytics helper.
// Works with GA4 (gtag) and/or Google Tag Manager (dataLayer) when configured.

export type AnalyticsParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: any[]) => void;
  }
}

function getDefaultParams(): AnalyticsParams {
  if (typeof window === 'undefined') return {};

  const pathname = (window.location && window.location.pathname) ? window.location.pathname : '/';
  const search = (window.location && window.location.search) ? window.location.search : '';
  const href = (window.location && window.location.href) ? window.location.href : undefined;
  const language = pathname.startsWith('/en') ? 'en' : 'ar';

  return {
    page_path: `${pathname}${search}`,
    page_location: href,
    language,
  };
}

export function trackEvent(event: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;

  const merged: AnalyticsParams = { ...getDefaultParams(), ...params };

  try {
    // GTM
    window.dataLayer?.push({ event, ...merged });
  } catch {
    // ignore
  }

  try {
    // GA4
    window.gtag?.('event', event, merged);
  } catch {
    // ignore
  }
}
