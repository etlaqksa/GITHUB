import React, { useMemo, useId } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { linkifyParagraph } from '@/lib/internalLinking/core';
import { useInternalLinking } from '@/contexts/InternalLinkingContext';

export default function AutoLinkedText(props: {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const { text, className, as } = props;
  const { language } = useLanguage();
  const ctx = useInternalLinking();
  const id = useId();

  const paragraphUsed = useMemo(() => new Set<string>(), []);

  const segments = useMemo(() => {
    return linkifyParagraph(text || '', {
      lang: language,
      maxPerDestination: ctx?.maxPerDestination,
      allocate: ctx?.allocate,
      paragraphDestinationsUsed: paragraphUsed,
      paragraphKey: id,
    });
  }, [text, language, ctx?.maxPerDestination, ctx?.allocate, paragraphUsed, id]);

  const Tag: any = as || React.Fragment;

  const content = (
    <>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') return <React.Fragment key={idx}>{seg.value}</React.Fragment>;
        return (
          <LocalizedLink
            key={idx}
            href={seg.href}
            title={seg.title}
            aria-label={seg.ariaLabel}
            className="text-primary underline underline-offset-4"
          >
            {seg.value}
          </LocalizedLink>
        );
      })}
    </>
  );

  if (Tag === React.Fragment) return content;

  return <Tag className={className}>{content}</Tag>;
}
