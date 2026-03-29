"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight as ChevronR, ArrowUpRight, ArrowDownLeft, TrendingUp, FileText } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { FeedbackState } from "@/components/ui/feedback-state"
import { MOCK_TRANSACTIONS_FULL, MOCK_MONTHLY_STATS, formatVND, formatVNDSigned, getTxIcon } from "../data"
import type { SinhLoiTransaction } from "../data"

/* ── Helpers ───────────────────────────────────────────────────── */
const FILTERS = [
  { label: "Tat ca", value: "all" },
  { label: "Nap tien", value: "deposit" },
  { label: "Rut tien", value: "withdrawal" },
  { label: "Tra lai", value: "interest" },
]

function getStatusColor(status: SinhLoiTransaction["status"]) {
  switch (status) {
    case "success": return "text-success"
    case "pending": return "text-warning"
    case "failed": return "text-danger"
  }
}

function getStatusText(status: SinhLoiTransaction["status"]) {
  switch (status) {
    case "success": return "Thanh cong"
    case "pending": return "Dang xu ly"
    case "failed": return "That bai"
  }
}

function getAmountColor(type: string) {
  switch (type) {
    case "deposit": return "text-success"
    case "withdrawal": return "text-danger"
    default: return "text-success"
  }
}

/** Group transactions by date */
function groupByDate(txs: SinhLoiTransaction[]): { date: string; items: SinhLoiTransaction[] }[] {
  const groups: { date: string; items: SinhLoiTransaction[] }[] = []
  for (const tx of txs) {
    const last = groups[groups.length - 1]
    if (last && last.date === tx.date) {
      last.items.push(tx)
    } else {
      groups.push({ date: tx.date, items: [tx] })
    }
  }
  return groups
}

