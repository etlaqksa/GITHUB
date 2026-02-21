import React from 'react';
import { IconInstagram, IconTelegram, IconTiktok, IconX, IconWhatsapp } from '@/components/icons/etlaq';

type SocialKey = 'tiktok' | 'instagram' | 'x' | 'telegram' | 'whatsapp';

const COMPONENTS: Record<SocialKey, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  tiktok: IconTiktok,
  instagram: IconInstagram,
  x: IconX,
  telegram: IconTelegram,
  whatsapp: IconWhatsapp,
};

export function SocialIcon({
  name,
  className,
  title,
  ...props
}: {
  name: SocialKey;
  className?: string;
  title?: string;
} & React.SVGProps<SVGSVGElement>) {
  const Comp = COMPONENTS[name];

  // Social icons are usually displayed inside a white circular button, so we keep the brand tone.
  return <Comp title={title} className={className} {...props} />;
}
