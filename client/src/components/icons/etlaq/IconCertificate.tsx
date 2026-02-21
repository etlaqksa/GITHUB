import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Certificate — شهادات واعتمادات
 */
export function IconCertificate({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <rect fill={surface} height="40" rx="2" stroke={primary} strokeWidth="2.5" width="28" x="10" y="4" /><circle cx="24" cy="24" fill={accent} r="6" /><path d="M22 28L20 36L24 34L28 36L26 28" fill={accent} /><path d="M16 12H32M16 16H32" stroke={primary} strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
