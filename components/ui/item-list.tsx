import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * VSP_itemList
 * Figma: https://www.figma.com/design/m8U2GMl2eptDD5gv9iwXDs/VSP_Core-Components?node-id=5120-11342
 *
 * Figma props → React props:
 *   prefix   = true | false
 *   metadata = true | false
 *   suffix   = true | false
 *
 * Tokens (100% Figma match):
 *   Row py         → 12px (py-3)
 *   Row gap        → 12px (gap-3)
 *   Prefix size    → 44×44px, border-radius 22px (circle)
 *   Prefix bg      → bg/surface/secondary → var(--secondary) → #f3f3f3
 *   Suffix icon    → 24px (chevron)
 *
 *   Label font     → md (16px) / semibold (600) / leading-6 (24px)
 *   Label color    → foreground/primary   → var(--foreground) → #080808
 *
 *   Sublabel font  → md (16px) / regular (400) / leading-6 (24px)
 *   Sublabel color → foreground/secondary → var(--foreground-secondary) → #262626
 *
 *   Metadata font  → md (16px) / semibold (600) / leading-6 (24px)
 *   Metadata color → foreground/primary   → var(--foreground) → #080808
 *
 *   Sub-metadata font  → md (16px) / regular (400) / leading-6 (24px)
 *   Sub-metadata color → foreground/secondary → var(--foreground-secondary)→ #262626
 *
 *   Text gap       → 4px (gap-1) between label and sublabel
 *   Trail width    → 74px (metadata + suffix)
 */

export interface ItemListItemProps {
  label: string
  sublabel?: string
  /** Right-aligned main metadata (semibold) */
  metadata?: string
  /** Right-aligned sub-metadata (regular) */
  subMetadata?: string
  /** 44×44px prefix slot (avatar, icon) */
  prefix?: React.ReactNode
  /** Show trailing chevron (24px) */
  showChevron?: boolean
  /** Custom trailing slot (overrides showChevron) */
  suffix?: React.ReactNode
  /** Bottom border divider */
  divider?: boolean
  /** Makes row interactive (button) */
  onPress?: () => void
  className?: string
}

function ItemListItem({
  label,
  sublabel,
  metadata,
  subMetadata,
  prefix,
  showChevron = false,
  suffix,
  divider = false,
  onPress,
  className,
}: ItemListItemProps) {
  const Tag = onPress ? "button" : "div"

  return (
    <Tag
      type={onPress ? "button" : undefined}
      onClick={onPress}
      className={cn(
        "w-full flex items-center gap-3 py-3 text-left",
        divider && "border-b border-border",
        onPress && [
          "cursor-pointer transition-colors duration-100",
          "active:bg-secondary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
        ],
        className
      )}
    >
      {/* Prefix — 44×44px circle */}
      {prefix && (
        <div className="w-11 h-11 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-secondary">
          {prefix}
        </div>
      )}

      {/* Label group — gap-1 (4px) */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Label: md (16px) / semibold (600) / leading-6 */}
        <p className="text-md font-semibold leading-6 text-foreground truncate">{label}</p>
        {sublabel && (
          /* Sublabel: md (16px) / regular (400) / leading-6 / foreground-secondary */
          <p className="text-md font-normal leading-6 text-foreground-secondary truncate">
            {sublabel}
          </p>
        )}
      </div>

      {/* Metadata group — right-aligned, gap-1 */}
      {(metadata || subMetadata) && (
        <div className="shrink-0 flex flex-col gap-1 items-end">
          {metadata && (
            /* Metadata: md (16px) / semibold (600) / leading-6 */
            <span className="text-md font-semibold leading-6 text-foreground">
              {metadata}
            </span>
          )}
          {subMetadata && (
            /* Sub-metadata: md (16px) / regular (400) / leading-6 / foreground-secondary */
            <span className="text-md font-normal leading-6 text-foreground-secondary">
              {subMetadata}
            </span>
          )}
        </div>
      )}

      {/* Suffix / chevron — 24px */}
      {suffix ? (
        <span className="shrink-0">{suffix}</span>
      ) : showChevron ? (
        <ChevronRight size={24} className="text-foreground-secondary shrink-0" />
      ) : null}
    </Tag>
  )
}

/* ── Container ───────────────────────────────────────────────────────── */
export interface ItemListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function ItemList({ className, children, ...props }: ItemListProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
}

ItemList.displayName = "VSP_itemList"

export { ItemList, ItemListItem }
