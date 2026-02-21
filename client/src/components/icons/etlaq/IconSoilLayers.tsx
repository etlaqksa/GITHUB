import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Soil Layers — طبقات التربة
 */
export function IconSoilLayers({ title, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="32" rx="4" stroke="url(#realBlue)" strokeWidth="2.5" width="32" x="8" y="8">
      </rect>
      <path d="M8 18C14 20 20 16 26 18C32 20 36 16 40 18" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M8 30C16 28 24 32 32 30C36 29 38 28 40 30" stroke="url(#realGold)" strokeWidth="3">
      </path>
    </svg>
  );
}
