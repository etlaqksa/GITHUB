import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  images?: string[];
  intervalMs?: number;
};

const defaultImages = [
  '/gallery/Etlaq (1).jpg',
  '/gallery/Etlaq (3).jpg',
  '/gallery/Etlaq (4).jpg',
  '/gallery/Etlaq (5).jpg',
  '/gallery/Etlaq (9).jpg',
];

export function ImageSlideshow({ images, intervalMs = 1800 }: Props) {
  const { language } = useLanguage();
  const slides = useMemo(() => (images && images.length ? images : defaultImages), [images]);
  const [current, setCurrent] = useState(0);
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

  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent((i) => (i + 1) % slides.length);

  // Auto advance (only switch when next is loaded)
  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (slides.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      const nextIdx = (current + 1) % slides.length;
      if (loaded[nextIdx]) setCurrent(nextIdx);
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
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0"
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

      {slides.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 left-4 z-30 pointer-events-auto"
            onClick={prev}
            aria-label="Previous"
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 right-4 z-30 pointer-events-auto"
            onClick={next}
            aria-label="Next"
            type="button"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 pointer-events-auto">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={[
                  'h-2 w-2 rounded-full transition-all',
                  idx === current ? 'bg-white' : 'bg-white/50',
                ].join(' ')}
                onClick={() => setCurrent(idx)}
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
