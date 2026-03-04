# VSP Design Pipeline
> Code Connect Bootstrap → Figma → Analysis → Code → QC → Ship

---

## Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────┐
│  BOOTSTRAP   │────▶│   INPUT      │────▶│  ANALYSIS    │────▶│    BUILD     │────▶│     QC       │────▶│   SHIP   │
│  (one-time)  │     │              │     │              │     │              │     │              │     │          │
│ Code Connect │     │ Figma URL    │     │ vsp-designer │     │ vsp-designer │     │ design-ops   │     │ ✅ Gate  │
│ + token map  │     │ Brief / Ref  │     │ + ref lookup │     │ composes     │     │ audit        │     │          │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────┘
                                                                                            │
                                                                                   Violations found?
                                                                                            │
                                                                                    ┌───────▼───────┐
                                                                                    │  token-fix    │
                                                                                    │  auto-fix     │
                                                                                    │  loop agent   │
                                                                                    └───────────────┘
                                                                                            │
                                                                                       Re-run QC ↑
```

---

## Stage 0 — CODE CONNECT BOOTSTRAP (one-time setup)

> Run once when adding a new VSP component or when Figma file changes.
> Links every Figma component node → code component so `get_design_context` returns real imports.

### Step 0.1 — Get AI mapping suggestions
```
mcp: get_code_connect_suggestions(nodeId="0:1", fileKey="m8U2GMl2eptDD5gv9iwXDs")
→ Returns: [{figmaNodeId, suggestedComponent, suggestedSource}]
```

### Step 0.2 — Review suggestions
Check each suggestion against the VSP component table:
```
Figma node         → Code component          → Source path
─────────────────────────────────────────────────────────────────
VSP_Button         → Button                  → components/ui/button.tsx
VSP_ButtonGroup    → ButtonGroup             → components/ui/button-group.tsx
VSP_TextField      → TextField               → components/ui/text-field.tsx
VSP_Checkbox       → Checkbox                → components/ui/checkbox.tsx
VSP_Header         → Header                  → components/ui/header.tsx
FeedbackState      → FeedbackState           → components/ui/feedback-state.tsx
VSP_ToastBar       → ToastBar                → components/ui/toast-bar.tsx
InformMessage      → InformMessage           → components/ui/inform-message.tsx
VSP_Dialog         → Dialog                  → components/ui/dialog.tsx
bottomSheet        → BottomSheet             → components/ui/bottom-sheet.tsx
VSP_itemList       → ItemListItem            → components/ui/item-list.tsx
```

### Step 0.3 — Push mappings to Figma
```
mcp: send_code_connect_mappings(
  fileKey = "m8U2GMl2eptDD5gv9iwXDs",
  nodeId  = <root or component set node>,
  mappings = [
    { nodeId: "5256:8112", componentName: "VSP_Button",      source: "components/ui/button.tsx",       label: "React" },
    { nodeId: "5256:8282", componentName: "VSP_ButtonGroup", source: "components/ui/button-group.tsx", label: "React" },
    { nodeId: "5256:8737", componentName: "VSP_TextField",   source: "components/ui/text-field.tsx",   label: "React" },
    { nodeId: "4608:7076", componentName: "VSP_Checkbox",    source: "components/ui/checkbox.tsx",     label: "React" },
    { nodeId: "3922:994",  componentName: "VSP_Header",      source: "components/ui/header.tsx",       label: "React" },
    { nodeId: "3844:2480", componentName: "FeedbackState",   source: "components/ui/feedback-state.tsx", label: "React" },
    { nodeId: "5122:14467",componentName: "VSP_ToastBar",    source: "components/ui/toast-bar.tsx",    label: "React" },
    { nodeId: "3667:3587", componentName: "InformMessage",   source: "components/ui/inform-message.tsx", label: "React" },
    { nodeId: "4457:722",  componentName: "VSP_Dialog",      source: "components/ui/dialog.tsx",       label: "React" },
    { nodeId: "5122:13929",componentName: "bottomSheet",     source: "components/ui/bottom-sheet.tsx", label: "React" },
    { nodeId: "5120:11342",componentName: "VSP_itemList",    source: "components/ui/item-list.tsx",    label: "React" },
  ]
)
→ After this, get_design_context will return real component imports instead of raw JSX
```

### Step 0.4 — Verify token variables
```
mcp: get_variable_defs(nodeId="0:1", fileKey="m8U2GMl2eptDD5gv9iwXDs")
→ Returns: { "color/foreground": "#080808", "color/foreground-secondary": "#262626", ... }

