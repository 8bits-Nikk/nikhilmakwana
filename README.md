# nikhilmakwana.in

Personal portfolio site for **Nikhil Makwana** — a single-page React app built with
Vite, TypeScript and Tailwind CSS v4, served as static files by nginx in Docker.

Migrated from the previous Next.js 13 App Router version (`../nikhilmakwana`).

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check + static bundle -> ./dist
npm run preview  # serve ./dist locally
npm run lint     # oxlint
```

## Deploying

```bash
cp server/.env.example server/.env   # SMTP credentials, required by the api service
docker compose build                 # web: node -> nginx /app/dist | api: NestJS
docker compose up -d                 # site on host port 9000
```

Two services: `web` (nginx serving the static bundle, published on 9000) and
`api` (the contact service, reachable only over the compose network). Both
`docker-compose.yml` image tags are explicit — bump them when publishing.

## Contact form

The frontend is static, so mail is sent by a small NestJS service in `server/`
that runs alongside nginx. The form POSTs `{ name, email, subject, message }` to
`/api/contact`, which nginx proxies to the API container — same origin, no CORS,
no third-party service.

**Before the first `docker compose up`:**

```bash
cp server/.env.example server/.env   # fill in SMTP_USER / SMTP_PASS / FROM_EMAIL
```

The API provides:

- `POST /api/contact` — validates the payload and emails it via SMTP, with the
  visitor's address as `Reply-To`
- `GET /api/health` — liveness check, also used by the container healthcheck
- **Rate limiting**: 3 submissions per 10 minutes per IP on the contact route,
  60 requests/minute globally
- **Request logging**: one structured JSON line per request (request id, status,
  duration, client IP, browser, OS, device, referer), plus a `contact.received`
  entry per submission. Message bodies are never logged.
- **Honeypot**: a hidden `company` field; anything filling it gets a success
  response and nothing is sent

Set `MAIL_DRY_RUN=true` in `server/.env` to log messages instead of sending them.

Frontend config lives in `.env` (`VITE_CONTACT_ENDPOINT=/api/contact`). Clearing
it makes the form fall back to opening the visitor's mail client instead. Vite
inlines the value at build time — rebuild the web image after changing it.

### Running both locally

```bash
cd server && npm install && npm run dev   # API on :3000
npm run dev                               # Vite on :5173, proxies /api -> :3000
```

## Editing content

Everything on the page comes from **`src/lib/data.ts`**: profile details, nav
links, social links, skills, experience, projects and testimonials. Editing the
site's content almost always means editing that one file, not the components.

Images live in `src/assets/images/` and are imported as modules so Vite hashes
them; files that need a stable public URL (the CV, favicons, the Open Graph
image) live in `public/`.

## Structure

```
src/
  assets/images/     logos + photos (imported, hashed by Vite)
  components/
    sections/        page-level blocks, one per #anchor
    layout/          Container, Card, Header, Footer, SectionHeading
    data-display/    TechCard, ExperienceItem, ProjectCard, TestimonialCard, Tag
    general/         Typography, Button, IconButton, Reveal, ThemeSwitcher
    navigation/      Link, Drawer
    icons/           brand marks (GitHub, X, LinkedIn, Instagram)
  hooks/             scroll, in-view, active-section, clipboard, theme
  lib/               data, types, utils, theme context
  styles/index.css   Tailwind theme + design tokens
```
