import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Shield Check — درع الضمان
 */
export function IconShieldCheck({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <path d="M24 4L8 10V22C8 32 14.5 41 24 44C33.5 41 40 32 40 22V10L24 4Z" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2.5">
      </path>
      <path d="M16 24L22 30L32 18" stroke="url(#realGold)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
      </path>
    </svg>
  );
}
