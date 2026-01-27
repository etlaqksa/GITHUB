export function getSiteUrl() {
  const v = (import.meta as any).env?.VITE_SITE_URL || 'https://etlaqksa.com';
  return String(v).replace(/\/+$/, '');
}

export function absUrl(pathname: string) {
  const base = getSiteUrl();
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${p}`;
}
