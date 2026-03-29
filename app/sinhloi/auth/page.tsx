"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Delete } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { ToastBar } from "@/components/ui/toast-bar"
import { formatVND } from "../data"

/* ── OTP Cell ─────────────────────────────────────────────────── */
function OtpCell({ value, active, error }: { value?: string; active: boolean; error: boolean }) {
  return (
    <div
      className={`w-[44px] h-[44px] rounded-[14px] border-2 flex items-center justify-center transition-all ${
        error ? "border-danger" : active ? "border-foreground" : value ? "border-foreground" : "border-border"
      }`}
    >
      {value ? (
        <span className="text-lg font-bold text-foreground">{value}</span>
      ) : active ? (
        <div className="w-[2px] h-[20px] bg-foreground animate-pulse rounded-full" />
      ) : null}
    </div>
  )
}

/* ── S9: Auth OTP — per decisions.md tiered auth ───────────────── */
export default function AuthPage() {
  return <React.Suspense fallback={null}><AuthContent /></React.Suspense>
}

function AuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "deposit"
  const amount = parseInt(searchParams.get("amount") || "0", 10)
  const context = searchParams.get("context") // "cancel" for cancel flow

  const [otp, setOtp] = React.useState("")
  const [otpError, setOtpError] = React.useState<string | null>(null)
  const [attempts, setAttempts] = React.useState(0)
  const [verifying, setVerifying] = React.useState(false)
  const [countdown, setCountdown] = React.useState(60)
  const [resending, setResending] = React.useState(false)
  const [locked, setLocked] = React.useState(false)
  const [resendCount, setResendCount] = React.useState(0)
  const [networkDialog, setNetworkDialog] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const isDeposit = type === "deposit"
  const isCancel = context === "cancel"
  const serviceTitle = isCancel ? "Huy dang ky sinh loi" : isDeposit ? "Nap tien sinh loi" : "Rut tien sinh loi"
  const maskedPhone = "091****678"

  // Countdown timer
  React.useEffect(() => {
    if (countdown <= 0 || locked) return
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return 0
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown, locked])

  const handleDigit = (digit: string) => {
    if (locked || verifying) return

    if (digit === "backspace") {
      setOtp((prev) => prev.slice(0, -1))
      setOtpError(null)
      return
    }

    if (otp.length >= 6) return

    const newOtp = otp + digit
    setOtp(newOtp)
    setOtpError(null)

    // Auto-submit when 6 digits entered
    if (newOtp.length === 6) {
      setVerifying(true)
      setTimeout(() => {
        // Mock: "123456" is correct OTP
        if (newOtp === "123456") {
          // Success — navigate to result
          if (isCancel) {
            router.push("/sinhloi/result-cancel?status=success")
          } else {
            router.push(`/sinhloi/result-tx/${type}?amount=${amount}&status=success`)
          }
        } else {
          const newAttempts = attempts + 1
          setAttempts(newAttempts)
          setVerifying(false)
          setOtp("")

          if (newAttempts >= 3) {
            setLocked(true)
            setOtpError("Ban da thu qua nhieu lan. Vui long thu lai sau 5 phut.")
          } else if (newAttempts === 2) {
            setOtpError("Ma OTP khong chinh xac. Ban con 1 lan thu.")
          } else {
            setOtpError("Ma OTP khong chinh xac. Vui long thu lai.")
          }
        }
      }, 800)
    }
  }

  const handleResend = () => {
    if (resending || locked) return

    const newResendCount = resendCount + 1
    if (newResendCount > 3) {
      setLocked(true)
      setOtpError("Ban da thu qua nhieu lan. Vui long thu lai sau 5 phut.")
      return
    }

    setResending(true)
    setResendCount(newResendCount)

    setTimeout(() => {
      setResending(false)
      setCountdown(60)
      setOtp("")
      setOtpError(null)
      setToastMessage("Da gui lai ma OTP")
      setTimeout(() => setToastMessage(null), 3000)
    }, 1000)
  }

  const isExpired = countdown === 0 && !locked

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Xac thuc OTP"
        showStatusBar={false}
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

      {/* Dark header — amount hero (BIDV pattern) */}
      <div className="bg-foreground px-[22px] pt-[54px] pb-[60px] flex flex-col items-center">
        <p className="text-sm font-semibold text-background mb-[8px]">{serviceTitle}</p>
        {!isCancel && (
          <p className="text-[28px] font-bold leading-[34px] text-background">
            {formatVND(amount)}
          </p>
        )}
      </div>

      {/* White card overlapping dark header */}
      <div className="px-[22px] -mt-[32px]">
        <div className="bg-background rounded-[28px] px-[20px] py-[16px] shadow-sm">
          <p className="text-sm text-foreground-secondary text-center">
            Nhap ma OTP da gui den {maskedPhone}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* OTP input — 6 digit cells */}
        <div className="pt-[32px]">
          <div className="px-[22px] flex flex-col items-center">
            <div className="flex gap-[8px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <OtpCell
                  key={i}
                  value={otp[i]}
                  active={i === otp.length && !locked && !verifying}
                  error={!!otpError}
                />
              ))}
            </div>

            {/* Error message */}
            {otpError && (
              <p className="text-xs font-normal leading-5 text-danger mt-[8px] text-center">{otpError}</p>
            )}

            {/* Verifying indicator */}
            {verifying && (
              <p className="text-xs font-normal leading-5 text-foreground-secondary mt-[8px]">Dang xac thuc...</p>
            )}

            {/* Countdown / Resend / Expired */}
            <div className="mt-[16px]">
              {locked ? (
                <p className="text-xs text-foreground-secondary text-center">Vui long thu lai sau 5 phut</p>
              ) : isExpired ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="text-sm font-semibold text-success"
                >
                  {resending ? "Dang gui..." : "Gui lai ma OTP"}
                </button>
              ) : (
                <p className="text-xs text-foreground-secondary">
                  Gui lai sau {countdown}s
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Numpad */}
        <div className="pt-[32px]">
          <div className="px-[22px]">
            <div className="grid grid-cols-3 gap-[1px]">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "backspace"].map((key) => (
                <button
                  key={key || "empty"}
                  type="button"
                  disabled={!key || locked || verifying}
                  onClick={() => key && handleDigit(key)}
                  className={`h-[52px] flex items-center justify-center text-lg font-semibold text-foreground active:bg-background rounded-[8px] transition-colors ${!key ? "invisible" : ""} disabled:opacity-40`}
                >
                  {key === "backspace" ? (
                    <Delete size={24} className="text-foreground" />
                  ) : (
                    key
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="absolute top-[100px] inset-x-[22px] z-50">
          <ToastBar title={toastMessage} />
        </div>
      )}

      {/* Network Dialog */}
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

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
