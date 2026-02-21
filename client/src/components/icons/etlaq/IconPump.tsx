import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Pump / Pressure — مضخات وضغط
 */
export function IconPump({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <circle cx="24" cy="28" fill="url(#realSilver)" filter="url(#innerShadow)" r="12" stroke="url(#realBlue)" strokeWidth="2.5">
      </circle>
      <path d="M12 28H4M24 16V8" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="3">
      </path>
      <circle cx="14" cy="14" r="6" stroke="url(#realGold)" strokeWidth="2.5">
      </circle>
      <circle cx="24" cy="28" fill="url(#realGold)" r="4">
      </circle>
    </svg>
  );
}
