"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"

/* ── Types ────────────────────────────────────────────────────── */
type OtpState =
  | "waiting-otp"
  | "typing"
  | "filled"
  | "loading"
  | "error-wrong"
  | "error-expired"
  | "error-max-attempts"

/* ── OTP Cell ─────────────────────────────────────────────────── */
function OtpCell({ value, error }: { value: string; error: boolean }) {
  return (
    <div
      className={`w-[44px] h-[44px] rounded-[14px] border-2 flex items-center justify-center transition-all ${
        error ? "border-danger" : value ? "border-foreground" : "border-border"
      }`}
    >
      {value && (
        <span className="text-lg font-semibold text-foreground">{value}</span>
      )}
    </div>
  )
}

/* ── Page Content ─────────────────────────────────────────────── */
function BidvOtpContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = (searchParams.get("state") ?? "waiting-otp") as OtpState

  /* ── Derive initial OTP value from state ── */
  const initialOtp = React.useMemo(() => {
    if (state === "typing") return "385"
    if (state === "filled" || state === "loading" || state === "error-wrong") return "385241"
    return ""
  }, [state])

  const [otp, setOtp] = React.useState(initialOtp)
  const [timeLeft, setTimeLeft] = React.useState(
    state === "error-expired" ? 0 : 178 // 02:58
  )

  const isExpired = state === "error-expired" || timeLeft <= 0
  const isMaxAttempts = state === "error-max-attempts"
  const isWrongOtp = state === "error-wrong"
  const isLoading = state === "loading"
  const isFilled = otp.length === 6
  const canSubmit = isFilled && !isExpired && !isMaxAttempts && !isLoading

  /* ── Countdown timer ── */
  React.useEffect(() => {
    if (isExpired || isMaxAttempts) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isExpired, isMaxAttempts])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  /* ── Handlers ── */
  const handleDigit = (digit: string) => {
    if (digit === "backspace") {
      setOtp((prev) => prev.slice(0, -1))
    } else if (otp.length < 6) {
      setOtp((prev) => prev + digit)
    }
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    router.push("/bidv-link/bidv-otp?state=loading")
  }

  const handleResend = () => {
    setOtp("")
    setTimeLeft(178)
    router.push("/bidv-link/bidv-otp?state=waiting-otp")
  }

  /* ── Error message ── */
  const errorMessageVi = isWrongOtp
    ? "Mã OTP không đúng. Vui lòng thử lại."
    : isMaxAttempts
    ? "Bạn đã nhập sai quá số lần cho phép. Vui lòng thử lại sau."
    : isExpired
    ? "Mã OTP đã hết hạn"
    : null

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="large-title"
        largeTitle="Xác thực OTP"
        leading={
          <button
            type="button"
            onClick={() => router.push("/bidv-link/bidv-form")}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[120px]">
        {/* Info message */}
        <div className="px-[22px]">
          <p className="text-sm font-normal leading-5 text-foreground-secondary">
            BIDV đã gửi mã OTP đến số điện thoại bạn đăng ký. Vui lòng kiểm tra tin nhắn SMS hoặc ứng dụng BIDV SmartBanking.
          </p>
        </div>

        {/* OTP input */}
        <div className="pt-[32px]">
          <div className="px-[22px] flex flex-col items-center">
            <div className="flex gap-[8px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <OtpCell
                  key={i}
                  value={otp[i] ?? ""}
                  error={isWrongOtp || isMaxAttempts}
                />
              ))}
            </div>

            {/* Error message */}
            {errorMessageVi && (
              <p className="text-xs font-normal leading-5 text-danger mt-[8px] text-center">
                {errorMessageVi}
              </p>
            )}

            {/* Countdown */}
            {!isExpired && !isMaxAttempts && (
              <p className="text-sm font-normal leading-5 text-foreground-secondary mt-[16px]">
                Thời gian còn lại {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
              </p>
            )}

            {/* Resend button */}
            <button
              type="button"
              disabled={!isExpired && !isMaxAttempts}
              onClick={handleResend}
              className={`mt-[12px] text-sm font-semibold leading-5 ${
                isExpired || isMaxAttempts
                  ? "text-foreground"
                  : "text-foreground-secondary opacity-50"
              }`}
            >
              Gửi lại mã
            </button>
          </div>
        </div>

        {/* Numpad */}
        {!isMaxAttempts && (
          <div className="pt-[32px]">
            <div className="px-[22px]">
              <div className="grid grid-cols-3 gap-[1px]">
                {["1","2","3","4","5","6","7","8","9","","0","backspace"].map((key) => (
                  <button
                    key={key || "empty"}
                    type="button"
                    disabled={!key}
                    onClick={() => key && handleDigit(key)}
                    className={`h-[52px] flex items-center justify-center text-lg font-semibold text-foreground active:bg-secondary rounded-[8px] transition-colors ${!key ? "invisible" : ""}`}
                  >
                    {key === "backspace" ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                        <line x1="18" y1="9" x2="12" y2="15" />
                        <line x1="12" y1="9" x2="18" y2="15" />
                      </svg>
                    ) : key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 inset-x-0 bg-background px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!canSubmit}
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function BidvOtpPage() {
  return (
    <React.Suspense fallback={null}>
      <BidvOtpContent />
    </React.Suspense>
  )
}
