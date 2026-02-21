import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * CFRP Repair — التدعيم و CFRP
 */
export function IconCfrpRepair({ title, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="36" stroke="url(#realBlue)" strokeWidth="2.5" width="16" x="16" y="6">
      </rect>
      <path d="M24 6L20 18L26 26L20 42" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2">
      </path>
      <rect fill="url(#realGold)" height="6" rx="1" width="24" x="12" y="14">
      </rect>
      <rect fill="url(#realGold)" height="6" rx="1" width="24" x="12" y="28">
      </rect>
    </svg>
  );
}
