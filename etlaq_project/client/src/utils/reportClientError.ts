type ReportPayload = {
  type: string;
  message: string;
  stack?: string;
  url?: string;
  ua?: string;
  ts?: string;
};

/**
 * Lightweight monitoring without external services:
 * Sends a single error report per session to Netlify Forms ("client-error").
 * NOTE: We POST to /ar to avoid the root "/" 301 redirect in netlify.toml.
 */
export async function reportClientError(payload: ReportPayload) {
  try {
    if (typeof window === "undefined") return;

    const KEY = "etlaq_err_reported_v1";
    if (sessionStorage.getItem(KEY) === "1") return;
    sessionStorage.setItem(KEY, "1");

    const data: Record<string, string> = {
      "form-name": "client-error",
      type: payload.type || "error",
      message: payload.message || "Unknown error",
      stack: payload.stack || "",
      url: payload.url || window.location.href,
      ua: payload.ua || navigator.userAgent,
      ts: payload.ts || new Date().toISOString(),
    };

    const body = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

    await fetch("/ar", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch {
    // swallow
  }
}
