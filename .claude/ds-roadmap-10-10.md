# VSP Design System — Roadmap to 10/10

> Mục tiêu: Biến VSP Core Components thành DS thân thiện AI nhất có thể,
> để mọi AI tool (Figma MCP, Code Connect, Cursor, v1) generate code chính xác
> từ Figma design mà không cần human fix.

**Baseline scores (March 2026):**

| Dimension | VSP now | Target | Gap |
|---|---|---|---|
| Visual quality | 8/10 | 9/10 | +1 |
| Token system | 6/10 | 10/10 | +4 | ← Color file has 288 tokens, just not applied yet
| AI-friendliness | 5/10 | 10/10 | +5 |
| Documentation | 3/10 | 9/10 | +6 |
| Component depth | 9/10 | 10/10 | +1 |
| Theme support | 6/10 | 10/10 | +4 |
| Code ↔ Figma sync | 2/10 | 10/10 | +8 |
| Organization | 6/10 | 9/10 | +3 |

**Benchmark:** V-Mini-DLS (VNPay) — token system 9/10, AI-friendliness 8/10.

---

## Existing Assets — What We Already Have

### Figma Files (3 files hiện tại)

| File | Key | Role | Status |
|---|---|---|---|
| **Core Components** | `m8U2GMl2eptDD5gv9iwXDs` | Component library (55 pages, 103 sets, 692 components) | ⚠️ Variables chưa apply vào components |
| **Color** | `OaKPN3a4NaloZ3I6hrFZUZ` | Color token definitions | ✅ Mature — 288 tokens, 2 collections |
| **Typography** | `M9TrdyhUYiBzE8yq2ZkBAT` | Typography token definitions | ⚠️ Variables created, no documentation |

### Color File — Already Well-Structured (288 tokens)

**Collection 1: Primitive Colors** (217 tokens, 1 mode)
```
Brand/Grey/00..1000        (19 tokens — full grey scale + opacity variants)
Contextual/Blue/50..950    (12 tokens)
Contextual/Green/50..950   (12 tokens)
Contextual/Red/50..950     (12 tokens)
Neutral/Grey 2/00..1000    (65 tokens — alternate grey with duplicates)
Swatches/Cyan,Fuchsia,Indigo,Lime,Orange,Purple,Rose,Teal,Yellow  (88 tokens)
```

**Collection 2: Semantic Colors** (71 tokens, 2 modes: Light + Dark ✅)
```
Background/  (19 tokens)
  Contextual/Black, Brand, Brand-pressed, Brand-subtle
  Contextual/Danger, Danger-subtle, Info, Info-pressed, Info-subtle
  Contextual/Inverse, Overlay, Success, Success-subtle
  Contextual/Warning, Warning-subtle, White
  Surface/Primary, Secondary, Tertiary, Disabled

Foreground/  (12 tokens)
  Black, Brand, Brand Secondary, Danger, Info, Inverse
  Primary, Secondary, Success, Tertiary, Warning, White

Border/  (10 tokens)
  Brand, Brand Secondary, Danger, Info, OnSurface
  Primary, Secondary, Success, Tertiary, Warning

Disabled/  (3 tokens)
  Background, Border, Foreground

Component/  (4 tokens)
  Background/Masker/bot, Masker/top, island, toast

Decor/  (23 tokens — decorative subtle backgrounds + foregrounds)
```

### Typography File — Incomplete
- Variables collection exists (Mobile mode only)
- No documentation pages
- No visual previews
- Token names not visible through API

### Code Tokens (globals.css) — Complete
- 200+ primitive colors
- 12 typography sizes (3xs → 5xl)
- Full semantic mapping (light + dark)
- Already production-ready

---

## Phase 0: Audit & Reconciliation (Pre-work)
**Effort:** 1 day | **Impact:** Foundation for everything else
**Status:** [ ] Not started

### 0.1 Reconcile Color file ↔ globals.css

Color file (`OaKPN3a4NaloZ3I6hrFZUZ`) ĐÃ CÓ 288 tokens. Cần verify 1:1 match với code.

**Mapping table — Figma Semantic → globals.css → Tailwind:**

