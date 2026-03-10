"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Scan, Fingerprint, Lock } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { formatVND } from "../data"

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

/* ── Auth Method Option — BIDV pattern ────────────────────────── */
function AuthMethodOption({
  icon,
  label,
  selected,
  onSelect,
}: {
  icon: React.ReactNode
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-[16px] py-[14px] rounded-[14px] transition-colors ${
        selected
          ? "bg-secondary ring-2 ring-foreground"
          : "bg-secondary"
      }`}
    >
      <div className="w-[36px] h-[36px] rounded-full bg-background flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span className="text-sm font-semibold leading-5 text-foreground flex-1 text-left">{label}</span>
      <div
        className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center ${
          selected ? "border-foreground" : "border-border"
        }`}
      >
        {selected && <div className="w-[10px] h-[10px] rounded-full bg-foreground" />}
      </div>
    </button>
  )
}

/* ── S9: Auth PIN/Biometric — BIDV deposit-auth pattern ────────── */
export default function AuthPage() {
  return <React.Suspense fallback={null}><AuthContent /></React.Suspense>
}

function AuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "deposit"
  const amount = parseInt(searchParams.get("amount") || "0", 10)

  const [pin, setPin] = React.useState("")
  const [pinError, setPinError] = React.useState<string | null>(null)
  const [attempts, setAttempts] = React.useState(0)
  const [verifying, setVerifying] = React.useState(false)
  const [authMethod, setAuthMethod] = React.useState<"faceid" | "touchid" | "pin">("faceid")
  const [isPinView, setIsPinView] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)

  const isDeposit = type === "deposit"
  const serviceTitle = isDeposit ? "Nap tien sinh loi" : "Rut tien sinh loi"

  const handleDigit = (digit: string) => {
    if (digit === "backspace") {
      setPin((prev) => prev.slice(0, -1))
      setPinError(null)
    } else if (pin.length < 6) {
      const newPin = pin + digit
      setPin(newPin)
      setPinError(null)

      // Auto-submit when 6 digits entered
      if (newPin.length === 6) {
        setVerifying(true)
        setTimeout(() => {
          if (newPin === "123456") {
            router.push(`/sinhloi/result-tx/${type}?amount=${amount}&status=success`)
          } else {
            const newAttempts = attempts + 1
            setAttempts(newAttempts)
            setVerifying(false)
            setPin("")
            if (newAttempts >= 3) {
              setPinError("Tai khoan da bi khoa. Vui long lien he CSKH.")
            } else if (newAttempts === 2) {
              setPinError("PIN khong dung. Con 1 lan thu")
            } else {
              setPinError("PIN khong dung")
            }
          }
        }, 800)
      }
    }
  }

  const handleConfirm = () => {
    if (authMethod === "pin") {
      setIsPinView(true)
    } else {
      // Simulate biometric success
      router.push(`/sinhloi/result-tx/${type}?amount=${amount}&status=success`)
    }
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Xac thuc giao dich"
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
        <p className="text-[28px] font-bold leading-[34px] text-background">
          {formatVND(amount)}
        </p>
      </div>

      {/* White card overlapping dark header (BIDV pattern) */}
      <div className="px-[22px] -mt-[32px]">
        <div className="bg-background rounded-[28px] px-[20px] py-[16px] shadow-sm">
          <p className="text-sm text-foreground-secondary text-center">
            {isPinView ? "Nhap ma PIN de xac thuc" : "Chon phuong thuc xac thuc"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isPinView ? (
          <>
            {/* PIN input — BIDV pattern */}
            <div className="pt-[32px]">
              <div className="px-[22px] flex flex-col items-center">
                <p className="text-sm font-semibold leading-5 text-foreground mb-[16px]">Nhap ma PIN</p>
                <div className="flex gap-[8px]">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <PinCell key={i} filled={i < pin.length} error={!!pinError} />
                  ))}
                </div>
                {pinError && (
                  <p className="text-xs font-normal leading-5 text-danger mt-[8px]">{pinError}</p>
                )}
                {verifying && (
                  <p className="text-xs font-normal leading-5 text-foreground-secondary mt-[8px]">Dang xac thuc...</p>
                )}
              </div>
            </div>

            {/* Forgot PIN link */}
            <div className="pt-[16px] flex justify-center">
              <button type="button" className="text-sm text-foreground-secondary underline">
                Quen PIN?
              </button>
            </div>

            {/* Numpad — BIDV pattern */}
            <div className="pt-[32px]">
              <div className="px-[22px]">
                <div className="grid grid-cols-3 gap-[1px]">
                  {["1","2","3","4","5","6","7","8","9","","0","backspace"].map((key) => (
                    <button
                      key={key || "empty"}
                      type="button"
                      disabled={!key || attempts >= 3}
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
          </>
        ) : (
          <>
            {/* Auth method selection — BIDV pattern */}
            <div className="pt-[32px]">
              <div className="px-[22px]">
                <p className="text-sm font-semibold leading-5 text-foreground mb-[12px]">
                  Chon phuong thuc xac thuc
                </p>
                <div className="flex flex-col gap-[8px]">
                  <AuthMethodOption
                    icon={<Scan size={18} className="text-foreground" />}
                    label="Face ID"
                    selected={authMethod === "faceid"}
                    onSelect={() => setAuthMethod("faceid")}
                  />
                  <AuthMethodOption
                    icon={<Fingerprint size={18} className="text-foreground" />}
                    label="Touch ID"
                    selected={authMethod === "touchid"}
                    onSelect={() => setAuthMethod("touchid")}
                  />
                  <AuthMethodOption
                    icon={<Lock size={18} className="text-foreground" />}
                    label="Ma PIN"
                    selected={authMethod === "pin"}
                    onSelect={() => setAuthMethod("pin")}
                  />
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />
          </>
        )}
      </div>

      {/* Bottom CTA — only in auth method selection view */}
      {!isPinView && (
        <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={handleConfirm}
          >
            Xac nhan
          </Button>
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
