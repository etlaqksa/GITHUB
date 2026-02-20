// Lazy-load gtag.js after user interaction (or a long idle timeout) to reduce PSI/Lighthouse impact.
(function(){
  try {
    var GA_ID = 'G-LWFKJ1J1HY';
    var loaded = false;

    function inject(){
      try {
        if (loaded) return;
        loaded = true;
        if (document.getElementById('ga-gtag-js')) return;
        var s = document.createElement('script');
        s.id = 'ga-gtag-js';
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
        document.head.appendChild(s);
      } catch (e) {}
    }

    // Trigger on first real interaction
    window.addEventListener('pointerdown', inject, { once: true, passive: true });
    window.addEventListener('keydown', inject, { once: true, passive: true });
    window.addEventListener('scroll', inject, { once: true, passive: true });

    // Fallback: very late idle timeout (keeps analytics eventually for non-interacting users)
    setTimeout(inject, 9000);
  } catch (e) {
    // ignore
  }
})();