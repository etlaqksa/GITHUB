import LocalizedLink from '@/components/LocalizedLink';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { absUrl } from '@/lib/siteUrl';

export type BreadcrumbItem = { name: string; href: string; isCurrent?: boolean };

/**
 * SEO-enhanced Breadcrumbs with JSON-LD BreadcrumbList schema.
 * Renders both visual breadcrumbs AND structured data for Google Rich Results.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const Chevron = isAr ? ChevronLeft : ChevronRight;

  if (!items?.length) return null;

  // Build JSON-LD BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': isAr ? 'الرئيسية' : 'Home',
        'item': absUrl(`/${language}`),
      },
      ...items.map((it, idx) => ({
        '@type': 'ListItem',
        'position': idx + 2,
        'name': it.name,
        ...(it.isCurrent ? {} : { 'item': absUrl(`/${language}${it.href}`) }),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label={isAr ? 'مسار التصفح' : 'Breadcrumb'} className="mb-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-2">
            <LocalizedLink href="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </LocalizedLink>
          </li>

          {items.map((it, idx) => (
            <li key={`${it.href}-${idx}`} className="inline-flex items-center gap-2">
              <Chevron className="w-4 h-4 opacity-70" />
              {it.isCurrent ? (
                <span className="text-foreground font-medium">{it.name}</span>
              ) : (
                <LocalizedLink href={it.href} className="hover:text-foreground transition-colors">
                  {it.name}
                </LocalizedLink>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
