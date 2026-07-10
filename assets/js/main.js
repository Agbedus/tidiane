/* ── Internationalization (i18n) ───────────────────────── */
let currentLang = localStorage.getItem('tidiane-lang') || 'en';
let translations = {};

async function loadTranslations(lang) {
  try {
    const res = await fetch(`/api/translations/${lang}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    translations = await res.json();
    currentLang = lang;
    localStorage.setItem('tidiane-lang', lang);
    applyTranslations();
    updateLangToggle();
    updateHtmlLang();
  } catch (err) {
    console.error('Failed to load translations:', err);
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(translations, key);
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = getNestedValue(translations, key);
    if (value) el.placeholder = value;
  });
}

function updateLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function updateHtmlLang() {
  document.documentElement.lang = currentLang;
}

document.addEventListener('DOMContentLoaded', () => {
  loadTranslations(currentLang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => loadTranslations(btn.dataset.lang));
  });
});

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

/* ── Sheet sub-tabs ──────────────────────────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.sheet-subtab');
  if (!btn) return;
  const sheet = btn.closest('.sheet');
  if (!sheet) return;
  sheet.querySelectorAll('.sheet-subtab').forEach(b => b.classList.remove('active'));
  sheet.querySelectorAll('.subtab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = sheet.querySelector('#subtab-' + btn.dataset.subtab);
  if (panel) panel.classList.add('active');
});

/* ── Load sheet partials ────────────────────────────────── */
const SHEETS = ['events', 'photos', 'experience', 'author'];
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

/* ── Contact form ───────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
const feedback = document.getElementById('cf-feedback');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('cf-submit');
    const origText = btn.textContent;
    btn.textContent = getNestedValue(translations, 'contact.form_sending') || 'Sending…';
    btn.disabled = true;

    const payload = {
      name: document.getElementById('cf-name').value,
      organisation: document.getElementById('cf-org').value,
      email: document.getElementById('cf-email').value,
      message: document.getElementById('cf-message').value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      feedback.style.display = 'block';
      feedback.style.color = data.success ? 'var(--gold)' : '#e74c3c';
      feedback.textContent = data.detail;
      if (data.success) contactForm.reset();
    } catch {
      feedback.style.display = 'block';
      feedback.style.color = '#e74c3c';
      feedback.textContent = getNestedValue(translations, 'contact.form_error') || 'Could not reach the server. Please try again later.';
    } finally {
      btn.textContent = origText;
      btn.disabled = false;
    }
  });
}
