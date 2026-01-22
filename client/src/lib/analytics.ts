// Lightweight analytics helper.
// Works with GA4 (gtag) and/or Google Tag Manager (dataLayer) when configured.

export type AnalyticsParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(event: string, params: AnalyticsParams = {}) {
  try {
    // GTM
    window.dataLayer?.push({ event, ...params });
  } catch {
    // ignore
  }

  try {
    // GA4
    window.gtag?.('event', event, params);
  } catch {
    // ignore
  }
}
