# /restructure-figma — Figma Layer Restructure

Restructure a Figma screen from messy to clean: flatten wrappers, rename semantic, componentize, verify visual unchanged.

## Input

User provides Figma URL or file key + node ID.
Parse: `figma.com/design/:fileKey/:name?node-id=:nodeId` → convert `X-Y` to `X:Y`

If no URL provided, ask for one.

## Pre-flight

1. Load figma-use skill from `/Users/huykieu/.claude/plugins/cache/claude-plugins-official/figma/2.0.2/skills/figma-use/SKILL.md`
2. Read workflow from `/Users/huykieu/Documents/vsp-ui/.claude/workflows/figma-restructure/workflow.md`
3. Read QC agent from `/Users/huykieu/Documents/vsp-ui/.claude/agents/figma-structure-qc.md`

## Execution

### Step 0: Backup (MANDATORY)

Before ANY mutation, duplicate the screen as a backup:

```javascript
const screen = await figma.getNodeByIdAsync("TARGET_ID");
const backup = screen.clone();
backup.name = "[Backup] " + screen.name;
backup.x = screen.x - screen.width - 100;
backup.visible = false;
return { backupId: backup.id };
```

Also save "before" state:
```
get_screenshot → save "before" visual
get_metadata → save full layer tree + record bounding box dimensions
```

Save these numbers for structural verification later:
- Screen width, height
- Each direct child: name, x, y, width, height

### Step 1: Audit

Use `use_figma` to deep-inspect the screen (properties + children):

```javascript
// Inspect with redundant wrapper detection built-in
function isRedundantWrapper(node) {
  return node.type === 'FRAME'
    && node.children.length === 1
    && node.fills.length === 0
    && node.strokes.length === 0
    && node.effects.length === 0
    && node.paddingLeft === 0 && node.paddingRight === 0
    && node.paddingTop === 0 && node.paddingBottom === 0
    && !node.clipsContent
    && node.layoutMode === 'NONE';
}
```

Classify every node:
- `INSTANCE` → keep (already clean). But flag if `mainComponent.remote === false` (local, not library)
- `FRAME` with generic name (`Frame \d+`, `Group \d+`, `Rectangle \d+`, `Frane.*`) → needs rename
- `FRAME` passing `isRedundantWrapper()` → flatten candidate
- `FRAME` siblings with >70% structure match → variant candidates
- `FRAME` containing list of similar items → section candidate
- `VECTOR`, `ELLIPSE`, `BOOLEAN_OPERATION`, `RECTANGLE`, `LINE` as direct screen child → wrap in named frame or componentize
- `FRAME` with `clipsContent=true` → likely scroll container, preserve

Print analysis table:
```
| Node ID | Current Name | Type | Issue | Action |
|---------|-------------|------|-------|--------|
| 50:5113 | Frame 9 | FRAME | Redundant wrapper | Flatten |
| 50:5118 | Frame 4 | FRAME | Wrapper chain (5 deep) | Flatten all |
| 50:5123 | Frane 5 | FRAME | Generic name + typo | Rename |
| 50:5124 | Badge | INSTANCE | remote=false | Check library |
```

### Step 2: Flatten (innermost first)

For each redundant wrapper chain, flatten from inside out.

**CRITICAL: Only flatten frames that pass ALL conditions:**
- `children.length === 1`
- `fills.length === 0` AND no fill of type `IMAGE`
- `strokes.length === 0`
- `effects.length === 0`
- `paddingLeft/Right/Top/Bottom` all 0
- `clipsContent === false`
- `layoutMode === 'NONE'` (not providing auto-layout structure)
- Not a slot or component property reference

**Font workaround:** If `appendChild()` fails due to unloaded font:
1. Try `figma.ungroup(wrapper)` instead — this avoids font loading
2. If ungroup also fails, clone the child, insert clone at wrapper position, remove wrapper+original

**After each flatten:** Re-read metadata. Node IDs may have changed.

### Step 3: Rename

Batch all renames in a single `use_figma` call (renames are safe, no structural change):

```javascript
const renameMap = {
  "id1": "New semantic name",
  "id2": "Another name",
};
for (const [id, name] of Object.entries(renameMap)) {
  const node = await figma.getNodeByIdAsync(id);
  if (node) node.name = name;
}
```

