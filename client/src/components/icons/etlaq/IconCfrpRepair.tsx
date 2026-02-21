import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * CFRP Repair — التدعيم والـ CFRP
 */
export function IconCfrpRepair({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <rect fill={surface} height="36" stroke={primary} strokeWidth="2.5" width="16" x="16" y="6" /><path d="M24 6L20 18L26 26L20 42" stroke={primary} strokeLinejoin="round" strokeWidth="2" /><rect fill={accent} height="6" rx="1" width="24" x="12" y="14" /><rect fill={accent} height="6" rx="1" width="24" x="12" y="28" />
    </svg>
  );
}
