import type { ArticleContent } from './articles';

/**
 * Lazy-load the large articles dataset as a separate chunk.
 * This keeps the initial JS payload smaller (especially on mobile).
 */
export async function loadArticles(): Promise<ArticleContent[]> {
  const mod = await import('./articles');
  return mod.articles;
}
