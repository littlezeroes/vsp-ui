"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Delete } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { SINHLOI_CONFIG, MOCK_USER, MOCK_BALANCE, QUICK_AMOUNTS, formatVND, calculateInterest } from "../data"

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
function Numpad({ onInput }: { onInput: (key: string) => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "backspace"]
  return (
    <div className="grid grid-cols-3">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onInput(key)}
          className="h-[52px] flex items-center justify-center text-[20px] font-semibold text-foreground active:bg-secondary rounded-[8px] transition-colors"
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
  const { maxBalance, dailyWithdrawLimit, interestRate } = SINHLOI_CONFIG

  // Validation
  const getError = () => {
    if (amount === 0) return undefined
    if (isDeposit && amount > walletBalance) return "So tien nap vuot qua so du nguon tien"
    if (isDeposit && amount + sinhloiBalance > maxBalance) return "So du vi sinh loi vuot qua 100 trieu VND"
    if (!isDeposit && amount > sinhloiBalance) return "So tien rut vuot qua so du nguon tien"
    if (!isDeposit && amount > dailyWithdrawLimit) return "So tien rut vuot qua han muc"
    return undefined
  }

  const error = getError()
  const isValid = amount > 0 && !error

  const handleContinue = () => {
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
        return next > 999999999 ? prev : next
      })
    } else {
      setAmount((prev) => {
        const next = prev * 10 + parseInt(digit)
        return next > 999999999 ? prev : next
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

  const estimatedInterest = calculateInterest(amount, interestRate)

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
        {/* Balance display — centered */}
        <div className="px-[22px] pt-[16px] flex justify-center">
          <p className="text-sm font-normal leading-5 text-foreground-secondary">
            {isDeposit ? "Tu Vi V-Smart Pay" : "Den Vi V-Smart Pay"}{" "}
            <span className="font-bold text-foreground-secondary">
              {formatVND(isDeposit ? walletBalance : sinhloiBalance)}
            </span>
          </p>
        </div>

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
            <p className="text-xs font-normal leading-5 text-danger mt-[4px]">{error}</p>
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

        {/* Interest info */}
        {amount > 0 && (
          <div className="px-[22px] pt-[12px]">
            {isDeposit ? (
              <p className="text-sm text-foreground-secondary text-center">
                Lai du kien cho so tien nay: <span className="text-success">+{formatVND(estimatedInterest)}/nam</span>
              </p>
            ) : (
              <p className="text-sm text-foreground-secondary text-center">
                Ban co the mat so tien lai nam du kien: <span className="text-danger">-{formatVND(estimatedInterest)}</span>
              </p>
            )}
          </div>
        )}

        {/* Custom Numpad — BIDV pattern */}
        <div className="pt-[32px] mt-auto">
          <div className="px-[22px]">
            <Numpad onInput={handleAmountInput} />
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="absolute bottom-0 inset-x-0 bg-background px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isValid || loading}
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
