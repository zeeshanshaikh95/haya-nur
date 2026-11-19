# Haya Nur — Website

Mobile-first storefront for **Haya Nur** (@hayanur.clothing) — a Mumbai label for modest ethnic
wear. Primary conversion: browse → bag → **order on WhatsApp** (no payment gateway, by design).

**Live preview:** https://zeeshanshaikh95.github.io/haya-nur/ (GitHub Pages — static catalogue
snapshot, no admin; see [Hosting](#hosting--live-url)).

Built to the same architecture as the client's previous Glow by Parveen site (React SPA + Express
API + MongoDB, protected admin panel, WhatsApp ordering), with a completely different design
system, a configurable hero slider and a clothing-specific catalogue model.

> **Data policy:** product names, sizes and copy come from the brand's own public Instagram posts
> where they exist (`Rubaab`, `Elaf`, sizes, fabric descriptions). Pieces without a public name use
> descriptive working titles — rename or remove them in Admin → Products. No prices, reviews,
> policies or business claims are invented. Prices default to **“price on request”**, matching how
> the studio quotes today.

## Hosting / live URL

| Environment | URL | What works |
| GitHub Pages (live now) | https://zeeshanshaikh95.github.io/haya-nur/ | Browsing, filters, piece pages, bag, WhatsApp/Instagram ordering |
| Local (`npm run dev`) | http://localhost:5173 | Everything, including `/admin` and analytics |

Pages is static, so it cannot run the Express API. The Pages build reads a committed snapshot of
the catalogue (`client/public/demo/catalogue.json`, enabled by `VITE_DEMO_CATALOGUE=true`) instead
of showing empty states. Regenerate it after changing catalogue content:

```shell
npm run dev:server          # in one terminal
npm run demo:catalogue      # writes the snapshot
```

Consequences of the preview build: ordering buttons fall back to Instagram DMs (no WhatsApp number
is published yet), the admin panel has no API behind it, and review/analytics writes are skipped.
To run it as a real shop, host the API and set the `VITE_API_URL` repository variable plus
`VITE_DEMO_CATALOGUE=false` — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Pages on a **private** repository needs GitHub Pro, so this repository is public. Push to `main`
and `.github/workflows/deploy-pages.yml` rebuilds and redeploys automatically.

## Tech stack

| Layer | Technology |
| Frontend | React 18 + Vite 6 + TypeScript, Tailwind CSS 3, React Router 6, react-helmet-async |
| Backend | Node + Express 4 + TypeScript, Zod validation |
| Database | MongoDB + Mongoose 8 (Atlas in production; a bundled local mongod for dev) |
| Auth | JWT bearer tokens + bcrypt (12 rounds), protected `/api/admin/*` |
| Security | Helmet, CORS allow-list, rate limiting, Zod validation, secrets via env |
| Media | Multer uploads served from `/uploads` (swap in Cloudinary/S3 when the volume grows) |
| Hosting | Static SPA build + Node API + MongoDB Atlas |

## Structure

```
├── client/                  React SPA
│   ├── public/              images, favicon, robots.txt, sitemap.xml
│   └── src/
│       ├── admin/           Protected admin panel (lazy-loaded bundle)
│       ├── api/             Typed API client + endpoint map
│       ├── components/      HeroSlider, ProductCard, MiniCart, Wordmark, layout…
│       ├── context/         Cart / Settings / Toast providers
│       ├── hooks/           useApi, usePageView
│       ├── lib/             WhatsApp builder, analytics, formatting, brand assets
│       └── pages/           Public pages
├── server/
│   └── src/
│       ├── config/          Env config + Mongo connection
│       ├── controllers/     Public + admin handlers
│       ├── middleware/      Auth, errors, rate limits, uploads
│       ├── models/          Mongoose schemas
│       ├── routes/          /api and /api/admin routers
│       ├── seed/            Bootstrap (admin + settings) and starter catalogue
│       ├── services/        Settings singleton
│       ├── utils/           asyncHandler, slugify
│       └── validation/      Zod schemas for every write
└── .env.example
```

## Quick start

