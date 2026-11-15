# Giovanni Seneca

Sito di Giovanni Seneca, chitarrista e compositore. Onepage bilingue (italiano `/`, inglese `/en/`) con una scheda dedicata per ognuno dei sei album.

Statico, senza framework: uno script Node (`build.mjs`) genera tutto in `dist/`. Nessuna dipendenza da installare.

## Comandi

```bash
npm run build     # genera dist/
npm run dev       # build + server locale su http://localhost:4173
npm run images    # rigenera foto, copertine e video ottimizzati (serve Pillow e ffmpeg)
```

## Dove si modifica cosa

| Cosa | Dove |
| --- | --- |
| Testi, link streaming, social, contatti, album, progetti, foto della gallery (IT/EN) | `src/data.mjs` |
| Struttura delle sezioni e delle schede album | `src/pages.mjs` |
| Header, footer, meta tag | `src/layout.mjs` |
| Aspetto | `src/static/css/main.css` |
| Menu, lightbox, video | `src/static/js/main.js` |

### Aggiungere una foto alla gallery

1. Aggiungi l'originale all'elenco `PHOTOS` in `scripts/build-images.py` (le foto attuali arrivano dalla libreria media del vecchio sito WordPress).
2. Esegui `npm run images`.
3. Aggiungi la voce in `GALLERY` dentro `src/data.mjs` con testo alternativo in italiano e inglese.

### Aggiornare i link di ascolto

I link a Spotify, Apple Music e YouTube stanno in `LINKS` (`src/data.mjs`). Margini Abitabili ha in più i link diretti al disco (`direct`).

## Pubblicazione

Netlify: build `node build.mjs`, cartella `dist` (vedi `netlify.toml`). Il file contiene anche i redirect 301 dai vecchi indirizzi WordPress (`/biography`, `/i-progetti`, `/albums/...`) verso le nuove sezioni.

`SITE_URL` (variabile d'ambiente, default `https://www.giovanniseneca.it`) decide l'indirizzo usato in canonical, sitemap e anteprime social.

## Crediti

Animazioni con GSAP 3.13 (ScrollTrigger, SplitText) in `src/static/js/vendor/`, configurate in fondo a `main.js` e disattivate con "riduci movimento". I colori delle sezioni (cobalto, calce, limone) sono temi CSS in fondo a `main.css`.

Font Bodoni Moda e Hanken Grotesk (SIL OFL), icone Phosphor (MIT), self-hosted. Nessun tracciamento: i video YouTube si caricano solo al click, tramite `youtube-nocookie.com`.
