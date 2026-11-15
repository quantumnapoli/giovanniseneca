import {
  SITE, LINKS, UI, HOME_PATH, SECTION, sectionHref, albumUrl,
  HOME, CITIES, BIO, PROJECTS_PAGE, PROJECTS, ALBUMS_PAGE, ALBUMS, GALLERY_PAGE, GALLERY, BOOKING,
} from './data.mjs';
import { esc, tr, icon, photo, cover, streamChips, video, largestPhoto, photos } from './lib.mjs';

const abs = (p) => SITE.url + p;
const P = (t) => `<p>${esc(t)}</p>`;
const other = (lang) => (lang === 'it' ? 'en' : 'it');

/** Intestazione di sezione: titolo grande, sottotitolo e frase introduttiva opzionali. */
const secHead = (id, title, sub, lead) => `<header class="sec-head">
    <h2 class="sec-title" id="${id}-title">${esc(title)}</h2>
    ${sub ? `<p class="sec-sub">${esc(sub)}</p>` : ''}
    ${lead ? `<p class="sec-lead">${esc(lead)}</p>` : ''}
  </header>`;

const person = (lang) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: lang === 'it' ? 'Chitarrista e compositore' : 'Guitarist and composer',
  url: abs(HOME_PATH[lang]),
  image: abs('/assets/img/og.jpg'),
  birthPlace: { '@type': 'Place', name: 'Napoli' },
  sameAs: [LINKS.instagram, LINKS.youtube, LINKS.facebook, LINKS.spotify, LINKS.appleMusic],
});

// ---------------------------------------------------------------------------
// Sezioni della onepage
// ---------------------------------------------------------------------------
function heroSection(lang) {
  const h = HOME[lang];
  const heroAlt = lang === 'it' ? 'Giovanni Seneca con la chitarra flamenca' : 'Giovanni Seneca with the flamenco guitar';
  const hero = photos.photos.chitarrista;
  const srcset = hero.sizes.map((s) => `/assets/img/photos/chitarrista-${s.tag}.webp ${s.w}w`).join(', ');
  return {
    srcset,
    html: `<section class="hero" aria-labelledby="hero-title">
  <div class="hero-media">
    <img class="hero-img" src="/assets/img/photos/chitarrista-m.webp" srcset="${srcset}" sizes="(min-width: 900px) 72vw, 100vw" width="${hero.w}" height="${hero.h}" alt="${esc(heroAlt)}" fetchpriority="high" decoding="async">
  </div>
  <div class="wrap hero-inner">
    <h1 class="hero-title" id="hero-title"><span class="line">Giovanni</span> <span class="line">Seneca</span></h1>
    <p class="hero-role">${esc(h.role)}</p>
    <p class="hero-lead">${esc(h.lead)}</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="${sectionHref('albums', lang)}">${esc(h.ctaAlbums)}</a>
      <a class="btn btn-ghost" href="${sectionHref('booking', lang)}">${esc(h.ctaBooking)}</a>
    </div>
  </div>
</section>`,
  };
}

function bioSection(lang) {
  const b = BIO[lang];
  const h = HOME[lang];
  const id = SECTION.bio[lang];
  const [lede, ...rest] = b.paras;
  return `<section class="sec" id="${id}" data-section aria-labelledby="${id}-title">
  <div class="wrap">
    ${secHead(id, b.h1, b.role)}
    <div class="statement-grid">
      <div class="statement-main">
        <p class="statement-text">${esc(h.quote)}</p>
        <p class="statement-note">${esc(h.quoteNote)}</p>
      </div>
      <figure class="statement-photo">${photo('tre-chitarre', { sizes: '(min-width: 900px) 34vw, 100vw', alt: lang === 'it' ? 'Giovanni Seneca seduto tra tre chitarre' : 'Giovanni Seneca sitting among three guitars' })}</figure>
    </div>
    <div class="bio-grid">
      <figure class="bio-photo">
        ${photo('ritratto', { sizes: '(min-width: 900px) 36vw, 100vw', alt: lang === 'it' ? 'Giovanni Seneca accanto a una chitarra classica' : 'Giovanni Seneca next to a classical guitar' })}
      </figure>
      <div class="bio-text prose">
        <p class="lede">${esc(lede)}</p>
        ${rest.map(P).join('')}
        ${b.closing.map(P).join('')}
        <aside class="ad-note">
          <p class="ad-title"><a class="link link-more" href="${LINKS.adriatico}" target="_blank" rel="noopener noreferrer">${esc(b.adriatico)}</a></p>
          <p>${esc(b.adriaticoText)}</p>
        </aside>
      </div>
    </div>
  </div>
</section>`;
}

