import fs from 'node:fs';
import { LINKS, UI } from './data.mjs';

export const photos = JSON.parse(fs.readFileSync(new URL('./photos.json', import.meta.url), 'utf8'));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Sceglie la lingua per un valore {it, en}; lascia invariato tutto il resto. */
export const tr = (v, lang) =>
  v && typeof v === 'object' && !Array.isArray(v) && 'it' in v ? (v[lang] ?? v.it) : v;

export const icon = (name, cls = '') =>
  `<svg class="icon${cls ? ' ' + cls : ''}" aria-hidden="true" focusable="false"><use href="/assets/icons.svg#${name}"></use></svg>`;

/** <img> responsive per una foto ottimizzata da scripts/build-images.py */
export function photo(key, { sizes = '100vw', alt = '', cls = '', priority = false, style = '' } = {}) {
  const p = photos.photos[key];
  if (!p) throw new Error(`Foto sconosciuta: ${key}`);
  const srcset = p.sizes.map((s) => `/assets/img/photos/${key}-${s.tag}.webp ${s.w}w`).join(', ');
  const mid = p.sizes[Math.min(1, p.sizes.length - 1)];
  return `<img src="/assets/img/photos/${key}-${mid.tag}.webp" srcset="${srcset}" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="${esc(alt)}"${
    cls ? ` class="${cls}"` : ''
  }${style ? ` style="${style}"` : ''} ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

export const largestPhoto = (key) => {
  const p = photos.photos[key];
  const s = p.sizes[p.sizes.length - 1];
  return { src: `/assets/img/photos/${key}-${s.tag}.webp`, w: p.w, h: p.h };
};

export function cover(slug, { sizes = '320px', alt = '', cls = '', priority = false } = {}) {
  const side = photos.covers[slug].side;
  const big = Math.min(960, side);
  return `<img src="/assets/img/covers/${slug}-s.webp" srcset="/assets/img/covers/${slug}-s.webp 480w, /assets/img/covers/${slug}-l.webp ${big}w" sizes="${sizes}" width="${big}" height="${big}" alt="${esc(alt)}"${
    cls ? ` class="${cls}"` : ''
  } ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

/** Pulsanti "Ascolta su". Se l'album ha link diretti li usa, altrimenti la discografia dell'artista. */
export function streamChips(lang, album) {
  const d = album?.direct || {};
  const items = [
    { name: 'Spotify', href: d.spotify || LINKS.spotify, ico: 'spotify-logo' },
    { name: 'Apple Music', href: d.appleMusic || LINKS.appleMusic, ico: 'apple-logo' },
    ...(d.amazonMusic ? [{ name: 'Amazon Music', href: d.amazonMusic, ico: 'amazon-logo' }] : []),
    { name: 'YouTube', href: LINKS.youtubeMusic, ico: 'youtube-logo' },
  ];
  return `<ul class="chips" role="list">${items
    .map(
      (i) =>
        `<li><a class="chip" href="${esc(i.href)}" target="_blank" rel="noopener noreferrer">${icon(i.ico)}<span>${i.name}</span><span class="sr-only"> (${
          lang === 'en' ? 'opens in a new tab' : 'si apre in una nuova scheda'
        })</span></a></li>`
    )
    .join('')}</ul>`;
}

/** Video YouTube: miniatura locale + link. Il player (youtube-nocookie) si carica solo al click. */
export function video({ id, title }, lang, { cls = '' } = {}) {
  const ui = UI[lang];
  return `<figure class="video${cls ? ' ' + cls : ''}">
  <a class="video-play" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer" data-yt="${id}" aria-label="${esc(ui.play)}: ${esc(title)}">
    <img src="/assets/img/video/${id}.webp" width="960" height="540" alt="" loading="lazy" decoding="async">
    <span class="video-btn">${icon('play')}</span>
  </a>
  <figcaption>${esc(title)}</figcaption>
</figure>`;
}

export const socialLinks = () => [
  { name: 'Instagram', href: LINKS.instagram, ico: 'instagram-logo' },
  { name: 'YouTube', href: LINKS.youtube, ico: 'youtube-logo' },
  { name: 'Facebook', href: LINKS.facebook, ico: 'facebook-logo' },
];
