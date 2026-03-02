import React from 'react';

/**
 * Shared SVG defs (gradients + inner shadow) for Etlaq 3D icons.
 * Render this ONCE near the app root.
 */
export function Etlaq3DIconDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
<linearGradient id="realBlue" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#60a5fa"></stop>
<stop offset="50%" stopColor="#1d4ed8"></stop>
<stop offset="100%" stopColor="#1e3a8a"></stop>
</linearGradient>
<linearGradient id="realGold" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#fde68a"></stop>
<stop offset="40%" stopColor="#f59e0b"></stop>
<stop offset="100%" stopColor="#b45309"></stop>
</linearGradient>
<linearGradient id="realSilver" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#ffffff"></stop>
<stop offset="100%" stopColor="#cbd5e1"></stop>
</linearGradient>
<filter height="140%" id="innerShadow" width="140%" x="-20%" y="-20%">
<feDropShadow dx="1" dy="3" floodColor="#0f172a" floodOpacity="0.25" stdDeviation="2"></feDropShadow>
</filter>
</defs>
    </svg>
  );
}
