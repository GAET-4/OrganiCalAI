# Design System Page — Spec

**Date:** 2026-03-20
**Status:** Approved

## Context

The project currently stores a Pencil design file (`public/design/design-system.pen`) as the design system reference. This file is encrypted, not human-readable, and requires external tooling to view. The goal is to replace it with a live in-app page at `/design-system` that documents the actual design tokens and components as they exist in code — always in sync with the running app.

## Decision Summary

- **Access:** Public route (no login required), useful for sharing with external collaborators
- **Layout:** Tabbed navigation (4 tabs), no app Layout shell (standalone documentation page)
- **Code structure:** One component per tab section (Approach B)
- **Sections:** Colors, Typography, Components, Shadows & Radius

## What to Remove

- Delete `public/design/design-system.pen`
- Delete `public/design/` directory (will be empty)

## Files to Create

```
src/ui/pages/design-system/
├── DesignSystemPage.tsx     ← Tab shell (no Layout wrapper)
├── ColorsSection.tsx        ← Color palette with CSS token swatches
├── TypographySection.tsx    ← Font scales and text styles
├── ComponentsSection.tsx    ← Live component demos
└── ShadowsSection.tsx       ← Neo-Soft shadows + border radius scale
```

## Routing

The route `/design-system` is added as a direct child of `rootRoute` (public, no PrivateRoute, no Layout):

```
root
├── /login           → LoginPage (public)
├── /design-system   → DesignSystemPage (public, NEW)
└── /layout          → Layout
    └── /private     → PrivateRoute
        └── ... app routes
```

## Page Structure

`DesignSystemPage` renders a standalone page with:
- Header: "OrganiCal.ai — Design System" title with gradient, subtitle
- `Tabs` component (shadcn/ui, variant `line` or `default`) with 4 tabs
- No sidebar, no bottom nav — full-width, max-width container, centered

## Tab Content

### Tab 1 — Couleurs

Grid of color swatches. Each swatch shows:
- Colored square (background: `var(--token-name)`)
- Token name (e.g. `--primary`)
- OKLCh value (e.g. `oklch(0.790 0.117 245)`)

Groups:
1. **Surface** — background, card, popover
2. **Content** — foreground, muted-foreground
3. **Interactive** — primary, secondary, accent, destructive
4. **Structure** — border, input, ring, muted

### Tab 2 — Typographie

- Font family: Geist Variable — displayed as live text
- Size scale: xs (0.75rem) through 4xl (2.25rem), each showing a sample sentence
- Weights: 400 Regular, 500 Medium, 600 Semibold, 700 Bold
- Real text styles used in the app: H1 gradient title, H2 section header, body, label, muted caption

### Tab 3 — Composants

Sub-sections with rendered live instances:

**Button** — all variants in a row: default, outline, secondary, ghost, destructive, link. Below: sizes xs, sm, default, lg. Disabled state demo.

**Input** — normal state with Label, placeholder text, focus (visual note), disabled state.

**Badge** — all variants in a row: default, secondary, destructive, outline, ghost.

**Card** — one Card with CardHeader (CardTitle + CardDescription), CardContent (body text), CardFooter (with a Button).

**Tabs** — a nested Tab demo with 2 tabs switching content.

**Skeleton** — 3 skeleton blocks of varying width, representing a loading state.

### Tab 4 — Shadows & Radius

**Shadows:**
Three white card squares demonstrating each shadow class:
- `shadow-neo` → `6px 6px 14px #C8D0DF, -6px -6px 14px #FFFFFF`
- `shadow-neo-sm` → `3px 3px 8px #C8D0DF, -3px -3px 8px #FFFFFF`
- `shadow-neo-pressed` → `inset 3px 3px 8px #C8D0DF, inset -3px -3px 8px #FFFFFF`

**Border Radius scale:**
7 boxes showing each level:
- sm → 0.45rem
- md → 0.60rem
- lg → 0.75rem (base)
- xl → 1.05rem
- 2xl → 1.35rem
- 3xl → 1.65rem
- 4xl → 1.95rem

## Verification

1. Navigate to `/design-system` without being logged in → page renders correctly
2. Navigate to `/design-system` while logged in → page still renders correctly
3. All 4 tabs switch without error
4. Color swatches render with the correct CSS variable colors
5. All Button variants render without visual regression
6. `public/design/` directory no longer exists
7. No broken links in the app (nav items unchanged)
