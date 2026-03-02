import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Share Node — مشاركة المقال
 */
export function IconShareNode({ title, className, ...props }: EtlaqIconProps) {
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
      <circle cx="12" cy="24" fill="url(#realBlue)" filter="url(#innerShadow)" r="5">
      </circle>
      <circle cx="34" cy="12" fill="url(#realGold)" filter="url(#innerShadow)" r="5">
      </circle>
      <circle cx="34" cy="36" fill="url(#realGold)" filter="url(#innerShadow)" r="5">
      </circle>
      <path d="M16 22L30 14M16 26L30 34" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2.5">
      </path>
    </svg>
  );
}
