import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Tools / Wrench — أدوات الصيانة
 */
export function IconTools({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M12 36L28 20C30 18 34 18 36 20C38 22 38 26 36 28L20 44" stroke={primary} strokeLinecap="round" strokeWidth="2.5" /><path d="M8 12L20 24M36 36L24 24" stroke={accent} strokeLinecap="round" strokeWidth="3" /><circle cx="10" cy="10" r="4" stroke={primary} strokeWidth="2.5" />
    </svg>
  );
}
