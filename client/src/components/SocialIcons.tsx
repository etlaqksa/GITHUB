import React from 'react';

export type SocialKey = 'tiktok' | 'instagram' | 'x' | 'telegram' | 'whatsapp' | 'facebook' | 'linkedin' | 'youtube';

// ── Brand-accurate SVG social icons ──────────────────────────────────────────
// Each icon is self-contained with its official brand color, works on any bg.

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="5" fill="#010101"/>
      <path d="M19.59 7.007a4.875 4.875 0 0 1-2.93-2.745A4.875 4.875 0 0 1 16.29 3h-3.038v12.295c0 1.07-.869 1.937-1.94 1.937a1.94 1.94 0 0 1-1.94-1.937 1.94 1.94 0 0 1 1.94-1.937c.177 0 .348.024.51.069V10.33a5.04 5.04 0 0 0-.51-.026 5.006 5.006 0 0 0-5.007 5.003A5.006 5.006 0 0 0 11.312 20.31a5.006 5.006 0 0 0 5.007-5.003V9.893a7.9 7.9 0 0 0 4.616 1.481V8.343a4.9 4.9 0 0 1-1.346-.336z" fill="#fff"/>
      <path d="M19.59 7.007a4.875 4.875 0 0 1-2.93-2.745 4.875 4.875 0 0 1-.37-1.262h-3.038v12.295c0 1.07-.869 1.937-1.94 1.937a1.94 1.94 0 0 1-1.94-1.937 1.94 1.94 0 0 1 1.94-1.937c.177 0 .348.024.51.069V10.33a5.04 5.04 0 0 0-.51-.026 5.006 5.006 0 0 0-5.007 5.003 5.006 5.006 0 0 0 5.007 5.003 5.006 5.006 0 0 0 5.007-5.003V9.893a7.9 7.9 0 0 0 4.616 1.481V8.343a4.9 4.9 0 0 1-3.345-1.336z" fill="#25F4EE" opacity=".5"/>
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="5%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/>
          <stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2z" fill="#fff"/>
      <circle cx="17.2" cy="6.8" r="1.1" fill="#fff"/>
    </svg>
  );
}

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="5" fill="#000"/>
      <path d="M13.7 10.9 18.6 5h-1.2L13.1 10 9.8 5H5.5l5.1 7.5L5.5 19h1.2l4.5-5.2L14.5 19h4.3l-5.1-8.1zm-1.6 1.8-.5-.7L7 5.9h1.8l3.3 4.7.5.7 4.4 6.3h-1.8l-3.1-4.9z" fill="#fff"/>
    </svg>
  );
}

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="12" fill="#229ED9"/>
      <path d="M5.2 11.7 19 6.1c.6-.2 1.2.1 1 .9l-2.4 11.1c-.2.8-.7 1-1.3.6L13 16l-1.6 1.5c-.2.2-.4.2-.6.2L11 14.9l6.4-5.8c.3-.3 0-.4-.4-.1L8.4 14.3 5.2 13.3c-.8-.3-.8-.7.0-1z" fill="#fff"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="12" fill="#25D366"/>
      <path d="M12 4.5A7.5 7.5 0 0 0 5.67 16.06L4.5 19.5l3.52-1.14A7.5 7.5 0 1 0 12 4.5zm0 13.7a6.2 6.2 0 0 1-3.18-.88l-.22-.14-2.09.67.69-2.03-.15-.23A6.2 6.2 0 1 1 12 18.2zm3.4-4.64c-.19-.1-1.1-.54-1.27-.6-.17-.06-.3-.1-.42.09-.12.19-.48.6-.59.72-.11.13-.22.14-.4.05-.19-.1-.79-.29-1.5-.93a5.6 5.6 0 0 1-1.04-1.3c-.11-.19 0-.29.08-.38.09-.09.19-.22.28-.33.1-.1.13-.19.19-.32.07-.13.03-.24-.01-.33-.05-.1-.42-1.01-.58-1.38-.15-.36-.3-.31-.42-.32h-.36c-.12 0-.32.04-.49.24-.17.2-.65.63-.65 1.54s.67 1.79.76 1.91c.1.12 1.32 2 3.2 2.81 1.89.8 1.89.53 2.23.5.34-.03 1.1-.45 1.26-.88.15-.44.15-.8.1-.88-.05-.08-.17-.12-.36-.22z" fill="#fff"/>
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="12" fill="#1877F2"/>
      <path d="M15.5 8H13V6.5c0-.6.4-.7.7-.7H15V3.1l-2.7-.1C9.8 3 9 4.8 9 6.3V8H7v3h2v9h4v-9h2.6l.4-3z" fill="#fff"/>
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="5" fill="#0A66C2"/>
      <path d="M7.2 10h-2v8h2v-8zM6.2 9c.7 0 1.2-.5 1.2-1.2C7.4 7 6.9 6.5 6.2 6.5S5 7 5 7.8C5 8.5 5.5 9 6.2 9zM19 13.7c0-2.2-1.2-3.7-3.1-3.7-1 0-1.8.5-2.2 1.3V10h-2v8h2v-4.4c0-1 .6-1.8 1.6-1.8 1 0 1.5.7 1.5 1.8V18H19v-4.3z" fill="#fff"/>
    </svg>
  );
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="5" fill="#FF0000"/>
      <path d="M19.8 8.3a2.1 2.1 0 0 0-1.5-1.5C17 6.5 12 6.5 12 6.5s-5 0-6.3.3A2.1 2.1 0 0 0 4.2 8.3 22 22 0 0 0 4 12a22 22 0 0 0 .2 3.7A2.1 2.1 0 0 0 5.7 17.2c1.3.3 6.3.3 6.3.3s5 0 6.3-.3a2.1 2.1 0 0 0 1.5-1.5A22 22 0 0 0 20 12a22 22 0 0 0-.2-3.7z" fill="#FF0000"/>
      <path d="M10.5 14.6V9.4L14.7 12l-4.2 2.6z" fill="#fff"/>
    </svg>
  );
}

const ICON_MAP: Record<SocialKey, React.FC<{ size?: number }>> = {
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  x: XIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  youtube: YoutubeIcon,
};

export function SocialIcon({
  name,
  className,
  title,
  size = 24,
}: {
  name: SocialKey;
  className?: string;
  title?: string;
  size?: number;
}) {
  const Icon = ICON_MAP[name] ?? XIcon;
  return (
    <span
      className={className}
      title={title}
      aria-label={title || name}
      role="img"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Icon size={size} />
    </span>
  );
}
