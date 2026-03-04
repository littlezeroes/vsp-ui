# VSP Reference Design Language
> Deep analysis: OKX iOS (May 2024) · Cash App iOS (Nov 2025) · Revolut iOS (May 2025)
> 1,321 screenshots. Every pattern below is observed in at least 2 of 3 apps.

---

## 1. Typography — The Real Rules

### Heading Scale (what the refs actually use)
```
Display  40–48px  800  Full-bleed page titles ("Create account", "Add money")
Title    28–32px  700  Section anchors, detail page headers
Feature  24px     700  Large title block (VSP: text-xl)
Nav      17–18px  600  NavBar center title (VSP: text-[18px] font-bold)
Label    16px     600  Section title, row label (VSP: text-md font-semibold)
Body     14–16px  400  Description, sublabel (VSP: text-sm / text-md)
Caption  11–12px  400  Legal, timestamp, helper (VSP: text-xs)
```

### Micro-typography rules (all 3 apps)
- **One key word can be a brand accent color** — "Front side of National ID card" where "Front side" = green text. VSP: wrap key word in `<span className="text-success">`.
- **Financial values always monospaced feel** — even if not truly mono, they use tabular-nums to prevent layout shift: `font-variant-numeric: tabular-nums` → add `tabnum` class or inline.
- **Strikethrough for cancelled/paused state** — Revolut uses `line-through` on the amount when a transfer is paused. VSP: `line-through text-foreground-secondary`.
- **"Today" / timestamps** — always `text-xs text-foreground-secondary` right-aligned on same row as amount.
- **% change** — green for positive (`text-success`), red for negative (`text-danger`), always prefixed with `+` or `-`.
- **Currency pair** — `FROM → TO` with thin arrow (`→`), secondary color.

---

## 2. Layout — Precise Measurements

### Content Grid (confirmed across all 3 apps)
```
Screen width    : 390px (iPhone 14 standard)
Content padding : 22px each side (net content width = 346px)
Section title   : 16px each side
NavBar H        : 56px
StatusBar H     : 44px (light) / 54px (dark/VP)
Home indicator  : 21px total / 5px bar / 139px wide
Bottom nav H    : 83px (icon 28px + label 12px + padding)
```

### Section Anatomy (the exact structure all 3 apps follow)
```
pt-[32px]                    ← section gap from previous section
├── SectionTitle row         ← px-[16px], title left + action right
│     text-md/semibold/foreground     "See all" text-md/semibold/success
└── Content slot             ← px-[22px]
      space-y-3 between items
```

### Card / Surface rules
```
Elevation 0 (flat)   → bg-background, no shadow
Elevation 1 (raised) → bg-secondary rounded-[14px] (inner content cards)
Elevation 2 (float)  → bg-background shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-[16px]
Elevation 3 (modal)  → bg-background rounded-[28px] (Dialog, BottomSheet)
```

### Spacing micro-system
```
2px   gap-[2px]    label → input (same field)
4px   gap-[4px]    icon → label (tab items, small compounds)
8px   gap-[8px]    icon → label (list items, standard)
12px  gap-3        between sibling components (space-y-3)
16px  gap-4        section internal grouping
24px  gap-6        (rare) large item spacing in hero blocks
32px  pt-[32px]    between sections
```

---

## 3. Component Patterns — Deep Extraction

### 3.1 List Row (Settings / Options / Transactions)

**Standard row** (used in: OKX settings, Cash App Add Money, Revolut transactions):
```
py-3 flex items-center gap-3
├── prefix: icon 24px OR avatar 44px circle
├── center: flex-1
│   ├── label: text-md font-semibold text-foreground
│   └── sublabel: text-sm text-foreground-secondary (optional)
└── trailing: right group
    ├── metadata: text-md font-semibold text-foreground (amount/value)
    ├── sub-meta: text-xs text-foreground-secondary (timestamp)
    └── chevron: ChevronRight size={20} text-foreground-secondary (navigation rows ONLY)
```

