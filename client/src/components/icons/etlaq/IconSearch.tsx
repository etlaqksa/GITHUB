import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Search — بحث المقالات
 */
export function IconSearch({ title, className, ...props }: EtlaqIconProps) {
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
      <circle cx="20" cy="20" fill="url(#realSilver)" filter="url(#innerShadow)" r="12" stroke="url(#realBlue)" strokeWidth="2.5">
      </circle>
      <path d="M29 29L42 42" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="4">
      </path>
    </svg>
  );
}
