// Slug utilities for bilingual URLs.
//
// - English slugs: lowercase ASCII with hyphens.
// - Arabic slugs: keep Arabic letters, numbers and hyphens.
//
// Notes:
// - We intentionally keep Arabic letters in the slug. Browsers will percent-encode them.
// - We remove harakat and tatweel to make URLs stable.

const ARABIC_DIACRITICS_RE = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g; // harakat + Qur'anic marks
const TATWEEL_RE = /\u0640/g;

export function slugifyEn(input: string): string {
  const s = String(input || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'article';
}

export function slugifyAr(input: string): string {
  const s = String(input || '')
    .trim()
    .replace(ARABIC_DIACRITICS_RE, '')
    .replace(TATWEEL_RE, '')
    // Normalize common punctuation and separators
    .replace(/[\u060C\u061B\u061F،؛؟]/g, ' ')
    .replace(/[()\[\]{}<>«»“”"'`]/g, ' ')
    .replace(/[\u2000-\u206F]/g, ' ')
    // Allow Arabic letters, numbers and spaces/hyphens
    .replace(/[^\u0600-\u06FF0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'مقال';
}

/** Prefix city slug with "ب" (e.g., "الرياض" -> "بالرياض"). */
export function withBi(cityArSlug: string): string {
  const c = String(cityArSlug || '').replace(/^-+|-+$/g, '');
  return c ? `ب${c}` : 'بمدينة';
}

export function serviceSlugArWithCity(serviceArBaseSlug: string, cityArSlug: string): string {
  // Format: <service>-في-<city>
  const s = String(serviceArBaseSlug || '').replace(/^[-\s]+|[-\s]+$/g, '');
  const c = String(cityArSlug || '').replace(/^[-\s]+|[-\s]+$/g, '');
  return `${s}-في-${c}`.replace(/-+/g, '-');
}
