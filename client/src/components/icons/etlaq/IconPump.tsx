import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Pump / Pressure — مضخة وقياس ضغط
 */
export function IconPump({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <circle cx="24" cy="28" fill={surface} r="12" stroke={primary} strokeWidth="2.5" /><path d="M12 28H4M24 16V8" stroke={primary} strokeLinecap="round" strokeWidth="3" /><circle cx="14" cy="14" r="6" stroke={accent} strokeWidth="2" /><circle cx="24" cy="28" fill={accent} r="3" />
    </svg>
  );
}
