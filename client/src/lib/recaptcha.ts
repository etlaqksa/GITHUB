/**
 * Google reCAPTCHA v3 helper.
 *
 * Loads the reCAPTCHA script lazily (only when a form is about to submit)
 * to avoid impacting initial page load performance.
 *
 * Usage:
 *   const token = await getRecaptchaToken('contact_form');
 *   // send token with form data → verify server-side
 */

const SITE_KEY = '6LdG8K8sAAAAAFPMY865WfK6RGr5_SRrqbOe3a4Y';

let scriptLoaded = false;
let scriptLoading: Promise<void> | null = null;

/** Lazily inject the reCAPTCHA script (idempotent). */
function loadScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src*="recaptcha"]`);
    if (existing) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
    document.head.appendChild(script);
  });

  return scriptLoading;
}

/**
 * Get a reCAPTCHA v3 token for the given action.
 * Returns the token string, or `null` if reCAPTCHA is unavailable (e.g. ad-blocker).
 *
 * @param action - A descriptive action name (e.g. 'contact_form', 'request_service').
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  try {
    await loadScript();

    // Wait for grecaptcha.ready
    return new Promise<string | null>((resolve) => {
      const g = (window as any).grecaptcha;
      if (!g?.ready) {
        resolve(null);
        return;
      }

      g.ready(async () => {
        try {
          const token: string = await g.execute(SITE_KEY, { action });
          resolve(token);
        } catch {
          resolve(null);
        }
      });
    });
  } catch {
    // reCAPTCHA blocked (ad-blocker, network issue) — don't block form submission.
    return null;
  }
}
