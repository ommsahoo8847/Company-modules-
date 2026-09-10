# phases.md — Project Phases & Build Stages

## Overview

The portfolio is built in **4 phases**, progressing from foundational design infrastructure to full interactive 3D experiences. Each phase produces a shippable milestone.

---

## Phase 1 — Foundation & Design System
**Goal:** Get the design system wired up and the skeleton of the site running locally.

### Tasks
- [ ] Initialise Next.js 14 App Router project (`npx create-next-app@latest`)
- [ ] Install core dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `framer-motion`
- [ ] Parse `Dark.md` and `Light.md` YAML frontmatter into `lib/tokens.ts`
- [ ] Generate `styles/tokens-dark.css` and `styles/tokens-light.css` from tokens
- [ ] Configure `globals.css` — import tokens, set `[data-theme="dark"]` / `[data-theme="light"]` selectors
- [ ] Set up Google Fonts in `app/layout.tsx` (Syne, Plus Jakarta Sans, JetBrains Mono)
- [ ] Build primitive UI components: `Button`, `Badge`, `Chip`, `Divider`
- [ ] Build `Navbar` and `Footer` layout components
- [ ] Configure `ThemeProvider` Context (dark/light toggle)

**Milestone:** Running `localhost:3000` with correct fonts, colour tokens, and base components.

---

## Phase 2 — Static Pages & Content
**Goal:** Build all static sections of the home page and connect project content.

### Tasks
- [ ] Define project content schema in `lib/projects.ts`
- [ ] Create 3–5 sample projects as MDX files in `/content/projects/`
- [ ] Build `Hero` section (static version, no canvas yet — placeholder gradient bg)
- [ ] Build `ProjectGrid` section with filterable `ProjectCard` components
- [ ] Build `About` section with skills, tools, and CTA button
- [ ] Build `Contact` section with form (Formspree integration) and social links
- [ ] Build dynamic `app/work/[slug]/page.tsx` project detail page (static content only)
- [ ] Set up `generateStaticParams` for all project slugs
- [ ] Implement responsive layout (mobile / tablet / desktop breakpoints per design system)
- [ ] Add Open Graph meta tags to all pages

**Milestone:** Fully navigable, responsive, content-complete portfolio — no 3D yet.

---

## Phase 3 — 3D & WebGL Integration
**Goal:** Layer in the real-time 3D and interactive WebGL experiences.

### Tasks
- [ ] Build `HeroCanvas` component (React Three Fiber scene)
  - [ ] Ambient particle system or shader-based background
  - [ ] Camera animation on scroll (GSAP ScrollTrigger)
- [ ] Replace Hero placeholder with live `HeroCanvas` (dynamic import, no SSR)
- [ ] Build `ProjectViewer` component for project detail pages
  - [ ] Load `.glb` model from `/public/models/`
  - [ ] Orbit controls (drag to rotate)
  - [ ] Wireframe toggle button
  - [ ] Camera preset buttons (front, side, 3/4)
- [ ] Build `ShaderDrawer` — expandable side panel with GLSL source code, syntax-highlighted
- [ ] Build Viewport Canvas HUD overlay (camera switcher, wireframe toggle icons)
- [ ] Add hover-activated media preview (video/WebGL) on `ProjectCard`
- [ ] Optimise all `.glb` models with `gltf-transform` for web delivery

**Milestone:** Full interactive 3D experience on hero and all project detail pages.

---

## Phase 4 — Polish, Animation & Launch
**Goal:** Cinematic transitions, performance audit, and production deployment.

### Tasks
- [ ] Implement page transition animations (Framer Motion `AnimatePresence`)
- [ ] Add scroll-triggered entrance animations on all sections (GSAP ScrollTrigger)
- [ ] Add micro-interactions to all interactive elements (hover, focus, tap states)
- [ ] Implement Live Status Badge animation (pulsating `#06B6D4` dot)
- [ ] Audit and fix all `prefers-reduced-motion` guards on animations
- [ ] Run Lighthouse audit — target score >= 90 performance, 100 accessibility
- [ ] Compress all images with Next.js `<Image>` optimisation
- [ ] Cap canvas `devicePixelRatio` at `2` in all WebGL components
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Configure Vercel deployment and environment variables
- [ ] Final cross-browser and cross-device QA (Chrome, Firefox, Safari, iOS, Android)

**Milestone:** Production-ready site live on Vercel with custom domain.

---

## Phase Summary Table

| Phase | Focus | Deliverable |
|---|---|---|
| 1 | Foundation & Design System | Running dev environment, tokens wired, base components |
| 2 | Static Pages & Content | Full responsive site, no 3D — fully navigable |
| 3 | 3D & WebGL Integration | Live canvases, model viewer, shader drawer |
| 4 | Polish & Launch | Cinematic animations, performance pass, live on Vercel |
