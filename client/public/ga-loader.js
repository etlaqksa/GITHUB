// Lazy-load gtag.js after the page becomes interactive to reduce main-thread work during initial render.
(function(){
  try {
    var GA_ID = 'G-LWFKJ1J1HY';
    var load = function(){
      // Avoid double-inject
      if (document.getElementById('ga-gtag-js')) return;
      var s = document.createElement('script');
      s.id = 'ga-gtag-js';
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
      document.head.appendChild(s);
    };

    // Prefer idle time, fall back to a short timeout.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(function(){ load(); }, { timeout: 2500 });
    } else {
      setTimeout(load, 1200);
    }
  } catch {
    // ignore
  }
})();
