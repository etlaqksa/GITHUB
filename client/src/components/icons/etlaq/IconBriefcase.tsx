import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Briefcase — حقيبة أعمال
 */
export function IconBriefcase({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <rect fill={surface} height="24" rx="3" stroke={primary} strokeWidth="2.5" width="32" x="8" y="16" /><path d="M16 16V10C16 8 18 6 20 6H28C30 6 32 8 32 10V16" stroke={primary} strokeWidth="2.5" /><circle cx="24" cy="28" fill={accent} r="3" /><path d="M8 22H40" stroke={primary} strokeWidth="2.5" />
    </svg>
  );
}
