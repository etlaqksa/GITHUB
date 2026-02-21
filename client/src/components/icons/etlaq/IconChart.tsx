import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Chart / Trend — إحصائيات ونمو
 */
export function IconChart({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M6 42H42" stroke={primary} strokeLinecap="round" strokeWidth="2.5" /><rect fill={surface} height="18" stroke={primary} strokeWidth="2.5" width="6" x="10" y="24" /><rect fill={surface} height="26" stroke={primary} strokeWidth="2.5" width="6" x="22" y="16" /><rect fill={accent} height="34" width="6" x="34" y="8" /><path d="M10 20L22 10L34 4" stroke={accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}
