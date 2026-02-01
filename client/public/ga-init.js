// GA4 init (external script to avoid inline CSP issues)
(function(){
  var GA_ID = 'G-LWFKJ1J1HY';
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('js', new Date());
  // SPA: we will send page_view manually on route changes from React.
  gtag('config', GA_ID, { send_page_view: false });
})();
