import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Team / Users — فريق العمل والعملاء
 */
export function IconTeam({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <circle cx="24" cy="16" fill="url(#realGold)" filter="url(#innerShadow)" r="6">
      </circle>
      <path d="M14 36C14 30 18 26 24 26C30 26 34 30 34 36" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2.5">
      </path>
      <circle cx="12" cy="20" r="4" stroke="url(#realBlue)" strokeWidth="2.5">
      </circle>
      <circle cx="36" cy="20" r="4" stroke="url(#realBlue)" strokeWidth="2.5">
      </circle>
      <path d="M6 36C6 32 9 29 12 29M42 36C42 32 39 29 36 29" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2.5">
      </path>
    </svg>
  );
}
