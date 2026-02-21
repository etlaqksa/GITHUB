import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * TikTok — تيك توك
 */
export function IconTiktok({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
  const monoClass = tone === 'mono' ? 'etlaq-icon--mono' : '';
  return (
    <svg
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      fill="none"
      focusable="false"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
      className={['etlaq-icon', monoClass, className].filter(Boolean).join(' ')}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M24 4V28C24 33.5 19.5 38 14 38C8.5 38 4 33.5 4 28C4 22.5 8.5 18 14 18V26C12.9 26 12 26.9 12 28C12 29.1 12.9 30 14 30C15.1 30 16 29.1 16 28V4H24C24 9.5 28.5 14 34 14V22C28.5 22 24 17.5 24 12" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <circle cx="34" cy="14" fill="url(#realGold)" r="2">
      </circle>
    </svg>
  );
}
