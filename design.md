# design.md — Visual Design Rules

## Design System Identity

**Name:** Obsidian Kinetic  
**Brand:** Elite 3D art / creative technology portfolio  
**Mode:** Dark-first (light mode optional via token swap)  
**Aesthetic:** Dark High-Contrast Minimalism + Selective Cybernetic Glassmorphism

---

## Colour Palette

### Dark Theme (Primary)

| Role | Token | Hex |
|---|---|---|
| Canvas / Base Background | `--color-bg` | `#0A0A0C` |
| Layer 1 Surface | `--color-surface` | `#121216` |
| Layer 2 Surface (elevated) | `--color-surface-high` | `#1A1A22` |
| Ghost Borders / Gridlines | `--color-border` | `#26262E` |
| Hover Border | `--color-border-hover` | `#3E3E4D` |
| Primary Accent (Electric Indigo) | `--color-primary` | `#6366F1` |
| Secondary Accent (Cyber Violet) | `--color-secondary` | `#8B5CF6` |
| Tertiary Accent (Radiant Cyan) | `--color-tertiary` | `#06B6D4` |
| Text — High Contrast | `--color-text-high` | `#FFFFFF` |
| Text — Body | `--color-text-body` | `#E2E2E8` |
| Text — Subtle / Meta | `--color-text-subtle` | `#8E8E9F` |
| Text — Disabled | `--color-text-disabled` | `#4A4A58` |

### Gradient Recipes

| Usage | Value |
|---|---|
| Primary CTA button | `linear-gradient(135deg, #6366F1, #8B5CF6)` |
| Ambient glow (behind cards) | `radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)` |
| Specular edge highlight | `linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)` |
| Hover border sweep | `linear-gradient(135deg, #6366F1, #8B5CF6)` |

---

## Typography

### Font Families

| Font | Role | Source |
|---|---|---|
| **Syne** | Display, Headlines, Project Names | Google Fonts |
| **Plus Jakarta Sans** | Body copy, UI labels, descriptions | Google Fonts |
| **JetBrains Mono** | Tags, metadata, shader code, timestamps | Google Fonts |

### Type Scale

| Scale | Font | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|---|
| `display-hero` | Syne | 88px | 800 | 92px | -0.04em |
| `display-hero-mobile` | Syne | 44px | 800 | 48px | -0.03em |
| `headline-xl` | Syne | 56px | 700 | 64px | -0.03em |
| `headline-xl-mobile` | Syne | 32px | 700 | 38px | -0.02em |
| `headline-lg` | Syne | 36px | 700 | 44px | -0.02em |
| `headline-md` | Syne | 24px | 600 | 32px | -0.01em |
| `body-lg` | Plus Jakarta Sans | 18px | 400 | 28px | -0.01em |
| `body-md` | Plus Jakarta Sans | 15px | 400 | 24px | 0 |
| `body-sm` | Plus Jakarta Sans | 13px | 400 | 20px | 0 |
| `code-mono` | JetBrains Mono | 13px | 400 | 20px | 0 |
| `label-caps` | JetBrains Mono | 11px | 600 | 14px | 0.08em |

### Typography Rules
- Headlines: tight negative tracking, weights 700/800 **only**
- Body: never `#FFFFFF` on large copy — use `#E2E2E8`
- Labels/meta: **UPPERCASE** with `0.08em` tracking to convey blueprint aesthetic

---

## Layout & Grid

| Breakpoint | Columns | Margin | Gutter |
|---|---|---|---|
| Mobile (< 768px) | 4 | 1.25rem | 1rem |
| Tablet (768–1024px) | 8 | 2.5rem | 1.5rem |
| Desktop (> 1024px) | 12 | 5rem | 2rem |

- Max content width: `90rem` (1440px)
- Spacing system: **8pt base** (0.25rem increments)
- Micro spacing (card interiors): `0.5rem`–`1.5rem`
- Section gutters (between major sections): `6rem`–`10rem`

---

## Elevation & Depth

No traditional drop shadows. Depth = layered backgrounds + blur.

| Level | Background | Opacity | Blur | Border |
|---|---|---|---|---|
| Level 0 — Viewport void | `#0A0A0C` | 100% | none | none |
| Level 1 — Panels/Cards | `#121216` | 80% | `blur(16px)` | `1px solid #26262E` |
| Level 2 — Active/Hover | `#1A1A22` | 90% | — | `1px solid rgba(99,102,241,0.5)` |

- Ambient glow behind focal cards: `box-shadow: 0 12px 36px rgba(99,102,241,0.15)`
- Glow radius on CTA hover: `0 0 20px rgba(99,102,241,0.55)`

---

## Shape & Corners

| Radius | Size | Usage |
|---|---|---|
| Micro | `0.25rem` (4px) | Tags, badges, checkboxes, code snippets |
| Standard | `0.5rem` (8px) | Buttons, inputs, tooltips, chips |
| Container | `0.75rem` (12px) | Cards, viewport frames, modals, navbar |
| **PROHIBITED** | `9999px` (pill) | **Never** on primary containers or CTA buttons |

---

## Component Specs

### Buttons

**Primary CTA**
- Background: `linear-gradient(135deg, #6366F1, #8B5CF6)`
- Text: `#FFFFFF`, Syne 600 14px
- Border radius: `0.5rem`
- Shadow: `0 0 20px rgba(99,102,241,0.35)`
- Hover: `translateY(-1px)`, shadow → `rgba(99,102,241,0.55)`

**Secondary / Ghost**
- Background: transparent
- Border: `1px solid #26262E`
- Text: `#E2E2E8`
- Hover: border → `#6366F1`, bg → `rgba(99,102,241,0.08)`

**Icon Button**
- Size: `40px × 40px`
- Background: `#121216`
- Radius: `0.25rem`
- Icon: `#8E8E9F` → `#FFFFFF` on active

### Project Cards
- Background: `#121216`, border: `1px solid #26262E`, radius: `0.75rem`
- Media: aspect-ratio `16:10` or `4:3`, inset shadow
- Footer: project name (Syne 600 18px `#FFFFFF`) + tags (JetBrains Mono `#8E8E9F`)
- Hover: border sweeps to gradient, ambient glow `rgba(99,102,241,0.15)`

### Badges & Chips
- Height: `24px`, padding: `0 8px`
- Font: JetBrains Mono uppercase 10px, `#8E8E9F`
- Background: `rgba(255,255,255,0.04)`, border: `1px solid rgba(255,255,255,0.08)`
- Live status: pulsating `4px` dot in `#06B6D4`

### Inputs
- Background: `#0A0A0C`, border: `1px solid #26262E`
- Text: `#FFFFFF`, Plus Jakarta Sans 14px, padding: `0.75rem 1rem`
- Focus: border → `#6366F1`, ring: `0 0 0 2px rgba(99,102,241,0.2)`

### Viewport Canvas HUD
- Background: `rgba(18,18,22,0.75)`, blur: `12px`
- Border: `1px solid rgba(255,255,255,0.1)`
- Contains: camera switchers, wireframe toggle, lighting preset icons

---

## Animation Principles

- **Entrance:** Elements fade+slide up (`opacity: 0 → 1`, `translateY(20px → 0)`, `duration: 0.6s, ease: power2.out`)
- **Hover:** `transition: all 200ms ease`
- **Page transitions:** Framer Motion `AnimatePresence` — fade + scale (`0.95 → 1`)
- **Scroll:** GSAP ScrollTrigger with `scrub: 1` for parallax elements
- **Reduced motion:** All animations wrapped in `@media (prefers-reduced-motion: reduce)` — instant state changes, no movement
