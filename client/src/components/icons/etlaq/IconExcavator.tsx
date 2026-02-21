import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Excavator — حفارات ومعدات ثقيلة
 */
export function IconExcavator({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <rect fill={surface} height="8" rx="4" stroke={primary} strokeWidth="2.5" width="20" x="8" y="32" /><circle cx="12" cy="36" fill={accent} r="2" /><circle cx="24" cy="36" fill={accent} r="2" /><path d="M12 32V20C12 18 14 16 16 16H22V32" fill={surface} stroke={primary} strokeLinejoin="round" strokeWidth="2.5" /><path d="M22 24L34 16L38 28" stroke={accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}
