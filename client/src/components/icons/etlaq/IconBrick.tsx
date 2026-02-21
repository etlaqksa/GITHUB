import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Brick / Wall — طابوق وخرسانة
 */
export function IconBrick({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <rect fill={surface} height="28" stroke={primary} strokeWidth="2.5" width="36" x="6" y="10" /><path d="M18 10V38M30 10V38M6 24H42" stroke={primary} strokeWidth="2.5" /><path d="M6 17H18M18 31H30M30 17H42" stroke={accent} strokeWidth="2.5" />
    </svg>
  );
}
