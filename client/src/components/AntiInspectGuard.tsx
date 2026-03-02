// Anti-inspect guard removed — provided no real security and harmed user experience.
// This component is kept as a no-op for compatibility with existing import references.
import { type ReactNode } from 'react';

export default function AntiInspectGuard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
