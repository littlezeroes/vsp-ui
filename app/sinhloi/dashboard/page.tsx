"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Info, ArrowUpRight, ArrowDownLeft, TrendingUp, ChevronLeft, FileText } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ButtonGroup } from "@/components/ui/button-group"
import { ItemListItem } from "@/components/ui/item-list"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Dialog } from "@/components/ui/dialog"
import { FeedbackState } from "@/components/ui/feedback-state"
import {
  SINHLOI_CONFIG, MOCK_BALANCE, MOCK_TRANSACTIONS, MOCK_DAILY_INTEREST,
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

/* ── S5: Dashboard — single page, no tabs ───────────────────────── */
export default function DashboardPage() {
  const router = useRouter()
  const [balanceHidden, setBalanceHidden] = React.useState(false)
  const [showO1, setShowO1] = React.useState(false)
  const [showO2, setShowO2] = React.useState(false)
  const [showO3, setShowO3] = React.useState(false)
  const [showO7, setShowO7] = React.useState(false)
  const [error, setError] = React.useState(false)

  const { balance, todayInterest, totalInterestEarned } = MOCK_BALANCE
  const { interestRate } = SINHLOI_CONFIG
  const isZeroBalance = balance === 0
  const weeklyInterest = MOCK_DAILY_INTEREST.reduce((s, d) => s + d.amount, 0)

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

      {/* Dark header — BIDV hero: balance */}
      <div className="bg-foreground px-[22px] pt-[40px] pb-[56px] flex flex-col items-center">
        <p className="text-sm font-semibold text-background/70 mb-[4px]">So du sinh loi</p>
        <div className="flex items-center gap-2">
          <p className="text-[32px] font-bold leading-[38px] tabular-nums text-background">
            {balanceHidden ? "******" : formatVND(balance)}
          </p>
          <button type="button" onClick={() => setBalanceHidden(!balanceHidden)} className="p-1">
            {balanceHidden ? <EyeOff size={18} className="text-background/50" /> : <Eye size={18} className="text-background/50" />}
          </button>
        </div>
        <p className="text-xs text-background/50 mt-[4px]">Lai suat {interestRate}%/nam</p>
      </div>

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

        {/* Intro card */}
        <div className="pt-[32px] px-[22px]">
          <button
            type="button"
            onClick={() => setShowO1(true)}
            className="w-full bg-background rounded-[28px] p-[20px] text-left shadow-sm"
          >
            <p className="text-md font-semibold text-foreground mb-1">Tim hieu co che sinh loi</p>
            <p className="text-sm text-foreground-secondary">Tien cua ban duoc su dung nhu the nao?</p>
          </button>
        </div>

        {/* Dieu khoan & Hop dong — cuoi cung */}
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
          />
        </div>
      </div>

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

      {/* O1: Co che sinh loi */}
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

      {/* O2: Tien loi hom qua */}
      <BottomSheet open={showO2} onClose={() => setShowO2(false)}>
        <div className="space-y-4 py-4">
          <p className="text-lg font-semibold text-foreground">Tien loi hom qua</p>
          <p className="text-md text-foreground">
            Day la so tien lai duoc tinh dua tren so du cuoi ngay hom qua va lai suat hien tai.
            Tien lai se duoc cong don va tra vao tai khoan cua ban moi thang.
          </p>
        </div>
      </BottomSheet>

      {/* O3: Tong tien loi */}
      <BottomSheet open={showO3} onClose={() => setShowO3(false)}>
        <div className="space-y-4 py-4">
          <p className="text-lg font-semibold text-foreground">Tong tien loi</p>
          <p className="text-md text-foreground">
            Tong so tien lai ban da nhan duoc ke tu khi kich hoat sinh loi.
            Lai duoc tra vao ngay cuoi moi thang va hien thi trong lich su giao dich.
          </p>
        </div>
      </BottomSheet>

      {/* O7: So du = 0 */}
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
    </div>
  )
}
