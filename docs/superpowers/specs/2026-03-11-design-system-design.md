# Design System — OrganiCalAI

**Date:** 2026-03-11
**Status:** Approved

---

## Overview

Create a Pencil design system file at `public/design/design-system.pen` that documents all existing UI components of the OrganiCalAI app, organized in a token-first structure with a Neo Soft visual identity (neomorphism + glassmorphism).

**Out of scope:** Full page mockups, new components not already in the codebase.

---

## Visual Identity — Neo Soft

| Token | Value | Usage |
|---|---|---|
| `primary` | `#93C5FD` | Blue-300 — buttons, links, active states |
| `primary-light` | `#BFDBFE` | Blue-200 — hover, tinted backgrounds |
| `primary-lighter` | `#DBEAFE` | Blue-100 — subtle fills |
| `accent` | `#FCD34D` | Amber-300 — badges, highlights, CTAs |
| `accent-light` | `#FDE68A` | Amber-200 — hover, tinted backgrounds |
| `background` | `#EEF2F7` | App background, neomorphic base |
| `surface` | `#F8FAFC` | Card surfaces |
| `text` | `#1F2937` | Gray-800 — primary text |
| `text-muted` | `#6B7280` | Gray-500 — secondary text |
| `shadow-dark` | `#D1D9E6` | Neomorphic inset shadow (dark side) |
| `shadow-light` | `#FFFFFF` | Neomorphic inset shadow (light side) |

**Neomorphic shadow pattern:**
```
box-shadow: 6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF;   /* raised */
box-shadow: inset 3px 3px 6px #D1D9E6, inset -3px -3px 6px #FFFFFF; /* pressed */
```

**Typography:** Geist Variable (already loaded via `@fontsource-variable/geist`)

| Scale | Size | Weight | Usage |
|---|---|---|---|
| `display` | 24px | 700 | Page titles |
| `heading` | 18px | 600 | Section headers |
| `body` | 14px | 400 | Default text |
| `caption` | 12px | 400 | Labels, meta |
| `label` | 11px | 600 uppercase | Section labels (tracking-wide) |

**Spacing scale:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48px
**Border radius scale:** 8 / 10 / 12 / 16 / 24px (full for chips)

---

## File Structure — `public/design/design-system.pen`

The canvas is organized in 4 top-level sections laid out vertically with clear separators and section labels.

### Section 1 — 🎨 Tokens

A reference sheet for all design tokens, organized in horizontal rows:

1. **Color palette** — swatches with hex values for all 10 tokens above, grouped: Blues / Accent / Neutrals
2. **Typography** — specimen for each scale (display, heading, body, caption, label) with size + weight annotations
3. **Spacing** — visual ruler showing 4 → 48px increments
4. **Radius** — corner examples from 8px to full
5. **Shadows** — raised vs pressed neomorphic examples side-by-side

### Section 2 — 🧱 Primitives

Each shadcn/ui component shown in all its variants:

- **Button** — default (primary fill), outline, ghost, destructive, disabled — all in 2 sizes (sm, default)
- **Input** — default, focus state, with error message
- **Label** — standalone, paired with input
- **Badge** — default, secondary, destructive, with custom group color
- **Card** — empty shell, with CardContent — raised neomorphic style
- **Skeleton** — single line, card placeholder (3 lines)

### Section 3 — 🧩 App Components

Components specific to OrganiCalAI, each shown with realistic data:

- **ContactCard** — with group badge and birthday countdown (3 states: normal, today, this week)
- **GroupBadge** — with 3 sample group colors (Famille orange, Amis vert, Travail violet)
- **UpcomingBanner** — 0 contacts (empty), 1 contact, 3+ contacts
- **LoadingSkeleton** — count=3 variant
- **ErrorState** — with retry button
- **EmptyState** — with CTA button

### Section 4 — 🧭 Navigation

- **BottomNav** — all 3 tabs (Home, Contacts, Groups) with active and inactive states
- **Sidebar** — desktop layout with nav items, active state highlighted
- **Layout shell** — simplified wireframe showing responsive breakpoint (mobile vs desktop)

---

## Constraints & Notes

- `.pen` files must be created and edited exclusively via the Pencil MCP tools (`batch_design`, `batch_get`, etc.)
- Use real content from `public/data/contacts.json` and `public/data/groups.json` for component examples
- All components use the Neo Soft palette — no default shadcn blue/zinc colors
- The file is for design documentation only — not linked to live code
- Add `.superpowers/` to `.gitignore` if not already present
