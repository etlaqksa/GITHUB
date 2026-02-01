// GA4 init (external script to avoid inline CSP issues)
(function(){
  var GA_ID = 'G-LWFKJ1J1HY';
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('js', new Date());
  // Let GA send the initial page_view automatically.
  gtag('config', GA_ID);
})();
