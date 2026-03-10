"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ChevronLeft, ArrowDownUp, Loader2, ShieldCheck, ScanFace, X, Search, Check } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { TextField } from "@/components/ui/text-field"

/* ── Mock Data ──────────────────────────────────────────────── */
const DANHBA_VSP = [
  { id: 1, name: "Nguyễn Minh Tuấn", phone: "0123 456 789", avatar: "NT" },
  { id: 2, name: "Lê Thị Hương", phone: "0987 654 321", avatar: "LH" },
  { id: 3, name: "Phạm Văn Nam", phone: "0983 882 233", avatar: "PN" },
  { id: 4, name: "Trần Đức Anh", phone: "0909 111 222", avatar: "TA" },
  { id: 5, name: "Vũ Hoàng Mai", phone: "0938 776 543", avatar: "VM" },
  { id: 6, name: "Đặng Thị Ngọc", phone: "0976 223 445", avatar: "ĐN" },
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

/* ── Avatar ─────────────────────────────────────────────────── */
function Avatar({ initials, size = 44 }: { initials: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 bg-secondary text-foreground"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  )
}

/* ── Save Toggle ────────────────────────────────────────────── */
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

/* ── Swap Card ───────────────────────────────────────────────── */
function SwapCard({
  from,
  to,
}: {
  from: { label: string; sublabel: string; icon: React.ReactNode }
  to: { label: string; sublabel: string; icon: React.ReactNode }
}) {
  return (
    <div className="mx-[22px] bg-secondary rounded-[28px] p-[16px] relative">
      <div className="flex items-center gap-3 pb-[12px]">
        <div className="w-[40px] h-[40px] rounded-full bg-background flex items-center justify-center shrink-0">
          {from.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-normal leading-5 text-foreground-secondary">Từ</p>
          <p className="text-sm font-semibold leading-5 text-foreground truncate">{from.label}</p>
          <p className="text-xs font-normal leading-4 text-foreground-secondary">{from.sublabel}</p>
        </div>
      </div>
      <div className="relative border-t border-border">
        <div className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-background border border-border flex items-center justify-center">
          <ArrowDownUp size={16} className="text-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-3 pt-[12px]">
        <div className="w-[40px] h-[40px] rounded-full bg-background flex items-center justify-center shrink-0">
          {to.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-normal leading-5 text-foreground-secondary">Đến</p>
          <p className="text-sm font-semibold leading-5 text-foreground truncate">{to.label}</p>
          <p className="text-xs font-normal leading-4 text-foreground-secondary">{to.sublabel}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Numpad ───────────────────────────────────────────────────── */
function Numpad({ onKey }: { onKey: (key: string) => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"]
  return (
    <div className="grid grid-cols-3 gap-0">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onKey(key)}
          className="h-[52px] flex items-center justify-center text-xl font-semibold leading-7 text-foreground active:bg-secondary transition-colors"
        >
          {key}
        </button>
      ))}
    </div>
  )
}

/* ── Logo placeholders ────────────────────────────────────────── */
function VspLogo() {
  return <span className="text-sm font-bold text-foreground">V</span>
}

function BankLogoText({ bank }: { bank: string }) {
  return <span className="text-[10px] font-bold text-foreground leading-none">{bank}</span>
}

/* ══════════════════════════════════════════════════════════════
   P2P Sheet Content — Danh bạ ví VSP
   ══════════════════════════════════════════════════════════════ */
function P2PSheetContent({ state, onSelect }: { state: string; onSelect: (name: string, phone: string) => void }) {
  const isResolving = state === "sheet-p2p-resolving"
  const isStateResolved = state === "sheet-p2p-resolved"
  const isNotFound = state === "sheet-p2p-not-found"
  const isErrorFormat = state === "sheet-p2p-error"

  const initPhone = () => {
    switch (state) {
      case "sheet-p2p-typing": return "0983"
      case "sheet-p2p-resolving": return "0983 882 233"
      case "sheet-p2p-resolved": return "0983 882 233"
      case "sheet-p2p-not-found": return "0999 111 222"
      case "sheet-p2p-error": return "098"
      default: return ""
    }
  }

  const [phone, setPhone] = useState(initPhone)
  const [contactFilter, setContactFilter] = useState("")

  const cleanPhone = phone.replace(/\s/g, "")
  const liveResolved = !isStateResolved && !isResolving && !isNotFound && !isErrorFormat && cleanPhone.length >= 10
  const isResolved = isStateResolved || liveResolved
  const resolvedName = liveResolved ? "NGUYỄN MINH TUẤN" : "PHẠM VĂN NAM"
  const resolvedPhone = liveResolved ? phone : "0983 882 233"

  /* Show phone input when user has typed something, or state-driven */
  const showInput = state.startsWith("sheet-p2p-") && state !== "sheet-p2p"

  /* Filter contacts */
  const filteredContacts = contactFilter
    ? DANHBA_VSP.filter((c) =>
        c.name.toLowerCase().includes(contactFilter.toLowerCase()) ||
        c.phone.replace(/\s/g, "").includes(contactFilter.replace(/\s/g, ""))
      )
    : DANHBA_VSP

  const getError = () => {
    if (isNotFound) return "Số điện thoại chưa đăng ký ví VSP"
    if (isErrorFormat) return "Số điện thoại không hợp lệ"
    return undefined
  }

  return (
    <>
      <p className="text-[18px] font-bold leading-[26px] text-foreground mb-[16px]">Đến ví VSP</p>

      {/* Search / filter bar */}
      <div className="flex items-center gap-[10px] bg-secondary rounded-[12px] px-[14px] py-[10px] mb-[16px]">
        <Search size={16} className="shrink-0 text-foreground-secondary" />
        <input
          type="text"
          value={showInput ? phone : contactFilter}
          onChange={(e) => showInput ? setPhone(e.target.value) : setContactFilter(e.target.value)}
          autoFocus
          placeholder="Tìm tên hoặc nhập SĐT..."
          className="flex-1 min-w-0 bg-transparent outline-none text-[14px] font-medium leading-[20px] text-foreground placeholder:text-foreground-secondary"
        />
        {(phone || contactFilter) && (
          <button type="button" onClick={() => { setPhone(""); setContactFilter("") }} className="shrink-0">
            <X size={14} className="text-foreground-secondary" />
          </button>
        )}
      </div>

      {/* Error */}
      {getError() && (
        <p className="text-[13px] text-danger mb-[12px]">{getError()}</p>
      )}

      {/* Resolving spinner */}
      {isResolving && (
        <div className="flex items-center justify-center gap-[8px] py-[24px]">
          <Loader2 size={20} className="animate-spin text-foreground" />
          <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary">Đang tìm ví VSP...</p>
        </div>
      )}

      {/* Resolved card */}
      {isResolved && (
        <div className="mb-[16px]">
          <div className="flex items-center gap-[12px] bg-secondary rounded-[20px] px-[16px] py-[14px]">
            <Avatar initials={resolvedName.split(" ").map((w) => w[0]).join("").slice(0, 2)} />
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold leading-[22px] text-foreground">{resolvedName}</p>
              <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">{resolvedPhone}</p>
            </div>
            <Check size={16} className="text-success shrink-0" />
          </div>
          <SaveToggle checked={false} />
        </div>
      )}

      {/* Contact list — show when not in resolved/error states */}
      {!showInput && (
        <div className="max-h-[400px] overflow-y-auto">
          <p className="text-[13px] font-semibold leading-[18px] text-foreground-secondary mb-[8px]">
            Danh bạ ví VSP
          </p>
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              type="button"
              onClick={() => onSelect(contact.name, contact.phone)}
              className="w-full flex items-center gap-[12px] py-[10px] text-left active:bg-secondary/50 transition-colors"
            >
              <Avatar initials={contact.avatar} />
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold leading-[22px] text-foreground">{contact.name}</p>
                <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">{contact.phone}</p>
              </div>
              <span className="text-[11px] font-bold px-[8px] py-[3px] rounded-full bg-success/10 text-success">VSP</span>
            </button>
          ))}
          {filteredContacts.length === 0 && (
            <p className="text-[14px] text-foreground-secondary text-center py-[24px]">Không tìm thấy</p>
          )}
        </div>
      )}

      {/* Not found */}
      {isNotFound && (
        <div className="flex flex-col items-center pt-[24px]">
          <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center mb-[12px]">
            <span className="text-[24px]">?</span>
          </div>
          <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary text-center">
            Không tìm thấy ví VSP cho số này
          </p>
        </div>
      )}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   Bank Sheet Content — 2-step: Bank List → STK Input
   ══════════════════════════════════════════════════════════════ */
function BankSheetContent({ state, onSelect }: { state: string; onSelect: (name: string, stk: string, bank: string) => void }) {
  const isStateResolved = state === "sheet-bank-resolved"
  const isNotFound = state === "sheet-bank-not-found"
  const isErrorFormat = state === "sheet-bank-error-format"
  const isStkStep = state === "sheet-bank-typing" || isStateResolved || isNotFound || isErrorFormat

  const [selectedBank, setSelectedBank] = useState<typeof BANKS[0] | null>(
    isStkStep ? BANKS[0] : null
  )
  const [bankFilter, setBankFilter] = useState("")

  const initStk = () => {
    switch (state) {
      case "sheet-bank-typing": return "19038"
      case "sheet-bank-resolved": return "19038291832"
      case "sheet-bank-not-found": return "99999999999"
      case "sheet-bank-error-format": return "123"
      default: return ""
    }
  }
  const [stk, setStk] = useState(initStk)

  const cleanStk = stk.replace(/\s/g, "")
  const liveResolved = !isStateResolved && !isNotFound && !isErrorFormat && cleanStk.length >= 8
  const isResolved = isStateResolved || liveResolved

  const getStkError = () => {
    if (isNotFound) return "Số tài khoản không tồn tại"
    if (isErrorFormat) return "Số tài khoản không hợp lệ"
    return undefined
  }

  const filteredBanks = bankFilter
    ? BANKS.filter((b) => b.name.toLowerCase().includes(bankFilter.toLowerCase()) || b.short.toLowerCase().includes(bankFilter.toLowerCase()))
    : BANKS

  /* ── Step 1: Bank List ── */
  if (!selectedBank) {
    return (
      <>
        <p className="text-[18px] font-bold leading-[26px] text-foreground mb-[16px]">Chọn ngân hàng</p>
        <div className="flex items-center gap-[10px] bg-secondary rounded-[12px] px-[14px] py-[10px] mb-[16px]">
          <Search size={16} className="shrink-0 text-foreground-secondary" />
          <input
            type="text"
            value={bankFilter}
            onChange={(e) => setBankFilter(e.target.value)}
            autoFocus
            placeholder="Tìm ngân hàng..."
            className="flex-1 min-w-0 bg-transparent outline-none text-[14px] font-medium leading-[20px] text-foreground placeholder:text-foreground-secondary"
          />
          {bankFilter && (
            <button type="button" onClick={() => setBankFilter("")} className="shrink-0">
              <X size={14} className="text-foreground-secondary" />
            </button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {filteredBanks.map((bank) => (
            <button
              key={bank.short}
              type="button"
              onClick={() => setSelectedBank(bank)}
              className="w-full flex items-center gap-[12px] py-[12px] text-left active:bg-secondary/50 transition-colors"
            >
              <div
                className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0"
                style={{ background: bank.color }}
              >
                {bank.short.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold leading-[22px] text-foreground">{bank.name}</p>
                <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">{bank.short}</p>
              </div>
              <ChevronLeft size={16} className="text-foreground-secondary rotate-180 shrink-0" />
            </button>
          ))}
          {filteredBanks.length === 0 && (
            <p className="text-[14px] text-foreground-secondary text-center py-[24px]">Không tìm thấy ngân hàng</p>
          )}
        </div>
      </>
    )
  }

  /* ── Step 2: Enter STK ── */
  return (
    <>
      <div className="flex items-center gap-[8px] mb-[16px]">
        <button
          type="button"
          onClick={() => setSelectedBank(null)}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-secondary"
        >
          <ChevronLeft size={16} className="text-foreground" />
        </button>
        <p className="text-[18px] font-bold leading-[26px] text-foreground">Đến ngân hàng</p>
      </div>

      {/* Selected bank card */}
      <div className="flex items-center gap-[12px] bg-secondary rounded-[16px] px-[14px] py-[12px] mb-[20px]">
        <div
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
          style={{ background: selectedBank.color }}
        >
          {selectedBank.short.slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold leading-[20px] text-foreground">{selectedBank.name}</p>
        </div>
        <button
          type="button"
          onClick={() => setSelectedBank(null)}
          className="text-[12px] font-semibold text-foreground-secondary px-[8px] py-[4px] rounded-full bg-background"
        >
          Đổi
        </button>
      </div>

      <TextField
        label="Số tài khoản"
        placeholder="Nhập số tài khoản"
        type="text"
        inputMode="numeric"
        value={stk}
        onChange={(e) => setStk(e.target.value)}
        error={getStkError()}
        helpText={!isResolved && !isNotFound && !isErrorFormat ? `Nhập STK tại ${selectedBank.name}` : undefined}
        trailingIcon={isResolved ? <Check size={16} className="text-success" /> : undefined}
      />

      {isResolved && (
        <div className="pt-[16px]">
          <div className="bg-secondary rounded-[20px] overflow-hidden">
            <div className="px-[16px] py-[12px]">
              <ItemList>
                <ItemListItem label="Tên người nhận" metadata="NGUYEN VAN MANH" />
              </ItemList>
            </div>
          </div>
          <SaveToggle checked={false} />
        </div>
      )}

      {isNotFound && (
        <div className="flex flex-col items-center pt-[32px]">
          <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center mb-[12px]">
            <span className="text-[24px]">?</span>
          </div>
          <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary text-center">
            Số tài khoản không tồn tại hoặc không hợp lệ
          </p>
        </div>
      )}

      <div className="pt-[24px] pb-[8px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isResolved}
          onClick={() => onSelect("NGUYEN VAN MANH", stk, selectedBank.name)}
        >
          Tiếp tục
        </Button>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   Confirm + FaceID Sheet Content
   ══════════════════════════════════════════════════════════════ */
function ConfirmSheetContent({ state }: { state: string }) {
  const router = useRouter()

  const isReview = state === "confirm-review"
  const isBiometricPrompt = state === "confirm-biometric"
  const isBiometricScanning = state === "confirm-biometric-scanning"
  const isBiometricSuccess = state === "confirm-biometric-success"
  const isBiometricFail = state === "confirm-biometric-fail"
  const isLoading = state === "confirm-loading"

  return (
    <>
      {/* Amount */}
      <div className="flex flex-col items-center pt-[8px] pb-[24px]">
        <p className="text-sm font-normal leading-5 text-foreground-secondary">Số tiền chuyển</p>
        <p className="text-[28px] font-bold leading-[36px] tracking-[-0.3px] text-foreground mt-[4px]">
          100.000 ₫
        </p>
      </div>

      {/* Confirm detail card */}
      <div className="bg-secondary rounded-[28px] overflow-hidden">
        <div className="px-[20px] py-[16px]">
          <ItemList>
            <ItemListItem label="Người nhận" metadata="LÊ VĂN HÙNG" divider />
            <ItemListItem label="SĐT" metadata="0987 654 321" divider />
            <ItemListItem label="Loại" metadata="Ví → Ví" divider />
            <ItemListItem label="Nội dung" metadata="Chuyển tiền" divider />
            <ItemListItem label="Phí" metadata="Miễn phí" />
          </ItemList>
        </div>
      </div>

      {/* ── FaceID Section ── */}
      <div className="pt-[32px]">
        <div className="flex flex-col items-center gap-[16px]">

          {/* Review — show button to trigger FaceID */}
          {isReview && (
            <>
              <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center">
                <ShieldCheck size={24} className="text-foreground" />
              </div>
              <p className="text-sm font-medium leading-5 text-foreground-secondary text-center">
                Xác nhận thông tin rồi bấm xác thực
              </p>
              <div className="w-full pt-[8px]">
                <Button variant="primary" size="48" className="w-full">
                  Xác thực Face ID
                </Button>
              </div>
            </>
          )}

          {/* Biometric prompt — waiting for user to look */}
          {isBiometricPrompt && (
            <>
              <div className="w-[72px] h-[72px] rounded-full bg-secondary flex items-center justify-center">
                <ScanFace size={36} className="text-foreground" />
              </div>
              <p className="text-[16px] font-semibold leading-[24px] text-foreground text-center">
                Face ID
              </p>
              <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                Nhìn vào camera để xác thực
              </p>
            </>
          )}

          {/* Biometric scanning — animation */}
          {isBiometricScanning && (
            <>
              <div className="w-[72px] h-[72px] rounded-full bg-secondary flex items-center justify-center relative">
                <ScanFace size={36} className="text-brand-secondary" />
                <div className="absolute inset-0 rounded-full border-2 border-brand-secondary animate-ping opacity-30" />
              </div>
              <p className="text-[16px] font-semibold leading-[24px] text-foreground text-center">
                Đang xác thực...
              </p>
              <Loader2 size={20} className="animate-spin text-foreground-secondary" />
            </>
          )}

          {/* Biometric success */}
          {isBiometricSuccess && (
            <>
              <div className="w-[72px] h-[72px] rounded-full bg-success/10 flex items-center justify-center">
                <ShieldCheck size={36} className="text-success" />
              </div>
              <p className="text-[16px] font-semibold leading-[24px] text-success text-center">
                Xác thực thành công
              </p>
              <div className="flex items-center gap-[8px]">
                <Loader2 size={16} className="animate-spin text-foreground-secondary" />
                <p className="text-sm font-normal leading-5 text-foreground-secondary">Đang xử lý giao dịch...</p>
              </div>
            </>
          )}

          {/* Biometric fail */}
          {isBiometricFail && (
            <>
              <div className="w-[72px] h-[72px] rounded-full bg-danger/10 flex items-center justify-center">
                <X size={36} className="text-danger" />
              </div>
              <p className="text-[16px] font-semibold leading-[24px] text-danger text-center">
                Face ID thất bại
              </p>
              <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                Không nhận diện được. Vui lòng thử lại.
              </p>
              <div className="flex gap-[8px] w-full pt-[8px]">
                <Button variant="secondary" size="48" className="flex-1">
                  Hủy
                </Button>
                <Button variant="primary" size="48" className="flex-1">
                  Thử lại
                </Button>
              </div>
            </>
          )}

          {/* Loading — processing transaction */}
          {isLoading && (
            <>
              <Loader2 size={40} className="animate-spin text-foreground" />
              <p className="text-[16px] font-semibold leading-[24px] text-foreground text-center">
                Đang xử lý giao dịch...
              </p>
              <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                Vui lòng không tắt ứng dụng
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
function TransferAmountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "empty"

  const MOCK_BALANCE = 1250000

  /* Sheet states */
  const isP2PSheet = state.startsWith("sheet-p2p")
  const isBankSheet = state.startsWith("sheet-bank")
  const isConfirmSheet = state.startsWith("confirm-")

  const getAmount = () => {
    switch (state) {
      case "typing": return "50.0"
      case "filled": return "100.000"
      case "over-balance": return "2.000.000"
      case "p2p-saved": return "100.000"
      case "bank-new": return "100.000"
      default:
        if (isConfirmSheet) return "100.000"
        return "0"
    }
  }

  const isOverBalance = state === "over-balance"
  const hasCTA = ["filled", "p2p-saved", "bank-new"].includes(state)
  const amount = getAmount()

  const getSwapTo = () => {
    if (state === "bank-new") {
      return {
        label: "NGUYEN VAN MANH",
        sublabel: "19038291832 · Techcombank",
        icon: <BankLogoText bank="TCB" />,
      }
    }
    return {
      label: "LÊ VĂN HÙNG",
      sublabel: "0987 654 321 · Ví VSP",
      icon: <VspLogo />,
    }
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Chuyển tiền"
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

      <div className="flex-1 overflow-y-auto">
        <SwapCard
          from={{
            label: "Ví VSP",
            sublabel: `Số dư: ${MOCK_BALANCE.toLocaleString("vi-VN")} ₫`,
            icon: <VspLogo />,
          }}
          to={getSwapTo()}
        />

        {/* Amount display */}
        <div className="flex flex-col items-center pt-[32px] px-[22px]">
          <p
            className={`text-[36px] font-bold leading-[44px] tracking-[-0.5px] ${
              isOverBalance ? "text-danger" : "text-foreground"
            }`}
          >
            {amount} ₫
          </p>
          {isOverBalance && (
            <div className="flex items-center gap-[6px] mt-[8px]">
              <p className="text-sm font-normal leading-5 text-danger">Số dư không đủ</p>
              <span className="text-sm font-semibold leading-5 text-success">·</span>
              <button type="button" className="text-sm font-semibold leading-5 text-success">
                Nạp tiền ngay
              </button>
            </div>
          )}
          {!isOverBalance && state !== "empty" && !isConfirmSheet && (
            <p className="text-sm font-normal leading-5 text-foreground-secondary mt-[4px]">
              Số dư: {MOCK_BALANCE.toLocaleString("vi-VN")} ₫
            </p>
          )}
        </div>

        {/* Quick amount chips */}
        <div className="flex items-center justify-center gap-[8px] pt-[16px] px-[22px]">
          {["100K", "200K", "500K"].map((chip) => (
            <button
              key={chip}
              type="button"
              className="px-[16px] py-[8px] rounded-full bg-secondary text-sm font-semibold leading-5 text-foreground"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Note field */}
        <div className="pt-[24px] px-[22px]">
          <div className="flex items-center gap-[12px] bg-secondary rounded-[14px] px-[14px] py-[12px]">
            <input
              type="text"
              placeholder="Nhập nội dung chuyển tiền"
              className="flex-1 min-w-0 bg-transparent outline-none text-sm font-medium leading-5 text-foreground placeholder:text-foreground-secondary"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Numpad + CTA */}
      <div className="shrink-0">
        <Numpad onKey={() => {}} />
        <div className="px-[22px] pb-[34px] pt-[8px]">
          <Button
            variant="primary"
            size="48"
            className="w-full"
            disabled={!hasCTA}
            onClick={() => router.push("/transfer/amount?state=confirm-review")}
          >
            {isOverBalance ? "Số dư không đủ" : "Tiếp tục"}
          </Button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* ═══ P2P BottomSheet — danh bạ ví VSP ═══ */}
      <BottomSheet
        open={isP2PSheet}
        onClose={() => router.push("/transfer/amount?state=empty")}
      >
        <P2PSheetContent
          state={state}
          onSelect={(name, phone) => router.push(`/transfer/amount?state=p2p-saved`)}
        />
      </BottomSheet>

      {/* ═══ Bank BottomSheet — chọn NH → nhập STK ═══ */}
      <BottomSheet
        open={isBankSheet}
        onClose={() => router.push("/transfer/amount?state=empty")}
      >
        <BankSheetContent
          state={state}
          onSelect={() => router.push(`/transfer/amount?state=bank-new`)}
        />
      </BottomSheet>

      {/* ═══ Confirm + FaceID BottomSheet ═══ */}
      <BottomSheet
        open={isConfirmSheet}
        onClose={() => router.push("/transfer/amount?state=filled")}
      >
        <ConfirmSheetContent state={state} />
      </BottomSheet>
    </div>
  )
}

export default function TransferAmountPage() {
  return (
    <React.Suspense fallback={null}>
      <TransferAmountContent />
    </React.Suspense>
  )
}
