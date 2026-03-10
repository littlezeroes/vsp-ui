"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronDown } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemListItem } from "@/components/ui/item-list"
import { MOCK_PROFIT, formatVND, formatVNDSigned } from "../data"

/* ── S13: Tong ket loi nhuan ──────────────────────────────────────── */
export default function ProfitPage() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = React.useState(MOCK_PROFIT[0]?.year || 2026)
  const [showYearDropdown, setShowYearDropdown] = React.useState(false)

  const yearData = MOCK_PROFIT.find((p) => p.year === selectedYear)
  const years = MOCK_PROFIT.map((p) => p.year)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="default"
        title="Tong ket loi nhuan"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[40px]">
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
            {yearData.months.map((month) => (
              <ItemListItem
                key={month.month}
                label={`Thang ${month.month}`}
                metadata={
                  month.isEstimate
                    ? `du kien ${formatVNDSigned(month.amount)}`
                    : formatVNDSigned(month.amount)
                }
                suffix={
                  month.isEstimate
                    ? <span className="text-md text-foreground-secondary">du kien {formatVNDSigned(month.amount)}</span>
                    : <span className="text-md font-semibold text-success">{formatVNDSigned(month.amount)}</span>
                }
                divider
              />
            ))}

            {/* Total */}
            <div className="pt-[32px]">
              <p className="text-md text-foreground-secondary mb-1">Tong loi nhuan da nhan</p>
              <p className="text-lg font-bold text-success">{formatVNDSigned(yearData.total)}</p>
            </div>
          </div>
        ) : (
          <div className="px-[22px] pt-[32px]">
            <p className="text-md text-foreground-secondary text-center">Chua co du lieu loi nhuan</p>
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
