import React from 'react';
import { IconX } from '@/components/icons/etlaq';

type SocialKey = 'tiktok' | 'instagram' | 'x' | 'telegram' | 'whatsapp';

const WEBP_SRC: Record<Exclude<SocialKey, 'x'>, string> = {
  tiktok: '/social-icons/tiktok.webp',
  instagram: '/social-icons/instagram.webp',
  telegram: '/social-icons/telegram.webp',
  whatsapp: '/social-icons/whatsapp.webp',
};

/**
 * Social icons used in TopBar/Footer.
 * Render as lightweight WebP images (except X which remains as SVG because no replacement was provided).
 */
export function SocialIcon({
  name,
  className,
  title,
}: {
  name: SocialKey;
  className?: string;
  title?: string;
}) {
  if (name === 'x') {
    return <IconX title={title} className={className} />;
  }

  const src = WEBP_SRC[name];
  return (
    <img
      src={src}
      width="24"
      height="24"
      className={className}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
