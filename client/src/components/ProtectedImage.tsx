import React from 'react';

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
 */
export default function ProtectedImage({
  src,
  alt,
  className = '',
  aspect = 'wide',
  rounded = 'rounded-xl',
  fit = 'cover',
}: Props) {
  return (
    <div
      className={[
        'relative overflow-hidden',
        rounded,
        (aspect === 'free' ? '' : aspectClass[aspect]),
        'select-none',
        'bg-muted/40',
        className,
      ].join(' ')}
      onContextMenu={e => e.preventDefault()}
      onDragStart={e => e.preventDefault()}
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
        style={{ backgroundImage: `url('${src}')`, backgroundSize: fit, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
      />

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
