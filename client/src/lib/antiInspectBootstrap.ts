// Lightweight, best-effort anti-inspect deterrent.
// IMPORTANT: This does NOT provide real security.

export function isAntiInspectEnabled(): boolean {
  // IMPORTANT:
  // - Netlify UI env vars can sometimes fail to propagate into the Vite build.
  // - To make the deterrent reliable, we treat it as **ON by default**,
  //   with an explicit opt-out via ?guard=0 (persisted in localStorage).
  // - You can still force-enable via ?guard=1.

  // 1) Build-time flag (if it works, keep honoring it)
  if (typeof __ETLAQ_ANTI_INSPECT__ !== 'undefined' && __ETLAQ_ANTI_INSPECT__ === true) return true;

  // 2) Runtime overrides (persisted)
  try {
    const url = new URL(window.location.href);
    const guard = url.searchParams.get('guard');

    if (guard === '1') {
      localStorage.setItem('anti_inspect', '1');
      url.searchParams.delete('guard');
      window.history.replaceState({}, '', url.toString());
      return true;
    }

    if (guard === '0') {
      localStorage.setItem('anti_inspect', '0');
      url.searchParams.delete('guard');
      window.history.replaceState({}, '', url.toString());
      return false;
    }

    const stored = localStorage.getItem('anti_inspect');
    if (stored === '0') return false;
    if (stored === '1') return true;
  } catch {
    // ignore
  }

  // 3) Default: enabled (guaranteed)
  return true;
}

export function mountAntiInspectBlockers(): void {
  if (typeof window === 'undefined') return;
  if (!isAntiInspectEnabled()) return;

  // Mark DOM for CSS-based protections
  document.documentElement.classList.add('etlaq-guard-on');

  const onContextMenu = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const key = (e.key || '').toLowerCase();
    const ctrlOrMeta = e.ctrlKey || e.metaKey;

    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Ctrl/Cmd+U
    if (ctrlOrMeta && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Ctrl/Cmd+Shift+I
    if (ctrlOrMeta && e.shiftKey && key === 'i') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Ctrl/Cmd+C / X
    if (ctrlOrMeta && (key === 'c' || key === 'x')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Ctrl/Cmd+Shift+C (picker)
    if (ctrlOrMeta && e.shiftKey && key === 'c') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  const onCopy = (e: ClipboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onCut = (e: ClipboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDragStart = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Capture phase to run before app handlers.
  window.addEventListener('contextmenu', onContextMenu, { capture: true });
  document.addEventListener('contextmenu', onContextMenu, { capture: true });
  window.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('copy', onCopy, true);
  document.addEventListener('cut', onCut, true);
  document.addEventListener('dragstart', onDragStart, true);
}
