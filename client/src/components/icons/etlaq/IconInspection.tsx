import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Inspection — تفتيش ومعاينة
 */
export function IconInspection({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <circle cx="20" cy="20" fill="url(#realSilver)" filter="url(#innerShadow)" r="12" stroke="url(#realBlue)" strokeWidth="2.5">
      </circle>
      <path d="M28 28L40 40" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="5">
      </path>
      <path d="M16 20H24M20 16V24" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2.5">
      </path>
    </svg>
  );
}
