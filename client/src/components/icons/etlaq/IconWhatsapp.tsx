import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * WhatsApp — واتساب
 */
export function IconWhatsapp({ title, tone = 'brand', primary: primaryProp, accent: accentProp, surface: surfaceProp, className, ...props }: EtlaqIconProps) {
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
      
      <path d="M40 23.5C40 32.6 32.6 40 23.5 40C20.6 40 17.9 39.2 15.6 37.9L6 40L8.1 30.4C6.8 28.1 6 25.4 6 22.5C6 13.4 13.4 6 22.5 6C31.6 6 40 13.4 40 23.5Z" fill={surface} stroke={primary} strokeWidth="2.5" /><path d="M16 18C16 18 17 14 20 14C23 14 23 18 23 18L21 21C21 21 23 25 26 27L29 25C29 25 33 25 33 28C33 31 29 32 29 32C19 32 16 18 16 18Z" fill={accent} />
    </svg>
  );
}
