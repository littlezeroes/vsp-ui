"use client"

import { useEffect } from "react"
import { getSvgPath } from "figma-squircle"

/*
 * SmoothCornersProvider
 * Applies iOS-style smooth corners (squircle, cornerSmoothing = 0.6) to all
 * elements that carry Tailwind arbitrary border-radius classes like
 * `rounded-[28px]`, `rounded-t-[28px]`, etc.
 *
 * How it works:
 *  1. Queries all elements whose `class` attribute contains "rounded-["
 *  2. Parses the corner radii from the class list
 *  3. Computes a figma-squircle SVG path sized to the element's current dimensions
 *  4. Applies it via `clip-path: path(...)` and removes `border-radius`
 *     so CSS border-radius doesn't conflict
 *  5. ResizeObserver keeps the path in sync when the element resizes
 *  6. MutationObserver watches for new elements added to the DOM
 */

const SMOOTHING = 0.6
const SELECTOR = '[class*="rounded-["]'

type Corners = { tl: number; tr: number; br: number; bl: number }

function parseCornersFromClassList(classList: DOMTokenList): Corners | null {
  if (classList.contains("rounded-full")) return null

  let tl = 0, tr = 0, br = 0, bl = 0

  classList.forEach((cls) => {
    let m: RegExpMatchArray | null

    if ((m = cls.match(/^rounded-\[(\d+(?:\.\d+)?)px\]$/)))      { const r = +m[1]; tl = tr = br = bl = r; return }
    if ((m = cls.match(/^rounded-t-\[(\d+(?:\.\d+)?)px\]$/)))    { const r = +m[1]; tl = tr = r; return }
    if ((m = cls.match(/^rounded-b-\[(\d+(?:\.\d+)?)px\]$/)))    { const r = +m[1]; br = bl = r; return }
    if ((m = cls.match(/^rounded-l-\[(\d+(?:\.\d+)?)px\]$/)))    { const r = +m[1]; tl = bl = r; return }
    if ((m = cls.match(/^rounded-r-\[(\d+(?:\.\d+)?)px\]$/)))    { const r = +m[1]; tr = br = r; return }
    if ((m = cls.match(/^rounded-tl-\[(\d+(?:\.\d+)?)px\]$/)))   { tl = +m[1]; return }
    if ((m = cls.match(/^rounded-tr-\[(\d+(?:\.\d+)?)px\]$/)))   { tr = +m[1]; return }
    if ((m = cls.match(/^rounded-br-\[(\d+(?:\.\d+)?)px\]$/)))   { br = +m[1]; return }
    if ((m = cls.match(/^rounded-bl-\[(\d+(?:\.\d+)?)px\]$/)))   { bl = +m[1]; return }
  })

  if (tl === 0 && tr === 0 && br === 0 && bl === 0) return null
  return { tl, tr, br, bl }
}

function applySmooth(el: HTMLElement) {
  const corners = parseCornersFromClassList(el.classList)
  if (!corners) return

  const w = el.offsetWidth
  const h = el.offsetHeight
  if (!w || !h) return

  const path = getSvgPath({
    width: w,
    height: h,
    topLeftCornerRadius: corners.tl,
    topRightCornerRadius: corners.tr,
    bottomRightCornerRadius: corners.br,
    bottomLeftCornerRadius: corners.bl,
    cornerSmoothing: SMOOTHING,
  })

  el.style.clipPath = `path("${path}")`
  // Remove CSS border-radius so it doesn't conflict with the clip-path shape
  el.style.borderRadius = "0"
}

export function SmoothCornersProvider() {
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      entries.forEach((e) => applySmooth(e.target as HTMLElement))
    })

    function observe(el: HTMLElement) {
      if (el.classList.contains("rounded-full")) return
      ro.observe(el)
      applySmooth(el)
    }

    // Initial pass
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach(observe)

    // Watch for new elements
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          const el = node as HTMLElement
          if (el.matches?.(SELECTOR)) observe(el)
          el.querySelectorAll<HTMLElement>(SELECTOR).forEach(observe)
        })
      })
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
