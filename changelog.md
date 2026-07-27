# Changelog

All notable changes to the Tidiane Ouattara website project.

---

## 2025-07-23 — Render Deployment Fix

### Fixed
- **DATABASE_URL not injected on Render** — `render.yaml` `fromDatabase` only works with Blueprint deploys. Set `DATABASE_URL` manually in Render dashboard → Environment tab using the database's Internal Database URL.

### Deployment Notes
- Python 3.14 was used despite `PYTHON_VERSION: "3.12"` in render.yaml — env var may not be taking effect
- First startup creates all tables via `Base.metadata.create_all` and seeds testimonials/books from JSON

---

## 2025-07-23 — Cloudinary Image Storage

### Changed
- **Replaced local file storage with Cloudinary** for all image uploads
  - Removed `fastapi-storages` dependency (`FileSystemStorage`, `ImageType`)
  - Added `cloudinary` Python SDK with env var credentials
  - Added `upload_to_cloudinary()` helper function at `backend/main.py:279`

### Database Model Changes (`backend/main.py`)
| Model | Old Column | New Column | Type |
|---|---|---|---|
| `GalleryPhoto` | `image_path` (ImageType) | `image_url` (String 1000) | Cloudinary secure URL |
| `Testimonial` | `image` (ImageType) | `image_url` (String 1000) | Cloudinary secure URL |
| `Book` | `cover_image` (ImageType) | `cover_image_url` (String 1000) | Cloudinary secure URL |
| `Book` | `cover_image_fr` (ImageType) | `cover_image_fr_url` (String 1000) | Cloudinary secure URL |

### API Changes
- `POST /api/gallery/upload` — now uploads to Cloudinary folder `tidiane/gallery`, returns `{"url": secure_url, "filename": str}` instead of local path
- `GET /api/gallery` — returns Cloudinary URLs in `src` field (no more local path conversion)
- `GET /api/testimonials` — returns Cloudinary URLs in `image` field
- `GET /api/books` — returns Cloudinary URLs in `cover_image` and `cover_image_fr` fields

### Startup Migration (`backend/main.py:226-231`)
- Added `ALTER TABLE` statements to migrate old `image_path`/`image`/`cover_image` columns to new `*_url` columns
- Migration runs on startup, silently skips if columns already exist

### Files Modified
- `backend/main.py` — complete refactor of storage, models, endpoints
- `backend/requirements.txt` — removed `fastapi-storages[sqlalchemy]>=0.4.0`, added `cloudinary>=1.36.0`
- `.env.example` — added `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

---

## 2025-07-23 — PostgreSQL Migration

### Changed
- **Migrated from SQLite to PostgreSQL** (asyncpg)
  - Removed `aiosqlite` dependency
  - Added `asyncpg>=0.29.0`
  - Removed all SQLite path logic (`_DB_DIR`, `_DB_PATH`, local file fallback)
  - `DATABASE_URL` is now required from environment variables

### Database Configuration (`backend/main.py:42-49`)
- `DATABASE_URL` must be set via env var (raises `RuntimeError` if missing)
- Auto-converts `postgresql://` → `postgresql+asyncpg://` for Render compatibility
- Added `pool_pre_ping=True` for connection health checks

### Render Deployment (`render.yaml`)
- Added `databases` section with free PostgreSQL instance (`tidiane-db`)
- `DATABASE_URL` auto-injected via `fromDatabase` property
- Added all Cloudinary and app env vars

### Startup Changes (`backend/main.py:226-231`)
- Removed SQLite `ALTER TABLE` migration code (clean start on PostgreSQL)
- Startup now just runs `Base.metadata.create_all` for schema initialization
- Seeding logic (testimonials.json, books.json) unchanged

### Files Modified
- `backend/main.py` — removed SQLite logic, added PostgreSQL config with auto-conversion
- `backend/requirements.txt` — replaced `aiosqlite>=0.20.0` with `asyncpg>=0.29.0`
- `render.yaml` — added database service, env vars, removed hardcoded `DATABASE_URL`
- `.env.example` — updated `DATABASE_URL` format to `postgresql+asyncpg://`

---

## 2025-07-23 — Frontend Stat Card Update

### Changed
- Updated "Years of Leadership" stat card from `30+` to `29+` to match the bio text ("29-year career")
- Updated experience subtitle from `30+ Years` to `29 Years`

### Files Modified
| File | Change |
|---|---|
| `index.html:89` | Stat number: `30+` → `29+` |
| `index.html:90` | Key renamed: `about.stat_30` → `about.stat_29` |
| `index.html:443` | Subtitle: `30+ Years` → `29 Years` |
| `partials/sheet-experience.html:8` | Subtitle: `30+ Years` → `29 Years` |
| `data/en.json:25` | Key renamed: `stat_30` → `stat_29` |
| `data/en.json:192` | Subtitle: `30+ Years` → `29 Years` |
| `data/fr.json:25` | Key renamed: `stat_30` → `stat_29` |
| `data/fr.json:192` | Subtitle: `30+ ans` → `29 ans` |
| `assets/js/main.js` | EN + FR keys and subtitles updated |

---

## Environment Variables Required

| Variable | Purpose | Set In |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Render dashboard (manual) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Render dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Render dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Render dashboard |
| `ADMIN_USERNAME` | Admin panel login | Render dashboard |
| `ADMIN_PASSWORD` | Admin panel password | Render dashboard |
| `SMTP_HOST` | Email SMTP host | Render dashboard |
| `SMTP_PORT` | Email SMTP port | Render dashboard |
| `SMTP_USER` | Email SMTP user | Render dashboard |
| `SMTP_PASSWORD` | Email SMTP password | Render dashboard |
| `CONTACT_TO` | Contact form recipient | Render dashboard |
| `CONTACT_FROM` | Contact form sender | Render dashboard |

---

## Dependencies (`backend/requirements.txt`)

```
fastapi>=0.110.0
uvicorn[standard]>=0.29.0
python-multipart>=0.0.9
python-dotenv>=1.0.0
pydantic[email]>=2.5.0
sqlalchemy>=2.0.0
asyncpg>=0.29.0
sqladmin>=0.19.0
cloudinary>=1.36.0
Pillow>=10.0.0
itsdangerous>=2.0.0
```

### Removed
- `aiosqlite>=0.20.0` — replaced by `asyncpg`
- `fastapi-storages[sqlalchemy]>=0.4.0` — replaced by `cloudinary`
