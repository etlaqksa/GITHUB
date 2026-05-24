import { useEffect, useMemo, useState } from 'react';

import { SEO } from '@/components/SEO';
import HeroIntroSequence from '@/components/hero/HeroIntroSequence';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { trackEvent } from '@/lib/analytics';
import { absUrl } from '@/lib/siteUrl';
import { useUrlSearch } from '@/lib/useUrlSearch';
import { useLocation } from 'wouter';

import HomeBelowFold from './home/HomeBelowFold';


export default function Home() {
  const { language } = useLanguage();
  const [loc] = useLocation();
  const search = useUrlSearch();

  const { heroVariant, showHeroPreview, forceMotion } = useMemo(() => {
    const rawEnv = (import.meta.env.VITE_HERO_VARIANT || '').toString().toLowerCase();
    // Default hero variant for production: Light (requested).
    const envVariant =
      rawEnv === 'blobs'
        ? 'blobs'
        : rawEnv === 'grid'
          ? 'grid'
          : rawEnv === 'gradient'
            ? 'gradient'
            : rawEnv === 'light'
              ? 'light'
              : 'light';

    const params = new URLSearchParams(search || '');
    const q = (params.get('hero') || '').toLowerCase();
    const heroVariant = q === 'blobs' || q === 'gradient' || q === 'grid' || q === 'light'
      ? (q as 'blobs' | 'gradient' | 'grid' | 'light')
      : (envVariant as 'blobs' | 'gradient' | 'grid' | 'light');

    // User requested the switcher to be visible in production without any parameters.
    const showHeroPreview = true;
    const forceMotion = params.get('motion') === '1' || params.get('forceMotion') === '1';

    return { heroVariant, showHeroPreview, forceMotion };
  }, [loc, search]);

  const { mode } = useTheme();
  const effectiveHeroVariant = mode === 'dark' && heroVariant === 'light' ? 'gradient' : heroVariant;

  // Allow forcing motion for previewing animations even if the OS has reduced-motion enabled.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (forceMotion) document.documentElement.setAttribute('data-force-motion', '1');
    else document.documentElement.removeAttribute('data-force-motion');
  }, [forceMotion]);

  const updateHeroQuery = (next: Record<string, string | undefined>) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search || '');
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') params.delete(k);
      else params.set(k, v);
    });
    const qs = params.toString();
    const url = window.location.pathname + (qs ? `?${qs}` : '') + (window.location.hash || '');
    window.history.replaceState(null, '', url);
  };

  const whatsappNumber = '966534145922';
  const heroWhatsAppUrl = useMemo(() => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : absUrl('/');
    const text =
      language === 'ar'
        ? `السلام عليكم، أود طلب خدمة من شركة إطلاق المتميزة.\nرابط الصفحة: ${pageUrl}`
        : `Hello, I would like to request a service from ETLAQ Distinguished Company.\nPage: ${pageUrl}`;

    const base = `https://wa.me/${whatsappNumber}`;
    const q = new URLSearchParams({ text });
    return `${base}?${q.toString()}`;
  }, [language]);

  // "Desktop mode" on mobile browsers can report a wide viewport (so md/lg styles apply),
  // but the device is still a phone (coarse pointer).
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [isDesktopModeMobile, setIsDesktopModeMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: coarse)');
    const mqDesktopMode = window.matchMedia('(pointer: coarse) and (min-width: 768px)');

    const onChange = () => setIsCoarsePointer(!!mq.matches);
    const onChangeDesktopMode = () => setIsDesktopModeMobile(!!mqDesktopMode.matches);

    onChange();
    onChangeDesktopMode();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mq as any).addEventListener?.('change', onChange);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mqDesktopMode as any).addEventListener?.('change', onChangeDesktopMode);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mq as any).addListener?.(onChange);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mqDesktopMode as any).addListener?.(onChangeDesktopMode);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mq as any).removeEventListener?.('change', onChange);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mqDesktopMode as any).removeEventListener?.('change', onChangeDesktopMode);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mq as any).removeListener?.(onChange);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mqDesktopMode as any).removeListener?.(onChangeDesktopMode);
    };
  }, []);

  return (
    <>
      <SEO
        title={language === 'ar' ? 'شركة إطلاق المتميزة | حقن التربة وكشف التكهفات' : 'Etlaq | Soil Grouting & Cavity Detection'}
        description={
          language === 'ar'
            ? 'حلول حقن التربة وكشف التكهفات والدراسات الجيوفيزيائية. خبرة ميدانية ومخرجات واضحة تساعد على اتخاذ القرار بثقة. نخدم جميع مناطق المملكة.'
            : 'Soil grouting, cavity/void detection, and geophysical surveys. Field-proven execution and clear deliverables to help you decide with confidence across KSA.'
        }
        schema={
          language === 'ar'
            ? {
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'شركة إطلاق المتميزة المحدودة',
                url: absUrl('/ar'),
                logo: absUrl('/logo.webp'),
                image: absUrl('/favicon.webp'),
                telephone: '+966534145922',
                areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
                serviceType: ['حقن التربة', 'كشف التكهفات', 'حلول جيوفيزيائية'],
              }
            : {
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'ETLAQ Distinguished Company',
                url: absUrl('/en'),
                logo: absUrl('/logo.webp'),
                image: absUrl('/favicon.webp'),
                telephone: '+966534145922',
                areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
                serviceType: ['Soil grouting', 'Cavity detection', 'Geophysical surveys'],
              }
        }
        image={absUrl('/favicon.webp')}
      />

      {/* HERO */}
      <section
        data-anti-contextmenu="true"
        className={
          `relative isolate overflow-hidden flex items-center ` +
          (isDesktopModeMobile
            ? 'min-h-[clamp(520px,70vh,720px)]'
            : isCoarsePointer
              ? 'min-h-[clamp(520px,74vh,740px)]'
              : 'min-h-[clamp(520px,78vh,760px)] md:min-h-[clamp(620px,80vh,860px)]')
        }
      >
        <div
          className={
            'absolute inset-0 z-0 etlaq-hero-bg ' +
            (effectiveHeroVariant === 'blobs'
              ? 'etlaq-hero-bg--blobs'
              : effectiveHeroVariant === 'grid'
                ? 'etlaq-hero-bg--grid'
                : effectiveHeroVariant === 'light'
                  ? 'etlaq-hero-bg--light'
                  : 'etlaq-hero-bg--gradient')
          }
          aria-hidden="true"
        >
          {effectiveHeroVariant === 'blobs' ? (
            <>
              <div className="etlaq-hero-blob etlaq-hero-blob-1" />
              <div className="etlaq-hero-blob etlaq-hero-blob-2" />
              <div className="etlaq-hero-blob etlaq-hero-blob-3" />
            </>
          ) : null}
        </div>

        {/* Contrast layer so hero text stays readable (no top/bottom bands) */}
        <div
          className={
            'absolute inset-0 z-10 pointer-events-none ' +
            (effectiveHeroVariant === 'light'
              ? isDesktopModeMobile
                ? 'bg-white/25'
                : isCoarsePointer
                  ? 'bg-white/22'
                  : 'bg-white/18'
              : isDesktopModeMobile
                ? 'bg-black/48'
                : isCoarsePointer
                  ? 'bg-black/44'
                  : 'bg-black/38')
          }
          aria-hidden="true"
        />

        <div
          className={
            'w-full px-4 relative z-20 flex items-center justify-center ' +
            (isCoarsePointer ? 'pt-10 pb-14' : 'pt-12 pb-16 md:pt-16 md:pb-20')
          }
        >
          <HeroIntroSequence
            heroVariant={effectiveHeroVariant}
            heroWhatsAppUrl={heroWhatsAppUrl}
            showVariantSwitcher={showHeroPreview}
            forceMotion={forceMotion}
            onVariantChange={(v) => updateHeroQuery({ hero: v })}
            onToggleMotion={() => updateHeroQuery({ motion: forceMotion ? undefined : '1' })}
            onExploreServicesClick={() => trackEvent('home_hero_explore_services', { language })}
            onWhatsappClick={() => trackEvent('home_hero_whatsapp_click', { language })}
          />
        </div>
      </section>

      {/* BELOW THE FOLD */}
      <HomeBelowFold />
    </>
  );
}
