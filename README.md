# KAIRO. — Premium Portfolio

An Awwwards-inspired portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### If you see a 500 error

This usually means a stale cache or multiple dev servers running. Fix it with:

```bash
npm run dev:clean
```

Then open the URL shown in the terminal (e.g. `http://localhost:3000`).

**Tips to keep the server stable:**
- Run only **one** `npm run dev` at a time
- Don't run `npm run build` while the dev server is running
- Replace photos in `assets/fazil.png` only — the app imports from there automatically

## Stack

- **Next.js 15** — App Router, Image Optimization
- **Framer Motion** — UI animations, scroll progress, reveals
- **GSAP + ScrollTrigger** — Parallax and scroll-driven motion
- **Lenis** — Smooth scroll
- **Tailwind CSS v4** — Design tokens and utilities

## Structure

```
src/
├── app/              # Layout, globals, page
├── components/
│   ├── layout/       # Header, Footer, Cursor, Lenis, GSAP
│   ├── sections/     # Hero, About, Work, Process, Services, Quote, Contact
│   └── ui/           # Button, Reveal, Typography, Portrait
├── hooks/            # Motion and interaction hooks
└── lib/              # Constants, utilities
```

## Customization

Edit `src/lib/constants.ts` for site copy, projects, services, and contact info.

Portrait image: `assets/fazil.png` (imported via `@/lib/images`)
