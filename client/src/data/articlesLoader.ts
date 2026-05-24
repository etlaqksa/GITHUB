import type { ArticleIndexItem } from './articlesIndex';

/**
 * Lazy-load the lightweight articles index dataset as a separate chunk.
 * This keeps the initial JS payload extremely small.
 */

let _articlesPromise: Promise<ArticleIndexItem[]> | null = null;

function _startImport(): Promise<ArticleIndexItem[]> {
  return import('./articlesIndex').then((mod) => mod.articlesIndex);
}

/** Start loading the index in the background (safe to call multiple times). */
export function prefetchArticles(): Promise<ArticleIndexItem[]> {
  if (!_articlesPromise) _articlesPromise = _startImport();
  return _articlesPromise;
}

/** Load (or reuse an in-flight) articles index promise. */
export async function loadArticles(): Promise<ArticleIndexItem[]> {
  return prefetchArticles();
}

