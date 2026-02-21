import type React from 'react';

export type EtlaqIconTone = 'brand' | 'mono';

export type EtlaqIconProps = Omit<React.SVGProps<SVGSVGElement>, 'color'> & {
  /**
   * Accessible title. If omitted, the icon is aria-hidden.
   */
  title?: string;
  /**
   * 'brand' uses Etlaq two-tone colors. 'mono' uses currentColor and transparent surface.
   */
  tone?: EtlaqIconTone;
  primary?: string;
  accent?: string;
  surface?: string;
};
