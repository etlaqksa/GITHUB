import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Building Const. — تشييد المباني
 */
export function IconBuildingConst({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="20" stroke="url(#realBlue)" strokeWidth="2.5" width="16" x="8" y="24">
      </rect>
      <path d="M34 10V44" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="4">
      </path>
      <path d="M30 14H38M30 22H38M30 30H38M30 38H38" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <path d="M16 10H42" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="4">
      </path>
    </svg>
  );
}
