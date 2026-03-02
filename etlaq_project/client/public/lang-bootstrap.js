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
    // Hero uses CSS backgrounds now; no image preload needed here.
// Theme bootstrap (optional): apply stored color theme early to avoid flash.
    try {
      var t = localStorage.getItem('color-theme');
      if (t && (t === 'blue' || t === 'green' || t === 'orange' || t === 'purple' || t === 'red')) {
        html.setAttribute('data-theme', t);
      }
    } catch (e3) {
      // ignore
    }
  
    // NOTE: "Font gate" was removed because it hides the entire page until fonts load,
    // which hurts LCP on mobile throttling. We now rely on normal font loading behavior.


  } catch (e) {
    // ignore
  }
})();
