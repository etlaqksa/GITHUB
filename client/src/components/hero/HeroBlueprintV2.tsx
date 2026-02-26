import { Button } from "@/components/ui/button";
import TrustStats from "@/components/TrustStats";
import LocalizedLink from "@/components/LocalizedLink";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { IconGprRadar, IconSoilGrouting, IconWhatsapp } from "@/components/icons/etlaq";

type HeroVariant = "gradient" | "blobs" | "grid" | "light";

export default function HeroBlueprintV2({
  heroVariant,
  heroWhatsAppUrl,
  onExploreServicesClick,
  onWhatsappClick,
  showVariantBadge = false,
}: {
  heroVariant: HeroVariant;
  heroWhatsAppUrl: string;
  onExploreServicesClick?: () => void;
  onWhatsappClick?: () => void;
  showVariantBadge?: boolean;
}) {
  const { language, t } = useLanguage();
  const isAr = language === "ar";

  const chips = [
    {
      icon: IconSoilGrouting,
      label: isAr ? "حقن التربة" : "Soil grouting",
    },
    {
      icon: IconGprRadar,
      label: isAr ? "كشف التكهفات" : "Void / cavity detection",
    },
    {
      icon: ShieldCheck,
      label: isAr ? "جيوفيزياء" : "Geophysical surveys",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-semibold text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span>{isAr ? "حلول هندسية دقيقة تحت الأساسات" : "Precision subsurface engineering"}</span>
            </div>

            {showVariantBadge ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
                <span className="opacity-80">{isAr ? "الخلفية:" : "Hero:"}</span>
                <span className="uppercase tracking-wide">{heroVariant}</span>
              </div>
            ) : null}
          </div>

          <h1
            className={cn(
              "text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]",
              "text-white drop-shadow-[0_14px_44px_rgba(0,0,0,0.95)]"
            )}
          >
            {isAr ? (
              <>
                نحن <span className="text-secondary">نقوّي</span>{" "}
                <span className="text-white">أساساتك</span>
              </>
            ) : (
              <>
                We <span className="text-secondary">Strengthen</span>{" "}
                <span className="text-white">Your Foundations</span>
              </>
            )}
          </h1>

          <p className="max-w-2xl text-base md:text-xl font-semibold leading-relaxed text-white/95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.90)]">
            {isAr
              ? "حقن التربة، كشف التكهفات، والدراسات الجيوفيزيائية — تنفيذ ميداني موثّق ومخرجات واضحة تساعدك على اتخاذ القرار بثقة في جميع مناطق المملكة."
              : "Soil grouting, cavity detection, and geophysical surveys — field-proven execution with clear deliverables to help you decide with confidence across KSA."}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c) => {
              const Icon = c.icon as any;
              return (
                <div
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur hover:bg-white/15 transition"
                >
                  <Icon className="h-4 w-4" />
                  <span>{c.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
            <LocalizedLink href="/request-service" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/85 text-secondary-foreground font-extrabold shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
              >
                {t("nav.request")}
                <ArrowLeft className={isAr ? "mr-2 h-4 w-4 rotate-180" : "ml-2 h-4 w-4"} />
              </Button>
            </LocalizedLink>

            <a href="#services" className="w-full sm:w-auto" onClick={onExploreServicesClick}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white font-bold backdrop-blur"
              >
                {isAr ? "استعرض الخدمات" : "Explore services"}
                <MapPin className={isAr ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
              </Button>
            </a>

            <a href={heroWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold shadow-[0_18px_50px_rgba(0,0,0,0.45)] gap-2"
                onClick={onWhatsappClick}
              >
                <IconWhatsapp className="h-4 w-4" />
                {isAr ? "تواصل واتساب" : "WhatsApp"}
              </Button>
            </a>
          </div>

          <div className="pt-2">
            <div className="rounded-2xl border border-white/18 bg-black/45 p-5 md:p-6 backdrop-blur shadow-[0_22px_60px_rgba(0,0,0,0.55)]">
              <TrustStats compact variant="inverse" />
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-5">
          <div className="etlaq-hero-visual rounded-3xl border border-white/15 bg-white/5 p-3 md:p-4 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/og-image.webp"
                alt={isAr ? "مشاريع وتقوية أساسات" : "Projects and foundation strengthening"}
                className="w-full h-[260px] md:h-[340px] object-cover scale-[1.02]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-0 etlaq-blueprint-overlay" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-black/45 backdrop-blur p-4">
                <div className="text-white font-extrabold text-base md:text-lg">
                  {isAr ? "تشخيص واضح → تنفيذ مرحلي → تقرير نهائي" : "Clear diagnosis → staged execution → final report"}
                </div>
                <div className="mt-1 text-white/85 text-sm leading-relaxed">
                  {isAr ? "منهجية تقلّل المخاطر وتسهّل القرار." : "A method that reduces risk and speeds decisions."}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block mt-4 text-white/70 text-sm">
            {isAr ? "نخدم جميع مناطق المملكة بخطط تنفيذ قابلة للتوسع." : "Serving all regions of KSA with scalable field teams."}
          </div>
        </div>
      </div>
    </div>
  );
}
