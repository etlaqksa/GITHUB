import { useEffect, useMemo, useState } from 'react';

import TrustStats from '@/components/TrustStats';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePrefersReducedMotion } from '@/components/hero/usePrefersReducedMotion';
import { ArrowLeft, ArrowRight, Drill, MessageCircle, Radar, ShieldCheck } from 'lucide-react';

type HeroVariant = 'gradient' | 'blobs' | 'grid';

type Props = {
  heroVariant: HeroVariant;
  heroWhatsAppUrl: string;
  onExploreServicesClick?: () => void;
  onWhatsappClick?: () => void;
};

type Scene = 0 | 1 | 2 | 3;

function ServiceTiles({ variant }: { variant: 'ar' | 'en' }) {
  const tiles =
    variant === 'ar'
      ? [
          { icon: Drill, label: 'حقن تربة' },
          { icon: Radar, label: 'كشف تكهفات' },
          { icon: ShieldCheck, label: 'جيوفيزياء GPR/ERT/MASW' },
        ]
      : [
          { icon: Drill, label: 'Soil Grouting' },
          { icon: Radar, label: 'Cavity Probing' },
          { icon: ShieldCheck, label: 'Geophysics GPR/ERT/MASW' },
        ];

  const Arrow = variant === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="grid w-full gap-3 md:grid-cols-3">
      {tiles.map((t, i) => (
        <div
          key={t.label}
          className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/35 px-4 py-4 backdrop-blur-sm shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
          style={{
            // Subtle per-tile glow without changing the global accent.
            ['--tile-rgb' as any]: i === 0 ? '37 99 235' : i === 1 ? '245 158 11' : '16 185 129',
          }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(800px circle at 50% 0%, rgb(var(--tile-rgb) / 0.22), transparent 55%)',
            }}
          />
          <div className="relative flex items-center justify-center gap-3 text-lg md:text-xl font-extrabold text-white">
            <t.icon className="h-6 w-6 text-secondary drop-shadow-[0_10px_26px_rgba(0,0,0,0.65)]" />
            <span className="leading-tight">{t.label}</span>
            <Arrow className="h-5 w-5 text-white/80" />
          </div>
        </div>
      ))}
    </div>
  );
}

function BenefitTiles({ variant }: { variant: 'ar' | 'en' }) {
  const items =
    variant === 'ar'
      ? ['تكلفة أقل', 'وقت أقل', 'مخاطرة أقل', 'نتائج أكثر استقرارًا']
      : ['Lower cost', 'Less time', 'Lower risk', 'More stable results'];

  return (
    <div className="grid w-full max-w-4xl gap-3 grid-cols-2 md:grid-cols-4">
      {items.map((it) => (
        <div
          key={it}
          className="rounded-2xl border border-white/15 bg-black/35 px-3 py-3 text-center font-extrabold text-white shadow-[0_18px_48px_rgba(0,0,0,0.40)]"
        >
          <span className="text-secondary">{it}</span>
        </div>
      ))}
    </div>
  );
}