Prerequisites: Node 20+.

```shell
npm install

# 1 — configure the API
cp .env.example server/.env        # then edit JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 2 — local database (downloads a mongod binary on first run, persists in server/.data/mongo)
npm run dev:db

# 3 — in a second terminal: bootstrap admin + settings + starter catalogue
npm run seed

# 4 — run the API and the client
npm run dev
# Client: http://localhost:5173     API: http://localhost:4000/api/health
```

`npm run dev:all` runs the database, API and client together.

**Admin panel:** http://localhost:5173/admin — sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from
`server/.env`. A freshly bootstrapped account must choose a new password before the panel opens.

## Admin panel

* **Overview** — 7/30/90-day page views, piece views, cart adds, order messages, top pieces,
  referrers, plus a warning when no WhatsApp number is configured.
* **Pieces** — full CRUD, multi-image upload/reorder, size or colour options with per-option price
  and stock, new-in / bestseller / featured flags, archive & restore, SEO fields, display order.
* **Edits (categories)** — CRUD, reordering, live piece counts. Deleting an edit keeps its pieces.
* **Reviews** — add, edit, approve, hide, delete. Only approved reviews reach the shop.
* **Journal (gallery)** — images for the homepage strip and lookbook, with captions and links.
* **Settings** — identity, WhatsApp number, **hero slider slides**, announcements, house story,
  order message templates, shipping and returns copy.
* **Security** — forced first-login password change, 10 login attempts / 15 min, JWT re-validated
  against the database on every request, Zod validation on all writes.

## Ordering behaviour

* If a WhatsApp number is set in Settings, every order button builds a `wa.me` link with a
  pre-filled message (items, options, quantities, estimated total).
* If no number is set, order buttons open the brand's Instagram DMs instead, so the shop is never a
  dead end — the admin dashboard flags this until the number is added.
* Prices are nullable end to end: blank means “Price on request”, never ₹0.

## Brand assets

* **Wordmark** — a typographic lockup (`HAYA NUR` in Cormorant Garamond, wide tracking, with
  `Clothing · Elegance · Modesty`) built in `client/src/components/Wordmark.tsx`. No stretched or
  recoloured artwork is used anywhere.
* **Photography** — the eight images in `client/public/images/` are editorial placeholders in the
  house palette, generated for this build because Instagram does not serve its media to logged-out
  requests. Replace them with the brand's own photographs (or upload through Admin → Pieces) before
  launch.
* **Palette** — bone/ivory paper, charcoal ink, muted sage and taupe, with wine reserved for
  destructive actions. Square edges, hairline rules and generous whitespace; no rounded cards,
  gradients or blush-pink surfaces.

## Scripts

| Command | Purpose |
| `npm run dev` | API + client together |
| `npm run dev:all` | Database + API + client in one terminal |
| `npm run dev:db` | Local dev MongoDB (persists in `server/.data/mongo`) |
| `npm run seed` | Bootstrap admin + settings, add the starter catalogue if empty |
| `npm run seed:reset` | Wipe catalogue records and re-create them |
| `npm run build` | Typecheck + build both workspaces |
| `npm run typecheck` | TypeScript project-wide |

## Environment variables

| Variable | Purpose |
| `PORT` | API port (4000) |
| `MONGODB_URI` | Mongo connection string |
| `JWT_SECRET` | Long random string for signing admin JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (12h) |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |
| `PUBLIC_SITE_URL` / `PUBLIC_API_URL` | Canonical URLs |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin account (seed only) |
| `UPLOAD_MAX_BYTES` / `UPLOAD_MAX_FILES` | Upload limits |

Client (optional): `VITE_API_URL`, `VITE_PUBLIC_SITE_URL`.

## Roadmap to production

1. Replace the placeholder photography with the brand's own images.
2. Set the WhatsApp number and review the message templates in Admin → Settings.
3. Add the real catalogue (pieces, edits, journal images, approved reviews).
4. Set `JWT_SECRET`, a strong admin password and `CORS_ORIGINS` on the host; deploy the SPA build
   and API, and point MongoDB at Atlas.
