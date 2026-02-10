import { Helmet } from 'react-helmet-async';
import { getLangFromPathname, stripLangPrefix } from '@/lib/localizePath';
import { mapPathToLang } from '@/lib/mapPathToLang';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
  noIndex?: boolean;
  alternateUrls?: { ar?: string; en?: string };
}

export function SEO({
  title = 'شركة إطلاق المتميزة | حقن التربة وكشف التكهفات في السعودية',
  description = 'منصة هندسية متخصصة في حقن التربة (حقن أسمنتي) وكشف التكهفات، مع دراسات جيوفيزيائية (GPR/ERT/Seismic) عند الحاجة في جميع مناطق المملكة. اطلب تقييم مختصر وخطة خطوة تالية واضحة.',
  keywords = 'حقن أسمنتي, حقن التربة, حقن تربة, حقن الخرسانة, تقوية الأساسات, معالجة الهبوط, معالجة التشققات, كشف فراغات, كشف التكهفات, دراسة التكهفات, فحص الكهوف, فحص تربة, تقارير تربة, تقارير جيوتقنية, استشارات هندسية, جيوتكنيك, Cement grouting, Soil grouting, Soil injection, Concrete injection, Foundation strengthening, Underpinning, Settlement remediation, Crack repair, Void detection, Cavity detection, Sinkhole investigation, Geophysical surveys, GPR, ERT, Seismic survey, Riyadh, Jeddah, Dammam, Khobar, Madinah, Makkah, Taif, Jubail, Qatif, Dhahran, etlaqksa, ETLAQ DISTINGUISHED COMPANY, شركة إطلاق المتميزة',
  image = 'https://etlaqksa.com/og-image.webp',
  url,

  type = 'website',
  noIndex = false,
  schema,
  alternateUrls,
}: SEOProps) {
  const BASE_URL = (import.meta as any).env?.VITE_SITE_URL || 'https://etlaqksa.com';
  const base = String(BASE_URL).replace(/\/+$/, '');
  const path = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
  const langFromPath = getLangFromPathname(path) || 'ar';
  const strippedPath = stripLangPrefix(path);
  const canonicalUrl = url || `${base}${path}`;

  const toAbs = (u: string) => {
    const s = String(u || '');
    if (!s) return base;
    if (s.startsWith('http://') || s.startsWith('https://')) return s;
    return `${base}${s.startsWith('/') ? s : `/${s}`}`;
  };

  const altArPath = alternateUrls?.ar ? alternateUrls.ar : mapPathToLang(path, 'ar');
  const altEnPath = alternateUrls?.en ? alternateUrls.en : mapPathToLang(path, 'en');
  const altAr = toAbs(altArPath);
  const altEn = toAbs(altEnPath);

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'شركة إطلاق المتميزة المحدودة',
    alternateName: 'ETLAQ DISTINGUISHED COMPANY',
    description:
      'شركة متخصصة في حقن التربة (الحقن الأسمنتي) وكشف التكهفات، مع دراسات جيوفيزيائية عند الحاجة في المملكة العربية السعودية',
    url: base,
    telephone: '+966534145922',
    email: 'etlaqksa@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'الرياض',
      addressRegion: 'الرياض',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.7136,
      longitude: 46.6753,
    },
    areaServed: {
      '@type': 'Country',
      name: 'المملكة العربية السعودية',
    },
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات حقن التربة والاستشارات الهندسية',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'حقن التربة (الحقن الأسمنتي)',
            description: 'خدمات حقن التربة بالأسمنت لتقوية التربة ومعالجة التكهفات',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'كشف التكهفات',
            description: 'استخدام تقنيات كشف جيوفيزيائية لتحديد التكهفات تحت الأرض',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'الدراسات الجيوفيزيائية',
            description: 'مسوحات جيوفيزيائية (GPR/ERT/Seismic) لتقييم المخاطر والكشف عن التكهفات والطبقات الضعيفة',
          },
        },
      ],
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
            <meta name="theme-color" content="#0f172a" />
<meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="شركة إطلاق المتميزة المحدودة" />
      {noIndex ? (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      {!noIndex && (
        <>
          <meta name="googlebot" content="index, follow" />
          <meta name="bingbot" content="index, follow" />
        </>
      )}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar" href={altAr} />
      <link rel="alternate" hrefLang="en" href={altEn} />
      <link rel="alternate" hrefLang="x-default" href={altAr} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="شركة إطلاق المتميزة" />
      <meta property="og:locale" content={langFromPath === 'ar' ? 'ar_SA' : 'en_US'} />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags for SEO */}
      <meta name="geo.region" content="SA" />
      <meta name="geo.placename" content="الرياض" />
      <meta name="geo.position" content="24.7136;46.6753" />
      <meta name="ICBM" content="24.7136, 46.6753" />
      <meta name="language" content={langFromPath === 'ar' ? 'Arabic' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schema || defaultSchema)}</script>
    </Helmet>
  );
}

