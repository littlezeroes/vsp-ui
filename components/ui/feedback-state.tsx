import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/*
 * Feedback State
 * Figma: https://www.figma.com/design/m8U2GMl2eptDD5gv9iwXDs/VSP_Core-Components?node-id=3844-2480
 *
 * Figma props → React props:
 *   button = true | false
 *
 * Layout (100% Figma match):
 *   Outer padding  → py-[40px]
 *   Outer gap      → 24px (gap-6) — inner container → button
 *   Inner gap      → 16px (gap-4) — icon → text group
 *   Text group gap → 4px (gap-1)
 *   Text padding   → px-[24px]
 *   Icon size      → 64px
 *   Button         → VSP_Button/Brand / primary / size=48
 *
 * Tokens:
 *   Title text   → foreground/primary → var(--foreground) → #080808
 *   Desc text    → foreground/primary → var(--foreground) → #080808
 *
 * Typography:
 *   Title → lg (20px) / medium (500) / line-height 24px / tracking -0.1px
 *   Desc  → sm (14px) / regular (400) / line-height 20px
 */

export interface FeedbackStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 64×64px icon slot */
  icon?: React.ReactNode
  /** Main title — text-lg / font-medium */
  title: string
  /** Supporting description — text-sm / font-normal */
  description?: string
  /** CTA button label (renders VSP_Button primary size=48 when provided) */
  actionLabel?: string
  /** Extra props forwarded to the CTA Button */
  actionProps?: Omit<ButtonProps, "children" | "variant" | "size">
}

function FeedbackState({
  icon,
  title,
  description,
  actionLabel,
  actionProps,
  className,
  ...props
}: FeedbackStateProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center text-center gap-6 py-[40px]",
        className
      )}
      {...props}
    >
      {/* Inner container: icon + text group, gap-4 (16px) */}
      <div className="flex flex-col items-center gap-4 shrink-0">
        {/* Icon — 64px slot */}
        {icon && (
          <div className="w-16 h-16 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}

        {/* Text group — gap-1 (4px), px-6 (24px) */}
        <div className="flex flex-col items-center gap-1 px-6 w-full">
          {/* Title: lg (20px) / medium (500) / leading-6 (24px) / tracking-[-0.1px] = -0.005em */}
          <h3 className="text-lg font-medium leading-6 tracking-[-0.005em] text-foreground">
            {title}
          </h3>
          {description && (
            /* Desc: sm (14px) / regular (400) / leading-5 (20px) */
            <p className="text-sm font-normal leading-5 text-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* CTA Button — primary / size=48, separated by outer gap-6 */}
      {actionLabel && (
        <Button variant="primary" size="48" {...actionProps}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

FeedbackState.displayName = "FeedbackState"

export { FeedbackState }
