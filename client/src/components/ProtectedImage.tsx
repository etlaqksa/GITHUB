import React, { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  aspect?: 'square' | 'video' | 'wide' | 'free';
  rounded?: string;
  fit?: 'cover' | 'contain';
};

const aspectClass: Record<NonNullable<Props['aspect']>, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[16/9]',
  free: '',
};

/**
 * NOTE:
 * لا يوجد حل 100% لمنع حفظ/نسخ الصور من الويب (يمكن دائماً أخذ Screenshot أو قراءة الـ Network).
 * هذا المكوّن يضيف حماية "عملية" (تعطيل right-click / drag / selection) + تكبير لطيف عند hover.
 *
 * Performance:
 * - We lazy-load the background image via IntersectionObserver to avoid downloading dozens of heavy images at once.
 */
export default function ProtectedImage({
  src,
  alt,
  className = '',
  aspect = 'wide',
  rounded = 'rounded-xl',
  fit = 'cover',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  const absSrc = (() => {
    try {
      // Make background-image URLs absolute so Clarity playback can load them correctly.
      return new URL(src, window.location.origin).href;
    } catch {
      return src;
    }
  })();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver isn't supported, load immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: '250px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        'relative overflow-hidden',
        rounded,
        (aspect === 'free' ? '' : aspectClass[aspect]),
        'select-none',
        'bg-muted/40',
        className,
      ].join(' ')}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      aria-label={alt}
      role="img"
    >
      {/* background image (discourages "open image in new tab") */}
      <div
        className="absolute inset-0 bg-center transition-transform duration-300 ease-out group-hover:scale-[1.06] hover:scale-[1.06]"
        style={{
          backgroundImage: inView ? `url('${src}')` : 'none',
          backgroundSize: fit,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

      {/* lightweight placeholder sheen while loading */}
      {!inView && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/50 to-muted/20" />
      )}

      {/* transparent overlay to intercept long-press & clicks */}
      <div className="absolute inset-0" />

      {/* subtle watermark (optional deterrent) */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-white/70 drop-shadow pointer-events-none">
        <span>{alt}</span>
        <span>EtlaqKSA</span>
      </div>
    </div>
  );
}
