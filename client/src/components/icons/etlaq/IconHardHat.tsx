import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Hard Hat — خوذة السلامة
 */
export function IconHardHat({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <path d="M8 28C8 16 14 10 24 10C34 10 40 16 40 28" fill="url(#realGold)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M4 28H44" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="3.5">
      </path>
      <path d="M24 10V28" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
    </svg>
  );
}
