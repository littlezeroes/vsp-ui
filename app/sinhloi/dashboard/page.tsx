"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Eye, EyeOff, Info, ArrowUpRight, ArrowDownLeft, TrendingUp,
  ChevronLeft, FileText, Star, HelpCircle, Settings, Crown, Lock,
  Clock, XCircle,
} from "lucide-react"
import { Header } from "@/components/ui/header"
import { ButtonGroup } from "@/components/ui/button-group"
import { ItemListItem } from "@/components/ui/item-list"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Dialog } from "@/components/ui/dialog"
import { FeedbackState } from "@/components/ui/feedback-state"
import {
  SINHLOI_CONFIG, MOCK_BALANCE, MOCK_TRANSACTIONS, MOCK_DAILY_INTEREST,
  INTEREST_TIERS, CURRENT_TIER_IDX,
  formatVND, formatVNDSigned, getTxIcon,
} from "../data"

/* ── Bar Chart — pure CSS, no lib ───────────────────────────────── */
function InterestBarChart({ hidden }: { hidden: boolean }) {
  const data = MOCK_DAILY_INTEREST
  const maxAmount = Math.max(...data.map((d) => d.amount))
  const BAR_MAX_H = 96

  return (
    <div className="flex items-end justify-between gap-[6px]" style={{ height: BAR_MAX_H + 32 }}>
      {data.map((d, i) => {
        const isToday = i === data.length - 1
        const barH = Math.max(4, Math.round((d.amount / maxAmount) * BAR_MAX_H))

        return (
          <div key={d.date} className="flex-1 flex flex-col items-center gap-[4px]">
            {!hidden && (
              <p className={`text-[10px] tabular-nums leading-[12px] ${isToday ? "text-success font-semibold" : "text-foreground-secondary"}`}>
                {Math.round(d.amount / 1000)}k
              </p>
            )}
            <div
              className={`w-full rounded-[4px] transition-all ${isToday ? "bg-success" : "bg-success/30"}`}
              style={{ height: barH }}
            />
            <p className={`text-[10px] leading-[12px] ${isToday ? "text-foreground font-semibold" : "text-foreground-secondary"}`}>
              {d.day}
            </p>
          </div>
        )
      })}
    </div>
  )
}

