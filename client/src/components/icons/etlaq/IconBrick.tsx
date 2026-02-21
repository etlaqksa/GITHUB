import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Brick / Concrete — طابوق وخرسانة
 */
export function IconBrick({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
  const monoClass = tone === 'mono' ? 'etlaq-icon--mono' : '';
  return (
    <svg
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      fill="none"
      focusable="false"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
      className={['etlaq-icon', monoClass, className].filter(Boolean).join(' ')}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="28" stroke="url(#realBlue)" strokeWidth="2.5" width="36" x="6" y="10">
      </rect>
      <path d="M18 10V38M30 10V38M6 24H42" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M6 17H18M18 31H30M30 17H42" stroke="url(#realGold)" strokeWidth="2.5">
      </path>
    </svg>
  );
}
