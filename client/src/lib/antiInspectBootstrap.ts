// Lightweight, best-effort anti-inspect deterrent.
// IMPORTANT: This does NOT provide real security.

export function isAntiInspectEnabled(): boolean {
  const raw = String((import.meta as any).env?.VITE_ANTI_INSPECT ?? '')
    .trim()
    .toLowerCase();
  if (raw === 'true' || raw === '1' || raw === 'yes' || raw === 'on') return true;

  // Optional runtime overrides for quick testing.
  try {
    const qs = new URLSearchParams(window.location.search);
    if (qs.get('guard') === '1') return true;
    if (localStorage.getItem('anti_inspect') === '1') return true;
  } catch {
    // ignore
  }

  return false;
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
