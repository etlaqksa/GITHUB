import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Trophy / Award — جوائز وتميز
 */
export function IconTrophy({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M14 10H34V20C34 26 28 30 24 30C20 30 14 26 14 20V10Z" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M24 30V40M18 40H30" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="3">
      </path>
      <path d="M14 14H8V20C8 22 10 24 14 24" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
      <path d="M34 14H40V20C40 22 38 24 34 24" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
    </svg>
  );
}
