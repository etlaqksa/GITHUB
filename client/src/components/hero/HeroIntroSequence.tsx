import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

import LocalizedLink from '@/components/LocalizedLink';
import TrustStats from '@/components/TrustStats';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePrefersReducedMotion } from '@/components/hero/usePrefersReducedMotion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { IconGprRadar, IconShieldCheck, IconSoilGrouting, IconWhatsapp } from '@/components/icons/etlaq';

type HeroVariant = 'gradient' | 'blobs' | 'grid' | 'light';
type Tone = 'dark' | 'light';

type Props = {
  heroVariant: HeroVariant;
  heroWhatsAppUrl: string;
  showVariantSwitcher?: boolean;
  forceMotion?: boolean;
  onVariantChange?: (v: HeroVariant) => void;
  onToggleMotion?: () => void;
  onExploreServicesClick?: () => void;
  onWhatsappClick?: () => void;
};

type Scene = 0 | 1 | 2 | 3 | 4;

function HeroVariantSwitcher({
  tone,
  language,
  heroVariant,
  onVariantChange,
  forceMotion,
  onToggleMotion,
}: {
  tone: Tone;
  language: 'ar' | 'en';
  heroVariant: HeroVariant;
  onVariantChange?: (v: HeroVariant) => void;
  forceMotion?: boolean;
  onToggleMotion?: () => void;
}) {
  if (!onVariantChange) return null;

  const [open, setOpen] = useState(false);

  const labels: Record<HeroVariant, string> =
    language === 'ar'
      ? {
          gradient: 'تدرّج',
          blobs: 'Blobs',
          grid: 'شبكة',
          light: 'فاتح',
        }
      : {
          gradient: 'Gradient',
          blobs: 'Blobs',
          grid: 'Grid',
          light: 'Light',
        };

  const shell =
    tone === 'dark'
      ? 'border-white/20 bg-white/10 text-white shadow-[0_12px_34px_rgba(0,0,0,0.35)]'
      : 'border-black/10 bg-white/70 text-slate-900 shadow-[0_12px_30px_rgba(0,0,0,0.12)]';
  const btnBase =
    'rounded-full px-3 py-1 text-[12px] sm:text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60';
  const btnOn = tone === 'dark' ? 'bg-white/20' : 'bg-black/10';
  const btnOff = tone === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5';
  const divider = tone === 'dark' ? 'bg-white/20' : 'bg-black/10';

  const toggleBtn =
    tone === 'dark'
      ? 'border-white/20 bg-black/40 text-white hover:bg-black/55'
      : 'border-black/10 bg-white/75 text-slate-900 hover:bg-white';

  return (
    <div className="inline-flex items-center justify-center rtl:flex-row-reverse">
      {/* Collapsed: a single circle. Click toggles the full bar. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={language === 'ar' ? 'تغيير خلفية الهيرو' : 'Change hero background'}
        className={
          'inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition ' +
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 ' +
          toggleBtn
        }
      >
        <Sparkles className={'h-5 w-5 ' + (!open ? 'etlaq-spin-pulse' : '')} />
      </button>

      {/* Expanded bar */}
      {open && (

      <div
        className={
          'overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-out ' +
          (open
            ? 'max-w-[min(92vw,560px)] opacity-100 translate-y-0 ml-2 rtl:ml-0 rtl:mr-2'
            : 'max-w-0 opacity-0 -translate-y-0.5 ml-0 rtl:mr-0')
        }
>
        <div
          className={
            'inline-flex items-center gap-1.5 rounded-full border px-2 py-1 backdrop-blur ' +
            // Fixed max width enables horizontal scrolling on mobile instead of wrapping.
            'w-[min(92vw,560px)] justify-center flex-nowrap overflow-x-auto no-scrollbar ' +
            shell
          }
        >
          {(Object.keys(labels) as HeroVariant[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={heroVariant === v}
              onClick={() => {
                onVariantChange(v);
                setOpen(false);
              }}
              className={btnBase + ' whitespace-nowrap ' + (heroVariant === v ? btnOn : btnOff)}
            >
              {labels[v]}
            </button>
          ))}

          {onToggleMotion ? (
            <>
              <span className={'mx-1 h-5 w-px ' + divider} aria-hidden="true" />
              <button
                type="button"
                aria-pressed={!!forceMotion}
                onClick={() => {
                  onToggleMotion();
                  setOpen(false);
                }}
                className={btnBase + ' whitespace-nowrap ' + (forceMotion ? btnOn : btnOff)}
                title={
                  language === 'ar'
                    ? 'تفعيل الحركة حتى مع إعداد تقليل الحركة'
                    : 'Force motion even if OS reduced-motion is enabled'
                }
              >
                {language === 'ar' ? 'حركة' : 'Motion'}
              </button>
            </>
          ) : null}
        </div>
      </div>

      )}
    </div>
  );
}

