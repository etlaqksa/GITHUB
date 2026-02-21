import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Telegram — تيليجرام
 */
export function IconTelegram({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M42 6L4 20L16 26M42 6L26 40L16 26M42 6L16 26L16 36L22 30" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /><path d="M16 26L26 16" stroke={accent} strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}
