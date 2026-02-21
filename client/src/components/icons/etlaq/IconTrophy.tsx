import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Trophy / Award — جوائز وتميز
 */
export function IconTrophy({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M14 10H34V20C34 26 28 30 24 30C20 30 14 26 14 20V10Z" fill={surface} stroke={primary} strokeWidth="2.5" /><path d="M24 30V40M18 40H30" stroke={primary} strokeLinecap="round" strokeWidth="2.5" /><path d="M14 14H8V20C8 22 10 24 14 24" stroke={accent} strokeLinecap="round" strokeWidth="2.5" /><path d="M34 14H40V20C40 22 38 24 34 24" stroke={accent} strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}
