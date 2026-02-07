export type SupportedLang = 'ar' | 'en';

export function getLangFromPathname(pathname: string | undefined): SupportedLang | null {
  if (!pathname) return null;
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return 'ar';
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  return null;
}

export function stripLangPrefix(pathname: string): string {
  const lang = getLangFromPathname(pathname);
  if (!lang) return pathname || '/';
  const stripped = pathname.replace(/^\/(ar|en)(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export function ensureLeadingSlash(p: string): string {
  if (!p) return '/';
  return p.startsWith('/') ? p : `/${p}`;
}

export function withLangPrefix(href: string, lang?: SupportedLang): string {
  if (!href) return '/';
  // External or special links: leave as-is
  if (/^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return href;
  }

  const clean = ensureLeadingSlash(href);
  // Already prefixed
  if (clean === '/ar' || clean.startsWith('/ar/') || clean === '/en' || clean.startsWith('/en/')) return clean;

  const effectiveLang: SupportedLang = lang || (typeof window !== 'undefined' ? (getLangFromPathname(window.location.pathname) || 'ar') : 'ar');
  if (clean === '/') return `/${effectiveLang}`;
  return `/${effectiveLang}${clean}`;
}