**No ChevronRight on:**
- Action rows (have a label button like "Change", "Add")
- Destructive rows ("Delete" in red — no chevron)
- Toggle rows (have a Switch component instead)

**Divider rule:** Only between rows, NEVER after the last row. `border-b border-border` on all rows except last.

**Cash App "no divider" variant:** Some list blocks use ONLY spacing (no `border-b`). Use when bg contrast is already sufficient (e.g., rows on `bg-secondary`).

### 3.2 Status / Alert Card (inside content)

Revolut's "scheduled transfer paused" card:
```
bg-secondary rounded-[14px] p-[14px]
flex items-start gap-3
├── icon: warning/info (24px, text-warning or text-danger, mt-[4px])
└── content:
    ├── title: text-md font-semibold text-foreground
    ├── description: text-sm text-foreground-secondary mt-1
    └── action button: mt-3 <Button variant="secondary" size="32">Reactivate</Button>
```
→ **VSP:** Use `<InformMessage>` for this. It already matches.

### 3.3 Segmented Control (Annually / Quarterly, Buy / Sell)

Cash App & OKX both use this. Pattern:
```
bg-secondary rounded-full p-[3px] flex
├── [active]   bg-background rounded-full py-[8px] flex-1 text-center text-sm font-semibold text-foreground shadow-sm
└── [inactive] flex-1 text-center text-sm font-semibold text-foreground-secondary
```
→ **VSP:** Not yet a component. Build inline using tokens only.

### 3.4 Quick Actions Row (Revolut Home)

4 circular icon buttons in a horizontal row:
```
flex justify-between px-[22px] pt-[16px] pb-[8px]
each button:
  flex flex-col items-center gap-[6px]
  ├── circle: w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center
  │     icon: 24px text-foreground
  └── label: text-xs font-medium text-foreground-secondary
```
→ **VSP:** Raw HTML with tokens. No custom values.

### 3.5 Transaction Row

OKX & Revolut transaction rows:
```
py-3 flex items-center gap-3
├── icon circle: w-[44px] h-[44px] rounded-full bg-secondary flex-center icon-24 text-foreground
└── flex-1 flex justify-between items-center
    ├── left:
    │   ├── label: text-md font-semibold text-foreground (merchant/type)
    │   └── sublabel: text-sm text-foreground-secondary (date + time)
    └── right:
        ├── amount: text-md font-semibold text-foreground (+$20 / -$1)
        └── status: text-xs text-foreground-secondary ("Completed")
```
→ **VSP:** `<ItemListItem>` with `prefix`, `label`, `sublabel`, `metadata`, `subMetadata` props.

### 3.6 Balance Display (Hero)

Revolut home — the most prominent element:
```
flex flex-col items-center pt-[24px] pb-[16px]
├── context: text-xs text-foreground-secondary tracking-wide uppercase ("Personal · SGD")
├── amount: text-[40px] font-bold leading-none text-foreground tabular-nums
└── pill button: mt-[12px] bg-secondary rounded-full px-[16px] py-[8px] text-sm font-semibold text-foreground
```
→ **VSP:** Raw HTML with tokens — use `text-foreground`, `bg-secondary`, `text-foreground-secondary`.

### 3.7 Pill Filter Tabs (Horizontal Scroll)

Cash App Offers, OKX Market:
```
flex gap-[8px] px-[16px] overflow-x-auto no-scrollbar
each pill:
  [active]   bg-foreground text-background rounded-full px-[14px] py-[8px] text-sm font-semibold
  [inactive] bg-secondary text-foreground-secondary rounded-full px-[14px] py-[8px] text-sm font-semibold
```
→ **VSP tokens only.** Use `bg-foreground text-background` for active pill.

### 3.8 Bottom Sheet — Two CTA Variant (Revolut "Mark as paid?")

When a sheet has TWO actions (confirm + cancel):
```
BottomSheet content:
├── title: text-md font-semibold text-foreground
├── description: text-sm text-foreground-secondary mt-[4px]
└── mt-[24px] flex flex-col gap-3
    ├── <Button variant="primary" size="48">Yes, mark as paid</Button>
    └── <Button variant="secondary" size="48">Cancel</Button>
```
→ **VSP:** `<BottomSheet>` + `<ButtonGroup layout="vertical">` inside.

