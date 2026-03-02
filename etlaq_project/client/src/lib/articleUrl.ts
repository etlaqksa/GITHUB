import type { ArticleContent } from '@/data/articles';
import { slugifyAr, slugifyEn } from '@/lib/slugify';

type Lang = 'ar' | 'en';

function truncateSlugWords(slug: string, maxWords: number) {
  const parts = String(slug || '').split('-').filter(Boolean);
  return parts.slice(0, Math.max(1, maxWords)).join('-');
}

/**
 * URL slug for blog posts.
 *
 * We always append the numeric ID to keep slugs unique and allow fast lookup.
 */
export function getArticleUrlSlug(article: ArticleContent, lang: Lang): string {
  const base = lang === 'ar'
    ? slugifyAr(article.title)
    : slugifyEn(article.titleEn || article.title);

  // Keep URLs readable (avoid super long slugs)
  const shortBase = truncateSlugWords(base, lang === 'ar' ? 10 : 12);
  return `${shortBase}-${article.id}`;
}

export function parseTrailingId(slugParam: string): number | null {
  const m = String(slugParam || '').match(/-(\d{1,5})$/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

/** Find an article by any supported slug (new AR/EN slugs, legacy slug, or trailing ID). */
export function findArticleByAnySlug(slugParam: string, articles: ArticleContent[]): ArticleContent | null {
  const s = String(slugParam || '').replace(/^\/+|\/+$/g, '');
  if (!s) return null;

  // Fast path: trailing -ID
  const id = parseTrailingId(s);
  if (id != null) {
    const byId = articles.find((a) => a.id === id);
    if (byId) return byId;
  }

  // Legacy slug
  const legacy = articles.find((a) => a.slug === s);
  if (legacy) return legacy;

  // New slugs (compute per article; dataset is small ~80)
  for (const a of articles) {
    if (getArticleUrlSlug(a, 'ar') === s) return a;
    if (getArticleUrlSlug(a, 'en') === s) return a;
  }

  return null;
}
