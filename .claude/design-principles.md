# VSP Design Principles
> Source: `principle.pdf` — 7 Essential UI Design Principles

---

## Why Principles Matter

- **Beauty is the first function.** A great interface builds instant trust before the user's rational mind can judge it.
- **Invisible design (Apple standard).** The goal is to disappear — when Logic (Hierarchy, Contrast, Spacing) creates a natural flow, users tap, swipe, and act without thinking.
- **Discipline enables freedom.** Every pixel must have a reason. A governed design system protects the product from time, ego, and entropy — and lets the team ship faster without debate.

---

## Principle 1 — Clean & Premium

> *Luxury lies in restraint. When you remove a line, you give the user space to breathe.*

### Rules
- **No gratuitous dividers or borders.** Avoid horizontal rules and box borders as separators — they fragment the UI and make it feel "busy."
- **Use spacing to separate, not lines.** Negative space (whitespace) creates rhythm and breathing room between elements.
- **Use soft shadows to establish depth.** Extremely subtle shadows (`box-shadow: 0 1px 4px rgba(0,0,0,0.06)`) layer surfaces without visual noise.
- **Borderless thinking.** When you remove a frame, content becomes its own architecture. Let content define structure.
- **No decorative containers.** Never wrap content in a border just for grouping — use spacing + hierarchy instead.

### Do / Don't
| ✅ Do | ❌ Don't |
|---|---|
| Separate sections with `pt-[32px]` spacing | Draw a `<hr>` or border-bottom between sections |
| Use card elevation (soft shadow) for depth | Use `border` on every card |
| Let content alignment create visual groups | Add dividers between every list item |

---

## Principle 2 — Alignment

> *A world-class interface starts with clean lines. When everything "lines up", the UI radiates professionalism and trust.*

### Rules
- **Grid system is non-negotiable.** All elements snap to the layout grid — never place elements by "feel."
- **Consistent left edge.** Primary content starts at the same X axis. In VSP: `px-[22px]` for content, `px-[16px]` for section titles.
- **Predictability builds trust.** Consistent alignment creates a rhythm the user's brain locks onto — they stop hunting for information.
- **Typography alignment.** Left-align body text always. Center only for short standalone labels (empty states, dialog titles).
- **Icon + text baseline alignment.** Icons must vertically align with their accompanying text (`items-center`).

### Do / Don't
| ✅ Do | ❌ Don't |
|---|---|
| Use `px-[22px]` consistently for all content columns | Mix `px-4`, `px-5`, `px-6` arbitrarily across screens |
| Align all section titles at `px-[16px]` | Float section titles at different indent levels |
| Snap trailing icons to the same right edge | Eyeball icon positions per component |

---

## Principle 3 — Consistency

> *A good interface is one the user feels familiar with from the very first tap. Design System builds that trust through consistency.*

### Rules
- **One token, one value.** A color, spacing, or radius must come from the token system. Never hardcode a one-off value.
- **Component reuse over recreation.** If a component exists in the system, use it — never rebuild a variation inline.
- **Same interaction, same pattern.** All list rows behave the same way. All buttons behave the same way. No surprises.
- **Break rules only with a compelling reason.** If you can't defend the exception in a design review, don't make it.
- **Naming consistency.** Component names, prop names, and token names must match exactly between Figma and code (`VSP_Button`, not `Button` or `PrimaryButton`).

### Do / Don't
| ✅ Do | ❌ Don't |
|---|---|
| Use `<Button variant="primary">` from the system | Create an ad-hoc `<div className="bg-black text-white">` button |
| Reference `var(--foreground)` for primary text | Hardcode `#080808` directly in a component |
| Keep all back buttons as `ChevronLeft` | Mix `ArrowLeft` and `ChevronLeft` in different screens |

---

## Principle 4 — Hierarchy

> *Hierarchy is the art of priority planning — guiding users into a flow state without them realising it.*

