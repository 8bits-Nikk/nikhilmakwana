# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for nikhilmakwana.in — a single-page React + Vite app
(TypeScript, Tailwind CSS v4), built to static files and served by nginx in
Docker. Migrated from a Next.js 13 App Router version, now only on GitHub
(`8bits-Nikk/nikhilmakwana`; the local copy was removed 2026-11-15, source
backup in `~/backups/documents-removed-2026-11-15/`). It is the historical
reference, not a dependency.

## Commands

```bash
npm run dev      # dev server at localhost:5173
npm run build    # tsc -b && vite build -> ./dist
npm run preview  # serve ./dist
npm run lint     # oxlint
```

There are no tests and no test runner configured.

Docker (the deploy path):

```bash
docker compose build
docker compose up -d   # host port 9000
```

`docker-compose.yml` pins an explicit image tag; bump it when publishing.

## Architecture

**Client-rendered SPA, no server at runtime.** There is no SSR, no API routes
and no data fetching — everything renders from constants at build time. Because
the HTML ships empty, anything the browser normally does with server-rendered
markup has to be done in JS: `useHashScroll` is what makes `/#work` deep links
work, and `index.html` carries the SEO/Open Graph meta tags, the anti-FOUC
theme script, and the self-hosted Umami analytics tag (analytics.nikhilmakwana.in,
served from `~/Documents/selfhost/umami`; `data-domains` keeps local dev out).

**Content lives in `src/lib/data.ts`.** `PROFILE`, `NAV_LINKS`, `SOCIAL_LINKS`,
`TECHNOLOGIES`, `EXPERIENCES`, `PROJECTS` and `TESTIMONIALS` are exported
constants typed by `src/lib/types.ts`. Editing the site's content means editing
that file. Hero stats (years of experience, project count) are *derived* from
this data rather than hardcoded — keep it that way so they cannot drift.

Each `TECHNOLOGIES` entry carries a one-line `description` and a `category` from
`TECH_CATEGORIES`, which drives the grouped skills grid (the order of that array
is the order of the groups). An entry renders either a brand `logo` from
`src/assets/images/logos` **or** an `icon` + `iconColor` glyph — the glyph path
exists because AWS and Oracle were removed from simple-icons over trademark
policy, and because entries like on-device AI are capabilities with no vendor
mark. `url` is optional for the same reason: entries without one render as a
plain card instead of a link.

**Contact form.** The frontend cannot send mail, so `server/` holds a small
NestJS API (see "The API" below). `src/lib/contact.ts` POSTs to
`VITE_CONTACT_ENDPOINT` — set to `/api/contact` in the committed `.env` — and
falls back to a prefilled `mailto:` when that variable is empty, which is why
`PROFILE.email` still exists even though the address is not shown on the page.
Vite inlines env vars at build time, so rebuild the web image after changing it.
Error messages from the API are written to be shown to visitors verbatim, and
`readErrorMessage` surfaces them (including Nest's array of validation
messages); only network failures get a client-side message.

**Analytics.** `src/lib/analytics.ts` wraps the Umami tracker. Links get
`{...trackAttrs('event', { key: 'value' })}` (Umami's own click listener records
them, even for links that navigate away); non-click events call `track()`.
Event names are a closed union (`AnalyticsEvent`) — add new ones there. Both are
no-ops without the tracker, so never make behaviour depend on them, and never
send personal data (the contact form reports only `result` and `delivery`).
`DownloadCV` and `SocialIcons` take a required `location` prop for this.
`section-view` fires once per section per page load from `Header`.

**Images.** `src/assets/images/**` is imported as modules (Vite returns a hashed
URL string, and SVGs under 4 kB are inlined). `public/**` is for files needing a
stable URL: the CV PDF, favicons, the Open Graph image.

**Page composition.** `src/App.tsx` renders the section components in order;
each is a `Container` with an `id` matching a `#hash` in `NAV_LINKS`. Adding a
section means: create it in `src/components/sections/`, add it to `App.tsx`, and
add its entry to `NAV_LINKS` (the header's active-link tracking reads the same
list).

**Component layers** under `src/components/`: `sections/` → `layout/` →
`data-display/` + `general/` + `navigation/` + `icons/`. Import via the `@/*`
alias mapped to `./src/*` (declared in both `vite.config.ts` and
`tsconfig.app.json` — update both).

## The API (`server/`)

A standalone NestJS app with its own `package.json`, `tsconfig.json` and
Dockerfile — `npm run build` at the repo root does **not** build it. Commands run
from `server/`: `npm run dev` (watch, port 3000), `npm run build`, `npm start:prod`.

- `POST /api/contact` → `ContactController` → `ContactService` (Nodemailer over
  SMTP). `GET /api/health` for liveness. Global prefix `api` is set in `main.ts`
  and nginx preserves it, so `proxy_pass` carries no path.
