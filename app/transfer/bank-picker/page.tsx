"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Search, Building2 } from "lucide-react"

/* ── Mock Bank Data ──────────────────────────────────────────── */
const POPULAR_BANKS = [
  { id: "vcb", name: "Vietcombank", short: "VCB" },
  { id: "tcb", name: "Techcombank", short: "TCB" },
  { id: "bidv", name: "BIDV", short: "BIDV" },
  { id: "mb", name: "MB Bank", short: "MB" },
  { id: "acb", name: "ACB", short: "ACB" },
  { id: "vpb", name: "VPBank", short: "VPB" },
  { id: "tpb", name: "TPBank", short: "TPB" },
  { id: "msb", name: "MSB", short: "MSB" },
]

const ALL_BANKS = [
  { id: "vcb", name: "Ngân hàng TMCP Ngoại Thương Việt Nam", short: "Vietcombank" },
  { id: "tcb", name: "Ngân hàng TMCP Kỹ Thương Việt Nam", short: "Techcombank" },
  { id: "bidv", name: "Ngân hàng TMCP Đầu Tư và Phát Triển Việt Nam", short: "BIDV" },
  { id: "mb", name: "Ngân hàng TMCP Quân Đội", short: "MB Bank" },
  { id: "acb", name: "Ngân hàng TMCP Á Châu", short: "ACB" },
  { id: "vpb", name: "Ngân hàng TMCP Việt Nam Thịnh Vượng", short: "VPBank" },
  { id: "tpb", name: "Ngân hàng TMCP Tiên Phong", short: "TPBank" },
  { id: "msb", name: "Ngân hàng TMCP Hàng Hải Việt Nam", short: "MSB" },
  { id: "shb", name: "Ngân hàng TMCP Sài Gòn - Hà Nội", short: "SHB" },
  { id: "stb", name: "Ngân hàng TMCP Sài Gòn Thương Tín", short: "Sacombank" },
  { id: "eib", name: "Ngân hàng TMCP Xuất Nhập Khẩu Việt Nam", short: "Eximbank" },
  { id: "hdb", name: "Ngân hàng TMCP Phát Triển Nhà TP.HCM", short: "HDBank" },
]

/* ── Page ──────────────────────────────────────────────────────── */
function BankPickerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "default"

  const isSearching = state === "searching"
  const isNoResult = state === "no-result"
  const searchQuery = isSearching ? "Techcom" : isNoResult ? "XYZBANK" : ""

  const filteredBanks = isSearching
    ? ALL_BANKS.filter((b) => b.short.toLowerCase().includes("techcom"))
    : []

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Status bar */}
      <div className="w-full shrink-0 h-[44px]" aria-hidden="true" />

      {/* Sheet handle */}
      <div className="w-full flex justify-center py-[8px]">
        <div className="w-9 h-[6px] rounded-full bg-grey-200" />
      </div>

      {/* Title */}
      <div className="px-[22px] pb-[8px]">
        <div className="flex items-center h-[56px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full shrink-0"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
          <p className="flex-1 text-[18px] font-bold leading-7 text-foreground">Chọn ngân hàng</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="w-full flex items-center gap-[12px] px-[10px] py-[8px]">
        <div className="flex-1 flex items-center gap-[12px] bg-search rounded-full pl-[14px] pr-[12px] py-[8px]">
          <Search size={24} className="shrink-0 text-foreground-secondary" />
          <input
            type="text"
            defaultValue={searchQuery}
            placeholder="Tìm ngân hàng"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm font-medium leading-5 text-foreground placeholder:text-foreground-secondary"
            readOnly
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Default: Popular banks grid + full list */}
        {state === "default" && (
          <>
            {/* Popular banks */}
            <div className="pt-[16px] px-[22px]">
              <p className="text-sm font-semibold leading-5 text-foreground mb-[12px]">Phổ biến</p>
              <div className="grid grid-cols-4 gap-[12px]">
                {POPULAR_BANKS.map((bank) => (
                  <button
                    key={bank.id}
                    type="button"
                    className="flex flex-col items-center gap-[6px]"
                  >
                    <div className="w-[48px] h-[48px] rounded-[14px] bg-secondary flex items-center justify-center">
                      <span className="text-xs font-bold text-foreground leading-none">{bank.short}</span>
                    </div>
                    <p className="text-xs font-normal leading-4 text-foreground-secondary text-center truncate w-full">
                      {bank.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Full list */}
            <div className="pt-[32px] px-[22px]">
              <p className="text-sm font-semibold leading-5 text-foreground mb-[8px]">Tất cả ngân hàng</p>
              {ALL_BANKS.map((bank, idx) => (
                <button
                  key={bank.id}
                  type="button"
                  className={`w-full flex items-center gap-3 py-3 text-left ${
                    idx < ALL_BANKS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="w-[40px] h-[40px] rounded-[10px] bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-foreground leading-none">{bank.short.slice(0, 3)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-5 text-foreground truncate">{bank.short}</p>
                    <p className="text-xs font-normal leading-4 text-foreground-secondary truncate">{bank.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Searching: filtered results */}
        {isSearching && (
          <div className="pt-[16px] px-[22px]">
            <p className="text-xs font-normal leading-5 text-foreground-secondary mb-[8px]">Kết quả</p>
            {filteredBanks.map((bank, idx) => (
              <button
                key={bank.id}
                type="button"
                className={`w-full flex items-center gap-3 py-3 text-left ${
                  idx < filteredBanks.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="w-[40px] h-[40px] rounded-[10px] bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-foreground leading-none">TCB</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-5 text-foreground truncate">
                    <span className="text-success">Techcom</span>bank
                  </p>
                  <p className="text-xs font-normal leading-4 text-foreground-secondary truncate">{bank.name}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No result */}
        {isNoResult && (
          <div className="flex-1 flex flex-col items-center justify-center px-[22px] pt-[80px]">
            <div className="w-16 h-16 flex items-center justify-center mb-[16px]">
              <Building2 size={48} className="text-foreground-secondary" />
            </div>
            <p className="text-lg font-medium leading-6 tracking-[-0.005em] text-foreground text-center">
              Không tìm thấy ngân hàng
            </p>
            <p className="text-sm font-normal leading-5 text-foreground-secondary text-center mt-[4px]">
              Vui lòng kiểm tra lại tên hoặc mã ngân hàng
            </p>
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

export default function BankPickerPage() {
  return (
    <React.Suspense fallback={null}>
      <BankPickerContent />
    </React.Suspense>
  )
}
