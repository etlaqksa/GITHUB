// Microsoft Clarity loader (performance-friendly)
// - Defers loading Clarity until after window load / idle time
// - Keeps collect working while reducing impact on LCP/TBT
(function () {
  try {
    var CLARITY_ID = 'pwnw8mbv1s';

    function load() {
      try {
        if (document.getElementById('clarity-tag')) return;
        window.clarity = window.clarity || function () {
          (window.clarity.q = window.clarity.q || []).push(arguments);
        };
        var s = document.createElement('script');
        s.id = 'clarity-tag';
        s.async = true;
        s.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
        var first = document.getElementsByTagName('script')[0];
        if (first && first.parentNode) first.parentNode.insertBefore(s, first);
        else (document.head || document.documentElement).appendChild(s);
      } catch (e) {}
    }

    function schedule() {
      try {
        if ('requestIdleCallback' in window) {
          // @ts-ignore
          window.requestIdleCallback(load, { timeout: 1500 });
        } else {
          setTimeout(load, 900);
        }
      } catch (e) {
        setTimeout(load, 900);
      }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      schedule();
    } else {
      document.addEventListener('DOMContentLoaded', schedule, { once: true });
      window.addEventListener('load', schedule, { once: true });
    }
  } catch (e) {}
})();
