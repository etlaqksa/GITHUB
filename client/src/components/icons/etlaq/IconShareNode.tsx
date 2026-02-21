import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Share Node — مشاركة المقال
 */
export function IconShareNode({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <circle cx="12" cy="24" fill={primary} r="5" /><circle cx="34" cy="12" fill={accent} r="5" /><circle cx="34" cy="36" fill={accent} r="5" /><path d="M16 22L30 14M16 26L30 34" stroke={primary} strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}
