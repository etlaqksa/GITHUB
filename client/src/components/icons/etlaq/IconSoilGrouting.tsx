import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Soil Grouting — حقن التربة
 */
export function IconSoilGrouting({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <rect fill={surface} height="20" rx="2" width="40" x="4" y="24" /><path d="M4 32H44M4 40H44" stroke={primary} strokeDasharray="4 4" strokeWidth="2" /><path d="M24 6V30" stroke={accent} strokeLinecap="round" strokeWidth="4" /><path d="M18 10H30" stroke={primary} strokeLinecap="round" strokeWidth="3" /><circle cx="24" cy="34" fill={accent} fillOpacity="0.8" r="6" />
    </svg>
  );
}