```
Figma Semantic Token              → CSS Variable              → Tailwind Class
─────────────────────────────────────────────────────────────────────────────
Background/Surface/Primary        → --background (#ffffff)     → bg-background
Background/Surface/Secondary      → --secondary (#f3f3f3)      → bg-secondary
Background/Surface/Tertiary       → --sub-primary (#fafafa)    → bg-sub-primary
Background/Contextual/Brand       → --primary (#1f1f1f)        → bg-primary
Background/Contextual/Overlay     → --overlay (rgba)           → bg-overlay
Background/Contextual/Danger      → --danger (#eb002b)         → bg-danger
Background/Contextual/Success     → --success (#00b182)        → bg-success
Background/Contextual/Warning     → --warning (#eab308)        → bg-warning
Background/Contextual/Info        → --info (#2b7fff)           → bg-info
Background/Disabled               → --disabled-bg (#e5e5e5)    → bg-disabled-bg
Foreground/Primary                → --foreground (#080808)     → text-foreground
Foreground/Secondary              → --foreground-sec. (#262626)→ text-foreground-secondary
Foreground/Tertiary               → ❌ MISSING IN CODE         → ❌ TODO
Foreground/Inverse                → --primary-foreground       → text-primary-foreground
Foreground/Brand                  → --brand-secondary (#00dda3)→ text-brand-secondary
Foreground/Brand Secondary        → --brand-secondary          → text-brand-secondary
Foreground/Danger                 → --destructive (#eb002b)    → text-destructive
Foreground/Success                → --success (#00b182)        → text-success
Foreground/Warning                → --warning (#eab308)        → text-warning
Foreground/Info                   → --info (#2b7fff)           → text-info
Foreground/Black                  → N/A (hardcoded)            → text-black
Foreground/White                  → N/A (hardcoded)            → text-white
Border/Primary                    → --border (#e5e5e5)         → border-border
Border/Secondary                  → --border-bold (#d4d4d4)    → border-border-bold
Border/Tertiary                   → ❌ MISSING IN CODE         → ❌ TODO
Border/Brand                      → ❌ MISSING IN CODE         → ❌ TODO
Border/Danger                     → ❌ MISSING IN CODE         → ❌ TODO
Disabled/Foreground               → --disabled-fg (#a1a1a1)    → text-disabled-fg
Disabled/Background               → --disabled-bg (#e5e5e5)    → bg-disabled-bg
Disabled/Border                   → --disabled-border (#f5f5f5)→ border-disabled-border
Component/Background/island       → --island (#ffffff)         → bg-island
Component/Background/toast        → --toast (#262626)          → bg-toast
```

**Action items:**
- [ ] Verify mỗi dòng trên — hex values match?
- [ ] Identify Figma tokens CHƯA có trong globals.css (marked ❌)
- [ ] Add missing tokens to globals.css (Foreground/Tertiary, Border/Tertiary, etc.)
- [ ] Verify Light/Dark mode values match in both systems

### 0.2 Audit Typography file gaps

Typography file (`M9TrdyhUYiBzE8yq2ZkBAT`) chỉ có variables, KHÔNG có documentation.

**Cross-check with globals.css type scale:**
```
globals.css               → Figma Variable (cần verify)
─────────────────────────────────────────────────
--text-3xs:    0.5rem     → ?
--text-2xs:    0.625rem   → ?
--text-1_5xs:  0.6875rem  → ?
--text-xs:     0.75rem    → ?
--text-sm:     0.875rem   → ?
--text-md:     1rem       → ?
--text-lg:     1.25rem    → ?
--text-xl:     1.5rem     → ?
--text-2xl:    1.75rem    → ?
--text-3xl:    2rem       → ?
--text-4xl:    2.5rem     → ?
--text-5xl:    3rem       → ?
```

- [ ] Open Typography file → list all variable names
- [ ] Map each to globals.css size
- [ ] Note missing sizes
- [ ] Document line-height pairing for each size

### 0.3 Audit Component file — which components use variables?

Scan Core Components file (`m8U2GMl2eptDD5gv9iwXDs`):
- [ ] Pick top 5 components (Button, Header, TextField, Dialog, Toast)
- [ ] For each: check if fills reference Color file variables or hardcoded hex
- [ ] This tells us how much Phase 1 work is needed

### 0.4 Document spacing + radius tokens used

```
Spacing in code (mandatory):
  px-[22px]  → content padding
  pt-[32px]  → section gap
  gap-2 (8px), gap-3 (12px), gap-4 (16px), gap-6 (24px)

Radius in code:
  --radius: 0.5rem (8px)
  rounded-[28px] → card radius
  rounded-full → avatar, pill buttons
```

These need corresponding Figma variables (currently missing in all 3 files).

### Deliverable
- [ ] Reconciliation table with all gaps identified
- [ ] List of missing tokens to add to globals.css
- [ ] List of components still using hardcoded hex
- [ ] Spacing/radius variable checklist

---

## Phase 1: Merge Token Files → Apply to Components
**Effort:** 2-3 days | **Impact:** 10/10 — This is THE game changer
**Status:** [ ] Not started

### Architecture Decision: 3 Files → 1 Library

**Current state:** 3 separate Figma files
```
Color file (OaKPN3a4NaloZ3I6hrFZUZ)        ← 288 tokens, well-structured ✅
Typography file (M9TrdyhUYiBzE8yq2ZkBAT)   ← Variables exist, no docs ⚠️
Core Components (m8U2GMl2eptDD5gv9iwXDs)    ← 692 components, no variables ❌
```

