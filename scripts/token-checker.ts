/**
 * VSP Token Checker — Playwright automated CSS-vs-Figma comparator
 *
 * Usage (first time):
 *   npm install --save-dev @playwright/test
 *   npx playwright install chromium
 *   npm run dev          # terminal 1
 *   npm run token-check  # terminal 2
 *
 * Re-run anytime:
 *   npm run token-check
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — one or more mismatches found
 */

import { chromium, type Page } from "@playwright/test"

const BASE_URL = process.env.VSP_URL ?? "http://localhost:3000"

/* ── Types ──────────────────────────────────────────────────────────── */

interface TokenCheck {
  component: string      // Figma displayName
  property: string       // human-readable property label
  selector: string       // CSS selector on the page
  cssProp: string        // getComputedStyle property name
  expected: string       // expected value (hex or rgba)
  figmaToken: string     // Figma token path
}

interface CheckResult extends TokenCheck {
  actual: string
  pass: boolean
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

/** Convert computed rgb/rgba to lowercase hex, or return original for rgba */
function normalise(value: string): string {
  const m = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/)
  if (!m) return value.trim().toLowerCase()
  const r = Number(m[1]), g = Number(m[2]), b = Number(m[3])
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1
  if (a < 1) return `rgba(${r}, ${g}, ${b}, ${a})`
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`
}

async function css(page: Page, sel: string, prop: string): Promise<string> {
  try {
    const v = await page.$eval(
      sel,
      (el: Element, p: string) => window.getComputedStyle(el).getPropertyValue(p).trim(),
      prop
    )
    return normalise(v)
  } catch {
    return "NOT_FOUND"
  }
}

async function cssPx(page: Page, sel: string, prop: string): Promise<string> {
  try {
    const v = await page.$eval(
      sel,
      (el: Element, p: string) => window.getComputedStyle(el).getPropertyValue(p).trim(),
      prop
    )
    return v.trim()
  } catch {
    return "NOT_FOUND"
  }
}

/* ── Check definitions ───────────────────────────────────────────────── */
// Selectors match classes rendered in the showcase page.
// Light-mode checks run on the main page; dark-mode checks target .dark wrappers.

const CHECKS: TokenCheck[] = [

  // ── VSP_Button — primary/default ─────────────────────────────────────
  {
    component: "VSP_Button",
    property: "primary bg (foreground/primary = #080808)",
    selector: "button.bg-foreground:not([disabled]):not(.dark *)",
    cssProp: "background-color",
    expected: "#080808",
    figmaToken: "foreground/primary → var(--foreground)",
  },
  {
    component: "VSP_Button",
    property: "primary text (foreground/inverse = #ffffff)",
    selector: "button.bg-foreground:not([disabled]):not(.dark *)",
    cssProp: "color",
    expected: "#ffffff",
    figmaToken: "foreground/inverse → var(--background)",
  },
  {
    component: "VSP_Button",
    property: "border-radius (100px = rounded-full)",
    selector: "button.rounded-full:not(.dark *)",
    cssProp: "border-radius",
    expected: "9999px",
    figmaToken: "radius/rounded-circle → rounded-full",
  },
  {
    component: "VSP_Button",
    property: "size=48 height (48px)",
    selector: "button.h-12:not(.dark *)",
    cssProp: "height",
    expected: "48px",
    figmaToken: "size/48 → h-12",
  },
  {
    component: "VSP_Button",
    property: "size=48 padding-left (24px)",
    selector: "button.px-6:not(.dark *)",
    cssProp: "padding-left",
    expected: "24px",
    figmaToken: "size/48 → px-6",
  },
  {
    component: "VSP_Button",
    property: "size=32 height (32px)",
    selector: "button.h-8:not(.dark *)",
    cssProp: "height",
    expected: "32px",
    figmaToken: "size/32 → h-8",
  },
  {
    component: "VSP_Button",
    property: "primary/danger bg (#eb002b)",
    selector: "button.bg-danger:not([disabled]):not(.dark *)",
    cssProp: "background-color",
    expected: "#eb002b",
    figmaToken: "bg/contextual/danger → var(--danger)",
  },
  {
    component: "VSP_Button",
    property: "disabled bg (#e5e5e5)",
    selector: "button[disabled]:not(.dark *)",
    cssProp: "background-color",
    expected: "#e5e5e5",
    figmaToken: "disabled/background → var(--disabled-bg)",
  },
  {
    component: "VSP_Button",
    property: "disabled text (#a1a1a1)",
    selector: "button[disabled]:not(.dark *)",
    cssProp: "color",
    expected: "#a1a1a1",
    figmaToken: "disabled/foreground → var(--disabled-fg)",
  },

  // ── VSP_ButtonGroup — secondary button ───────────────────────────────
  {
    component: "VSP_ButtonGroup",
    property: "secondary btn bg (bg/surface/secondary = #f3f3f3)",
    selector: "button.bg-secondary:not(.dark *)",
    cssProp: "background-color",
    expected: "#f3f3f3",
    figmaToken: "bg/surface/secondary → var(--secondary)",
  },

  // ── VSP_TextField ─────────────────────────────────────────────────────
  {
    component: "VSP_TextField",
    property: "container border (border/primary = #e5e5e5)",
    selector: "div.min-h-\\[58px\\]:not(.dark *)",
    cssProp: "border-color",
    expected: "#e5e5e5",
    figmaToken: "border/primary → var(--border)",
  },
  {
    component: "VSP_TextField",
    property: "container border-radius (14px)",
    selector: "div.rounded-\\[14px\\]:not(.dark *)",
    cssProp: "border-radius",
    expected: "14px",
    figmaToken: "14px (TextField)",
  },
  {
    component: "VSP_TextField",
    property: "label color (foreground/secondary = #262626)",
    selector: "div.min-h-\\[58px\\] span.text-xs:not(.dark *)",
    cssProp: "color",
    expected: "#262626",
    figmaToken: "foreground/secondary → var(--foreground-secondary)",
  },

  // ── VSP_Checkbox ─────────────────────────────────────────────────────
  {
    component: "VSP_Checkbox",
    property: "unchecked border (border/bold-primary = #d4d4d4)",
    selector: "button[role='checkbox'][aria-checked='false']:not(.dark *)",
    cssProp: "border-color",
    expected: "#d4d4d4",
    figmaToken: "border/bold-primary → var(--border-bold)",
  },
  {
    component: "VSP_Checkbox",
    property: "checked bg (bg/contextual/brand = #1f1f1f)",
    selector: "button[role='checkbox'][aria-checked='true']:not(.dark *)",
    cssProp: "background-color",
    expected: "#1f1f1f",
    figmaToken: "bg/contextual/brand → var(--primary)",
  },
  {
    component: "VSP_Checkbox",
    property: "size (24px)",
    selector: "button[role='checkbox']:not(.dark *)",
    cssProp: "width",
    expected: "24px",
    figmaToken: "24×24px",
  },
  {
    component: "VSP_Checkbox",
    property: "border-radius (8px)",
    selector: "button[role='checkbox']:not(.dark *)",
    cssProp: "border-radius",
    expected: "8px",
    figmaToken: "radius/rounded-lg → 8px",
  },

  // ── VSP_ToastBar ─────────────────────────────────────────────────────
  {
    component: "VSP_ToastBar",
    property: "default bg (component/background/toast = #262626)",
    selector: "div.bg-toast",
    cssProp: "background-color",
    expected: "#262626",
    figmaToken: "component/background/toast → var(--toast)",
  },
  {
    component: "VSP_ToastBar",
    property: "error bg (decor/background/rose-subtle = #fff1f2)",
    selector: "div.bg-rose-50",
    cssProp: "background-color",
    expected: "#fff1f2",
    figmaToken: "decor/background/rose-subtle → bg-rose-50",
  },
  {
    component: "VSP_ToastBar",
    property: "success bg (decor/background/green-subtle = #e5fcf6)",
    selector: "div.bg-green-50",
    cssProp: "background-color",
    expected: "#e5fcf6",
    figmaToken: "decor/background/green-subtle → bg-green-50",
  },

  // ── InformMessage ─────────────────────────────────────────────────────
  {
    component: "InformMessage",
    property: "secondary bg (#f3f3f3)",
    selector: "div.bg-secondary.rounded-\\[14px\\]",
    cssProp: "background-color",
    expected: "#f3f3f3",
    figmaToken: "bg/surface/secondary → var(--secondary)",
  },
  {
    component: "InformMessage",
    property: "primary bg (decor/background/blue-subtle = #eff6ff)",
    selector: "div.bg-blue-50.rounded-\\[14px\\]",
    cssProp: "background-color",
    expected: "#eff6ff",
    figmaToken: "decor/background/blue-subtle → bg-blue-50",
  },

  // ── FeedbackState ─────────────────────────────────────────────────────
  {
    component: "FeedbackState",
    property: "title color (foreground/primary = #080808)",
    selector: "div.py-\\[40px\\] h3",
    cssProp: "color",
    expected: "#080808",
    figmaToken: "foreground/primary → var(--foreground)",
  },

  // ── VSP_Dialog ───────────────────────────────────────────────────────
  // (Dialog is a portal, tested statically via preview elements in showcase)
  {
    component: "VSP_Dialog",
    property: "preview card radius (28px)",
    selector: "div.rounded-\\[28px\\]",
    cssProp: "border-radius",
    expected: "28px",
    figmaToken: "28px (Dialog/BottomSheet)",
  },

  // ── bottomSheet ───────────────────────────────────────────────────────
  {
    component: "bottomSheet",
    property: "grabber color (bg/surface/tertiary = #e5e5e5)",
    selector: "div.w-9.h-\\[6px\\].rounded-full",
    cssProp: "background-color",
    expected: "#e5e5e5",
    figmaToken: "bg/surface/tertiary → bg-grey-200",
  },

  // ── VSP_itemList ─────────────────────────────────────────────────────
  {
    component: "VSP_itemList",
    property: "label color (foreground/primary = #080808)",
    selector: "div.py-3 p.text-md.font-semibold",
    cssProp: "color",
    expected: "#080808",
    figmaToken: "foreground/primary → var(--foreground)",
  },
  {
    component: "VSP_itemList",
    property: "sublabel color (foreground/secondary = #262626)",
    selector: "div.py-3 p.text-md.font-normal",
    cssProp: "color",
    expected: "#262626",
    figmaToken: "foreground/secondary → var(--foreground-secondary)",
  },
]

/* ── Runner ──────────────────────────────────────────────────────────── */

async function runChecks(page: Page): Promise<CheckResult[]> {
  const results: CheckResult[] = []
  for (const check of CHECKS) {
    const actual = check.cssProp === "height" || check.cssProp === "width" || check.cssProp.includes("padding") || check.cssProp.includes("margin") || check.cssProp.includes("radius")
      ? await cssPx(page, check.selector, check.cssProp)
      : await css(page, check.selector, check.cssProp)
    const pass = actual.toLowerCase() === check.expected.toLowerCase()
    results.push({ ...check, actual, pass })
  }
  return results
}

function printReport(results: CheckResult[]) {
  const pass = results.filter(r => r.pass)
  const fail = results.filter(r => !r.pass)

  // Group by component
  const grouped = results.reduce<Record<string, CheckResult[]>>((a, r) => {
    ;(a[r.component] ??= []).push(r)
    return a
  }, {})

  console.log("\n" + "═".repeat(72))
  console.log("  VSP Token Compliance Report")
  console.log("═".repeat(72))

  for (const [comp, items] of Object.entries(grouped)) {
    const compFail = items.filter(r => !r.pass)
    const status = compFail.length === 0 ? "✅" : "❌"
    console.log(`\n${status} ${comp}`)
    for (const r of items) {
      if (r.pass) {
        console.log(`   ✅ ${r.property}  →  ${r.actual}`)
      } else {
        console.log(`   ❌ ${r.property}`)
        console.log(`      expected : ${r.expected}  (${r.figmaToken})`)
        console.log(`      actual   : ${r.actual}   [selector: ${r.selector}]`)
      }
    }
  }

  console.log("\n" + "─".repeat(72))
  console.log(`  Total: ${results.length}  Pass: ${pass.length}  Fail: ${fail.length}`)
  console.log("─".repeat(72) + "\n")

  if (fail.length > 0) {
    console.log("❌ FAILURES:\n")
    console.table(fail.map(f => ({
      Component: f.component,
      Property: f.property,
      "Figma Token": f.figmaToken,
      Expected: f.expected,
      Actual: f.actual,
    })))
    process.exit(1)
  } else {
    console.log("✅ All checks passed — 100% VSP token compliance!\n")
  }
}

/* ── Main ────────────────────────────────────────────────────────────── */

async function main() {
  console.log("🚀 Launching Chromium…")
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewportSize({ width: 390, height: 844 })

  console.log(`📄 Opening ${BASE_URL}…`)
  await page.goto(BASE_URL, { waitUntil: "networkidle" })

  console.log("🔍 Running token checks…\n")
  const results = await runChecks(page)

  await browser.close()
  printReport(results)
}

main().catch(err => { console.error("Fatal:", err); process.exit(1) })
