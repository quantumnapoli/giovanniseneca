/* Giovanni Seneca: comportamenti del sito. Nessuna dipendenza, nessun listener sullo scroll della finestra. */
(() => {
  const d = document;
  const root = d.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: sfondo solido quando la pagina non è più in cima (IntersectionObserver su un sentinella) */
  const header = d.querySelector('[data-header]');
  if (header && 'IntersectionObserver' in window) {
    const sentinel = d.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
    sentinel.setAttribute('aria-hidden', 'true');
    d.body.prepend(sentinel);
    new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting)).observe(sentinel);
  }

  /* Menu mobile */
  const menuBtn = d.querySelector('[data-menu]');
  if (menuBtn) {
    const label = menuBtn.querySelector('[data-menu-label]');
    const setMenu = (open) => {
      root.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? label.dataset.close : label.dataset.open;
    };
    menuBtn.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('menu-open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    d.querySelector('#nav')?.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
    matchMedia('(min-width: 900px)').addEventListener('change', (m) => m.matches && setMenu(false));
  }

  /* Evidenzia nel menu la sezione che si sta leggendo (IntersectionObserver) */
  const sections = [...d.querySelectorAll('[data-section]')];
  const navLinks = [...d.querySelectorAll('.nav a[href*="#"]:not(.btn)')];
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const setCurrent = (id) =>
      navLinks.forEach((a) => {
        if (a.hash === `#${id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    // fuori da tutte le sezioni (hero in cima, footer) nessuna voce attiva
    const hero = d.querySelector('.hero');
    if (hero) new IntersectionObserver(([e]) => e.isIntersecting && setCurrent('')).observe(hero);
  }

  /* Cambio lingua: resta sulla stessa sezione (gli id cambiano da una lingua all'altra) */
  const lang = d.querySelector('.lang');
  if (lang && sections.length) {
    const MAP = { biografia: 'biography', biography: 'biografia', progetti: 'projects', projects: 'progetti', album: 'albums', albums: 'album', gallery: 'gallery', booking: 'booking' };
    lang.addEventListener('click', () => {
      const current = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= innerHeight * 0.45 && r.bottom >= innerHeight * 0.45;
      });
      const target = current && MAP[current.id];
      if (target) lang.href = lang.getAttribute('href').split('#')[0] + '#' + target;
    });
  }

  /* Video YouTube: il player si carica solo al click (youtube-nocookie, nessun cookie prima) */
  d.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-yt]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const f = d.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${a.dataset.yt}?autoplay=1&rel=0&playsinline=1`;
    f.title = a.getAttribute('aria-label') || 'Video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    const box = d.createElement('div');
    box.className = 'video-play is-playing';
    box.append(f);
    a.replaceWith(box);
    f.focus();
  });

  /* Copia email */
  d.querySelectorAll('[data-copy]').forEach((btn) => {
    const span = btn.querySelector('span');
    const original = span ? span.textContent : '';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        if (span) span.textContent = btn.dataset.done;
        setTimeout(() => span && (span.textContent = original), 2200);
      } catch {
        /* l'indirizzo resta visibile e selezionabile */
      }
    });
  });

  /* Lightbox della gallery (elemento <dialog> nativo) */
  const dlg = d.querySelector('[data-lightbox-dialog]');
  if (dlg && typeof dlg.showModal === 'function') {
    const links = [...d.querySelectorAll('[data-lightbox]')];
    const img = dlg.querySelector('.lb-img');
    const cap = dlg.querySelector('.lb-cap');
    let i = 0;
    const show = (n) => {
      i = (n + links.length) % links.length;
      const a = links[i];
      img.src = a.href;
      img.alt = a.dataset.alt || '';
      img.width = +a.dataset.w;
      img.height = +a.dataset.h;
      cap.textContent = a.dataset.caption || '';
      [1, -1].forEach((k) => {
        const n2 = links[(i + k + links.length) % links.length];
        new Image().src = n2.href; // precarica le vicine
      });
    };
    links.forEach((a, n) =>
      a.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        show(n);
        dlg.showModal();
      })
    );
    dlg.querySelector('[data-lb-close]').addEventListener('click', () => dlg.close());
    dlg.querySelector('[data-lb-prev]').addEventListener('click', () => show(i - 1));
    dlg.querySelector('[data-lb-next]').addEventListener('click', () => show(i + 1));
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg || e.target.classList.contains('lb-fig')) dlg.close();
    });
    let x0 = null;
    dlg.addEventListener('pointerdown', (e) => (x0 = e.clientX));
    dlg.addEventListener('pointerup', (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 60) show(i + (dx < 0 ? 1 : -1));
    });
  }

  /* =======================================================================
     GSAP: ogni animazione racconta qualcosa (ingresso, lettura, cambio sezione).
     Con "riduci movimento" attivo non parte nulla.
     ======================================================================= */
  const g = window.gsap;
  const ST = window.ScrollTrigger;
  const Split = window.SplitText;
  if (!g || !ST) {
    root.classList.remove('motion-ok');
    return;
  }
  g.registerPlugin(ST, ...(Split ? [Split] : []));
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const split = (el, opts) => (Split ? Split.create(el, opts) : null);
  const fontsReady = Promise.race([d.fonts ? d.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1500))]);

  fontsReady.then(() => {
    const mm = g.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /* Hero: la foto emerge dal buio, il nome sale lettera per lettera */
      const hero = d.querySelector('.hero');
      if (hero) {
        const img = hero.querySelector('.hero-img');
        const inner = hero.querySelector('.hero-inner');
        const row = d.querySelector('.site-header .header-row');
        g.set([img, inner, row], { visibility: 'visible' });
        const chars = $$('.hero-title .line', hero).flatMap((l) => (split(l, { type: 'chars', charsClass: 'ch' }) || { chars: [] }).chars);
        g.timeline({ defaults: { ease: 'expo.out' } })
          .from(img, { scale: 1.18, opacity: 0, duration: 2.4 })
          .from(chars, { yPercent: 115, rotate: 5, duration: 1.5, stagger: 0.035 }, 0.15)
          .from($$('.hero-role, .hero-lead, .hero-cta > *', hero), { y: 28, opacity: 0, duration: 1.2, stagger: 0.09 }, 0.75)
          .from(row, { y: -24, opacity: 0, duration: 1 }, 0.9);
        // allo scroll la foto scende piano e il testo si allontana
        g.to(img, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
        g.to(inner, { yPercent: -22, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      }

      /* Scheda album: copertina e titolo entrano insieme */
      const ah = d.querySelector('.album-hero');
      if (ah) {
        g.set(ah, { visibility: 'visible' });
        const t = ah.querySelector('.album-title');
        const s = t && split(t, { type: 'lines,chars', mask: 'lines', charsClass: 'ch' });
        g.timeline({ defaults: { ease: 'expo.out' } })
          .from(ah.querySelector('.album-cover img'), { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.12, duration: 1.6 })
          .from(s ? s.chars : t, { yPercent: 110, duration: 1.3, stagger: 0.03 }, 0.2)
          .from($$('.album-info > :not(.album-title)', ah), { y: 22, opacity: 0, duration: 1, stagger: 0.07 }, 0.45);
      }

      /* Titoli delle sezioni: le lettere salgono quando la sezione arriva */
      $$('.sec-title').forEach((t) => {
        const s = split(t, { type: 'lines,chars', mask: 'lines', charsClass: 'ch' });
        if (!s) return;
        g.from(s.chars, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.03, scrollTrigger: { trigger: t, start: 'top 88%', once: true } });
      });

      /* La frase su Morricone si accende parola per parola mentre la leggi */
      $$('.statement-text').forEach((t) => {
        const s = split(t, { type: 'words' });
        if (!s) return;
        g.fromTo(s.words, { opacity: 0.14 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: t, start: 'top 80%', end: 'bottom 42%', scrub: true } });
      });

      /* Sezioni colorate: si aprono come un sipario */
      $$('[data-curtain]').forEach((sec) => {
        g.fromTo(sec, { clipPath: 'inset(56px 3.5% 0px 3.5% round 48px)' }, { clipPath: 'inset(0px 0% 0px 0% round 0px)', ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 20%', scrub: true } });
      });

      /* Foto in cornice: parallasse interno */
      $$('.bio-photo img, .statement-photo img, .booking-photo img').forEach((img) => {
        g.fromTo(img, { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      /* Video dei progetti: la cornice si apre mentre scorri */
      $$('.project-media .video-play, .album-video .video-play').forEach((v) => {
        g.fromTo(v, { clipPath: 'inset(16% 9% 16% 9% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: v, start: 'top 96%', end: 'top 45%', scrub: true } });
      });

      /* Nastro delle città: scorre sempre, accelera quando scorri la pagina */
      const mq = d.querySelector('.marquee');
      if (mq) {
        const loop = g.to(mq, { xPercent: -50, ease: 'none', duration: 48, repeat: -1 });
        ST.create({
          trigger: '.cities',
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 160, 7);
            if (v < 0.3) return;
            loop.timeScale(1 + v);
            g.to(loop, { timeScale: 1, duration: 1.4, ease: 'power3.out', overwrite: true });
          },
        });
        g.fromTo('.marquee-band', { rotate: -5 }, { rotate: -1, ease: 'none', scrollTrigger: { trigger: '.cities', start: 'top bottom', end: 'bottom top', scrub: true } });
      }

      /* Elenchi che entrano a gruppi: album, foto, formazioni */
      const groupIn = (sel, from) => {
        const els = $$(sel);
        if (!els.length) return;
        g.set(els, from);
        ST.batch(els, {
          start: 'top 90%',
          once: true,
          onEnter: (b) => g.to(b, { y: 0, x: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
        });
      };
      groupIn('.mosaic-item', { y: 70, opacity: 0, rotate: (i) => (i % 2 ? 2.5 : -2.5) });
      groupIn('.g-item', { y: 50, opacity: 0, scale: 0.96 });
      groupIn('.formation-list li', { x: -40, opacity: 0 });
      groupIn('.spec dl > div', { y: 24, opacity: 0 });

      /* Pulsanti play "magnetici" (solo con il mouse) */
      if (matchMedia('(pointer: fine)').matches) {
        $$('.video-play').forEach((a) => {
          const b = a.querySelector('.video-btn');
          if (!b) return;
          const xTo = g.quickTo(b, 'x', { duration: 0.6, ease: 'power3' });
          const yTo = g.quickTo(b, 'y', { duration: 0.6, ease: 'power3' });
          a.addEventListener('pointermove', (e) => {
            const r = a.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.22);
            yTo((e.clientY - r.top - r.height / 2) * 0.22);
          });
          a.addEventListener('pointerenter', () => g.to(b, { scale: 1.12, duration: 0.4 }));
          a.addEventListener('pointerleave', () => {
            xTo(0);
            yTo(0);
            g.to(b, { scale: 1, duration: 0.4 });
          });
        });
      }
    });
    root.classList.remove('motion-ok');
    ST.refresh();
  });
})();
