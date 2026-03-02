import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Lab Test — اختبارات المواد
 */
export function IconLabTest({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M20 10V18L10 36C8.6 38.6 10 42 14 42H34C38 42 39.3 38.6 38 36L28 18V10" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2.5">
      </path>
      <path d="M16 10H32M14 28H34" stroke="url(#realGold)" strokeWidth="3">
      </path>
    </svg>
  );
}
