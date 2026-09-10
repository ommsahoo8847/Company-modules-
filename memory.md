# memory.md — Project Memory

> **Purpose:** A living document. Update this file whenever something significant is finished, stalled, or decided. The AI reads this file at the start of each session to immediately understand the current project state.

---

## Current Status

| Item | Status |
|---|---|
| Active Phase | Phase 1 — Foundation & Design System |
| Last Updated | 2026-09-10 |
| Blocking Issues | None |
| Next Immediate Task | Initialise Next.js 14 project and wire design tokens |

---

## Completed

- [x] Created `Dark.md` — Obsidian Kinetic dark theme design tokens (source of truth)
- [x] Created `Light.md` — Obsidian Kinetic light theme design tokens (source of truth)
- [x] Created `PRD.md` — Product requirements, target users, features, tech stack
- [x] Created `Architecture.md` — Directory structure, rendering strategy, component tree
- [x] Created `rules.md` — AI working rules (use / avoid / preserve)
- [x] Created `phases.md` — 4-phase build roadmap
- [x] Created `design.md` — Full visual design rules from Obsidian Kinetic system
- [x] Created `memory.md` — This file

---

## In Progress

- [ ] Nothing currently in progress

---

## Key Decisions Made

| Decision | Rationale | Date |
|---|---|---|
| Next.js 14 App Router | SSG/ISR by default, strong ecosystem for 3D + R3F | 2026-09-10 |
| Static-first (no backend) for V1 | Simplest deployment path; content volume is small | 2026-09-10 |
| Vanilla CSS (no Tailwind) | Full design token control; design system requires precise custom properties | 2026-09-10 |
| React Three Fiber over vanilla Three.js | Better React integration, Suspense support, active community | 2026-09-10 |
| GSAP + Framer Motion | GSAP for scroll/timeline, Framer Motion for component-level | 2026-09-10 |
| No global state manager | Project scale doesn't warrant it; React Context is sufficient | 2026-09-10 |
| `Dark.md` / `Light.md` are read-only | Single source of truth — changes only on explicit design system update request | 2026-09-10 |

---

## Important Context

- The **design system name is "Obsidian Kinetic"** — always reference it by this name
- The site targets **elite 3D artists and creative technologists** — everything should feel premium and precise
- **Pill shapes are prohibited** on primary buttons/containers per design system rules
- All canvas / WebGL components **must use `dynamic import` with `ssr: false`**
- **Never hardcode colours** — always use `var(--color-*)` tokens
- Content for projects lives in `/content/projects/` as MDX files

---

## Open Questions / Unresolved

| Question | Priority | Notes |
|---|---|---|
| What is the portfolio owner's name and title? | High | Needed for Hero copy and meta tags |
| How many projects will be in the initial launch? | Medium | Affects grid layout decisions |
| Should the contact form use Formspree or another service? | Medium | Default assumption is Formspree |
| Will there be a real custom domain, or Vercel subdomain for now? | Low | Affects `robots.txt` and OG URL config |
| Is there a real 3D model ready for the project viewer demo? | High | Needed before Phase 3 begins |

---

## File Index

| File | Purpose |
|---|---|
| [`PRD.md`](./PRD.md) | What we're building and why |
| [`Architecture.md`](./Architecture.md) | App structure and technical decisions |
| [`rules.md`](./rules.md) | What the AI should use, avoid, or preserve |
| [`phases.md`](./phases.md) | Build roadmap divided into 4 phases |
| [`design.md`](./design.md) | Full visual design rules |
| [`memory.md`](./memory.md) | This file — live project memory |
| [`Dark.md`](./Dark.md) | Obsidian Kinetic dark theme tokens (READ-ONLY) |
| [`Light.md`](./Light.md) | Obsidian Kinetic light theme tokens (READ-ONLY) |
