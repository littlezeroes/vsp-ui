"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ChevronLeft, Loader2, ShieldCheck, ScanFace, X, Search, Check, Wallet } from "lucide-react"
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

/* ── Numpad (Cash App style — clean, no borders) ─────────────── */
function Numpad({ onKey }: { onKey: (key: string) => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "⌫"]
  return (
    <div className="grid grid-cols-3 gap-0">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onKey(key)}
          className="h-[56px] flex items-center justify-center text-[22px] font-semibold leading-7 text-foreground active:bg-secondary/50 rounded-[8px] transition-colors"
        >
          {key}
        </button>
      ))}
    </div>
  )
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

  const showInput = state.startsWith("sheet-p2p-") && state !== "sheet-p2p"

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

      {getError() && (
        <p className="text-[13px] text-danger mb-[12px]">{getError()}</p>
      )}

      {isResolving && (
        <div className="flex items-center justify-center gap-[8px] py-[24px]">
          <Loader2 size={20} className="animate-spin text-foreground" />
          <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary">Đang tìm ví VSP...</p>
        </div>
      )}

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
   Page — Cash App pattern:

   Mode 1: NUMPAD (full screen, green-ish)
     - Hero amount centered, big
     - Quick chips
     - Numpad
     - "Tiếp tục" CTA

   Mode 2: CONFIRM (single page, like Cash App's Pay page)
     - Top bar: ← back | amount small | "Chuyển" pill
     - To: Recipient (read-only)
     - For: Note input
     - Detail card
     - All on ONE view — no multi-step
   ══════════════════════════════════════════════════════════════ */
function TransferAmountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "empty"

  const MOCK_BALANCE = 1250000

  /* Determine mode */
  const isP2PSheet = state.startsWith("sheet-p2p")
  const isBankSheet = state.startsWith("sheet-bank")
  const isConfirmMode = state.startsWith("confirm-")
  const isNumpadMode = !isConfirmMode

  const getAmount = () => {
    switch (state) {
      case "typing": return "50.000"
      case "filled": return "100.000"
      case "over-balance": return "2.000.000"
      case "p2p-saved": return "100.000"
      case "bank-new": return "100.000"
      default:
        if (isConfirmMode) return "100.000"
        return "0"
    }
  }

  const amount = getAmount()
  const isOverBalance = state === "over-balance"
  const isEmpty = amount === "0"
  const hasCTA = ["filled", "p2p-saved", "bank-new"].includes(state)
  const isBank = state === "bank-new" || state === "confirm-review-bank"

  const getRecipient = () => {
    if (isBank) {
      return { name: "NGUYEN VAN MANH", sub: "19038291832 · Techcombank", avatar: "NM" }
    }
    return { name: "LÊ VĂN HÙNG", sub: "0987 654 321 · Ví VSP", avatar: "LH" }
  }

  const recipient = getRecipient()

  const isReview = state === "confirm-review" || state === "confirm-review-bank"
  const isBiometricPrompt = state === "confirm-biometric"
  const isBiometricScanning = state === "confirm-biometric-scanning"
  const isBiometricSuccess = state === "confirm-biometric-success"
  const isBiometricFail = state === "confirm-biometric-fail"
  const isLoading = state === "confirm-loading"
  const noteText = isConfirmMode ? "Tiền nhà tháng 3" : ""

  /* ── NUMPAD MODE ── */
  if (isNumpadMode) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-[16px] pt-[50px] pb-[0px]">
          <button
            type="button"
            onClick={() => router.push("/transfer/entry")}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
          <div className="flex items-center gap-[6px] px-[12px] py-[4px] rounded-full bg-secondary">
            <Avatar initials={recipient.avatar} size={20} />
            <span className="text-[12px] font-semibold leading-[16px] text-foreground">{recipient.name}</span>
          </div>
          <div className="w-[44px]" />
        </div>

        {/* Hero amount — centered, fills available space */}
        <div className="flex-1 flex flex-col items-center justify-center px-[22px]">
          <p
            className={`text-[56px] font-bold leading-[64px] tracking-[-2px] ${
              isOverBalance ? "text-danger" : isEmpty ? "text-foreground/20" : "text-foreground"
            }`}
          >
            {amount}<span className="text-[32px] ml-[2px]">₫</span>
          </p>

          {isOverBalance && (
            <div className="flex items-center gap-[6px] mt-[8px]">
              <p className="text-[13px] font-normal leading-[18px] text-danger">Số dư không đủ</p>
              <span className="text-foreground-secondary">·</span>
              <button type="button" className="text-[13px] font-semibold leading-[18px] text-success">
                Nạp tiền
              </button>
            </div>
          )}
        </div>

        {/* Bottom area — chips + numpad + CTA */}
        <div className="shrink-0 px-[22px] pb-[34px]">
          {/* Quick chips */}
          <div className="flex items-center justify-center gap-[8px] pb-[12px]">
            {["100K", "200K", "500K", "1M"].map((chip) => (
              <button
                key={chip}
                type="button"
                className="px-[14px] py-[6px] rounded-full bg-secondary text-[13px] font-semibold leading-[18px] text-foreground active:bg-grey-200 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Numpad */}
          <div className="px-[10px]">
            <Numpad onKey={() => {}} />
          </div>

          {/* CTA */}
          <div className="pt-[12px]">
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

        {/* P2P BottomSheet */}
        <BottomSheet
          open={isP2PSheet}
          onClose={() => router.push("/transfer/amount?state=empty")}
        >
          <P2PSheetContent
            state={state}
            onSelect={() => router.push("/transfer/amount?state=p2p-saved")}
          />
        </BottomSheet>

        {/* Bank BottomSheet */}
        <BottomSheet
          open={isBankSheet}
          onClose={() => router.push("/transfer/amount?state=empty")}
        >
          <BankSheetContent
            state={state}
            onSelect={() => router.push("/transfer/amount?state=bank-new")}
          />
        </BottomSheet>
      </div>
    )
  }

  /* ── CONFIRM MODE — Single page (Cash App "Pay" page pattern) ── */
  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

      {/* Top bar: ← | amount | "Chuyển" pill (like Cash App: X | $10 | Pay) */}
      <div className="flex items-center justify-between px-[16px] pt-[50px] pb-[12px] border-b border-border">
        <button
          type="button"
          onClick={() => router.push("/transfer/amount?state=filled")}
          className="w-[44px] h-[44px] flex items-center justify-center rounded-full"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <p className="text-[16px] font-bold leading-[22px] text-foreground">
          {amount} ₫
        </p>
        {isReview ? (
          <button
            type="button"
            onClick={() => router.push("/transfer/confirm?state=review")}
            className="px-[16px] py-[8px] rounded-full bg-foreground"
          >
            <span className="text-[13px] font-bold leading-[18px] text-background">Chuyển</span>
          </button>
        ) : (
          <div className="w-[44px]" />
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

        {/* To: Recipient (read-only, like Cash App "To" field) */}
        <div className="px-[22px] py-[16px] border-b border-border">
          <div className="flex items-center gap-[12px]">
            <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary shrink-0">Đến</p>
            <div className="flex items-center gap-[8px] flex-1 min-w-0">
              <Avatar initials={recipient.avatar} size={32} />
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold leading-[20px] text-foreground truncate">{recipient.name}</p>
                <p className="text-[12px] font-normal leading-[16px] text-foreground-secondary">{recipient.sub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* For: Note input (like Cash App "For" field) */}
        <div className="px-[22px] py-[16px] border-b border-border">
          <div className="flex items-center gap-[12px]">
            <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary shrink-0">Cho</p>
            <input
              type="text"
              placeholder="Nội dung chuyển tiền"
              defaultValue={noteText}
              className="flex-1 min-w-0 bg-transparent outline-none text-[15px] font-medium leading-[20px] text-foreground placeholder:text-foreground-secondary"
            />
          </div>
        </div>

        {/* Source: Wallet balance */}
        <div className="px-[22px] py-[16px] border-b border-border">
          <div className="flex items-center gap-[12px]">
            <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary shrink-0">Từ</p>
            <div className="flex items-center gap-[8px] flex-1 min-w-0">
              <div className="w-[32px] h-[32px] rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <Wallet size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold leading-[20px] text-foreground">Ví VSP</p>
                <p className="text-[12px] font-normal leading-[16px] text-foreground-secondary">
                  Số dư: {MOCK_BALANCE.toLocaleString("vi-VN")} ₫
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail card */}
        <div className="px-[22px] pt-[32px]">
          <div className="bg-secondary rounded-[28px] overflow-hidden">
            <div className="px-[20px] py-[16px]">
              <ItemList>
                <ItemListItem label="Loại" metadata={isBank ? "Ví → Ngân hàng" : "Ví → Ví"} divider />
                <ItemListItem label="Nội dung" metadata={noteText || "Chuyển tiền"} divider />
                <ItemListItem label="Phí" metadata="Miễn phí" />
              </ItemList>
            </div>
          </div>
        </div>

        {/* Biometric / Loading states */}
        {!isReview && (
          <div className="px-[22px] pt-[32px]">
            <div className="flex flex-col items-center gap-[16px] py-[24px]">
              {isBiometricPrompt && (
                <>
                  <div className="w-[72px] h-[72px] rounded-full bg-secondary flex items-center justify-center">
                    <ScanFace size={36} className="text-foreground" />
                  </div>
                  <p className="text-[16px] font-semibold leading-[24px] text-foreground">Face ID</p>
                  <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                    Nhìn vào camera để xác thực
                  </p>
                </>
              )}

              {isBiometricScanning && (
                <>
                  <div className="w-[72px] h-[72px] rounded-full bg-secondary flex items-center justify-center relative">
                    <ScanFace size={36} className="text-brand-secondary" />
                    <div className="absolute inset-0 rounded-full border-2 border-brand-secondary animate-ping opacity-30" />
                  </div>
                  <p className="text-[16px] font-semibold leading-[24px] text-foreground">Đang xác thực...</p>
                  <Loader2 size={20} className="animate-spin text-foreground-secondary" />
                </>
              )}

              {isBiometricSuccess && (
                <>
                  <div className="w-[72px] h-[72px] rounded-full bg-success/10 flex items-center justify-center">
                    <ShieldCheck size={36} className="text-success" />
                  </div>
                  <p className="text-[16px] font-semibold leading-[24px] text-success">Xác thực thành công</p>
                  <div className="flex items-center gap-[8px]">
                    <Loader2 size={16} className="animate-spin text-foreground-secondary" />
                    <p className="text-sm font-normal leading-5 text-foreground-secondary">Đang xử lý giao dịch...</p>
                  </div>
                </>
              )}

              {isBiometricFail && (
                <>
                  <div className="w-[72px] h-[72px] rounded-full bg-danger/10 flex items-center justify-center">
                    <X size={36} className="text-danger" />
                  </div>
                  <p className="text-[16px] font-semibold leading-[24px] text-danger">Face ID thất bại</p>
                  <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                    Không nhận diện được. Vui lòng thử lại.
                  </p>
                  <div className="flex gap-[8px] w-full pt-[8px]">
                    <Button variant="secondary" size="48" className="flex-1">Hủy</Button>
                    <Button variant="primary" size="48" className="flex-1">Thử lại</Button>
                  </div>
                </>
              )}

              {isLoading && (
                <>
                  <Loader2 size={40} className="animate-spin text-foreground" />
                  <p className="text-[16px] font-semibold leading-[24px] text-foreground">Đang xử lý giao dịch...</p>
                  <p className="text-sm font-normal leading-5 text-foreground-secondary text-center">
                    Vui lòng không tắt ứng dụng
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom disclaimer (review mode) */}
      {isReview && (
        <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
          <p className="text-[11px] font-normal leading-[16px] text-foreground-secondary text-center">
            Giao dịch không thể hoàn tác sau khi gửi
          </p>
        </div>
      )}

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
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
