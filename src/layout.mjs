import { SITE, LINKS, HOME_PATH, UI, sectionHref } from './data.mjs';
import { esc, icon, socialLinks } from './lib.mjs';

const NAV = ['bio', 'projects', 'albums', 'gallery']; // + booking (pulsante)

/**
 * Pagina completa.
 * @param {object} o
 * @param {'it'|'en'} o.lang
 * @param {string} o.path        percorso di questa pagina (es. /biografia/)
 * @param {string} o.altPath     percorso della stessa pagina nell'altra lingua
 * @param {string} o.nav         chiave di navigazione attiva (bio, projects, albums, gallery, booking, home)
 */
export function layout(o, assets) {
  const { lang, path, altPath, nav = '', title, description, body, ogImage = '/assets/img/og.jpg', jsonld, head = '', bodyClass = '' } = o;
  const ui = UI[lang];
  const other = lang === 'it' ? 'en' : 'it';
  const itPath = lang === 'it' ? path : altPath;
  const enPath = lang === 'en' ? path : altPath;
  const abs = (p) => SITE.url + p;

  const navItems = NAV.map(
    (k) =>
      `<li><a href="${sectionHref(k, lang)}"${nav === k ? ' aria-current="true"' : ''}>${esc(ui.nav[k])}</a></li>`
  ).join('');

  const social = socialLinks()
    .map(
      (s) =>
        `<li><a class="icon-link" href="${esc(s.href)}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}">${icon(s.ico)}</a></li>`
    )
    .join('');

  const footerNav = [...NAV, 'booking']
    .map((k) => `<li><a href="${sectionHref(k, lang)}">${esc(ui.nav[k])}</a></li>`)
    .join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
<link rel="alternate" hreflang="it" href="${abs(itPath)}">
<link rel="alternate" hreflang="en" href="${abs(enPath)}">
<link rel="alternate" hreflang="x-default" href="${abs(itPath)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:locale" content="${lang === 'it' ? 'it_IT' : 'en_GB'}">
<meta property="og:locale:alternate" content="${lang === 'it' ? 'en_GB' : 'it_IT'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0a1220">
<meta name="color-scheme" content="dark">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/bodoni-moda-opsz.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/hanken-grotesk.woff2" as="font" type="font/woff2" crossorigin>
${head}
<link rel="stylesheet" href="${assets.css}">
<script>document.documentElement.classList.add('js')</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body class="${esc(bodyClass)}">
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="site-header" data-header>
  <div class="wrap header-row">
    <a class="brand" href="${HOME_PATH[lang]}" aria-label="${SITE.name}, home">Giovanni Seneca</a>
    <nav class="nav" id="nav" aria-label="${lang === 'it' ? 'Principale' : 'Main'}">
      <ul>
        ${navItems}
        <li><a class="btn btn-primary btn-sm" href="${sectionHref('booking', lang)}">${esc(ui.nav.booking)}</a></li>
      </ul>
      <ul class="nav-social">${social}</ul>
    </nav>
    <div class="header-tools">
      <a class="lang" href="${altPath}" hreflang="${other}" lang="${other}" aria-label="${esc(ui.switchLabel)}">${other.toUpperCase()}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav" data-menu>
        <span class="sr-only" data-menu-label data-open="${esc(ui.menu)}" data-close="${esc(ui.closeMenu)}">${esc(ui.menu)}</span>
        ${icon('list', 'ico-open')}${icon('x', 'ico-close')}
      </button>
    </div>
  </div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <p class="footer-name">Giovanni Seneca</p>
      <p class="footer-role">${esc(lang === 'it' ? 'Chitarrista e compositore' : 'Guitarist and composer')}</p>
      <p><a class="link" href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p><a class="link" href="tel:${SITE.phoneTel}">${SITE.phone}</a></p>
    </div>
    <nav class="footer-nav" aria-label="${esc(ui.footerNav)}">
      <p class="footer-label">${esc(ui.footerNav)}</p>
      <ul>${footerNav}</ul>
    </nav>
    <div class="footer-social">
      <p class="footer-label">${esc(ui.social)}</p>
      <ul class="social-row">${social}</ul>
      <p class="footer-ad"><a class="link" href="${LINKS.adriatico}" target="_blank" rel="noopener noreferrer">${esc(ui.artisticDirection)}: Adriatico Mediterraneo</a></p>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>&copy; ${SITE.year} Giovanni Seneca. ${esc(ui.rights)}.</p>
    <p>${esc(ui.siteBy)} <a class="link" href="${LINKS.credit}" target="_blank" rel="noopener noreferrer">Massimo Morgante</a></p>
  </div>
</footer>
<script src="${assets.js}" defer></script>
</body>
</html>
`;
}
