import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Checklist — قائمة المتابعة
 */
export function IconChecklist({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="32" rx="3" stroke="url(#realBlue)" strokeWidth="2.5" width="24" x="12" y="8">
      </rect>
      <path d="M18 8V4H30V8" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M18 20L22 24L30 16M18 30H30" stroke="url(#realGold)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      </path>
    </svg>
  );
}
