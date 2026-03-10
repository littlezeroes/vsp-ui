"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, Lock } from "lucide-react"
import { ItemList, ItemListItem } from "@/components/ui/item-list"

/* ── PIN Dots ──────────────────────────────────────────────────── */
function PinDots({ filled, total = 6, error }: { filled: number; total?: number; error?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[12px]">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-[14px] h-[14px] rounded-full transition-colors ${
            error
              ? i < filled
                ? "bg-danger"
                : "border-2 border-danger"
              : i < filled
              ? "bg-foreground"
              : "border-2 border-border"
          }`}
        />
      ))}
    </div>
  )
}

/* ── Numpad ───────────────────────────────────────────────────── */
function Numpad({ onKey, disabled }: { onKey: (key: string) => void; disabled?: boolean }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"]
  return (
    <div className="grid grid-cols-3 gap-0">
      {keys.map((key, idx) =>
        key === "" ? (
          <div key={idx} className="h-[52px]" />
        ) : (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onKey(key)}
            className="h-[52px] flex items-center justify-center text-xl font-semibold leading-7 text-foreground active:bg-secondary transition-colors disabled:opacity-40"
          >
            {key}
          </button>
        )
      )}
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
function TransferConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "review"

  const getPinFilled = () => {
    switch (state) {
      case "pin-typing": return 3
      case "pin-filled": return 6
      case "pin-error": return 0
      case "pin-locked": return 0
      default: return 0
    }
  }

  const isLoading = state === "loading" || state === "pin-filled"
  const isPinError = state === "pin-error"
  const isPinLocked = state === "pin-locked"

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Status bar */}
      <div className="w-full shrink-0 h-[44px]" aria-hidden="true" />

      {/* Sheet handle */}
      <div className="w-full flex justify-center py-[8px]">
        <div className="w-9 h-[6px] rounded-full bg-grey-200" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Amount */}
        <div className="flex flex-col items-center pt-[16px] pb-[24px]">
          <p className="text-sm font-normal leading-5 text-foreground-secondary">Số tiền chuyển</p>
          <p className="text-[28px] font-bold leading-[36px] tracking-[-0.3px] text-foreground mt-[4px]">
            100.000 ₫
          </p>
        </div>

        {/* Confirm detail card */}
        <div className="mx-[22px] bg-secondary rounded-[28px] overflow-hidden">
          <div className="px-[20px] py-[16px]">
            <ItemList>
              <ItemListItem
                label="Người nhận"
                metadata="LÊ VĂN HÙNG"
                divider
              />
              <ItemListItem
                label="SĐT"
                metadata="0987 654 321"
                divider
              />
              <ItemListItem
                label="Loại"
                metadata="Ví → Ví"
                divider
              />
              <ItemListItem
                label="Nội dung"
                metadata="Chuyển tiền"
                divider
              />
              <ItemListItem
                label="Phí"
                metadata="Miễn phí"
              />
            </ItemList>
          </div>
        </div>

        {/* PIN section */}
        <div className="pt-[32px] px-[22px]">
          <div className="flex flex-col items-center gap-[16px]">
            <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center">
              <Lock size={18} className="text-foreground" />
            </div>
            <p className="text-sm font-semibold leading-5 text-foreground">Nhập mã PIN</p>

            <PinDots filled={getPinFilled()} error={isPinError} />

            {/* Error messages */}
            {isPinError && (
              <p className="text-sm font-normal leading-5 text-danger text-center">
                PIN sai, còn 2 lần thử
              </p>
            )}
            {isPinLocked && (
              <div className="flex flex-col items-center gap-[4px]">
                <p className="text-sm font-semibold leading-5 text-danger text-center">
                  Tài khoản tạm khóa
                </p>
                <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                  Bạn đã nhập sai PIN quá nhiều lần. Vui lòng thử lại sau 30 phút.
                </p>
              </div>
            )}

            {/* Loading spinner */}
            {isLoading && (
              <div className="flex items-center gap-[8px]">
                <Loader2 size={20} className="animate-spin text-foreground" />
                <p className="text-sm font-normal leading-5 text-foreground-secondary">Đang xử lý...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Numpad */}
      {!isPinLocked && (
        <div className="shrink-0 pb-[34px]">
          <Numpad
            onKey={() => {}}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Locked: back to home CTA */}
      {isPinLocked && (
        <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full h-12 rounded-full bg-foreground text-background font-semibold text-md leading-md"
          >
            Về trang chủ
          </button>
        </div>
      )}

      {/* Loading overlay */}
      {state === "loading" && (
        <div className="absolute inset-0 bg-overlay flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-[12px]">
            <Loader2 size={40} className="animate-spin text-background" />
            <p className="text-md font-semibold leading-6 text-background">Đang xử lý giao dịch...</p>
          </div>
        </div>
      )}

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function TransferConfirmPage() {
  return (
    <React.Suspense fallback={null}>
      <TransferConfirmContent />
    </React.Suspense>
  )
}
