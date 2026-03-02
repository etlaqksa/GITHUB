import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Wall Crack Repair — معالجة التشققات
 */
export function IconWallCrackRepair({ title, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="32" rx="2" stroke="url(#realBlue)" strokeWidth="2.5" width="36" x="6" y="8">
      </rect>
      <path d="M6 16H20M28 16H42M14 24H6M42 24H24M6 32H16M36 32H42" stroke="url(#realBlue)" strokeWidth="2">
      </path>
      <path d="M24 8L20 16L28 26L22 34L26 40" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="3">
      </path>
      <rect fill="url(#realGold)" height="6" rx="1" width="16" x="16" y="20">
      </rect>
    </svg>
  );
}
