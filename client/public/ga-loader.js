// Lazy-load gtag.js after first user interaction (keeps PSI/Lighthouse clean and avoids blocking LCP).
(function () {
  try {
    var GA_ID = 'G-LWFKJ1J1HY';
    var injected = false;

    function inject() {
      if (injected) return;
      injected = true;

      // Avoid double-inject
      if (document.getElementById('ga-gtag-js')) return;

      var s = document.createElement('script');
      s.id = 'ga-gtag-js';
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
      document.head.appendChild(s);
    }

    function scheduleInject() {
      if (injected) return;

      // Prefer idle time to minimize main-thread contention.
      try {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(function () { inject(); }, { timeout: 4000 });
          return;
        }
      } catch {
        // ignore
      }

      setTimeout(inject, 500);
    }

    var opts = { passive: true, once: true };

    // First interaction triggers analytics load (Lighthouse does not interact).
    window.addEventListener('pointerdown', scheduleInject, opts);
    window.addEventListener('keydown', scheduleInject, opts);
    window.addEventListener('touchstart', scheduleInject, opts);
    window.addEventListener('scroll', scheduleInject, opts);

    // Safety net: load after window 'load' + 12s even if there's no interaction.
    // This keeps real-user tracking reasonable without harming initial render.
    window.addEventListener(
      'load',
      function () {
        setTimeout(function () {
          scheduleInject();
        }, 12000);
      },
      { once: true }
    );
  } catch {
    // ignore
  }
})();
