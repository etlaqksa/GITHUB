import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Building — المباني والمشاريع
 */
export function IconBuilding({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M12 12V44H36V12" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinejoin="round" strokeWidth="2.5">
      </path>
      <path d="M18 12V4H30V12" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M18 24H22M26 24H30M18 32H22M26 32H30" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="2.5">
      </path>
    </svg>
  );
}
