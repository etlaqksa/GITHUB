import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Excavator — حفارات ومعدات
 */
export function IconExcavator({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="8" rx="4" stroke="url(#realBlue)" strokeWidth="2.5" width="20" x="8" y="32">
      </rect>
      <circle cx="12" cy="36" fill="url(#realGold)" r="2">
      </circle>
      <circle cx="24" cy="36" fill="url(#realGold)" r="2">
      </circle>
      <path d="M12 32V20C12 18 14 16 16 16H22V32" fill="url(#realSilver)" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2.5">
      </path>
      <path d="M22 24L34 16L38 28" stroke="url(#realGold)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      </path>
    </svg>
  );
}
