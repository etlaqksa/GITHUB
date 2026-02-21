import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Crane / Lift — رافعات وأوناش
 */
export function IconCrane({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M12 44L24 6L40 6" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /><path d="M40 6V20C40 22 38 24 36 24C34 24 34 22 34 20V12" stroke={accent} strokeLinecap="round" strokeWidth="2.5" /><path d="M18 24H30M14 36H22" stroke={primary} strokeWidth="2.5" />
    </svg>
  );
}
