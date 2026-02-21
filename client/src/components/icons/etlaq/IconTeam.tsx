import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Team / Users — فريق العمل والعملاء
 */
export function IconTeam({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <circle cx="24" cy="16" fill={accent} r="6" /><path d="M14 36C14 30 18 26 24 26C30 26 34 30 34 36" stroke={primary} strokeLinecap="round" strokeWidth="2.5" /><circle cx="12" cy="20" r="4" stroke={primary} strokeWidth="2" /><circle cx="36" cy="20" r="4" stroke={primary} strokeWidth="2" /><path d="M6 36C6 32 9 29 12 29M42 36C42 32 39 29 36 29" stroke={primary} strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}
