# Design System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `public/design/design-system.pen` — a Pencil design system file documenting all OrganiCalAI UI components with the Neo Soft palette (neomorphism/glassmorphism).

**Architecture:** The .pen file is organized in 4 top-level frame sections stacked vertically: Tokens → Primitives → App Components → Navigation. Each section is an independent artboard. All design work goes through Pencil MCP tools exclusively (`batch_design`, `batch_get`, `get_screenshot`, etc.).

**Tech Stack:** Pencil MCP (`mcp__pencil__*` tools) · Neo Soft palette (#93C5FD, #FCD34D, #EEF2F7, #1F2937)

---

## Reference — Neo Soft Tokens

| Token | Hex | Role |
|---|---|---|
| primary | #93C5FD | Buttons, active states, icons |
| primary-light | #BFDBFE | Hover, tinted fills |
| primary-lighter | #DBEAFE | Subtle backgrounds |
| accent | #FCD34D | Badges, group chips, CTAs |
| accent-light | #FDE68A | Hover accent |
| background | #EEF2F7 | App background, neomorphic base |
| surface | #F8FAFC | Card surfaces |
| text | #1F2937 | Primary text |
| text-muted | #6B7280 | Secondary text |
| shadow-dark | #D1D9E6 | Neomorphic dark shadow |
| shadow-light | #FFFFFF | Neomorphic light shadow |

**Neomorphic shadow raised:** `6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF`
**Neomorphic shadow pressed:** `inset 3px 3px 6px #D1D9E6, inset -3px -3px 6px #FFFFFF`

---

## Chunk 1: Setup & File Creation

### Task 1: Create folder and initialize .pen file

**Files:**
- Create: `public/design/` (directory)
- Create: `public/design/design-system.pen` (Pencil file)

- [ ] **Step 1: Create the public/design directory**

```bash
mkdir -p public/design
```

- [ ] **Step 2: Get Pencil editor state**

Call `mcp__pencil__get_editor_state()` to confirm no existing active document.

- [ ] **Step 3: Open a new .pen document at the target path**

Call `mcp__pencil__open_document("public/design/design-system.pen")`.
Expected: editor opens with a blank canvas.

- [ ] **Step 4: Fetch Pencil web-app guidelines**

Call `mcp__pencil__get_guidelines("web-app")` and read carefully — these rules govern valid node types, layout constraints, and property names. Keep the result in context for all subsequent tasks.

- [ ] **Step 5: Fetch a matching style guide**

Call `mcp__pencil__get_style_guide_tags()` to list available tags.
Then call `mcp__pencil__get_style_guide("minimal clean modern neomorphism")` to load a style guide aligned with the Neo Soft vibe. Note the node property conventions it defines.

- [ ] **Step 6: Take an initial screenshot to confirm blank canvas**

Call `mcp__pencil__get_screenshot()`.
Expected: empty canvas.

- [ ] **Step 7: Commit**

```bash
git add public/design/design-system.pen
git commit -m "feat: initialize design-system.pen"
```

---

## Chunk 2: Section 1 — Tokens

### Task 2: Color palette frame

**Goal:** A reference row of 11 color swatches with hex labels.

- [ ] **Step 1: Insert the Tokens section frame**

Use `mcp__pencil__batch_design()`:
```
tokensFrame=I("root", { type: "frame", name: "🎨 Tokens", x: 0, y: 0, width: 1200, height: 800, fill: "#EEF2F7" })
tokensTitle=I(tokensFrame, { type: "text", name: "section-title", text: "🎨 Tokens", x: 40, y: 32, fontSize: 24, fontWeight: 700, fill: "#1F2937" })
colorSection=I(tokensFrame, { type: "frame", name: "Colors", x: 40, y: 80, width: 1120, height: 120, fill: "transparent" })
colorLabel=I(colorSection, { type: "text", text: "COULEURS", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
```

- [ ] **Step 2: Insert color swatches row**

```
sw1=I(colorSection, { type: "rectangle", name: "primary", x: 0, y: 24, width: 80, height: 56, fill: "#93C5FD", cornerRadius: 12 })
swL1=I(colorSection, { type: "text", text: "#93C5FD\nprimary", x: 0, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw2=I(colorSection, { type: "rectangle", name: "primary-light", x: 96, y: 24, width: 80, height: 56, fill: "#BFDBFE", cornerRadius: 12 })
swL2=I(colorSection, { type: "text", text: "#BFDBFE\nprimary-light", x: 96, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw3=I(colorSection, { type: "rectangle", name: "primary-lighter", x: 192, y: 24, width: 80, height: 56, fill: "#DBEAFE", cornerRadius: 12 })
swL3=I(colorSection, { type: "text", text: "#DBEAFE\nprimary-lighter", x: 192, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw4=I(colorSection, { type: "rectangle", name: "accent", x: 320, y: 24, width: 80, height: 56, fill: "#FCD34D", cornerRadius: 12 })
swL4=I(colorSection, { type: "text", text: "#FCD34D\naccent", x: 320, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw5=I(colorSection, { type: "rectangle", name: "accent-light", x: 416, y: 24, width: 80, height: 56, fill: "#FDE68A", cornerRadius: 12 })
swL5=I(colorSection, { type: "text", text: "#FDE68A\naccent-light", x: 416, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw6=I(colorSection, { type: "rectangle", name: "background", x: 544, y: 24, width: 80, height: 56, fill: "#EEF2F7", cornerRadius: 12, stroke: "#D1D9E6", strokeWidth: 1 })
swL6=I(colorSection, { type: "text", text: "#EEF2F7\nbackground", x: 544, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw7=I(colorSection, { type: "rectangle", name: "surface", x: 640, y: 24, width: 80, height: 56, fill: "#F8FAFC", cornerRadius: 12, stroke: "#D1D9E6", strokeWidth: 1 })
swL7=I(colorSection, { type: "text", text: "#F8FAFC\nsurface", x: 640, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw8=I(colorSection, { type: "rectangle", name: "text", x: 768, y: 24, width: 80, height: 56, fill: "#1F2937", cornerRadius: 12 })
swL8=I(colorSection, { type: "text", text: "#1F2937\ntext", x: 768, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw9=I(colorSection, { type: "rectangle", name: "text-muted", x: 864, y: 24, width: 80, height: 56, fill: "#6B7280", cornerRadius: 12 })
swL9=I(colorSection, { type: "text", text: "#6B7280\ntext-muted", x: 864, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
sw10=I(colorSection, { type: "rectangle", name: "shadow-dark", x: 992, y: 24, width: 80, height: 56, fill: "#D1D9E6", cornerRadius: 12 })
swL10=I(colorSection, { type: "text", text: "#D1D9E6\nshadow-dark", x: 992, y: 86, width: 80, fontSize: 10, fill: "#6B7280", textAlign: "center" })
```

- [ ] **Step 3: Verify screenshot of color swatches**

Call `mcp__pencil__get_screenshot()`. Confirm 10 swatches are visible with labels.

### Task 3: Typography, Spacing, Radius, Shadows tokens

- [ ] **Step 1: Insert typography specimen section**

```
typoSection=I(tokensFrame, { type: "frame", name: "Typography", x: 40, y: 220, width: 1120, height: 200, fill: "transparent" })
typoLabel=I(typoSection, { type: "text", text: "TYPOGRAPHIE · Geist Variable", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
t1=I(typoSection, { type: "text", text: "Display — 24px Bold", x: 0, y: 24, fontSize: 24, fontWeight: 700, fill: "#1F2937" })
t2=I(typoSection, { type: "text", text: "Heading — 18px Semibold", x: 0, y: 64, fontSize: 18, fontWeight: 600, fill: "#1F2937" })
t3=I(typoSection, { type: "text", text: "Body — 14px Regular", x: 0, y: 96, fontSize: 14, fontWeight: 400, fill: "#1F2937" })
t4=I(typoSection, { type: "text", text: "Caption — 12px Regular", x: 0, y: 122, fontSize: 12, fontWeight: 400, fill: "#6B7280" })
t5=I(typoSection, { type: "text", text: "LABEL — 11PX SEMIBOLD UPPERCASE", x: 0, y: 146, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
```

- [ ] **Step 2: Insert spacing scale section**

```
spacingSection=I(tokensFrame, { type: "frame", name: "Spacing", x: 40, y: 440, width: 700, height: 120, fill: "transparent" })
spacingLabel=I(spacingSection, { type: "text", text: "SPACING", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
```

Then insert spacing blocks at x positions [0,12,28,52,84,124,172,228] for sizes [4,8,12,16,20,24,32,48]:
```
sp1=I(spacingSection, { type: "rectangle", x: 0, y: 24, width: 4, height: 4, fill: "#93C5FD" })
spL1=I(spacingSection, { type: "text", text: "4", x: 0, y: 36, fontSize: 10, fill: "#6B7280" })
sp2=I(spacingSection, { type: "rectangle", x: 12, y: 24, width: 8, height: 8, fill: "#93C5FD" })
spL2=I(spacingSection, { type: "text", text: "8", x: 12, y: 40, fontSize: 10, fill: "#6B7280" })
sp3=I(spacingSection, { type: "rectangle", x: 28, y: 24, width: 12, height: 12, fill: "#93C5FD" })
spL3=I(spacingSection, { type: "text", text: "12", x: 28, y: 44, fontSize: 10, fill: "#6B7280" })
sp4=I(spacingSection, { type: "rectangle", x: 52, y: 24, width: 16, height: 16, fill: "#93C5FD" })
spL4=I(spacingSection, { type: "text", text: "16", x: 52, y: 48, fontSize: 10, fill: "#6B7280" })
sp5=I(spacingSection, { type: "rectangle", x: 84, y: 24, width: 20, height: 20, fill: "#93C5FD" })
spL5=I(spacingSection, { type: "text", text: "20", x: 84, y: 52, fontSize: 10, fill: "#6B7280" })
sp6=I(spacingSection, { type: "rectangle", x: 120, y: 24, width: 24, height: 24, fill: "#93C5FD" })
spL6=I(spacingSection, { type: "text", text: "24", x: 120, y: 56, fontSize: 10, fill: "#6B7280" })
sp7=I(spacingSection, { type: "rectangle", x: 160, y: 24, width: 32, height: 32, fill: "#93C5FD" })
spL7=I(spacingSection, { type: "text", text: "32", x: 160, y: 64, fontSize: 10, fill: "#6B7280" })
sp8=I(spacingSection, { type: "rectangle", x: 208, y: 24, width: 48, height: 48, fill: "#93C5FD" })
spL8=I(spacingSection, { type: "text", text: "48", x: 208, y: 80, fontSize: 10, fill: "#6B7280" })
```

- [ ] **Step 3: Insert radius scale section**

```
radiusSection=I(tokensFrame, { type: "frame", name: "Radius", x: 760, y: 440, width: 400, height: 120, fill: "transparent" })
radiusLabel=I(radiusSection, { type: "text", text: "RADIUS", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
r1=I(radiusSection, { type: "rectangle", x: 0, y: 24, width: 48, height: 48, fill: "#BFDBFE", cornerRadius: 8 })
rL1=I(radiusSection, { type: "text", text: "8px", x: 0, y: 80, fontSize: 10, fill: "#6B7280" })
r2=I(radiusSection, { type: "rectangle", x: 64, y: 24, width: 48, height: 48, fill: "#BFDBFE", cornerRadius: 10 })
rL2=I(radiusSection, { type: "text", text: "10px", x: 64, y: 80, fontSize: 10, fill: "#6B7280" })
r3=I(radiusSection, { type: "rectangle", x: 128, y: 24, width: 48, height: 48, fill: "#BFDBFE", cornerRadius: 12 })
rL3=I(radiusSection, { type: "text", text: "12px", x: 128, y: 80, fontSize: 10, fill: "#6B7280" })
r4=I(radiusSection, { type: "rectangle", x: 192, y: 24, width: 48, height: 48, fill: "#BFDBFE", cornerRadius: 16 })
rL4=I(radiusSection, { type: "text", text: "16px", x: 192, y: 80, fontSize: 10, fill: "#6B7280" })
r5=I(radiusSection, { type: "rectangle", x: 256, y: 24, width: 48, height: 48, fill: "#BFDBFE", cornerRadius: 24 })
rL5=I(radiusSection, { type: "text", text: "24px", x: 256, y: 80, fontSize: 10, fill: "#6B7280" })
```

- [ ] **Step 4: Insert shadow examples section**

```
shadowSection=I(tokensFrame, { type: "frame", name: "Shadows", x: 40, y: 580, width: 600, height: 160, fill: "transparent" })
shadowLabel=I(shadowSection, { type: "text", text: "SHADOWS NÉOMORPHIQUES", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
shRaised=I(shadowSection, { type: "rectangle", name: "raised", x: 0, y: 24, width: 120, height: 80, fill: "#EEF2F7", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
shRaisedL=I(shadowSection, { type: "text", text: "Raised\n6px 6px 12px #D1D9E6\n-6px -6px 12px #FFF", x: 0, y: 112, fontSize: 10, fill: "#6B7280" })
shPressed=I(shadowSection, { type: "rectangle", name: "pressed", x: 160, y: 24, width: 120, height: 80, fill: "#EEF2F7", cornerRadius: 16, shadow: "inset 3px 3px 6px #D1D9E6, inset -3px -3px 6px #FFFFFF" })
shPressedL=I(shadowSection, { type: "text", text: "Pressed\ninset 3px 3px 6px #D1D9E6\ninset -3px -3px 6px #FFF", x: 160, y: 112, fontSize: 10, fill: "#6B7280" })
```

- [ ] **Step 5: Verify full Tokens section screenshot**

Call `mcp__pencil__get_screenshot()` on `tokensFrame`. Confirm all 5 sub-sections are visible.

- [ ] **Step 6: Commit**

```bash
git add public/design/design-system.pen
git commit -m "feat(design): add Tokens section — colors, typography, spacing, radius, shadows"
```

---

## Chunk 3: Section 2 — Primitives

### Task 4: Button variants

**Goal:** All 5 button variants × 2 sizes displayed side by side.

- [ ] **Step 1: Insert Primitives frame**

```
primFrame=I("root", { type: "frame", name: "🧱 Primitives", x: 0, y: 840, width: 1200, height: 900, fill: "#EEF2F7" })
primTitle=I(primFrame, { type: "text", text: "🧱 Primitives", x: 40, y: 32, fontSize: 24, fontWeight: 700, fill: "#1F2937" })
btnSection=I(primFrame, { type: "frame", name: "Buttons", x: 40, y: 80, width: 1120, height: 160, fill: "transparent" })
btnLabel=I(btnSection, { type: "text", text: "BUTTON", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
```

- [ ] **Step 2: Insert button variants — default row**

```
btnDef=I(btnSection, { type: "rectangle", name: "btn-default", x: 0, y: 24, width: 120, height: 36, fill: "#93C5FD", cornerRadius: 10, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
btnDefT=I(btnSection, { type: "text", text: "Default", x: 0, y: 24, width: 120, height: 36, fontSize: 14, fontWeight: 600, fill: "#1F2937", textAlign: "center", verticalAlign: "middle" })
btnOut=I(btnSection, { type: "rectangle", name: "btn-outline", x: 136, y: 24, width: 120, height: 36, fill: "transparent", cornerRadius: 10, stroke: "#93C5FD", strokeWidth: 1.5 })
btnOutT=I(btnSection, { type: "text", text: "Outline", x: 136, y: 24, width: 120, height: 36, fontSize: 14, fontWeight: 600, fill: "#93C5FD", textAlign: "center", verticalAlign: "middle" })
btnGhost=I(btnSection, { type: "rectangle", name: "btn-ghost", x: 272, y: 24, width: 120, height: 36, fill: "transparent", cornerRadius: 10 })
btnGhostT=I(btnSection, { type: "text", text: "Ghost", x: 272, y: 24, width: 120, height: 36, fontSize: 14, fontWeight: 600, fill: "#1F2937", textAlign: "center", verticalAlign: "middle" })
btnDestr=I(btnSection, { type: "rectangle", name: "btn-destructive", x: 408, y: 24, width: 120, height: 36, fill: "#FCA5A5", cornerRadius: 10, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
btnDestrT=I(btnSection, { type: "text", text: "Destructive", x: 408, y: 24, width: 120, height: 36, fontSize: 14, fontWeight: 600, fill: "#7F1D1D", textAlign: "center", verticalAlign: "middle" })
btnDis=I(btnSection, { type: "rectangle", name: "btn-disabled", x: 544, y: 24, width: 120, height: 36, fill: "#D1D9E6", cornerRadius: 10 })
btnDisT=I(btnSection, { type: "text", text: "Disabled", x: 544, y: 24, width: 120, height: 36, fontSize: 14, fontWeight: 600, fill: "#9CA3AF", textAlign: "center", verticalAlign: "middle" })
```

- [ ] **Step 3: Insert small size row**

```
btnDefSm=I(btnSection, { type: "rectangle", name: "btn-default-sm", x: 0, y: 76, width: 88, height: 28, fill: "#93C5FD", cornerRadius: 8 })
btnDefSmT=I(btnSection, { type: "text", text: "Default sm", x: 0, y: 76, width: 88, height: 28, fontSize: 12, fontWeight: 600, fill: "#1F2937", textAlign: "center", verticalAlign: "middle" })
btnOutSm=I(btnSection, { type: "rectangle", name: "btn-outline-sm", x: 100, y: 76, width: 88, height: 28, fill: "transparent", cornerRadius: 8, stroke: "#93C5FD", strokeWidth: 1.5 })
btnOutSmT=I(btnSection, { type: "text", text: "Outline sm", x: 100, y: 76, width: 88, height: 28, fontSize: 12, fontWeight: 600, fill: "#93C5FD", textAlign: "center", verticalAlign: "middle" })
btnIconSm=I(btnSection, { type: "rectangle", name: "btn-icon-sm", x: 200, y: 76, width: 28, height: 28, fill: "#EEF2F7", cornerRadius: 8, shadow: "3px 3px 6px #D1D9E6, -3px -3px 6px #FFFFFF" })
btnIconSmT=I(btnSection, { type: "text", text: "⚙", x: 200, y: 76, width: 28, height: 28, fontSize: 14, textAlign: "center", verticalAlign: "middle", fill: "#6B7280" })
```

- [ ] **Step 4: Verify screenshot of button section**

Call `mcp__pencil__get_screenshot()`. Confirm 5 variants visible + sm row.

### Task 5: Input, Label, Badge, Card, Skeleton

- [ ] **Step 1: Insert Input section**

```
inputSection=I(primFrame, { type: "frame", name: "Input", x: 40, y: 260, width: 500, height: 140, fill: "transparent" })
inputLabel=I(inputSection, { type: "text", text: "INPUT", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
inputDefault=I(inputSection, { type: "rectangle", name: "input-default", x: 0, y: 24, width: 280, height: 36, fill: "#F8FAFC", cornerRadius: 10, stroke: "#D1D9E6", strokeWidth: 1, shadow: "inset 3px 3px 6px #D1D9E6, inset -3px -3px 6px #FFFFFF" })
inputPlaceholder=I(inputSection, { type: "text", text: "Rechercher...", x: 12, y: 24, width: 260, height: 36, fontSize: 14, fill: "#9CA3AF", verticalAlign: "middle" })
inputFocus=I(inputSection, { type: "rectangle", name: "input-focus", x: 0, y: 72, width: 280, height: 36, fill: "#F8FAFC", cornerRadius: 10, stroke: "#93C5FD", strokeWidth: 2, shadow: "inset 3px 3px 6px #D1D9E6, inset -3px -3px 6px #FFFFFF" })
inputFocusT=I(inputSection, { type: "text", text: "Marie", x: 12, y: 72, width: 260, height: 36, fontSize: 14, fill: "#1F2937", verticalAlign: "middle" })
inputError=I(inputSection, { type: "rectangle", name: "input-error", x: 300, y: 24, width: 180, height: 36, fill: "#F8FAFC", cornerRadius: 10, stroke: "#FCA5A5", strokeWidth: 1.5 })
inputErrorT=I(inputSection, { type: "text", text: "Champ requis", x: 300, y: 68, width: 180, fontSize: 11, fill: "#EF4444" })
```

- [ ] **Step 2: Insert Label + Badge section**

```
badgeSection=I(primFrame, { type: "frame", name: "Badge", x: 580, y: 260, width: 560, height: 140, fill: "transparent" })
badgeSectionL=I(badgeSection, { type: "text", text: "BADGE", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
badgeDef=I(badgeSection, { type: "rectangle", x: 0, y: 24, width: 80, height: 24, fill: "#93C5FD", cornerRadius: 12 })
badgeDefT=I(badgeSection, { type: "text", text: "Famille", x: 0, y: 24, width: 80, height: 24, fontSize: 12, fontWeight: 600, fill: "#1e3a8a", textAlign: "center", verticalAlign: "middle" })
badgeSec=I(badgeSection, { type: "rectangle", x: 92, y: 24, width: 64, height: 24, fill: "#FCD34D", cornerRadius: 12 })
badgeSecT=I(badgeSection, { type: "text", text: "Amis", x: 92, y: 24, width: 64, height: 24, fontSize: 12, fontWeight: 600, fill: "#78350f", textAlign: "center", verticalAlign: "middle" })
badgeDestr=I(badgeSection, { type: "rectangle", x: 168, y: 24, width: 80, height: 24, fill: "#FCA5A5", cornerRadius: 12 })
badgeDestrT=I(badgeSection, { type: "text", text: "Urgent", x: 168, y: 24, width: 80, height: 24, fontSize: 12, fontWeight: 600, fill: "#7F1D1D", textAlign: "center", verticalAlign: "middle" })
badgeCustom=I(badgeSection, { type: "rectangle", x: 260, y: 24, width: 80, height: 24, fill: "#86EFAC", cornerRadius: 12 })
badgeCustomT=I(badgeSection, { type: "text", text: "Travail", x: 260, y: 24, width: 80, height: 24, fontSize: 12, fontWeight: 600, fill: "#14532d", textAlign: "center", verticalAlign: "middle" })
```

- [ ] **Step 3: Insert Card section**

```
cardSection=I(primFrame, { type: "frame", name: "Card", x: 40, y: 420, width: 560, height: 200, fill: "transparent" })
cardSectionL=I(cardSection, { type: "text", text: "CARD", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
card1=I(cardSection, { type: "rectangle", name: "card-raised", x: 0, y: 24, width: 240, height: 120, fill: "#EEF2F7", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
card1T=I(cardSection, { type: "text", text: "Card Raised\nContenu ici", x: 20, y: 44, width: 200, fontSize: 14, fill: "#1F2937" })
card2=I(cardSection, { type: "rectangle", name: "card-surface", x: 264, y: 24, width: 240, height: 120, fill: "#F8FAFC", cornerRadius: 16, stroke: "#D1D9E6", strokeWidth: 1 })
card2T=I(cardSection, { type: "text", text: "Card Surface\nContenu ici", x: 284, y: 44, width: 200, fontSize: 14, fill: "#1F2937" })
```

- [ ] **Step 4: Insert Skeleton section**

```
skelSection=I(primFrame, { type: "frame", name: "Skeleton", x: 640, y: 420, width: 500, height: 200, fill: "transparent" })
skelSectionL=I(skelSection, { type: "text", text: "SKELETON", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
sk1=I(skelSection, { type: "rectangle", x: 0, y: 24, width: 300, height: 14, fill: "#D1D9E6", cornerRadius: 7 })
sk2=I(skelSection, { type: "rectangle", x: 0, y: 46, width: 220, height: 14, fill: "#D1D9E6", cornerRadius: 7 })
sk3=I(skelSection, { type: "rectangle", x: 0, y: 68, width: 260, height: 14, fill: "#D1D9E6", cornerRadius: 7 })
skCard=I(skelSection, { type: "rectangle", x: 0, y: 100, width: 280, height: 80, fill: "#EEF2F7", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
skCardLine1=I(skelSection, { type: "rectangle", x: 16, y: 116, width: 160, height: 12, fill: "#D1D9E6", cornerRadius: 6 })
skCardLine2=I(skelSection, { type: "rectangle", x: 16, y: 136, width: 100, height: 12, fill: "#D1D9E6", cornerRadius: 6 })
skCardLine3=I(skelSection, { type: "rectangle", x: 16, y: 156, width: 130, height: 12, fill: "#D1D9E6", cornerRadius: 6 })
```

- [ ] **Step 5: Verify full Primitives section screenshot**

Call `mcp__pencil__get_screenshot()` on `primFrame`. Confirm all 6 primitive types visible.

- [ ] **Step 6: Commit**

```bash
git add public/design/design-system.pen
git commit -m "feat(design): add Primitives section — button, input, badge, card, skeleton"
```

---

## Chunk 4: Section 3 — App Components

### Task 6: ContactCard variants

**Goal:** ContactCard in 3 states — normal, this week, today. Use real data from `public/data/contacts.json`.

- [ ] **Step 1: Insert App Components frame**

```
appFrame=I("root", { type: "frame", name: "🧩 Composants App", x: 0, y: 1780, width: 1200, height: 900, fill: "#EEF2F7" })
appTitle=I(appFrame, { type: "text", text: "🧩 Composants App", x: 40, y: 32, fontSize: 24, fontWeight: 700, fill: "#1F2937" })
ccSection=I(appFrame, { type: "frame", name: "ContactCard", x: 40, y: 80, width: 1120, height: 200, fill: "transparent" })
ccLabel=I(ccSection, { type: "text", text: "CONTACTCARD", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
```

- [ ] **Step 2: ContactCard — normal state**

```
cc1=I(ccSection, { type: "rectangle", name: "card-normal", x: 0, y: 24, width: 340, height: 64, fill: "#EEF2F7", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
cc1Avatar=I(ccSection, { type: "rectangle", x: 16, y: 38, width: 36, height: 36, fill: "#BFDBFE", cornerRadius: 10 })
cc1AvatarT=I(ccSection, { type: "text", text: "MD", x: 16, y: 38, width: 36, height: 36, fontSize: 12, fontWeight: 700, fill: "#1e3a8a", textAlign: "center", verticalAlign: "middle" })
cc1Name=I(ccSection, { type: "text", text: "Marie Dupont", x: 64, y: 36, fontSize: 14, fontWeight: 600, fill: "#1F2937" })
cc1Sub=I(ccSection, { type: "text", text: "Dans 45 jours", x: 64, y: 54, fontSize: 12, fill: "#6B7280" })
cc1Badge=I(ccSection, { type: "rectangle", x: 272, y: 38, width: 56, height: 22, fill: "#86EFAC", cornerRadius: 8 })
cc1BadgeT=I(ccSection, { type: "text", text: "Famille", x: 272, y: 38, width: 56, height: 22, fontSize: 11, fontWeight: 600, fill: "#14532d", textAlign: "center", verticalAlign: "middle" })
```

- [ ] **Step 3: ContactCard — this week state**

```
cc2=I(ccSection, { type: "rectangle", name: "card-week", x: 360, y: 24, width: 340, height: 64, fill: "#EEF2F7", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
cc2Avatar=I(ccSection, { type: "rectangle", x: 376, y: 38, width: 36, height: 36, fill: "#FDE68A", cornerRadius: 10 })
cc2AvatarT=I(ccSection, { type: "text", text: "PL", x: 376, y: 38, width: 36, height: 36, fontSize: 12, fontWeight: 700, fill: "#78350f", textAlign: "center", verticalAlign: "middle" })
cc2Name=I(ccSection, { type: "text", text: "Pierre Leroy", x: 424, y: 36, fontSize: 14, fontWeight: 600, fill: "#1F2937" })
cc2Sub=I(ccSection, { type: "text", text: "🎂 Dans 3 jours", x: 424, y: 54, fontSize: 12, fontWeight: 600, fill: "#F59E0B" })
cc2Badge=I(ccSection, { type: "rectangle", x: 632, y: 38, width: 56, height: 22, fill: "#93C5FD", cornerRadius: 8 })
cc2BadgeT=I(ccSection, { type: "text", text: "Amis", x: 632, y: 38, width: 56, height: 22, fontSize: 11, fontWeight: 600, fill: "#1e3a8a", textAlign: "center", verticalAlign: "middle" })
```

- [ ] **Step 4: ContactCard — today state**

```
cc3=I(ccSection, { type: "rectangle", name: "card-today", x: 720, y: 24, width: 340, height: 64, fill: "#FDE68A", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
cc3Avatar=I(ccSection, { type: "rectangle", x: 736, y: 38, width: 36, height: 36, fill: "#FCD34D", cornerRadius: 10 })
cc3AvatarT=I(ccSection, { type: "text", text: "SB", x: 736, y: 38, width: 36, height: 36, fontSize: 12, fontWeight: 700, fill: "#78350f", textAlign: "center", verticalAlign: "middle" })
cc3Name=I(ccSection, { type: "text", text: "Sophie Bernard", x: 784, y: 36, fontSize: 14, fontWeight: 600, fill: "#1F2937" })
cc3Sub=I(ccSection, { type: "text", text: "🎉 Aujourd'hui !", x: 784, y: 54, fontSize: 12, fontWeight: 700, fill: "#92400E" })
cc3Badge=I(ccSection, { type: "rectangle", x: 992, y: 38, width: 56, height: 22, fill: "#86EFAC", cornerRadius: 8 })
cc3BadgeT=I(ccSection, { type: "text", text: "Travail", x: 992, y: 38, width: 56, height: 22, fontSize: 11, fontWeight: 600, fill: "#14532d", textAlign: "center", verticalAlign: "middle" })
```

### Task 7: GroupBadge, UpcomingBanner, State components

- [ ] **Step 1: Insert GroupBadge section**

```
gbSection=I(appFrame, { type: "frame", name: "GroupBadge", x: 40, y: 300, width: 500, height: 80, fill: "transparent" })
gbLabel=I(gbSection, { type: "text", text: "GROUPBADGE", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
gb1=I(gbSection, { type: "rectangle", x: 0, y: 24, width: 88, height: 28, fill: "#FDBA74", cornerRadius: 10 })
gb1T=I(gbSection, { type: "text", text: "Famille", x: 0, y: 24, width: 88, height: 28, fontSize: 13, fontWeight: 600, fill: "#7c2d12", textAlign: "center", verticalAlign: "middle" })
gb2=I(gbSection, { type: "rectangle", x: 100, y: 24, width: 72, height: 28, fill: "#86EFAC", cornerRadius: 10 })
gb2T=I(gbSection, { type: "text", text: "Amis", x: 100, y: 24, width: 72, height: 28, fontSize: 13, fontWeight: 600, fill: "#14532d", textAlign: "center", verticalAlign: "middle" })
gb3=I(gbSection, { type: "rectangle", x: 184, y: 24, width: 80, height: 28, fill: "#C4B5FD", cornerRadius: 10 })
gb3T=I(gbSection, { type: "text", text: "Travail", x: 184, y: 24, width: 80, height: 28, fontSize: 13, fontWeight: 600, fill: "#4c1d95", textAlign: "center", verticalAlign: "middle" })
```

- [ ] **Step 2: Insert UpcomingBanner section (3 states)**

```
ubSection=I(appFrame, { type: "frame", name: "UpcomingBanner", x: 40, y: 400, width: 1120, height: 180, fill: "transparent" })
ubLabel=I(ubSection, { type: "text", text: "UPCOMINGBANNER", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
ub0=I(ubSection, { type: "rectangle", name: "banner-empty", x: 0, y: 24, width: 280, height: 64, fill: "#F8FAFC", cornerRadius: 16, stroke: "#D1D9E6", strokeWidth: 1 })
ub0T=I(ubSection, { type: "text", text: "🎈 Aucun anniversaire\ncette semaine", x: 16, y: 36, width: 248, fontSize: 13, fill: "#6B7280", textAlign: "center" })
ub1=I(ubSection, { type: "rectangle", name: "banner-one", x: 300, y: 24, width: 380, height: 64, fill: "#FDE68A", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
ub1T=I(ubSection, { type: "text", text: "🎂 Pierre Leroy fête ses 32 ans dans 3 jours !", x: 316, y: 36, width: 348, fontSize: 13, fontWeight: 600, fill: "#78350f", textAlign: "center" })
ub3=I(ubSection, { type: "rectangle", name: "banner-multi", x: 700, y: 24, width: 420, height: 64, fill: "#DBEAFE", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
ub3T=I(ubSection, { type: "text", text: "🎊 3 anniversaires cette semaine !\nMarie · Pierre · Sophie", x: 716, y: 32, width: 388, fontSize: 13, fontWeight: 600, fill: "#1e3a8a", textAlign: "center" })
```

- [ ] **Step 3: Insert state components — LoadingSkeleton, ErrorState, EmptyState**

```
stateSection=I(appFrame, { type: "frame", name: "States", x: 40, y: 600, width: 1120, height: 240, fill: "transparent" })
stateLabel=I(stateSection, { type: "text", text: "ÉTATS", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
stLoad=I(stateSection, { type: "rectangle", name: "loading-state", x: 0, y: 24, width: 320, height: 140, fill: "#EEF2F7", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
stLoadL=I(stateSection, { type: "text", text: "LoadingSkeleton", x: 12, y: 30, fontSize: 11, fontWeight: 600, fill: "#6B7280" })
stLoadSk1=I(stateSection, { type: "rectangle", x: 12, y: 52, width: 200, height: 12, fill: "#D1D9E6", cornerRadius: 6 })
stLoadSk2=I(stateSection, { type: "rectangle", x: 12, y: 72, width: 150, height: 12, fill: "#D1D9E6", cornerRadius: 6 })
stLoadSk3=I(stateSection, { type: "rectangle", x: 12, y: 92, width: 180, height: 12, fill: "#D1D9E6", cornerRadius: 6 })
stErr=I(stateSection, { type: "rectangle", name: "error-state", x: 360, y: 24, width: 320, height: 140, fill: "#EEF2F7", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
stErrIcon=I(stateSection, { type: "text", text: "⚠️", x: 360, y: 52, width: 320, fontSize: 28, textAlign: "center" })
stErrMsg=I(stateSection, { type: "text", text: "Une erreur est survenue", x: 360, y: 90, width: 320, fontSize: 13, fill: "#6B7280", textAlign: "center" })
stErrBtn=I(stateSection, { type: "rectangle", x: 440, y: 116, width: 160, height: 32, fill: "#93C5FD", cornerRadius: 10 })
stErrBtnT=I(stateSection, { type: "text", text: "Réessayer", x: 440, y: 116, width: 160, height: 32, fontSize: 13, fontWeight: 600, fill: "#1e3a8a", textAlign: "center", verticalAlign: "middle" })
stEmpty=I(stateSection, { type: "rectangle", name: "empty-state", x: 720, y: 24, width: 320, height: 140, fill: "#EEF2F7", cornerRadius: 16, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
stEmptyIcon=I(stateSection, { type: "text", text: "📭", x: 720, y: 52, width: 320, fontSize: 28, textAlign: "center" })
stEmptyMsg=I(stateSection, { type: "text", text: "Aucun contact trouvé.", x: 720, y: 90, width: 320, fontSize: 13, fill: "#6B7280", textAlign: "center" })
stEmptyBtn=I(stateSection, { type: "rectangle", x: 800, y: 116, width: 160, height: 32, fill: "#FCD34D", cornerRadius: 10 })
stEmptyBtnT=I(stateSection, { type: "text", text: "Ajouter un contact", x: 800, y: 116, width: 160, height: 32, fontSize: 12, fontWeight: 600, fill: "#78350f", textAlign: "center", verticalAlign: "middle" })
```

- [ ] **Step 4: Verify App Components section screenshot**

Call `mcp__pencil__get_screenshot()` on `appFrame`. Confirm ContactCard (3 states), GroupBadge, UpcomingBanner (3 states), and 3 state components visible.

- [ ] **Step 5: Commit**

```bash
git add public/design/design-system.pen
git commit -m "feat(design): add App Components section — ContactCard, GroupBadge, UpcomingBanner, states"
```

---

## Chunk 5: Section 4 — Navigation

### Task 8: BottomNav, Sidebar, Layout shell

- [ ] **Step 1: Insert Navigation frame**

```
navFrame=I("root", { type: "frame", name: "🧭 Navigation", x: 0, y: 2720, width: 1200, height: 600, fill: "#EEF2F7" })
navTitle=I(navFrame, { type: "text", text: "🧭 Navigation", x: 40, y: 32, fontSize: 24, fontWeight: 700, fill: "#1F2937" })
```

- [ ] **Step 2: Insert BottomNav (mobile)**

```
bnSection=I(navFrame, { type: "frame", name: "BottomNav", x: 40, y: 80, width: 400, height: 200, fill: "transparent" })
bnLabel=I(bnSection, { type: "text", text: "BOTTOMNAV · Mobile", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
bnBar=I(bnSection, { type: "rectangle", name: "bottom-nav-bar", x: 0, y: 24, width: 390, height: 64, fill: "#EEF2F7", cornerRadius: 20, shadow: "-4px -4px 10px #FFFFFF, 4px 4px 10px #D1D9E6" })
bnHome=I(bnSection, { type: "rectangle", x: 12, y: 34, width: 110, height: 44, fill: "#DBEAFE", cornerRadius: 14 })
bnHomeIcon=I(bnSection, { type: "text", text: "🏠", x: 12, y: 34, width: 110, height: 24, fontSize: 18, textAlign: "center" })
bnHomeT=I(bnSection, { type: "text", text: "Accueil", x: 12, y: 58, width: 110, fontSize: 10, fontWeight: 600, fill: "#1e3a8a", textAlign: "center" })
bnContacts=I(bnSection, { type: "text", text: "👤", x: 140, y: 34, width: 110, height: 24, fontSize: 18, textAlign: "center" })
bnContactsT=I(bnSection, { type: "text", text: "Contacts", x: 140, y: 58, width: 110, fontSize: 10, fill: "#6B7280", textAlign: "center" })
bnGroups=I(bnSection, { type: "text", text: "👥", x: 268, y: 34, width: 110, height: 24, fontSize: 18, textAlign: "center" })
bnGroupsT=I(bnSection, { type: "text", text: "Groupes", x: 268, y: 58, width: 110, fontSize: 10, fill: "#6B7280", textAlign: "center" })
```

- [ ] **Step 3: Insert Sidebar (desktop)**

```
sbSection=I(navFrame, { type: "frame", name: "Sidebar", x: 480, y: 80, width: 280, height: 400, fill: "transparent" })
sbLabel=I(sbSection, { type: "text", text: "SIDEBAR · Desktop", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
sbBar=I(sbSection, { type: "rectangle", x: 0, y: 24, width: 240, height: 360, fill: "#EEF2F7", cornerRadius: 20, shadow: "6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF" })
sbLogo=I(sbSection, { type: "text", text: "OrganiCalAI", x: 20, y: 48, fontSize: 16, fontWeight: 700, fill: "#1F2937" })
sbHomeActive=I(sbSection, { type: "rectangle", x: 12, y: 96, width: 216, height: 40, fill: "#DBEAFE", cornerRadius: 12 })
sbHomeActiveIcon=I(sbSection, { type: "text", text: "🏠  Accueil", x: 24, y: 96, width: 200, height: 40, fontSize: 14, fontWeight: 600, fill: "#1e3a8a", verticalAlign: "middle" })
sbContactsIcon=I(sbSection, { type: "text", text: "👤  Contacts", x: 24, y: 148, width: 200, height: 40, fontSize: 14, fill: "#6B7280", verticalAlign: "middle" })
sbGroupsIcon=I(sbSection, { type: "text", text: "👥  Groupes", x: 24, y: 196, width: 200, height: 40, fontSize: 14, fill: "#6B7280", verticalAlign: "middle" })
```

- [ ] **Step 4: Insert Layout shell wireframe (mobile vs desktop)**

```
layoutSection=I(navFrame, { type: "frame", name: "Layout", x: 800, y: 80, width: 360, height: 500, fill: "transparent" })
layoutLabel=I(layoutSection, { type: "text", text: "LAYOUT SHELL", x: 0, y: 0, fontSize: 11, fontWeight: 600, fill: "#6B7280", letterSpacing: 1.5 })
mobileLabel=I(layoutSection, { type: "text", text: "Mobile", x: 0, y: 20, fontSize: 12, fill: "#6B7280" })
mobileShell=I(layoutSection, { type: "rectangle", x: 0, y: 40, width: 160, height: 300, fill: "#F8FAFC", cornerRadius: 16, stroke: "#D1D9E6", strokeWidth: 1 })
mobileContent=I(layoutSection, { type: "rectangle", x: 8, y: 48, width: 144, height: 220, fill: "#EEF2F7", cornerRadius: 10 })
mobileContentT=I(layoutSection, { type: "text", text: "Page content", x: 8, y: 120, width: 144, fontSize: 11, fill: "#9CA3AF", textAlign: "center" })
mobileNav=I(layoutSection, { type: "rectangle", x: 8, y: 278, width: 144, height: 40, fill: "#EEF2F7", cornerRadius: 10, shadow: "0 -2px 8px #D1D9E6" })
mobileNavT=I(layoutSection, { type: "text", text: "BottomNav", x: 8, y: 278, width: 144, height: 40, fontSize: 10, fill: "#6B7280", textAlign: "center", verticalAlign: "middle" })
desktopLabel=I(layoutSection, { type: "text", text: "Desktop", x: 180, y: 20, fontSize: 12, fill: "#6B7280" })
desktopShell=I(layoutSection, { type: "rectangle", x: 180, y: 40, width: 180, height: 300, fill: "#F8FAFC", cornerRadius: 16, stroke: "#D1D9E6", strokeWidth: 1 })
desktopSidebar=I(layoutSection, { type: "rectangle", x: 188, y: 48, width: 52, height: 284, fill: "#EEF2F7", cornerRadius: 10 })
desktopSidebarT=I(layoutSection, { type: "text", text: "Sidebar", x: 188, y: 176, width: 52, fontSize: 9, fill: "#9CA3AF", textAlign: "center" })
desktopContent=I(layoutSection, { type: "rectangle", x: 248, y: 48, width: 104, height: 284, fill: "#EEF2F7", cornerRadius: 10 })
desktopContentT=I(layoutSection, { type: "text", text: "Content", x: 248, y: 176, width: 104, fontSize: 9, fill: "#9CA3AF", textAlign: "center" })
```

- [ ] **Step 5: Verify full Navigation section screenshot**

Call `mcp__pencil__get_screenshot()` on `navFrame`. Confirm BottomNav, Sidebar, and Layout shell visible.

- [ ] **Step 6: Final full canvas screenshot**

Call `mcp__pencil__get_screenshot()` with no arguments to capture the whole canvas. Verify all 4 sections are present.

- [ ] **Step 7: Final commit**

```bash
git add public/design/design-system.pen
git commit -m "feat(design): add Navigation section — BottomNav, Sidebar, Layout shell"
```

---

## Notes for implementer

- **Tool order matters:** Always call `get_guidelines` and `get_style_guide` in Task 1 before any `batch_design` call. Pencil property names must match guidelines exactly.
- **Property syntax:** `batch_design` operations use a small DSL. `I(parent, props)` inserts a new node. Node IDs returned from `I()` are used as parents in subsequent ops.
- **Screenshots are mandatory after each task** — they are the only way to verify correctness in a design file.
- **Max 25 ops per `batch_design` call** — split large tasks across multiple calls if needed.
- **`Dialog`, `Sheet`, `Tabs`, `Separator`, `Sonner`** components exist in the codebase but are excluded from this design system (out of scope per spec — partial inventory is acceptable).
