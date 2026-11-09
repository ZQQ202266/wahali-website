/* Record actions only; never send link destinations or customer input. */
(() => {
  const names = new Set(['whatsapp_click', 'email_click', 'add_to_inquiry']);
  window.wahaliTrack = name => {
    if (names.has(name) && typeof window.gtag === 'function') window.gtag('event', name);
  };
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (/^mailto:/i.test(href)) return window.wahaliTrack('email_click');
    try {
      const url = new URL(href, location.href);
      if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com' || url.hostname === 'web.whatsapp.com') {
        window.wahaliTrack('whatsapp_click');
      }
    } catch (_) { /* Ignore invalid or incomplete links. */ }
  }, true);
})();
