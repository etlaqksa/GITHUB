import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Data / Chart — إحصائيات ونجاح
 */
export function IconChart({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M8 8V40H40" stroke="url(#realBlue)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      </path>
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="16" stroke="url(#realBlue)" strokeWidth="2" width="6" x="14" y="24">
      </rect>
      <rect fill="url(#realGold)" filter="url(#innerShadow)" height="24" stroke="url(#realBlue)" strokeWidth="2" width="6" x="24" y="16">
      </rect>
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="32" stroke="url(#realBlue)" strokeWidth="2" width="6" x="34" y="8">
      </rect>
      <path d="M10 32L17 20L27 24L37 12" stroke="url(#realBlue)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      </path>
    </svg>
  );
}