Cross-check returned hex values against Token Quick Reference Card (bottom of this file).
If Figma variables diverge from app/globals.css, update globals.css first.
```

---

## Stage 1 — INPUT

Accepted inputs:
- **Figma URL** — `https://www.figma.com/design/m8U2GMl2eptDD5gv9iwXDs/...?node-id=X-Y`
- **Node ID** — `3922:994`
- **Screen brief** — "Build a phone/OTP verification screen"
- **Reference request** — "Like Revolut's transaction detail screen"

---

## Stage 2 — ANALYSIS (vsp-designer)

**Step 2.1 — Fetch design context + live token values**
```
If Figma URL/node provided:
  → call mcp__claude_ai_Figma__get_design_context(nodeId, fileKey)
    - Code Connect active? → output includes real VSP component imports ✅
    - Code Connect inactive? → output is raw JSX, map manually
  → call mcp__claude_ai_Figma__get_variable_defs(nodeId, fileKey)
    - Returns live Figma variable values: { "color/foreground": "#080808", ... }
    - Cross-reference with Token Quick Reference Card to confirm token classes
    - Flag any Figma variable NOT in the VSP token table → escalate before building

If no Figma URL:
  → reference .claude/ref-patterns.md for the closest screen type
  → identify which reference app pattern applies
```

**Step 2.2 — Token mapping**
Map every Figma/ref value to a VSP token:
```
Figma value         → VSP token class
─────────────────────────────────────
#080808 (text)      → text-foreground
#262626 (text)      → text-foreground-secondary
#ffffff (bg)        → bg-background
#f3f3f3 (surface)   → bg-secondary
#00b182 (action)    → text-success / bg-success
#eb002b (error)     → text-danger / bg-danger
rounded-full        → rounded-full
28px radius         → rounded-[28px]
14px radius         → rounded-[14px]
8px radius          → rounded-[8px]
px 22px content     → px-[22px]
px 16px title       → px-[16px]
32px section gap    → pt-[32px]
```

**Step 2.3 — Component identification**
Match every UI element in the design to a VSP component:
```
Nav bar             → <Header>
Input field         → <TextField>
Checkbox            → <Checkbox>
List row            → <ItemListItem>
Bottom sheet        → <BottomSheet>
Confirmation modal  → <Dialog>
Notification banner → <ToastBar>
Info banner         → <InformMessage>
Empty/error state   → <FeedbackState>
Primary/secondary   → <Button> / <ButtonGroup>
```

**Step 2.4 — Layout plan**
```
[ ] Header variant: default | large-title | vp-header
[ ] Sections needed: [list of section names]
[ ] Components per section: [map]
[ ] Overlays: Dialog / BottomSheet triggers
[ ] Fixed bottom elements: home indicator + optional tab bar
```

---

## Stage 3 — BUILD (vsp-designer)

**Template to fill:**
```tsx
"use client"
import ...

export default function ScreenName() {
  // 1. State declarations
  // 2. Effects (dark mode, etc.)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

      {/* Header — always VSP_Header */}
      <Header variant="..." ... />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[21px]">

        {/* Section pattern — repeat */}
        <div className="pt-[32px]">
          <SectionTitle title="..." />
          <div className="px-[22px] space-y-3">
            {/* VSP components */}
          </div>
        </div>

      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* Portals: Dialog, BottomSheet */}
    </div>
  )
}
```

**Build checklist:**
- [ ] All colors from token classes (no hex)
- [ ] All spacing from defined grid (`px-[22px]`, `pt-[32px]`)
- [ ] **Section titles, labels, rows, and list wrappers all use `px-[22px]`** — no `px-[16px]` anywhere in page content
- [ ] All components from VSP library
- [ ] `variant="large-title"` has no `title` prop
- [ ] `ChevronLeft` for back navigation
- [ ] One `variant="primary"` button max per screen
- [ ] Home indicator present
- [ ] Dark mode toggles via `document.documentElement.classList`
- [ ] No `text-muted-foreground` anywhere

---

## Stage 4 — QC (vsp-design-ops)

**Run automated check:**
```bash
npm run token-check
# Exit 0 = pass, Exit 1 = failures with report
```

**Run agent audit:**
Activate `vsp-design-ops` agent on the built file.
Checks:
- Section 1: Token compliance (colors, typography, spacing, radius)
- Section 2: Component compliance (no rebuilt components, button rules, header rules)
- Section 3: Principle compliance (all 7 design laws)
- Section 4: Page structure compliance (template structure, section pattern)

**Report format:**
```
🔴 Critical : N     ← must be 0 to ship
🟠 Major    : N     ← must be 0 to ship
🟡 Minor    : N     ← fix before PR
🔵 Info     : N     ← optional improvements
```

---

## Stage 5 — FIX LOOP (token-check-fix)

