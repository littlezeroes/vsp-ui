"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/*
 * bottomSheet
 * Figma: https://www.figma.com/design/m8U2GMl2eptDD5gv9iwXDs/VSP_Core-Components?node-id=5122-13929
 *
 * Structure (top → bottom):
 *   [grabber container py-[8px]]
 *     grabber: 36×6px, rounded-full, bg-grey-200
 *   [content slot — px-[22px]]
 *   [home indicator container h-[21px] flex items-end pb-[4px]]
 *     indicator: 139×5px, rounded-full, bg-foreground
 *
 * Tokens (100% Figma match):
 *   Sheet bg       → bg/surface/primary        → var(--background)  → #ffffff
 *   Top radius     → 28px (rounded-tl/tr)
 *   Max height     → 790px
 *
 *   Grabber color  → bg/surface/tertiary        → bg-grey-200        → #e5e5e5
 *   Grabber size   → 36×6px
 *   Grabber radius → 100px (rounded-full)
 *   Grabber pad    → py-[8px]
 *
 *   Content px     → px-[22px]
 *
 *   Home indicator → foreground/primary         → bg-foreground      → #080808
 *   Home indicator → 139×5px, rounded-full
 *   Indicator area → h-[21px]
 *
 *   Overlay        → bg/contextual/overlay       → var(--overlay)     → rgba(38,38,38,0.6)
 */

export interface BottomSheetProps {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
  className?: string
}

function BottomSheet({ open, onClose, children, className }: BottomSheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-overlay"
      onClick={onClose}
    >
      {/* Sheet panel */}
      <div
        className={cn(
          "w-full max-h-[790px] bg-background",
          "rounded-tl-[28px] rounded-tr-[28px]",
          "flex flex-col items-center overflow-hidden",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grabber — py-[8px], 36×6px, rounded-full, bg-grey-200 (#e5e5e5) */}
        <div className="w-full flex justify-center py-[8px]">
          <div className="w-9 h-[6px] rounded-full bg-grey-200" />
        </div>

        {/* Content slot — px-[22px] */}
        <div className="w-full flex-1 overflow-y-auto px-[22px] pb-4">
          {children}
        </div>

        {/* Home indicator area — h-[21px], 139×5px bar, bg-foreground */}
        <div className="w-full h-[21px] flex items-end justify-center pb-[4px]">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    </div>
  )
}

BottomSheet.displayName = "bottomSheet"

export { BottomSheet }
