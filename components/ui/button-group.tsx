import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/*
 * VSP ButtonGroup Component
 * Figma: https://www.figma.com/design/m8U2GMl2eptDD5gv9iwXDs/VSP_Core-Components?node-id=5256-8282
 *
 * Figma props → React props:
 *   layout = "Horizontal" → horizontal: two equal buttons side-by-side, gap 12px
 *   layout = "Vertical"   → vertical: two full-width stacked buttons, gap 12px
 *
 * Slot order (matches Figma):
 *   Horizontal → [secondary/surface] [primary]  (left → right)
 *   Vertical   → [primary]  [secondary/surface]  (top → bottom)
 *
 * Tokens used:
 *   Primary btn    → Foreground.Brand   → var(--foreground)  #080808 / #ffffff
 *   Secondary btn  → BG.Surface.Second  → var(--secondary)   #f3f3f3 / #262626
 *   Gap            → 12px (fixed, from Figma layout)
 *   Width          → w-full (390px frame = full phone screen)
 */

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma "layout" prop */
  layout?: "horizontal" | "vertical"
  /** Size forwarded to both buttons */
  size?: ButtonProps["size"]
  /** Primary (dark fill) button label */
  primaryLabel?: React.ReactNode
  /** Secondary (surface fill) button label */
  secondaryLabel?: React.ReactNode
  /** Extra props forwarded to the primary button */
  primaryProps?: Omit<ButtonProps, "variant" | "size" | "children">
  /** Extra props forwarded to the secondary button */
  secondaryProps?: Omit<ButtonProps, "variant" | "size" | "children">
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      layout = "horizontal",
      size = "48",
      primaryLabel = "Label",
      secondaryLabel = "Label",
      primaryProps,
      secondaryProps,
      className,
      ...props
    },
    ref
  ) => {
    const primaryBtn = (
      <Button
        variant="primary"
        size={size}
        className={cn(layout === "horizontal" && "flex-1", "w-full")}
        {...primaryProps}
      >
        {primaryLabel}
      </Button>
    )

    const secondaryBtn = (
      <Button
        variant="surface"
        size={size}
        className={cn(layout === "horizontal" && "flex-1", "w-full")}
        {...secondaryProps}
      >
        {secondaryLabel}
      </Button>
    )

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex",
          layout === "horizontal"
            ? "flex-row items-center gap-3"   // gap = 12px
            : "flex-col items-stretch gap-3",  // gap = 12px
          className
        )}
        {...props}
      >
        {layout === "horizontal" ? (
          // Figma Horizontal: secondary first (left), primary second (right)
          <>
            {secondaryBtn}
            {primaryBtn}
          </>
        ) : (
          // Figma Vertical: primary first (top), secondary second (bottom)
          <>
            {primaryBtn}
            {secondaryBtn}
          </>
        )}
      </div>
    )
  }
)

ButtonGroup.displayName = "VSP_ButtonGroup"

export { ButtonGroup }
