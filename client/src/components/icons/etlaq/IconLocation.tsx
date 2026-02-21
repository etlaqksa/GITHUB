import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Location / Map Pin — الموقع الجغرافي
 */
export function IconLocation({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M24 4C16.3 4 10 10.3 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.3 31.7 4 24 4Z" fill={surface} stroke={primary} strokeWidth="2.5" /><circle cx="24" cy="18" fill={accent} r="5" />
    </svg>
  );
}
