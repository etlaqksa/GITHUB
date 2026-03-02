import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Tag / Label — كلمات مفتاحية
 */
export function IconTag({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M10 24L24 10H38V24L24 38L10 24Z" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2.5">
      </path>
      <circle cx="31" cy="17" fill="url(#realGold)" r="3">
      </circle>
    </svg>
  );
}