function reelSection(lang) {
  const h = HOME[lang];
  const v = photos.video;
  return `<section class="reel" aria-label="${esc(h.reelTitle)}">
  <div class="reel-frame">
    <video muted loop playsinline preload="none" poster="/assets/img/video/concerto-poster.webp" width="${v.w}" height="${v.h}" aria-label="${esc(GALLERY_PAGE[lang].videoAlt)}">
      <source src="/assets/img/video/concerto.mp4" type="video/mp4">
    </video>
    <p class="reel-title">${esc(h.reelTitle)}</p>
  </div>
</section>`;
}

function citiesSection(lang) {
  const h = HOME[lang];
  const cities = CITIES[lang].map((c) => `<li>${esc(c)}</li>`).join('');
  return `<section class="cities" aria-labelledby="cities-title">
  <div class="wrap"><h2 class="cities-label" id="cities-title">${esc(h.citiesTitle)}</h2></div>
  <div class="marquee-band">
    <div class="marquee">
      <ul class="marquee-track">${cities}</ul>
      <ul class="marquee-track" aria-hidden="true">${cities}</ul>
    </div>
  </div>
</section>`;
}

function projectsSection(lang) {
  const ps = PROJECTS_PAGE[lang];
  const id = SECTION.projects[lang];

  const project = (p) => {
    const blocks = p.blocks[lang]
      .map((b) => `${b.h ? `<h4>${esc(b.h)}</h4>` : ''}${b.p.map(P).join('')}${b.sign ? `<p class="sign">${esc(b.sign)}</p>` : ''}`)
      .join('');
    const lineup = p.lineup
      ? `<div class="spec"><h4 class="spec-h">${esc(ps.lineup)}</h4><dl>${p.lineup
          .map((l) => `<div><dt>${esc(l.who)}</dt><dd>${esc(tr(l.what, lang))}</dd></div>`)
          .join('')}</dl></div>`
      : '';
    const instr = p.instruments
      ? `<div class="spec"><h4 class="spec-h">${esc(ps.instruments)}</h4><dl>${p.instruments
          .map((i) => `<div><dt>${esc(tr(i.name, lang))}</dt><dd>${esc(i.maker)}</dd></div>`)
          .join('')}</dl></div>`
      : '';
    return `<article class="project project--${p.id}" id="${p.id}" aria-labelledby="${p.id}-title">
  <div class="project-grid">
    <header class="project-head">
      <h3 id="${p.id}-title">${esc(tr(p.title, lang))}</h3>
      <p class="project-sub">${esc(tr(p.subtitle, lang))}</p>
    </header>
    <div class="project-media">${p.videos.map((v) => video(v, lang)).join('')}</div>
    <aside class="project-aside">${lineup}${instr}</aside>
    <div class="project-text prose">${blocks}</div>
  </div>
</article>`;
  };

  const jump = `<nav class="jump" aria-label="${esc(ps.h1)}"><ul class="chips" role="list">${PROJECTS.map(
    (p) => `<li><a class="chip" href="#${p.id}">${esc(tr(p.title, lang))}</a></li>`
  ).join('')}</ul></nav>`;

  return `<section class="sec sec-projects theme-cobalt" id="${id}" data-section data-curtain aria-labelledby="${id}-title">
  <div class="wrap">
    ${secHead(id, ps.h1, '', ps.lead)}
    ${jump}
    ${PROJECTS.map(project).join('')}
  </div>
</section>`;
}

function albumsSection(lang) {
  const a = ALBUMS_PAGE[lang];
  const ui = UI[lang];
  const id = SECTION.albums[lang];
  const item = (al, i) => `<li class="mosaic-item${i === 0 ? ' mosaic-lead' : ''}">
    <a href="${albumUrl(al.slug, lang)}">
      ${cover(al.slug, { sizes: i === 0 ? '(min-width: 900px) 600px, 100vw' : '(min-width: 900px) 290px, 50vw', alt: '' })}
      <span class="mosaic-cap">
        ${i === 0 ? `<span class="mosaic-flag">${esc(a.latest)}</span>` : ''}
        <span class="mosaic-title">${esc(al.title)}</span>
        <span class="mosaic-meta">${esc(al.year)}, ${esc(tr(al.kind, lang))}</span>
      </span>
    </a>
  </li>`;
  return `<section class="sec theme-light" id="${id}" data-section data-curtain aria-labelledby="${id}-title">
  <div class="wrap">
    ${secHead(id, a.h1, '', a.lead)}
    <div class="listen-row"><span class="listen-label">${esc(a.listenAll)}</span>${streamChips(lang)}</div>
    <ul class="mosaic">${ALBUMS.map(item).join('')}</ul>
    <p class="fine">${esc(a.streamNote)}</p>
  </div>
</section>`;
}

