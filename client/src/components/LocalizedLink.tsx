import React from 'react';
import { Link } from 'wouter';
import { ensureLeadingSlash } from '@/lib/localizePath';

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /**
   * IMPORTANT:
   * The app is mounted under /ar/* and /en/* using <Router base="/ar"> or <Router base="/en">.
   * Therefore, all internal links MUST be base-relative (e.g. "/services"), not prefixed ("/ar/services").
   */
  href: string;
};

export default function LocalizedLink({ href, ...rest }: Props) {
  const clean = ensureLeadingSlash(href);
  return <Link href={clean} {...rest} />;
}
