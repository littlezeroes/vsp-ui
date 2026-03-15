"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Shield, Fingerprint, Check, Lock } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"

/* ── PIN Cell ──────────────────────────────────────────────────── */
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

/* ── Page Content ──────────────────────────────────────────────── */
function UnlinkAuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "default"

  const [pin, setPin] = React.useState(
    state === "pin-success" ? "123456"
      : state === "pin-typing" ? "123"
      : ""
  )
  const [pinError, setPinError] = React.useState<string | null>(
    state === "pin-error-1" ? "Mã PIN không đúng. Bạn còn 4 lần thử."
      : state === "pin-error-2" ? "Mã PIN không đúng. Bạn còn 3 lần thử."
      : null
  )
  const [lockedDialog, setLockedDialog] = React.useState(state === "pin-locked")

  const PIN_STATES = ["pin-typing", "pin-success", "pin-error-1", "pin-error-2"]
  const isPinView = PIN_STATES.includes(state)
  const isLoading = state === "loading"

  // Auto-submit when 6 digits entered
  React.useEffect(() => {
    if (pin.length === 6 && state !== "pin-success" && state !== "pin-error-1" && state !== "pin-error-2") {
      setTimeout(() => {
        router.push("/bidv-link/unlink-waiting")
      }, 800)
    }
  }, [pin, router, state])

  // biometric-success auto-navigates
  React.useEffect(() => {
    if (state === "biometric-success") {
      const t = setTimeout(() => router.push("/bidv-link/unlink-waiting"), 1500)
      return () => clearTimeout(t)
    }
  }, [state, router])

  const handleDigit = (digit: string) => {
    if (digit === "backspace") {
      setPin((prev) => prev.slice(0, -1))
      setPinError(null)
    } else if (pin.length < 6) {
      setPin((prev) => prev + digit)
      setPinError(null)
    }
  }

  const handleConfirm = () => {
    router.push("/bidv-link/unlink-auth?state=biometric-prompt")
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header — large-title variant, icon-only NavBar */}
      <Header
        variant="large-title"
        largeTitle="Hủy liên kết"
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

      <div className="flex-1 overflow-y-auto">
        {/* Summary card */}
        <div className="pt-[32px]">
          <div className="px-[22px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[24px]">
              {/* Bank logo + info */}
              <div className="flex items-center gap-[12px] mb-[16px]">
                <div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center shrink-0">
                  <Shield size={22} className="text-foreground" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-sm font-semibold leading-5 text-foreground">BIDV</p>
                  <p className="text-xs font-normal leading-4 text-foreground-secondary">****1234</p>
                </div>
              </div>
              {/* Action label */}
              <div className="border-t border-border pt-[16px]">
                <p className="text-sm font-semibold leading-5 text-danger">Hủy liên kết ngân hàng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning message */}
        <div className="pt-[32px]">
          <div className="px-[22px]">
            <p className="text-sm font-normal leading-5 text-foreground-secondary">
              Sau khi hủy liên kết, bạn sẽ không thể nạp/rút tiền qua tài khoản ngân hàng này. Bạn có thể liên kết lại bất cứ lúc nào.
            </p>
          </div>
        </div>

        {/* Conditional: PIN entry view or auth prompt */}
        {isPinView ? (
          <>
            {/* PIN input */}
            <div className="pt-[32px]">
              <div className="px-[22px] flex flex-col items-center">
                <p className="text-sm font-semibold leading-5 text-foreground mb-[16px]">Nhập mã PIN</p>
                <div className="flex gap-[8px]">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <PinCell key={i} filled={i < pin.length} error={!!pinError} />
                  ))}
                </div>
                {pinError && (
                  <p className="text-xs font-normal leading-5 text-danger mt-[8px]">{pinError}</p>
                )}
                {state === "pin-success" && (
                  <div className="flex items-center gap-[6px] mt-[8px]">
                    <Check size={14} className="text-success" />
                    <p className="text-xs font-normal leading-5 text-success">Xác thực thành công</p>
                  </div>
                )}
              </div>
            </div>

            {/* Numpad */}
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
          </>
        ) : (
          <>
            {/* Biometric prompt state */}
            {state === "biometric-prompt" && (
              <div className="pt-[32px]">
                <div className="px-[22px] flex flex-col items-center">
                  <div className="w-[64px] h-[64px] rounded-full bg-secondary flex items-center justify-center mb-[16px]">
                    <Fingerprint size={32} className="text-foreground" />
                  </div>
                  <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                    Xác thực sinh trắc học để tiếp tục
                  </p>
                </div>
              </div>
            )}

            {/* Biometric success */}
            {state === "biometric-success" && (
              <div className="pt-[32px]">
                <div className="px-[22px] flex flex-col items-center">
                  <div className="w-[64px] h-[64px] rounded-full bg-success/10 flex items-center justify-center mb-[16px]">
                    <Check size={32} className="text-success" />
                  </div>
                  <p className="text-sm font-normal leading-5 text-success text-center">
                    Xác thực thành công. Đang xử lý...
                  </p>
                </div>
              </div>
            )}

            {/* Biometric fail */}
            {state === "biometric-fail" && (
              <div className="pt-[32px]">
                <div className="px-[22px] flex flex-col items-center">
                  <div className="w-[64px] h-[64px] rounded-full bg-danger/10 flex items-center justify-center mb-[16px]">
                    <Fingerprint size={32} className="text-danger" />
                  </div>
                  <p className="text-sm font-normal leading-5 text-danger text-center mb-[16px]">
                    Xác thực sinh trắc học thất bại
                  </p>
                  <Button
                    variant="secondary"
                    size="48"
                    onClick={() => router.push("/bidv-link/unlink-auth?state=pin-typing")}
                  >
                    Dùng mã PIN
                  </Button>
                </div>
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="pt-[32px]">
                <div className="px-[22px] flex flex-col items-center">
                  <div className="w-[48px] h-[48px] rounded-full border-4 border-border border-t-foreground animate-spin mb-[16px]" />
                  <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                    Đang xử lý...
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom CTA — only in default state */}
      {state === "default" && (
        <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={handleConfirm}
          >
            Xác thực để hủy liên kết
          </Button>
        </div>
      )}

      {/* PIN Locked Dialog */}
      <Dialog
        open={lockedDialog}
        onClose={() => setLockedDialog(false)}
        title="Tài khoản tạm khóa"
        description="Tài khoản đã bị khóa do nhập sai PIN quá nhiều lần. Vui lòng thử lại sau."
        primaryLabel="Quên mã PIN"
        secondaryLabel="Đóng"
        footerProps={{
          primaryProps: { onClick: () => setLockedDialog(false) },
          secondaryProps: { onClick: () => { setLockedDialog(false); router.push("/bidv-link/bank-management") } },
        }}
      />

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function UnlinkAuthPage() {
  return (
    <React.Suspense fallback={null}>
      <UnlinkAuthContent />
    </React.Suspense>
  )
}
