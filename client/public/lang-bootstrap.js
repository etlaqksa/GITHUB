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
  
    // Font gate: avoid large CLS from late font swaps (especially on mobile throttling).
    try {
      if (!html.classList.contains('fonts-ready')) {
        var __fontsDone = false;
        function __markFontsReady() {
          if (__fontsDone) return;
          __fontsDone = true;
          html.classList.remove('fonts-pending');
          html.classList.add('fonts-ready');
        }
        var __t = setTimeout(__markFontsReady, 4500);
        if (document.fonts && {
          {
            clearTimeout(__t);
            __markFontsReady();
          }).catch(function () {});
        } else {
          setTimeout(function () {
            clearTimeout(__t);
            __markFontsReady();
          }, 900);
        }
      }
    } catch (e4) {
      // ignore
    }


  } catch (e) {
    // ignore
  }
})();