If QC finds violations:
```
1. Fix all 🔴 Critical first (hardcoded colors, wrong components)
2. Fix all 🟠 Major next (spacing grid, radius, typography scale)
3. Fix all 🟡 Minor (gap values, font weights, minor alignment)
4. Re-run: npm run token-check
5. Re-run: vsp-design-ops audit
6. Repeat until zero Critical + zero Major
```

---

## Stage 6 — SHIP GATE

Checklist before merging / presenting:
```
[ ] npm run token-check → exit code 0
[ ] Zero 🔴 Critical violations
[ ] Zero 🟠 Major violations
[ ] Light mode: all tokens render correctly at localhost:3000
[ ] Dark mode: toggle works, all tokens switch correctly
[ ] Touch targets: all interactive elements ≥ 44px
[ ] Home indicator visible on all full-screen pages
[ ] No console errors / hydration warnings
[ ] Figma displayName matches component displayName
[ ] Code Connect mappings pushed → get_design_context returns real imports (not raw JSX)
[ ] Figma variable values match app/globals.css (verified via get_variable_defs)
```

---

## Shortcut: Full Pipeline Command

When user says **"pipeline"** or **"build and check"**:
```
1. vsp-designer agent → fetch Figma → build screen
2. vsp-design-ops agent → audit the output
3. If violations → token-check-fix agent → auto-fix
4. Repeat 2-3 until gate passes
5. Report: PASS ✅ or list remaining issues
```

---

## Reference Decision Tree

```
User gives Figma URL?
  YES → get_design_context → extract tokens → build
  NO  → What screen type?
          Onboarding form   → ref: Cash App (single focus, bottom CTA)
          Home dashboard    → ref: Revolut (dark, balance prominent)
          Transaction list  → ref: OKX / Revolut (clean rows)
          Transaction detail → ref: Revolut (label-value groups)
          Settings          → ref: Revolut (grouped toggles)
          Success/empty     → ref: Cash App (centered, minimal)
          Confirmation      → ref: OKX bottom sheet / Revolut dark sheet
          Auth / OTP        → ref: OKX (individual boxes) / Revolut (dark)
```

---

## Agent Activation Matrix

| User says | Agent / MCP | Action |
|---|---|---|
| "build [screen]" | vsp-designer | Full build from Figma or brief |
| "design [screen]" | vsp-designer | Analysis + implementation |
| "check" / "QC" | vsp-design-ops | Audit current file |
| "fix tokens" | token-check-fix | Auto-fix violations |
| "pipeline" | vsp-pipeline | Run full 6-stage pipeline |
| "ref [app]" | — | Consult `.claude/ref-patterns.md` |
| Figma URL | vsp-designer | Fetch + implement |
| "map tokens" | MCP get_variable_defs | Fetch live Figma variable → VSP token mapping |
| "map components" | MCP get_code_connect_suggestions | Get AI suggestions for component↔node links |
| "send to figma" / "push code connect" | MCP send_code_connect_mappings | Push component mappings to Figma |
| "bootstrap" / "setup code connect" | Stage 0 flow | Run full Code Connect bootstrap |

---

## Token Quick Reference Card

```
COLORS
──────────────────────────────────────────
text-foreground           #080808 / #ffffff
text-foreground-secondary #262626 / #a1a1a1
bg-background             #ffffff / #080808
bg-secondary              #f3f3f3 / #262626
bg-foreground             #080808 / #ffffff  ← primary button
text-success              #00b182 / #00dda3
text-danger               #eb002b / #ef3355
border-border             #e5e5e5 / #262626
bg-grey-200               #e5e5e5  (grabber)
bg-rose-50                #fff1f2  (toast error)
bg-green-50               #e5fcf6  (toast success)
bg-blue-50                #eff6ff  (inform primary)

SPACING (non-negotiable)
──────────────────────────────────────────
Content column    px-[22px]
Section title     px-[16px] pb-[12px]
NavBar            pl-[14px] pr-[22px]
Section gap       pt-[32px]
Component gap     space-y-3 (12px)
Home indicator    h-[21px] / w-[139px] h-[5px]

RADIUS
──────────────────────────────────────────
Buttons           rounded-full
Cards/Sheets      rounded-[28px]
Text fields       rounded-[14px]
Checkboxes        rounded-[8px]
Pills/badges      rounded-full

TYPOGRAPHY
──────────────────────────────────────────
Large title       text-xl font-bold        24px/700
Nav title         text-[18px] font-bold    18px/700
Section title     text-md font-semibold    16px/600
Body              text-md font-normal      16px/400
Sub-label         text-sm                  14px
Caption           text-xs                  12px
```
