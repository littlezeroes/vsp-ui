"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ChevronLeft, ChevronRight, MapPin, AlertTriangle,
  ShieldCheck, FileText, Building2,
  CheckCircle, Plus, X, Calculator, Clock,
  Loader2, Trophy, Users, TrendingUp,
  Lock, Coins, BarChart3, Layers,
  ArrowUpDown, CreditCard, Home, Sprout,
  Percent, Calendar, Globe, Wallet
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  getProject, getCampaignsForProject, getUserCommitment,
  formatVND, formatVNDShort, PROJECTS, HOLDINGS, CAMPAIGNS,
  type UserProjectStatus
} from "../../data"

/* ── Countdown Hook ──────────────────────────────────────────────── */
function useCountdown(targetDate: string) {
  const [now, setNow] = React.useState(Date.now())
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, new Date(targetDate).getTime() - now)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    isExpired: diff === 0,
  }
}

/* ══════════════════════════════════════════════════════════════════════
   TOKEN HERO — coin identity + live price
   ══════════════════════════════════════════════════════════════════════ */
function TokenHero({ project, status }: { project: typeof PROJECTS[0]; status: string }) {
  const symbol = project.tokenName.split("-")[0] ?? project.tokenName.slice(0, 3)

  return (
    <div className="relative bg-foreground overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute -top-[60px] -right-[40px] w-[180px] h-[180px] rounded-full border border-background/5" />
      <div className="absolute -bottom-[40px] -left-[30px] w-[100px] h-[100px] rounded-full border border-background/5" />

      {/* Status bar */}
      <div className="relative h-[44px] flex items-center px-6" aria-hidden="true">
        <span className="text-[17px] font-semibold leading-none text-background flex-1">9:41</span>
        <div className="flex items-center gap-[6px]">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" className="text-background">
            <rect x="0" y="8" width="3" height="4" rx="0.5" /><rect x="4" y="5" width="3" height="7" rx="0.5" />
            <rect x="8" y="2" width="3" height="10" rx="0.5" /><rect x="12" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-background">
            <path d="M8 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" fill="currentColor" />
            <path d="M4.5 7.5a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M2 5a8 8 0 0 1 12 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div className="flex items-center gap-[1px]">
            <div className="w-[22px] h-[11px] rounded-[3px] border border-current flex items-center p-[1px]">
              <div className="flex-1 h-full bg-current rounded-[1.5px]" />
            </div>
            <div className="w-[1px] h-[4px] bg-current opacity-40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Token identity */}
      <div className="relative px-[22px] pt-[28px] pb-[28px]">
        <div className="flex items-center gap-[14px]">
          {/* Token coin */}
          <div className="relative shrink-0">
            <div className="w-[56px] h-[56px] rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center border-2 border-background/20">
              <span className="text-xl font-black text-background tracking-tight">{symbol}</span>
            </div>
            <div className="absolute inset-0 rounded-full bg-background/5 blur-[8px] -z-10 scale-150" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-background leading-tight">{project.tokenName}</p>
            <div className="flex items-center gap-[4px] mt-[2px]">
              <MapPin size={11} className="text-background/40" />
              <span className="text-xs text-background/40">{project.location}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-[20px]">
          <p className="text-[10px] text-background/40 uppercase tracking-wider mb-[2px]">Giá hiện tại</p>
          <div className="flex items-end gap-[8px]">
            <span className="text-3xl font-black text-background tabular-nums leading-none">
              {formatVNDShort(project.tokenPrice)}
            </span>
            <span className="text-sm font-bold text-success pb-[2px]">+{project.expectedYield}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   4 PILLARS — what this token does
   ══════════════════════════════════════════════════════════════════════ */
function TokenPillars() {
  const pillars = [
    {
      icon: ArrowUpDown,
      title: "Giao dịch 24/7",
      desc: "Mua bán trên sàn mọi lúc",
      color: "text-foreground",
      bg: "bg-foreground/5",
    },
    {
      icon: CreditCard,
      title: "Thanh toán",
      desc: "Dùng token thanh toán",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: Home,
      title: "Đổi BĐS thật",
      desc: "Quy đổi thành căn hộ",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: Sprout,
      title: "Tích lũy sinh lời",
      desc: "Lợi nhuận hàng quý",
      color: "text-success",
      bg: "bg-success/10",
    },
  ]

  return (
    <div className="px-[22px] pt-[20px]">
      {/* Token explainer */}
      <div className="bg-secondary rounded-[20px] px-[16px] py-[14px] mb-[12px]">
        <p className="text-sm font-bold text-foreground mb-[4px]">Token là gì?</p>
        <p className="text-xs text-foreground-secondary leading-relaxed">
          Mỗi token đại diện cho một phần giá trị bất động sản thật. Bạn không cần mua cả căn hộ — chỉ cần 1 token là đã sở hữu một phần, được hưởng lợi nhuận cho thuê, và có thể mua bán bất cứ lúc nào. Tích lũy đủ token, bạn có thể đổi thành quyền sở hữu BĐS thật.
        </p>
      </div>

      {/* 4 pillars */}
      <div className="grid grid-cols-2 gap-[8px]">
        {pillars.map((p) => {
          const Icon = p.icon
          return (
            <div key={p.title} className={cn("rounded-[16px] px-[14px] py-[14px]", p.bg)}>
              <Icon size={20} className={p.color} />
              <p className="text-sm font-bold text-foreground mt-[8px]">{p.title}</p>
              <p className="text-[11px] text-foreground-secondary mt-[2px]">{p.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   TOKEN KEY METRICS
   ══════════════════════════════════════════════════════════════════════ */
function TokenMetrics({ project }: { project: typeof PROJECTS[0] }) {
  const rows = [
    { icon: Layers,     label: "Tổng cung",       value: `${project.totalSupply.toLocaleString("vi-VN")} token` },
    { icon: Coins,      label: "Giá / token",     value: formatVND(project.tokenPrice) },
    { icon: Percent,    label: "Lợi suất kỳ vọng", value: `${project.expectedYield}%/năm`, highlight: true },
    { icon: Calendar,   label: "Phân phối",       value: "Hàng quý" },
    { icon: Lock,       label: "Khóa vốn",        value: "Tối thiểu 12 tháng" },
    { icon: Users,      label: "Nhà đầu tư",      value: `${project.investors.toLocaleString("vi-VN")} người` },
    { icon: Globe,      label: "Mạng lưới",       value: "Polygon · ERC-3643" },
    { icon: Building2,  label: "Chủ đầu tư",      value: project.developer },
  ]

  return (
    <div className="px-[22px] pt-[32px]">
      <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wide mb-[8px]">Thông tin token</p>
      <div className="bg-secondary rounded-[20px] overflow-hidden">
        {rows.map((row, i) => {
          const Icon = row.icon
          return (
            <div key={row.label} className={cn(
              "flex items-center gap-[10px] px-[14px] py-[12px]",
              i < rows.length - 1 && "border-b border-border/50"
            )}>
              <Icon size={14} className="text-foreground-secondary shrink-0" />
              <span className="text-xs text-foreground-secondary flex-1">{row.label}</span>
              <span className={cn(
                "text-xs font-semibold tabular-nums",
                row.highlight ? "text-success" : "text-foreground"
              )}>{row.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   REDEEM SECTION — exchange tokens for real property
   ══════════════════════════════════════════════════════════════════════ */
function RedeemSection({ project }: { project: typeof PROJECTS[0] }) {
  if (project.properties.length === 0) return null

  return (
    <div className="px-[22px] pt-[32px]">
      <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wide mb-[4px]">Đổi BĐS thật</p>
      <p className="text-xs text-foreground-secondary mb-[10px]">Tích đủ token, quy đổi thành quyền sở hữu căn hộ thật</p>
      <div className="space-y-[8px]">
        {project.properties.map((p) => (
          <div key={p.id} className="bg-secondary rounded-[16px] px-[14px] py-[12px]">
            <div className="flex items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-[10px] bg-warning/10 flex items-center justify-center shrink-0">
                <Home size={16} className="text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                <p className="text-[11px] text-foreground-secondary">{p.area} m² · {p.bedrooms} PN</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[10px] pt-[10px] border-t border-border/50">
              <div>
                <p className="text-[10px] text-foreground-secondary">Cần tích lũy</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{p.tokensRequired.toLocaleString("vi-VN")} token</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-foreground-secondary">Giá trị BĐS</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{formatVNDShort(p.price)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   SALE STATUS — countdown / progress / results per state
   ══════════════════════════════════════════════════════════════════════ */
function SaleStatus({ project, campaign, status }: {
  project: typeof PROJECTS[0]; campaign?: typeof CAMPAIGNS[0]; status: string
}) {
  const { days, hours, minutes, seconds } = useCountdown(
    status === "coming-soon" ? project.startDate : project.endDate
  )
  const pct = project.totalSupply > 0 ? Math.round((project.soldCount / project.totalSupply) * 100) : 0
  const raised = campaign?.raisedAmount ?? project.soldCount * project.tokenPrice
  const target = campaign?.targetAmount ?? project.totalSupply * project.tokenPrice

  if (status === "coming-soon") {
    return (
      <div className="px-[22px] pt-[20px]">
        <div className="bg-warning/5 rounded-[20px] px-[16px] py-[16px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wide text-center mb-[12px]">
            Mở bán sau
          </p>
          <div className="flex items-center justify-center gap-[4px]">
            {[
              { v: days, l: "Ngày" }, { v: hours, l: "Giờ" },
              { v: minutes, l: "Phút" }, { v: seconds, l: "Giây" },
            ].map((u, i) => (
              <React.Fragment key={u.l}>
                {i > 0 && <span className="text-xl font-bold text-foreground-secondary/30 pb-[18px]">:</span>}
                <div className="flex flex-col items-center">
                  <div className="w-[60px] h-[54px] rounded-[14px] bg-foreground flex items-center justify-center">
                    <span className="text-2xl font-black text-background tabular-nums">
                      {String(u.v).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-foreground-secondary mt-[4px]">{u.l}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (status === "open") {
    return (
      <div className="px-[22px] pt-[20px]">
        <div className="bg-success/5 rounded-[20px] px-[16px] py-[14px]">
          <div className="flex items-center justify-between mb-[8px]">
            <span className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wide">Đang phát hành</span>
            <span className="text-sm font-black text-success tabular-nums">{pct}%</span>
          </div>
          <div className="relative h-[8px] bg-secondary rounded-full overflow-hidden mb-[10px]">
            <div className="absolute inset-y-0 left-0 bg-success rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex items-center justify-between mb-[12px]">
            <div>
              <p className="text-[10px] text-foreground-secondary">Đã phát hành</p>
              <p className="text-xs font-bold text-foreground tabular-nums">{project.soldCount.toLocaleString("vi-VN")} token</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-foreground-secondary">Tổng cung</p>
              <p className="text-xs font-bold text-foreground tabular-nums">{project.totalSupply.toLocaleString("vi-VN")} token</p>
            </div>
          </div>

          {/* Mini countdown */}
          <div className="flex items-center justify-center gap-[4px] pt-[10px] border-t border-border/50">
            <Clock size={12} className="text-foreground-secondary" />
            <span className="text-[11px] font-semibold text-foreground-secondary tabular-nums">
              Còn {days > 0 ? `${days}d ` : ""}{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // closed
  return (
    <div className="px-[22px] pt-[20px]">
      <div className="bg-foreground rounded-[20px] px-[16px] py-[16px] overflow-hidden relative">
        <div className="absolute -top-[30px] -right-[30px] w-[100px] h-[100px] rounded-full border border-background/5" />
        <div className="relative">
          <div className="flex items-center gap-[6px] mb-[12px]">
            <Trophy size={14} className="text-warning" />
            <span className="text-[11px] font-bold text-background/50 uppercase tracking-wide">Đã kết thúc phát hành</span>
          </div>
          <div className="grid grid-cols-3 gap-[8px]">
            <div>
              <p className="text-2xl font-black text-background tabular-nums">{pct}%</p>
              <p className="text-[10px] text-background/40">Đã bán</p>
            </div>
            <div>
              <p className="text-2xl font-black text-background tabular-nums">{project.investors.toLocaleString("vi-VN")}</p>
              <p className="text-[10px] text-background/40">NĐT</p>
            </div>
            <div>
              <p className="text-2xl font-black text-background tabular-nums">{campaign?.allocationRatio ?? 100}%</p>
              <p className="text-[10px] text-background/40">Phân bổ</p>
            </div>
          </div>
          <p className="text-[10px] text-background/30 mt-[10px]">Token vẫn giao dịch trên sàn thứ cấp</p>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   INFO SHEETS
   ══════════════════════════════════════════════════════════════════════ */
type SheetKey = "about" | "risk" | "safety" | "faq" | null

function InfoSheet({ title, icon: Icon, iconColor, children, onClose }: {
  title: string; icon: typeof Clock; iconColor: string; children: React.ReactNode; onClose: () => void
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40" />
      <div
        className="relative w-full bg-background rounded-t-[28px] px-[22px] pt-[14px] pb-[34px] max-h-[75%] flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-[12px]">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>
        <div className="flex items-center gap-[10px] mb-[16px]">
          <Icon size={18} className={iconColor} />
          <p className="text-md font-bold text-foreground flex-1">{title}</p>
          <button type="button" onClick={onClose} className="w-[32px] h-[32px] rounded-full bg-secondary flex items-center justify-center shrink-0">
            <X size={16} className="text-foreground" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

const INFO_ROWS: { key: Exclude<SheetKey, null>; icon: typeof Clock; iconColor: string; title: string; subtitle: string }[] = [
  { key: "about", icon: Building2, iconColor: "text-foreground", title: "Tài sản cơ sở", subtitle: "BĐS · Vị trí · Chủ đầu tư" },
  { key: "risk",  icon: AlertTriangle, iconColor: "text-warning", title: "Rủi ro & Điều kiện", subtitle: "Khóa vốn · Biến động · Hoàn tiền" },
  { key: "safety", icon: ShieldCheck, iconColor: "text-success", title: "An toàn & Pháp lý", subtitle: "SPV · Fireblocks · ERC-3643" },
  { key: "faq",   icon: FileText, iconColor: "text-foreground-secondary", title: "Câu hỏi thường gặp", subtitle: "Token · Giao dịch · Sinh lời" },
]

function InfoSection({ project, activeSheet, onOpenSheet }: {
  project: typeof PROJECTS[0]; activeSheet: SheetKey; onOpenSheet: (key: SheetKey) => void
}) {
  return (
    <>
      <div className="px-[22px] pt-[32px]">
        <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wide mb-[4px]">Tìm hiểu thêm</p>
        <div>
          {INFO_ROWS.map((row) => {
            const Icon = row.icon
            return (
              <button
                key={row.key} type="button"
                onClick={() => onOpenSheet(row.key)}
                className="w-full flex items-center gap-[12px] py-[14px] border-b border-border last:border-b-0"
              >
                <div className={cn("w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0",
                  row.key === "about" ? "bg-foreground/5" :
                  row.key === "risk" ? "bg-warning/10" :
                  row.key === "safety" ? "bg-success/10" : "bg-secondary"
                )}>
                  <Icon size={16} className={row.iconColor} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-foreground">{row.title}</p>
                  <p className="text-[11px] text-foreground-secondary mt-[1px]">{row.subtitle}</p>
                </div>
                <ChevronRight size={16} className="text-foreground-secondary/40 shrink-0" />
              </button>
            )
          })}
        </div>
      </div>

      {activeSheet === "about" && (
        <InfoSheet title="Tài sản cơ sở" icon={Building2} iconColor="text-foreground" onClose={() => onOpenSheet(null)}>
          <div>
            <p className="text-sm text-foreground-secondary leading-relaxed">{project.description}</p>
            <div className="flex items-center gap-[6px] mt-[12px]">
              <span className="text-xs font-semibold text-foreground">{project.developer}</span>
              <span className="text-xs text-foreground-secondary">· {project.area}</span>
            </div>
            {project.properties.length > 0 && (
              <div className="mt-[16px]">
                <p className="text-[11px] text-foreground-secondary mb-[8px]">BĐS backing token này:</p>
                <div className="space-y-[6px]">
                  {project.properties.map((p) => (
                    <div key={p.id} className="flex items-center gap-[10px] bg-secondary rounded-[14px] px-[12px] py-[10px]">
                      <div className="w-[36px] h-[36px] rounded-[8px] bg-border/30 flex items-center justify-center shrink-0">
                        <Building2 size={14} className="text-foreground-secondary/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                        <p className="text-[11px] text-foreground-secondary">{p.area} m² · {p.bedrooms} PN · {formatVND(p.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </InfoSheet>
      )}

      {activeSheet === "risk" && (
        <InfoSheet title="Rủi ro & Điều kiện" icon={AlertTriangle} iconColor="text-warning" onClose={() => onOpenSheet(null)}>
          <div className="space-y-[10px]">
            {[
              { icon: Clock, color: "text-warning", bg: "bg-warning/10", text: "Khóa tối thiểu 12 tháng · Sau đó giao dịch tự do trên sàn" },
              { icon: AlertTriangle, color: "text-danger", bg: "bg-danger/10", text: `Lợi suất ${project.expectedYield}%/năm là kỳ vọng, không cam kết · Giá BĐS có thể giảm` },
              { icon: ShieldCheck, color: "text-success", bg: "bg-success/10", text: "Tiền được ngân hàng giữ Escrow · Không phân bổ → hoàn 100% trong 1-2 ngày" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-[10px]">
                <div className={cn("w-[28px] h-[28px] rounded-[8px] flex items-center justify-center shrink-0 mt-[1px]", item.bg)}>
                  <item.icon size={14} className={item.color} />
                </div>
                <p className="text-sm text-foreground-secondary leading-snug pt-[4px]">{item.text}</p>
              </div>
            ))}
          </div>
        </InfoSheet>
      )}

      {activeSheet === "safety" && (
        <InfoSheet title="An toàn & Pháp lý" icon={ShieldCheck} iconColor="text-success" onClose={() => onOpenSheet(null)}>
          <div className="space-y-[10px]">
            {[
              { icon: ShieldCheck, color: "text-success", bg: "bg-success/10", text: "Bảo mật cấp ngân hàng (Fireblocks) · Chỉ NĐT đã eKYC mới giao dịch được" },
              { icon: FileText, color: "text-foreground-secondary", bg: "bg-foreground/5", text: "Tài sản giữ bởi SPV riêng — tách biệt hoàn toàn khỏi công ty vận hành" },
              { icon: CheckCircle, color: "text-success", bg: "bg-success/10", text: "Tuân chuẩn ERC-3643 · Xác minh danh tính VNPT eKYC" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-[10px]">
                <div className={cn("w-[28px] h-[28px] rounded-[8px] flex items-center justify-center shrink-0 mt-[1px]", item.bg)}>
                  <item.icon size={14} className={item.color} />
                </div>
                <p className="text-sm text-foreground-secondary leading-snug pt-[4px]">{item.text}</p>
              </div>
            ))}
          </div>
        </InfoSheet>
      )}

      {activeSheet === "faq" && (
        <InfoSheet title="Câu hỏi thường gặp" icon={FileText} iconColor="text-foreground-secondary" onClose={() => onOpenSheet(null)}>
          <div className="space-y-[14px]">
            {[
              { q: "Token này dùng để làm gì?", a: "Giao dịch 24/7 trên sàn, thanh toán, tích lũy sinh lời hàng quý, và quy đổi thành BĐS thật khi đủ token." },
              { q: "Tối thiểu bao nhiêu?", a: `Từ 1 token (${formatVND(project.tokenPrice)}). Mua thêm bất cứ lúc nào trên sàn.` },
              { q: "Làm sao đổi thành BĐS thật?", a: "Tích lũy đủ số token yêu cầu → đổi thành quyền sở hữu căn hộ. Xem mục \"Đổi BĐS thật\" để biết cần bao nhiêu token." },
              { q: "Lợi nhuận thế nào?", a: "Lợi nhuận cho thuê phân phối hàng quý. Token tăng giá theo giá trị BĐS. Bán lại bất cứ lúc nào trên sàn." },
              { q: "An toàn không?", a: "SPV riêng biệt giữ tài sản. Fireblocks bảo mật. Escrow ngân hàng. eKYC bắt buộc." },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-sm font-semibold text-foreground">{item.q}</p>
                <p className="text-xs text-foreground-secondary leading-snug mt-[4px]">{item.a}</p>
              </div>
            ))}
          </div>
        </InfoSheet>
      )}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   CALCULATOR SHEET
   ══════════════════════════════════════════════════════════════════════ */
function CalculatorSheet({ tokenPrice, yieldPct, projectId, onClose }: {
  tokenPrice: number; yieldPct: number; projectId: string; onClose: () => void
}) {
  const router = useRouter()
  const [shares, setShares] = React.useState(10)
  const inv = shares * tokenPrice
  const yearly = inv * yieldPct / 100
  const monthly = yearly / 12

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40" />
      <div
        className="relative w-full max-w-[390px] bg-background rounded-t-[28px] px-[22px] pt-[14px] pb-[34px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-[12px]">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>
        <div className="flex items-center justify-between mb-[16px]">
          <p className="text-md font-bold text-foreground">Ước tính lợi nhuận</p>
          <button type="button" onClick={onClose} className="w-[32px] h-[32px] rounded-full bg-secondary flex items-center justify-center">
            <X size={16} className="text-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-[8px] mb-[16px]">
          <span className="text-xs text-foreground-secondary shrink-0">Số token</span>
          {[1, 5, 10, 20, 50].map((n) => (
            <button
              key={n} type="button" onClick={() => setShares(n)}
              className={cn(
                "w-[36px] h-[36px] rounded-full text-xs font-semibold transition-colors",
                shares === n ? "bg-foreground text-background" : "bg-secondary text-foreground-secondary"
              )}
            >{n}</button>
          ))}
        </div>

        <div className="bg-secondary rounded-[20px] px-[18px] py-[14px] space-y-[10px]">
          <div className="flex justify-between">
            <span className="text-sm text-foreground-secondary">Tổng đầu tư</span>
            <span className="text-sm font-bold text-foreground tabular-nums">{formatVND(inv)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-foreground-secondary">Lợi nhuận / năm</span>
            <span className="text-sm font-bold text-success tabular-nums">{formatVND(Math.round(yearly))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-foreground-secondary">Lợi nhuận / tháng</span>
            <span className="text-sm font-bold text-success tabular-nums">~{formatVND(Math.round(monthly))}</span>
          </div>
        </div>

        <div className="mt-[10px] mb-[16px] bg-warning/5 rounded-[10px] px-[10px] py-[8px]">
          <p className="text-[11px] text-foreground-secondary leading-snug">
            Ước tính dựa trên lợi suất kỳ vọng. Lợi nhuận thực tế phụ thuộc thị trường.
          </p>
        </div>

        <Button variant="primary" size="48" className="w-full"
          onClick={() => { onClose(); router.push(`/rwa/register/${projectId}`) }}>
          Mua {shares} token
        </Button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════ */
export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showCalc, setShowCalc] = React.useState(false)
  const [activeSheet, setActiveSheet] = React.useState<SheetKey>(null)

  const project = getProject(params.id as string)
  const campaigns = getCampaignsForProject(params.id as string)
  const activeCampaign = campaigns.find((c) => c.status === "open" || c.status === "coming-soon") ?? campaigns[0]
  const realCommitment = getUserCommitment(params.id as string)

  // Dev overrides
  const [devOverride, setDevOverride] = React.useState<UserProjectStatus | null>(null)
  const [devProjectStatus, setDevProjectStatus] = React.useState<"open" | "coming-soon" | "closed" | null>(null)
  const userStatus = devOverride ?? realCommitment.status

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground-secondary">Không tìm thấy dự án</p>
      </div>
    )
  }

  const projectStatus = devProjectStatus ?? project.status

  return (
    <div className="min-h-screen bg-grey-100 dark:bg-grey-900 flex flex-col items-center">

      {/* ── DEV: State controls ──── */}
      <div className="w-full max-w-[800px] px-[16px] py-[10px] space-y-[6px]">
        <div className="flex items-center gap-[6px]">
          <span className="text-[10px] font-medium text-foreground-secondary shrink-0">Sale:</span>
          <div className="flex gap-[4px]">
            {(["coming-soon", "open", "closed"] as const).map((s) => (
              <button
                key={s} type="button"
                onClick={() => setDevProjectStatus(s)}
                className={cn(
                  "px-[8px] py-[3px] rounded-full text-[10px] font-semibold transition-colors",
                  projectStatus === s ? "bg-foreground text-background" : "bg-secondary text-foreground-secondary"
                )}
              >
                {s === "coming-soon" ? "Chưa mở" : s === "open" ? "Đang bán" : "Kết thúc"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[6px]">
          <span className="text-[10px] font-medium text-foreground-secondary shrink-0">User:</span>
          <div className="flex gap-[4px]">
            {(["none", "whitelisted", "committed"] as const).map((s) => (
              <button
                key={s} type="button"
                onClick={() => setDevOverride(s)}
                className={cn(
                  "px-[8px] py-[3px] rounded-full text-[10px] font-semibold transition-colors",
                  userStatus === s ? "bg-foreground text-background" : "bg-secondary text-foreground-secondary"
                )}
              >
                {s === "none" ? "Mới" : s === "whitelisted" ? "Đã ĐK" : "Đã mua"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Phone frame ──────────────────────────────────── */}
      <div className="relative w-[390px] h-[844px] bg-background text-foreground flex flex-col rounded-[40px] shadow-xl overflow-hidden">

        {/* Floating back */}
        <div className="absolute top-[50px] left-[14px] z-20">
          <button type="button" onClick={() => router.back()}
            className="w-[40px] h-[40px] rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center">
            <ChevronLeft size={22} className="text-background" />
          </button>
        </div>

        {/* Scroll content */}
        <div className="flex-1 overflow-y-auto pb-[110px]">

          {/* 1. Token Hero */}
          <TokenHero project={project} status={projectStatus} />

          {/* 2. Four Pillars — what this token does */}
          <TokenPillars />

          {/* 3. Sale status per state */}
          <SaleStatus project={project} campaign={activeCampaign} status={projectStatus} />

          {/* 4. User status banners (open state only) */}
          {projectStatus === "open" && userStatus === "whitelisted" && (() => {
            const holding = HOLDINGS.find((h) => h.projectId === project.id)
            return (
              <div className="px-[22px] pt-[14px]">
                <button type="button"
                  onClick={() => holding && router.push(`/rwa/holding/${holding.id}`)}
                  className="w-full flex items-center gap-[10px] bg-success/5 rounded-[16px] px-[14px] py-[10px]"
                >
                  <CheckCircle size={14} className="text-success shrink-0" />
                  <p className="text-xs text-foreground-secondary flex-1 text-left"><span className="font-semibold text-foreground">Đã đăng ký</span> · Đặt mua để giữ chỗ</p>
                  <ChevronRight size={14} className="text-foreground-secondary/40 shrink-0" />
                </button>
              </div>
            )
          })()}

          {projectStatus === "open" && userStatus === "committed" && realCommitment.shares && realCommitment.amount && (() => {
            const holding = HOLDINGS.find((h) => h.projectId === project.id)
            return (
              <div className="px-[22px] pt-[14px]">
                <button type="button"
                  onClick={() => holding && router.push(`/rwa/holding/${holding.id}`)}
                  className="w-full bg-foreground rounded-[20px] px-[16px] py-[14px] overflow-hidden relative"
                >
                  <div className="absolute -top-[20px] -right-[20px] w-[80px] h-[80px] rounded-full border border-background/10" />
                  <div className="relative flex items-center gap-[12px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-background/10 flex items-center justify-center shrink-0">
                      <Loader2 size={18} className="text-warning animate-spin" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-bold text-background">{realCommitment.shares} token · {formatVND(realCommitment.amount)}</p>
                      <p className="text-xs text-background/60 mt-[2px]">Đang chờ phân bổ</p>
                    </div>
                    <ChevronRight size={16} className="text-background/40 shrink-0" />
                  </div>
                </button>
              </div>
            )
          })()}

          {/* 5. Redeem — exchange token for real property */}
          <RedeemSection project={project} />

          {/* 6. Token details table */}
          <TokenMetrics project={project} />

          {/* 7. Info rows → sheets */}
          <InfoSection project={project} activeSheet={activeSheet} onOpenSheet={setActiveSheet} />

          <div className="h-[32px]" />
        </div>

        {/* ── Sticky CTA ─────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border px-[22px] pb-[34px] pt-[12px]">
          {(projectStatus === "open" || projectStatus === "closed") && (
            <button type="button" onClick={() => setShowCalc(true)}
              className="w-full flex items-center justify-center gap-[6px] mb-[10px]"
            >
              <Calculator size={13} className="text-foreground-secondary" />
              <span className="text-xs font-semibold text-foreground-secondary">Ước tính lợi nhuận</span>
            </button>
          )}

          {projectStatus === "open" && (
            <Button variant="primary" size="48" className="w-full"
              onClick={() => router.push(`/rwa/register/${project.id}`)}>
              <Wallet size={18} />
              Mua token
            </Button>
          )}

          {projectStatus === "coming-soon" && (
            <>
              <p className="text-[10px] text-foreground-secondary text-center mb-[6px]">Nhận thông báo khi mở bán</p>
              <Button variant="secondary" size="48" className="w-full" disabled>
                <Clock size={18} /> Chờ mở bán
              </Button>
            </>
          )}

          {projectStatus === "closed" && (
            <Button variant="primary" size="48" className="w-full"
              onClick={() => router.push(`/rwa/register/${project.id}`)}>
              <ArrowUpDown size={18} />
              Mua trên sàn thứ cấp
            </Button>
          )}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

        {showCalc && (
          <CalculatorSheet
            tokenPrice={project.tokenPrice}
            yieldPct={project.expectedYield}
            projectId={project.id}
            onClose={() => setShowCalc(false)}
          />
        )}
      </div>
    </div>
  )
}
