import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Ruler — قياس وأبعاد
 */
export function IconRuler({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M10 38L38 10L44 16L16 44L10 38Z" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M22 26L28 32M28 20L34 26M16 32L22 38" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
    </svg>
  );
}
