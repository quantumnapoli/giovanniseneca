import {
  SITE, LINKS, ROUTES, UI, albumUrl,
  HOME, CITIES, BIO, PROJECTS_PAGE, PROJECTS, ALBUMS_PAGE, ALBUMS, GALLERY_PAGE, GALLERY, BOOKING,
} from './data.mjs';
import { esc, tr, icon, photo, cover, streamChips, video, largestPhoto, photos } from './lib.mjs';

const abs = (p) => SITE.url + p;
const P = (t) => `<p>${esc(t)}</p>`;

const pageHead = (h1, sub, lead) => `<section class="page-head">
  <div class="wrap">
    <h1 class="page-title">${esc(h1)}</h1>
    ${sub ? `<p class="page-sub">${esc(sub)}</p>` : ''}
    ${lead ? `<p class="page-lead">${esc(lead)}</p>` : ''}
  </div>
</section>`;

const sectionHead = (id, h, href, more) => `<header class="section-head">
  <h2 id="${id}">${esc(h)}</h2>
  ${href ? `<a class="link link-more" href="${href}">${esc(more)}</a>` : ''}
</header>`;

const person = (lang) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: lang === 'it' ? 'Chitarrista e compositore' : 'Guitarist and composer',
  url: abs(ROUTES.home[lang]),
  image: abs('/assets/img/og.jpg'),
  birthPlace: { '@type': 'Place', name: 'Napoli' },
  sameAs: [LINKS.instagram, LINKS.youtube, LINKS.facebook, LINKS.spotify, LINKS.appleMusic],
});

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------
function home(lang) {
  const h = HOME[lang];
  const ui = UI[lang];
  const heroAlt = lang === 'it' ? 'Giovanni Seneca con la chitarra flamenca' : 'Giovanni Seneca with the flamenco guitar';
  const hero = photos.photos.chitarrista;
  const heroSrcset = hero.sizes.map((s) => `/assets/img/photos/chitarrista-${s.tag}.webp ${s.w}w`).join(', ');

  const tile = (p, cls) => `<a class="tile ${cls}" href="${ROUTES.projects[lang]}#${p.id}">
      ${photo(p.photo, { sizes: cls.includes('tile-lg') ? '(min-width: 900px) 58vw, 100vw' : '(min-width: 900px) 40vw, 100vw', alt: '', style: `object-position:${p.thumbPos}` })}
      <span class="tile-text"><span class="tile-title">${esc(tr(p.title, lang))}</span><span class="tile-sub">${esc(tr(p.short, lang))}</span></span>
    </a>`;
  const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

  const albumCards = ALBUMS.map(
    (a) => `<li class="album-card"><a href="${albumUrl(a.slug, lang)}">
      ${cover(a.slug, { sizes: '(min-width: 900px) 280px, 62vw', alt: '' })}
      <span class="album-card-title">${esc(a.title)}</span>
      <span class="album-card-meta">${esc(a.year)}</span>
    </a></li>`
  ).join('');

  const cities = CITIES[lang].map((c) => `<li>${esc(c)}</li>`).join('');

  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media">
    <img class="hero-img" src="/assets/img/photos/chitarrista-m.webp" srcset="${heroSrcset}" sizes="(min-width: 900px) 80vw, 100vw" width="${hero.w}" height="${hero.h}" alt="${esc(heroAlt)}" fetchpriority="high" decoding="async">
  </div>
  <div class="wrap hero-inner">
    <h1 class="hero-title" id="hero-title"><span class="line">Giovanni</span> <span class="line">Seneca</span></h1>
    <p class="hero-role">${esc(h.role)}</p>
    <p class="hero-lead">${esc(h.lead)}</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="${ROUTES.albums[lang]}">${esc(h.ctaAlbums)}</a>
      <a class="btn btn-ghost" href="${ROUTES.booking[lang]}">${esc(h.ctaBooking)}</a>
    </div>
  </div>
</section>

<section class="statement" aria-label="${esc(ui.nav.bio)}">
  <div class="wrap statement-grid">
    <div class="statement-main">
      <p class="statement-text">${esc(h.quote)}</p>
      <p class="statement-note">${esc(h.quoteNote)}</p>
      <ul class="facts">${h.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      <p><a class="link link-more" href="${ROUTES.bio[lang]}">${esc(h.bioLink)}</a></p>
    </div>
    <figure class="statement-photo">${photo('tre-chitarre', { sizes: '(min-width: 900px) 34vw, 100vw', alt: lang === 'it' ? 'Giovanni Seneca seduto tra tre chitarre' : 'Giovanni Seneca sitting among three guitars' })}</figure>
  </div>
</section>

<section class="block" aria-labelledby="projects-title">
  <div class="wrap">
    ${sectionHead('projects-title', h.projectsTitle, ROUTES.projects[lang], h.projectsLink)}
    <div class="bento">
      ${tile(byId.quartet, 'tile-lg')}
      ${tile(byId.solo, 'tile-a')}
      ${tile(byId.trio, 'tile-b')}
    </div>
  </div>
</section>

<section class="block block-albums" aria-labelledby="albums-title">
  <div class="wrap">
    ${sectionHead('albums-title', h.albumsTitle, ROUTES.albums[lang], h.albumsLink)}
    <p class="section-lead">${esc(h.albumsLead)}</p>
    <div class="listen-row"><span class="listen-label">${esc(ui.listenTo)}</span>${streamChips(lang)}</div>
  </div>
  <div class="strip-wrap" data-strip>
    <ul class="strip" tabindex="0" aria-label="${esc(h.albumsTitle)}">${albumCards}</ul>
    <div class="strip-ctl wrap">
      <button class="round" type="button" data-strip-prev aria-label="${esc(ui.prev)}">${icon('arrow-left')}</button>
      <button class="round" type="button" data-strip-next aria-label="${esc(ui.next)}">${icon('arrow-right')}</button>
    </div>
  </div>
</section>

<section class="cities" aria-labelledby="cities-title">
  <div class="wrap"><h2 class="cities-label" id="cities-title">${esc(h.citiesTitle)}</h2></div>
  <div class="marquee">
    <ul class="marquee-track">${cities}</ul>
    <ul class="marquee-track" aria-hidden="true">${cities}</ul>
  </div>
</section>

<section class="cta-band" aria-labelledby="cta-title">
  <div class="wrap">
    <h2 id="cta-title">${esc(h.bookingTitle)}</h2>
    <p class="cta-text">${esc(h.bookingText)}</p>
    <p><a class="big-link" href="mailto:${SITE.email}">${SITE.email}</a></p>
    <p><a class="big-link big-link-sm" href="tel:${SITE.phoneTel}">${SITE.phone}</a></p>
    <p><a class="link link-more" href="${ROUTES.booking[lang]}">${esc(h.bookingLink)}</a></p>
  </div>
</section>`;

  return {
    path: ROUTES.home[lang],
    altPath: ROUTES.home[lang === 'it' ? 'en' : 'it'],
    nav: 'home',
    bodyClass: 'is-home',
    title: h.title,
    description: h.description,
    body,
    jsonld: person(lang),
    head: `<link rel="preload" as="image" href="/assets/img/photos/chitarrista-m.webp" imagesrcset="${heroSrcset}" imagesizes="(min-width: 900px) 80vw, 100vw" fetchpriority="high">`,
  };
}

// ---------------------------------------------------------------------------
// BIOGRAFIA
// ---------------------------------------------------------------------------
function bio(lang) {
  const b = BIO[lang];
  const [lede, ...rest] = b.paras;
  const body = `
${pageHead(b.h1, b.role)}
<div class="wrap bio-grid">
  <figure class="bio-photo">
    ${photo('ritratto', { sizes: '(min-width: 900px) 36vw, 100vw', alt: lang === 'it' ? 'Giovanni Seneca accanto a una chitarra classica' : 'Giovanni Seneca next to a classical guitar', priority: true })}
  </figure>
  <div class="bio-text prose">
    <p class="lede">${esc(lede)}</p>
    ${rest.map(P).join('')}
    <p class="highlight">${esc(b.highlight)}</p>
    ${b.closing.map(P).join('')}
    <aside class="ad-note">
      <p class="ad-title"><a class="link link-more" href="${LINKS.adriatico}" target="_blank" rel="noopener noreferrer">${esc(b.adriatico)}</a></p>
      <p>${esc(b.adriaticoText)}</p>
    </aside>
    <div class="actions">
      <a class="btn btn-primary" href="${ROUTES.albums[lang]}">${esc(b.ctaAlbums)}</a>
      <a class="btn btn-ghost" href="${ROUTES.booking[lang]}">${esc(b.ctaBooking)}</a>
    </div>
  </div>
</div>`;
  return { path: ROUTES.bio[lang], altPath: ROUTES.bio[lang === 'it' ? 'en' : 'it'], nav: 'bio', title: b.title, description: b.description, body, jsonld: person(lang) };
}

// ---------------------------------------------------------------------------
// PROGETTI
// ---------------------------------------------------------------------------
function projects(lang) {
  const ps = PROJECTS_PAGE[lang];
  const ui = UI[lang];

  const section = (p) => {
    const blocks = p.blocks[lang]
      .map(
        (b) =>
          `${b.h ? `<h3>${esc(b.h)}</h3>` : ''}${b.p.map(P).join('')}${b.sign ? `<p class="sign">${esc(b.sign)}</p>` : ''}`
      )
      .join('');
    const lineup = p.lineup
      ? `<div class="spec"><h3 class="spec-h">${esc(ps.lineup)}</h3><dl>${p.lineup
          .map((l) => `<div><dt>${esc(l.who)}</dt><dd>${esc(tr(l.what, lang))}</dd></div>`)
          .join('')}</dl></div>`
      : '';
    const instr = p.instruments
      ? `<div class="spec"><h3 class="spec-h">${esc(ps.instruments)}</h3><dl>${p.instruments
          .map((i) => `<div><dt>${esc(tr(i.name, lang))}</dt><dd>${esc(i.maker)}</dd></div>`)
          .join('')}</dl></div>`
      : '';
    return `<section class="project project--${p.id}" id="${p.id}" aria-labelledby="${p.id}-title">
  <div class="wrap project-grid">
    <header class="project-head">
      <h2 id="${p.id}-title">${esc(tr(p.title, lang))}</h2>
      <p class="project-sub">${esc(tr(p.subtitle, lang))}</p>
    </header>
    <div class="project-media">${p.videos.map((v) => video(v, lang)).join('')}</div>
    <aside class="project-aside">${lineup}${instr}</aside>
    <div class="project-text prose">${blocks}</div>
  </div>
</section>`;
  };

  const jump = `<nav class="wrap jump" aria-label="${esc(ps.h1)}"><ul class="chips" role="list">${PROJECTS.map(
    (p) => `<li><a class="chip" href="#${p.id}">${esc(tr(p.title, lang))}</a></li>`
  ).join('')}</ul></nav>`;

  const body = `${pageHead(ps.h1, '', ps.lead)}${jump}${PROJECTS.map(section).join('')}
<section class="cta-band cta-compact"><div class="wrap">
  <p class="cta-text">${esc(BOOKING[lang].lead)}</p>
  <p><a class="btn btn-primary" href="${ROUTES.booking[lang]}">${esc(ps.bookIt)}</a></p>
</div></section>`;
  return { path: ROUTES.projects[lang], altPath: ROUTES.projects[lang === 'it' ? 'en' : 'it'], nav: 'projects', title: ps.title, description: ps.description, body };
}

// ---------------------------------------------------------------------------
// ALBUM (indice)
// ---------------------------------------------------------------------------
function albums(lang) {
  const a = ALBUMS_PAGE[lang];
  const ui = UI[lang];
  const item = (al, i) => `<li class="mosaic-item${i === 0 ? ' mosaic-lead' : ''}">
    <a href="${albumUrl(al.slug, lang)}">
      ${cover(al.slug, { sizes: i === 0 ? '(min-width: 900px) 600px, 100vw' : '(min-width: 900px) 290px, 50vw', alt: '', priority: i === 0 })}
      <span class="mosaic-cap">
        ${i === 0 ? `<span class="mosaic-flag">${esc(a.latest)}</span>` : ''}
        <span class="mosaic-title">${esc(al.title)}</span>
        <span class="mosaic-meta">${esc(al.year)}, ${esc(tr(al.kind, lang))}</span>
      </span>
    </a>
  </li>`;
  const body = `${pageHead(a.h1, '', a.lead)}
<div class="wrap">
  <div class="listen-row"><span class="listen-label">${esc(a.listenAll)}</span>${streamChips(lang)}</div>
  <ul class="mosaic">${ALBUMS.map(item).join('')}</ul>
  <p class="fine">${esc(a.streamNote)}</p>
</div>`;
  return { path: ROUTES.albums[lang], altPath: ROUTES.albums[lang === 'it' ? 'en' : 'it'], nav: 'albums', title: a.title, description: a.description, body };
}

// ---------------------------------------------------------------------------
// ALBUM (scheda)
// ---------------------------------------------------------------------------
function album(al, i, lang) {
  const a = ALBUMS_PAGE[lang];
  const ui = UI[lang];
  const prev = ALBUMS[(i - 1 + ALBUMS.length) % ALBUMS.length];
  const next = ALBUMS[(i + 1) % ALBUMS.length];
  const yearLine = al.yearNote ? `${al.year}. ${tr(al.yearNote, lang)}` : al.year;
  const credits = (al.people || [])
    .map(([role, who]) => `<div><dt>${esc(tr(role, lang))}</dt><dd>${esc(who)}</dd></div>`)
    .join('');
  const notes = al.notes ? al.notes[lang].map(P).join('') : '';
  const url = albumUrl(al.slug, lang);

  const body = `
<section class="album-hero">
  <div class="wrap album-grid">
    <div class="album-cover">${cover(al.slug, { sizes: '(min-width: 900px) 520px, 100vw', alt: `${al.title}, ${lang === 'it' ? 'copertina' : 'cover'}`, priority: true })}</div>
    <div class="album-info">
      <p class="back"><a class="link" href="${ROUTES.albums[lang]}">${icon('arrow-left')}<span>${esc(ui.allAlbums)}</span></a></p>
      <h1 class="album-title">${esc(al.title)}</h1>
      <p class="album-year">${esc(yearLine)}</p>
      <p class="album-kind">${esc(tr(al.kind, lang))}</p>
      <p class="album-desc">${esc(tr(al.desc, lang))}</p>
      ${al.award ? `<p class="album-award">${esc(tr(al.award, lang))}</p>` : ''}
      <div class="listen-block"><h2 class="listen-label">${esc(ui.listenTo)}</h2>${streamChips(lang, al)}</div>
    </div>
  </div>
</section>
${al.videos ? `<section class="block"><div class="wrap"><h2 class="small-title">${esc(ui.watch)}</h2><div class="album-video">${al.videos.map((v) => video(v, lang)).join('')}</div></div></section>` : ''}
<section class="block credits">
  <div class="wrap credits-grid">
    <h2 class="small-title">${esc(ui.credits)}</h2>
    <div>
      <dl class="credit-list">${credits}</dl>
      ${notes ? `<div class="credit-notes prose">${notes}</div>` : ''}
      ${al.rights ? `<p class="fine">${esc(al.rights)}</p>` : ''}
    </div>
  </div>
</section>
<nav class="wrap album-nav" aria-label="${esc(ui.nav.albums)}">
  <a class="album-nav-link" href="${albumUrl(prev.slug, lang)}" rel="prev">${icon('arrow-left')}<span><span class="album-nav-label">${esc(ui.prevAlbum)}</span><span class="album-nav-title">${esc(prev.title)}</span></span></a>
  <a class="album-nav-link album-nav-next" href="${albumUrl(next.slug, lang)}" rel="next"><span><span class="album-nav-label">${esc(ui.nextAlbum)}</span><span class="album-nav-title">${esc(next.title)}</span></span>${icon('arrow-right')}</a>
</nav>`;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: al.title,
    byArtist: { '@type': 'Person', name: SITE.name },
    datePublished: al.year,
    image: abs(`/assets/img/covers/${al.slug}-l.webp`),
    url: abs(url),
  };
  const desc = `${al.title}, ${al.year}. ${tr(al.desc, lang)}`.slice(0, 300);
  return {
    path: url,
    altPath: albumUrl(al.slug, lang === 'it' ? 'en' : 'it'),
    nav: 'albums',
    title: `${al.title} | ${SITE.name}`,
    description: desc,
    body,
    jsonld: ld,
    ogImage: `/assets/img/covers/${al.slug}-l.webp`,
  };
}

// ---------------------------------------------------------------------------
// GALLERY
// ---------------------------------------------------------------------------
function gallery(lang) {
  const g = GALLERY_PAGE[lang];
  const ui = UI[lang];
  const items = GALLERY.map((it, i) => {
    const p = photos.photos[it.key];
    const full = largestPhoto(it.key);
    const cap = it.caption ? tr(it.caption, lang) : '';
    const alt = tr(it.alt, lang);
    return `<li class="g-item" style="--ar:${(p.w / p.h).toFixed(4)}">
      <a href="${full.src}" data-lightbox data-w="${full.w}" data-h="${full.h}" data-alt="${esc(alt)}" data-caption="${esc(cap)}" aria-label="${esc(ui.openPhoto)}: ${esc(cap || alt)}">
        ${photo(it.key, { sizes: '(min-width: 1100px) 360px, (min-width: 640px) 45vw, 100vw', alt })}
      </a>
    </li>`;
  }).join('');
  const v = photos.video;
  const body = `${pageHead(g.h1, '', g.lead)}
<div class="wrap"><ul class="gallery">${items}</ul></div>
<section class="block"><div class="wrap">
  <h2 class="small-title">${esc(g.videoTitle)}</h2>
  <div class="gallery-video">
    <video controls preload="none" playsinline poster="/assets/img/video/concerto-poster.webp" width="${v.w}" height="${v.h}" aria-label="${esc(g.videoAlt)}">
      <source src="/assets/img/video/concerto.mp4" type="video/mp4">
    </video>
  </div>
</div></section>
<dialog class="lightbox" data-lightbox-dialog aria-label="${esc(g.h1)}">
  <button class="lb-btn lb-close" type="button" data-lb-close aria-label="${esc(ui.close)}">${icon('x')}</button>
  <button class="lb-btn lb-prev" type="button" data-lb-prev aria-label="${esc(ui.prev)}">${icon('arrow-left')}</button>
  <figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>
  <button class="lb-btn lb-next" type="button" data-lb-next aria-label="${esc(ui.next)}">${icon('arrow-right')}</button>
</dialog>`;
  return { path: ROUTES.gallery[lang], altPath: ROUTES.gallery[lang === 'it' ? 'en' : 'it'], nav: 'gallery', title: g.title, description: g.description, body, ogImage: '/assets/img/og.jpg' };
}

// ---------------------------------------------------------------------------
// BOOKING
// ---------------------------------------------------------------------------
function booking(lang) {
  const b = BOOKING[lang];
  const ui = UI[lang];
  const formations = PROJECTS.map(
    (p) => `<li><a href="${ROUTES.projects[lang]}#${p.id}">
      <span class="formation-title">${esc(tr(p.title, lang))}</span>
      <span class="formation-sub">${esc(tr(p.short, lang))}</span>
      <span class="formation-more">${esc(b.seeProject)}${icon('arrow-up-right')}</span>
    </a></li>`
  ).join('');
  const body = `${pageHead(b.h1, '', b.lead)}
<section class="wrap booking-grid" aria-labelledby="contact-title">
  <div class="contact-block">
    <h2 id="contact-title" class="small-title">${esc(b.infoTitle)}</h2>
    <dl class="contact">
      <div>
        <dt>${esc(b.email)}</dt>
        <dd>
          <a class="big-link" href="mailto:${SITE.email}?subject=Booking">${SITE.email}</a>
          <button class="copy" type="button" data-copy="${SITE.email}" data-done="${esc(ui.copied)}">${icon('copy')}<span>${esc(ui.copyEmail)}</span></button>
        </dd>
      </div>
      <div>
        <dt>${esc(b.phone)}</dt>
        <dd><a class="big-link" href="tel:${SITE.phoneTel}">${SITE.phone}</a></dd>
      </div>
    </dl>
  </div>
  <figure class="booking-photo">${photo('live-giallo', { sizes: '(min-width: 900px) 40vw, 100vw', alt: lang === 'it' ? 'Giovanni Seneca in concerto, con luci verdi e blu' : 'Giovanni Seneca in concert under green and blue lights' })}</figure>
</section>
<section class="wrap formations" aria-labelledby="formations-title">
  <h2 id="formations-title" class="small-title">${esc(b.formationsTitle)}</h2>
  <p class="section-lead">${esc(b.formationsText)}</p>
  <ul class="formation-list">${formations}</ul>
</section>
<section class="wrap ad-block" aria-labelledby="ad-title">
  <h2 id="ad-title" class="small-title">${esc(b.adriaticoTitle)}</h2>
  <p class="section-lead">${esc(b.adriaticoText)}</p>
  <p><a class="link link-more" href="${LINKS.adriatico}" target="_blank" rel="noopener noreferrer">${esc(b.adriaticoLink)}</a></p>
</section>`;
  return { path: ROUTES.booking[lang], altPath: ROUTES.booking[lang === 'it' ? 'en' : 'it'], nav: 'booking', title: b.title, description: b.description, body };
}

// ---------------------------------------------------------------------------
// 404 (una sola pagina, bilingue)
// ---------------------------------------------------------------------------
export function notFound() {
  const it = UI.it;
  const en = UI.en;
  const body = `<section class="page-head"><div class="wrap">
  <h1 class="page-title">404</h1>
  <p class="page-lead">${esc(it.notFoundTitle)}. ${esc(it.notFoundText)}</p>
  <p class="page-lead" lang="en">${esc(en.notFoundTitle)}. ${esc(en.notFoundText)}</p>
  <div class="actions">
    <a class="btn btn-primary" href="/">${esc(it.backHome)}</a>
    <a class="btn btn-ghost" href="/en/" lang="en">${esc(en.backHome)}</a>
  </div>
</div></section>`;
  return { lang: 'it', path: '/404.html', altPath: '/en/', nav: '', title: `${it.notFoundTitle} | ${SITE.name}`, description: it.notFoundText, body, noindex: true };
}

export function allPages() {
  const out = [];
  for (const lang of ['it', 'en']) {
    out.push({ lang, ...home(lang) }, { lang, ...bio(lang) }, { lang, ...projects(lang) }, { lang, ...albums(lang) });
    ALBUMS.forEach((al, i) => out.push({ lang, ...album(al, i, lang) }));
    out.push({ lang, ...gallery(lang) }, { lang, ...booking(lang) });
  }
  return out;
}
