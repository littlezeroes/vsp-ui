"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Search, Wallet, Landmark, Users, Loader2, Check, Pencil, X, ClipboardPaste } from "lucide-react"
import { Header } from "@/components/ui/header"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"

/* ── Mock Data ──────────────────────────────────────────────── */
const SAVED_P2P = [
  { id: 1, name: "Phạm Văn Nam", phone: "0983 882 233", avatar: "PN", nickname: "Anh Nam" },
  { id: 2, name: "Đào Văn Nam", phone: "0901 232 512", avatar: "ĐN", nickname: "Nam Đào" },
  { id: 3, name: "Trần Lan", phone: "0912 345 678", avatar: "TL", nickname: "Chị Lan" },
]

const SAVED_BANK = [
  { id: 1, name: "Nguyễn Văn Mạnh", stk: "8288 812 121", bank: "Techcombank", bankShort: "TCB", avatar: "NM", nickname: "Mạnh TCB" },
  { id: 2, name: "Trần Thị Lan", stk: "1023 456 789", bank: "Vietcombank", bankShort: "VCB", avatar: "TL", nickname: "Lan VCB" },
]

const ALL_SAVED = [
  ...SAVED_P2P.map((p) => ({ ...p, type: "p2p" as const, sub: p.phone })),
  ...SAVED_BANK.map((b) => ({ ...b, type: "bank" as const, sub: `${b.stk} · ${b.bank}` })),
]

/* Danh bạ ví VSP — contacts from phone that have VSP wallets */
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

/* ── Hub Card ───────────────────────────────────────────────── */
function HubCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex flex-col items-center gap-[10px] py-[24px] px-[12px] rounded-[28px] bg-secondary active:bg-grey-200 transition-colors text-center"
    >
      <div className="w-[52px] h-[52px] rounded-full bg-background flex items-center justify-center text-foreground">
        {icon}
      </div>
      <div>
        <p className="text-[15px] font-semibold leading-[22px] text-foreground">{title}</p>
        <p className="text-[12px] font-normal leading-[16px] text-foreground-secondary mt-[2px]">{desc}</p>
      </div>
    </button>
  )
}

/* ── Highlight text ─────────────────────────────────────────── */
function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight) return <>{text}</>
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-foreground font-bold">{text.slice(idx, idx + highlight.length)}</span>
      {text.slice(idx + highlight.length)}
    </>
  )
}

/* ── Type Badge ────────────────────────────────────────────── */
function TypeBadge({ type }: { type: "p2p" | "bank"; bankShort?: string }) {
  return (
    <span
      className={`text-[11px] font-bold px-[8px] py-[3px] rounded-full shrink-0 ${
        type === "p2p"
          ? "bg-success/10 text-success"
          : "bg-foreground/5 text-foreground-secondary"
      }`}
    >
      {type === "p2p" ? "VSP" : "Bank"}
    </span>
  )
}

