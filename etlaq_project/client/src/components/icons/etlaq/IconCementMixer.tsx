import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Cement Mixer — خلاط إسمنت
 */
export function IconCementMixer({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M16 40L24 32L32 40" stroke="url(#realBlue)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      </path>
      <path d="M14 20C14 12 20 8 28 10C36 12 38 20 36 28C34 36 26 36 18 32C12 28 14 20 14 20Z" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realGold)" strokeLinejoin="round" strokeWidth="3">
      </path>
      <path d="M20 14L30 24" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2.5">
      </path>
    </svg>
  );
}