**Target state:** 1 unified library OR properly linked files
```
Option A: Merge everything into Core Components file
  ✅ Single source — AI reads 1 file, gets everything
  ✅ Variables + Components in same file = auto-binding
  ❌ Larger file, more complex
  ❌ Requires manual re-creation of all variables

Option B: Keep separate files, publish as libraries (RECOMMENDED)
  ✅ Color + Typography files already exist and work
  ✅ Publish as Team Libraries → Core Components file subscribes
  ✅ No re-creation needed — just enable + apply
  ✅ Changes in token files auto-propagate to all consumers
  ❌ AI must follow library references (but Figma MCP handles this)
```

**→ Recommendation: Option B** — Keep files separate, link via Figma Libraries.

### 1.1 Publish Color file as Team Library

**File:** `OaKPN3a4NaloZ3I6hrFZUZ` (Color)

Steps:
- [ ] Open Color file → Figma menu → "Publish library"
- [ ] Enable both collections:
  - [x] Primitive Colors (217 variables)
  - [x] Semantic Colors (71 variables, Light + Dark modes)
- [ ] Publish with description: "VSP Color Tokens — Primitives + Semantics"

### 1.2 Fix Typography file + Publish as Library

**File:** `M9TrdyhUYiBzE8yq2ZkBAT` (Typography)

Current state: Variables exist but no docs. Need to verify/complete.

**Step A — Verify existing variables match globals.css:**
```
Expected typography variables (from globals.css):
─────────────────────────────────────────────────
font-size/3xs:     8px   (0.5rem)    line-height: 12px
font-size/2xs:     10px  (0.625rem)  line-height: 12px
font-size/1.5xs:   11px  (0.6875rem) line-height: 16px
font-size/xs:      12px  (0.75rem)   line-height: 16px
font-size/sm:      14px  (0.875rem)  line-height: 20px
font-size/md:      16px  (1rem)      line-height: 24px
font-size/lg:      20px  (1.25rem)   line-height: 32px
font-size/xl:      24px  (1.5rem)    line-height: 40px
font-size/2xl:     28px  (1.75rem)   line-height: 40px
font-size/3xl:     32px  (2rem)      line-height: 48px
font-size/4xl:     40px  (2.5rem)    line-height: 48px
font-size/5xl:     48px  (3rem)      line-height: 56px
```

- [ ] Open Typography file → Variables panel → compare with table above
- [ ] Fix any mismatches
- [ ] Add missing variables if needed

**Step B — Add documentation page:**
- [ ] Create visual type scale preview (each size shown with sample text)
- [ ] Document font weights: Regular (400), Medium (500), Semibold (600), Bold (700)
- [ ] Document usage: Large Title = 2xl semibold, Body = sm regular, etc.

**Step C — Publish:**
- [ ] Publish as Team Library: "VSP Typography Tokens"

### 1.3 Subscribe Core Components file to both libraries

**File:** `m8U2GMl2eptDD5gv9iwXDs` (Core Components)

- [ ] Open Core Components → Assets panel → Team Library icon
- [ ] Enable "VSP Color Tokens" library ← subscribe
- [ ] Enable "VSP Typography Tokens" library ← subscribe
- [ ] Verify: Variables panel now shows all imported collections

### 1.4 Create Spacing + Radius collection (IN Core Components file)

Spacing and Radius are NOT in Color or Typography files.
Create directly in Core Components:

```yaml
# Collection: Spacing & Radius (1 mode: Value)

# Spacing (number variables)
spacing/0:   0
spacing/2:   2
spacing/4:   4
spacing/6:   6
spacing/8:   8
spacing/10:  10
spacing/12:  12
spacing/14:  14
spacing/16:  16
spacing/20:  20
spacing/22:  22       ← content padding
spacing/24:  24
spacing/32:  32       ← section gap
spacing/36:  36
spacing/40:  40
spacing/48:  48
spacing/56:  56
spacing/64:  64
spacing/80:  80

# Radius (number variables)
radius/none: 0
radius/sm:   4
radius/md:   6
radius/lg:   8
radius/xl:   12
radius/2xl:  16
radius/3xl:  20
radius/card: 28       ← card radius (mandatory)
radius/full: 9999
```

### 1.5 Apply variables to ALL components

Systematic sweep — replace every hardcoded hex with variable reference:

- [ ] Button (all variants) — `color/primary`, `color/primary-foreground`, etc.
- [ ] Header — `color/background`, `color/foreground`
- [ ] TextField — `color/foreground`, `color/border`, `color/destructive`
- [ ] Dialog — `color/card`, `color/overlay`
- [ ] Bottom Sheet — `color/card`, `color/foreground`
- [ ] Toast — `color/toast`, `color/foreground`
- [ ] Checkbox/Radio/Toggle — `color/primary`, `color/border`
- [ ] Feedback State — `color/success`, `color/destructive`, `color/warning`
- [ ] Inform Message — `color/info`, `color/warning`, `color/destructive`
- [ ] All remaining components...

