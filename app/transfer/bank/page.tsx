"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronDown, Check, Loader2, AlertTriangle } from "lucide-react"
import { Header } from "@/components/ui/header"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"

/* ── Mock Data ──────────────────────────────────────────────── */
const SAVED_RECIPIENTS = [
  { id: 1, name: "NGUYEN VAN MANH", stk: "19038291832", bank: "Techcombank", bankShort: "TCB", avatar: "NM" },
  { id: 2, name: "TRẦN THỊ LAN", stk: "1023456789", bank: "Vietcombank", bankShort: "VCB", avatar: "TL" },
]

const BANKS = [
  { name: "Techcombank", short: "TCB", color: "#E31837" },
  { name: "Vietcombank", short: "VCB", color: "#006838" },
  { name: "BIDV", short: "BIDV", color: "#0033A0" },
  { name: "VietinBank", short: "CTG", color: "#003b7a" },
  { name: "MB Bank", short: "MB", color: "#004A93" },
  { name: "ACB", short: "ACB", color: "#1E4A9C" },
  { name: "Sacombank", short: "STB", color: "#005BAA" },
  { name: "TPBank", short: "TPB", color: "#6D2C8E" },
]

/* ── Bank Logo ──────────────────────────────────────────────── */
function BankLogo({ short, color }: { short: string; color: string }) {
  return (
    <div
      className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${color}15` }}
    >
      <span className="text-[10px] font-bold" style={{ color }}>{short}</span>
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
function TransferBankContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "default"
  const savedId = searchParams.get("saved")

  const isSaved = state === "saved" || !!savedId
  const isTyping = state === "typing"
  const isAutoDetected = state === "auto-detected"
  const isResolved = state === "resolved" || isSaved
  const isManualBank = state === "manual-bank"
  const isNotFound = state === "not-found"
  const isErrorLookup = state === "error-lookup"
  const isErrorFormat = state === "error-format"

  const savedRecipient = isSaved
    ? SAVED_RECIPIENTS.find((r) => r.id === Number(savedId)) ?? SAVED_RECIPIENTS[0]
    : null

  const getStkValue = () => {
    if (isSaved && savedRecipient) return savedRecipient.stk
    switch (state) {
      case "typing": return "19038"
      case "auto-detected": return "19038291832"
      case "resolved": return "19038291832"
      case "not-found": return "99999999999"
      case "error-lookup": return "19038291832"
      case "error-format": return "123"
      default: return ""
    }
  }

  const getStkError = () => {
    if (isNotFound) return "Số tài khoản không tồn tại"
    if (isErrorFormat) return "Số tài khoản không hợp lệ"
    return undefined
  }

  const getBankValue = () => {
    if (isSaved && savedRecipient) return savedRecipient.bank
    if (isAutoDetected || isResolved || isErrorLookup) return "Techcombank"
    return ""
  }

  const getNameValue = () => {
    if (isSaved && savedRecipient) return savedRecipient.name
    if (isResolved) return "NGUYEN VAN MANH"
    return ""
  }

  const showBankDetected = isAutoDetected || isResolved || isErrorLookup || isSaved
  const showNameResolved = isResolved || isSaved
  const showNameLoading = isAutoDetected
  const canContinue = isResolved || isSaved

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Đến ngân hàng"
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
        {/* ── STK Input ── */}
        <div className="pt-[4px]">
          <div className="px-[22px]">
            <TextField
              label="Số tài khoản"
              placeholder="Nhập số tài khoản"
              type="text"
              inputMode="numeric"
              value={getStkValue()}
              readOnly
              error={getStkError()}
              helpText={state === "default" ? "Hệ thống sẽ tự nhận diện ngân hàng từ STK" : undefined}
              trailingIcon={
                (isResolved || isAutoDetected) && !isNotFound && !isErrorFormat
                  ? <Check size={16} className="text-success" />
                  : undefined
              }
            />
          </div>
        </div>

        {/* ── Bank Field ── */}
        <div className="pt-[16px]">
          <div className="px-[22px]">
            {showBankDetected ? (
              /* Auto-detected bank — show as filled field */
              <div className="w-full min-h-[58px] rounded-[14px] border border-border flex items-center gap-[12px] px-[14px] py-[10px]">
                <BankLogo short="TCB" color="#E31837" />
                <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
                  <span className="text-xs font-normal leading-5 text-foreground-secondary">Ngân hàng</span>
                  <span className="text-sm font-medium leading-5 text-foreground">{getBankValue()}</span>
                </div>
                <Check size={16} className="text-success shrink-0" />
              </div>
            ) : isManualBank ? (
              /* Bank picker open state */
              <div>
                <button
                  type="button"
                  className="w-full min-h-[58px] rounded-[14px] border-[1.5px] border-brand-secondary flex items-center gap-[16px] px-[14px] py-[10px]"
                >
                  <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
                    <span className="text-xs font-normal leading-5 text-foreground-secondary">Ngân hàng</span>
                    <span className="text-sm font-medium leading-5 text-foreground-secondary">Chọn ngân hàng</span>
                  </div>
                  <ChevronDown size={16} className="text-foreground-secondary shrink-0" />
                </button>

                {/* Dropdown list */}
                <div className="mt-[8px] bg-background rounded-[14px] border border-border overflow-hidden shadow-lg">
                  {BANKS.map((bank) => (
                    <button
                      key={bank.short}
                      type="button"
                      className="w-full flex items-center gap-[12px] px-[14px] py-[12px] text-left active:bg-secondary transition-colors border-b border-border last:border-b-0"
                    >
                      <BankLogo short={bank.short} color={bank.color} />
                      <span className="text-[14px] font-medium leading-[20px] text-foreground">{bank.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Default: bank selector button */
              <button
                type="button"
                className="w-full min-h-[58px] rounded-[14px] border border-border flex items-center gap-[16px] px-[14px] py-[10px]"
              >
                <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
                  <span className="text-xs font-normal leading-5 text-foreground-secondary">Ngân hàng</span>
                  <span className="text-sm font-normal leading-5 text-grey-300">Tự động nhận diện</span>
                </div>
                <ChevronDown size={16} className="text-foreground-secondary shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* ── Name Field ── */}
        <div className="pt-[16px]">
          <div className="px-[22px]">
            {showNameLoading ? (
              <div className="w-full min-h-[58px] rounded-[14px] border border-border flex items-center gap-[12px] px-[14px] py-[10px]">
                <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
                  <span className="text-xs font-normal leading-5 text-foreground-secondary">Tên người nhận</span>
                  <div className="flex items-center gap-[8px]">
                    <Loader2 size={16} className="animate-spin text-foreground-secondary" />
                    <span className="text-sm font-normal leading-5 text-foreground-secondary">Đang xác minh...</span>
                  </div>
                </div>
              </div>
            ) : showNameResolved ? (
              <div className="w-full min-h-[58px] rounded-[14px] border border-border flex items-center gap-[16px] px-[14px] py-[10px]">
                <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
                  <span className="text-xs font-normal leading-5 text-foreground-secondary">Tên người nhận</span>
                  <span className="text-sm font-medium leading-5 text-foreground">{getNameValue()}</span>
                </div>
                <Check size={16} className="text-success shrink-0" />
              </div>
            ) : isErrorLookup ? (
              <div>
                <div className="w-full min-h-[58px] rounded-[14px] border border-warning flex items-center gap-[12px] px-[14px] py-[10px]">
                  <AlertTriangle size={20} className="text-warning shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
                    <span className="text-xs font-normal leading-5 text-foreground-secondary">Tên người nhận</span>
                    <span className="text-sm font-normal leading-5 text-warning">Không thể xác minh tên</span>
                  </div>
                </div>
                <p className="mt-[4px] px-[14px] text-xs font-normal leading-5 text-warning">
                  Không thể xác minh tên. Bạn có muốn tiếp tục?
                </p>
                <div className="mt-[12px]">
                  <TextField
                    label="Nhập tên thủ công"
                    placeholder="Nhập tên người nhận"
                    value=""
                    readOnly
                  />
                </div>
              </div>
            ) : (
              <div className="w-full min-h-[58px] rounded-[14px] border border-border flex items-center gap-[16px] px-[14px] py-[10px]">
                <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
                  <span className="text-xs font-normal leading-5 text-foreground-secondary">Tên người nhận</span>
                  <span className="text-sm font-normal leading-5 text-grey-300">Tự động hiển thị</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Save toggle ── */}
        {(canContinue) && (
          <div className="px-[22px] pt-[16px]">
            <SaveToggle checked={isSaved} />
          </div>
        )}
      </div>

      {/* ── Fixed CTA ── */}
      <div className="absolute bottom-0 inset-x-0 bg-background px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!canContinue}
          onClick={() => router.push("/transfer/amount?type=bank")}
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

export default function TransferBankPage() {
  return (
    <React.Suspense fallback={null}>
      <TransferBankContent />
    </React.Suspense>
  )
}
