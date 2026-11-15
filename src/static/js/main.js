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
})();
