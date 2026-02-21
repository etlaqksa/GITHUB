import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Certificate — شهادات واعتمادات
 */
export function IconCertificate({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="40" rx="2" stroke="url(#realBlue)" strokeWidth="2.5" width="28" x="10" y="4">
      </rect>
      <circle cx="24" cy="24" fill="url(#realGold)" r="6">
      </circle>
      <path d="M22 28L20 36L24 34L28 36L26 28" fill="url(#realGold)">
      </path>
      <path d="M16 12H32M16 16H32" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2">
      </path>
    </svg>
  );
}
