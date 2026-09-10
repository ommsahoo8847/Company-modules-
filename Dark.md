---
name: Obsidian Kinetic
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e7'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1e7'
  inverse-on-surface: '#303034'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#131317'
  on-background: '#e4e1e7'
  surface-variant: '#353439'
typography:
  display-hero:
    fontFamily: Syne
    fontSize: 88px
    fontWeight: '800'
    lineHeight: 92px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Syne
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Syne
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  code-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter-mobile: 1rem
  gutter-desktop: 2rem
  margin-mobile: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 5rem
  max-width: 90rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
  space-4xl: 10rem
---

## Brand & Style

This design system is engineered for elite 3D artists, creative technologists, and high-end interactive web developers. The visual identity projects technical mastery, cinematic depth, and uncompromising creative precision. It prioritizes the artwork above all else, encasing complex real-time WebGL experiences and high-fidelity 3D renders in a disciplined, gallery-grade container.

The visual style blends **Dark High-Contrast Minimalism** with **Selective Cybernetic Glassmorphism**:
- **Immersion:** Monolithic dark obsidian environments (#0A0A0C to #121216) recede into the backdrop, establishing infinite viewport depth.
- **Electric Accents:** Sparing, purposeful surges of ultraviolet and indigo (#6366F1 to #8B5CF6) denote interactivity, active state logic, and visual anchors without overwhelming media content.
- **Editorial Architectural Precision:** Aggressive scale shifts between massive, razor-sharp display typography and ultra-compact technical metadata.

## Colors

The palette operates in strict dark mode by default. Luminance hierarchy is calibrated to preserve deep contrast ratios while mitigating eye fatigue during prolonged viewing.

### Palette Architecture
- **Canvas / Base Surface (`#0A0A0C`):** Deep obsidian black void serving as the global viewport background.
- **Layer 1 Surface (`#121216`):** Charcoal background for interactive cards, side drawers, and floating panels.
- **Layer 2 Surface (`#1A1A22`):** Elevated state for nested components, inputs, and active selections.
- **Ghost Borders & Gridlines (`#26262E`):** Fine hairline dividers with a crisp 1px footprint. Hover states scale to `#3E3E4D`.
- **Primary Accent (`#6366F1` / Electric Indigo):** Reserved for focal calls-to-action, active progress indicators, and keyboard focus rings.
- **Secondary Accent (`#8B5CF6` / Cyber Violet):** Paired with the primary accent in directional linear gradients (135deg) for badges, ambient glow backdrops, and interactive state transitions.
- **Tertiary Accent (`#06B6D4` / Radiant Cyan):** Ultra-sparse telemetry accent; used for render status indicators, WebGL FPS counters, and live node states.
- **Text & Foreground:**
  - **High-Contrast Pure (`#FFFFFF`):** Display headings and active icons.
  - **Muted Body (`#E2E2E8`):** Readable text with reduced glare.
  - **Subtle / Technical (`#8E8E9F`):** Metadata, breadcrumbs, tags, and timestamps.
  - **Disabled / Inactive (`#4A4A58`):** Inactive elements and placeholders.

## Typography

The typographic hierarchy combines the sculptural, forward-leaning attitude of **Syne** with the neutral, hyper-legible geometric construction of **Plus Jakarta Sans**, grounded by the engineering precision of **JetBrains Mono** for render parameters and metadata.

### Typography Rules
- **Display & Headlines (Syne):** Capitalize on high-contrast tracking. Render hero headlines tight (`-0.04em` to `-0.02em`) to bind characters visually. Use weights `700` and `800` strictly.
- **Body & Paragraphs (Plus Jakarta Sans):** Set at generous line heights (`1.5` to `1.6`) to maintain effortless scannability against intense black backgrounds. Never use pure white for large bodies of copy; employ `#E2E2E8` to mitigate optical vibration.
- **Labels & System Meta (JetBrains Mono):** Set in uppercase with expanded tracking (`0.08em`) to convey blueprint and technical CAD aesthetics. Use for asset polycounts, shader models, render times, and tags.

## Layout & Spacing

The layout model uses a **12-column dynamic fluid grid** constrained within an architectural max-width of `90rem` (1440px), flanked by generous dynamic outer margins to create an intentional "framed exhibition" atmosphere.

### Grid & Breakpoints
- **Mobile (< 768px):** 4 columns, `1.25rem` screen margins, `1rem` gutters. Stacks interactive canvas viewports and meta cards into a linear monolithic narrative.
- **Tablet (768px - 1024px):** 8 columns, `2.5rem` screen margins, `1.5rem` gutters. Split layout allowing 3D models to dock top or half-screen with sticky technical specifications.
- **Desktop (> 1024px):** 12 columns, `5rem` screen margins, `2rem` gutters. Asymmetric modular compositions (e.g., 8-column primary viewport with a 4-column live-tweak parameters panel).

### Spacing Philosophy
Rhythm follows an 8pt architectural system. Micro-interactions and card interiors maintain compact, dense spacing (`0.5rem` to `1.5rem`), contrasting deliberately with massive section gutters (`6rem` to `10rem`). This wide negative space allows visual weight to settle exclusively on high-render-detail 3D artwork.

## Elevation & Depth

Visual depth is achieved through layered illumination and transparency rather than conventional drop shadows. Physical light metaphors within the UI reflect the properties of 3D virtual production.

### Layering Principles
- **Base Level 0 (Viewport Void):** `#0A0A0C` solid background.
- **Level 1 (Subsurface Containers):** Fill `#121216` at 80% opacity paired with `backdrop-filter: blur(16px)` and a solid 1px inner border of `#26262E`.
- **Level 2 (Active/Hovered Overlays):** Fill `#1A1A22` at 90% opacity with an intensified 1px border of `#6366F1` at 50% opacity.
- **Luminescent Ambient Glows:** Subtle radial gradients (`rgba(99, 102, 241, 0.12)`) cast from behind focal 3D cards or primary interactive anchors with a blur radius of `48px` to `80px`.
- **Specular Edge Highlights:** Use top-edge linear gradients (`linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)`) on cards to simulate directional overhead lighting.

## Shapes

The shape vocabulary uses the **Soft (Level 1)** profile. This maintains industrial discipline, echoing monolithic hardware monitors and viewport frames without descending into brutalist harshness.

### Corner Radii
- **Micro Radii (`0.25rem` / 4px):** Checkboxes, tags, code snippets, status badges.
- **Standard Radii (`0.5rem` / 8px):** Buttons, form inputs, tooltips, secondary chips.
- **Container Radii (`0.75rem` / 12px):** Project cards, 3D viewport canvas frames, modal overlays, sticky nav bars.
- **Strict Prohibition:** Fully circular pill shapes are disallowed for primary UI containers and CTA buttons to preserve the architectural, structural aesthetic.

## Components

### Buttons
- **Primary CTA:** Solid linear gradient (`135deg, #6366F1, #8B5CF6`) with `#FFFFFF` text (Syne 600, 14px). Border-radius: `0.5rem`. Box shadow: `0 0 20px rgba(99, 102, 241, 0.35)`. On hover, translate `-1px` vertically with a box-shadow intensity increase to `rgba(99, 102, 241, 0.55)`.
- **Secondary / Ghost Button:** Transparent background, 1px solid `#26262E`, text `#E2E2E8`. On hover: border-color transitions to `#6366F1`, background transforms to `rgba(99, 102, 241, 0.08)`.
- **Icon / Tool Button:** Square container (`40px × 40px`), `#121216` fill, `0.25rem` radius, with `#8E8E9F` icons shifting to `#FFFFFF` on active states.

### Project Showcase Cards
- **Architecture:** Contained within a `0.75rem` radius wrapper. Background `#121216` with a crisp `1px solid #26262E` boundary.
- **Media Window:** Aspect-ratio locked (`16:10` or `4:3`) canvas container with subtle inset shadow.
- **Card Meta Footer:** Horizontal layout separating the project name (Syne 600, 18px, `#FFFFFF`) from technical discipline tags and completion year (JetBrains Mono, `#8E8E9F`).
- **Hover State:** The 1px perimeter border animates via gradient sweep (`#6366F1` to `#8B5CF6`). An ambient ultraviolet glow awakens behind the thumbnail (`box-shadow: 0 12px 36px rgba(99, 102, 241, 0.15)`).

### Chips & Badges
- **Technical Badges:** Height `24px`, padding `0 8px`, JetBrains Mono uppercase 10px. Background `rgba(255, 255, 255, 0.04)`, border `1px solid rgba(255, 255, 255, 0.08)`, text `#8E8E9F`.
- **Live Status Badge:** Displays a pulsating dot indicator (4px circle in `#06B6D4`) paired with uppercase label text (`WEBGL 2.0`, `AVAILABLE FOR COMMISSIONS`).

### Input Fields & Controls
- **Text Inputs:** `#0A0A0C` inset background, 1px solid `#26262E`, text `#FFFFFF`, typography Plus Jakarta Sans 14px. Inner padding `0.75rem 1rem`. Focus state: border shifts to `#6366F1`, with a `0 0 0 2px rgba(99, 102, 241, 0.2)` ring.
- **Sliders (3D Parameter Adjusters):** Track height `2px`, background `#26262E`. Filled bar `#6366F1`. Thumb is a `12px × 12px` square rotated 45 degrees, filled with `#FFFFFF` and glowing on drag.

### Lists & Tables
- **Exhibition Records / Project Archives:** Borderless table rows separated exclusively by 1px horizontal `#26262E` rules. Default row state `#0A0A0C`; hover state illuminates row to `rgba(255, 255, 255, 0.02)`. Left column Syne bold title, center column JetBrains Mono discipline categorization, right column terminal year.

### Specialized 3D/Creative Components
- **Viewport Canvas HUD:** Floating transparent navigation overlays inside the 3D viewport containing camera switchers, wireframe toggles, and lighting preset icons. Glassmorphic backing: `rgba(18, 18, 22, 0.75)`, blur `12px`, border `1px solid rgba(255, 255, 255, 0.1)`.
- **Shader / Code Drawer:** Monospaced terminal container with tabbed shader code inspection, tokenized using `#06B6D4`, `#8B5CF6`, and `#E2E2E8`.