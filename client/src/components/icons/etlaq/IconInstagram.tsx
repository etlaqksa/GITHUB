import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Instagram — انستغرام
 */
export function IconInstagram({ title, className }: EtlaqIconProps) {
  const alt = title ?? '';
  const ariaHidden = title ? undefined : true;

  return (
    <img
      src="/social-icons/instagram.webp"
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
