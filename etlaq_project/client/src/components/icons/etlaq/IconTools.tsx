import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Tools — أدوات الصيانة
 */
export function IconTools({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M12 36L28 20C30 18 34 18 36 20C38 22 38 26 36 28L20 44" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="3">
      </path>
      <path d="M8 12L20 24M36 36L24 24" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
      <circle cx="10" cy="10" r="4" stroke="url(#realBlue)" strokeWidth="2.5">
      </circle>
    </svg>
  );
}
