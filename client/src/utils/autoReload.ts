/**
 * Auto-reload on Vite preload errors (stale HTML pointing to removed hashed chunks).
 * This prevents "white screen" after deployments by forcing a refresh once.
 *
 * Based on Vite guidance for handling the `vite:preloadError` event.
 */
export function registerGlobalPreloadErrorHandler() {
  if (typeof window === "undefined") return;

  window.addEventListener("vite:preloadError", (event: Event) => {
    // Prevent the default noisy error and self-heal by reloading.
    // `preventDefault` exists on Event, but keep it safe for older environments.
    (event as any).preventDefault?.();

    const STORAGE_KEY = "app_last_reload_ts";
    const last = sessionStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    const THRESHOLD_MS = 10_000; // 10s guard to avoid reload loops

    if (!last || now - Number(last) > THRESHOLD_MS) {
      sessionStorage.setItem(STORAGE_KEY, String(now));
      window.location.reload();
    } else {
      // Avoid infinite loops: if we already reloaded very recently, surface a user-friendly prompt.
      try {
        window.dispatchEvent(new CustomEvent("etlaq:preload-error"));
      } catch {
        // ignore
      }
    }
  });
}
