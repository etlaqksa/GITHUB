import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * TikTok — تيك توك
 */
export function IconTiktok({ title, className }: EtlaqIconProps) {
  const alt = title ?? '';
  const ariaHidden = title ? undefined : true;

  return (
    <img
      src="/social-icons/tiktok.webp"
      width="24"
      height="24"
      className={className}
      alt={alt}
      aria-hidden={ariaHidden}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
