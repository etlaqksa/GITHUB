import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Hard Hat / Helmet — خوذة السلامة
 */
export function IconHardHat({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M8 28C8 16 14 10 24 10C34 10 40 16 40 28" fill={accent} stroke={primary} strokeWidth="2.5" /><path d="M4 28H44" stroke={primary} strokeLinecap="round" strokeWidth="3" /><path d="M24 10V28" stroke={primary} strokeWidth="2.5" />
    </svg>
  );
}