function ServiceTiles({ variant, tone }: { variant: 'ar' | 'en'; tone: Tone }) {
  const tiles =
    variant === 'ar'
      ? [
          { icon: IconSoilGrouting, label: 'حقن تربة', href: '/services/grouting' },
          { icon: IconGprRadar, label: 'كشف تكهفات', href: '/services/cavity' },
          { icon: IconShieldCheck, label: 'جيوفيزياء GPR/ERT/MASW', href: '/services/geophysical' },
        ]
      : [
          { icon: IconSoilGrouting, label: 'Soil Grouting', href: '/services/grouting' },
          { icon: IconGprRadar, label: 'Cavity Probing', href: '/services/cavity' },
          { icon: IconShieldCheck, label: 'Geophysics GPR/ERT/MASW', href: '/services/geophysical' },
        ];

  const tileShell =
    tone === 'dark'
      ? 'border-white/15 bg-black/35 text-white shadow-[0_18px_48px_rgba(0,0,0,0.45)]'
      : 'border-black/10 bg-white/70 text-slate-900 shadow-[0_16px_44px_rgba(0,0,0,0.16)]';

  const iconClass =
    tone === 'dark'
      ? 'text-secondary drop-shadow-[0_10px_26px_rgba(0,0,0,0.65)]'
      : 'text-secondary drop-shadow-[0_10px_22px_rgba(0,0,0,0.20)]';

  return (
    <div className="grid w-full gap-3 md:grid-cols-3">
      {tiles.map((t, i) => (
        <LocalizedLink
          key={t.label}
          href={t.href}
          className={
            'group relative block overflow-hidden rounded-2xl px-4 py-4 backdrop-blur-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(0,0,0,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 ' +
            tileShell
          }
          style={{
            // Subtle per-tile glow without changing the global accent.
            ['--tile-rgb' as any]: i === 0 ? '37 99 235' : i === 1 ? '245 158 11' : '16 185 129',
          }}
          aria-label={t.label}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(800px circle at 50% 0%, rgb(var(--tile-rgb) / 0.22), transparent 55%)',
            }}
          />
          <div className="relative flex items-center justify-center gap-3 text-base md:text-lg font-extrabold">
            <t.icon className={'h-6 w-6 ' + iconClass} />
            <span className="leading-tight">{t.label}</span>
          </div>
        </LocalizedLink>
      ))}
    </div>
  );
}

function BenefitTiles({ variant, tone }: { variant: 'ar' | 'en'; tone: Tone }) {
  const items =
    variant === 'ar'
      ? ['تكلفة أقل', 'وقت أقل', 'مخاطرة أقل', 'نتائج أكثر استقرارًا']
      : ['Lower cost', 'Less time', 'Lower risk', 'More stable results'];

  const tile =
    tone === 'dark'
      ? 'border-white/15 bg-black/35 shadow-[0_18px_48px_rgba(0,0,0,0.40)]'
      : 'border-black/10 bg-white/70 shadow-[0_16px_44px_rgba(0,0,0,0.14)]';

  const accents =
    tone === 'dark'
      ? ['text-sky-200', 'text-amber-200', 'text-emerald-200', 'text-violet-200']
      : ['text-sky-700', 'text-amber-700', 'text-emerald-700', 'text-violet-700'];

  return (
    <div className="grid w-full max-w-4xl gap-3 grid-cols-2 md:grid-cols-4">
      {items.map((it, idx) => (
        <div
          key={it}
          className={
            'rounded-2xl border px-3 py-3 text-center font-extrabold transition hover:-translate-y-0.5 ' +
            tile
          }
        >
          <span className={accents[idx % accents.length]}>{it}</span>
        </div>
      ))}
    </div>
  );
}

