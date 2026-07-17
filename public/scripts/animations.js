import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================
// LENIS SMOOTH SCROLL
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync Lenis with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// ============================================================
// PAGE LOAD ANIMATIONS
// ============================================================
function initPageLoadAnimations() {
  if (prefersReducedMotion) return;

  // Hero text fadeUp
  const heroText = document.querySelector('[data-animate="hero-text"]');
  if (heroText) {
    gsap.fromTo(heroText,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }

  // Hero image scale
  const heroImage = document.querySelector('[data-animate="hero-image"]');
  if (heroImage) {
    gsap.fromTo(heroImage,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 }
    );
  }

  // Trust bar slide-in
  const trustBar = document.querySelector('[data-animate="trust-bar"]');
  if (trustBar) {
    gsap.fromTo(trustBar,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 }
    );
  }

  // Header fade-down
  const header = document.querySelector('header');
  if (header) {
    gsap.fromTo(header,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }
}

// ============================================================
// SCROLL-DRIVEN ANIMATIONS
// ============================================================
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  // Section fadeUp
  gsap.utils.toArray('[data-animate="fadeUp"]').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Card stagger
  gsap.utils.toArray('[data-animate="stagger"]').forEach((container) => {
    const cards = container.children;
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });

  // Counter animation
  gsap.utils.toArray('[data-animate="counter"]').forEach((el) => {
    const target = parseInt(el.dataset.target || el.textContent.replace(/[^0-9]/g, ''), 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        onUpdate: function() {
          el.textContent = prefix + Math.round(this.targets()[0].textContent).toLocaleString('tr-TR') + suffix;
        },
      }
    );
  });

  // Parallax images
  gsap.utils.toArray('[data-animate="parallax"]').forEach((el) => {
    gsap.fromTo(el,
      { y: -30 },
      {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });

  // Process steps progress
  gsap.utils.toArray('[data-animate="progress"]').forEach((el) => {
    gsap.fromTo(el,
      { width: '0%' },
      {
        width: '100%',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          once: true,
        },
      }
    );
  });

  // Footer slide-up
  const footer = document.querySelector('footer');
  if (footer) {
    gsap.fromTo(footer,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          once: true,
        },
      }
    );
  }
}

// ============================================================
// HOVER INTERACTIONS
// ============================================================
function initHoverAnimations() {
  if (prefersReducedMotion) return;

  // Button scale on hover
  document.querySelectorAll('[data-hover="scale"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });

  // Card lift on hover
  document.querySelectorAll('[data-hover="lift"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { y: -4, boxShadow: '0 12px 24px -4px rgb(0 0 0 / 0.12)', duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { y: 0, boxShadow: '0 4px 12px -2px rgb(0 0 0 / 0.08)', duration: 0.3, ease: 'power2.out' });
    });
  });

  // Image zoom on hover
  document.querySelectorAll('[data-hover="zoom"]').forEach((el) => {
    const img = el.querySelector('img');
    if (!img) return;
    el.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initPageLoadAnimations();
  initScrollAnimations();
  initHoverAnimations();
});