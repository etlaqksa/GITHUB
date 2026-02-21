import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Drill / Drilling — معدات الحفر (Rig)
 */
export function IconDrill({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M4 36H44" stroke={primary} strokeLinecap="round" strokeWidth="3" /><rect fill={surface} height="10" width="12" x="18" y="36" /><path d="M20 28L24 6L28 28" stroke={accent} strokeLinejoin="round" strokeWidth="3" /><rect fill={primary} height="8" rx="2" width="24" x="12" y="28" /><path d="M24 28V44" stroke={primary} strokeDasharray="4 4" strokeWidth="3" />
    </svg>
  );
}
