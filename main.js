/* ============================================
   PORTFOLIO — Emanuel Medran Studio
   main.js
   ============================================ */

/* ============================================
   PRELOADER
   ============================================ */
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('exit');
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
    }, 1200);
  }, 2400);
});

document.body.style.overflow = 'hidden';

/* ============================================
   THEME TOGGLE
   ============================================ */
const themeToggle = document.getElementById('theme-toggle');
const html        = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

/* ============================================
   CUSTOM CURSOR — theme-aware (no green hardcode)
   ============================================ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});

function animateRing() {
  rx += (mx - rx - 20) * 0.12;
  ry += (my - ry - 20) * 0.12;
  ring.style.transform = `translate(${rx}px, ${ry}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .process-step, .tool-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width       = '60px';
    ring.style.height      = '60px';
    ring.style.borderColor = getCSSVar('--cursor-dot');
  });
  el.addEventListener('mouseleave', () => {
    ring.style.borderColor = getCSSVar('--cursor-border');
    ring.style.width       = '40px';
    ring.style.height      = '40px';
  });
});

/* ============================================
   SCROLL REVEAL
   ============================================ */
const reveals        = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* ============================================
   PARALLAX ON SCROLL
   ============================================ */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY  = window.scrollY;
      const heroBg   = document.querySelector('.hero-bg');
      const heroGrid = document.querySelector('.hero-grid');
      if (heroBg)   heroBg.style.transform  = `translateY(${scrollY * 0.3}px)`;
      if (heroGrid) heroGrid.style.transform = `translateY(${scrollY * 0.15}px)`;
      ticking = false;
    });
    ticking = true;
  }
});

/* ============================================
   NAV: GLASSMORPHISM ON SCROLL (theme-aware)
   ============================================ */
const nav = document.querySelector('nav');

function updateNav() {
  const isLight = html.getAttribute('data-theme') === 'light';
  if (window.scrollY > 80) {
    nav.style.background     = isLight ? '#eeecea' : '#080808f5';
    nav.style.borderBottom   = isLight ? '1px solid #00000012' : '1px solid #ffffff0d';
    nav.style.backdropFilter = 'blur(24px)';
    nav.style.boxShadow      = isLight ? '0 1px 32px #0000000f' : '0 1px 32px #00000066';
  } else {
    nav.style.background     = '';
    nav.style.backdropFilter = '';
    nav.style.borderBottom   = '';
    nav.style.boxShadow      = '';
  }
}

window.addEventListener('scroll', updateNav, { passive: true });

const themeObserver = new MutationObserver(updateNav);
themeObserver.observe(html, { attributes: true, attributeFilter: ['data-theme'] });

/* ============================================
   HERO STAT: NUMBER COUNTER ANIMATION
   ============================================ */
const statNum = document.querySelector('.hero-stat-num');
let counted   = false;

const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    const start    = 2000;
    const end      = 2026;
    const duration = 1000;
    const stepTime = duration / (end - start);
    let count = start;
    const counter = setInterval(() => {
      statNum.textContent = count;
      count++;
      if (count > end) clearInterval(counter);
    }, stepTime);
  }
});

if (statNum) heroObserver.observe(statNum);

/* ============================================
   TOOLS: MAGNETIC HOVER EFFECT
   ============================================ */
document.querySelectorAll('.tool-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / rect.width  * 8;
    const dy   = (e.clientY - cy) / rect.height * 8;
    item.style.transform = `translateY(-3px) translate(${dx}px, ${dy}px) scale(1.01)`;
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});