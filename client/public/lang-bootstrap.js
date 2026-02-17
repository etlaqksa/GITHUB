// Language + direction bootstrap (runs before React mounts).
// Purpose:
// - Prevent CLS when landing directly on /en (index.html defaults to rtl/ar).
// - Inject hero image preload ONLY on the home route to avoid wasting bandwidth on inner pages.
(function () {
  try {
    var p = (location && location.pathname) ? String(location.pathname) : '/';
    var clean = p.replace(/\/+$/, '') || '/';

    var isEn = clean === '/en' || clean.indexOf('/en/') === 0;
    var html = document.documentElement;

    // Set lang/dir as early as possible.
    html.lang = isEn ? 'en' : 'ar';
    html.dir = isEn ? 'ltr' : 'rtl';

    // Optional class hooks (harmless if unused).
    if (isEn) {
      html.classList.add('lang-en');
      html.classList.remove('lang-ar');
    } else {
      html.classList.add('lang-ar');
      html.classList.remove('lang-en');
    }

    // Preload the home hero collage only for the home route.
    // This improves LCP for /ar and /en home, and avoids competing bandwidth on inner pages.
    var isHome = clean === '/ar' || clean === '/en' || clean === '/' || clean === '';
    if (isHome && !document.getElementById('etlaq-preload-hero')) {
      var link = document.createElement('link');
      link.id = 'etlaq-preload-hero';
      link.rel = 'preload';
      link.as = 'image';
      link.href = '/hero/home-collage-960.webp';
      link.setAttribute(
        'imagesrcset',
        '/hero/home-collage-640.webp 640w, /hero/home-collage-960.webp 960w, /hero/home-collage-1280.webp 1280w, /hero/home-collage.webp 1920w'
      );
      link.setAttribute('imagesizes', '100vw');
      link.setAttribute('type', 'image/webp');
      // @ts-ignore - some browsers support fetchpriority on link, others ignore.
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }

    

    // Theme bootstrap (optional): apply stored color theme early to avoid flash.
    try {
      var t = localStorage.getItem('color-theme');
      if (t && (t === 'blue' || t === 'green' || t === 'orange' || t === 'purple' || t === 'red')) {
        html.setAttribute('data-theme', t);
      }
    } catch (e3) {
      // ignore
    }
  } catch (e) {
    // ignore
  }
})();
