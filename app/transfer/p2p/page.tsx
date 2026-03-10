"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Loader2, Check } from "lucide-react"
import { Header } from "@/components/ui/header"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"

/* ── Mock Data ──────────────────────────────────────────────── */
const SAVED_RECIPIENTS = [
  { id: 1, name: "PHẠM VĂN NAM", phone: "0983 882 233", avatar: "PN" },
  { id: 2, name: "ĐÀO VĂN NAM", phone: "0901 232 512", avatar: "ĐN" },
]

/* ── Avatar ─────────────────────────────────────────────────── */
function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-[48px] h-[48px] rounded-full bg-secondary flex items-center justify-center font-bold text-[15px] shrink-0 text-foreground">
      {initials}
    </div>
  )
}

/* ── Resolved Card ──────────────────────────────────────────── */
function ResolvedCard({ name, phone }: { name: string; phone: string }) {
  return (
    <div className="flex items-center gap-[12px] bg-secondary rounded-[20px] px-[16px] py-[14px]">
      <Avatar initials={name.split(" ").map((w) => w[0]).join("").slice(0, 2)} />
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold leading-[22px] text-foreground">{name}</p>
        <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">{phone}</p>
      </div>
      <span className="text-[11px] font-bold px-[8px] py-[3px] rounded-full bg-[#FFF0F2] text-[#E31837]">
        Ví VSP
      </span>
    </div>
  )
}

/* ── Toggle ─────────────────────────────────────────────────── */
function SaveToggle({ checked }: { checked: boolean }) {
  return (
    <div className="flex items-center justify-between py-[12px]">
      <p className="text-[14px] font-medium leading-[20px] text-foreground">Lưu người nhận</p>
      <div
        className={`w-[44px] h-[26px] rounded-full flex items-center px-[2px] transition-colors ${
          checked ? "bg-success" : "bg-grey-300"
        }`}
      >
        <div
          className={`w-[22px] h-[22px] rounded-full bg-background shadow-sm transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
function TransferP2PContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "default"
  const savedId = searchParams.get("saved")

  const isSaved = state === "saved" || !!savedId
  const isTyping = state === "typing"
  const isResolving = state === "resolving"
  const isResolved = state === "resolved" || isSaved
  const isNotFound = state === "not-found"
  const isErrorFormat = state === "error-format"

  const getPhoneValue = () => {
    if (isSaved) {
      const saved = SAVED_RECIPIENTS.find((r) => r.id === Number(savedId)) ?? SAVED_RECIPIENTS[0]
      return saved.phone
    }
    switch (state) {
      case "typing": return "0983"
      case "resolving": return "0983 882 233"
      case "resolved": return "0983 882 233"
      case "not-found": return "0999 111 222"
      case "error-format": return "098"
      default: return ""
    }
  }

  const getError = () => {
    if (isNotFound) return "Số điện thoại chưa đăng ký ví VSP"
    if (isErrorFormat) return "Số điện thoại không hợp lệ"
    return undefined
  }

  const savedRecipient = isSaved
    ? SAVED_RECIPIENTS.find((r) => r.id === Number(savedId)) ?? SAVED_RECIPIENTS[0]
    : null

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Đến ví VSP"
        leading={
          <button
            type="button"
            onClick={() => router.push("/transfer/entry")}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[120px]">
        {/* ── Saved recipient card (skip input) ── */}
        {isSaved && savedRecipient && (
          <div className="px-[22px] pt-[4px]">
            <ResolvedCard name={savedRecipient.name} phone={savedRecipient.phone} />
            <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary mt-[12px] text-center">
              Người nhận đã lưu — chuyển đến nhập số tiền
            </p>
          </div>
        )}

        {/* ── Phone input ── */}
        {!isSaved && (
          <div className="pt-[4px]">
            <div className="px-[22px]">
              <TextField
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                type="tel"
                inputMode="numeric"
                maxLength={12}
                value={getPhoneValue()}
                readOnly
                error={getError()}
                helpText={state === "default" ? "Nhập SĐT 10 số để tìm ví VSP" : undefined}
                trailingIcon={
                  isResolved ? <Check size={16} className="text-success" /> : undefined
                }
              />
            </div>
          </div>
        )}

        {/* ── Resolving spinner ── */}
        {isResolving && (
          <div className="flex items-center justify-center gap-[8px] pt-[24px] px-[22px]">
            <Loader2 size={20} className="animate-spin text-foreground" />
            <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary">
              Đang tìm ví VSP...
            </p>
          </div>
        )}

        {/* ── Resolved card ── */}
        {isResolved && !isSaved && (
          <div className="pt-[24px] px-[22px]">
            <ResolvedCard name="PHẠM VĂN NAM" phone="0983 882 233" />
          </div>
        )}

        {/* ── Save toggle ── */}
        {(isResolved || isSaved) && (
          <div className="px-[22px] pt-[16px]">
            <SaveToggle checked={isSaved} />
          </div>
        )}

        {/* ── Not found: invite CTA ── */}
        {isNotFound && (
          <div className="flex flex-col items-center pt-[32px] px-[22px]">
            <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center mb-[12px]">
              <span className="text-[24px]">?</span>
            </div>
            <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary text-center mb-[16px]">
              Không tìm thấy ví VSP cho số điện thoại này
            </p>
            <Button variant="secondary" size="32">
              Mời đăng ký
            </Button>
          </div>
        )}
      </div>

      {/* ── Fixed CTA ── */}
      <div className="absolute bottom-0 inset-x-0 bg-background px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isResolved && !isSaved}
          onClick={() => router.push("/transfer/amount?type=p2p")}
        >
          Tiếp tục
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function TransferP2PPage() {
  return (
    <React.Suspense fallback={null}>
      <TransferP2PContent />
    </React.Suspense>
  )
}