### 1.4 Apply spacing + radius variables

- [ ] Content padding: `spacing/22` everywhere (not hardcoded 22)
- [ ] Section gap: `spacing/32`
- [ ] Card radius: `radius/card` (not hardcoded 28)
- [ ] All button/input radius: appropriate `radius/*` variable

### Verification
- [ ] Switch Figma to Dark mode → all components flip correctly
- [ ] Run `get_design_context` on Button → output shows `var(--color/...)` not raw `#1f1f1f`
- [ ] Compare Figma variable values with `globals.css` — must be 1:1
- [ ] Spacing variables applied → output shows `var(--spacing/22)` not raw `22`

### Deliverable
- [ ] Color file published as Team Library ✅
- [ ] Typography file completed + published as Team Library
- [ ] Spacing/Radius collection created in Core Components
- [ ] Every component uses library variables, zero hardcoded hex
- [ ] Light/Dark mode toggle works across entire file

### Gap Analysis: Figma Semantic Tokens vs globals.css

After scan, these are the gaps to close:

**Figma has but globals.css MISSING:**
```
Foreground/Tertiary          → need --foreground-tertiary
Foreground/Black             → hardcoded #000, consider adding
Foreground/White             → hardcoded #fff, consider adding
Border/Tertiary              → need --border-tertiary
Border/Brand                 → need --border-brand
Border/Brand Secondary       → need --border-brand-secondary
Border/Danger                → need --border-danger (or reuse --destructive)
Border/Info                  → need --border-info
Border/Success               → need --border-success
Border/Warning               → need --border-warning
Border/OnSurface             → need --border-on-surface
Background/Contextual/Brand-pressed    → need --primary-pressed
Background/Contextual/Brand-subtle     → exists as --accent
Background/Contextual/Danger-subtle    → need --danger-subtle
Background/Contextual/Info-pressed     → need --info-pressed
Background/Contextual/Info-subtle      → need --info-subtle
Background/Contextual/Success-subtle   → need --success-subtle
Background/Contextual/Warning-subtle   → need --warning-subtle
Background/Contextual/Black  → hardcoded
Background/Contextual/White  → hardcoded
Background/Contextual/Inverse → need --background-inverse
Background/Surface/Tertiary  → currently --sub-primary, consider renaming
Decor/* (23 tokens)          → swatches for decoration, add as needed
```

**globals.css has but Figma MISSING:**
```
--card-accent               → not in Color file semantic layer
--card-accent-foreground    → not in Color file
--btn-secondary-bg          → not in Color file
--ring                      → not in Color file
--sidebar-*                 → not in Color file (7 tokens)
```

**Action:** Decide which gaps to close from each side. Not all need to match —
some are code-only (sidebar) or Figma-only (Decor). But core semantic tokens must be 1:1.

---

## Phase 2: Component Naming Overhaul
**Effort:** 1-2 days | **Impact:** 8/10 — Enables AI to parse component structure
**Status:** [ ] Not started

### 2.1 Naming convention (NEW standard)

**Rule:** Every component follows this exact pattern:
```
VSP/[Category]/[Name]
```

**Variant properties — always lowercase, consistent:**
```
size:       xs | sm | md | lg | xl
variant:    primary | secondary | ghost | destructive | outline
state:      default | hover | active | disabled | loading
appearance: light | dark
error:      true | false
```

### 2.2 Rename all component sets

```
BEFORE                              → AFTER
──────────────────────────────────────────────────
_keyboardHeader                     → VSP/Action/Keyboard Header
_[VSP]TextField                     → VSP/Form/Text Field
VSP_Header                          → VSP/Navigation/Header
VSP_Toast bar                       → VSP/Feedback/Toast
VSP_Pagination                      → VSP/Navigation/Pagination
Component 1                         → (DELETE or rename semantic)
_(local-bank) step-element          → VSP/Navigation/Step Element
```

**Category list (8 groups, matching V-Mini-DLS pattern):**
```
VSP/Action/      → Button, Button Group, Uploader
VSP/Form/        → Text Field, Dropdown, PIN, SOTP, Date Field, Search, Textarea
VSP/Selection/   → Checkbox, Radio, Toggle, Chip
VSP/Navigation/  → Header, Tab, Bottom Bar, Pagination, Steps
VSP/Feedback/    → Dialog, Bottom Sheet, Toast, Inform, Tooltip, Feedback State
VSP/Indicator/   → Badge, Label, Tip
VSP/Layout/      → Section, Divider, List Item
VSP/Support/     → Device Element, iOS Keyboard, Status Bar, Home Indicator
```

### 2.3 Fix variant property names

Audit EVERY component set. Fix inconsistencies:

