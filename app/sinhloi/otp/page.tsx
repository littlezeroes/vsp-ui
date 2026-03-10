"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, XCircle } from "lucide-react"
import { Header } from "@/components/ui/header"
import { FeedbackState } from "@/components/ui/feedback-state"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"

/* ── PIN Cell — BIDV pattern ──────────────────────────────────── */
function PinCell({ filled, error }: { filled: boolean; error: boolean }) {
  return (
    <div
      className={`w-[44px] h-[44px] rounded-[14px] border-2 flex items-center justify-center transition-all ${
        error ? "border-danger animate-shake" : filled ? "border-foreground" : "border-border"
      }`}
    >
      {filled && <div className="w-[12px] h-[12px] rounded-full bg-foreground" />}
    </div>
  )
}

/* ── S3: OTP — BIDV dark header + PinCell + Numpad pattern ────── */
export default function OtpPage() {
  return <React.Suspense fallback={null}><OtpContent /></React.Suspense>
}

function OtpContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const context = searchParams.get("context") || "activate" // activate | cancel

  const [otp, setOtp] = React.useState("")
  const [error, setError] = React.useState("")
  const [verifying, setVerifying] = React.useState(false)
  const [countdown, setCountdown] = React.useState(60)
  const [apiError, setApiError] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)

  // Countdown timer
  React.useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const handleDigit = (digit: string) => {
    if (digit === "backspace") {
      setOtp((prev) => prev.slice(0, -1))
      setError("")
    } else if (otp.length < 6) {
      const newOtp = otp + digit
      setOtp(newOtp)
      setError("")

      // Auto-submit when 6 digits entered
      if (newOtp.length === 6) {
        setVerifying(true)
        setTimeout(() => {
          if (newOtp === "123456") {
            if (context === "activate") {
              router.push("/sinhloi/result-activate?status=success")
            } else {
              router.push("/sinhloi/result-cancel?status=success")
            }
          } else {
            setVerifying(false)
            setError("Ma OTP khong dung")
            setOtp("")
          }
        }, 1200)
      }
    }
  }

  const handleResend = () => {
    setCountdown(60)
    setError("")
    setOtp("")
  }

  if (apiError) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
        <Header variant="default" title="Nhap ma OTP" showStatusBar={false} />
        <div className="flex-1 flex items-center justify-center px-[22px]">
          <FeedbackState
            icon={<XCircle size={64} className="text-danger" />}
            title="Khong the hoan tat yeu cau"
            description="He thong dang xu ly. Vui long thu lai."
            actionLabel="Thu lai"
            actionProps={{ onClick: () => setApiError(false) }}
          />
        </div>
        <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
          <Button variant="secondary" size="48" className="w-full" onClick={() => router.push("/")}>
            Ve trang chu
          </Button>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Header with back button */}
      <Header
        variant="default"
        title="Nhap ma OTP"
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

      {/* Dark header — BIDV hero pattern */}
      <div className="bg-foreground px-[22px] pt-[54px] pb-[60px] flex flex-col items-center">
        <p className="text-sm font-semibold text-background mb-[8px]">V-Smart Pay</p>
        <p className="text-[28px] font-bold leading-[34px] text-background">
          {context === "activate" ? "Kich hoat sinh loi" : "Huy sinh loi"}
        </p>
      </div>

      {/* White card overlapping dark header — BIDV pattern */}
      <div className="px-[22px] -mt-[32px]">
        <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
          <p className="text-sm text-foreground-secondary text-center mb-[4px]">
            Ma OTP da duoc gui den so dien thoai cua ban
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* PinCell OTP — BIDV pattern */}
        <div className="pt-[32px]">
          <div className="px-[22px] flex flex-col items-center">
            <p className="text-sm font-semibold leading-5 text-foreground mb-[16px]">Nhap ma OTP</p>
            <div className="flex gap-[8px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <PinCell key={i} filled={i < otp.length} error={!!error} />
              ))}
            </div>
            {error && (
              <p className="text-xs font-normal leading-5 text-danger mt-[8px]">{error}</p>
            )}
            {verifying && (
              <p className="text-xs font-normal leading-5 text-foreground-secondary mt-[8px]">Dang xac thuc...</p>
            )}
          </div>
        </div>

        {/* Countdown / Resend */}
        <div className="pt-[16px] flex justify-center">
          {countdown > 0 ? (
            <p className="text-sm text-foreground-secondary">
              Gui lai OTP sau {countdown}s
            </p>
          ) : (
            <button type="button" onClick={handleResend} className="text-sm font-semibold text-success">
              Gui lai OTP
            </button>
          )}
        </div>

        {/* Numpad — BIDV pattern */}
        <div className="pt-[32px]">
          <div className="px-[22px]">
            <div className="grid grid-cols-3 gap-[1px]">
              {["1","2","3","4","5","6","7","8","9","","0","backspace"].map((key) => (
                <button
                  key={key || "empty"}
                  type="button"
                  disabled={!key || verifying}
                  onClick={() => key && handleDigit(key)}
                  className={`h-[52px] flex items-center justify-center text-lg font-semibold text-foreground active:bg-background rounded-[8px] transition-colors ${!key ? "invisible" : ""}`}
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
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* Network dialog */}
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
