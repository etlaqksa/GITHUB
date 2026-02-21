import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Location Pin — الموقع الجغرافي
 */
export function IconLocation({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M24 4C16.3 4 10 10.3 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.3 31.7 4 24 4Z" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <circle cx="24" cy="18" fill="url(#realGold)" r="5">
      </circle>
    </svg>
  );
}
