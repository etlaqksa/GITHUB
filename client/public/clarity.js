/**
 * Microsoft Clarity loader (immediate)
 * - Loads on first page visit automatically (no user reload required).
 * - Safe-guards against double-loading.
 */
(function () {
  try {
    if (typeof window === "undefined") return;
    if (window.__etlaqClarityLoaded) return;
    window.__etlaqClarityLoaded = true;

    var projectId = "pwnw8mbv1s";

    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", projectId);
  } catch (e) {
    // never break the site due to analytics
  }
})();