### Rules
- **Size signals importance.** Largest text = most important. Never let secondary text compete with primary in size.
- **Weight signals urgency.** `font-bold` (700) = must read. `font-semibold` (600) = important. `font-normal` (400) = supporting.
- **Color signals role.** `text-foreground` (#080808) = primary content. `text-foreground-secondary` (#262626) = supporting. `text-success` (#00b182) = action/call-to-action.
- **Spacing signals grouping.** Tightly spaced items belong together (`gap-[4px]` within a group). Loosely spaced items are separate (`pt-[32px]` between sections).
- **One primary action per screen.** A page should have one dominant CTA (`variant="primary"`). Everything else is secondary.

### Typography Scale (VSP)
| Role | Size | Weight | Token |
|---|---|---|---|
| Large Title | 24px | 700 Bold | `text-xl font-bold` |
| Nav Title | 18px | 700 Bold | `text-[18px] font-bold` |
| Section Title | 16px (md) | 600 Semibold | `text-md font-semibold` |
| Body / Label | 16px (md) | 400–500 | `text-md font-normal` |
| Sub-label | 14px (sm) | 400–600 | `text-sm` |
| Caption | 12px (xs) | 400 | `text-xs` |

---

## Principle 5 — Progressive Disclosure

> *Don't force users to see everything at once. Reveal the right information at the right time.*

### Rules
- **Surface only what's needed now.** Hide complexity behind taps, drawers, and sheets (`BottomSheet`, `Dialog`).
- **Break long flows into steps.** A multi-field form becomes a step-by-step sequence. Each step answers one question.
- **Always orient the user.** When a process has multiple steps, show a progress indicator so users know where they are and when it ends.
- **"See all" pattern.** Sections show a preview (3–5 items). Full lists live behind a "See all" action (`text-success font-semibold`).
- **Details on demand.** Metadata, descriptions, and help text should appear in context (inline below the field) or on a detail screen, not upfront.

### Do / Don't
| ✅ Do | ❌ Don't |
|---|---|
| Show 3 list items + "See all" button | Dump 20 items in a flat list with no hierarchy |
| Put destructive confirmations in a `Dialog` | Ask for confirmation inline with text |
| Break a 6-field form into 2 steps | Stack all fields on one screen |

---

## Principle 6 — Contrast

> *Contrast ensures readability. Without it, the UI is invisible.*

### Rules
- **Text contrast minimum: 4.5:1** (WCAG AA). Primary text (#080808) on white (#ffffff) = 19.6:1. ✅
- **Never use gray-on-gray.** Secondary text (`#262626`) must be on a clearly lighter background.
- **Disabled ≠ invisible.** Disabled elements use `#a1a1a1` text + `#e5e5e5` background — still legible, clearly inactive.
- **Contrast communicates state.** Active tabs have full `text-foreground`. Inactive tabs use `text-foreground-secondary`. The difference must be immediately visible.
- **Dark mode is not "invert".** Dark mode uses a purpose-built token set — not just color inversion. Each token has a specific dark value.

### VSP Contrast Pairs (Light Mode)
| Use Case | Text | Background | Ratio |
|---|---|---|---|
| Primary text | `#080808` | `#ffffff` | 19.6:1 ✅ |
| Secondary text | `#262626` | `#ffffff` | 14.7:1 ✅ |
| Success action | `#00b182` | `#ffffff` | 3.1:1 ⚠️ (large text only) |
| Disabled text | `#a1a1a1` | `#e5e5e5` | 1.8:1 (intentionally muted) |
| Primary button | `#ffffff` | `#080808` | 19.6:1 ✅ |

---

## Principle 7 — Proximity

> *In UI, related things must be close together. Users assume adjacent elements belong to the same functional group.*

### Rules
- **Tight spacing = same group.** Items in a form field (`label → input → helpText`) use `gap-[2px]` to `gap-[4px]`.
- **Medium spacing = related sections.** Items within a section use `gap-[8px]` to `gap-[16px]`.
- **Large spacing = separate sections.** New sections start with `pt-[32px]`.
- **Icon-label proximity.** An icon and its label must be `gap-[4px]` to `gap-[8px]` apart — never loose.
- **Action proximity to content.** A button that acts on content must be visually adjacent to it, not floating far away.
- **Don't mix groups.** If two items are unrelated, separate them with enough space that the eye reads them as distinct.

### VSP Spacing Reference
| Context | Token / Class | Value |
|---|---|---|
| Within a label+input group | `gap-[2px]` | 2px |
| Within a card / row | `gap-[4px]` – `gap-[8px]` | 4–8px |
| Between list items | `py-3` per item | 12px vertical |
| Between components in a section | `space-y-3` / `gap-3` | 12px |
| Between sections | `pt-[32px]` | 32px |
| Section content padding | `px-[22px]` | 22px |
| Section title padding | `px-[16px]` | 16px |
| Nav bar horizontal padding | `pl-[14px] pr-[22px]` | 14–22px |

---

## Quick Reference — VSP Design Laws

| # | Principle | One-Line Rule |
|---|---|---|
| 1 | Clean & Premium | Remove borders; use space and shadow instead |
| 2 | Alignment | Grid decides position, not gut feeling |
| 3 | Consistency | Same component, same token, same behavior — always |
| 4 | Hierarchy | Size + weight + color = reading order |
| 5 | Progressive Disclosure | Show what's needed now; hide the rest behind a tap |
| 6 | Contrast | Every text-background pair must pass the eye test |
| 7 | Proximity | Close = related; far = separate. Space is structure |

---

*Last updated: 2026-02-28 — Source: VSP principle.pdf*
