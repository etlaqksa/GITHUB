import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Calendar — التقويم والتاريخ
 */
export function IconCalendar({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
  const primary = primaryProp ?? (tone === 'mono' ? 'currentColor' : 'var(--etlaq-icon-primary, #1E3A8A)');
  const accent = accentProp ?? (tone === 'mono' ? 'currentColor' : 'var(--etlaq-icon-accent, #F59E0B)');
  const surface = surfaceProp ?? (tone === 'mono' ? 'transparent' : 'var(--etlaq-icon-surface, #E0E7FF)');

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
      
      <rect fill={surface} height="30" rx="4" stroke={primary} strokeWidth="2.5" width="32" x="8" y="12" /><path d="M16 8V16M32 8V16" stroke={accent} strokeLinecap="round" strokeWidth="3" /><path d="M8 22H40" stroke={primary} strokeWidth="2.5" /><rect fill={accent} height="4" width="4" x="14" y="28" /><rect fill={primary} height="4" width="4" x="22" y="28" /><rect fill={primary} height="4" width="4" x="30" y="28" />
    </svg>
  );
}
