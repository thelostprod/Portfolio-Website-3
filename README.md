# Adarsh Portfolio

Portfolio website for **Adarsh Choudhary** — Video Editor & Creative Director. Built with React, Vite, Tailwind CSS, and Motion.

## Features

- Cinematic showreel player with YouTube embed
- Interactive project case studies with hover previews
- Capabilities accordion, contact form (mailto), and responsive layout
- Optimized production build with code splitting

## Prerequisites

- Node.js 20+
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier is enough)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run preview
```

## Customize

| Item | Location |
|------|----------|
| Projects & capabilities | `src/data.ts` |
| Portrait image | Replace `public/assets/adarsh-portrait.svg` (or add a PNG and update `src/App.tsx`) |
| Showreel YouTube ID | `src/components/ShowreelPlayer.tsx` |
| Contact email & links | `src/data.ts` → `contactData` |

---

## Deploy: GitHub → Vercel

Recommended flow: push the code to GitHub first, then connect the repo to Vercel for automatic deploys on every push.

### Step 1 — Push to GitHub

1. Create a **new empty repository** on GitHub (no README, no `.gitignore` — this project already has them).

2. From this folder, run:

```bash
git add .
git commit -m "Initial portfolio release"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name.

### Step 2 — Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Click **Import** next to your portfolio repository.
3. Vercel should auto-detect **Vite**. Confirm these settings:

   | Setting | Value |
   |---------|--------|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

4. Click **Deploy**. Vercel builds and gives you a live URL (e.g. `your-repo.vercel.app`).

5. Optional: in Vercel → **Project Settings → Domains**, add a custom domain.

Every future push to `main` will trigger a new Vercel deployment automatically.

### Optional — GitHub Pages

If you also want GitHub Pages, enable **Settings → Pages → GitHub Actions** and use the workflow in `.github/workflows/deploy.yml`. For production, Vercel is simpler and faster for this stack.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript check |

## License

Private portfolio — all rights reserved.
