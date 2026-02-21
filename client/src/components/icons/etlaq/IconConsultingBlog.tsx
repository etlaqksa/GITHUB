import React from 'react';
import type { EtlaqIconProps } from './types';

/**
 * Consulting Blog — استشارات ومقالات
 */
export function IconConsultingBlog({ title, className, ...props }: EtlaqIconProps) {
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
      <rect fill="url(#realSilver)" filter="url(#innerShadow)" height="36" rx="4" stroke="url(#realBlue)" strokeWidth="2.5" width="28" x="10" y="6">
      </rect>
      <path d="M18 16H30M18 24H26" stroke="url(#realBlue)" strokeLinecap="round" strokeWidth="2">
      </path>
      <circle cx="32" cy="32" fill="url(#realGold)" filter="url(#innerShadow)" r="8">
      </circle>
      <circle cx="32" cy="32" fill="url(#realSilver)" r="3">
      </circle>
      <path d="M32 20V22M32 42V44M20 32H22M42 32H44" stroke="url(#realGold)" strokeLinecap="round" strokeWidth="2">
      </path>
    </svg>
  );
}
