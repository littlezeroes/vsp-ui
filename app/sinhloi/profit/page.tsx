"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronDown } from "lucide-react"
import { Header } from "@/components/ui/header"
import { FeedbackState } from "@/components/ui/feedback-state"
import { MOCK_PROFIT, formatVND, formatVNDSigned } from "../data"

/* ── Loading skeleton ──────────────────────────────────────────── */
function ProfitSkeleton() {
  return (
    <div className="px-[22px] pt-[16px]">
      <div className="h-[36px] w-[100px] bg-secondary rounded-full animate-pulse mb-[24px]" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center py-[12px]">
            <div className="h-4 w-20 bg-secondary rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-secondary rounded-full animate-pulse" />
          </div>
        ))}
      </div>
      <div className="pt-[32px]">
        <div className="h-5 w-40 bg-secondary rounded-full animate-pulse mb-2" />
        <div className="h-7 w-32 bg-secondary rounded-full animate-pulse" />
      </div>
    </div>
  )
}

/* ── S13: Tong ket loi nhuan — enhanced with states ────────────── */
export default function ProfitPage() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = React.useState(MOCK_PROFIT[0]?.year || 2026)
  const [showYearDropdown, setShowYearDropdown] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isError, setIsError] = React.useState(false)

  const yearData = MOCK_PROFIT.find((p) => p.year === selectedYear)
  const years = MOCK_PROFIT.map((p) => p.year)
  const isEmpty = MOCK_PROFIT.length === 0

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Current month for highlight
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  /* ── Error state ─────────────────────────────────────────────── */
  if (isError) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <Header
          variant="large-title"
          largeTitle="Tong ket loi nhuan"
          leading={
            <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
              <ChevronLeft size={24} className="text-foreground" />
            </button>
          }
        />
        <div className="flex-1 flex items-center justify-center">
          <FeedbackState
            title="Khong the tai du lieu"
            description="Vui long thu lai"
            actionLabel="Thu lai"
            actionProps={{ onClick: () => setIsError(false) }}
          />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Tong ket loi nhuan"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[40px]">
        {/* Loading */}
        {isLoading && <ProfitSkeleton />}

        {/* Empty state */}
        {!isLoading && isEmpty && (
          <div className="pt-[32px] px-[22px]">
            <FeedbackState
              title="Chua co du lieu loi nhuan"
              description="Bat dau nap tien de sinh loi!"
              actionLabel="Nap tien"
              actionProps={{ onClick: () => router.push("/sinhloi/deposit-withdraw?tab=deposit") }}
            />
          </div>
        )}

        {/* Loaded */}
        {!isLoading && !isEmpty && (
          <>
            {/* Year dropdown */}
            <div className="px-[22px] py-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                  className="flex items-center gap-2 bg-secondary rounded-full px-[14px] py-[8px]"
                >
                  <span className="text-sm font-semibold text-foreground">Nam {selectedYear}</span>
                  <ChevronDown size={16} className="text-foreground-secondary" />
                </button>

                {showYearDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-background rounded-[14px] shadow-lg z-10 min-w-[120px] py-1">
                    {years.map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => { setSelectedYear(year); setShowYearDropdown(false) }}
                        className={`w-full text-left px-[14px] py-[10px] text-sm ${
                          selectedYear === year ? "font-semibold text-foreground" : "text-foreground-secondary"
                        }`}
                      >
                        Nam {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Monthly breakdown */}
            {yearData ? (
              <div className="px-[22px]">
                {yearData.months.map((month) => {
                  const isCurrentMonth = selectedYear === currentYear && month.month === currentMonth
                  return (
                    <div
                      key={month.month}
                      className={`flex items-center justify-between py-[14px] border-b border-border ${
                        isCurrentMonth ? "bg-success/5 -mx-[22px] px-[22px] rounded-[14px]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-md text-foreground">Thang {month.month}</span>
                        {month.isEstimate && (
                          <span className="text-xs font-semibold text-warning bg-warning/10 px-[8px] py-[2px] rounded-full">
                            Uoc tinh
                          </span>
                        )}
                      </div>
                      <span className={`text-md font-semibold tabular-nums ${
                        month.isEstimate ? "text-foreground-secondary" : "text-success"
                      }`}>
                        {formatVNDSigned(month.amount)}
                      </span>
                    </div>
                  )
                })}

                {/* Total */}
                <div className="pt-[32px]">
                  <p className="text-md text-foreground-secondary mb-1">Tong loi nhuan nam {selectedYear}</p>
                  <p className="text-lg font-bold text-success">{formatVNDSigned(yearData.total)}</p>
                </div>

                {/* Disclaimer */}
                <div className="pt-[16px]">
                  <p className="text-xs text-foreground-secondary">
                    Loi nhuan la tam tinh, duoc tinh dua tren so du cuoi ngay va lai suat hien hanh.
                  </p>
                </div>
              </div>
            ) : (
              <div className="px-[22px] pt-[32px]">
                <p className="text-md text-foreground-secondary text-center">Chua co du lieu loi nhuan</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
