import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Soil Grouting — حقن التربة
 */
export function IconSoilGrouting({ title, className, ...props }: EtlaqIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      fill="none"
      focusable="false"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
      className={['etlaq-icon', className].filter(Boolean).join(' ')}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="20" rx="2" width="40" x="4" y="24">
      </rect>
      <path d="M4 32H44M4 40H44" stroke="url(#realBlue)" strokeDasharray="4 4" strokeWidth="2.5">
      </path>
      <path d="M24 6V30" filter="url(#innerShadow)" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="4">
      </path>
      <path d="M18 10H30" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="3">
      </path>
      <circle cx="24" cy="34" fill="url(#realGold)" filter="url(#innerShadow)" r="6">
      </circle>
    </svg>
  );
}
