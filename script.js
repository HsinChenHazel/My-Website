/* ================================================================
   HAZEL CHEN — PORTFOLIO · script.js
   ================================================================ */

/* ——— Custom Cursor ——— */
function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  /* ——— Cursor position ——— */
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  /* ——— Hover scale ——— */
  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

/* ——— Scroll reveal ——— */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => io.observe(el));
}

/* ——— Nav scroll ——— */
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ——— Page transitions ——— */
function initTransitions() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  document.querySelectorAll('a[href]').forEach(link => {
    if (
      link.hostname === location.hostname &&
      !link.href.includes('#') &&
      link.getAttribute('target') !== '_blank' &&
      !link.href.includes('mailto')
    ) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.href;
        overlay.classList.add('active');
        setTimeout(() => { window.location.href = href; }, 420);
      });
    }
  });
}

/* ——— Hero entrance ——— */
function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const badge    = hero.querySelector('.availability-badge');
  const lines    = hero.querySelectorAll('.hero h1 .line span');
  const subtitle = hero.querySelector('.hero-subtitle p');
  const scroll   = hero.querySelector('.hero-scroll');

  const items = [badge, ...lines, subtitle, scroll].filter(Boolean);

  items.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(36px)';
    el.style.transition = `opacity 1s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.11}s,
                            transform 1s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.11}s`;
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    items.forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  }));
}

/* ——— Fade in on load ——— */
window.addEventListener('pageshow', () => {
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    overlay.style.transition = 'none';
    overlay.classList.remove('active');
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.4s ease';
    });
  }
});

/* ——— Boot ——— */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  initCursor();
  initNav();
  initReveal();
  initTransitions();
  initHero();
});