```
BEFORE                    → AFTER
──────────────────────────────────
State (capital S)         → state
Type (capital T)          → type
Name (generic)            → (remove or rename to label)
Property 2                → (rename to meaningful name)
hierarchy                 → hierarchy (keep if semantic)
Feature                   → feature (lowercase)
```

### 2.4 Clean up orphan names

- [ ] Rename ALL "Group XXXXX" frames to semantic names
- [ ] Rename ALL "Frame XXXXX" to semantic names
- [ ] Delete or archive unused components ("Component 1", "Screen UI")

### Verification
- [ ] `get_metadata` on any page → no "Group XXXXX", no "Component 1"
- [ ] Every component set name starts with `VSP/`
- [ ] Every variant property is lowercase
- [ ] No duplicate casing (State vs state)

### Deliverable
- [ ] All 103 component sets renamed
- [ ] Variant properties standardized
- [ ] Zero generic/orphan names remaining

---

## Phase 3: File Organization & Navigation
**Effort:** 1 day | **Impact:** 7/10 — Improves discoverability
**Status:** [ ] Not started

### 3.1 Create Welcome/Index page

Replace current Cover page with V-Mini-DLS style Quick Navigation:

```
📋 Welcome
├── Greeting card (brand visual)
└── Quick Navigation
    ├── Foundations
    │   ├── Color → link to Color page
    │   ├── Typography → link to Typography page
    │   ├── Spacing → link to Spacing page
    │   ├── Border Radius → link to Radius page
    │   ├── Effects → link to Effects page
    │   └── Icons → link to Icons page
    ├── UI Components
    │   ├── Actions: Button, Button Group, Uploader
    │   ├── Forms: Text Field, PIN, SOTP, Dropdown, Search, Textarea, Date Field
    │   ├── Selections: Checkbox, Radio, Toggle, Chip
    │   ├── Navigation: Header, Tab, Bottom Bar, Pagination, Steps
    │   ├── Feedback: Dialog, Sheet, Toast, Inform, Tooltip, Feedback State
    │   ├── Indicators: Badge, Label, Tip
    │   └── Layout: Section, Divider, List Item
    ├── App Shell: Device Element, Keyboard, Status Bar, Home Indicator
    └── Design Patterns
        ├── Form guidelines
        ├── Feedback patterns (Toast vs Dialog vs Inform)
        ├── Navigation patterns (Sheet vs Page vs Dialog)
        └── Status & Loading patterns
```

### 3.2 Clean up page structure

**DELETE these separator pages:**
- All "-----" pages
- All "━━━━━━" pages
- All whitespace-only pages
- All "❖" header pages

**REPLACE with clean page groups:**
```
BEFORE (55 pages, messy):
  🖼 Cover
  ━━━━━━━━━━━━━
  ❖ FOUNDATIONS
  ━━━━━━━━━━━━━
  Color
  Typography
  ...

AFTER (clean, ~35 pages):
  📋 Welcome
  ── Foundations ──
  Color
  Typography
  Spacing
  Border Radius
  Effects
  Icons
  ── Actions ──
  Button
  Button Group
  Uploader
  ── Forms ──
  Text Field
  ...
```

Figma supports page dividers with emoji prefix: `── Category ──`

### 3.3 Add page thumbnails

Each component page should have a consistent layout:
```
┌─────────────────────────────┐
│ Component Name              │ ← Title frame (auto-layout)
│ Category: Forms             │
│ Status: ✅ Production       │
├─────────────────────────────┤
│ Component Anatomy           │ ← How it's built
├─────────────────────────────┤
│ Variants (all states)       │ ← Light mode
├─────────────────────────────┤
│ Variants (all states)       │ ← Dark mode
├─────────────────────────────┤
│ Usage Guidelines            │ ← Do/Don't examples
├─────────────────────────────┤
│ Specs (spacing, tokens)     │ ← Detailed measurements
└─────────────────────────────┘
```

### Deliverable
- [ ] Welcome page with clickable Quick Navigation
- [ ] ~35 clean pages (no separator noise)
- [ ] Consistent page layout template

---

## Phase 4: Theme System — Bulletproof Light/Dark
**Effort:** 1-2 days | **Impact:** 9/10 — AI generates correct theme code
**Status:** [ ] Not started
**Depends on:** Phase 1 (Variables)

### 4.1 Add `appearance` variant property to EVERY component set

```
BEFORE: Component shown in separate Light/Dark frames
AFTER:  Component has appearance=light|dark as variant property
```

This means:
```
VSP/Action/Button
  Properties:
    size: sm | md | lg
    variant: primary | secondary | ghost | destructive
    state: default | hover | active | disabled | loading
    appearance: light | dark    ← NEW (required on ALL components)
```

### 4.2 Verify dark mode completeness

Checklist — every component must render correctly in both modes:

