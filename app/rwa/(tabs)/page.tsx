"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  MapPin, Users, Clock, Lock, Bell,
  ShieldCheck, Wallet, CheckCircle, ChevronRight,
  Loader2, XCircle, RefreshCw, BookOpen, Tag, Info,
  Building2, ArrowDownLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PROJECTS, HOLDINGS, USER, formatVND } from "../data"
import { useAppState, type CardState, type ProjectCardState } from "./layout"

const FEATURED = PROJECTS.find((p) => p.status === "open") ?? PROJECTS[0]

/* ── Balance Card (compact — link to portfolio) ──────────────────── */
function BalanceCard({ invested }: { invested: boolean }) {
  const router = useRouter()

  return (
    <div className="w-full rounded-[20px] bg-secondary px-[18px] py-[14px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-foreground-secondary uppercase tracking-wide">Số dư ví</p>
          <p className="text-lg font-bold text-foreground tabular-nums mt-[2px]">
            {formatVND(USER.totalBalance)}
          </p>
        </div>
        <Button
          variant="secondary"
          size="32"
          onClick={() => router.push("/rwa/tai-san")}
        >
          Xem tài sản
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   WALLET CARD — 6 states, 1 component
   ══════════════════════════════════════════════════════════════════════ */
function WalletCard({ state }: { state: CardState }) {
  const router = useRouter()
  const [hideBalance, setHideBalance] = React.useState(false)

  const totalValue = HOLDINGS.reduce((s, h) => s + h.currentValue, 0) + USER.totalBalance
  const totalTokens = HOLDINGS.reduce((s, h) => s + h.shares, 0)

  /* ── invested + exploring + purchase flow: balance card ── */
  if (state === "invested" || state === "exploring" || state === "received"
    || state === "registered" || state === "escrow" || state === "pending-alloc") {
    return <BalanceCard invested={state !== "exploring"} />
  }

  /* ── onboarding states: card with progress bar ── */
  const step1 = state === "new" ? "empty"
    : state === "verifying" ? "active"
    : state === "kyc-failed" ? "error"
    : "done"

  const step2 = (state === "new" || state === "verifying" || state === "kyc-failed") ? "locked"
    : state === "kyc-done" ? "empty"
    : "done"

  const stepsDone = (step1 === "done" ? 1 : 0) + (step2 === "done" ? 1 : 0)

  return (
    <div className="bg-secondary rounded-[28px] px-[22px] py-[20px]">
      {/* Title */}
      <p className="text-sm font-bold text-foreground">Mở khóa ví đầu tư</p>
      <p className="text-xs text-foreground-secondary mb-[16px]">{stepsDone} / 2 hoàn tất</p>

      {/* Vertical progress */}
      <div className="flex gap-[14px] mb-[16px]">
        {/* Bars */}
        <div className="flex flex-col items-center gap-[6px] py-[4px]">
          <div className={cn("w-[4px] flex-1 rounded-full",
            step1 === "done" ? "bg-success"
              : step1 === "active" ? "bg-warning"
              : step1 === "error" ? "bg-danger"
              : "bg-foreground/10"
          )} />
          <div className={cn("w-[4px] flex-1 rounded-full",
            step2 === "done" ? "bg-success"
              : step2 === "locked" ? "bg-foreground/5"
              : "bg-foreground/10"
          )} />
        </div>
        {/* Steps */}
        <div className="flex-1 flex flex-col gap-[14px]">
          <div>
            <p className={cn("text-sm font-semibold leading-tight",
              step1 === "done" ? "text-success"
                : step1 === "active" ? "text-warning"
                : step1 === "error" ? "text-danger"
                : "text-foreground"
            )}>
              {step1 === "done" ? "✓ Xác minh danh tính"
                : step1 === "active" ? "Đang xử lý..."
                : step1 === "error" ? "Xác thực thất bại"
                : "Xác minh danh tính (eKYC)"
              }
            </p>
            <p className={cn("text-xs mt-[3px]",
              step1 === "error" ? "text-danger/70" : "text-foreground-secondary"
            )}>
              {step1 === "done" ? "CCCD + selfie đã xác minh"
                : step1 === "active" ? "Thường hoàn tất trong 5–10 phút"
                : step1 === "error" ? "Ảnh không rõ hoặc thông tin không khớp"
                : "CCCD + selfie · khoảng 5 phút"
              }
            </p>
          </div>
          <div className={cn(step2 === "locked" && "opacity-35")}>
            <p className={cn("text-sm font-semibold leading-tight",
              step2 === "done" ? "text-success" : "text-foreground"
            )}>
              {step2 === "done" ? "✓ Kết nối ví đầu tư" : "Kết nối ví đầu tư"}
            </p>
            <p className="text-xs text-foreground-secondary mt-[3px]">
              {step2 === "done" ? "Ví VSP đã kết nối"
                : step2 === "locked" ? "Hoàn tất eKYC trước"
                : "Ví VSP bảo mật bởi Fireblocks"
              }
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      {state === "new" && (
        <Button variant="primary" size="48" className="w-full"
          onClick={() => router.push("/rwa/onbo/kyc-gate")}>
          <ShieldCheck size={16} />
          Xác minh danh tính
        </Button>
      )}
      {state === "kyc-failed" && (
        <Button variant="secondary" size="48" className="w-full"
          onClick={() => router.push("/rwa/onbo/kyc-gate")}>
          <RefreshCw size={16} />
          Thử lại
        </Button>
      )}
      {state === "kyc-done" && (
        <Button variant="primary" size="48" className="w-full"
          onClick={() => router.push("/rwa/onbo/wallet-setup")}>
          <Wallet size={16} />
          Kết nối ví đầu tư
        </Button>
      )}
      {/* verifying: reassurance box */}
      {state === "verifying" && (
        <div className="bg-warning/5 rounded-[16px] px-[14px] py-[12px]">
          <div className="flex items-center gap-[8px] mb-[6px]">
            <Loader2 size={14} className="text-warning animate-spin" />
            <span className="text-xs font-semibold text-warning">Bước 1/3 · Đang xác minh CCCD</span>
          </div>
          <p className="text-[11px] text-foreground-secondary leading-snug">
            Thường hoàn tất trong 5–10 phút. Bạn sẽ nhận thông báo khi xong.
          </p>
        </div>
      )}

    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   PROJECT CARD — 5 states
   ══════════════════════════════════════════════════════════════════════ */

const BADGE_CONFIG: Record<ProjectCardState, { label: string; bg: string; text: string }> = {
  "coming-soon": { label: "Sắp mở bán", bg: "bg-foreground/80", text: "text-background" },
  "open": { label: "Đang mở bán", bg: "bg-success/90", text: "text-white" },
  "whitelisted": { label: "Đã đăng ký", bg: "bg-info/90", text: "text-white" },
  "committed": { label: "Đã đặt mua", bg: "bg-foreground/80", text: "text-background" },
  "closed": { label: "Đã đóng", bg: "bg-foreground/50", text: "text-background" },
}

function getProjectCTA(
  projectState: ProjectCardState,
  cardState: CardState,
): { label: string; variant: "primary" | "secondary"; icon: React.ReactNode } | null {
  // Closed → no CTA
  if (projectState === "closed") return null

  // User chưa verify → chỉ cho tìm hiểu (browse trước, đăng ký sau)
  if (cardState === "new" || cardState === "verifying" || cardState === "kyc-failed") {
    return { label: "Tìm hiểu dự án", variant: "secondary", icon: <ChevronRight size={14} /> }
  }

  // KYC done nhưng chưa có ví → nhắc kết nối ví
  if (cardState === "kyc-done") {
    return { label: "Kết nối ví để đầu tư", variant: "secondary", icon: <Wallet size={14} /> }
  }

  // Purchase flow states → xem chi tiết
  if (cardState === "registered" || cardState === "escrow" || cardState === "pending-alloc" || cardState === "received") {
    return { label: "Xem chi tiết đặt mua", variant: "secondary", icon: <ChevronRight size={14} /> }
  }

  // Exploring / Invested → full CTA theo projectState
  if (projectState === "coming-soon") return { label: "Đăng ký nhận thông báo", variant: "secondary", icon: <Bell size={14} /> }
  if (projectState === "whitelisted") return { label: "Đặt mua ngay", variant: "primary", icon: <Tag size={14} /> }
  if (projectState === "committed") return { label: "Xem chi tiết đặt mua", variant: "secondary", icon: <ChevronRight size={14} /> }
  // open — exploring/invested user ready to invest
  return { label: "Tìm hiểu và đầu tư", variant: "primary", icon: <ChevronRight size={14} /> }
}

function ProjectCard({ project, state, cardState }: { project: typeof PROJECTS[0]; state: ProjectCardState; cardState: CardState }) {
  const router = useRouter()
  const [showTip, setShowTip] = React.useState(false)
  const pct = project.totalSupply > 0
    ? Math.round((project.soldCount / project.totalSupply) * 100) : 0

  const badge = BADGE_CONFIG[state]
  const cta = getProjectCTA(state, cardState)
  const showProgress = state !== "coming-soon"

  return (
    <div className="bg-background rounded-[28px] overflow-hidden border border-border">
      <button
        type="button"
        onClick={() => router.push(`/rwa/project/${project.id}`)}
        className="w-full text-left"
      >
        <div className="h-[140px] bg-secondary relative">
          <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
            <MapPin size={28} className="text-foreground-secondary/30" />
          </div>
          <div className={cn("absolute top-[12px] right-[12px] px-[10px] py-[4px] rounded-full", badge.bg)}>
            <span className={cn("text-xs font-semibold", badge.text)}>{badge.label}</span>
          </div>
        </div>
        <div className="px-[20px] py-[16px]">
          <p className="text-md font-semibold text-foreground leading-tight">{project.name}</p>
          <div className="flex items-center gap-[4px] mt-[4px]">
            <MapPin size={12} className="text-foreground-secondary shrink-0" />
            <p className="text-xs text-foreground-secondary">{project.location}</p>
          </div>
          <div className="flex items-center justify-between mt-[14px]">
            <div className="relative">
              <div className="flex items-center gap-[3px]"
                onClick={(e) => { e.stopPropagation(); setShowTip(!showTip) }}>
                <p className="text-[10px] text-foreground-secondary uppercase tracking-wide">Giá / token</p>
                <Info size={10} className="text-foreground-secondary/50" />
              </div>
              <p className="text-sm font-semibold text-foreground">{formatVND(project.tokenPrice)}</p>
              {/* Tooltip */}
              {showTip && (
                <div className="absolute top-full left-0 mt-[6px] w-[220px] bg-foreground text-background rounded-[12px] px-[12px] py-[10px] z-10 shadow-lg"
                  onClick={(e) => e.stopPropagation()}>
                  <p className="text-[11px] font-semibold leading-tight">1 token = 1 đơn vị sở hữu BĐS này</p>
                  <p className="text-[10px] opacity-70 leading-snug mt-[3px]">
                    Bạn sở hữu thật, ghi nhận trên hợp đồng số không thể sửa xóa. Bắt đầu từ 5 triệu.
                  </p>
                  <div className="absolute top-[-4px] left-[20px] w-[8px] h-[8px] bg-foreground rotate-45" />
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-foreground-secondary uppercase tracking-wide">Lợi suất</p>
              <p className="text-sm font-bold text-success">{project.expectedYield}%/năm</p>
            </div>
          </div>
          {showProgress && (
            <div className="mt-[12px]">
              <div className="flex items-center justify-between mb-[4px]">
                <span className="text-[11px] text-foreground-secondary">
                  {project.soldCount.toLocaleString()}/{project.totalSupply.toLocaleString()}
                </span>
                <span className="text-[11px] font-semibold text-foreground">{pct}%</span>
              </div>
              <div className="h-[3px] bg-secondary rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", state === "closed" ? "bg-foreground-secondary" : "bg-success")} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}
          <div className="flex items-center gap-[12px] mt-[10px]">
            {project.investors > 0 && (
              <div className="flex items-center gap-[3px]">
                <Users size={11} className="text-foreground-secondary" />
                <span className="text-[11px] text-foreground-secondary">{project.investors.toLocaleString()}</span>
              </div>
            )}
            {project.daysLeft > 0 && state !== "closed" && (
              <div className="flex items-center gap-[3px]">
                <Clock size={11} className="text-foreground-secondary" />
                <span className="text-[11px] text-foreground-secondary">Còn {project.daysLeft} ngày</span>
              </div>
            )}
            {/* Committed: show user's commitment */}
            {state === "committed" && (
              <div className="flex items-center gap-[3px]">
                <CheckCircle size={11} className="text-success" />
                <span className="text-[11px] font-medium text-success">10 token · 50tr</span>
              </div>
            )}
          </div>
        </div>
      </button>

      {/* CTA */}
      {cta && (
        <div className="px-[20px] pb-[16px]">
          <Button variant={cta.variant} size="48" className="w-full"
            onClick={() => router.push(`/rwa/project/${project.id}`)}>
            {cta.icon}
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   PURCHASE FLOW CARD — replaces education banner
   ══════════════════════════════════════════════════════════════════════ */
const PURCHASE_STEPS = [
  { key: "registered",    label: "Đăng ký mua",           desc: "10 token · 50.000.000 đ" },
  { key: "escrow",        label: "Tiền giữ trong Escrow", desc: "Ngân hàng bảo vệ" },
  { key: "pending-alloc", label: "Chờ phân bổ",           desc: "Đang xử lý kết quả" },
  { key: "received",      label: "Nhận token vào ví",     desc: "Token chuyển vào ví VSP" },
]

function PurchaseFlowCard({ state }: { state: CardState }) {
  const router = useRouter()
  const currentStep = PURCHASE_STEPS.findIndex((s) => s.key === state) + 1

  return (
    <div className="px-[22px] pt-[16px]">
      <div className="bg-[#fff0f3] dark:bg-[#2a1419] rounded-[20px] px-[18px] py-[16px]">
        <div className="flex items-center gap-[8px] mb-[2px]">
          <Building2 size={14} className="text-foreground-secondary" />
          <p className="text-[10px] text-foreground-secondary uppercase tracking-wide">BĐS đang mua</p>
        </div>
        <p className="text-sm font-bold text-foreground mb-[14px]">Vinhomes Grand Park Tower S12</p>

        {/* 4-step timeline */}
        <div>
          {PURCHASE_STEPS.map((s, i) => {
            const stepNum = i + 1
            const done = stepNum < currentStep
            const isCurrent = stepNum === currentStep
            const isLast = i === PURCHASE_STEPS.length - 1
            return (
              <div key={s.key} className="flex items-stretch gap-[12px]">
                <div className="flex flex-col items-center w-[16px]">
                  <div className={cn(
                    "w-[10px] h-[10px] rounded-full border-[2px] shrink-0 mt-[2px]",
                    done ? "bg-success border-success"
                      : isCurrent ? "border-warning bg-warning/30"
                      : "bg-transparent border-foreground/15"
                  )} />
                  {!isLast && (
                    <div className={cn(
                      "w-[2px] flex-1 min-h-[12px]",
                      done ? "bg-success" : "bg-foreground/10"
                    )} />
                  )}
                </div>
                <div className="pb-[10px] flex-1 min-w-0">
                  <p className={cn(
                    "text-xs",
                    done ? "font-semibold text-success"
                      : isCurrent ? "font-semibold text-foreground"
                      : "font-medium text-foreground/30"
                  )}>
                    {done ? `✓ ${s.label}` : s.label}
                  </p>
                  {(done || isCurrent) && (
                    <p className="text-[10px] text-foreground-secondary mt-[1px]">{s.desc}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => router.push("/rwa/tai-san")}
          className="w-full flex items-center justify-center gap-[6px] mt-[6px] pt-[10px] border-t border-foreground/5"
        >
          <span className="text-xs font-semibold text-foreground-secondary">Xem chi tiết</span>
          <ChevronRight size={14} className="text-foreground-secondary" />
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const router = useRouter()
  const { cardState, projectState } = useAppState()

  return (
    <div>
      {/* ── Wallet Card ───────────────────────────────────── */}
      <div className="px-[22px] pt-[8px]">
        <WalletCard state={cardState} />
      </div>

      {/* ── Education / Purchase flow banner ────────────────── */}
      {(cardState === "registered" || cardState === "escrow" || cardState === "pending-alloc") ? (
        <PurchaseFlowCard state={cardState} />
      ) : (
        <div className="px-[22px] pt-[16px]">
          <button type="button" onClick={() => router.push("/rwa/blog")}
            className="w-full flex items-center gap-[14px] bg-secondary rounded-[20px] px-[18px] py-[16px] text-left">
            <div className="w-[40px] h-[40px] rounded-[12px] bg-foreground/5 flex items-center justify-center shrink-0">
              <BookOpen size={18} className="text-foreground-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Bất động sản mã hóa là gì?</p>
              <p className="text-xs text-foreground-secondary mt-[2px]">Tìm hiểu cách đầu tư từ 5 triệu đồng</p>
            </div>
            <ChevronRight size={16} className="text-foreground-secondary shrink-0" />
          </button>
        </div>
      )}

      {/* ── Featured Project — always visible ─────────────── */}
      <div className="px-[22px] pt-[32px] pb-[12px]">
        <p className="text-lg font-bold text-foreground">
          {(cardState === "invested" || cardState === "received") ? "Dự án đang mở"
            : (cardState === "registered" || cardState === "escrow" || cardState === "pending-alloc") ? "Dự án đang mua"
            : "Dự án nổi bật"}
        </p>
      </div>
      <div className="px-[22px]">
        <ProjectCard project={FEATURED} state={projectState} cardState={cardState} />
      </div>

      {/* Calculator teaser + Risk disclosure moved to project detail page */}

      {/* ── Trust signals ────────────────────────────────── */}
      <div className="pt-[32px] px-[22px]">
        {/* Investor social proof */}
        <div className="flex items-center gap-[10px] mb-[20px]">
          <div className="flex -space-x-[8px]">
            {["T", "M", "H", "N", "L"].map((letter, i) => (
              <div key={i} className={cn(
                "w-[28px] h-[28px] rounded-full border-2 border-background flex items-center justify-center text-[11px] font-bold text-white",
                i === 0 ? "bg-blue-500" : i === 1 ? "bg-purple-500" : i === 2 ? "bg-teal-500" : i === 3 ? "bg-orange-500" : "bg-pink-500"
              )}>
                {letter}
              </div>
            ))}
          </div>
          <p className="text-xs text-foreground-secondary">
            <span className="font-semibold text-foreground">2,569+</span> nhà đầu tư đang quan tâm
          </p>
        </div>

        {/* Partners scroll */}
        <p className="text-[10px] text-foreground-secondary uppercase tracking-widest mb-[10px]">Được bảo mật & giám sát bởi</p>
        <div className="flex items-center gap-[24px] overflow-x-auto no-scrollbar pb-[2px]">
          {["Fireblocks", "VNPT eKYC", "Vietcombank", "BIDV", "Techcombank", "MB Bank", "SHB"].map((name) => (
            <span key={name} className="text-[13px] font-bold text-foreground/15 tracking-wide whitespace-nowrap shrink-0">{name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