/* ── Skeleton — loading state ──────────────────────────────────── */
function DashboardSkeleton() {
  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      <Header variant="default" title="Sinh loi" showStatusBar={false} />
      {/* Skeleton dark header */}
      <div className="bg-foreground px-[22px] pt-[40px] pb-[56px] flex flex-col items-center">
        <div className="h-4 w-24 bg-background/20 rounded-full animate-pulse mb-[8px]" />
        <div className="h-9 w-48 bg-background/20 rounded-full animate-pulse" />
        <div className="h-3 w-36 bg-background/10 rounded-full animate-pulse mt-[8px]" />
      </div>
      {/* Skeleton card */}
      <div className="px-[22px] -mt-[32px]">
        <div className="bg-background rounded-[28px] px-[20px] py-[20px] shadow-sm">
          <div className="flex justify-between mb-[16px]">
            <div className="h-5 w-20 bg-secondary rounded-full animate-pulse" />
            <div className="h-5 w-20 bg-secondary rounded-full animate-pulse" />
          </div>
          <div className="h-[100px] bg-secondary rounded-[14px] animate-pulse" />
        </div>
      </div>
      {/* Skeleton transactions */}
      <div className="pt-[32px] px-[22px] space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-secondary animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-secondary rounded-full animate-pulse" />
              <div className="h-3 w-1/2 bg-secondary rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Tab: San pham ─────────────────────────────────────────────── */
function TabSanPham({
  router,
  balanceHidden,
  setBalanceHidden,
  showO1, setShowO1,
  showO2, setShowO2,
  showO3, setShowO3,
  showO7, setShowO7,
  rating, setRating,
}: {
  router: ReturnType<typeof useRouter>
  balanceHidden: boolean
  setBalanceHidden: (v: boolean) => void
  showO1: boolean; setShowO1: (v: boolean) => void
  showO2: boolean; setShowO2: (v: boolean) => void
  showO3: boolean; setShowO3: (v: boolean) => void
  showO7: boolean; setShowO7: (v: boolean) => void
  rating: number; setRating: (v: number) => void
}) {
  const { balance, todayInterest, totalInterestEarned } = MOCK_BALANCE
  const { interestRate } = SINHLOI_CONFIG
  const isZeroBalance = balance === 0
  const weeklyInterest = MOCK_DAILY_INTEREST.reduce((s, d) => s + d.amount, 0)

  return (
    <>
      {/* Dark header — BIDV hero: balance */}
      <div className="bg-foreground px-[22px] pt-[40px] pb-[56px] flex flex-col items-center">
        <p className="text-sm font-semibold text-background/70 mb-[4px]">So du sinh loi</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => router.push("/sinhloi/account-detail")}>
            <p className="text-[32px] font-bold leading-[38px] tabular-nums text-background">
              {balanceHidden ? "********" : formatVND(balance)}
            </p>
          </button>
          <button type="button" onClick={() => setBalanceHidden(!balanceHidden)} className="p-1">
            {balanceHidden ? <EyeOff size={18} className="text-background/50" /> : <Eye size={18} className="text-background/50" />}
          </button>
        </div>
        <div className="flex items-center gap-[6px] mt-[4px]">
          <p className="text-xs text-background/50">
            {balanceHidden ? "Tong loi: ****" : `+${formatVND(todayInterest)} hom qua | Tong loi: ${formatVNDSigned(totalInterestEarned)}`}
          </p>
        </div>
        <p className="text-xs text-background/30 mt-[2px]">Lai suat {interestRate}%/nam</p>

        {/* Quick action chips */}
        <div className="flex gap-[8px] mt-[16px] overflow-x-auto no-scrollbar w-full justify-center">
          <button
            type="button"
            onClick={() => router.push("/sinhloi/upgrade")}
            className="flex items-center gap-[6px] px-[14px] py-[8px] rounded-full bg-background/10 shrink-0"
          >
            <Star size={14} className="text-warning" />
            <span className="text-sm font-semibold text-background whitespace-nowrap">Nang cap lai suat</span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/sinhloi/deposit-withdraw?tab=deposit")}
            className="flex items-center gap-[6px] px-[14px] py-[8px] rounded-full bg-background/10 shrink-0"
          >
            <span className="text-sm font-semibold text-background whitespace-nowrap">+ Nap/Rut</span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/sinhloi/settings")}
            className="flex items-center gap-[6px] px-[14px] py-[8px] rounded-full bg-background/10 shrink-0"
          >
            <Settings size={14} className="text-background/70" />
            <span className="text-sm font-semibold text-background whitespace-nowrap">Cai dat</span>
          </button>
        </div>
      </div>

      {/* Pending TX banner */}
      {MOCK_TRANSACTIONS.some((tx) => tx.status === "pending") && (
        <div className="px-[22px] -mt-[16px] mb-[8px] relative z-10">
          <button
            type="button"
            onClick={() => router.push("/sinhloi/history")}
            className="w-full flex items-center gap-[8px] px-[14px] py-[10px] bg-warning/10 rounded-[14px]"
          >
            <Clock size={16} className="text-warning shrink-0" />
            <span className="text-sm font-medium text-warning flex-1 text-left">Dang xu ly giao dich...</span>
            <span className="text-xs text-foreground-secondary">Xem</span>
          </button>
        </div>
      )}

      {/* White card overlap — interest + chart */}
      <div className="px-[22px] -mt-[32px]">
        <div className="bg-background rounded-[28px] px-[20px] py-[20px] shadow-sm">
          <div className="flex items-center justify-between mb-[16px]">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-[2px]">
                <span className="text-sm text-foreground-secondary">Loi hom qua</span>
                <button type="button" onClick={() => setShowO2(true)}>
                  <Info size={14} className="text-foreground-secondary" />
                </button>
              </div>
              <p className="text-lg font-bold tabular-nums text-success">
                {balanceHidden ? "****" : formatVNDSigned(todayInterest)}
              </p>
            </div>
            <div className="flex-1 text-right">
              <div className="flex items-center justify-end gap-1 mb-[2px]">
                <span className="text-sm text-foreground-secondary">Tong loi</span>
                <button type="button" onClick={() => setShowO3(true)}>
                  <Info size={14} className="text-foreground-secondary" />
                </button>
              </div>
              <p className="text-lg font-bold tabular-nums text-success">
                {balanceHidden ? "****" : formatVNDSigned(totalInterestEarned)}
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-[16px]">
            <div className="flex items-center justify-between mb-[12px]">
              <p className="text-sm font-semibold text-foreground">Lai 7 ngay qua</p>
              <p className="text-xs text-foreground-secondary tabular-nums">
                {balanceHidden ? "****" : `+${formatVND(weeklyInterest)}`}
              </p>
            </div>
            <InterestBarChart hidden={balanceHidden} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Zero balance nudge */}
        {isZeroBalance && (
          <div className="pt-[32px] px-[22px]">
            <FeedbackState
              title="Nap tien de bat dau sinh loi"
              description="So du hien tai la 0d. Nap tien vao vi sinh loi de bat dau nhan lai moi ngay."
              actionLabel="Nap tien ngay"
              actionProps={{ onClick: () => router.push("/sinhloi/deposit-withdraw?tab=deposit") }}
            />
          </div>
        )}

        {/* Recent transactions widget */}
        {!isZeroBalance && MOCK_TRANSACTIONS.length > 0 && (
          <div className="pt-[32px]">
            <div className="flex items-center gap-[8px] px-[22px] pb-[12px]">
              <p className="flex-1 text-md font-semibold leading-6 text-foreground">Giao dich gan nhat</p>
              <button type="button" onClick={() => router.push("/sinhloi/history")} className="shrink-0 text-md font-semibold leading-6 text-success">
                Xem tat ca
              </button>
            </div>
            <div className="px-[22px]">
              {MOCK_TRANSACTIONS.slice(0, 3).map((tx) => {
                const icon = getTxIcon(tx.type)
                return (
                  <ItemListItem
                    key={tx.id}
                    label={tx.label}
                    sublabel={tx.date}
                    metadata={formatVNDSigned(tx.amount)}
                    prefix={
                      <div className={`w-11 h-11 rounded-full ${icon.bg} flex items-center justify-center`}>
                        {tx.type === "deposit" ? <ArrowDownLeft size={20} className={icon.color} /> :
                         tx.type === "withdrawal" ? <ArrowUpRight size={20} className={icon.color} /> :
                         <TrendingUp size={20} className={icon.color} />}
                      </div>
                    }
                    onPress={() => router.push(`/sinhloi/history/${tx.id}`)}
                    divider
                  />
                )
              })}
              <p className="text-xs text-foreground-secondary mt-2">
                Giao dich hom nay se hien thi vao ngay mai (T-1)
              </p>
            </div>
          </div>
        )}

        {/* Nudge CTA */}
        {!isZeroBalance && (
          <div className="pt-[32px] px-[22px]">
            <div className="bg-success/5 rounded-[28px] p-[20px] border border-success/10">
              <p className="text-md font-semibold text-foreground mb-[4px]">
                Nho chuyen them vao Vi sinh loi
              </p>
              <p className="text-sm text-foreground-secondary mb-[12px]">
                Vua linh hoat chi tieu, vua sinh loi moi ngay!
              </p>
              <button
                type="button"
                onClick={() => router.push("/sinhloi/deposit-withdraw?tab=deposit")}
                className="text-md font-semibold text-success"
              >
                Nap ngay &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Upgrade tier card */}
        <div className="pt-[32px] px-[22px]">
          <button
            type="button"
            onClick={() => router.push("/sinhloi/upgrade")}
            className="w-full bg-background rounded-[28px] p-[20px] shadow-sm text-left"
          >
            <div className="flex items-center gap-[12px] mb-[12px]">
              <div className="w-[40px] h-[40px] rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                <Star size={20} className="text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-md font-semibold text-foreground">Nang cap muc sinh loi</p>
                <p className="text-sm text-foreground-secondary">Lam nhiem vu de mo khoa lai suat cao hon!</p>
              </div>
            </div>
            <div className="flex items-center gap-[4px]">
              {INTEREST_TIERS.map((tier, idx) => (
                <div key={tier.rate} className="flex items-center gap-[4px]">
                  <div className={`flex items-center gap-[2px] px-[10px] py-[4px] rounded-full ${
                    idx <= CURRENT_TIER_IDX ? "bg-success text-background" : "bg-secondary text-foreground-secondary"
                  }`}>
                    {idx <= CURRENT_TIER_IDX ? (
                      <span className="text-xs font-semibold">{tier.rate}%</span>
                    ) : (
                      <>
                        <Lock size={10} />
                        <span className="text-xs font-semibold">{tier.rate}%</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </button>
        </div>

        {/* Kham pha section */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-md font-semibold text-foreground mb-[12px]">Kham pha</p>
          <div className="grid grid-cols-2 gap-[12px]">
            <button
              type="button"
              onClick={() => router.push("/sinhloi/membership")}
              className="bg-background rounded-[28px] p-[20px] text-left shadow-sm"
            >
              <div className="w-[36px] h-[36px] rounded-full bg-info/10 flex items-center justify-center mb-[8px]">
                <Crown size={18} className="text-info" />
              </div>
              <p className="text-md font-semibold text-foreground">Hang thanh vien</p>
              <p className="text-sm text-foreground-secondary mt-[2px]">Xem quyen loi</p>
            </button>
            <button
              type="button"
              onClick={() => setShowO1(true)}
              className="bg-background rounded-[28px] p-[20px] text-left shadow-sm"
            >
              <div className="w-[36px] h-[36px] rounded-full bg-success/10 flex items-center justify-center mb-[8px]">
                <TrendingUp size={18} className="text-success" />
              </div>
              <p className="text-md font-semibold text-foreground">Co che sinh loi</p>
              <p className="text-sm text-foreground-secondary mt-[2px]">Tim hieu them</p>
            </button>
          </div>
        </div>

        {/* Tim hieu them row */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-md font-semibold text-foreground mb-[12px]">Tim hieu them</p>
          <div className="flex gap-[16px]">
            {[
              { label: "Ngay nhan loi", icon: <TrendingUp size={18} className="text-success" />, action: () => router.push("/sinhloi/profit") },
              { label: "Quyen loi TK", icon: <Crown size={18} className="text-info" />, action: () => router.push("/sinhloi/membership") },
              { label: "Cau hoi", icon: <HelpCircle size={18} className="text-warning" />, action: () => router.push("/sinhloi/faq") },
            ].map((item) => (
              <button key={item.label} type="button" onClick={item.action} className="flex flex-col items-center gap-[6px]">
                <div className="w-[44px] h-[44px] rounded-full bg-secondary flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-xs text-foreground-secondary text-center">{item.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="pt-[32px] px-[22px]">
          <div className="bg-secondary rounded-[28px] p-[20px]">
            <p className="text-md font-semibold text-foreground mb-[4px]">Danh gia cua ban</p>
            <p className="text-sm text-foreground-secondary mb-[12px]">Ban cam thay the nao khi su dung Sinh loi tu dong?</p>
            <div className="flex gap-[8px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="p-[4px]">
                  <Star
                    size={28}
                    className={star <= rating ? "text-warning fill-warning" : "text-foreground-secondary"}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-success mt-[8px]">Cam on ban da danh gia!</p>
            )}
          </div>
        </div>

        {/* Bottom links */}
        <div className="pt-[32px] px-[22px] space-y-[1px]">
          <ItemListItem
            label="Dieu khoan & Hop dong"
            showChevron
            prefix={
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <FileText size={20} className="text-foreground-secondary" />
              </div>
            }
            onPress={() => router.push("/sinhloi/terms")}
            divider
          />
          <ItemListItem
            label="Cau hoi thuong gap"
            showChevron
            prefix={
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <HelpCircle size={20} className="text-foreground-secondary" />
              </div>
            }
            onPress={() => router.push("/sinhloi/faq")}
            divider
          />
          <ItemListItem
            label="Cai dat"
            showChevron
            prefix={
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <Settings size={20} className="text-foreground-secondary" />
              </div>
            }
            onPress={() => router.push("/sinhloi/settings")}
          />
        </div>
      </div>

      {/* Bottom sheets */}
      <BottomSheet open={showO1} onClose={() => setShowO1(false)}>
        <div className="space-y-4 py-4">
          <p className="text-lg font-semibold text-foreground">Co che sinh loi</p>
          <p className="text-md text-foreground">
            Tien trong Vi sinh loi cua ban se duoc cho vay thong qua doi tac tai chinh uy tin.
            Lai suat duoc tinh tren so du cuoi ngay va tra ve tai khoan moi thang.
          </p>
          <p className="text-md text-foreground">
            Ban co the rut tien bat ky luc nao ma khong mat phi. Lai suat co the thay doi theo thoa thuan voi doi tac.
          </p>
        </div>
      </BottomSheet>

      <BottomSheet open={showO2} onClose={() => setShowO2(false)}>
        <div className="space-y-4 py-4">
          <p className="text-lg font-semibold text-foreground">Tien loi hom qua</p>
          <p className="text-md text-foreground">
            Day la so tien lai duoc tinh dua tren so du cuoi ngay hom qua va lai suat hien tai.
            Tien lai se duoc cong don va tra vao tai khoan cua ban moi thang.
          </p>
        </div>
      </BottomSheet>

      <BottomSheet open={showO3} onClose={() => setShowO3(false)}>
        <div className="space-y-4 py-4">
          <p className="text-lg font-semibold text-foreground">Tong tien loi</p>
          <p className="text-md text-foreground">
            Tong so tien lai ban da nhan duoc ke tu khi kich hoat sinh loi.
            Lai duoc tra vao ngay cuoi moi thang va hien thi trong lich su giao dich.
          </p>
        </div>
      </BottomSheet>

      <Dialog
        open={showO7}
        onClose={() => setShowO7(false)}
        title="Chua co so du"
        description="Vi sinh loi chua co so du. Ban co muon nap tien?"
        primaryLabel="Nap tien"
        secondaryLabel="Dong"
        footerProps={{
          primaryProps: { onClick: () => { setShowO7(false); router.push("/sinhloi/deposit-withdraw?tab=deposit") } },
          secondaryProps: { onClick: () => setShowO7(false) },
        }}
      />
    </>
  )
}

/* ── Tab: Quan ly ──────────────────────────────────────────────── */
function TabQuanLy({ router }: { router: ReturnType<typeof useRouter> }) {
  const [showCancelDialog, setShowCancelDialog] = React.useState(false)
  const [cancelBlockReason, setCancelBlockReason] = React.useState<"balance" | "pending" | null>(null)

  const { balance } = MOCK_BALANCE
  const hasPendingTx = MOCK_TRANSACTIONS.some((tx) => tx.status === "pending")

  const handleCancel = () => {
    if (balance > 0) {
      setCancelBlockReason("balance")
      setShowCancelDialog(true)
    } else if (hasPendingTx) {
      setCancelBlockReason("pending")
      setShowCancelDialog(true)
    } else {
      router.push("/sinhloi/cancel")
    }
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Menu list */}
        <div className="pt-[32px] px-[22px]">
          <ItemListItem
            label="Dieu khoan & Hop dong"
            showChevron
            prefix={
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <FileText size={20} className="text-foreground-secondary" />
              </div>
            }
            onPress={() => router.push("/sinhloi/terms")}
            divider
          />
          <ItemListItem
            label="Lich su giao dich"
            showChevron
            prefix={
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <Clock size={20} className="text-foreground-secondary" />
              </div>
            }
            onPress={() => router.push("/sinhloi/history")}
            divider
          />
          <ItemListItem
            label="Tong ket loi nhuan"
            showChevron
            prefix={
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <TrendingUp size={20} className="text-foreground-secondary" />
              </div>
            }
            onPress={() => router.push("/sinhloi/profit")}
            divider
          />
          <ItemListItem
            label="Huy dang ky"
            showChevron
            prefix={
              <div className="w-11 h-11 rounded-full bg-danger/10 flex items-center justify-center">
                <XCircle size={20} className="text-danger" />
              </div>
            }
            suffix={
              <span className="text-md text-danger">Huy</span>
            }
            onPress={handleCancel}
          />
        </div>
      </div>

      {/* Cancel blocked dialog */}
      <Dialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        title={
          cancelBlockReason === "balance"
            ? "Chua the huy dang ky"
            : "Co giao dich dang xu ly"
        }
        description={
          cancelBlockReason === "balance"
            ? `Vui long rut het so du ${formatVND(balance)} truoc khi huy dang ky sinh loi.`
            : "Co giao dich dang duoc xu ly. Vui long doi hoan tat truoc khi huy."
        }
        primaryLabel={cancelBlockReason === "balance" ? "Rut tien" : "Xem giao dich"}
        secondaryLabel="Dong"
        footerProps={{
          primaryProps: {
            onClick: () => {
              setShowCancelDialog(false)
              if (cancelBlockReason === "balance") {
                router.push("/sinhloi/deposit-withdraw?tab=withdraw")
              } else {
                router.push("/sinhloi/history")
              }
            },
          },
          secondaryProps: { onClick: () => setShowCancelDialog(false) },
        }}
      />
    </>
  )
}

/* ── S5: Dashboard — 2 tabs: San pham / Quan ly ─────────────────── */
export default function DashboardPage() {
  return <React.Suspense fallback={null}><DashboardContent /></React.Suspense>
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = React.useState<"product" | "manage">(
    tabParam === "manage" ? "manage" : "product"
  )
  const [isLoading, setIsLoading] = React.useState(true)
  const [balanceHidden, setBalanceHidden] = React.useState(false)
  const [showO1, setShowO1] = React.useState(false)
  const [showO2, setShowO2] = React.useState(false)
  const [showO3, setShowO3] = React.useState(false)
  const [showO7, setShowO7] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [rating, setRating] = React.useState(0)

  const { balance } = MOCK_BALANCE
  const isZeroBalance = balance === 0

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Sync tab with URL
  React.useEffect(() => {
    if (tabParam === "manage") setActiveTab("manage")
    else setActiveTab("product")
  }, [tabParam])

  if (isLoading) return <DashboardSkeleton />

  if (error) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
        <Header variant="default" title="Sinh loi" showStatusBar={false} />
        <div className="flex-1 flex items-center justify-center">
          <FeedbackState
            title="Khong the tai thong tin"
            description="Vui long thu lai"
            actionLabel="Thu lai"
            actionProps={{ onClick: () => setError(false) }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Sinh loi"
        showStatusBar={false}
        leading={
          <button type="button" onClick={() => router.push("/")} className="w-[44px] h-[44px] flex items-center justify-center rounded-full">
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Tab switcher */}
      <div className="px-[22px] pb-[8px]">
        <div className="flex bg-secondary rounded-full p-[3px]">
          {[
            { key: "product" as const, label: "San pham" },
            { key: "manage" as const, label: "Quan ly" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-[8px] rounded-full text-sm font-semibold leading-5 transition-colors ${
                activeTab === tab.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "product" ? (
        <TabSanPham
          router={router}
          balanceHidden={balanceHidden}
          setBalanceHidden={setBalanceHidden}
          showO1={showO1} setShowO1={setShowO1}
          showO2={showO2} setShowO2={setShowO2}
          showO3={showO3} setShowO3={setShowO3}
          showO7={showO7} setShowO7={setShowO7}
          rating={rating} setRating={setRating}
        />
      ) : (
        <TabQuanLy router={router} />
      )}

      {/* Fixed bottom buttons */}
      <div className="absolute bottom-[21px] inset-x-0 bg-secondary px-[22px] pb-[13px] pt-[12px]">
        <ButtonGroup
          layout="horizontal"
          primaryLabel="Nap tien"
          secondaryLabel="Rut tien"
          primaryProps={{ onClick: () => router.push("/sinhloi/deposit-withdraw?tab=deposit") }}
          secondaryProps={{
            onClick: () => {
              if (isZeroBalance) {
                setShowO7(true)
              } else {
                router.push("/sinhloi/deposit-withdraw?tab=withdraw")
              }
            },
          }}
        />
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none z-10">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
