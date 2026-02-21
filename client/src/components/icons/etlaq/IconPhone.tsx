import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Phone / Call — رقم الهاتف
 */
export function IconPhone({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M10 16C10 16 12 10 18 10C24 10 24 16 24 16L20 20C20 20 22 26 28 28L32 24C32 24 38 24 38 30C38 36 32 38 32 38C16 38 10 22 10 16Z" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2.5">
      </path>
      <path d="M28 10C34 10 38 14 38 20" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
    </svg>
  );
}
