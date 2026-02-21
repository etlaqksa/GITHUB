import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Crane / Lift — رافعات وأوناش
 */
export function IconCrane({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <path d="M12 44L24 6L40 6" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      </path>
      <path d="M40 6V20C40 22 38 24 36 24C34 24 34 22 34 20V12" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
      <path d="M18 24H30M14 36H22" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
    </svg>
  );
}
