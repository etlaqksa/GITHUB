import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Clock / Time — ساعات العمل
 */
export function IconClock({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <circle cx="24" cy="24" fill="url(#realSilver)" filter="url(#innerShadow)" r="20" stroke="url(#realBlue)" strokeWidth="2.5">
      </circle>
      <path d="M24 12V24L32 28" stroke="url(#realGold)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      </path>
    </svg>
  );
}