function gallerySection(lang) {
  const g = GALLERY_PAGE[lang];
  const ui = UI[lang];
  const id = SECTION.gallery[lang];
  const items = GALLERY.map((it) => {
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
  return `<section class="sec" id="${id}" data-section aria-labelledby="${id}-title">
  <div class="wrap">
    ${secHead(id, g.h1, '', g.lead)}
    <ul class="gallery">${items}</ul>
  </div>
</section>
<dialog class="lightbox" data-lightbox-dialog aria-label="${esc(g.h1)}">
  <button class="lb-btn lb-close" type="button" data-lb-close aria-label="${esc(ui.close)}">${icon('x')}</button>
  <button class="lb-btn lb-prev" type="button" data-lb-prev aria-label="${esc(ui.prev)}">${icon('arrow-left')}</button>
  <figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>
  <button class="lb-btn lb-next" type="button" data-lb-next aria-label="${esc(ui.next)}">${icon('arrow-right')}</button>
</dialog>`;
}

function bookingSection(lang) {
  const b = BOOKING[lang];
  const ui = UI[lang];
  const id = SECTION.booking[lang];
  const formations = PROJECTS.map(
    (p) => `<li><a href="#${p.id}">
      <span class="formation-title">${esc(tr(p.title, lang))}</span>
      <span class="formation-sub">${esc(tr(p.short, lang))}</span>
      <span class="formation-more">${esc(b.seeProject)}${icon('arrow-up-right')}</span>
    </a></li>`
  ).join('');
  return `<section class="sec sec-booking theme-lemon" id="${id}" data-section data-curtain aria-labelledby="${id}-title">
  <div class="wrap">
    ${secHead(id, b.h1, '', b.lead)}
    <div class="booking-grid">
      <div class="contact-block">
        <h3 class="small-title">${esc(b.infoTitle)}</h3>
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
    </div>
    <div class="formations">
      <h3 class="small-title">${esc(b.formationsTitle)}</h3>
      <p class="sec-lead">${esc(b.formationsText)}</p>
      <ul class="formation-list">${formations}</ul>
    </div>
    <div class="ad-block">
      <h3 class="small-title">${esc(b.adriaticoTitle)}</h3>
      <p class="sec-lead">${esc(b.adriaticoText)}</p>
      <p><a class="link link-more" href="${LINKS.adriatico}" target="_blank" rel="noopener noreferrer">${esc(b.adriaticoLink)}</a></p>
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// HOME (onepage)
// ---------------------------------------------------------------------------
function home(lang) {
  const h = HOME[lang];
  const hero = heroSection(lang);
  const body = [hero.html, bioSection(lang), reelSection(lang), citiesSection(lang), projectsSection(lang), albumsSection(lang), gallerySection(lang), bookingSection(lang)].join('\n\n');
  return {
    path: HOME_PATH[lang],
    altPath: HOME_PATH[other(lang)],
    nav: '',
    bodyClass: 'is-home',
    title: h.title,
    description: h.description,
    body,
    jsonld: person(lang),
    head: `<link rel="preload" as="image" href="/assets/img/photos/chitarrista-m.webp" imagesrcset="${hero.srcset}" imagesizes="(min-width: 900px) 72vw, 100vw" fetchpriority="high">`,
  };
}

// ---------------------------------------------------------------------------
// SCHEDA ALBUM
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
      <p class="back"><a class="link" href="${sectionHref('albums', lang)}">${icon('arrow-left')}<span>${esc(ui.allAlbums)}</span></a></p>
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
  return {
    path: url,
    altPath: albumUrl(al.slug, other(lang)),
    nav: 'albums',
    title: `${al.title} | ${SITE.name}`,
    description: `${al.title}, ${al.year}. ${tr(al.desc, lang)}`.slice(0, 300),
    body,
    jsonld: ld,
    ogImage: `/assets/img/covers/${al.slug}-l.webp`,
  };
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
  return { lang: 'it', path: '/404.html', altPath: '/en/', nav: '', title: `${it.notFoundTitle} | ${SITE.name}`, description: it.notFoundText, body };
}

export function allPages() {
  const out = [];
  for (const lang of ['it', 'en']) {
    out.push({ lang, ...home(lang) });
    ALBUMS.forEach((al, i) => out.push({ lang, ...album(al, i, lang) }));
  }
  return out;
}
