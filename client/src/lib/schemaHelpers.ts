export type BreadcrumbItem = { name: string; url: string };

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
