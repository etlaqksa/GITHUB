import type { ArticleContent } from './articles';

/**
 * Lazy-load the large articles dataset as a separate chunk.
 * This keeps the initial JS payload smaller (especially on mobile).
 *
 * To make the Smart Assistant feel instant (and avoid hanging "Loading..." on slow networks),
 * we keep a shared module-level promise and allow prefetching on idle / hover.
 */

let _articlesPromise: Promise<ArticleContent[]> | null = null;

function _startImport(): Promise<ArticleContent[]> {
  return import('./articles').then((mod) => mod.articles);
}

/** Start loading in the background (safe to call multiple times). */
export function prefetchArticles(): Promise<ArticleContent[]> {
  if (!_articlesPromise) _articlesPromise = _startImport();
  return _articlesPromise;
}

/** Load (or reuse an in-flight) articles promise. */
export async function loadArticles(): Promise<ArticleContent[]> {
  return prefetchArticles();
}
