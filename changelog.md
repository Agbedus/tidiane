# Changelog

All notable changes to the H.E. Dr. Tidiane Ouattara landing page.

---

## v1.1.1 — Language Toggle Fix

**Date:** 2025-07-15

### Fixed

- **Language toggle not translating sheet overlays** — `loadSheetPartials()` and the initial `applyTranslations()` call both ran at script execution time, before `DOMContentLoaded` and before `loadTranslations()` completed. The `translations` object was still `{}`, so the initial call did nothing. Sheets were injected into the DOM but never translated on first load or on language switch. Moved `loadSheetPartials()` into the `DOMContentLoaded` handler (runs before `loadTranslations()`), and removed the orphaned standalone `applyTranslations()` call.
- **Icons destroyed during translation** — `applyTranslations()` used `el.textContent = value` which wiped out child `<i>` elements (e.g. location icons in event items). Updated to detect child `<i>` elements, preserve them, and append the translated text alongside.

---

## v1.1.0 — Mobile Responsiveness & Legibility

**Date:** 2025-07-15

### Fixed

- **Hero section clipped on desktop** — Changed `#hero` from `height: 95vh` to `min-height: 95vh` so buttons are never hidden behind the About section.
- **Cards section inline padding override** — Removed `style="padding:100px 80px;"` from `index.html` that overrode responsive CSS.
- **Hamburger menu had no visual feedback** — Added CSS transitions so the three spans animate into an X when the mobile nav is open (`.nav-toggle.open`).
- **Nav toggle JS incomplete** — Updated `toggleMobileNav()` to toggle `.open` class on the hamburger element alongside the menu visibility.
- **Touch targets too small on mobile** — Increased mobile nav link font-size to `.85rem` with `12px` vertical padding at the 480px breakpoint.
- **Timeline broke on small screens** — Collapsed to single-column layout below 480px (removed year sidebar and vertical line).
- **Hero portrait hidden on mobile** — Changed `.hero-right` from `display: none` to a visible 50vh/40vh container so the portrait appears on all screen sizes.

### Changed

- **Consistent horizontal padding across all sections on mobile** — Standardised to `16px` for both the 900px and 480px breakpoints. Previously ranged from `20px` to `32px` inconsistently across sections, nav, footer, and sheet body.
- **Body font-weight** — Increased from `300` to `400` for better legibility.
- **Body letter-spacing** — Added `letter-spacing: .015em` globally.
- **Body copy font sizes** — Bumped across the board:
  - `.about-text p`: `.95rem` → `1rem`
  - `.card-desc`: `.82rem` → `.88rem`
  - `.tl-desc`: `.88rem` → `.92rem`
  - `.sheet-exp-desc`: `.87rem` → `.92rem`
  - `.event-info-desc`: `.82rem` → `.88rem`
  - `.book-meta-desc`: `.82rem` → `.88rem`
  - `.contact-info p`: `.9rem` → `.95rem`
- **Section background variation** — Replaced uniform `--navy` across all sections with an alternating rhythm:

  | Section | Before | After |
  |---------|--------|-------|
  | Hero | `--navy` | `--navy` |
  | About | `--navy` | `--navy-deep` |
  | Cards | `--navy` | `--navy-mid` |
  | Experience | `--navy-mid` | `--navy-deep` |
  | Books | `--navy` | `--navy-mid` |
  | Contact | `--navy-mid` | `--navy` |

### Added

- New CSS token `--navy-deep: #071422` for darker section backgrounds.
- New `@media (max-width: 480px)` breakpoint with scaled typography, stacked CTA buttons, adjusted hero portrait height, and single-column timeline.

---

## v1.0.0 — Initial Release

**Date:** 2025-07-15

- Landing page for H.E. Dr. Tidiane Ouattara
- Hero section with name, title, bio, and two CTA buttons
- About section with stats cards
- Cards section (Events, Gallery, Career)
- Timeline section (career highlights)
- Books section (6 publications, EN/FR)
- Contact section with form
- Full-sheet overlays for Events, Photos, Experience, Author, Books
- English/French language toggle with i18n
- Scroll reveal animations
- Constellation and space-themed decorative elements
- Responsive breakpoint at 900px
