"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ── Mock Data ──────────────────────────────────────────────── */
const SAVED_P2P = [
  { id: 1, name: "Phạm Văn Nam", phone: "0983 882 233", avatar: "PN", type: "p2p" as const },
  { id: 2, name: "Đào Văn Nam", phone: "0901 232 512", avatar: "ĐN", type: "p2p" as const },
  { id: 3, name: "Trần Lan", phone: "0912 345 678", avatar: "TL", type: "p2p" as const },
]

const SAVED_BANK = [
  { id: 1, name: "Nguyễn Văn Mạnh", stk: "8288 812 121", bank: "Techcombank", bankShort: "TCB", avatar: "NM", type: "bank" as const },
  { id: 2, name: "Trần Thị Lan", stk: "1023 456 789", bank: "Vietcombank", bankShort: "VCB", avatar: "TL", type: "bank" as const },
]

/* ── Avatar ─────────────────────────────────────────────────── */
function Avatar({ initials, variant = "default" }: { initials: string; variant?: "default" | "bank" }) {
  return (
    <div
      className={`w-[44px] h-[44px] rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 ${
        variant === "bank"
          ? "bg-[#EEF2FF] text-[#4F46E5]"
          : "bg-secondary text-foreground"
      }`}
    >
      {initials}
    </div>
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

/* ── Detect Badge ───────────────────────────────────────────── */
function DetectBadge({ type }: { type: "sdt" | "stk" }) {
  const config = type === "sdt"
    ? { label: "SĐT → Ví VSP", bg: "bg-[#FFF0F2]", text: "text-[#E31837]" }
    : { label: "STK → Ngân hàng", bg: "bg-[#EEF2FF]", text: "text-[#4F46E5]" }
  return (
    <span className={`text-[11px] font-bold px-[10px] py-[4px] rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

/* ── Resolved Card ──────────────────────────────────────────── */
function ResolvedCard({
  name,
  sub,
  badge,
  onTransfer,
}: {
  name: string
  sub: string
  badge: React.ReactNode
  onTransfer: () => void
}) {
  return (
    <div className="bg-secondary rounded-[20px] px-[16px] py-[14px]">
      <div className="flex items-center gap-[12px]">
        <Avatar initials={name.split(" ").map((w) => w[0]).join("").slice(0, 2)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[8px]">
            <p className="text-[15px] font-semibold leading-[22px] text-foreground">{name}</p>
            <Check size={14} className="text-success shrink-0" />
          </div>
          <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">{sub}</p>
        </div>
        {badge}
      </div>
      <div className="pt-[12px]">
        <Button variant="primary" size="32" className="w-full" onClick={onTransfer}>
          Chuyển tiền
        </Button>
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
function TransferSearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "default"

  const isDefault = state === "default"
  const isTypingSdt = state === "typing-sdt"
  const isTypingStk = state === "typing-stk"
  const isTypingName = state === "typing-name"
  const isSdtResolved = state === "sdt-resolved"
  const isStkResolved = state === "stk-resolved"
  const isNoResult = state === "no-result"

  const getInputValue = () => {
    switch (state) {
      case "typing-sdt": return "098"
      case "typing-stk": return "1903"
      case "typing-name": return "Nam"
      case "sdt-resolved": return "0987 654 321"
      case "stk-resolved": return "19038291832"
      case "no-result": return "xyzabc"
      default: return ""
    }
  }

  /* Filter saved results */
  const getP2PResults = () => {
    if (isTypingSdt) return SAVED_P2P.filter((r) => r.phone.replace(/\s/g, "").includes("098"))
    if (isTypingName) return SAVED_P2P.filter((r) => r.name.toLowerCase().includes("nam"))
    return []
  }

  const getBankResults = () => {
    if (isTypingStk) return SAVED_BANK.filter((r) => r.stk.replace(/\s/g, "").includes("1903"))
    if (isTypingName) return SAVED_BANK.filter((r) => r.name.toLowerCase().includes("nam"))
    return []
  }

  const p2pResults = getP2PResults()
  const bankResults = getBankResults()
  const hasResults = p2pResults.length > 0 || bankResults.length > 0

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Status bar ── */}
      <div className="w-full shrink-0 h-[44px]" aria-hidden="true" />

      {/* ── Search bar (custom, no Header) ── */}
      <div className="flex items-center gap-[12px] px-[22px] pb-[12px]">
        <div className="flex-1 flex items-center gap-[10px] bg-secondary rounded-[12px] px-[14px] py-[12px]">
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            className="shrink-0 text-foreground-secondary"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="m16.5 16.5 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={getInputValue()}
            readOnly
            autoFocus={isDefault}
            placeholder="SĐT, STK, hoặc tên người nhận"
            className="flex-1 min-w-0 bg-transparent outline-none text-[15px] font-medium leading-[22px] text-foreground placeholder:text-foreground-secondary"
          />
        </div>
        <button
          type="button"
          onClick={() => router.push("/transfer/entry")}
          className="text-[15px] font-semibold leading-[22px] text-foreground shrink-0"
        >
          Hủy
        </button>
      </div>

      {/* ── Detect badge ── */}
      {(isTypingSdt || isSdtResolved) && (
        <div className="px-[22px] pb-[12px]">
          <DetectBadge type="sdt" />
        </div>
      )}
      {(isTypingStk || isStkResolved) && (
        <div className="px-[22px] pb-[12px]">
          <DetectBadge type="stk" />
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-[34px]">
        {/* ── Default: hint chips ── */}
        {isDefault && (
          <div className="px-[22px] pt-[8px]">
            <p className="text-[13px] font-semibold leading-[18px] text-foreground-secondary uppercase tracking-[0.5px] mb-[12px]">
              Tìm nhanh
            </p>
            <div className="flex flex-wrap gap-[8px] mb-[20px]">
              <span className="text-[13px] font-semibold px-[12px] py-[6px] rounded-full bg-[#FFF0F2] text-[#E31837]">
                SĐT → Ví VSP
              </span>
              <span className="text-[13px] font-semibold px-[12px] py-[6px] rounded-full bg-[#EEF2FF] text-[#4F46E5]">
                STK → Ngân hàng
              </span>
            </div>
            <p className="text-[14px] font-normal leading-[20px] text-foreground-secondary">
              Nhập số điện thoại để tìm ví VSP, hoặc số tài khoản để chuyển đến ngân hàng. Bạn cũng có thể tìm theo tên người nhận đã lưu.
            </p>
          </div>
        )}

        {/* ── Filtered results (typing states) ── */}
        {(isTypingSdt || isTypingStk || isTypingName) && hasResults && (
          <div className="pt-[4px]">
            <p className="px-[22px] text-[13px] font-semibold leading-[18px] text-foreground-secondary uppercase tracking-[0.5px] mb-[8px]">
              Đã lưu
            </p>

            {p2pResults.map((item) => (
              <button
                key={`p2p-${item.id}`}
                type="button"
                onClick={() => router.push(`/transfer/p2p?saved=${item.id}`)}
                className="w-full flex items-center gap-[12px] px-[22px] py-[10px] text-left active:bg-secondary/50 transition-colors"
              >
                <Avatar initials={item.avatar} />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold leading-[22px] text-foreground truncate">
                    <HighlightText text={item.name} highlight={isTypingName ? "Nam" : ""} />
                  </p>
                  <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">
                    <HighlightText text={item.phone} highlight={isTypingSdt ? "098" : ""} />
                  </p>
                </div>
                <span className="text-[11px] font-bold px-[8px] py-[3px] rounded-full bg-[#FFF0F2] text-[#E31837]">
                  VSP
                </span>
              </button>
            ))}

            {bankResults.map((item) => (
              <button
                key={`bank-${item.id}`}
                type="button"
                onClick={() => router.push(`/transfer/bank?saved=${item.id}`)}
                className="w-full flex items-center gap-[12px] px-[22px] py-[10px] text-left active:bg-secondary/50 transition-colors"
              >
                <Avatar initials={item.avatar} variant="bank" />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold leading-[22px] text-foreground truncate">
                    <HighlightText text={item.name} highlight={isTypingName ? "Nam" : ""} />
                  </p>
                  <p className="text-[13px] font-normal leading-[18px] text-foreground-secondary">
                    <HighlightText text={`${item.stk} · ${item.bank}`} highlight={isTypingStk ? "1903" : ""} />
                  </p>
                </div>
                <span className="text-[11px] font-bold px-[8px] py-[3px] rounded-full bg-[#EEF2FF] text-[#4F46E5]">
                  {item.bankShort}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── SĐT Resolved ── */}
        {isSdtResolved && (
          <div className="px-[22px] pt-[8px]">
            <ResolvedCard
              name="LÊ VĂN HÙNG"
              sub="0987 654 321 · Ví VSP"
              badge={
                <span className="text-[11px] font-bold px-[8px] py-[3px] rounded-full bg-[#FFF0F2] text-[#E31837]">
                  VSP
                </span>
              }
              onTransfer={() => router.push("/transfer/p2p?phone=0987654321")}
            />
          </div>
        )}

        {/* ── STK Resolved ── */}
        {isStkResolved && (
          <div className="px-[22px] pt-[8px]">
            <ResolvedCard
              name="NGUYEN VAN MANH"
              sub="19038291832 · Techcombank"
              badge={
                <span className="text-[11px] font-bold px-[8px] py-[3px] rounded-full bg-[#EEF2FF] text-[#4F46E5]">
                  TCB
                </span>
              }
              onTransfer={() => router.push("/transfer/bank?stk=19038291832")}
            />
          </div>
        )}

        {/* ── No result ── */}
        {isNoResult && (
          <div className="flex flex-col items-center pt-[48px] px-[22px]">
            <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center mb-[16px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-secondary">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="m16.5 16.5 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 9l4 4M13 9l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[16px] font-semibold text-foreground text-center mb-[4px]">
              Không tìm thấy
            </p>
            <p className="text-[13px] text-foreground-secondary text-center mb-[20px] leading-[20px]">
              Không có người nhận nào khớp với từ khóa
            </p>
            <div className="flex gap-[8px]">
              <Button
                variant="secondary"
                size="32"
                onClick={() => router.push("/transfer/p2p")}
              >
                Nhập SĐT mới
              </Button>
              <Button
                variant="secondary"
                size="32"
                onClick={() => router.push("/transfer/bank")}
              >
                Nhập STK mới
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function TransferSearchPage() {
  return (
    <React.Suspense fallback={null}>
      <TransferSearchContent />
    </React.Suspense>
  )
}