### 3.9 Destructive Row

Revolut "Delete" row:
```
<ItemListItem> with custom label styling:
  label: "Delete" text-danger font-semibold
  NO chevron, NO sublabel, NO prefix
  NO divider (it's isolated, alone in its section)
```
→ **VSP:** `<ItemListItem label="Delete" className="text-danger">` — or use a Button with danger variant inside the section.

### 3.10 Day/Option Pill Selector (Revolut Week starts on)

Horizontal row of selectable chips:
```
flex gap-[6px]
each pill:
  [active]   w-[44px] h-[44px] rounded-full bg-foreground text-background text-sm font-semibold flex items-center justify-center
  [inactive] w-[44px] h-[44px] rounded-full bg-secondary text-foreground-secondary text-sm font-semibold flex items-center justify-center
```
→ **VSP tokens only.**

---

## 4. Navigation Patterns

### 4.1 Back Button
```
OKX    : <  chevron, top-left
Cash App: ←  arrow or × for modal close
Revolut: ←  arrow
VSP    : ChevronLeft ALWAYS for back, X (✕) for modal/sheet close
```

### 4.2 Bottom Tab Bar (App-level)
```
OKX:     5 tabs  icon(28) + label(10px)  ← icon + text below
CashApp: 3 tabs  icon(28) only          ← icon only, very minimal
Revolut: 5 tabs  icon(24) + label(10px)  ← icon + text below

Active:   icon filled/bold + text-foreground
Inactive: icon outline + text-foreground-secondary
No badges shown in most default states

Structure:
fixed bottom-0 inset-x-0 h-[83px]
flex justify-around items-center px-[16px] pt-[12px] pb-[21px]
bg-background border-t border-border
```
→ **VSP:** Not yet a standalone component. Build with tokens.

### 4.3 Dropdown Menu (Revolut top-right)
```
Appears from top-right action button press
Dark overlay behind, white/dark card
Rounded [16px], shadow
Each item: icon(20) + label text-md text-foreground py-[14px] px-[16px]
No chevrons (these are direct actions)
```
→ **VSP:** `<BottomSheet>` with list of `<ItemListItem showChevron={false}>` items.

### 4.4 Horizontal Scroll Sections
```
Cash App news cards, OKX token chips:
overflow-x-auto no-scrollbar
flex gap-3
px-[22px]  ← first card aligns to content column
last card can have pr-[22px] padding

Card min-width: w-[200px] to w-[280px]
```

---

## 5. Color Usage — Precise Rules

### When to use each color
```
text-foreground          Primary data: amounts, titles, labels
text-foreground-secondary Secondary: timestamps, sublabels, placeholders
text-success             Actions ("See all", "Show more"), positive % change, checkmarks
text-danger              Negative % change, error states, destructive action labels
text-warning             Warning status icons, pending state
bg-secondary             Surface tint for quick-action circles, segmented control bg
bg-foreground            Primary CTA button fill, active pill fill
bg-secondary             Inactive pill fill, inner card surfaces
bg-grey-200              Grabber pill, subtle separator when border would be too heavy
```

### Status color combinations
```
Positive change: text-success prefix "+"  e.g., "+2.60% Today"
Negative change: text-danger  prefix "-"  e.g., "-0.32%"
Warning state:   text-warning icon + text-foreground title
Error state:     text-danger  icon + text-foreground title
Paused state:    text-foreground-secondary + strikethrough on value
```

---

## 6. Interaction Patterns

### Progressive Disclosure (all 3 apps)
```
Level 1: Section preview (3-5 items) + "See all" button
Level 2: Full list screen (back navigation)
Level 3: Item detail screen (back navigation)
Level 4: Action sheet / dialog (close/cancel)
```

### Loading States
```
OKX:    Skeleton placeholders (grey animated bars)
CashApp: Spinner centered, minimal
Revolut: Content appears progressively, no full-screen loader
VSP:    <Button isLoading> for action states; skeleton for content
```