export default function HeroIntroSequence({
  heroVariant,
  heroWhatsAppUrl,
  showVariantSwitcher,
  forceMotion,
  onVariantChange,
  onToggleMotion,
  onExploreServicesClick,
  onWhatsappClick,
}: Props) {
  const { language } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();

  const variant: 'ar' | 'en' = language === 'ar' ? 'ar' : 'en';
  const tone: Tone = heroVariant === 'light' ? 'light' : 'dark';

  const accentOrange = tone === 'dark' ? 'text-amber-300' : 'text-orange-600';
  const accentEmerald = tone === 'dark' ? 'text-emerald-300' : 'text-emerald-700';
  const accentViolet = tone === 'dark' ? 'text-violet-300' : 'text-violet-700';
  const brandGradientText =
    'bg-gradient-to-l from-secondary via-amber-500 to-orange-500 text-transparent bg-clip-text';

  // Skip animation for returning visitors — show final content immediately.
  const isReturningVisitor = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('etlaq-hero-seen') === '1';
    } catch { return false; }
  }, []);

  const timeline = useMemo(
    () => ({
      // 0: headline, 1: services, 2: long intro, 3: early intervention, 4: counters
      // Reduced durations (~30% faster) for snappier first-time experience.
      showMs: [1200, 1300, 1700, 1400, 1200] as const,
      fadeMs: [400, 400, 450, 450, 400] as const,
    }),
    []
  );

  const [scene, setScene] = useState<Scene>(0);
  const [sceneVisible, setSceneVisible] = useState(true);
  const [done, setDone] = useState(isReturningVisitor);

  // Allow users to advance the intro sequence by clicking/tapping.
  const fastAdvanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fastAdvanceTimerRef.current) {
        window.clearTimeout(fastAdvanceTimerRef.current);
        fastAdvanceTimerRef.current = null;
      }
    };
  }, []);

  // When switching hero variants, restart the intro sequence (keeps the toggle feeling "alive").
  useEffect(() => {
    if (prefersReducedMotion) return;
    setScene(0);
    setSceneVisible(true);
    setDone(false);
  }, [heroVariant, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || isReturningVisitor) {
      setDone(true);
      return;
    }
    if (done) return;

    const showFor = timeline.showMs[scene];
    const fadeFor = timeline.fadeMs[scene];

    setSceneVisible(true);

    const t1 = window.setTimeout(() => setSceneVisible(false), showFor);
    const t2 = window.setTimeout(() => {
      if (scene >= 4) {
        setDone(true);
      } else {
        setScene((s) => ((s + 1) as Scene));
        setSceneVisible(true);
      }
    }, showFor + fadeFor);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [prefersReducedMotion, isReturningVisitor, done, scene, timeline]);

  // Mark visitor as returning after first complete animation.
  useEffect(() => {
    if (done && !isReturningVisitor) {
      try { sessionStorage.setItem('etlaq-hero-seen', '1'); } catch {}
    }
  }, [done, isReturningVisitor]);

  const advanceScene = useCallback(() => {
    if (prefersReducedMotion || done) return;

    // Quick fade-out, then swap scene.
    setSceneVisible(false);

    if (fastAdvanceTimerRef.current) {
      window.clearTimeout(fastAdvanceTimerRef.current);
    }

    fastAdvanceTimerRef.current = window.setTimeout(() => {
      setScene((prev) => {
        if (prev >= 4) {
          setDone(true);
          return prev;
        }
        return (prev + 1) as Scene;
      });
      setSceneVisible(true);
    }, 140);
  }, [done, prefersReducedMotion]);

  const onSceneClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || done) return;

      const target = e.target as HTMLElement | null;
      // Don't hijack clicks on real interactive elements.
      if (target && target.closest('a,button,input,textarea,select,label')) return;

      advanceScene();
    },
    [advanceScene, done, prefersReducedMotion]
  );

  const TopPill = (
    <div
      className={
        'mx-auto inline-flex flex-wrap items-center justify-center gap-2 rounded-full border px-4 py-2 text-[14px] md:text-base font-semibold backdrop-blur ' +
        (tone === 'dark'
          ? 'border-white/25 bg-black/60 text-white/90 shadow-[0_12px_34px_rgba(0,0,0,0.35)]'
          : 'border-black/10 bg-white/70 text-slate-800 shadow-[0_12px_30px_rgba(0,0,0,0.12)]')
      }
    >
      {variant === 'ar' ? (
        <span className="whitespace-nowrap">
          <span
            className={
              'font-extrabold drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)] ' +
              (tone === 'dark' ? 'text-white' : 'text-slate-950')
            }
          >
            حلول هندسية
          </span>
          {' • حقن تربة • كشف تكهفات • حلول جيوفيزيائية'}
        </span>
      ) : (
        <span className="whitespace-nowrap">
          <span
            className={
              'font-extrabold drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)] ' +
              (tone === 'dark' ? 'text-white' : 'text-slate-950')
            }
          >
            Engineering solutions
          </span>
          {' • Soil Grouting • Cavity Probing • Geophysical Solutions'}
        </span>
      )}
    </div>
  );

  const FullContent = (
    <div
      className={
        'mx-auto w-full max-w-5xl space-y-5 md:space-y-6 text-center flex flex-col items-center transition-opacity duration-700 ' +
        (tone === 'dark' ? 'text-white ' : 'text-slate-950 ') +
        (done ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none')
      }
      aria-hidden={!done}
    >
      {TopPill}

      <h1
        className={
          'text-4xl md:text-6xl font-extrabold leading-[1.06] tracking-tight ' +
          (tone === 'dark'
            ? 'drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)]'
            : 'drop-shadow-[0_10px_28px_rgba(0,0,0,0.22)]')
        }
      >
        {variant === 'ar' ? (
          <>
            نحن <span className="text-secondary">نقوّي</span>{' '}
            <span className={accentOrange}>أساساتك</span>
          </>
        ) : (
          <>
            We <span className="text-secondary">Strengthen</span>{' '}
            <span className={accentOrange}>Your Foundations</span>
          </>
        )}
      </h1>

      <div className="w-full space-y-3">
        <div
          className={'text-lg md:text-2xl font-extrabold drop-shadow-[0_10px_30px_rgba(0,0,0,0.20)] ' + brandGradientText}
        >
          {variant === 'ar' ? 'شركة إطلاق المتميزة' : 'ETLAQ Distinguished Company'}
        </div>
        <ServiceTiles variant={variant} tone={tone} />
      </div>

      <p
        className={
          'max-w-4xl text-base md:text-xl font-semibold leading-relaxed ' +
          (tone === 'dark'
            ? 'text-white/95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
            : 'text-slate-700')
        }
      >
        {variant === 'ar' ? (
          <>
            في شركة إطلاق المتميزة نوفّر حلولًا لمعالجة الهبوطات والتشققات والتكهفات في الرياض وجميع مدن المملكة، عبر تثبيت
            الأساسات <span className="text-secondary font-extrabold">بحقن التربة</span>، وكشف التكهفات بالتخريم{' '}
            <span className={accentOrange + ' font-extrabold'}>(Cavity Probing)</span> أو{' '}
            <span className={accentEmerald + ' font-extrabold'}>الحلول الجيوفيزيائية</span>، ثم معالجة وملء التكهفات{' '}
            <span className={accentViolet + ' font-extrabold'}>بالحقن الأسمنتي</span>.
          </>
        ) : (
          <>
            At ETLAQ Distinguished Company, we provide solutions to address settlement, cracks, and cavities across Riyadh and all cities
            of the Kingdom—by stabilizing foundations with{' '}
            <span className="text-secondary font-extrabold">soil grouting</span>, detecting cavities via{' '}
            <span className={accentOrange + ' font-extrabold'}>Cavity Probing</span> or{' '}
            <span className={accentEmerald + ' font-extrabold'}>geophysical solutions</span>, then treating and filling cavities with{' '}
            <span className={accentViolet + ' font-extrabold'}>cement grouting</span>.
          </>
        )}
      </p>

      <div className="w-full space-y-3">
        <div
          className={
            'text-base md:text-xl font-extrabold ' +
            (tone === 'dark'
              ? 'text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
              : 'text-slate-900')
          }
        >
          {variant === 'ar' ? (
            <>
              نركّز على <span className={accentOrange}>الحل المبكر</span> لأنه يحقق:
            </>
          ) : (
            <>
              We focus on <span className={accentOrange}>early intervention</span> because it delivers:
            </>
          )}
        </div>
        <BenefitTiles variant={variant} tone={tone} />
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 pt-2">
        <a href="#services" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
            onClick={onExploreServicesClick}
          >
            {variant === 'ar' ? 'استعرض الخدمات' : 'Explore services'}
            <ArrowLeft className={variant === 'ar' ? 'mr-2 h-4 w-4 rotate-180' : 'ml-2 h-4 w-4'} />
          </Button>
        </a>

        <a
          href={heroWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.25)] gap-2"
            onClick={onWhatsappClick}
          >
            <IconWhatsapp className="h-4 w-4" />
            {variant === 'ar' ? 'تواصل واتساب' : 'WhatsApp'}
          </Button>
        </a>
      </div>

      <div
        className={
          'w-full max-w-5xl rounded-2xl border p-5 md:p-6 ' +
          (tone === 'dark'
            ? 'border-white/20 bg-black/55 shadow-[0_22px_60px_rgba(0,0,0,0.55)]'
            : 'border-black/10 bg-white/70 shadow-[0_18px_50px_rgba(0,0,0,0.14)]')
        }
      >
        <TrustStats compact variant={tone === 'dark' ? 'inverse' : 'default'} />
      </div>
    </div>
  );

  const SceneOverlay = (
    <div
      className={
        // NOTE: On small mobile screens the reserved (hidden) final layout is very tall.
        // Centering the overlay would push the animated scenes below the first viewport.
        // So we align to the top on <sm and keep the centered layout on sm+.
        'absolute inset-0 flex items-start justify-center pt-16 pb-10 sm:items-center sm:justify-center sm:pt-0 sm:pb-0 sm:py-10 md:py-14 transition-opacity duration-700 ' +
        (done ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer')
      }
      aria-hidden={done}
      onClick={onSceneClick}
    >
      <div
        className={
          'mx-auto w-full max-w-5xl text-center flex flex-col items-center px-2 transition-all duration-700 ' +
          (sceneVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')
        }
      >
        {scene === 0 ? (
          <h2
            className={
              'text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tight ' +
              (tone === 'dark'
                ? 'text-white drop-shadow-[0_14px_40px_rgba(0,0,0,0.95)]'
                : 'text-slate-950 drop-shadow-[0_14px_32px_rgba(0,0,0,0.20)]')
            }
          >
            {variant === 'ar' ? (
              <>
                نحن <span className="text-secondary">نقوّي</span>{' '}
                <span className={accentOrange}>أساساتك</span>
              </>
            ) : (
              <>
                We <span className="text-secondary">Strengthen</span>{' '}
                <span className={accentOrange}>Your Foundations</span>
              </>
            )}
          </h2>
        ) : null}

        {scene === 1 ? (
          <div className="w-full space-y-3">
            <div
              className={'text-lg md:text-2xl font-extrabold drop-shadow-[0_10px_30px_rgba(0,0,0,0.20)] ' + brandGradientText}
            >
              {variant === 'ar' ? 'شركة إطلاق المتميزة' : 'ETLAQ Distinguished Company'}
            </div>
            <ServiceTiles variant={variant} tone={tone} />
          </div>
        ) : null}

        {scene === 2 ? (
          <p
            className={
              'max-w-4xl text-lg md:text-2xl font-semibold leading-relaxed ' +
              (tone === 'dark'
                ? 'text-white/95 drop-shadow-[0_12px_34px_rgba(0,0,0,0.95)]'
                : 'text-slate-800')
            }
          >
            {variant === 'ar' ? (
              <>
                في شركة إطلاق المتميزة نوفّر حلولًا لمعالجة الهبوطات والتشققات والتكهفات في الرياض وجميع مدن المملكة، عبر تثبيت
                الأساسات <span className="text-secondary font-extrabold">بحقن التربة</span>، وكشف التكهفات بالتخريم{' '}
                <span className={accentOrange + ' font-extrabold'}>(Cavity Probing)</span> أو{' '}
                <span className={accentEmerald + ' font-extrabold'}>الحلول الجيوفيزيائية</span>، ثم معالجة وملء التكهفات{' '}
                <span className={accentViolet + ' font-extrabold'}>بالحقن الأسمنتي</span>.
              </>
            ) : (
              <>
                At ETLAQ Distinguished Company, we provide solutions to address settlement, cracks, and cavities across Riyadh and all
                cities of the Kingdom—by stabilizing foundations with{' '}
                <span className="text-secondary font-extrabold">soil grouting</span>, detecting cavities via{' '}
                <span className={accentOrange + ' font-extrabold'}>Cavity Probing</span> or{' '}
                <span className={accentEmerald + ' font-extrabold'}>geophysical solutions</span>, then treating and filling cavities with{' '}
                <span className={accentViolet + ' font-extrabold'}>cement grouting</span>.
              </>
            )}
          </p>
        ) : null}

        {scene === 3 ? (
          <div className="w-full space-y-4">
            <div
              className={
                'text-2xl md:text-4xl font-extrabold ' +
                (tone === 'dark'
                  ? 'text-white drop-shadow-[0_12px_34px_rgba(0,0,0,0.9)]'
                  : 'text-slate-950')
              }
            >
              {variant === 'ar' ? (
                <>
                  نركّز على <span className={accentOrange}>الحل المبكر</span> لأنه يحقق:
                </>
              ) : (
                <>
                  We focus on <span className={accentOrange}>early intervention</span> because it delivers:
                </>
              )}
            </div>
            <BenefitTiles variant={variant} tone={tone} />
          </div>
        ) : null}

        {scene === 4 ? (
          <div
            className={
              'w-full max-w-5xl rounded-2xl border p-5 md:p-6 ' +
              (tone === 'dark'
                ? 'border-white/20 bg-black/55 shadow-[0_22px_60px_rgba(0,0,0,0.55)]'
                : 'border-black/10 bg-white/70 shadow-[0_18px_50px_rgba(0,0,0,0.14)]')
            }
          >
            <TrustStats compact variant={tone === 'dark' ? 'inverse' : 'default'} />
          </div>
        ) : null}
      </div>
    </div>
  );

  const showSwitcher = !!showVariantSwitcher;

  return (
    <div className="relative w-full">
      {showSwitcher ? (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
          <HeroVariantSwitcher
            tone={tone}
            language={variant}
            heroVariant={heroVariant}
            onVariantChange={onVariantChange}
            forceMotion={forceMotion}
            onToggleMotion={onToggleMotion}
          />
        </div>
      ) : null}

      <div className="relative w-full pt-16 md:pt-20">
        {/* Reserve final layout height from the start (prevents CLS). */}
        {FullContent}
        {!done && SceneOverlay}
      </div>
    </div>
  );
}
