# Design System Page — Spec

**Date:** 2026-03-20
**Status:** Approved

## Context

The project currently stores a Pencil design file (`public/design/design-system.pen`) as the design system reference. This file is encrypted, not human-readable, and requires external tooling to view. The goal is to replace it with a live in-app page at `/design-system` that documents the actual design tokens and components as they exist in code — always in sync with the running app.

The page renders inside the same React tree as the rest of the app (same `AuthProvider`, `QueryClientProvider`, global CSS), but it sits outside the `PrivateRoute` guard — making it publicly accessible at the routing level without needing a token.

## Decision Summary

- **Access:** Public route (no login required)
- **Layout:** Tabbed navigation (4 tabs), no app Layout shell (standalone documentation page)
- **Code structure:** One component per tab section
- **Sections:** Colors, Typography, Components, Shadows & Radius

## What to Remove

- Delete `public/design/design-system.pen`
- Delete `public/design/` directory (will be empty after removing the .pen file)

## Files to Create

```
src/ui/pages/design-system/
├── DesignSystemPage.tsx     ← Tab shell (no Layout wrapper)
├── ColorsSection.tsx        ← Color palette with CSS token swatches
├── TypographySection.tsx    ← Font scales and text styles
├── ComponentsSection.tsx    ← Live component demos
└── ShadowsSection.tsx       ← Neo-Soft shadows + border radius scale
```

**Import paths:** shadcn/ui components live at `src/components/ui/` (not `src/ui/components/`). Imports use `@/components/ui/button`, `@/components/ui/card`, etc.

## Routing

Add a `designSystemRoute` as a direct child of `rootRoute`, alongside `loginRoute`. The pathless `layoutRoute` and `privateRoute` routes carry no URL segment (they use `id`, not `path`).

Updated `router.tsx` route tree:

```
root
├── /login           → LoginPage (public)
├── /design-system   → DesignSystemPage (public, NEW)
└── (layout)         → Layout shell (pathless, id: 'layout')
    └── (private)    → PrivateRoute (pathless, id: 'private')
        ├── /        → HomePage
        ├── /contacts → ContactsPage
        └── ...
```

Required code additions in `router.tsx`:

```ts
const designSystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/design-system',
  component: DesignSystemPage,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  designSystemRoute,   // ← add here
  layoutRoute.addChildren([
    privateRoute.addChildren([...]),
  ]),
])
```

## Page Structure

`DesignSystemPage` renders a standalone page with:
- Header: "OrganiCal.ai — Design System" title with gradient, subtitle
- Outer navigation: `<TabsList variant="line">` (underline style) — `variant` is on `TabsList`, not on `Tabs`
- Inner demo tabs (ComponentsSection): default variant (filled pill) — visually distinct from the outer nav
- No sidebar, no bottom nav — full-width, max-width container, centered

## Tab Content

### Tab 1 — Couleurs

Grid of color swatches. Each swatch shows:
- Colored square (`background: var(--token-name)`)
- Token name (e.g. `--primary`)
- OKLCh value (e.g. `oklch(0.790 0.117 245)`)

**In scope:** semantic and interactive tokens only. Sidebar family tokens (`--sidebar`, `--sidebar-foreground`, etc.) and chart tokens (`--chart-1` through `--chart-5`) are **excluded** — they are not part of the core app design language.

Groups:
1. **Surface** — `--background`, `--card`, `--popover`
2. **Content** — `--foreground`, `--card-foreground`, `--muted-foreground`
3. **Interactive** — `--primary`, `--secondary`, `--accent`, `--destructive`
4. **Structure** — `--border`, `--input`, `--ring`, `--muted`

Note: `--border`, `--input`, and `--muted` intentionally share the same OKLCh value in the current theme — their swatches will look identical. This is by design, not a rendering bug.

### Tab 2 — Typographie

- Font family: Geist Variable — displayed as a live text example
- Size scale: `text-xs` through `text-4xl`, each showing a sample sentence and the rem value
- Weights: 400 Regular, 500 Medium, 600 Semibold, 700 Bold
- Real text styles used in the app: H1 gradient title, H2 section header, body, label, muted caption

### Tab 3 — Composants

Sub-sections with rendered live instances:

**Button** — 6 variants × 4 sizes grid: variants (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`) as rows, sizes (`xs`, `sm`, `default`, `lg`) as columns. Note: `lg` (`h-9`) is shorter than `default` (`h-10`) — intentional component behavior. Icon sizes (`icon`, `icon-xs`, `icon-sm`, `icon-lg`) are excluded. Disabled state shown for one variant below the grid.

**Input** — normal state with Label, placeholder text, and disabled state.

**Badge** — all 6 variants in a row: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`.

**Card** — one Card with CardHeader (CardTitle + CardDescription), CardContent (body text), CardFooter (with a Button).

**Tabs** — a nested Tab demo with 2 tabs switching content, default variant (filled pill — distinct from the outer `line` nav).

**Skeleton** — 3 skeleton blocks of varying width.

### Tab 4 — Shadows & Radius

**Shadows:**
Three white card boxes demonstrating each Neo-Soft shadow:
- `shadow-neo` → `6px 6px 14px #C8D0DF, -6px -6px 14px #FFFFFF`
- `shadow-neo-sm` → `3px 3px 8px #C8D0DF, -3px -3px 8px #FFFFFF`
- `shadow-neo-pressed` → `inset 3px 3px 8px #C8D0DF, inset -3px -3px 8px #FFFFFF`

**Border Radius scale:**
7 boxes — one per utility listed below. In Tailwind v4 with `@theme inline`, these utilities resolve to the project's `--radius-*` CSS variables, **not** to Tailwind's default radius values. Display the computed value alongside each box:

| Utility | Formula | Computed |
|---|---|---|
| `rounded-sm` | `var(--radius) * 0.6` | 0.45rem |
| `rounded-md` | `var(--radius) * 0.8` | 0.60rem |
| `rounded-lg` | `var(--radius)` | 0.75rem |
| `rounded-xl` | `var(--radius) * 1.4` | 1.05rem |
| `rounded-2xl` | `var(--radius) * 1.8` | 1.35rem |
| `rounded-3xl` | `var(--radius) * 2.2` | 1.65rem |
| `rounded-4xl` | `var(--radius) * 2.6` | 1.95rem |

## Verification

1. Navigate to `/design-system` without being logged in → page renders correctly (public access)
2. Navigate to `/design-system` while logged in → page still renders correctly
3. All 4 tabs switch without error
4. Color swatches render with the correct CSS variable colors (no blank/invisible swatches)
5. All Button variants and Badge variants render (6 each)
6. `public/design/` directory no longer exists
7. No broken links in the app navigation (nav items and routes unchanged)
8. TypeScript build passes (`tsc -b`)
