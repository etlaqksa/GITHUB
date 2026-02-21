import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Email — البريد الإلكتروني
 */
export function IconEmail({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="24" rx="3" stroke="url(#realBlue)" strokeWidth="2.5" width="36" x="6" y="12">
      </rect>
      <path d="M6 16L24 26L42 16" stroke="url(#realGold)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      </path>
    </svg>
  );
}
