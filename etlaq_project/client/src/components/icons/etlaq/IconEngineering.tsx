import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Engineering — الهندسة والإدارة
 */
export function IconEngineering({ title, className, ...props }: EtlaqIconProps) {
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
      <circle cx="24" cy="24" fill="url(#realSilver)" filter="url(#innerShadow)" r="14" stroke="url(#realBlue)" strokeWidth="2.5">
      </circle>
      <path d="M24 6V10M24 38V42M6 24H10M38 24H42" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
      <path d="M24 16L16 34H32L24 16Z" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2.5">
      </path>
    </svg>
  );
}
