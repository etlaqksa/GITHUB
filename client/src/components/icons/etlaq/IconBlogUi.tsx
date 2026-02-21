import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Blog UI — واجهة المدونة
 */
export function IconBlogUi({ title, tone = 'brand', primary: _primary, accent: _accent, surface: _surface, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="32" rx="4" stroke="url(#realBlue)" strokeWidth="2.5" width="40" x="4" y="8">
      </rect>
      <path d="M4 18H44" stroke="url(#realBlue)" strokeWidth="2.5">
      </path>
      <circle cx="10" cy="13" fill="url(#realGold)" r="2">
      </circle>
      <circle cx="16" cy="13" fill="url(#realGold)" r="2">
      </circle>
      <rect fill="url(#realBlue)" fillOpacity="0.3" height="8" rx="1" width="10" x="10" y="24">
      </rect>
      <path d="M24 26H36M24 30H32" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2">
      </path>
    </svg>
  );
}
