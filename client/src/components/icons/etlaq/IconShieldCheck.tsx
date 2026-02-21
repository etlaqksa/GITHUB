import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Shield Check / Security — ضمان وحماية
 */
export function IconShieldCheck({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M24 4L8 10V22C8 32 14.5 41 24 44C33.5 41 40 32 40 22V10L24 4Z" fill={surface} stroke={primary} strokeLinejoin="round" strokeWidth="2.5" /><path d="M16 24L22 30L32 18" stroke={accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}
