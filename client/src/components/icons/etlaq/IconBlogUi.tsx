import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Blog UI — واجهة المدونة
 */
export function IconBlogUi({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <rect fill={surface} height="32" rx="4" stroke={primary} strokeWidth="2.5" width="40" x="4" y="8" /><path d="M4 18H44" stroke={primary} strokeWidth="2.5" /><circle cx="10" cy="13" fill={accent} r="2" /><circle cx="16" cy="13" fill={accent} r="2" /><rect fill={primary} fillOpacity="0.2" height="8" rx="1" width="10" x="10" y="24" /><path d="M24 26H36M24 30H32" stroke={primary} strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
