#!/usr/bin/env node
// Generatore statico senza dipendenze: legge src/ e scrive il sito finito in dist/.
//   node build.mjs            costruisce dist/
// Variabile opzionale: SITE_URL (default https://www.giovanniseneca.it), usata per canonical e sitemap.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { SITE } from './src/data.mjs';
import { layout } from './src/layout.mjs';
import { allPages, notFound } from './src/pages.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const write = (rel, content) => {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const hash = (buf) => crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// 1) Asset statici (immagini, font, favicon). CSS e JS vengono trattati a parte (nome con hash).
fs.cpSync(path.join(SRC, 'static'), path.join(DIST, 'assets'), {
  recursive: true,
  filter: (p) => !/[\\/]static[\\/](css|js)([\\/]|$)/.test(p),
});

// 2) CSS e JS con hash nel nome, così la cache resta valida finché non cambiano.
const css = fs.readFileSync(path.join(SRC, 'static/css/main.css'));
const js = fs.readFileSync(path.join(SRC, 'static/js/main.js'));
const assets = { css: `/assets/css/main.${hash(css)}.css`, js: `/assets/js/main.${hash(js)}.js` };
write(assets.css.slice(1), css);
write(assets.js.slice(1), js);

// 3) Sprite delle icone (Phosphor, licenza MIT): un <symbol> per file in src/icons
const iconsDir = path.join(SRC, 'icons');
const symbols = fs
  .readdirSync(iconsDir)
  .filter((f) => f.endsWith('.svg'))
  .map((f) => {
    const svg = fs.readFileSync(path.join(iconsDir, f), 'utf8');
    const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 256 256';
    return `<symbol id="${f.replace(/\.svg$/, '')}" viewBox="${viewBox}" fill="currentColor">${inner}</symbol>`;
  })
  .join('');
write('assets/icons.svg', `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`);

// 4) Pagine
const pages = allPages();
for (const p of pages) {
  const html = layout(p, assets);
  const out = p.path.endsWith('/') ? `${p.path.slice(1)}index.html` : p.path.slice(1);
  write(out, html);
}
{
  const nf = notFound();
  const html = layout(nf, assets)
    .replace(/<link rel="canonical"[^>]*>\n/, '')
    .replace(/<link rel="alternate"[^>]*>\n/g, '')
    .replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n<meta name="viewport"');
  write('404.html', html);
}

// 5) Sitemap e robots
const today = new Date().toISOString().slice(0, 10);
const byKey = new Map();
for (const p of pages) byKey.set(`${p.lang}:${p.path}`, p);
const urls = pages
  .map((p) => {
    const alt = byKey.get(`${p.lang === 'it' ? 'en' : 'it'}:${p.altPath}`);
    const itPath = p.lang === 'it' ? p.path : p.altPath;
    const enPath = p.lang === 'en' ? p.path : p.altPath;
    return `<url><loc>${SITE.url}${p.path}</loc><lastmod>${today}</lastmod>${
      alt
        ? `<xhtml:link rel="alternate" hreflang="it" href="${SITE.url}${itPath}"/><xhtml:link rel="alternate" hreflang="en" href="${SITE.url}${enPath}"/><xhtml:link rel="alternate" hreflang="x-default" href="${SITE.url}${itPath}"/>`
        : ''
    }</url>`;
  })
  .join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

console.log(`Costruite ${pages.length} pagine + 404 in dist/ (${assets.css}, ${assets.js})`);
