import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Briefcase — حقيبة أعمال
 */
export function IconBriefcase({ title, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="24" rx="3" stroke="url(#realBlue)" strokeWidth="2.5" width="32" x="8" y="16">
      </rect>
      <path d="M16 16V10C16 8 18 6 20 6H28C30 6 32 8 32 10V16" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <circle cx="24" cy="28" fill="url(#realGold)" r="3">
      </circle>
      <path d="M8 22H40" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
    </svg>
  );
}
