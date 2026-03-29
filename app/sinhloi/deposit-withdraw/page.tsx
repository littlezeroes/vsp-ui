"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Delete, Info } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { InformMessage } from "@/components/ui/inform-message"
import {
  SINHLOI_CONFIG,
  MOCK_USER,
  MOCK_BALANCE,
  QUICK_AMOUNTS,
  formatVND,
  calculateInterest,
} from "../data"

/* ── Constants ─────────────────────────────────────────────────── */
const MIN_AMOUNT = 10_000
const MOCK_MONTHLY_DEPOSITED = 15_000_000 // amount already deposited this month

/* ── Helpers ───────────────────────────────────────────────────── */
function formatChip(value: number): string {
  if (value >= 1_000_000) return `${value / 1_000_000}tr`
  return `${value / 1_000}k`
}

/* ── Tab Switcher (pill toggle) — BIDV pattern ─────────────────── */
function TabSwitcher({
  active,
  onSwitch,
}: {
  active: "deposit" | "withdraw"
  onSwitch: (tab: "deposit" | "withdraw") => void
}) {
  return (
    <div className="flex items-center justify-center py-[8px]">
      <div className="flex items-center bg-secondary rounded-full p-[3px]">
        <button
          type="button"
          onClick={() => onSwitch("deposit")}
          className={`px-[16px] py-[6px] rounded-full text-sm font-semibold leading-5 transition-colors ${
            active === "deposit"
              ? "bg-foreground text-background"
              : "text-foreground"
          }`}
        >
          Nap tien
        </button>
        <button
          type="button"
          onClick={() => onSwitch("withdraw")}
          className={`px-[16px] py-[6px] rounded-full text-sm font-semibold leading-5 transition-colors ${
            active === "withdraw"
              ? "bg-foreground text-background"
              : "text-foreground"
          }`}
        >
          Rut tien
        </button>
      </div>
    </div>
  )
}

/* ── Custom Numpad — BIDV pattern ──────────────────────────────── */
function Numpad({ onInput, disabled }: { onInput: (key: string) => void; disabled?: boolean }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "backspace"]
  return (
    <div className="grid grid-cols-3">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          disabled={disabled}
          onClick={() => onInput(key)}
          className="h-[52px] flex items-center justify-center text-[20px] font-semibold text-foreground active:bg-secondary rounded-[8px] transition-colors disabled:opacity-40"
        >
          {key === "backspace" ? (
            <Delete size={24} className="text-foreground" />
          ) : (
            key
          )}
        </button>
      ))}
    </div>
  )
}

/* ── S7: Nap/Rut tien — BIDV deposit pattern ──────────────────── */
export default function DepositWithdrawPage() {
  return <React.Suspense fallback={null}><DepositWithdrawContent /></React.Suspense>
}

function DepositWithdrawContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "deposit"

  const [activeTab, setActiveTab] = React.useState<"deposit" | "withdraw">(initialTab as "deposit" | "withdraw")
  const [amount, setAmount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)

  const isDeposit = activeTab === "deposit"
  const walletBalance = MOCK_USER.walletBalance
  const sinhloiBalance = MOCK_BALANCE.balance
  const { maxBalance, dailyWithdrawLimit, interestRate, monthlyDepositLimit } = SINHLOI_CONFIG

  // Monthly remaining limit
  const monthlyRemaining = monthlyDepositLimit - MOCK_MONTHLY_DEPOSITED

  // Validation — per decisions.md: min 10K, monthly limit, max balance
  const getError = (): string | undefined => {
    if (amount === 0) return undefined
    if (amount < MIN_AMOUNT) return "So tien toi thieu la 10.000d"

    if (isDeposit) {
      if (amount > walletBalance) return "So du vi khong du"
      if (amount + sinhloiBalance > maxBalance) {
        const remaining = maxBalance - sinhloiBalance
        return `Vuot han muc toi da 100.000.000d. Co the nap them: ${remaining.toLocaleString("vi-VN")}d`
      }
      if (amount > monthlyRemaining) {
        return `Da dat han muc nap thang. Han muc con lai: ${monthlyRemaining.toLocaleString("vi-VN")}d`
      }
    } else {
      if (amount > sinhloiBalance) return "So du sinh loi khong du"
      if (amount > dailyWithdrawLimit) {
        return `Vuot han muc rut ${dailyWithdrawLimit.toLocaleString("vi-VN")}d/ngay`
      }
    }
    return undefined
  }

  const error = getError()
  const isValid = amount >= MIN_AMOUNT && !error

  // Tiered auth per decisions.md: Nap <= 5M → skip auth, Nap > 5M → OTP, Rut → always OTP
  const handleContinue = () => {
    if (!isValid) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push(`/sinhloi/confirm-tx?type=${activeTab}&amount=${amount}`)
    }, 500)
  }

  const handleAmountInput = (digit: string) => {
    if (digit === "backspace") {
      setAmount((prev) => Math.floor(prev / 10))
    } else if (digit === "000") {
      setAmount((prev) => {
        const next = prev * 1000
        return next > 999_999_999 ? prev : next
      })
    } else {
      setAmount((prev) => {
        const next = prev * 10 + parseInt(digit)
        return next > 999_999_999 ? prev : next
      })
    }
  }

  const handleTabSwitch = (tab: "deposit" | "withdraw") => {
    setActiveTab(tab)
    setAmount(0)
  }

  const handleWithdrawAll = () => {
    const maxWithdraw = Math.min(sinhloiBalance, dailyWithdrawLimit)
    setAmount(maxWithdraw)
  }

  const estimatedInterestYear = calculateInterest(amount, interestRate)
  const estimatedInterestDay = Math.round(estimatedInterestYear / 365)
  const estimatedInterestMonth = Math.round(estimatedInterestYear / 12)

  const isWalletEmpty = isDeposit && walletBalance === 0

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header: default variant with back arrow */}
      <Header
        variant="default"
        leading={
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Tab switcher — BIDV pill pattern */}
      <TabSwitcher active={activeTab} onSwitch={handleTabSwitch} />

      <div className="flex-1 flex flex-col pb-[100px]">
        {/* Wallet empty warning */}
        {isWalletEmpty && (
          <div className="px-[22px] pt-[12px]">
            <InformMessage
              hierarchy="primary"
              icon={<Info size={20} />}
              body="So du vi khong du. Nap tien vao vi truoc."
              actionLabel="Nap vi"
              onAction={() => router.push("/")}
            />
          </div>
        )}

        {/* Balance source display — centered */}
        <div className="px-[22px] pt-[16px] flex justify-center">
          <p className="text-sm font-normal leading-5 text-foreground-secondary">
            {isDeposit ? "Tu Vi V-Smart Pay" : "Den Vi V-Smart Pay"}{" "}
            <span className="font-bold text-foreground-secondary">
              {formatVND(isDeposit ? walletBalance : sinhloiBalance)}
            </span>
          </p>
        </div>

        {/* Monthly limit display (deposit only) — per decisions.md C3 */}
        {isDeposit && (
          <div className="px-[22px] pt-[4px] flex justify-center">
            <p className="text-xs font-normal leading-4 text-foreground-secondary">
              Han muc con lai thang nay: {monthlyRemaining.toLocaleString("vi-VN")}d
            </p>
          </div>
        )}

        {/* Amount display — BIDV big amount center */}
        <div className="px-[22px] pt-[24px] flex flex-col items-center">
          <div className="flex items-center gap-[2px]">
            <p className="text-[40px] font-bold tabular-nums text-foreground leading-tight">
              {amount === 0 ? "0" : amount.toLocaleString("vi-VN")}d
            </p>
            {/* Blue cursor line */}
            <div className="w-[2px] h-[36px] bg-info animate-pulse rounded-full" />
          </div>
          {error && (
            <p className="text-xs font-normal leading-5 text-danger mt-[4px] text-center px-[16px]">{error}</p>
          )}
        </div>

        {/* Quick amount chips — BIDV pattern */}
        <div className="pt-[24px]">
          <div className="px-[22px]">
            <div className="flex gap-[8px] justify-center flex-wrap">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`px-[16px] py-[8px] rounded-full text-sm font-semibold leading-5 transition-colors ${
                    amount === val
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {formatChip(val)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Withdraw all link */}
        {!isDeposit && (
          <div className="pt-[12px] flex justify-center">
            <button type="button" onClick={handleWithdrawAll} className="text-sm font-semibold text-success">
              Rut tat ca
            </button>
          </div>
        )}

        {/* Interest estimate info — per spec: estimated gain/loss */}
        {amount > 0 && !error && (
          <div className="px-[22px] pt-[12px]">
            {isDeposit ? (
              <div className="flex flex-col items-center gap-[2px]">
                <p className="text-sm text-foreground-secondary text-center">
                  Uoc tinh lai them: <span className="text-success font-semibold">+{estimatedInterestYear.toLocaleString("vi-VN")}d/nam</span>
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-[2px]">
                <p className="text-sm text-foreground-secondary text-center">
                  Lai bi giam uoc tinh: <span className="text-danger font-semibold">-{estimatedInterestYear.toLocaleString("vi-VN")}d/nam</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Withdraw all warning */}
        {!isDeposit && amount > 0 && amount === sinhloiBalance && (
          <div className="px-[22px] pt-[8px]">
            <p className="text-xs text-warning text-center">
              Ban se mat tien lai hom nay: {estimatedInterestDay.toLocaleString("vi-VN")}d
            </p>
          </div>
        )}

        {/* Custom Numpad — BIDV pattern */}
        <div className="pt-[32px] mt-auto">
          <div className="px-[22px]">
            <Numpad onInput={handleAmountInput} disabled={isWalletEmpty} />
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="absolute bottom-0 inset-x-0 bg-background px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isValid || loading || isWalletEmpty}
          isLoading={loading}
          onClick={handleContinue}
        >
          Tiep tuc
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      <Dialog
        open={networkDialog}
        onClose={() => setNetworkDialog(false)}
        title="Khong co ket noi mang"
        description="Vui long kiem tra Internet va thu lai"
        primaryLabel="Thu lai"
        secondaryLabel="Dong"
        footerProps={{
          primaryProps: { onClick: () => setNetworkDialog(false) },
          secondaryProps: { onClick: () => setNetworkDialog(false) },
        }}
      />
    </div>
  )
}
