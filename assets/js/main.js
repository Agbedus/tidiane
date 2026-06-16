/* ── NAV scroll ─────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hero load animation ────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.body.classList.add('loaded'), 80);
});

/* ── Scroll reveal ──────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      if (e.target.classList.contains('reveal-stagger')) {
        e.target.querySelectorAll(':scope > *').forEach((child, i) => {
          child.style.setProperty('--i', i);
          child.classList.add('visible');
        });
      } else {
        e.target.classList.add('visible');
      }
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── Constellation blinking & path tracing ─────────────── */
function initConstellations() {
  document.querySelectorAll('.constellation-bg').forEach(bg => {
    const stars = bg.querySelectorAll('.constellation-star');
    const lines = bg.querySelectorAll('.constellation-line');

    // Each star twinkles independently at its own random rhythm
    stars.forEach(star => {
      const dur = 1.5 + Math.random() * 4;
      const delay = Math.random() * 8;
      star.style.setProperty('--blink-dur', dur + 's');
      star.style.setProperty('--blink-delay', delay + 's');
    });

    // Path tracing — set dasharray from path length, randomize trace cycle
    lines.forEach((line, i) => {
      const length = line.getTotalLength ? line.getTotalLength() : 200;
      line.style.setProperty('--path-length', length);
      line.style.setProperty('--trace-delay', (i * 1.2 + Math.random() * 2) + 's');
    });
  });
}
initConstellations();

/* ── Sheets ─────────────────────────────────────────────── */
let activeSheet = null;
function openSheet(id) {
  closeSheet();
  const sheet = document.getElementById('sheet-' + id);
  if (!sheet) return;
  activeSheet = sheet;
  document.getElementById('sheet-backdrop').classList.add('open');
  sheet.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSheet() {
  if (activeSheet) {
    activeSheet.classList.remove('open');
    activeSheet = null;
  }
  document.getElementById('sheet-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

/* ── Scroll to ──────────────────────────────────────────── */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Parallax on hero orbits ────────────────────────────── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-orbit').forEach((el, i) => {
    el.style.transform = `translateY(${y * (i === 0 ? 0.1 : -0.07)}px) rotate(${y * 0.03 * (i === 0 ? 1 : -1)}deg)`;
  });
});

/* ── Mobile nav ─────────────────────────────────────────── */
function toggleMobileNav() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const isOpen = links.style.display === 'flex';
  links.style.cssText = isOpen ? '' : `
    display:flex; flex-direction:column; position:fixed;
    top:68px; left:0; right:0;
    background:rgba(11,25,41,.97); backdrop-filter:blur(12px);
    padding:32px; gap:20px; border-bottom:1px solid var(--border);
    z-index:999;
  `;
}

/* ── Load sheet partials ────────────────────────────────── */
const SHEETS = ['events', 'photos', 'experience', 'books'];
function loadSheetPartials() {
  const container = document.getElementById('sheets-container');
  if (!container) return;
  for (const id of SHEETS) {
    const tmpl = document.getElementById(`tmpl-sheet-${id}`);
    if (!tmpl) continue;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = tmpl.innerHTML;
    container.appendChild(wrapper.firstElementChild);
  }
}

loadSheetPartials();
