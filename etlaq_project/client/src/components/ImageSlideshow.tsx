import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  images?: string[];
  intervalMs?: number;
  showControls?: boolean;
  /** Controlled index (optional). If provided, the slideshow becomes controlled. */
  currentIndex?: number;
  /** Controlled setter (optional). Required when currentIndex is provided. */
  onIndexChange?: (index: number) => void;
  className?: string;
  /** Optional overlay layer (e.g., gradient) rendered above the image for readability */
  overlayClassName?: string;
};

export const GALLERY_IMAGES = [
  "/gallery/Etlaq (1).webp",
  "/gallery/Etlaq (10).webp",
  "/gallery/Etlaq (11).webp",
  "/gallery/Etlaq (12).webp",
  "/gallery/Etlaq (13).webp",
  "/gallery/Etlaq (14).webp",
  "/gallery/Etlaq (15).webp",
  "/gallery/Etlaq (16).webp",
  "/gallery/Etlaq (17).webp",
  "/gallery/Etlaq (18).webp",
  "/gallery/Etlaq (19).webp",
  "/gallery/Etlaq (2).webp",
  "/gallery/Etlaq (20).webp",
  "/gallery/Etlaq (21).webp",
  "/gallery/Etlaq (22).webp",
  "/gallery/Etlaq (23).webp",
  "/gallery/Etlaq (24).webp",
  "/gallery/Etlaq (25).webp",
  "/gallery/Etlaq (26).webp",
  "/gallery/Etlaq (27).webp",
  "/gallery/Etlaq (28).webp",
  "/gallery/Etlaq (29).webp",
  "/gallery/Etlaq (3).webp",
  "/gallery/Etlaq (30).webp",
  "/gallery/Etlaq (31).webp",
  "/gallery/Etlaq (32).webp",
  "/gallery/Etlaq (33).webp",
  "/gallery/Etlaq (34).webp",
  "/gallery/Etlaq (35).webp",
  "/gallery/Etlaq (36).webp",
  "/gallery/Etlaq (37).webp",
  "/gallery/Etlaq (38).webp",
  "/gallery/Etlaq (39).webp",
  "/gallery/Etlaq (4).webp",
  "/gallery/Etlaq (40).webp",
  "/gallery/Etlaq (41).webp",
  "/gallery/Etlaq (42).webp",
  "/gallery/Etlaq (43).webp",
  "/gallery/Etlaq (44).webp",
  "/gallery/Etlaq (45).webp",
  "/gallery/Etlaq (46).webp",
  "/gallery/Etlaq (47).webp",
  "/gallery/Etlaq (48).webp",
  "/gallery/Etlaq (49).webp",
  "/gallery/Etlaq (5).webp",
  "/gallery/Etlaq (50).webp",
  "/gallery/Etlaq (51).webp",
  "/gallery/Etlaq (52).webp",
  "/gallery/Etlaq (53).webp",
  "/gallery/Etlaq (54).webp",
  "/gallery/Etlaq (55).webp",
  "/gallery/Etlaq (6).webp",
  "/gallery/Etlaq (7).webp",
  "/gallery/Etlaq (8).webp",
  "/gallery/Etlaq (9).webp"
];

export function ImageSlideshow({
  images,
  intervalMs = 1800,
  showControls = true,
  currentIndex,
  onIndexChange,
  className,
  overlayClassName,
}: Props) {
  const { language } = useLanguage();
  const slides = useMemo(() => (images && images.length ? images : GALLERY_IMAGES), [images]);
  const [internalCurrent, setInternalCurrent] = useState(0);
  const isControlled = typeof currentIndex === 'number' && typeof onIndexChange === 'function';
  const current = isControlled ? (currentIndex as number) : internalCurrent;

  const setCurrentSafe = (next: number | ((prev: number) => number)) => {
    const resolved = typeof next === 'function' ? (next as (p: number) => number)(current) : next;
    const normalized = ((resolved % slides.length) + slides.length) % slides.length;
    if (isControlled) (onIndexChange as (i: number) => void)(normalized);
    else setInternalCurrent(normalized);
  };
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const timerRef = useRef<number | null>(null);
  const startXRef = useRef<number | null>(null);

  // Preload images once (and mark errors as "loaded" so UI won't get stuck)
  useEffect(() => {
    let cancelled = false;
    slides.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setLoaded((p) => ({ ...p, [idx]: true }));
      };
      img.onerror = () => {
        if (cancelled) return;
        setLoaded((p) => ({ ...p, [idx]: true }));
      };
      img.src = encodeURI(src);
    });
    return () => {
      cancelled = true;
    };
  }, [slides]);

  const prev = () => setCurrentSafe((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrentSafe((i) => (i + 1) % slides.length);

  // Auto advance (only switch when next is loaded)
  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (slides.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      const nextIdx = (current + 1) % slides.length;
      if (loaded[nextIdx]) setCurrentSafe(nextIdx);
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides.length, intervalMs, current, loaded]);

  const onPointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (startXRef.current === null) return;
    const dx = e.clientX - startXRef.current;
    startXRef.current = null;
    // swipe threshold
    if (Math.abs(dx) < 40) return;
    if (dx > 0) prev();
    else next();
  };

  return (
    <div className={["relative w-full h-full overflow-hidden", className].filter(Boolean).join(' ')}>
      <div
        className="absolute inset-0 z-0"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <img
          src={encodeURI(slides[current])}
          alt={language === 'ar' ? 'عرض صور' : 'Slideshow'}
          className="w-full h-full object-cover select-none"
          draggable={false}
          loading="eager"
          onLoad={() => setLoaded((p) => ({ ...p, [current]: true }))}
          onError={() => setLoaded((p) => ({ ...p, [current]: true }))}
        />
      </div>

      {overlayClassName && (
        <div className={[overlayClassName, 'pointer-events-none'].filter(Boolean).join(' ')} />
      )}

      {showControls && slides.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 sm:left-4 top-[65%] sm:top-1/2 -translate-y-1/2 z-30 pointer-events-auto rounded-full h-9 w-9 sm:h-10 sm:w-10 bg-background/80 backdrop-blur"
            onClick={prev}
            aria-label="Previous"
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 sm:right-4 top-[65%] sm:top-1/2 -translate-y-1/2 z-30 pointer-events-auto rounded-full h-9 w-9 sm:h-10 sm:w-10 bg-background/80 backdrop-blur"
            onClick={next}
            aria-label="Next"
            type="button"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 pointer-events-auto">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={[
                  'h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all',
                  idx === current ? 'bg-white' : 'bg-white/50',
                ].join(' ')}
                onClick={() => setCurrentSafe(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageSlideshow;