- [ ] Button (all variants × all states × light/dark)
- [ ] Header (default, large-title × light/dark)
- [ ] Text Field (all states × error × light/dark)
- [ ] Dialog (all types × light/dark)
- [ ] Bottom Sheet (light/dark)
- [ ] Toast (default, error, success × light/dark)
- [ ] Checkbox, Radio, Toggle (all states × light/dark)
- [ ] Feedback State (all types × light/dark)
- [ ] Inform Message (all types × light/dark)
- [ ] Badge, Label, Tip (light/dark)
- [ ] List Item (light/dark)
- [ ] Section (light/dark)
- [ ] PIN, SOTP (all states × light/dark)
- [ ] Dropdown (all states × light/dark)
- [ ] Tab (all variants × light/dark)

### 4.3 Connect theme to Figma Variable modes

- Component `appearance=light` → Figma Variable mode = Light
- Component `appearance=dark` → Figma Variable mode = Dark
- This means switching mode auto-updates ALL colors

### Verification
- [ ] Select any component → change `appearance` → colors flip correctly
- [ ] No hardcoded hex visible in any component at any state
- [ ] `get_design_context` output always shows `var(--color/...)` tokens

### Deliverable
- [ ] 100% dark mode coverage
- [ ] `appearance` property on every component set
- [ ] Figma mode switching works globally

---

## Phase 5: Documentation Pages
**Effort:** 2 days | **Impact:** 7/10 — Helps both humans and AI
**Status:** [ ] Not started

### 5.1 Foundation pages (must have)

**Color page:**
```
┌─────────────────────────────────────┐
│ Primitive Palette                   │
│ Grey scale: 00 → 1000 (with hex)   │
│ Green scale: 50 → 950              │
│ Red scale: 50 → 950                │
│ Blue scale: 50 → 950               │
│ Yellow scale: 50 → 950             │
├─────────────────────────────────────┤
│ Semantic Tokens (Light)             │
│ background, foreground, primary...  │
│ Each showing: name → primitive ref  │
├─────────────────────────────────────┤
│ Semantic Tokens (Dark)              │
│ Same structure, dark values         │
├─────────────────────────────────────┤
│ Do / Don't                          │
│ ✅ Use semantic tokens always       │
│ ❌ Never hardcode hex               │
│ ❌ Never use text-muted-foreground  │
└─────────────────────────────────────┘
```

**Typography page:**
```
┌─────────────────────────────────────┐
│ Type Scale                          │
│ 3xs (8px) → 5xl (48px)             │
│ Each with: size, line-height, sample│
├─────────────────────────────────────┤
│ Font Weights                        │
│ Regular (400), Medium (500),        │
│ Semibold (600), Bold (700)          │
├─────────────────────────────────────┤
│ Usage Guidelines                    │
│ Large Title: 2xl semibold           │
│ Section Header: lg semibold         │
│ Body: sm regular                    │
│ Caption: xs regular                 │
└─────────────────────────────────────┘
```

**Spacing page:**
```
┌─────────────────────────────────────┐
│ Spacing Scale                       │
│ Visual ruler: 0, 2, 4, 6, 8...80   │
├─────────────────────────────────────┤
│ Golden Rules                        │
│ Content padding: ALWAYS 22px        │
│ Section gap: ALWAYS 32px            │
│ Card internal: 16px                 │
├─────────────────────────────────────┤
│ Common Patterns                     │
│ List item height: 56px              │
│ Button height: 48px (md), 56px (lg) │
│ Header height: 44px + safe area     │
└─────────────────────────────────────┘
```

### 5.2 Design Pattern pages (differentiator)

**Form Guidelines:**
- Layout rules: label position, spacing, error placement
- Validation: inline vs submit-time
- Keyboard types per field
- Auto-focus rules
- Example compositions

**Feedback Decision Tree:**
```
User action result?
├── Success → Toast (auto-dismiss 3s)
├── Error (recoverable) → Inform Message (inline)
├── Error (blocking) → Dialog (action required)
├── Confirmation needed → Dialog (2 buttons)
├── Complex choice → Bottom Sheet
└── Background process → Toast + Loading state
```

**Navigation Patterns:**
```
New screen?
├── Full page push → Header with back button
├── Contextual options → Bottom Sheet
├── Blocking message → Dialog (modal)
├── Quick info → Tooltip
└── Tab switch → Tab bar (no push)
```

### 5.3 Component doc template

Each component page follows this layout:

