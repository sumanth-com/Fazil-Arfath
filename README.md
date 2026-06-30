# KAIRO. — Premium Portfolio

An Awwwards-inspired portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Stable dev server (important)

`npm run dev` now automatically:
- Stops **all stale servers** on ports 3000–3005
- Clears the `.next` cache (fixes `Cannot find module './611.js'` errors)
- Starts Next.js with **Turbopack** (more stable on Windows)

If you still see a 500 / broken unstyled page:

```bash
npm run doctor
npm run dev
```

**Never do this while `npm run dev` is running:**
- `npm run build`
- Starting a second `npm run dev` in another terminal

Those leave corrupted webpack chunks and cause Internal Server Error.

**Tips:**
- Run only **one** dev server at a time
- Always use `http://localhost:3000` (check the terminal URL)
- Hard refresh after restart: `Ctrl+Shift+R`

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
