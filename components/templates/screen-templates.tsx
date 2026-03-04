import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { Header, type TabItem, type SearchBarProps } from "@/components/ui/header"
import { cn } from "@/lib/utils"

/*
 * VSP Screen Templates
 * Figma: https://www.figma.com/design/m8U2GMl2eptDD5gv9iwXDs/VSP_Core-Components
 *
 * 4 canonical screen layouts derived from Figma templates:
 *
 *   SearchTabsScreen   (5155:10858) — default Header + back + search + tabs, white bg, multi-section
 *   SettingsScreen     (5155:10864) — large-title Header + back, sub-primary (#fafafa) bg, list sections
 *   DetailScreenGrey   (5155:10870) — large-title + description + back, secondary (grey) bg, single content
 *   DetailScreenWhite  (5155:10880) — large-title + description + back, white bg, single content
 *
 * Usage:
 *   <SearchTabsScreen title="History" tabs={[…]} activeTab="all" onTabChange={…} onBack={…}>
 *     <Section title="Recent" action="See all">…</Section>
 *   </SearchTabsScreen>
 */

/* ── Shared ──────────────────────────────────────────────────────────── */

/** Standard back button using ChevronLeft (VSP golden rule) */
function BackButton({ onPress }: { onPress?: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex items-center justify-center pl-[8px] pr-[10px] py-[10px] min-h-[44px] rounded-full text-foreground focus-visible:outline-none"
      aria-label="Go back"
    >
      <ChevronLeft size={18} />
    </button>
  )
}

/** Home indicator — required on every full-screen page */
function HomeIndicator() {
  return (
    <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-transparent pointer-events-none">
      <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────────────── */

export interface SectionProps {
  /** Section heading — left-aligned, text-md semibold */
  title?: string
  /** Right-side text action — rendered in text-success */
  action?: string
  onAction?: () => void
  children: React.ReactNode
  className?: string
}

/**
 * Content section with optional title row and action link.
 * Applies pt-[32px] top spacing and px-[22px] for children.
 */
export function Section({ title, action, onAction, children, className }: SectionProps) {
  return (
    <div className={cn("pt-[32px]", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between px-[22px] pb-[12px]">
          {title && (
            <p className="text-md font-semibold leading-6 text-foreground">{title}</p>
          )}
          {action && (
            <button
              type="button"
              onClick={onAction}
              className="text-md font-semibold text-success focus-visible:outline-none"
            >
              {action}
            </button>
          )}
        </div>
      )}
      <div className="px-[22px]">{children}</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   Template A — SearchTabsScreen (5155:10858)
   Header: default + back + search + tabs
   Background: bg-background (white)
   Use for: list/explore screens with filtering tabs
══════════════════════════════════════════════════════════════════════ */

export interface SearchTabsScreenProps {
  /** NavBar title (default variant — shown in NavBar, not large block) */
  title: string
  onBack?: () => void
  /** Trailing slot (icon buttons) */
  trailing?: React.ReactNode
  /** Search bar props */
  searchProps?: SearchBarProps
  /** Tab items */
  tabs: TabItem[]
  activeTab?: string
  onTabChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function SearchTabsScreen({
  title,
  onBack,
  trailing,
  searchProps,
  tabs,
  activeTab,
  onTabChange,
  children,
  className,
}: SearchTabsScreenProps) {
  return (
    <div className={cn("relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col", className)}>
      <Header
        variant="default"
        title={title}
        leading={<BackButton onPress={onBack} />}
        trailing={trailing}
        showSearch
        searchProps={searchProps}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <div className="flex-1 overflow-y-auto pb-[32px]">
        {children}
      </div>

      <HomeIndicator />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   Template B — SettingsScreen (5155:10864)
   Header: large-title + back
   Background: bg-sub-primary (#fafafa) — slightly off-white
   Use for: settings, profile, preferences — list-heavy pages
══════════════════════════════════════════════════════════════════════ */

export interface SettingsScreenProps {
  /** Large title shown below NavBar */
  largeTitle: string
  onBack?: () => void
  trailing?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SettingsScreen({
  largeTitle,
  onBack,
  trailing,
  children,
  className,
}: SettingsScreenProps) {
  return (
    <div className={cn("relative w-full max-w-[390px] min-h-screen bg-[#fafafa] dark:bg-background text-foreground flex flex-col", className)}>
      <Header
        variant="large-title"
        largeTitle={largeTitle}
        leading={<BackButton onPress={onBack} />}
        trailing={trailing}
      />

      <div className="flex-1 overflow-y-auto pb-[32px]">
        {children}
      </div>

      <HomeIndicator />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   Template C — DetailScreenGrey (5155:10870)
   Header: large-title + description + back
   Background: bg-secondary (grey #f3f3f3)
   Use for: detail/summary pages with card content on grey canvas
══════════════════════════════════════════════════════════════════════ */

export interface DetailScreenGreyProps {
  largeTitle: string
  description?: string
  onBack?: () => void
  trailing?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DetailScreenGrey({
  largeTitle,
  description,
  onBack,
  trailing,
  children,
  className,
}: DetailScreenGreyProps) {
  return (
    <div className={cn("relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col", className)}>
      {/* Header sits on white bg, pops out of the grey canvas */}
      <div className="bg-background">
        <Header
          variant="large-title"
          largeTitle={largeTitle}
          description={description}
          leading={<BackButton onPress={onBack} />}
          trailing={trailing}
        />
      </div>

      <div className="flex-1 overflow-y-auto pt-[16px] pb-[32px] px-[22px]">
        {children}
      </div>

      <HomeIndicator />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   Template D — DetailScreenWhite (5155:10880)
   Header: large-title + description + back
   Background: bg-background (white)
   Use for: detail pages where content blends with the page background
══════════════════════════════════════════════════════════════════════ */

export interface DetailScreenWhiteProps {
  largeTitle: string
  description?: string
  onBack?: () => void
  trailing?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DetailScreenWhite({
  largeTitle,
  description,
  onBack,
  trailing,
  children,
  className,
}: DetailScreenWhiteProps) {
  return (
    <div className={cn("relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col", className)}>
      <Header
        variant="large-title"
        largeTitle={largeTitle}
        description={description}
        leading={<BackButton onPress={onBack} />}
        trailing={trailing}
      />

      <div className="flex-1 overflow-y-auto pt-[16px] pb-[32px] px-[22px]">
        {children}
      </div>

      <HomeIndicator />
    </div>
  )
}
