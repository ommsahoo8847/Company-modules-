# Architecture.md — Application Structure & Technical Organisation

## Overview

This portfolio is a **Next.js 14 App Router** application. It uses a static-first rendering strategy (SSG/ISR) with selective client-side interactivity for 3D WebGL canvases. The design system tokens live in `Dark.md` and `Light.md` and are consumed via CSS custom properties.

---

## Directory Structure

```
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, theme provider, global CSS)
│   ├── page.tsx                # Home page (Hero + Grid + About + Contact)
│   ├── work/
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic project detail page
│   └── globals.css             # Global styles + CSS custom properties (tokens)
│
├── components/
│   ├── ui/                     # Primitive, reusable UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Chip.tsx
│   │   └── Divider.tsx
│   ├── layout/                 # Structural layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/               # Full-page section components
│   │   ├── Hero.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   └── canvas/                 # All WebGL / Three.js / R3F components
│       ├── HeroCanvas.tsx      # Hero scene (React Three Fiber)
│       ├── ProjectViewer.tsx   # Interactive 3D model viewer
│       └── ShaderDrawer.tsx    # GLSL code inspection panel
│
├── content/
│   └── projects/               # Project data (MDX or JSON)
│       ├── project-a.mdx
│       └── project-b.mdx
│
├── lib/
│   ├── tokens.ts               # JS-consumable design tokens (parsed from Dark.md / Light.md)
│   ├── projects.ts             # Project data fetching helpers
│   └── animations.ts           # GSAP / Framer Motion presets
│
├── public/
│   ├── models/                 # .glb / .gltf 3D model assets
│   ├── renders/                # Static high-res render images
│   └── og/                     # Open Graph images
│
├── styles/
│   ├── tokens-dark.css         # Generated CSS custom properties (dark theme)
│   ├── tokens-light.css        # Generated CSS custom properties (light theme)
│   └── components/             # Component-scoped CSS files
│
├── Dark.md                     # Source of truth — dark design tokens
├── Light.md                    # Source of truth — light design tokens
└── Company modules/            # Context files (PRD, Architecture, rules, etc.)
```

---

## Rendering Strategy

| Page | Strategy | Reason |
|---|---|---|
| `/` (Home) | SSG | Static content, max performance |
| `/work/[slug]` | SSG + ISR | Pre-rendered at build, revalidated as needed |
| Canvas components | CSR (Client-only) | WebGL requires browser APIs |
| Contact form | Client-side | No backend; uses mailto or Formspree |

---

## Component Architecture

```
Root Layout
└── ThemeProvider (CSS class on <html>)
    ├── Navbar
    ├── Page Content
    │   ├── Hero
    │   │   └── HeroCanvas (dynamic import, no SSR)
    │   ├── ProjectGrid
    │   │   └── ProjectCard[]
    │   │       └── MediaPreview (lazy-loaded)
    │   ├── About
    │   └── Contact
    └── Footer
```

### Key Architectural Decisions

1. **Canvas components use `dynamic(() => import(...), { ssr: false })`** — prevents WebGL APIs from running server-side
2. **Design tokens are single source of truth** — `Dark.md` / `Light.md` are parsed at build time into CSS custom properties; no hardcoded color values in component files
3. **Content in `/content/projects/`** — MDX files allow rich project documentation with embedded components
4. **No global state manager** — React Context is sufficient for theme state; no Redux/Zustand needed at this scale

---

## Data Flow

```
Dark.md / Light.md
       │
       ▼
lib/tokens.ts (parse YAML frontmatter)
       │
       ▼
styles/tokens-dark.css  ←─── globals.css imports based on [data-theme]
styles/tokens-light.css
       │
       ▼
All components consume via var(--color-primary), var(--font-display), etc.
```

---

## Performance Architecture

- **3D models** — compressed with `gltf-transform` to `.glb`, lazy-loaded with `<Suspense>`
- **Images** — Next.js `<Image>` with WebP/AVIF, priority flag on hero media
- **Fonts** — `next/font/google` with `display: swap` and subset `latin`
- **Canvas** — rendered at `devicePixelRatio` capped at `2` to prevent GPU overload on high-DPI displays
- **Code splitting** — canvas components and shader drawer are dynamic imports, excluded from initial bundle

---

## Deployment

- **Platform:** Vercel
- **Build command:** `next build`
- **Output:** Static export (`output: 'export'`) for V1 if no dynamic routes need SSR
- **Environment variables:** `NEXT_PUBLIC_FORMSPREE_ID` for contact form endpoint
