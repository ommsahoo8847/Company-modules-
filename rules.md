# rules.md — AI Working Rules

These are the rules the AI must follow, avoid, or preserve when working on this project.

---

## ALWAYS Use

### Design Tokens
- **Always** use CSS custom properties from `tokens-dark.css` / `tokens-light.css` — **never** hardcode color hex values in component files
- Reference tokens as: `var(--color-primary)`, `var(--color-surface)`, `var(--font-display)`, etc.
- Token source of truth is `Dark.md` and `Light.md` — do not edit those files unless specifically asked to update the design system

### Typography
- **Syne** — for all display text, headlines, and project names only
- **Plus Jakarta Sans** — for all body copy, descriptions, and UI labels
- **JetBrains Mono** — for technical metadata, tags, shader code, polycount, and timestamps only
- Never mix font families within the same UI role

### Component Patterns
- Use `dynamic(() => import(...), { ssr: false })` for **all** Three.js / WebGL / R3F components
- Wrap all canvas components in `<Suspense fallback={...}>` with a styled skeleton loader
- Use Next.js `<Image>` for all raster images — never raw `<img>` tags
- Use semantic HTML5 elements (`<section>`, `<article>`, `<nav>`, `<main>`, `<aside>`)

### Animation
- Use `GSAP` for scroll-triggered animations and entrance sequences
- Use `Framer Motion` for component-level micro-interactions (hover, tap, layout transitions)
- All animations must respect `prefers-reduced-motion` — wrap in a media query check

### Accessibility
- All interactive elements must have `aria-label` or visible label text
- Focus rings must be visible — use the indigo `0 0 0 2px rgba(99, 102, 241, 0.5)` ring defined in the design system
- Colour contrast must meet WCAG AA minimum on all text

---

## NEVER Do

### Visual
- **Never** use hardcoded colours — all values must come from design tokens
- **Never** use fully circular / pill-shaped primary buttons or containers (design system prohibition)
- **Never** use `box-shadow` drop shadows for elevation — use layered backgrounds and blur as defined in the elevation system
- **Never** use pure `#FFFFFF` for large bodies of body copy — use `#E2E2E8` (muted body token)
- **Never** use font weights other than `700` and `800` for Syne display headings

### Code
- **Never** use `<img>` directly — use Next.js `<Image>` component
- **Never** run WebGL / Three.js code server-side — always guard with `{ ssr: false }` or `typeof window !== 'undefined'`
- **Never** import Three.js at the top level of a page or layout component
- **Never** add inline `style={{}}` for anything that belongs in the design system — use CSS custom properties
- **Never** use Tailwind CSS unless explicitly asked by the user
- **Never** create a new colour variable — use existing tokens from `Dark.md` / `Light.md`

### Architecture
- **Never** add a global state manager (Redux, Zustand, MobX) — React Context is the ceiling for this project's scale
- **Never** add a backend or database in V1 — all content is file-based (MDX/JSON)
- **Never** break the content schema in `/content/projects/` without updating the type definitions in `lib/projects.ts`

---

## PRESERVE

- The `Dark.md` and `Light.md` files are **source-of-truth design system files** — treat them as read-only unless a design system update is explicitly requested
- The `app/layout.tsx` font loading configuration — do not change font families or subsets without explicit instruction
- The `lib/tokens.ts` parsing logic — changes here affect the entire design system cascade
- All `aria-` attributes on existing interactive components
- The existing project MDX content schema — any new project fields must be additive and backward-compatible

---

## Code Style

- **TypeScript** — all new files are `.tsx` or `.ts`, strict mode enabled
- **Named exports** preferred over default exports for components
- **CSS file per component** in `styles/components/` — no `styled-components`, no CSS-in-JS
- Component props use explicit TypeScript interfaces, not inline type literals
- File naming: `PascalCase` for components, `camelCase` for utilities and hooks