/* ── Detect Badge ───────────────────────────────────────────── */
function DetectBadge({ type }: { type: "sdt" | "stk" }) {
  const config = type === "sdt"
    ? { label: "SĐT → Ví VSP", cls: "bg-success/10 text-success" }
    : { label: "STK → Ngân hàng", cls: "bg-foreground/5 text-foreground-secondary" }
  return (
    <span className={`text-[11px] font-bold px-[10px] py-[4px] rounded-full ${config.cls}`}>
      {config.label}
    </span>
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

/* ── Resolved Card (P2P) ────────────────────────────────────── */
function ResolvedCard({ name, phone }: { name: string; phone: string }) {
  return (
    <div className="flex items-center gap-[12px] bg-secondary rounded-[20px] px-[16px] py-[14px]">
      <Avatar initials={name.split(" ").map((w) => w[0]).join("").slice(0, 2)} />
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold leading-[22px] text-foreground">{name}</p>
        <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">{phone}</p>
      </div>
      <span className="text-[11px] font-bold px-[8px] py-[3px] rounded-full bg-success/10 text-success">
        Ví VSP
      </span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   P2P Sheet Content
   ══════════════════════════════════════════════════════════════ */
function P2PSheetContent({ state, onContinue }: { state: string; onContinue: () => void }) {
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

  // Live resolve: khi user nhập đủ 10 số → fake lookup
  const cleanPhone = phone.replace(/\s/g, "")
  const liveResolved = !isStateResolved && !isResolving && !isNotFound && !isErrorFormat && cleanPhone.length >= 10
  const isResolved = isStateResolved || liveResolved

  const getError = () => {
    if (isNotFound) return "Số điện thoại chưa đăng ký ví VSP"
    if (isErrorFormat) return "Số điện thoại không hợp lệ"
    return undefined
  }

  // Mock name from phone input
  const resolvedName = liveResolved ? "NGUYỄN MINH TUẤN" : "PHẠM VĂN NAM"
  const resolvedPhone = liveResolved ? phone : "0983 882 233"

  return (
    <>
      <p className="text-[18px] font-bold leading-[26px] text-foreground mb-[20px]">Đến ví VSP</p>

      <TextField
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        type="tel"
        inputMode="numeric"
        maxLength={12}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={getError()}
        helpText={!isResolved && !isResolving && !isNotFound && !isErrorFormat ? "Nhập SĐT 10 số để tìm ví VSP" : undefined}
        trailingIcon={
          isResolved ? <Check size={16} className="text-success" /> : undefined
        }
      />

      {isResolving && (
        <div className="flex items-center justify-center gap-[8px] pt-[24px]">
          <Loader2 size={20} className="animate-spin text-foreground" />
          <p className="text-[14px] font-medium leading-[20px] text-foreground-secondary">
            Đang tìm ví VSP...
          </p>
        </div>
      )}

      {isResolved && (
        <div className="pt-[24px]">
          <ResolvedCard name={resolvedName} phone={resolvedPhone} />
        </div>
      )}

      {isResolved && (
        <div className="pt-[16px]">
          <SaveToggle checked={false} />
        </div>
      )}

      {isNotFound && (
        <div className="flex flex-col items-center pt-[32px]">
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

      <div className="pt-[24px] pb-[8px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isResolved}
          onClick={onContinue}
        >
          Tiếp tục
        </Button>
      </div>
    </>
  )
}

/* ── Bank List Item ────────────────────────────────────────── */
function BankListItem({ bank, onClick }: { bank: typeof BANKS[0]; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
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
  )
}

/* ══════════════════════════════════════════════════════════════
   Bank Sheet Content — 2-step: Bank List → STK Input
   Step 1: Show bank list
   Step 2: After selecting bank → enter STK + resolve name
   ══════════════════════════════════════════════════════════════ */
function BankSheetContent({ state, onContinue }: { state: string; onContinue: () => void }) {
  /* Step 2 states (bank already selected) */
  const isStateResolved = state === "sheet-bank-resolved"
  const isNotFound = state === "sheet-bank-not-found"
  const isErrorFormat = state === "sheet-bank-error-format"
  const isStkStep = state === "sheet-bank-typing" || state === "sheet-bank-resolved" || state === "sheet-bank-not-found" || state === "sheet-bank-error-format"

  /* Local state: selected bank + STK */
  const [selectedBank, setSelectedBank] = useState<typeof BANKS[0] | null>(
    isStkStep ? BANKS[0] : null /* default Techcombank for STK states */
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

  /* Live resolve */
  const cleanStk = stk.replace(/\s/g, "")
  const liveResolved = !isStateResolved && !isNotFound && !isErrorFormat && cleanStk.length >= 8
  const isResolved = isStateResolved || liveResolved

  const getStkError = () => {
    if (isNotFound) return "Số tài khoản không tồn tại"
    if (isErrorFormat) return "Số tài khoản không hợp lệ"
    return undefined
  }

  /* Filter banks */
  const filteredBanks = bankFilter
    ? BANKS.filter((b) => b.name.toLowerCase().includes(bankFilter.toLowerCase()) || b.short.toLowerCase().includes(bankFilter.toLowerCase()))
    : BANKS

  /* ── Step 1: Bank List ── */
  if (!selectedBank) {
    return (
      <>
        <p className="text-[18px] font-bold leading-[26px] text-foreground mb-[16px]">Chọn ngân hàng</p>

        {/* Bank search */}
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

        {/* Bank list */}
        <div className="max-h-[400px] overflow-y-auto">
          {filteredBanks.map((bank) => (
            <BankListItem
              key={bank.short}
              bank={bank}
              onClick={() => setSelectedBank(bank)}
            />
          ))}
          {filteredBanks.length === 0 && (
            <p className="text-[14px] text-foreground-secondary text-center py-[24px]">
              Không tìm thấy ngân hàng
            </p>
          )}
        </div>
      </>
    )
  }

  /* ── Step 2: Enter STK ── */
  return (
    <>
      {/* Back to bank list */}
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
        trailingIcon={
          isResolved ? <Check size={16} className="text-success" /> : undefined
        }
      />

      {/* Resolved name */}
      {isResolved && (
        <div className="pt-[16px]">
          <div className="bg-secondary rounded-[20px] overflow-hidden">
            <div className="px-[16px] py-[12px]">
              <ItemList>
                <ItemListItem
                  label="Tên người nhận"
                  metadata="NGUYEN VAN MANH"
                />
              </ItemList>
            </div>
          </div>
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

      {isResolved && (
        <div className="pt-[16px]">
          <SaveToggle checked={false} />
        </div>
      )}

      <div className="pt-[24px] pb-[8px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isResolved}
          onClick={onContinue}
        >
          Tiếp tục
        </Button>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   Global Search Sheet Content — Option D Redesign
   - Full-height sheet with real search bar (auto-focus)
   - Default: "Đã lưu" + "Danh bạ ví VSP"
   - SĐT typing: filter + detect badge
   - STK typing: auto-detect bank, resolve inline
   - Name typing: filter both lists
   - No result: empty state + escape links
   ══════════════════════════════════════════════════════════════ */
function SearchSheetContent({ state, initialValue, onOpenP2P, onOpenBank }: {
  state: string
  initialValue: string
  onOpenP2P: () => void
  onOpenBank: () => void
}) {
  const router = useRouter()
  const isDefault = state === "sheet-search"
  const isTypingSdt = state === "sheet-search-typing-sdt"
  const isTypingStk = state === "sheet-search-typing-stk"
  const isTypingName = state === "sheet-search-typing-name"
  const isStkResolved = state === "sheet-search-stk-resolved"
  const isNoResult = state === "sheet-search-no-result"

  const initSearch = () => {
    if (initialValue) return initialValue
    switch (state) {
      case "sheet-search-typing-sdt": return "098"
      case "sheet-search-typing-stk": return "1903"
      case "sheet-search-typing-name": return "Nam"
      case "sheet-search-stk-resolved": return "19038291832"
      case "sheet-search-no-result": return "xyzabc"
      default: return ""
    }
  }

  const [searchVal, setSearchVal] = useState(initSearch)

  /* Filter danh bạ VSP */
  const getContactResults = () => {
    if (isDefault) return DANHBA_VSP
    if (isTypingSdt) return DANHBA_VSP.filter((c) => c.phone.replace(/\s/g, "").includes("098"))
    if (isTypingName) return DANHBA_VSP.filter((c) => c.name.toLowerCase().includes("nam"))
    return []
  }

  /* Filter saved */
  const getSavedResults = () => {
    if (isDefault) return ALL_SAVED
    if (isTypingSdt) return ALL_SAVED.filter((r) => r.sub.replace(/\s/g, "").includes("098"))
    if (isTypingStk) return ALL_SAVED.filter((r) => r.sub.replace(/\s/g, "").includes("1903"))
    if (isTypingName) return ALL_SAVED.filter((r) => r.name.toLowerCase().includes("nam") || r.nickname.toLowerCase().includes("nam"))
    return []
  }

  const contactResults = getContactResults()
  const savedResults = getSavedResults()
  const showLists = isDefault || isTypingSdt || isTypingName
  const hasAny = contactResults.length > 0 || savedResults.length > 0

  return (
    <>
      {/* Search bar — real, auto-focus */}
      <div className="flex items-center gap-[10px] bg-secondary rounded-[12px] px-[14px] py-[12px] mb-[16px]">
        <Search size={18} className="shrink-0 text-foreground-secondary" />
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          autoFocus
          placeholder="SĐT, STK, hoặc tên người nhận"
          className="flex-1 min-w-0 bg-transparent outline-none text-[15px] font-medium leading-[22px] text-foreground placeholder:text-foreground-secondary"
        />
        {searchVal && (
          <button type="button" onClick={() => setSearchVal("")} className="shrink-0">
            <X size={16} className="text-foreground-secondary" />
          </button>
        )}
      </div>

      {/* Detect badges */}
      {isTypingSdt && (
        <div className="pb-[12px]"><DetectBadge type="sdt" /></div>
      )}
      {(isTypingStk || isStkResolved) && (
        <div className="pb-[12px]"><DetectBadge type="stk" /></div>
      )}

      {/* ── Default + Typing SĐT/Name: show lists ── */}
      {showLists && hasAny && (
        <div className="pt-[4px]">
          {/* Đã lưu */}
          {savedResults.length > 0 && (
            <>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <p className="text-[13px] font-semibold leading-[18px] text-foreground-secondary">
                  Đã lưu
                </p>
              </div>
              {savedResults.map((item) => (
                <button
                  key={`saved-${item.type}-${item.id}`}
                  type="button"
                  onClick={() => router.push(`/transfer/amount?type=${item.type}&saved=${item.id}`)}
                  className="w-full flex items-center gap-[12px] py-[10px] text-left active:bg-secondary/50 transition-colors"
                >
                  <Avatar initials={item.avatar} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold leading-[22px] text-foreground truncate">
                      {(isTypingName) ? <HighlightText text={item.nickname} highlight="Nam" /> : item.nickname}
                    </p>
                    <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary truncate">
                      {(isTypingSdt)
                        ? <HighlightText text={item.sub} highlight="098" />
                        : item.sub}
                    </p>
                  </div>
                  <TypeBadge type={item.type} />
                </button>
              ))}
            </>
          )}

          {/* Danh bạ ví VSP */}
          {contactResults.length > 0 && (
            <>
              <div className="flex items-center gap-[8px] mb-[8px] mt-[20px]">
                <p className="text-[13px] font-semibold leading-[18px] text-foreground-secondary">
                  Danh bạ ví VSP
                </p>
                <span className="text-[11px] font-bold px-[6px] py-[2px] rounded-full bg-success/10 text-success">
                  {contactResults.length}
                </span>
              </div>
              {contactResults.map((contact) => (
                <button
                  key={`contact-${contact.id}`}
                  type="button"
                  onClick={() => router.push(`/transfer/amount?type=p2p&phone=${contact.phone.replace(/\s/g, "")}`)}
                  className="w-full flex items-center gap-[12px] py-[10px] text-left active:bg-secondary/50 transition-colors"
                >
                  <Avatar initials={contact.avatar} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold leading-[22px] text-foreground truncate">
                      {isTypingName ? <HighlightText text={contact.name} highlight="Nam" /> : contact.name}
                    </p>
                    <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">
                      {isTypingSdt ? <HighlightText text={contact.phone} highlight="098" /> : contact.phone}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-[8px] py-[3px] rounded-full bg-success/10 text-success">
                    VSP
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* ── STK typing / resolved: show bank list to choose ── */}
      {(isTypingStk || isStkResolved) && (
        <div className="pt-[8px]">
          <div className="flex items-center gap-[8px] mb-[8px]">
            <p className="text-[13px] font-semibold leading-[18px] text-foreground-secondary">
              Chọn ngân hàng để gửi
            </p>
          </div>
          {BANKS.map((bank) => (
            <button
              key={bank.short}
              type="button"
              onClick={() => router.push(`/transfer/entry?state=sheet-bank`)}
              className="w-full flex items-center gap-[12px] py-[10px] text-left active:bg-secondary/50 transition-colors"
            >
              <div
                className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                style={{ background: bank.color }}
              >
                {bank.short.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold leading-[22px] text-foreground">{bank.name}</p>
                <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">STK: {searchVal}</p>
              </div>
              <ChevronLeft size={16} className="text-foreground-secondary rotate-180 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* ── No result — typed list filtering found nothing ── */}
      {showLists && !hasAny && !isDefault && (
        <div className="flex flex-col items-center pt-[48px]">
          <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center mb-[16px]">
            <Search size={24} className="text-foreground-secondary" />
          </div>
          <p className="text-[16px] font-semibold text-foreground text-center mb-[4px]">
            Không tìm thấy
          </p>
          <p className="text-[13px] text-foreground-secondary text-center mb-[20px] leading-[20px]">
            Không có người nhận nào khớp
          </p>
          <div className="flex items-center gap-[12px]">
            <Button variant="secondary" size="32" onClick={onOpenP2P}>
              Nhập SĐT mới
            </Button>
            <Button variant="secondary" size="32" onClick={onOpenBank}>
              Nhập STK mới
            </Button>
          </div>
        </div>
      )}

      {/* ── No result (explicit state) ── */}
      {isNoResult && (
        <div className="flex flex-col items-center pt-[48px]">
          <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center mb-[16px]">
            <Search size={24} className="text-foreground-secondary" />
          </div>
          <p className="text-[16px] font-semibold text-foreground text-center mb-[4px]">
            Không tìm thấy
          </p>
          <p className="text-[13px] text-foreground-secondary text-center mb-[20px] leading-[20px]">
            Không có người nhận nào khớp với &ldquo;{searchVal}&rdquo;
          </p>
          <div className="flex items-center gap-[12px]">
            <Button variant="secondary" size="32" onClick={onOpenP2P}>
              Nhập SĐT mới
            </Button>
            <Button variant="secondary" size="32" onClick={onOpenBank}>
              Nhập STK mới
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   Edit Nickname Sheet Content
   ══════════════════════════════════════════════════════════════ */
function EditNicknameSheetContent({ item, onSave, onClose }: {
  item: typeof ALL_SAVED[0]
  onSave: (nickname: string) => void
  onClose: () => void
}) {
  const [nickname, setNickname] = useState(item.nickname)

  return (
    <>
      <p className="text-[18px] font-bold leading-[26px] text-foreground mb-[20px]">Sửa tên gợi nhớ</p>

      {/* Current recipient info */}
      <div className="flex items-center gap-[12px] bg-secondary rounded-[20px] px-[16px] py-[14px] mb-[20px]">
        <Avatar initials={item.avatar} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold leading-[22px] text-foreground">{item.name}</p>
          <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">{item.sub}</p>
        </div>
      </div>

      <TextField
        label="Tên gợi nhớ"
        placeholder="Nhập tên gợi nhớ (vd: Anh Nam, Mạnh TCB...)"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        maxLength={30}
        helpText="Tên gợi nhớ giúp bạn dễ nhận diện người nhận"
      />

      <div className="flex gap-[8px] pt-[24px] pb-[8px]">
        <Button variant="secondary" size="48" className="flex-1" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="primary" size="48" className="flex-1" onClick={() => onSave(nickname)}>
          Lưu
        </Button>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   Main Page — Option D: Hub + Global Search
   ══════════════════════════════════════════════════════════════ */
function TransferEntryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "default"

  const isEmpty = state === "empty"

  /* Sheet states */
  const isSearchSheet = state.startsWith("sheet-search")
  const isEditNickname = state === "edit-nickname"

  const [editingItem, setEditingItem] = useState<typeof ALL_SAVED[0] | null>(null)
  const [pastedValue, setPastedValue] = useState("")

  /* Paste from clipboard → auto-detect → open search sheet with value */
  const handlePasteButton = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        const cleaned = text.trim()
        setPastedValue(cleaned)
        router.push("/transfer/entry?state=sheet-search")
      }
    } catch {
      // Clipboard API not available — open search sheet anyway
      router.push("/transfer/entry?state=sheet-search")
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
            onClick={() => router.push("/")}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[34px]">
        {/* ── Section 1: Hub Cards ── */}
        <div className="flex gap-[12px] px-[22px] pt-[4px]">
          <HubCard
            icon={<Wallet size={24} />}
            title="Đến ví"
            desc="Chuyển qua SĐT"
            onClick={() => router.push("/transfer/amount?state=sheet-p2p")}
          />
          <HubCard
            icon={<Landmark size={24} />}
            title="Đến ngân hàng"
            desc="Chuyển qua STK"
            onClick={() => router.push("/transfer/amount?state=sheet-bank")}
          />
        </div>

        {/* ── Section 2: Search Bar (read-only entry point) ── */}
        <div className="px-[22px] pt-[20px]">
          <button
            type="button"
            onClick={() => router.push("/transfer/entry?state=sheet-search")}
            className="w-full flex items-center gap-[10px] bg-secondary rounded-[12px] px-[14px] py-[12px] text-left"
          >
            <Search size={18} className="shrink-0 text-foreground-secondary" />
            <span className="flex-1 text-[15px] font-medium leading-[22px] text-foreground-secondary">
              Tìm người nhận...
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation()
                handlePasteButton()
              }}
              className="shrink-0 flex items-center gap-[4px] px-[8px] py-[4px] rounded-full bg-background"
            >
              <ClipboardPaste size={14} className="text-foreground-secondary" />
              <span className="text-[12px] font-semibold text-foreground-secondary">Dán</span>
            </span>
          </button>
        </div>

        {/* ── Section 3: Đã lưu list ── */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center pt-[60px] px-[22px]">
            <div className="w-[64px] h-[64px] rounded-full bg-secondary flex items-center justify-center mb-[16px]">
              <Users size={28} className="text-foreground-secondary" />
            </div>
            <p className="text-[16px] font-semibold text-foreground text-center">
              Chưa có người nhận nào
            </p>
            <p className="text-[13px] text-foreground-secondary text-center mt-[6px] leading-[20px] max-w-[260px]">
              Bật &quot;Lưu người nhận&quot; sau khi chuyển tiền để hiện ở đây.
            </p>
          </div>
        ) : (
          <div className="pt-[32px]">
            <p className="px-[22px] text-[13px] font-semibold leading-[18px] text-foreground-secondary mb-[8px]">
              Đã lưu
            </p>

            {ALL_SAVED.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-center gap-[12px] px-[22px] py-[10px] active:bg-secondary/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => {
                    router.push(`/transfer/amount?type=${item.type}&saved=${item.id}`)
                  }}
                  className="flex items-center gap-[12px] flex-1 min-w-0 text-left"
                >
                  <Avatar initials={item.avatar} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold leading-[22px] text-foreground truncate">
                      {item.nickname}
                    </p>
                    <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary truncate">
                      {item.sub}
                    </p>
                  </div>
                </button>

                {/* Edit nickname */}
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(item)
                    router.push("/transfer/entry?state=edit-nickname")
                  }}
                  className="w-[32px] h-[32px] rounded-full bg-secondary flex items-center justify-center shrink-0"
                >
                  <Pencil size={14} className="text-foreground-secondary" />
                </button>

                {/* Type badge */}
                <span
                  className={`text-[11px] font-bold px-[8px] py-[3px] rounded-full shrink-0 ${
                    item.type === "p2p"
                      ? "bg-success/10 text-success"
                      : "bg-foreground/5 text-foreground-secondary"
                  }`}
                >
                  {item.type === "p2p" ? "VSP" : (item as (typeof SAVED_BANK)[0]).bankShort}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* ═══ Global Search BottomSheet ═══ */}
      <BottomSheet
        open={isSearchSheet}
        onClose={() => router.push("/transfer/entry")}
      >
        <SearchSheetContent
          state={state}
          initialValue={pastedValue}
          onOpenP2P={() => router.push("/transfer/entry?state=sheet-p2p")}
          onOpenBank={() => router.push("/transfer/entry?state=sheet-bank")}
        />
      </BottomSheet>

      {/* ═══ Edit Nickname BottomSheet ═══ */}
      <BottomSheet
        open={isEditNickname}
        onClose={() => router.push("/transfer/entry")}
      >
        <EditNicknameSheetContent
          item={editingItem ?? ALL_SAVED[0]}
          onSave={() => router.push("/transfer/entry")}
          onClose={() => router.push("/transfer/entry")}
        />
      </BottomSheet>
    </div>
  )
}

export default function TransferEntryPage() {
  return (
    <React.Suspense fallback={null}>
      <TransferEntryContent />
    </React.Suspense>
  )
}
