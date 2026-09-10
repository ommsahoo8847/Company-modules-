# PRD.md — Product Requirements Document

## What We Are Building

A **high-end interactive portfolio website** for elite 3D artists, creative technologists, and interactive web developers. The site showcases real-time WebGL experiences, high-fidelity 3D renders, and creative projects in a gallery-grade, immersive dark environment.

This is not a typical portfolio. It is a **technical exhibition platform** — a cinematic, browser-native gallery that communicates mastery, precision, and creative authority to potential clients, studios, and collaborators.

---

## Why We Are Building It

### Problem
Elite 3D artists and creative technologists are consistently underrepresented by generic portfolio templates. Standard platforms (Behance, Cargo, Readymag) fail to:
- Render real-time 3D/WebGL content natively
- Communicate technical depth alongside creative output
- Establish a premium, differentiated identity

### Solution
A bespoke, hand-crafted portfolio platform that:
- Hosts live WebGL / Three.js / R3F canvases as first-class content
- Presents technical metadata (polycount, shader model, render engine) as part of the design language
- Creates an immersive exhibition experience with cinematic transitions

---

## Target Users

| User Type | Goal |
|---|---|
| **Primary** — Potential clients (studios, agencies, brands) | Evaluate technical capability and creative range |
| **Secondary** — Creative peers & collaborators | Discover, be inspired, and initiate collaboration |
| **Tertiary** — Recruiters / Art Directors | Verify skill depth before outreach |

---

## Core Features

### Must-Have (MVP)
- [ ] **Hero Section** — Full-viewport animated 3D scene or shader canvas with name, title, and live status badge
- [ ] **Project Showcase Grid** — Filterable card grid of projects with hover-activated media previews
- [ ] **Project Detail View** — Immersive single-project page with embedded 3D viewport, technical specs, and process documentation
- [ ] **About Section** — Identity, philosophy, tools used, and available-for-hire CTA
- [ ] **Contact Section** — Minimal contact form with social/professional links

### Should-Have (Post-MVP)
- [ ] **Live WebGL Viewport** — Interactive 3D model viewer with camera controls and wireframe toggle on project pages
- [ ] **Shader / Code Drawer** — Optional expandable panel showing GLSL shader code for technical visitors
- [ ] **Dark/Light mode toggle** (using Obsidian Kinetic tokens for both themes)
- [ ] **Smooth page transitions** — GSAP or Framer Motion orchestrated route transitions

### Nice-to-Have (Future)
- [ ] **Commission Request Flow** — Multi-step form for custom 3D project scoping
- [ ] **Blog / Devlog** — Technical write-ups on render techniques and creative process
- [ ] **Analytics Dashboard** — Internal view of portfolio traffic and project engagement

---

## Success Metrics

| Metric | Target |
|---|---|
| Time on site (avg.) | > 3 minutes |
| Project detail page views per session | >= 2 |
| Contact form conversion rate | >= 5% of visitors |
| Lighthouse Performance Score | >= 90 |
| First Contentful Paint | < 1.5s |

---

## Constraints & Non-Goals

- **Not** a CMS-first platform — content is code-managed initially
- **Not** optimized for SEO-heavy content marketing — brand visibility is the primary goal
- Must work without a backend for V1 (static-first, deployable on Vercel/Netlify)
- No e-commerce or transactional flows in scope

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| 3D Rendering | Three.js / React Three Fiber |
| Animation | GSAP + Framer Motion |
| Styling | Vanilla CSS with design tokens from Dark.md / Light.md |
| Deployment | Vercel |
| Fonts | Syne, Plus Jakarta Sans, JetBrains Mono (Google Fonts) |
