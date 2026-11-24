/* Vinska kuća Matić – rano pokretanje (prije prvog iscrtavanja).
   Postavlja klase na <html>: js, intro-on (uvodna animacija), pt-in (prijelaz stranica).
   Botovi i pretraživači ne dobivaju intro (radi SEO-a). Sve je funkcionalno nužna pohrana. */
(function () {
  var d = document.documentElement, c = d.classList;
  c.add('js');
  var bot = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|whatsapp|telegram|linkedin|pinterest/i.test(navigator.userAgent);
  try {
    var ls = localStorage, ss = sessionStorage, base = d.getAttribute('data-base') || '/';
    // Vraćanje na odabrani jezik pri dolasku izvana na početnu
    var lang = ls.getItem('mv_lang');
    if (lang && /^(en|de|it)$/.test(lang) && location.pathname === base && (!document.referrer || document.referrer.indexOf(location.origin) !== 0)) {
      location.replace(base + lang + '/');
      return;
    }
    if (ls.getItem('mv_cursor') !== 'off') c.add('cursor-on');
    if (bot) return;
    var pt = ss.getItem('mv_pt');
    if (pt) {
      ss.removeItem('mv_pt');
      if (/^#[0-9a-f]{6}$/i.test(pt)) d.style.setProperty('--pt-c', pt);
      c.add('pt-in');
    } else if (!ss.getItem('mv_intro') && !d.hasAttribute('data-no-intro')) {
      c.add('intro-on');
    }
  } catch (e) {}
})();
