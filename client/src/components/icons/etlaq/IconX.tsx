import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * X / Twitter — منصة X (تويتر)
 */
export function IconX({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M10 8L22 24L10 40H14L24 26.5L34 40H38L26 24L38 8H34L24 21.5L14 8H10Z" fill={primary} /><path d="M16 10L32 38" stroke={accent} strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
