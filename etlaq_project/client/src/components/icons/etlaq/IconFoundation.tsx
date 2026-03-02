import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Foundation — معالجة الأساسات
 */
export function IconFoundation({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M4 24H44" stroke="url(#realBlue)" strokeDasharray="8 4" strokeWidth="2.5">
      </path>
      <path d="M16 24V10L32 10V24" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2.5">
      </path>
      <path d="M16 24V36H12V40H20V36H16" fill="url(#realGold)" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M32 24V36H28V40H36V36H32" fill="url(#realGold)" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
    </svg>
  );
}
