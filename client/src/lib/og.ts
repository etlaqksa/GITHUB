import { absUrl } from './siteUrl';

/**
 * Open Graph image helper.
 *
 * NOTE: This project currently uses a default OG image. If/when you add
 * per-service OG images under `client/public/og/`, update the mapping below.
 */
const SERVICE_OG_MAP: Record<string, string> = {
  // City services
  'soil-grouting': '/og/soil-grouting.webp',
  'cavity-detection': '/og/cavity-detection.webp',
  'geophysical-testing': '/og/geophysical-testing.webp',
};

export function OgImageForService(serviceSlug: string): string {
  return absUrl(SERVICE_OG_MAP[serviceSlug] ?? '/og-image.webp');
}
