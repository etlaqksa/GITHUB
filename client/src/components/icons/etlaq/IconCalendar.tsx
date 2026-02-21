import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Calendar — التقويم والتاريخ
 */
export function IconCalendar({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="30" rx="4" stroke="url(#realBlue)" strokeWidth="2.5" width="32" x="8" y="12">
      </rect>
      <path d="M16 8V16M32 8V16" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
      <path d="M8 22H40" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <rect fill="url(#realGold)" height="4" width="4" x="14" y="28">
      </rect>
      <rect fill="url(#realBlue)" height="4" width="4" x="22" y="28">
      </rect>
      <rect fill="url(#realBlue)" height="4" width="4" x="30" y="28">
      </rect>
    </svg>
  );
}