/* ── Loading skeleton ──────────────────────────────────────────── */
function HistorySkeleton() {
  return (
    <div className="pt-[16px] px-[22px]">
      {/* Filter chips skeleton */}
      <div className="flex gap-[8px] mb-[16px]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[32px] w-[60px] bg-secondary rounded-full animate-pulse" />
        ))}
      </div>
      {/* Row skeletons */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-secondary animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-secondary rounded-full animate-pulse" />
              <div className="h-3 w-1/2 bg-secondary rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-secondary rounded-full animate-pulse" />
              <div className="h-3 w-12 bg-secondary rounded-full animate-pulse ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── S11: Lich su giao dich — BIDV transactions pattern ────────── */
export default function HistoryPage() {
  return <React.Suspense fallback={null}><HistoryContent /></React.Suspense>
}

function HistoryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stateParam = searchParams.get("state")

  const [activeFilter, setActiveFilter] = React.useState("all")
  const [isLoading, setIsLoading] = React.useState(stateParam === "loading")
  const [isError, setIsError] = React.useState(false)

  // Simulate loading
  React.useEffect(() => {
    if (stateParam === "loading") {
      const timer = setTimeout(() => setIsLoading(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [stateParam])

  const filtered = activeFilter === "all"
    ? (stateParam === "empty" ? [] : MOCK_TRANSACTIONS_FULL)
    : MOCK_TRANSACTIONS_FULL.filter((tx) => tx.type === activeFilter)

  const isEmpty = filtered.length === 0
  const grouped = groupByDate(filtered)

  /* ── Error state ─────────────────────────────────────────────── */
  if (isError) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <Header
          variant="large-title"
          largeTitle="Lich su giao dich"
          leading={
            <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center rounded-full">
              <ChevronLeft size={18} className="text-foreground" />
            </button>
          }
        />
        <div className="flex-1 flex items-center justify-center">
          <FeedbackState
            title="Khong the tai lich su"
            description="Vui long thu lai"
            actionLabel="Thu lai"
            actionProps={{ onClick: () => setIsError(false) }}
          />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Lich su giao dich"
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

      {/* Monthly stats — summary cards */}
      <div className="px-[22px] pb-[16px]">
        <div className="flex items-center justify-between mb-[12px]">
          <p className="text-md font-semibold text-foreground">Thong ke</p>
          <div className="flex items-center gap-[8px]">
            <button type="button" className="p-1">
              <ChevronLeft size={16} className="text-foreground-secondary" />
            </button>
            <p className="text-sm font-semibold text-foreground">{MOCK_MONTHLY_STATS.month}</p>
            <button type="button" className="p-1">
              <ChevronR size={16} className="text-foreground-secondary" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[8px]">
          <div className="bg-secondary rounded-[20px] p-[14px]">
            <div className="flex items-center justify-between mb-[4px]">
              <p className="text-sm text-foreground-secondary">Tong tien vao</p>
              <ArrowDownLeft size={16} className="text-success" />
            </div>
            <p className="text-md font-bold tabular-nums text-foreground">{formatVND(MOCK_MONTHLY_STATS.totalIn)}</p>
          </div>
          <div className="bg-secondary rounded-[20px] p-[14px]">
            <div className="flex items-center justify-between mb-[4px]">
              <p className="text-sm text-foreground-secondary">Tong tien ra</p>
              <ArrowUpRight size={16} className="text-danger" />
            </div>
            <p className="text-md font-bold tabular-nums text-foreground">{formatVND(MOCK_MONTHLY_STATS.totalOut)}</p>
          </div>
          <div className="bg-secondary rounded-[20px] p-[14px]">
            <div className="flex items-center justify-between mb-[4px]">
              <p className="text-sm text-foreground-secondary">Tien loi thang</p>
              <TrendingUp size={16} className="text-success" />
            </div>
            <p className="text-md font-bold tabular-nums text-success">{formatVND(MOCK_MONTHLY_STATS.interestMonth)}</p>
          </div>
          <div className="bg-secondary rounded-[20px] p-[14px]">
            <div className="flex items-center justify-between mb-[4px]">
              <p className="text-sm text-foreground-secondary">Tien hoan thang</p>
              <span className="text-success text-xs">$</span>
            </div>
            <p className="text-md font-bold tabular-nums text-success">{formatVND(MOCK_MONTHLY_STATS.cashbackMonth)}</p>
          </div>
        </div>
      </div>

      {/* Filter chips — BIDV pattern: horizontal scroll */}
      <div className="px-[22px] pb-[8px]">
        <div className="flex gap-[8px] overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActiveFilter(f.value)}
              className={`shrink-0 px-[14px] py-[6px] rounded-full text-sm font-semibold leading-5 transition-colors ${
                activeFilter === f.value
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Note T-1 */}
      <div className="px-[22px] pb-[8px]">
        <p className="text-xs text-foreground-secondary">
          Giao dich hom nay se hien thi vao ngay mai
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-[21px]">
        {/* Loading — skeleton */}
        {isLoading && <HistorySkeleton />}

        {/* Empty — FeedbackState */}
        {!isLoading && isEmpty && (
          <div className="pt-[32px] px-[22px]">
            <FeedbackState
              icon={
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <FileText size={32} className="text-foreground-secondary" />
                </div>
              }
              title={activeFilter !== "all" ? "Khong tim thay giao dich" : "Chua co giao dich nao"}
              description={
                activeFilter !== "all"
                  ? undefined
                  : "Nap tien vao vi sinh loi de bat dau giao dich"
              }
              actionLabel={activeFilter !== "all" ? "Xoa bo loc" : undefined}
              actionProps={activeFilter !== "all" ? { onClick: () => setActiveFilter("all") } : undefined}
            />
          </div>
        )}

        {/* Loaded — grouped by date (BIDV pattern) */}
        {!isLoading && !isEmpty && (
          <div className="pt-[16px]">
            {grouped.map((section) => (
              <div key={section.date}>
                {/* Date group header */}
                <div className="px-[22px] pt-[16px] pb-[8px]">
                  <p className="text-sm font-semibold leading-5 text-foreground-secondary">
                    {section.date}
                  </p>
                </div>

                {/* Transaction items */}
                <div className="px-[22px]">
                  <ItemList>
                    {section.items.map((tx, idx) => {
                      const icon = getTxIcon(tx.type)
                      return (
                        <ItemListItem
                          key={tx.id}
                          prefix={
                            <div className={`w-full h-full rounded-full flex items-center justify-center ${icon.bg}`}>
                              {tx.type === "deposit" ? <ArrowDownLeft size={20} className={icon.color} /> :
                               tx.type === "withdrawal" ? <ArrowUpRight size={20} className={icon.color} /> :
                               <TrendingUp size={20} className={icon.color} />}
                            </div>
                          }
                          label={tx.label}
                          sublabel={tx.date}
                          suffix={
                            <div className="shrink-0 flex flex-col gap-1 items-end">
                              <span className={`text-md font-semibold leading-6 ${getAmountColor(tx.type)}`}>
                                {formatVNDSigned(tx.amount)}
                              </span>
                              <span className={`text-sm font-normal leading-5 ${getStatusColor(tx.status)}`}>
                                {getStatusText(tx.status)}
                              </span>
                            </div>
                          }
                          divider={idx < section.items.length - 1}
                          onPress={() => router.push(`/sinhloi/history/${tx.id}`)}
                        />
                      )
                    })}
                  </ItemList>
                </div>
              </div>
            ))}

            {/* End of list footer */}
            <div className="px-[22px] pt-[24px] pb-[16px]">
              <p className="text-xs text-foreground-secondary text-center">
                Da hien thi tat ca giao dich
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
