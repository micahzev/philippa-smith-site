# Philippa Smith — Artist Portfolio

A single-page portfolio site for artist Philippa Smith, built with vanilla HTML/CSS/JavaScript on the frontend and Sanity.io as a headless CMS.

## What's inside

```
philippa-smith-site/
├── frontend/                 ← The public website (static, deploy anywhere)
│   ├── index.html            ← The entire site
│   ├── manifest.webmanifest  ← PWA manifest
│   ├── sw.js                 ← Service worker (offline + cache)
│   ├── robots.txt            ← SEO + AI crawler allowances
│   ├── sitemap.xml
│   ├── _headers              ← Cloudflare Pages / Netlify caching rules
│   ├── 404.html
│   ├── og-image.jpg          ← Social share image
│   └── icons/                ← Favicon + PWA icons
│
├── sanity/                   ← The CMS (Sanity Studio)
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   ├── deskStructure.ts
│   ├── schemas/
│   │   ├── project.ts        ← Carousel schema
│   │   ├── work.ts           ← Individual artwork schema
│   │   ├── siteSettings.ts   ← Contact email etc.
│   │   └── index.ts
│   └── package.json
│
├── README.md                 ← You are here
├── ADMIN_GUIDE.md            ← For non-technical admins managing content
└── BACKUP_GUIDE.md           ← How to export + restore dataset archives
```

---

## Feature checklist

**Frontend**
- Single page, vertical list of horizontal carousels
- Arrow-only navigation (no auto-advance), looping
- Smooth slide animation
- Each work shows optional piece name, technique, size, year
- Image items with responsive srcset + lazy loading
- Video items: thumbnail with play-badge overlay → lightbox
- Artist name header, contact email footer
- Responsive (mobile + desktop)
- Progressive Web App (installable, works offline after first visit)
- SEO: meta tags, Open Graph, Twitter Card, canonical, sitemap
- AI-SEO: JSON-LD structured data (Person, CollectionPage, VisualArtwork entries)
- Cloudflare Web Analytics
- Fast loads: image compression via Sanity CDN, lazy loading, service worker caching

**Backend (Sanity)**
- Admin UI at `yourproject.sanity.studio` — no login system you need to build
- Add/reorder/hide carousels (projects)
- Reorder works inside carousels via drag
- Upload images or videos per work
- Dataset export (archive backup) via one command

---

## First-time setup

### Prerequisites
- Node.js 18+ (for Sanity Studio)
- A Sanity.io account (free) — https://www.sanity.io/
- A Cloudflare account (free) — for hosting + analytics

### 1. Set up the Sanity backend

```bash
cd sanity
npm install
npx sanity init --env
```

When prompted:
- **Login**: log into Sanity
- **Create new project**: name it "Philippa Smith"
- **Dataset**: use the default `production`
- **Project output path**: keep the current directory
- **Use the default dataset configuration**: yes

This will print your **Project ID** — you'll need it in 3 places:

1. `sanity/sanity.config.ts` — replace `YOUR_PROJECT_ID`
2. `sanity/sanity.cli.ts` — replace `YOUR_PROJECT_ID`
3. `frontend/index.html` — find the `SANITY_PROJECT_ID` constant inside the `<script type="module">` block and replace `YOUR_PROJECT_ID`

Add your website domain(s) to **CORS origins** so the frontend can read data:

```bash
npx sanity cors add https://philippasmith.com --credentials
npx sanity cors add https://www.philippasmith.com --credentials
npx sanity cors add http://localhost:8080 --credentials   # for local dev
```

### 2. Start the Studio locally

```bash
npm run dev
```

Open http://localhost:3333 — this is the admin interface. Create your first Project and Work to test.

### 3. Deploy the Studio (so anyone with login can access it)

```bash
npm run deploy
```

Pick a hostname like `philippasmith-studio` → Studio will be live at `https://philippasmith-studio.sanity.studio`.

Grant Philippa (and any admins) access at https://www.sanity.io/manage → your project → Members → Invite. Role: Editor.

### 4. Deploy the frontend

**Option A — Cloudflare Pages (recommended, free, fast)**

1. Push the `frontend/` folder to a GitHub repo, OR zip it and drag-upload at https://pages.cloudflare.com/
2. In Cloudflare Pages, set build output directory to `frontend` (if using a monorepo) or root (if `frontend` is the repo)
3. Once deployed, go to your Cloudflare dashboard → Analytics & Logs → Web Analytics → add your site → copy the token
4. Paste the token into `frontend/index.html` — search for `CF_TOKEN_PLACEHOLDER` and replace
5. Redeploy

**Option B — Netlify**

Drag the `frontend/` folder into https://app.netlify.com/drop — done. The `_headers` file works on Netlify too.

**Option C — Vercel, GitHub Pages, any static host**

It's plain HTML/CSS/JS. Upload `frontend/` and you're done. Just make sure `sw.js` and `manifest.webmanifest` are served at the site root.

### 5. Point your domain

In your domain registrar, point `philippasmith.com` (and `www`) to Cloudflare Pages or your chosen host. Follow your host's DNS instructions. Cloudflare gives you automatic HTTPS.

### 6. Final touches

Edit `frontend/index.html` and swap these placeholder values for the real ones:
- `https://www.philippasmith.com/` in canonical + OG tags (if your domain differs)
- `hello@philippasmith.com` — the contact email (2 places: the `CONTACT_EMAIL` constant and the OG description if you want to customize)

---

## Local development

**Frontend:**

```bash
cd frontend
python3 -m http.server 8080
```

Open http://localhost:8080. (Any static server works — `npx serve`, VS Code Live Server, etc.)

**Sanity Studio:**

```bash
cd sanity
npm run dev
```

Open http://localhost:3333.

---

## Maintenance

- **Add/edit content**: see `ADMIN_GUIDE.md`.
- **Backups**: see `BACKUP_GUIDE.md`.
- **Updating dependencies** (once a year or so):
  ```bash
  cd sanity
  npx sanity upgrade
  npm install
  npm run deploy
  ```
  The frontend has no build step and no dependencies to update — it just keeps working.

---

## Why this architecture?

- **Vanilla JS frontend**: no build step, no framework churn, no dependencies that rot. This site should still work identically in 10 years.
- **Sanity for CMS**: free tier covers this use case, excellent admin UI, automatic image CDN with on-the-fly resizing/format conversion, dataset export built in.
- **Cloudflare Pages + Analytics**: free, fast, privacy-friendly (no cookies, no consent banner needed in most jurisdictions).
- **PWA**: site becomes installable and loads instantly on repeat visits.

---

## Support

For Sanity questions: https://www.sanity.io/docs
For Cloudflare Pages: https://developers.cloudflare.com/pages/
