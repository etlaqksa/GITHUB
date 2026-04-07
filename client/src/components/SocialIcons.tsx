import React from 'react';

type SocialKey = 'tiktok' | 'instagram' | 'x' | 'telegram' | 'whatsapp';

/**
 * Modern SVG social icons with brand colors.
 * Replaced the old WebP images with inline SVGs for crisp rendering,
 * brand-accurate colors, and full contrast against any background.
 */

const BRAND_COLORS: Record<SocialKey, string> = {
  tiktok: '#000000',
  instagram: '#E4405F',
  x: '#000000',
  telegram: '#26A5E4',
  whatsapp: '#25D366',
};

function TikTokIcon({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {title && <title>{title}</title>}
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.44V13.2a8.16 8.16 0 005.58 2.17V11.9a4.85 4.85 0 01-2.84-.95V6.69h2.84z"/>
    </svg>
  );
}

function InstagramIcon({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FED373" />
          <stop offset="25%" stopColor="#F15245" />
          <stop offset="50%" stopColor="#D92E7F" />
          <stop offset="75%" stopColor="#9B36B7" />
          <stop offset="100%" stopColor="#515ECF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.25" fill="url(#ig-grad)"/>
    </svg>
  );
}

function XIcon({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {title && <title>{title}</title>}
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.9l-5.4-6.7L4.9 22H2l7.3-8.4L1 2h7.1l4.9 6.1L18.9 2zm-1.2 18h1.7L7.2 3.9H5.4L17.7 20z"/>
    </svg>
  );
}

function TelegramIcon({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {title && <title>{title}</title>}
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6.54l-1.37 6.47c-.1.46-.37.57-.75.36l-2.07-1.53-1 .96c-.11.11-.2.2-.42.2l.15-2.1 3.83-3.46c.17-.15-.04-.23-.26-.08l-4.73 2.98-2.04-.64c-.44-.14-.45-.44.1-.66l7.94-3.06c.37-.14.69.09.57.56z"/>
    </svg>
  );
}

function WhatsAppIcon({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {title && <title>{title}</title>}
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.96.57 3.86 1.65 5.49L2 22l4.75-1.74a9.85 9.85 0 005.29 1.53h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.77 14.2c-.24.67-1.41 1.28-1.95 1.36-.49.07-1.12.1-1.81-.12-.42-.13-.96-.31-1.65-.61-2.91-1.26-4.8-4.38-4.95-4.58-.15-.2-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.66.5.24.57.81 1.99.88 2.13.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.45.3.15.48.12.66-.07.18-.19.76-.88.96-1.18.2-.3.4-.25.67-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.69-.17 1.36z"/>
    </svg>
  );
}

const ICON_COMPONENTS: Record<SocialKey, React.FC<{ className?: string; title?: string }>> = {
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  x: XIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
};

export function SocialIcon({
  name,
  className,
  title,
}: {
  name: SocialKey;
  className?: string;
  title?: string;
}) {
  const IconComponent = ICON_COMPONENTS[name];
  const color = BRAND_COLORS[name];

  return (
    <span style={{ color }} className="inline-flex items-center justify-center">
      <IconComponent className={className} title={title} />
    </span>
  );
}
