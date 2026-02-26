import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Email (Gmail) — البريد الإلكتروني
 */
export function IconEmail({ title, className }: EtlaqIconProps) {
  const alt = title ?? '';
  const ariaHidden = title ? undefined : true;

  return (
    <img
      src="/social-icons/email.webp"
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
