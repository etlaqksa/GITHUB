import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Radar / GPR — رادار الاختراق GPR
 */
export function IconGprRadar({ title, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realBlue)" filter="url(#innerShadow)" height="12" rx="3" width="20" x="14" y="8">
      </rect>
      <path d="M20 8V4M28 8V4" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2.5">
      </path>
      <path d="M18 28C22 32 26 32 30 28M14 34C20 40 28 40 34 34M10 40C18 48 30 48 38 40" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
    </svg>
  );
}
