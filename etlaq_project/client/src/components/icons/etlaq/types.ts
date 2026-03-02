import type React from 'react';

export type EtlaqIconProps = Omit<React.SVGProps<SVGSVGElement>, 'color'> & {
  /**
   * Accessible title. If omitted, the icon is aria-hidden.
   */
  title?: string;
};
