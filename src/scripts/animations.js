import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================
// LENIS SMOOTH SCROLL
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis;

if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
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
// UTILITY FUNCTIONS
// ============================================================
const getValue = (el, attr, fallback) => {
  const val = el.getAttribute(attr);
  return val !== null ? val : fallback;
};

// ============================================================
// HERO SECTION ANIMATIONS
// ============================================================
function initHeroAnimations() {
  if (prefersReducedMotion) return;

  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const ctx = gsap.context(() => {
    // --- Particle System ---
    initHeroParticles(hero);

    // --- Split Text Headline Animation ---
    const splitHeadlines = hero.querySelectorAll('[data-gsap-split="lines"]');
    splitHeadlines.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50, rotationX: -15, transformOrigin: 'center bottom' },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: parseFloat(getValue(el, 'data-gsap-delay', '0.2')),
        }
      );
    });

    // --- Fade Up Animations ---
    hero.querySelectorAll('[data-gsap="fadeUp"]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: parseFloat(getValue(el, 'data-gsap-delay', '0')),
        }
      );
    });

    // --- Fade Right Animations ---
    hero.querySelectorAll('[data-gsap="fadeRight"]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: parseFloat(getValue(el, 'data-gsap-delay', '0')),
        }
      );
    });

    // --- Stagger Container Animations ---
    hero.querySelectorAll('[data-gsap="stagger"]').forEach((container) => {
      const children = Array.from(container.querySelectorAll(':scope > *:not(script):not(style)'));
      if (children.length === 0) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: parseFloat(getValue(container, 'data-gsap-delay', '0')),
        }
      );
    });

    // --- Split Lines (Text Reveal) ---
    hero.querySelectorAll('[data-gsap="splitLines"]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: '30%' },
        {
          opacity: 1,
          y: '0%',
          duration: 1,
          ease: 'power3.out',
          delay: parseFloat(getValue(el, 'data-gsap-delay', '0')),
        }
      );
    });

    // --- Counter Animation ---
    hero.querySelectorAll('[data-gsap="counter"]').forEach((el) => {
      const target = parseFloat(getValue(el, 'data-target', '0'));
      const duration = parseFloat(getValue(el, 'data-duration', '2'));
      const prefix = getValue(el, 'data-prefix', '');
      const suffix = getValue(el, 'data-suffix', '');
      const decimals = parseInt(getValue(el, 'data-decimals', target % 1 === 0 ? '0' : '1'), 10);

      gsap.to(
        { val: 0 },
        {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix;
          },
        }
      );
    });

    // --- Float Animation ---
    hero.querySelectorAll('[data-gsap="float"]').forEach((el) => {
      gsap.to(el, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: parseFloat(getValue(el, 'data-gsap-delay', '0')),
      });
    });

    // --- Image Reveal ---
    hero.querySelectorAll('[data-gsap="reveal"]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
          delay: 0.3,
        }
      );
    });

    // --- Parallax on Scroll (Lenis-synced) ---
    hero.querySelectorAll('[data-gsap="parallax"]').forEach((el) => {
      const speed = parseFloat(getValue(el, 'data-gsap-speed', '0.3'));

      if (lenis) {
        lenis.on('scroll', () => {
          const rect = el.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const progress = 1 - rect.top / (viewportHeight + rect.height);
          gsap.set(el, { y: progress * speed * 100 });
        });
      } else {
        gsap.to(el, {
          yPercent: 30 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
  }, hero);

  // Cleanup on unmount (if needed for SPA)
  return () => ctx.revert();
}

// ============================================================
// HERO PARTICLE SYSTEM
// ============================================================
function initHeroParticles(hero) {
  const container = hero.querySelector('#hero-particles');
  if (!container) return;

  const particleCount = 30;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.5 ? 'rgba(14,116,144,0.15)' : 'rgba(56,189,248,0.1)'};
      border-radius: 50%;
      left: ${startX}%;
      top: ${startY}%;
      pointer-events: none;
      will-change: transform, opacity;
    `;

    container.appendChild(particle);
    particles.push({ el: particle, size, duration, delay });

    // Animate with GSAP
    gsap.to(particle, {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      scale: Math.random() * 0.5 + 0.5,
      opacity: 0,
      duration,
      delay,
      ease: 'none',
      repeat: -1,
      onRepeat: () => {
        gsap.set(particle, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: Math.random() * 0.5 + 0.3,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        });
      },
    });
  }
}

// ============================================================
// PAGE LOAD ANIMATIONS
// ============================================================
function initPageLoadAnimations() {
  if (prefersReducedMotion) return;

  // Hero text fadeUp (fallback for non-hero pages)
  const heroText = document.querySelector('[data-animate="hero-text"]');
  if (heroText) {
    gsap.fromTo(
      heroText,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }

  // Hero image scale
  const heroImage = document.querySelector('[data-animate="hero-image"]');
  if (heroImage) {
    gsap.fromTo(
      heroImage,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 }
    );
  }

  // Trust bar slide-in
  const trustBar = document.querySelector('[data-animate="trust-bar"]');
  if (trustBar) {
    gsap.fromTo(
      trustBar,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 }
    );
  }

  // Header fade-down
  const header = document.querySelector('header');
  if (header) {
    gsap.fromTo(
      header,
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
    gsap.fromTo(
      el,
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

    gsap.fromTo(
      cards,
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

    gsap.fromTo(
      el,
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
        onUpdate: function () {
          el.textContent = prefix + Math.round(this.targets()[0].textContent).toLocaleString('tr-TR') + suffix;
        },
      }
    );
  });

  // Parallax images
  gsap.utils.toArray('[data-animate="parallax"]').forEach((el) => {
    gsap.fromTo(
      el,
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
    gsap.fromTo(
      el,
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
    gsap.fromTo(
      footer,
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
// PRESS SLIDER (from PressSlider.astro)
// ============================================================
function initPressSlider() {
  const track = document.getElementById('press-track');
  const prev = document.getElementById('press-prev');
  const next = document.getElementById('press-next');
  if (!track || !prev || !next) return;

  const offset = parseInt(track.dataset.offset || '2', 10);
  const cards = track.querySelectorAll('[data-press-index]');
  const cardCount = cards.length;
  const realCount = cardCount - 4;

  let currentIndex = offset;
  let isScrolling = false;

  const updatePosition = (instant = false) => {
    const card = cards[currentIndex];
    if (!card) return;
    const w = card.offsetWidth + 24;
    const target = currentIndex * w;
    if (instant) {
      track.scrollLeft = target;
    } else {
      track.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  const loop = () => {
    if (currentIndex >= realCount + offset) {
      currentIndex = offset;
      updatePosition(true);
    } else if (currentIndex < offset) {
      currentIndex = realCount + offset - 1;
      updatePosition(true);
    }
  };

  const scroll = (dir) => {
    if (isScrolling) return;
    currentIndex += dir;
    isScrolling = true;
    updatePosition();
    setTimeout(() => {
      loop();
      isScrolling = false;
    }, 400);
  };

  prev.addEventListener('click', () => scroll(-1));
  next.addEventListener('click', () => scroll(1));

  // Handle scroll end to auto-loop on drag
  track.addEventListener('scroll', () => {
    if (isScrolling) return;
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (scrollLeft <= 10) {
      currentIndex = realCount + offset - 1;
      updatePosition(true);
    } else if (scrollLeft >= maxScroll - 10) {
      currentIndex = offset;
      updatePosition(true);
    }
  });

  // Touch / mouse drag
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('cursor-grabbing');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('cursor-grabbing');
  });
  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('cursor-grabbing');
  });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Initial position
  updatePosition(true);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initPageLoadAnimations();
  initScrollAnimations();
  initHoverAnimations();
  initPressSlider();
});