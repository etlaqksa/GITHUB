/**
 * Self-heal handler for deployment chunk errors.
 *
 * Why:
 * - After a deploy, a user's cached HTML may still reference old hashed chunks.
 * - React.lazy can throw a ChunkLoadError / "Failed to fetch dynamically imported module".
 * - Vite emits `vite:preloadError` in many cases, but not all.
 *
 * Strategy:
 * - Listen to:
 *   1) `vite:preloadError`
 *   2) `unhandledrejection` (lazy import failures)
 *   3) `error` capture (module/script loading failures)
 * - Reload with cache-busting query param to avoid "stale index" loops.
 * - Throttle reload attempts to prevent infinite reload loops.
 */

const STORAGE_KEY = "app_last_reload_ts";
const THRESHOLD_MS = 10_000; // 10s guard

function toMessage(reason: unknown): string {
  if (!reason) return "";
  if (typeof reason === "string") return reason;
  if (reason instanceof Error) return `${reason.name}: ${reason.message}`;
  try {
    return JSON.stringify(reason);
  } catch {
    return String(reason);
  }
}

function isLikelyChunkError(reason: unknown): boolean {
  const msg = toMessage(reason).toLowerCase();
  return (
    msg.includes("dynamically imported module") ||
    msg.includes("importing a module script failed") ||
    msg.includes("loading chunk") ||
    msg.includes("chunkloaderror") ||
    // Some browsers only show this generic message for missing chunks
    (msg.includes("failed to fetch") && (msg.includes("module") || msg.includes("import")))
  );
}

async function clearClientCachesBestEffort() {
  // If a SW/CacheStorage exists, stale HTML/chunks could survive longer.
  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.allSettled(regs.map((r) => r.unregister()));
    }
  } catch {
    // ignore
  }

  try {
    if ("caches" in window) {
      // @ts-ignore CacheStorage typing can be missing in some TS setups
      const keys: string[] = await caches.keys();
      // @ts-ignore
      await Promise.allSettled(keys.map((k) => caches.delete(k)));
    }
  } catch {
    // ignore
  }
}

function navigateWithCacheBust() {
  const url = new URL(window.location.href);
  url.searchParams.set("__r", String(Date.now()));
  window.location.replace(url.toString());
}

/**
 * Attempt a self-heal reload with loop protection.
 * Returns true if a reload/navigation was triggered.
 */
export function attemptSelfHealReload(reason?: unknown): boolean {
  if (typeof window === "undefined") return false;

  const now = Date.now();
  const last = sessionStorage.getItem(STORAGE_KEY);
  const canReload = !last || now - Number(last) > THRESHOLD_MS;

  if (!canReload) {
    // Too soon: show an in-app banner instead of looping.
    try {
      window.dispatchEvent(new CustomEvent("etlaq:preload-error"));
    } catch {
      // ignore
    }
    return false;
  }

  sessionStorage.setItem(STORAGE_KEY, String(now));
  void clearClientCachesBestEffort();
  navigateWithCacheBust();
  return true;
}

export function registerGlobalPreloadErrorHandler() {
  if (typeof window === "undefined") return;

  // 1) Vite-native preload error hook
  window.addEventListener("vite:preloadError", (event: Event) => {
    (event as any).preventDefault?.();
    console.warn("Detected Vite preload error. Attempting self-heal...");
    attemptSelfHealReload(event);
  });

  // 2) Lazy import failures often surface as unhandled promise rejections
  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    if (!isLikelyChunkError(event.reason)) return;
    console.warn("Detected chunk-related unhandled rejection. Attempting self-heal...");
    event.preventDefault?.();
    attemptSelfHealReload(event.reason);
  });

  // 3) Script/module loading errors that might not bubble as rejections
  window.addEventListener(
    "error",
    (event: ErrorEvent) => {
      const maybe = event.error ?? event.message;
      if (!isLikelyChunkError(maybe)) return;
      console.warn("Detected chunk-related window error. Attempting self-heal...");
      attemptSelfHealReload(maybe);
    },
    true
  );
}
