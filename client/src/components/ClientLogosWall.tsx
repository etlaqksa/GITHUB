import { clientLogos } from '@/data/clientsLogos';
import { projects } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { useEffect, useMemo, useRef, useState } from 'react';

function logoSrc(fileName: string) {
  // Assets are served from /public
  return `/media/clients/${encodeURIComponent(fileName)}`;
}

export default function ClientLogosWall({
  titleVariant = 'home',
}: {
  titleVariant?: 'home' | 'page';
}) {
  const { language } = useLanguage();

  const railRef = useRef<HTMLDivElement | null>(null);
  const segmentRef = useRef<HTMLDivElement | null>(null);
  const GAP_PX = 12;
  const [segmentRepeat, setSegmentRepeat] = useState(1);
  const [shiftPx, setShiftPx] = useState<number | null>(null);

  // Make a single segment wide enough for all viewports.
  // If the segment is shorter than the rail width, users will see blank gaps.
  const filledLogos = useMemo(() => {
    const out: typeof clientLogos = [];
    for (let i = 0; i < segmentRepeat; i++) out.push(...clientLogos);
    return out;
  }, [segmentRepeat]);

  // Duration based on pixels so speed stays consistent across devices.
  const railDurationSec = useMemo(() => {
    // target speed ~70px/sec
    const px = shiftPx ?? 2400;
    return Math.max(18, Math.min(70, Math.round(px / 70)));
  }, [shiftPx]);

  useEffect(() => {
    const rail = railRef.current;
    const seg = segmentRef.current;
    if (!rail || !seg) return;

    const measure = () => {
      const railW = rail.getBoundingClientRect().width;
      const segW = seg.scrollWidth;
      if (!railW || !segW) return;

      // Estimate base width of a single logo-list pass.
      const baseW = segW / Math.max(1, segmentRepeat);
      const neededRepeat = Math.max(1, Math.ceil((railW * 1.35) / baseW));

      if (neededRepeat !== segmentRepeat) {
        setSegmentRepeat(neededRepeat);
        return;
      }

      // Shift by segment width + the gap between the two segments.
      setShiftPx(segW + GAP_PX);
    };

    // Re-measure on resize and after images load.
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    ro.observe(seg);

    const imgs = Array.from(seg.querySelectorAll('img'));
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', measure, { once: true });
        img.addEventListener('error', measure, { once: true });
      }
    });

    // Initial measure
    measure();

    return () => ro.disconnect();
  }, [segmentRepeat]);

  const title =
    language === 'ar'
      ? 'يثق بنا عملاء رائدون'
      : 'Trusted by leading clients';

  const subtitle =
    language === 'ar'
      ? 'نماذج من الجهات التي نفذنا لها أعمالاً ضمن مشاريع مختلفة.'
      : 'A selection of organizations we have supported across different projects.';

  return (
    <section className={titleVariant === 'home' ? 'py-10 md:py-14' : 'py-8 md:py-12'}>
      <div className="w-full px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="etlaq-card rounded-2xl border bg-card/40 p-4 md:p-6">
          {/*
            Infinite logo rail (marquee): repeats continuously.
            - Colored logos (no grayscale)
            - Hover/focus pops (scale + saturation)
            - Clickable to client projects
          */}
          <div
            ref={railRef}
            className="etlaq-logo-rail"
            style={{
              ['--etlaq-rail-duration' as any]: `${railDurationSec}s`,
              ['--etlaq-rail-shift' as any]: shiftPx ? `${shiftPx}px` : undefined,
              ['--etlaq-rail-gap' as any]: `${GAP_PX}px`,
            }}
            aria-label={language === 'ar' ? 'شعارات العملاء' : 'Client logos'}
          >
            <div className="etlaq-logo-rail__track" role="list">
              {/* Segment A (interactive) */}
              <div ref={segmentRef} className="etlaq-logo-rail__segment" aria-label="segment-a">
                {filledLogos.map((logo, idx) => {
                  const label = language === 'ar' ? logo.name.ar : logo.name.en || logo.name.ar;
                  const hasProjects = projects.some((p) => {
                    const ar = p.client?.ar ?? '';
                    const en = p.client?.en ?? '';
                    const arParts = ar.split('/').map((s) => s.trim());
                    const enParts = en.split('/').map((s) => s.trim());
                    return arParts.includes(logo.name.ar) || enParts.includes(logo.name.en);
                  });

                  const href = hasProjects ? `/projects?client=${encodeURIComponent(logo.name.ar)}` : '/projects';
                  const eager = idx < 10; // Ensure quick first paint

                  return (
                    <LocalizedLink
                      key={`a-${logo.fileName}-${idx}`}
                      href={href}
                      role="listitem"
                      className="etlaq-logo-item group relative flex h-20 w-[170px] sm:w-[190px] flex-none items-center justify-center rounded-xl border bg-background/60 p-3 transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                      aria-label={label}
                      title={label}
                    >
                      <div className="flex h-12 w-full items-center justify-center">
                        <img
                          src={logoSrc(logo.fileName)}
                          alt={label}
                          width={190}
                          height={48}
                          loading={eager ? 'eager' : 'lazy'}
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="sr-only">{label}</span>
                    </LocalizedLink>
                  );
                })}
              </div>

              {/* Segment B (visual duplicate) */}
              <div className="etlaq-logo-rail__segment" aria-hidden="true">
                {filledLogos.map((logo, idx) => {
                  const label = language === 'ar' ? logo.name.ar : logo.name.en || logo.name.ar;
                  const hasProjects = projects.some((p) => {
                    const ar = p.client?.ar ?? '';
                    const en = p.client?.en ?? '';
                    const arParts = ar.split('/').map((s) => s.trim());
                    const enParts = en.split('/').map((s) => s.trim());
                    return arParts.includes(logo.name.ar) || enParts.includes(logo.name.en);
                  });
                  const href = hasProjects ? `/projects?client=${encodeURIComponent(logo.name.ar)}` : '/projects';

                  return (
                    <LocalizedLink
                      key={`b-${logo.fileName}-${idx}`}
                      href={href}
                      tabIndex={-1}
                      className="etlaq-logo-item group relative flex h-20 w-[170px] sm:w-[190px] flex-none items-center justify-center rounded-xl border bg-background/60 p-3 transition"
                      aria-label={label}
                      title={label}
                    >
                      <div className="flex h-12 w-full items-center justify-center">
                        <img
                          src={logoSrc(logo.fileName)}
                          alt=""
                          width={190}
                          height={48}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="sr-only">{label}</span>
                    </LocalizedLink>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground md:text-sm">
              {language === 'ar'
                ? 'اضغط على أي شعار لعرض المشاريع المرتبطة بهذا العميل.'
                : 'Click any logo to view projects for that client.'}
            </p>
            <LocalizedLink
              href="/projects"
              className="text-sm font-medium underline underline-offset-4 hover:opacity-80"
            >
              {language === 'ar' ? 'عرض جميع المشاريع' : 'View all projects'}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
