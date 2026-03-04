import * as React from "react"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/*
 * VSP Button Component
 * Figma: https://www.figma.com/design/m8U2GMl2eptDD5gv9iwXDs/VSP_Core-Components?node-id=5256-8112
 *
 * Figma props → React props:
 *   hierarchy  → variant   (primary | secondary)
 *   type       → intent    (default | danger)
 *   size       → size      (48 | 32)
 *   state      → disabled  (boolean) | isLoading (boolean) | CSS :active
 *
 * Tokens used:
 *   Primary bg    → Foreground.Primary    → var(--foreground)  → #080808 / #ffffff
 *   Primary text  → Foreground.Inverse    → var(--background)  → #ffffff / #080808
 *   Secondary bg  → Component.BG.Btn-sec → var(--btn-secondary-bg)
 *   Secondary text→ Foreground.Primary    → var(--foreground)
 *   Danger bg     → Contextual.Red.500   → var(--danger) / red-50 subtle
 *   Disabled bg   → Disabled.Background  → var(--disabled-bg)  → Grey.200
 *   Disabled text → Disabled.Foreground  → var(--disabled-fg)  → Grey.400
 */

const buttonVariants = cva(
  // Base — shared across all variants
  [
    "inline-flex items-center justify-center gap-1",
    "rounded-full font-semibold whitespace-nowrap",
    "cursor-pointer select-none",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      /*
       * variant = Figma "hierarchy"
       */
      variant: {
        // Primary: dark fill (Foreground.Primary bg + Foreground.Inverse text)
        primary: [
          "bg-foreground text-background",
          "active:bg-grey-950", // whilepressing → Grey.950 (#121212)
          "disabled:bg-disabled-bg disabled:text-disabled-fg",
        ],
        // Secondary: transparent overlay (Component.Background.Secondary-btn)
        secondary: [
          "bg-btn-secondary-bg text-foreground",
          "active:bg-grey-200",             // whilepressing light
          "dark:active:bg-grey-750",         // whilepressing dark
          "disabled:bg-disabled-bg disabled:text-disabled-fg",
        ],
        // Surface: solid grey bg (Background.Surface.Secondary = Grey.150 #f3f3f3)
        // Used in ButtonGroup where secondary button needs a grounded solid fill
        surface: [
          "bg-secondary text-foreground",
          "active:bg-grey-200",             // whilepressing → Grey.200
          "dark:active:bg-grey-750",
          "disabled:bg-disabled-bg disabled:text-disabled-fg",
        ],
      },

      /*
       * intent = Figma "type"
       */
      intent: {
        default: "",
        // Danger overrides color (compound variants below)
        danger: "",
      },

      /*
       * size = Figma "size"
       *   48 → h-12 (48px), px-6 (24px), py-3 (12px), text-md (16px/24px)
       *   32 → h-8  (32px), px-3 (12px), py-1.5 (6px), text-sm (14px/20px)
       */
      size: {
        "48": "h-12 px-6 py-3 text-md leading-md gap-[10px]",
        "32": "h-8 px-3 py-1.5 text-sm leading-sm gap-1",
      },
    },

    compoundVariants: [
      // Primary + Danger: Red.500 bg, white text
      {
        variant: "primary",
        intent: "danger",
        class: [
          "bg-danger text-white",
          "active:bg-red-600",           // whilepressing
          "disabled:bg-disabled-bg disabled:text-disabled-fg",
        ],
      },
      // Secondary + Danger: Red.50 subtle bg, Red.500 text
      {
        variant: "secondary",
        intent: "danger",
        class: [
          "bg-red-50 text-danger",
          "active:bg-red-100",           // whilepressing
          "dark:bg-red-950 dark:text-red-400 dark:active:bg-red-900",
          "disabled:bg-disabled-bg disabled:text-disabled-fg",
        ],
      },
    ],

    defaultVariants: {
      variant: "primary",
      intent: "default",
      size: "48",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      intent,
      size,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, intent, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          // Loading state: spinner only (Figma _statusIcon)
          <Loader2 className="animate-spin" size={size === "32" ? 20 : 24} />
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = "VSP_Button"

export { Button, buttonVariants }