```
┌─ Title Bar ───────────────────────┐
│ Component: Button                  │
│ Category: Action                   │
│ Status: Production ✅              │
│ Code: components/ui/button.tsx     │
├─ Anatomy ─────────────────────────┤
│ [Diagram showing internal parts]   │
│ Label, Icon, Container, etc.       │
├─ Variants ────────────────────────┤
│ Size: xs, sm, md, lg, xl          │
│ Variant: primary, secondary...     │
│ State: default, hover, active...   │
├─ Light Mode ──────────────────────┤
│ [All variant × state combos]       │
├─ Dark Mode ───────────────────────┤
│ [All variant × state combos]       │
├─ Token Spec ──────────────────────┤
│ bg: color/primary                  │
│ text: color/primary-foreground     │
│ radius: radius/lg                  │
│ height: spacing/48 (md)            │
│ padding: spacing/16 horizontal     │
├─ Usage Do/Don't ──────────────────┤
│ ✅ One primary per screen          │
│ ✅ Full-width on mobile            │
│ ❌ No custom button divs           │
│ ❌ No inline styles                │
├─ Code Example ────────────────────┤
│ <Button variant="primary" size="lg">│
│   Continue                         │
│ </Button>                          │
└───────────────────────────────────┘
```

### Deliverable
- [ ] Color, Typography, Spacing, Radius foundation pages
- [ ] 3 Design Pattern pages (Forms, Feedback, Navigation)
- [ ] Component doc template applied to top 5 components
- [ ] Remaining components follow template progressively

---

## Phase 6: Code Connect
**Effort:** 2-3 days | **Impact:** 10/10 — The ultimate AI bridge
**Status:** [ ] Not started
**Depends on:** Phase 1 + Phase 2

### 6.1 Set up Code Connect in project

```bash
npm install @figma/code-connect
```

### 6.2 Create mapping file for each component

```typescript
// components/ui/button.figma.ts
import figma from "@figma/code-connect";
import { Button } from "./button";

figma.connect(Button, "VSP/Action/Button", {
  props: {
    size: figma.enum("size", {
      sm: "sm",
      md: "md",
      lg: "lg",
    }),
    variant: figma.enum("variant", {
      primary: "primary",
      secondary: "secondary",
      ghost: "ghost",
      destructive: "destructive",
    }),
    disabled: figma.enum("state", {
      disabled: true,
    }),
    children: figma.string("label"),
  },
  example: (props) => (
    <Button
      size={props.size}
      variant={props.variant}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  ),
});
```

### 6.3 Map all 12 UI components

| Component | Figma Name | Code File | Priority |
|---|---|---|---|
| Button | VSP/Action/Button | `components/ui/button.tsx` | P0 |
| Header | VSP/Navigation/Header | `components/ui/header.tsx` | P0 |
| Text Field | VSP/Form/Text Field | `components/ui/text-field.tsx` | P0 |
| Dialog | VSP/Feedback/Dialog | `components/ui/dialog.tsx` | P0 |
| Bottom Sheet | VSP/Feedback/Bottom Sheet | `components/ui/bottom-sheet.tsx` | P1 |
| Toast | VSP/Feedback/Toast | `components/ui/toast-bar.tsx` | P1 |
| Button Group | VSP/Action/Button Group | `components/ui/button-group.tsx` | P1 |
| Checkbox | VSP/Selection/Checkbox | `components/ui/checkbox.tsx` | P1 |
| Inform | VSP/Feedback/Inform | `components/ui/inform-message.tsx` | P2 |
| Feedback State | VSP/Feedback/State | `components/ui/feedback-state.tsx` | P2 |
| Item List | VSP/Layout/List Item | `components/ui/item-list.tsx` | P2 |
| Tip | VSP/Indicator/Tip | `components/ui/tip.tsx` | P2 |

### 6.4 Push mappings to Figma

```bash
npx figma connect publish
```

### Verification
- [ ] Open Figma → select Button → Dev Mode shows React code snippet
- [ ] `get_code_connect_suggestions` returns correct component mapping
- [ ] AI generates import from correct path

### Deliverable
- [ ] 12 `.figma.ts` mapping files
- [ ] Code Connect published to Figma
- [ ] Dev Mode shows correct code for all components

---

## Phase 7: Auto-Layout & Responsive
**Effort:** 2-3 days | **Impact:** 6/10 — Better component scalability
**Status:** [ ] Not started

### 7.1 Convert all components to auto-layout

Every component's internal structure must use auto-layout:

- [ ] Button: horizontal auto-layout (icon + label + icon)
- [ ] Text Field: vertical auto-layout (label + input + helper)
- [ ] Header: horizontal (back + title + actions)
- [ ] Dialog: vertical (icon + title + body + actions)
- [ ] Sheet: vertical (handle + header + content + actions)
- [ ] Toast: horizontal (icon + message + action)
- [ ] List Item: horizontal (leading + content + trailing)
- [ ] All remaining components...

### 7.2 Set proper constraints

```
Resizing behavior:
  - Text labels: Fill container (horizontal), Hug content (vertical)
  - Icons: Fixed size
  - Containers: Fill container both axes
  - Buttons: Hug content or Fill container (depending on context)
```

### 7.3 Add min/max width constraints

