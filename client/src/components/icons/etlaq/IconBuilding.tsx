import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Building / Project — المباني والمشاريع
 */
export function IconBuilding({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M12 12V44H36V12" fill={surface} stroke={primary} strokeLinejoin="round" strokeWidth="2.5" /><path d="M18 12V4H30V12" stroke={primary} strokeWidth="2.5" /><path d="M18 24H22M26 24H30M18 32H22M26 32H30" stroke={accent} strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}