export default function HeroIntroSequence({ heroVariant, heroWhatsAppUrl, onExploreServicesClick, onWhatsappClick }: Props) {
  const { language } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();

  const variant = language === 'ar' ? 'ar' : 'en';

  const timeline = useMemo(
    () => ({
      showMs: [3200, 3800, 5200, 4200] as const,
      fadeMs: [700, 700, 800, 800] as const,
    }),
    []
  );

  const [scene, setScene] = useState<Scene>(0);
  const [sceneVisible, setSceneVisible] = useState(true);
  const [done, setDone] = useState(false);

  // When switching hero variants, restart the intro sequence (keeps the toggle feeling "alive").
  useEffect(() => {
    if (prefersReducedMotion) return;
    setScene(0);
    setSceneVisible(true);
    setDone(false);
  }, [heroVariant, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDone(true);
      return;
    }
    if (done) return;

    const showFor = timeline.showMs[scene];
    const fadeFor = timeline.fadeMs[scene];

    setSceneVisible(true);

    const t1 = window.setTimeout(() => setSceneVisible(false), showFor);
    const t2 = window.setTimeout(() => {
      if (scene >= 3) {
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
  }, [prefersReducedMotion, done, scene, timeline]);

  const TopPill = (
    <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/25 bg-black/60 px-4 py-2 text-[14px] md:text-base font-semibold text-white/90 shadow-[0_12px_34px_rgba(0,0,0,0.35)]">
      {variant === 'ar' ? (
        <span className="whitespace-nowrap">
          <span className="font-extrabold text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">حلول هندسية</span>
          {' • حقن تربة • كشف تكهفات • حلول جيوفيزيائية'}
        </span>
      ) : (
        <span className="whitespace-nowrap">
          <span className="font-extrabold text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">Engineering solutions</span>
          {' • Soil Grouting • Cavity Probing • Geophysical Solutions'}
        </span>
      )}
    </div>
  );

  const FullContent = (
    <div
      className={
        'mx-auto w-full max-w-5xl space-y-6 text-white text-center flex flex-col items-center transition-opacity duration-700 ' +
        (done ? 'opacity-100' : 'opacity-0')
      }
      aria-hidden={!done}
    >
      {TopPill}

      <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.06] tracking-tight drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)]">
        {variant === 'ar' ? (
          <>
            نحن نقوّي <span className="text-secondary">أساساتك</span>
          </>
        ) : (
          <>
            We Strengthen <span className="text-secondary">Your Foundations</span>
          </>
        )}
      </h1>

      <div className="w-full space-y-3">
        <div className="text-lg md:text-2xl font-extrabold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
          {variant === 'ar' ? 'شركة إطلاق المتميزة' : 'ETLAQ Distinguished Company'}
        </div>
        <ServiceTiles variant={variant} />
      </div>

      <p className="max-w-4xl text-base md:text-xl text-white/95 font-semibold leading-relaxed drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
        {variant === 'ar'
          ? 'في شركة إطلاق المتميزة نوفّر حلولًا لمعالجة الهبوطات والتشققات والتكهفات في الرياض وجميع مدن المملكة، عبر تثبيت الأساسات بحقن التربة، وكشف التكهفات بالتخريم (Cavity Probing) أو الحلول الجيوفيزيائية، ثم معالجة وملء التكهفات بالحقن الأسمنتي.'
          : 'At ETLAQ Distinguished Company, we provide solutions to address settlement, cracks, and cavities across Riyadh and all cities of the Kingdom—by stabilizing foundations with soil grouting, detecting cavities via Cavity Probing or geophysical solutions, then treating and filling cavities with cement grouting.'}
      </p>

      <div className="w-full space-y-3">
        <div className="text-base md:text-xl font-extrabold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          {variant === 'ar' ? 'نركّز على الحل المبكر لأنه يحقق:' : 'We focus on early intervention because it delivers:'}
        </div>
        <BenefitTiles variant={variant} />
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 pt-2">
        <a href="#services" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
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
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.35)] gap-2"
            onClick={onWhatsappClick}
          >
            <MessageCircle className="h-4 w-4" />
            {variant === 'ar' ? 'تواصل واتساب' : 'WhatsApp'}
          </Button>
        </a>
      </div>

      <div className="w-full max-w-5xl rounded-2xl border border-white/20 bg-black/55 p-5 md:p-6 shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
        <TrustStats compact variant="inverse" />
      </div>
    </div>
  );

  const SceneOverlay = (
    <div
      className={
        'absolute inset-0 flex items-center justify-center transition-opacity duration-700 ' +
        (done ? 'opacity-0 pointer-events-none' : 'opacity-100')
      }
      aria-hidden={done}
    >
      <div
        className={
          'mx-auto w-full max-w-5xl text-center flex flex-col items-center px-2 transition-all duration-700 ' +
          (sceneVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')
        }
      >
        {scene === 0 ? (
          <h2 className="text-5xl md:text-7xl font-extrabold leading-[1.06] tracking-tight text-white drop-shadow-[0_14px_40px_rgba(0,0,0,0.95)]">
            {variant === 'ar' ? (
              <>
                نحن نقوّي <span className="text-secondary">أساساتك</span>
              </>
            ) : (
              <>
                We Strengthen <span className="text-secondary">Your Foundations</span>
              </>
            )}
          </h2>
        ) : null}

        {scene === 1 ? (
          <div className="w-full space-y-4">
            <div className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-[0_12px_34px_rgba(0,0,0,0.9)]">
              {variant === 'ar' ? 'شركة إطلاق المتميزة' : 'ETLAQ Distinguished Company'}
            </div>
            <ServiceTiles variant={variant} />
          </div>
        ) : null}

        {scene === 2 ? (
          <p className="max-w-4xl text-lg md:text-2xl font-semibold leading-relaxed text-white/95 drop-shadow-[0_12px_34px_rgba(0,0,0,0.95)]">
            {variant === 'ar'
              ? 'في شركة إطلاق المتميزة نوفّر حلولًا لمعالجة الهبوطات والتشققات والتكهفات في الرياض وجميع مدن المملكة، عبر تثبيت الأساسات بحقن التربة، وكشف التكهفات بالتخريم (Cavity Probing) أو الحلول الجيوفيزيائية، ثم معالجة وملء التكهفات بالحقن الأسمنتي.'
              : 'At ETLAQ Distinguished Company, we provide solutions to address settlement, cracks, and cavities across Riyadh and all cities of the Kingdom—by stabilizing foundations with soil grouting, detecting cavities via Cavity Probing or geophysical solutions, then treating and filling cavities with cement grouting.'}
          </p>
        ) : null}

        {scene === 3 ? (
          <div className="w-full space-y-4">
            <div className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-[0_12px_34px_rgba(0,0,0,0.9)]">
              {variant === 'ar' ? 'نركّز على الحل المبكر لأنه يحقق:' : 'We focus on early intervention because it delivers:'}
            </div>
            <BenefitTiles variant={variant} />
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Reserve final layout height from the start (prevents CLS). */}
      {FullContent}
      {SceneOverlay}
    </div>
  );
}
