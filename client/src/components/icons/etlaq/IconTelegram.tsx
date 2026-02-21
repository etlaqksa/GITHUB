import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Telegram — تيليجرام
 */
export function IconTelegram({ title, className, ...props }: EtlaqIconProps) {
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
      <path d="M42 6L4 20L16 26M42 6L26 40L16 26M42 6L16 26L16 36L22 30" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
      </path>
      <path d="M16 26L26 16" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="3">
      </path>
    </svg>
  );
}
