import { useCallback, useEffect, useMemo, useState } from 'react';
import { withLangPrefix, stripLangPrefix } from './localizePath';

function normalizePathname(p: string): string {
  if (!p) return '/';
  // Remove trailing slash for stable route matching, but keep root '/'
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1);
  return p;
}

// Custom location hook for wouter that:
// 1) allows routes to be declared WITHOUT /ar or /en prefixes
// 2) keeps the browser URL prefixed (/ar/... or /en/...) for canonical SEO
// 3) prefixes internal navigations automatically
export function useLangLocation() {
  const [pathname, setPathname] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const locationForRouting = useMemo(() => {
    const stripped = stripLangPrefix(pathname);
    // Wouter matches paths strictly; normalize trailing slashes to avoid
    // Netlify/Browser adding a trailing slash and breaking route matching.
    return normalizePathname(stripped || '/');
  }, [pathname]);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    const next = normalizePathname(withLangPrefix(to));
    if (next === window.location.pathname) return;
    if (opts?.replace) {
      window.history.replaceState(null, '', next);
    } else {
      window.history.pushState(null, '', next);
    }
    setPathname(next);
  }, []);

  return [locationForRouting, navigate] as const;
}