```
Component widths:
  - Mobile: min 320px, max 430px
  - Button: min 64px, max fill
  - Dialog: min 280px, max 358px
  - Sheet: always fill width, max-height 90%
  - Toast: fill width - 44px (22px padding each side)
```

### Deliverable
- [ ] 100% auto-layout coverage
- [ ] Proper resize constraints on all components
- [ ] Components respond correctly when container resizes

---

## Phase 8: Quality Polish
**Effort:** 1-2 days | **Impact:** 5/10 — Professional finish
**Status:** [ ] Not started

### 8.1 Description on every component set

Figma allows component descriptions. Add for every set:

```
Button — Primary action trigger. One primary per screen.
Props: size (sm/md/lg), variant (primary/secondary/ghost/destructive), state
Code: <Button variant="primary" size="lg">Label</Button>
```

### 8.2 Remove spectral/mockup frames

- [ ] Audit each page for non-component frames
- [ ] Move examples to dedicated "Playground" section (bottom of page)
- [ ] Delete true orphans

### 8.3 Consistent documentation instances

Replace scattered `.Documentation` instances with:
- Standardized token spec table (consistent format)
- Consistent do/don't examples
- Consistent anatomy diagrams

### 8.4 Typo/naming fixes

- [ ] "Inidcator" → "Indicator" (spotted in V-Mini-DLS, check VSP too)
- [ ] Review all text for spelling
- [ ] Consistent English (no mixed Vietnamese in component names)

### Deliverable
- [ ] Every component has a description
- [ ] No orphan frames
- [ ] Consistent documentation format
- [ ] Zero typos

---

## Phase 9: CI/CD — Automated Token Sync
**Effort:** 2 days | **Impact:** 8/10 — Prevents drift
**Status:** [ ] Not started
**Depends on:** Phase 1 + Phase 6

### 9.1 Figma → Code token export

Use Figma Variables REST API to auto-export tokens:

```bash
# Script: scripts/sync-figma-tokens.ts
# 1. Fetch variables from Figma API
# 2. Generate globals.css Primitives section
# 3. Generate globals.css Semantic section (light + dark)
# 4. Diff and report changes
```

### 9.2 Code → Figma validation

Extend existing `npm run token-check`:

```bash
# Enhanced token-check:
# 1. Read globals.css token values
# 2. Read Figma variable values (via API)
# 3. Compare and report mismatches
# 4. Fail CI if drift detected
```

### 9.3 PR check

```yaml
# .github/workflows/token-sync.yml
on: pull_request
jobs:
  token-check:
    steps:
      - run: npm run token-check
      - run: npx figma connect verify
```

### Deliverable
- [ ] Token sync script (Figma → Code)
- [ ] Token validation in CI
- [ ] Code Connect verification in CI

---

## Timeline Summary

```
Week 1: Phase 0 (Audit) + Phase 1 (Merge & Apply Variables)
         ↳ Publish Color lib → Subscribe → Apply to components
         ↳ Fix Typography file → Publish
         ↳ Create Spacing/Radius collection
         ↳ Biggest impact — unlocks everything else

Week 2: Phase 2 (Naming) + Phase 3 (Organization)
         ↳ File becomes navigable for both humans and AI

Week 3: Phase 4 (Theme) + Phase 5 (Documentation)
         ↳ Full light/dark + usage guidelines

Week 4: Phase 6 (Code Connect) + Phase 7 (Auto-Layout)
         ↳ AI bridge fully operational

Week 5: Phase 8 (Polish) + Phase 9 (CI/CD)
         ↳ Professional finish + automated maintenance
```

## Score Projection

| Dimension | Now | After Phase 1-2 | After Phase 3-5 | After Phase 6-9 |
|---|---|---|---|---|
| Visual quality | 8 | 8 | 9 | 9 |
| Token system | 6* | 9 | 9 | 10 |
| AI-friendliness | 5 | 7 | 8 | 10 |
| Documentation | 3 | 4 | 8 | 9 |
| Component depth | 9 | 9 | 9 | 10 |
| Theme support | 6 | 8 | 10 | 10 |
| Code ↔ Figma sync | 2 | 6 | 7 | 10 |
| Organization | 6 | 7 | 9 | 9 |
| **Average** | **5.6** | **7.3** | **8.6** | **9.6** |

*Token system 6/10 (not 4) because Color file already has 288 well-structured tokens — just not applied to components yet.

---

## Rules khi thực hiện

1. **Không break existing code** — Figma changes phải backward-compatible
2. **One phase at a time** — merge & verify trước khi qua phase tiếp
3. **globals.css = source of truth** cho giá trị — Figma phải match 100%
4. **Test mỗi component** sau khi apply variables — screenshot compare
5. **AI verify** — chạy `get_design_context` sau mỗi batch change, confirm output có token names

---

*Created: 2026-03-29*
*Benchmark: V-Mini-DLS (VNPay)*
*Target: VSP Design System 10/10 by end of April 2026*
