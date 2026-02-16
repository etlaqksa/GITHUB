// Client-side error reporting via Netlify Forms.
// Kept as an external script to satisfy CSP (no inline scripts).
(function () {
  try {
    var KEY = 'etlaq_err_reported_v1';
    function enc(o) {
      return Object.keys(o)
        .map(function (k) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(o[k]);
        })
        .join('&');
    }

    function postUrl() {
      try {
        // Post to the current language root to work with the SPA routing.
        return (location && location.pathname && location.pathname.indexOf('/en') === 0) ? '/en' : '/ar';
      } catch {
        return '/ar';
      }
    }

    function report(type, info) {
      try {
        if (sessionStorage.getItem(KEY) === '1') return;
        sessionStorage.setItem(KEY, '1');

        var msg = (info && (info.message || (info.toString && info.toString()))) || 'Unknown error';
        var stack = (info && info.stack) ? String(info.stack) : '';
        var payload = {
          'form-name': 'client-error',
          type: type,
          message: msg,
          stack: stack,
          url: location.href,
          ua: navigator.userAgent,
          ts: new Date().toISOString(),
        };

        fetch(postUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: enc(payload),
        }).catch(function () {});
      } catch (e) {}
    }

    window.addEventListener('error', function (e) {
      report('error', e.error || { message: e.message, stack: (e.filename + ':' + e.lineno + ':' + e.colno) });
    });

    window.addEventListener('unhandledrejection', function (e) {
      report('unhandledrejection', e.reason || { message: 'Unhandled promise rejection' });
    });
  } catch (e) {}
})();
