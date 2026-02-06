# Glassy Portfolio — Next.js + Dashboard

A modern **glassmorphism** personal portfolio built with **Next.js 14**, with a **dashboard** to edit all content without touching code.

## Features

- **Next.js 14** (App Router), TypeScript, Tailwind CSS
- **Glassmorphism UI** — Frosted glass cards, blur, dark/light theme
- **Fully editable via dashboard** — Hero, About, Skills, Experience, Projects, Certificates, Contact, SEO
- **Single “Save all”** — Edits persist to `data/portfolio.json` (file-based; see Deployment)
- **Responsive** — Mobile-first, works on all devices

## Quick start

1. Copy env example and set your credentials:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and set `DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD`, and `DASHBOARD_SESSION_SECRET` (use a long random string, e.g. `openssl rand -base64 32`).

2. Run the app:
   ```bash
   npm install
   npm run dev
   ```

- **Portfolio:** [http://localhost:3000](http://localhost:3000)
- **Dashboard:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard) — you’ll be redirected to **/dashboard/login** to sign in with the username and password from `.env.local`.

## Project structure

```
Glassy/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Portfolio home (server-rendered)
│   ├── globals.css         # Tailwind + glass styles
│   ├── api/portfolio/      # GET (read) & PUT (save) portfolio data
│   └── dashboard/
│       ├── layout.tsx      # Dashboard shell
│       └── page.tsx       # Edit forms for all sections
├── components/             # Hero, About, Skills, Experience, etc.
├── data/
│   └── portfolio.json     # Source of truth (edited by dashboard)
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   └── portfolio.ts      # Read/write portfolio data (server)
└── tailwind.config.ts
```

## Dashboard & authentication

- **URL:** `/dashboard` (protected); `/dashboard/login` for sign-in
- **Auth:** Set `DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD`, and `DASHBOARD_SESSION_SECRET` in `.env.local`. Unauthenticated users are redirected to the login page; `PUT /api/portfolio` also requires a valid session.
- **Sections:** SEO, Hero, About, Skills, Work experience, Projects, Certificates, Contact
- **Save:** “Save all” sends the full portfolio to `PUT /api/portfolio` and writes to `data/portfolio.json`
- **Persistence:** Works when running locally. On serverless (e.g. Vercel), the filesystem is read-only; use a database or external store and change `lib/portfolio.ts` and the API route accordingly.

## Customization

- **CV link:** In the dashboard, set “CV URL” in the Hero section (e.g. `/cv.pdf` or a full URL).
- **Data source:** Edit `data/portfolio.json` directly or use the dashboard. For production with a DB, replace `getPortfolioData` / `savePortfolioData` in `lib/portfolio.ts` and the API route.

## Build & deploy

```bash
npm run build
npm start
```

For static export, note that the dashboard needs the API and server-side file write; use a Node server or switch to a database for serverless deploy.