| Pattern | Convention |
|---------|-----------|
| Screen container | `[Screen] Tên tiếng Việt` |
| Section with title + content | `[Section] Descriptor` |
| Content block | `[Content] Descriptor` |
| Modal | `[Modal] Descriptor` |
| Wrapper for specific content | Content name (e.g., `Amount display`) |
| Text nodes | Descriptive (e.g., `Amount value`, `Currency symbol`) |
| Slot frames | Keep as `Slot` |

### Step 4: Componentize (bottom-up)

**4a. Variant detection:**
Find sibling FRAME nodes with >70% structure match + >90% visual match → create ComponentSet.

After `combineAsVariants()`, MUST layout variants:
```javascript
const componentSet = figma.combineAsVariants([...], parent);
// Position variants in a row with 40px gap
let xOffset = 0;
for (const variant of componentSet.children) {
  variant.x = xOffset;
  variant.y = 0;
  xOffset += variant.width + 40;
}
componentSet.resize(xOffset - 40, componentSet.children[0].height);
```

**4b. Content componentize (BEFORE sections):**
Content blocks inside sections → create `[Content]` Components.
- Each distinct content type = 1 Component (e.g., `[Content] Transaction from/to`, `[Content] Metadata`)
- Repeating content blocks with different states → ComponentSet with variants
- Place outside screen, same page

**4c. Section componentize (AFTER content):**
Every content area → wrap in `[Section]` ComponentSet:
- Variant `Layout=Default`: Section title (optional) + Slot for content
- Variant `Layout=Empty`: empty state
- Drop `[Content]` instances into the Slot
- MANDATORY: no content exists outside a Section in the final screen

**Text override preservation:** When replacing FRAME with INSTANCE:
```javascript
// Before removing old frame, capture text content
const textMap = {};
oldFrame.findAll(n => n.type === 'TEXT').forEach(t => {
  textMap[t.name] = t.characters;
});
// After creating instance, apply overrides
newInstance.findAll(n => n.type === 'TEXT').forEach(t => {
  if (textMap[t.name] && t.characters !== textMap[t.name]) {
    await figma.loadFontAsync(t.fontName);
    t.characters = textMap[t.name];
  }
});
```

**4d. Screen → Component:**
Convert screen FRAME to COMPONENT. Set:
- `layoutMode = 'VERTICAL'`
- `primaryAxisSizingMode = 'AUTO'` (HUG height)
- `counterAxisSizingMode = 'FIXED'` (390px width)
- All direct children: `layoutSizingHorizontal = 'FILL'`

**4e. Placement:**
Move all ComponentSets outside screen, same page, 100px to the right. Stack vertically with 40px gap.

### Step 4f: Library Link Check

Check all instances for library linkage:
1. Traverse all INSTANCE nodes in the screen
2. For each, check `mainComponent.remote`:
   - `true` → linked to library, OK
   - `false` → local component, needs replacement
3. For local components, try `importComponentByKeyAsync(mainComponent.key)`:
   - If found → swap instance with library version (preserve position, size, text overrides)
   - If not found → flag as local-only (acceptable for screen-specific components)

### Step 5: QC Loop (max 10 cycles)

Run full checklist from `figma-structure-qc.md`:
```
T1: Screen level (COMPONENT, [Screen] prefix, VERTICAL auto-layout, children FILL, no wrapper at layer 1, no generic names)
T2: Section level (instances from ComponentSets, have variants, have slots)
T3: Card level (variants detected and created, instances in screen)
T4: Atomic level (badges/buttons are instances)
T5: General (no redundant wrappers, component placement, visual unchanged)
T6: Library links (all instances link to library, no detached, keys match)
```

**Circuit breaker:** Max 10 QC cycles. If still failing after 10, report remaining issues and stop.

**Structural verification (not just screenshot):**
After fixes, compare with "before" state numerically:
- Screen bounding box: must match within ±2px
- Direct children count: must match
- Each child position/size: must match within ±2px
- If ANY structural metric exceeds tolerance → flag as visual change

### Step 6: Final Verify

```
get_screenshot → compare with "before"
get_metadata → print final clean tree
```

If visual verification FAILS:
1. Report what changed
2. Ask user: "Restore backup?"
3. If yes, swap backup in: rename backup → remove broken screen → rename backup to original name

