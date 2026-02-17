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

    // ---- Page-level accent bootstrap (runs before React mounts) ----
    // Goal: reduce first-paint mismatch for colors (and keep UI feeling cohesive).
    // We compute a deterministic accent from the semantic route (strip /ar or /en).
    function stripLangPrefix(path) {
      if (!path) return '/';
      var p2 = String(path);
      if (p2 === '/ar' || p2 === '/en') return '/';
      if (p2.indexOf('/ar/') === 0) return p2.slice(3);
      if (p2.indexOf('/en/') === 0) return p2.slice(3);
      return p2;
    }

    function hashString(input) {
      var h = 0;
      for (var i = 0; i < input.length; i++) {
        h = (h * 31 + input.charCodeAt(i)) >>> 0;
      }
      return h;
    }

    function hslToRgb(h, s, l) {
      var c = (1 - Math.abs(2 * l - 1)) * s;
      var hp = h / 60;
      var x = c * (1 - Math.abs((hp % 2) - 1));
      var r1 = 0, g1 = 0, b1 = 0;
      if (hp >= 0 && hp < 1) { r1 = c; g1 = x; b1 = 0; }
      else if (hp >= 1 && hp < 2) { r1 = x; g1 = c; b1 = 0; }
      else if (hp >= 2 && hp < 3) { r1 = 0; g1 = c; b1 = x; }
      else if (hp >= 3 && hp < 4) { r1 = 0; g1 = x; b1 = c; }
      else if (hp >= 4 && hp < 5) { r1 = x; g1 = 0; b1 = c; }
      else if (hp >= 5 && hp < 6) { r1 = c; g1 = 0; b1 = x; }
      var m = l - c / 2;
      var r = Math.round((r1 + m) * 255);
      var g = Math.round((g1 + m) * 255);
      var b = Math.round((b1 + m) * 255);
      return [r, g, b];
    }

    var theme = null;
    try { theme = localStorage.getItem('color-theme'); } catch (e2) { theme = null; }
    var offsets = { blue: 0, green: 120, orange: 35, purple: 275, red: 10 };
    var offset = offsets[theme] || 0;

    var semantic = stripLangPrefix(clean);
    semantic = (semantic || '/').replace(/\/+$/, '') || '/';
    var key = semantic === '' ? '/' : semantic;

    var hue = (hashString(key) % 360 + offset + 360) % 360;
    var hue2 = (hue + 28) % 360;

    var isDark = html.classList.contains('dark');
    var l1 = isDark ? 0.58 : 0.46;
    var l2 = isDark ? 0.54 : 0.50;
    var s1 = 0.88;
    var s2 = 0.86;

    var rgb1 = hslToRgb(hue, s1, l1);
    var rgb2 = hslToRgb(hue2, s2, l2);

    html.style.setProperty('--page-accent-h', String(hue));
    html.style.setProperty('--page-accent-rgb', rgb1[0] + ' ' + rgb1[1] + ' ' + rgb1[2]);
    html.style.setProperty('--page-accent2-rgb', rgb2[0] + ' ' + rgb2[1] + ' ' + rgb2[2]);
    html.style.setProperty('--primary', 'rgb(' + rgb1[0] + ' ' + rgb1[1] + ' ' + rgb1[2] + ')');
    html.style.setProperty('--ring', 'rgb(' + rgb1[0] + ' ' + rgb1[1] + ' ' + rgb1[2] + ')');
    html.style.setProperty('--accent', 'rgb(' + rgb1[0] + ' ' + rgb1[1] + ' ' + rgb1[2] + ' / 0.12)');
  } catch (e) {
    // ignore
  }
})();