- **The `trust proxy` setting in `main.ts` is load-bearing.** In production there
  are *two* proxies: the host nginx on the machine (`/etc/nginx/sites-available/website`,
  terminating TLS for nikhilmakwana.in and proxying to `:9000`) and the container
  nginx serving the site. Both append to `X-Forwarded-For`, so the chain reaching
  the API looks like `visitor, host-public-ip, 10.0.0.20`.

  It trusts private ranges (`['loopback', 'linklocal', 'uniquelocal']`) rather
  than a hop count, so Express walks the chain and returns the first *public*
  address. A hop count would break silently whenever a proxy is added or
  removed. This also defeats spoofing: a forged `X-Forwarded-For` from the
  internet gets the client's real public address appended after it, and
  `proxy-addr` truncates the chain at the first untrusted (public) entry — so
  both `req.ip` and the throttler's `req.ips[0]` are the real visitor.
  Verified: rotating a forged header still hits 429 after 3 submissions.

  Get this wrong and every visitor shares the host's `10.0.0.20` address —
  one rate-limit bucket for the whole internet, and useless logs.
- Rate limiting is `@nestjs/throttler` with two named buckets: `default`
  (60/min) and `contact`. **Every throttler in `forRoot` applies to every
  route**, so `contact` is permissive globally (1000/min) and only tightened to
  3 per 10 min by `@Throttle` on the contact route. Bare `@SkipThrottle()` skips
  only `default` — health uses `@SkipThrottle({ default: true, contact: true })`
  (before 1.1 it was throttled to 3/10 min and the container showed unhealthy). `FriendlyThrottlerGuard` only exists to
  replace the stock "ThrottlerException" text with something a visitor can read.
- `RequestLoggerMiddleware` logs one JSON line per request on response finish,
  and assigns the `X-Request-Id` that ties it to the `contact.*` service events.
  **Message bodies are deliberately never logged** — only metadata and length.
- The honeypot is enforced server-side (`dto.company`), so direct API hits are
  caught too, not just form submissions. It returns success and sends nothing.
- Mail is sent from `"${APP_NAME}" <${FROM_EMAIL}>` (`ContactService.fromAddress`),
  so it lands in the inbox as *Nikhil Makwana* rather than a bare address.
  `APP_NAME` defaults to `Nikhil Makwana`; quotes are stripped so the name
  cannot break out of the quoted-string form.
- SMTP config comes from `server/.env` (gitignored; see `.env.example`). Missing
  SMTP is not fatal: the service logs a warning at boot and returns 503, or logs
  the message instead of sending when `MAIL_DRY_RUN=true`.
- `@types/nodemailer` is still on 6.x because DefinitelyTyped has not published
  types for Nodemailer 9; the API surface used here is unchanged between them.

## Theming

Hand-rolled, no `next-themes`. `ThemeProvider` (`src/components/theme-provider.tsx`)
owns the state, persists it under the `theme` key and toggles `.dark` on
`<html>`; the inline script in `index.html` applies the same class before first
paint. **Those two must stay in sync** — the storage key is exported as
`THEME_STORAGE_KEY`. Read the theme with `useTheme()`, never with a media query.

Colors are never hardcoded. `src/styles/index.css` defines `--app-*` RGB triples
on `:root` and `.dark`, and an `@theme` block maps them to Tailwind color names.
Two things to know:

- The **gray scale is inverted** in dark mode (`gray-900` is near-black on light,
  near-white on dark), so `text-gray-900` and the `bg-gray-900 text-gray-50`
  button pair are correct in both themes automatically.
- **Surfaces have their own tokens** — `bg-canvas`, `bg-surface`, `bg-muted`,
  `border-line` — so backgrounds don't have to be reasoned about upside down.
  `brand` / `brand-soft` / `accent` also flip per theme; fixed-palette classes
  (`indigo-600`, `violet-600`) are used where white text must stay legible in
  both themes, such as the gradient CTA.

`ImageWrapper` swaps an asset per theme via `srcForDarkMode` — used for logos
that would otherwise disappear (Express, Socket.io). The two company logos are
dark-on-transparent, so `ExperienceItem` sits them on a permanently white tile
instead.

## Conventions

- Compose class names with `mergeClasses` from `src/lib/utils.ts` (clsx +
  tailwind-merge) so caller `className` overrides win.
- Variant-based components use `class-variance-authority` (`typography.tsx`,
  `button.tsx`, `icon-button.tsx`, `tag.tsx`). Prefer `Typography` over raw
  heading/paragraph tags.
- React 19: no `forwardRef` — `ref` is a plain prop.
- `verbatimModuleSyntax` is on, so type-only imports must use `import type`.
  `noUnusedLocals`/`noUnusedParameters` are on too; `npm run build` type-checks.
- Tailwind v4 syntax: `bg-linear-to-r` (not `bg-gradient-to-r`), `size-*`, and
  custom utilities declared with `@utility` (`text-gradient`, `bg-dot-grid`,
  `divider-glow`).
- Scroll animations use `Reveal` / `useInView` (IntersectionObserver) rather than
  an animation library, and the global `prefers-reduced-motion` block in
  `index.css` neutralizes them.
