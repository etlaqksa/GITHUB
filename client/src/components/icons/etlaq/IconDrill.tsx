import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Drill / Rig — معدات الحفر
 */
export function IconDrill({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M4 36H44" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="3">
      </path>
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="10" width="12" x="18" y="36">
      </rect>
      <path d="M20 28L24 6L28 28" stroke="url(#realGold)" strokeLinejoin="round" strokeWidth="3">
      </path>
      <rect fill="url(#realBlue)" filter="url(#innerShadow)" height="8" rx="2" width="24" x="12" y="28">
      </rect>
      <path d="M24 28V44" stroke="url(#realBlue)" strokeDasharray="4 4" strokeWidth="3">
      </path>
    </svg>
  );
}
