import { absUrl } from './siteUrl';

/**
 * Open Graph image helper.
 *
 * We use a single universal sharing image for now.
 * (If you later add dedicated OG images, you can reintroduce a mapping here.)
 */
export function OgImageForService(_serviceSlug: string): string {
  return absUrl('/favicon.webp');
}
