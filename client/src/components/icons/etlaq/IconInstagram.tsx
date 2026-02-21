import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Instagram — إنستغرام
 */
export function IconInstagram({ title, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="32" rx="8" stroke="url(#realBlue)" strokeWidth="2.5" width="32" x="8" y="8">
      </rect>
      <circle cx="24" cy="24" r="8" stroke="url(#realGold)" strokeWidth="2.5">
      </circle>
      <circle cx="34" cy="14" fill="url(#realBlue)" r="2">
      </circle>
    </svg>
  );
}