### Error Handling
```
OKX:    Inline red × list below field (validation)
CashApp: Red border on input + helper text below
Revolut: Red border + red helper text below
VSP:    <TextField error="message"> handles this correctly
```

### Empty States
```
All apps: Center vertically, icon top, title, optional description, optional CTA
Cash App: Green circle checkmark for success (positive empty)
OKX:      Muted grey icon for neutral empty
VSP:      <FeedbackState> matches perfectly
```

---

## 7. The 10 UX Laws Extracted from Refs

1. **One primary action per screen.** Never two black buttons on the same screen.
2. **CTA lives at the bottom.** Not mid-content. The user's thumb is at the bottom.
3. **Color is semantic, not decorative.** Green = good/positive/action. Red = bad/negative/danger. Never use color just to look nice.
4. **Financial data is always the biggest text on screen.** Amount > everything else.
5. **Never orphan a label from its value.** Label and value are always in proximity (same row, or label directly above value).
6. **Chevron only on navigation rows.** Not on action rows, toggle rows, or destructive rows.
7. **Disabled ≠ hidden.** Disabled CTA is visible as grey — tells user what's coming when they complete the form.
8. **Search is always pill-shaped.** Full width, `bg-secondary`, `rounded-full`, leading search icon.
9. **Positive amounts have `+` prefix.** Negative have `-`. Never show raw numbers without sign for transaction amounts.
10. **Dark mode is a first-class mode, not an afterthought.** Every surface, every text, every icon is purpose-built for dark — not inverted.

---

## 8. Screen-Type Rulebook for VSP

### Home / Dashboard
- Header: `variant="large-title"` with greeting in description
- Balance: large centered amount (raw HTML, tokens only)
- Quick actions: 4 circular buttons in a row, icon + label
- Recent transactions: `<ItemList>` with 3 items + "See all"
- Inform message for promotions: `<InformMessage hierarchy="primary">`
- Fixed bottom: home indicator

### Onboarding / Form Steps
- Header: `variant="default"` with X close in trailing (no back on first screen)
- Title: `text-xl font-bold` left-aligned in content area (NOT in header)
- Description below title: `text-md text-foreground-secondary`
- Single `<TextField>` in content
- CTA: single `<Button variant="primary" size="48">` full-width FIXED at bottom

### Transaction List
- Header: `variant="default"` with title
- Filter pills: horizontal scroll row of pill chips
- List: `<ItemList>` with icon + label + sublabel + amount + timestamp

### Transaction Detail
- Header: `variant="default"` title = merchant name
- Amount: large display `text-[40px] font-bold` at top of content
- Info groups: `<ItemList>` blocks separated by `pt-[24px]`
- Destructive: `<Button variant="secondary" intent="danger">` at bottom

### Settings
- Header: `variant="default"` with title
- Sections with labels: `<ItemList>` with `<ItemListItem>` rows
- Toggles: trailing switch component (raw, tokens only)
- Destructive section: `<ItemListItem>` with `text-danger` label

### Success / Completion
- No header
- Centered full-screen: icon (64px) + title + description
- `<FeedbackState>` component matches perfectly
- CTA at bottom: `<Button variant="primary" size="48">`

---

## 9. Anti-Patterns (CONFIRMED: none of the 3 reference apps do these)

```
❌ Multiple card borders on a white background
❌ Gradient text or decorative gradients on body content
❌ More than one primary (dark fill) button per screen
❌ Bold AND colored text for the same element (pick one)
❌ Divider after the last list item
❌ Chevron on a non-navigating row
❌ Centered body text in list content
❌ Text in ALL CAPS for body content (only for special labels/captions)
❌ Placeholder text as the label (label must be separate, above the field)
❌ Error messages in a toast when the error belongs inline to the field
❌ Success toast for a navigation action (toasts = async results only)
❌ Color without symbol for financial changes (+/- sign required)
```

---

*Source: Mobbin curated — OKX May 2024 (429 screens), Cash App Nov 2025 (236 screens), Revolut May 2025 (656 screens)*
