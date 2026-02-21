import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Blueprint — مخططات هندسية
 */
export function IconBlueprint({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="28" rx="2" stroke="url(#realBlue)" strokeWidth="2.5" width="32" x="8" y="10">
      </rect>
      <path d="M14 28L24 18L34 28" stroke="url(#realGold)" strokeLinejoin="round" strokeWidth="3">
      </path>
      <rect fill="url(#realGold)" height="4" width="36" x="6" y="40">
      </rect>
    </svg>
  );
}