Output final report:
```
## Restructure Complete

Screen: [Screen] Name
Node: new_id (was original_id)
Backup: backup_id (hidden, can be deleted)
Checks: X/X passed (Y cycles)
Visual: unchanged (verified structurally + screenshot)

### Fixes applied
- Flattened: N redundant wrappers
- Renamed: N nodes
- Componentized: N ComponentSets created
- Library links fixed: N instances swapped

### Final structure
[tree diagram]

### Components created
[table of ComponentSets with variants]
```

## Screen Structure Rules (CRITICAL)

### Layer 1 Rule
Screen direct children: ONLY VSP_Header, [Section] instances, fixedBottom, Toast wrapper.
**No Content/Group/Frame wrappers. No loose content outside a Section.**

```
CORRECT:                              WRONG:
[Screen] (COMPONENT)                  [Screen] (COMPONENT)
├── VSP_Header        (instance)      ├── VSP_Header
├── [Section] Info    (instance)      ├── Content (FRAME)        ← BANNED wrapper
│   └── Slot                          │   └── some content
│       └── [Content] Xxx (instance)  ├── Card (instance)        ← BANNED loose content
├── [Section] Cards   (instance)      └── fixedBottom
│   └── Slot
│       └── [Content] Yyy (instance)
├── fixedBottom       (instance)
└── Toast wrapper     (SLOT)
```

### Section + Content Rule (MANDATORY)
- Every content area MUST be wrapped in a `[Section]`
- `[Section]` = ComponentSet (Layout=Default with Slot, Layout=Empty)
- `[Content]` = Component that goes INTO the Section's Slot
- Content is the thing that gets componentized, NOT the section itself
- No content should exist outside a Section

```
Hierarchy: Screen > Section (slot container) > Content (component)

[Section] Transfer info (COMPONENT_SET, outside screen)
├── Layout=Default
│   ├── Section title    (instance, optional)
│   └── Slot             ← content instances go here
└── Layout=Empty
    └── Empty state message

[Content] Transaction from/to (COMPONENT, outside screen)
├── From row
├── Arrow
└── To row
```

### Auto-layout + FILL Rule
- Screen: `layoutMode=VERTICAL`, `counterAxisSizingMode=FIXED` (390px), `primaryAxisSizingMode=AUTO` (HUG height)
- ALL direct children: `layoutSizingHorizontal=FILL` — so they stretch to screen width
- Do NOT leave children as `sizingH=FIXED`

### Scroll Container Pattern
If screen has fixed header + scrollable middle + fixed bottom:
- Preserve the scroll container (frame with `clipsContent=true`)
- Do NOT flatten it — it's structural, not a redundant wrapper

### Font Loading
When moving/reparenting nodes with text, fonts must be loaded first. If `figma.loadFontAsync()` fails because font is not available on system:
1. Use `figma.ungroup()` instead of `appendChild()`
2. If ungroup fails, use clone+insert+remove pattern

### Node ID Stability
After `detachInstance()` or structural changes, cached node IDs may be invalid. Always re-discover nodes by traversal from stable ancestors, never assume IDs survive across structural mutations.

### Page Context
`figma.currentPage` resets to page 1 at the start of each `use_figma` call. If target screen is NOT on page 1, every call must start with:
```javascript
const page = figma.root.children.find(p => p.name === "PAGE_NAME");
await figma.setCurrentPageAsync(page);
```

## Idempotency

Before starting, check if restructure was already applied:
- Screen is already COMPONENT? → switch to "update" mode
- ComponentSets already exist outside screen? → reuse, don't duplicate
- If re-running, skip steps that are already done

## Rules

- Always `skillNames: "figma-use"` in every use_figma call
- 1 use_figma call = 1 structural operation. Renames CAN be batched.
- Always return created/mutated node IDs
- If use_figma errors → STOP, read error, fix, retry
- If visual changes → offer to restore backup
- Colors 0-1 range, fills readonly (clone+reassign)
- `setBoundVariableForPaint()` for variable bindings
- `await figma.setCurrentPageAsync(page)` for page switches
- Bottom-up: atomic → card → section → screen
- Preserve ALL variable bindings, auto-layout, fills, strokes, effects on non-wrapper frames
- Max 10 QC cycles — circuit breaker
- Treat INSTANCE children as opaque — do not drill deeper than 2 levels into instance trees
