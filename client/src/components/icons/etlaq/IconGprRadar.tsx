import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * GPR Radar — رادار الاختراق GPR
 */
export function IconGprRadar({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <rect fill={primary} height="12" rx="3" width="20" x="14" y="8" /><path d="M20 8V4M28 8V4" stroke={primary} strokeLinecap="round" strokeWidth="2" /><path d="M18 28C22 32 26 32 30 28M14 34C20 40 28 40 34 34" stroke={accent} strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}
