"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  TrendingUp, Lock,
  Loader2, ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  HOLDINGS,
  getProject, formatVND,
} from "../../data"

/* ── Portfolio Summary Card ────────────────────────────────────────── */
function PortfolioCard() {
  const totalValue = HOLDINGS.reduce((s, h) => s + h.currentValue, 0)
  const totalInvested = HOLDINGS.reduce((s, h) => s + h.shares * h.avgPrice, 0)
  const totalProfit = totalValue - totalInvested
  const totalProfitPct = totalInvested > 0
    ? ((totalProfit / totalInvested) * 100).toFixed(1)
    : "0"
  const isUp = totalProfit >= 0

  return (
    <div className="px-[22px] pt-[8px]">
      <div className="bg-foreground rounded-[20px] px-[20px] py-[18px]">
        <p className="text-xs text-background/50">Tổng giá trị danh mục</p>
        <p className="text-[28px] font-bold text-background leading-none tracking-tight tabular-nums mt-[4px]">
          {formatVND(totalValue)}
        </p>

        <div className="flex items-center gap-[20px] mt-[16px]">
          <div>
            <p className="text-[10px] text-background/40 uppercase tracking-wide">Lợi nhuận</p>
            <p className={cn(
              "text-sm font-bold tabular-nums",
              isUp ? "text-success" : "text-danger"
            )}>
              {isUp ? "+" : ""}{formatVND(totalProfit)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-background/40 uppercase tracking-wide">%</p>
            <p className={cn(
              "text-sm font-bold tabular-nums",
              isUp ? "text-success" : "text-danger"
            )}>
              {isUp ? "+" : ""}{totalProfitPct}%
            </p>
          </div>
          <div className="ml-auto">
            <p className="text-[10px] text-background/40 uppercase tracking-wide">Dự án</p>
            <p className="text-sm font-bold text-background">{HOLDINGS.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Passbook Colors ──────────────────────────────────────────────── */
const PASSBOOK_COLORS = [
  { spine: "bg-success",     dot: "bg-success/20",     text: "text-success" },
  { spine: "bg-[#6366f1]",   dot: "bg-[#6366f1]/20",   text: "text-[#6366f1]" },
  { spine: "bg-[#f59e0b]",   dot: "bg-[#f59e0b]/20",   text: "text-[#f59e0b]" },
  { spine: "bg-danger",      dot: "bg-danger/20",       text: "text-danger" },
]

/* ── Passbook Card (Cuốn Sổ) ─────────────────────────────────────── */
function HoldingRow({
  holding,
  colorIndex,
}: {
  holding: typeof HOLDINGS[0]
  colorIndex: number
}) {
  const router = useRouter()
  const project = getProject(holding.projectId)
  if (!project) return null

  const isUp = holding.profitPct > 0
  const isPending = holding.status === "pending"
  const isLocked = holding.status === "locked"
  const color = PASSBOOK_COLORS[colorIndex % PASSBOOK_COLORS.length]

  return (
    <button
      type="button"
      onClick={() => router.push(`/rwa/holding/${holding.id}`)}
      className={cn(
        "w-full rounded-[20px] overflow-hidden text-left",
        holding.status === "active" ? "bg-[#fff0f3] dark:bg-[#2a1419]" : "bg-background border border-border"
      )}
    >
      {/* Spine accent */}
      <div className={cn("h-[4px] w-full", color.spine)} />

      <div className="px-[18px] py-[16px]">
        {/* Top row: avatar + name */}
        <div className="flex items-center gap-[12px]">
          <div className={cn(
            "w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 text-[15px] font-bold",
            isPending ? "bg-warning/10 text-warning" : cn(color.dot, color.text)
          )}>
            {isPending
              ? <Loader2 size={20} className="animate-spin" />
              : project.name.charAt(0)
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-foreground leading-tight truncate">
              {project.name}
            </p>
            <p className="text-xs text-foreground-secondary mt-[2px]">
              {holding.shares} token · {formatVND(holding.avgPrice)}/token
            </p>
          </div>
          <ChevronRight size={16} className="text-foreground-secondary/40 shrink-0" />
        </div>

        {/* Value row */}
        <div className="flex items-end justify-between mt-[16px]">
          <div>
            <p className="text-[10px] text-foreground-secondary uppercase tracking-wide">
              Giá trị hiện tại
            </p>
            <p className="text-[22px] font-bold text-foreground tabular-nums leading-tight mt-[2px]">
              {formatVND(holding.currentValue)}
            </p>
          </div>

          {/* Status badge */}
          <div className="shrink-0 mb-[2px]">
            {isPending ? (
              <span className="text-xs font-medium text-warning bg-warning/10 px-[10px] py-[4px] rounded-full">
                Chờ phân bổ
              </span>
            ) : isLocked ? (
              <span className="text-xs text-foreground-secondary flex items-center gap-[3px]">
                <Lock size={10} />
                Còn {holding.lockDaysLeft} ngày
              </span>
            ) : isUp ? (
              <span className="text-xs font-semibold text-success flex items-center gap-[2px]">
                <TrendingUp size={12} />
                +{holding.profitPct}%
              </span>
            ) : (
              <span className="text-xs font-semibold text-foreground-secondary">
                0%
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function PortfolioPage() {
  return (
    <div>
      {/* Portfolio Summary */}
      <PortfolioCard />

      {/* Holdings — Passbook style */}
      <div className="px-[22px] pt-[20px]">
        {HOLDINGS.length > 0 ? (
          <div className="space-y-[14px]">
            {HOLDINGS.map((h, i) => (
              <HoldingRow key={h.id} holding={h} colorIndex={i} />
            ))}
          </div>
        ) : (
          <div className="py-[40px] text-center">
            <p className="text-sm text-foreground-secondary">Bạn chưa có tài sản nào</p>
            <p className="text-xs text-foreground-secondary mt-[4px]">
              Bắt đầu đầu tư tại tab Dự án
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
