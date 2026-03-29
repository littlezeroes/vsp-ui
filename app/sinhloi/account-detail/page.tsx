"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Eye, EyeOff, ArrowDownLeft, TrendingUp, ArrowUpRight, Settings, Info, HelpCircle, Calendar, ArrowUpDown } from "lucide-react"
import { Header } from "@/components/ui/header"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import {
  MOCK_BALANCE, MOCK_ACCOUNT_BREAKDOWN, MOCK_DAILY_INTEREST, MOCK_PROFIT,
  MOCK_MONTHLY_STATS, SINHLOI_CONFIG, formatVND,
} from "../data"

/* ── S19: Chi tiet tai khoan — Architectural Redesign ──────────── */
export default function AccountDetailPage() {
  const router = useRouter()
  const [hidden, setHidden] = React.useState(false)
  const [showO2, setShowO2] = React.useState(false)
  const [showO3, setShowO3] = React.useState(false)
  const [showYear, setShowYear] = React.useState(false)

  const { balance } = MOCK_BALANCE
  const { totalDeposited, totalInterest, totalWithdrawn } = MOCK_ACCOUNT_BREAKDOWN
  const { interestRate } = SINHLOI_CONFIG

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const monthlyProfit = MOCK_PROFIT[0]?.months.find((m) => m.month === currentMonth)
  const yearData = MOCK_PROFIT[0]

  const data = MOCK_DAILY_INTEREST
  const streakCount = data.filter((d) => d.amount > 0).length

  /* Year month grid for sheet */
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1
    const found = yearData?.months.find((m) => m.month === monthNum)
    return { month: monthNum, amount: found?.amount ?? 0, isEstimate: found?.isEstimate ?? false, hasData: !!found }
  })

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Sinh loi"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
        trailing={
          <button type="button" onClick={() => router.push("/sinhloi/settings")} className="w-[44px] h-[44px] flex items-center justify-center">
            <Settings size={20} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* ── 1. Hero — Centered balance ─────────────── */}
        <div className="px-[22px] pt-[8px]">
          <div className="text-center">
            <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em]">TONG SO DU</p>
            <div className="flex items-center justify-center gap-[8px] mt-[4px]">
              <p className="text-[36px] font-extrabold leading-[40px] tabular-nums text-foreground tracking-tight">
                {hidden ? "••••••••" : formatVND(balance)}
              </p>
              <button type="button" onClick={() => setHidden(!hidden)} className="p-1">
                {hidden ? <EyeOff size={18} className="text-foreground-secondary" /> : <Eye size={18} className="text-foreground-secondary" />}
              </button>
            </div>
            <p className="text-[11px] text-foreground-secondary mt-[4px]">{interestRate}%/nam</p>
          </div>
        </div>

        {/* ── 2. CTA — Full-width Nap / Rut ──────────── */}
        <div className="pt-[24px] px-[22px]">
          <button
            type="button"
            onClick={() => router.push("/sinhloi/deposit")}
            className="w-full h-[52px] rounded-full bg-foreground text-background font-bold text-[14px] flex items-center justify-center gap-[8px] tracking-[0.1em]"
          >
            <ArrowUpDown size={18} />
            NAP / RUT
          </button>
        </div>

        {/* ── 3. Streak — Dark monolith card ─────────── */}
        <div className="pt-[32px] px-[22px]">
          <div className="bg-foreground text-background rounded-[28px] p-[24px]">
            {/* Profit summary row */}
            <div className="flex items-center justify-between mb-[20px]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-50">LOI NHUAN THANG {currentMonth}</p>
                <p className="text-[22px] font-extrabold tabular-nums mt-[2px]">
                  {hidden ? "••••" : `+${formatVND(monthlyProfit?.amount ?? 0)}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-50">NGAY TRA</p>
                <p className="text-[18px] font-bold mt-[2px]">27/{String(currentMonth).padStart(2, "0")}</p>
              </div>
            </div>

            {/* 7-day streak grid — square dots */}
            <div className="grid grid-cols-7 gap-[6px]">
              {data.map((d, i) => {
                const isToday = i === data.length - 1
                const isEarned = d.amount > 0 && !isToday

                return (
                  <div key={d.date} className="flex flex-col items-center gap-[4px]">
                    <div
                      className={`w-full aspect-square rounded-[8px] flex items-center justify-center text-[13px] font-bold ${
                        isEarned
                          ? "bg-background text-foreground"
                          : isToday
                            ? "bg-background/20 text-background"
                            : "bg-background/10"
                      }`}
                    >
                      {isEarned ? "✓" : isToday ? "·" : ""}
                    </div>
                    <span className={`text-[9px] font-bold ${isToday ? "text-background" : "text-background/40"}`}>
                      {d.day}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Streak count */}
            <div className="text-center mt-[14px]">
              <span className="text-[12px] font-bold opacity-60">{streakCount} ngay lien tiep</span>
              {!hidden && (
                <span className="text-[12px] font-bold opacity-60 ml-[6px]">· +{formatVND(data.reduce((s, d) => s + d.amount, 0))}</span>
              )}
            </div>

            {/* Year summary — tap to open sheet */}
            <button
              type="button"
              onClick={() => setShowYear(true)}
              className="w-full flex items-center justify-between mt-[20px] pt-[16px] border-t border-background/10"
            >
              <div className="flex items-center gap-[8px]">
                <Calendar size={14} className="opacity-50" />
                <span className="text-[12px] font-bold">Nam {yearData?.year ?? currentYear}</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="text-[13px] font-bold tabular-nums">
                  {hidden ? "••••" : `+${formatVND(yearData?.total ?? 0)}`}
                </span>
                <ChevronRight size={14} className="opacity-40" />
              </div>
            </button>
          </div>
        </div>

        {/* ── 4. Thong ke — Single card ────────────── */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px] ml-[2px]">THONG KE</p>
          <div className="bg-secondary rounded-[28px] p-[20px]">
            <p className="text-[13px] font-bold text-foreground mb-[16px]">{MOCK_MONTHLY_STATS.month}</p>
            <div className="space-y-[12px]">
              {[
                { label: "Tong tien vao", amount: MOCK_MONTHLY_STATS.totalIn, sign: "+" },
                { label: "Tong tien ra", amount: MOCK_MONTHLY_STATS.totalOut, sign: "-" },
                { label: "Tien loi thang", amount: MOCK_MONTHLY_STATS.interestMonth, sign: "+" },
                { label: "Tien hoan thang", amount: MOCK_MONTHLY_STATS.cashbackMonth, sign: "" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <p className="text-[14px] text-foreground-secondary">{row.label}</p>
                  <p className="text-[14px] font-bold tabular-nums text-foreground">
                    {hidden ? "••••" : `${row.sign}${formatVND(row.amount)}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 5. Breakdown — Section header + individual rows ── */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px] ml-[2px]">CHI TIET TAI KHOAN</p>
          <div className="space-y-[8px]">
            {[
              { label: "Da nap", amount: totalDeposited, sign: "+", icon: <ArrowDownLeft size={18} />, filter: "deposit" },
              { label: "Tien loi", amount: totalInterest, sign: "+", icon: <TrendingUp size={18} />, filter: "interest" },
              { label: "Rut & thanh toan", amount: totalWithdrawn, sign: "-", icon: <ArrowUpRight size={18} />, filter: "withdrawal" },
            ].map((row) => (
              <button
                key={row.label}
                type="button"
                onClick={() => router.push(`/sinhloi/history?filter=${row.filter}`)}
                className="w-full flex items-center gap-[12px] p-[16px] bg-secondary rounded-[20px]"
              >
                <div className="w-[40px] h-[40px] rounded-[10px] bg-background flex items-center justify-center shrink-0">
                  {row.icon}
                </div>
                <p className="flex-1 text-[14px] font-semibold text-foreground text-left">{row.label}</p>
                <p className="text-[14px] font-bold tabular-nums text-foreground">
                  {hidden ? "••••" : `${row.sign}${formatVND(row.amount)}`}
                </p>
                <ChevronRight size={16} className="text-foreground-secondary shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* ── 5. Support — Section header + cards ─────── */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px] ml-[2px]">HO TRO & THONG TIN</p>
          <div className="space-y-[8px]">
            <button type="button" onClick={() => setShowO2(true)} className="w-full flex items-center gap-[12px] p-[16px] bg-secondary rounded-[20px]">
              <div className="w-[40px] h-[40px] rounded-[10px] bg-background flex items-center justify-center shrink-0">
                <HelpCircle size={18} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-semibold text-foreground">Tim hieu</p>
                <p className="text-[11px] text-foreground-secondary">Cach toi uu loi nhuan cua ban</p>
              </div>
              <ChevronRight size={16} className="text-foreground-secondary" />
            </button>

            <button type="button" onClick={() => setShowO3(true)} className="w-full flex items-center gap-[12px] p-[16px] bg-secondary rounded-[20px]">
              <div className="w-[40px] h-[40px] rounded-[10px] bg-background flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-semibold text-foreground">Thoi diem tra loi nhuan</p>
                <p className="text-[11px] text-foreground-secondary">Ngay 27 hang thang</p>
              </div>
              <ChevronRight size={16} className="text-foreground-secondary" />
            </button>

            <button type="button" onClick={() => router.push("/sinhloi/faq")} className="w-full flex items-center gap-[12px] p-[16px] bg-secondary rounded-[20px]">
              <div className="w-[40px] h-[40px] rounded-[10px] bg-background flex items-center justify-center shrink-0">
                <Info size={18} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-semibold text-foreground">FAQ</p>
                <p className="text-[11px] text-foreground-secondary">Cau hoi thuong gap & Tro giup</p>
              </div>
              <ChevronRight size={16} className="text-foreground-secondary" />
            </button>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-[32px]" />
      </div>

      {/* ── Fixed CTA bottom ─────────────────────────── */}
      {/* Already has NẠP / RÚT at top — no duplicate needed */}

      {/* ── Home indicator ───────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* ── Year Sheet — Month grid ──────────────────── */}
      <BottomSheet open={showYear} onClose={() => setShowYear(false)}>
        <div className="px-[22px] pb-[32px]">
          <div className="flex items-center gap-[8px] mb-[16px]">
            <button type="button" onClick={() => setShowYear(false)} className="text-lg">✕</button>
            <p className="flex-1 text-center text-lg font-semibold">Lich su sinh loi</p>
            <div className="w-[18px]" />
          </div>

          {/* Total */}
          <div className="text-center mb-[24px]">
            <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em]">NAM {yearData?.year ?? currentYear}</p>
            <p className="text-[28px] font-extrabold tabular-nums text-foreground mt-[4px]">
              {hidden ? "••••" : `+${formatVND(yearData?.total ?? 0)}`}
            </p>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-[8px]">
            {months.map((m) => {
              const isCurrent = m.month === currentMonth
              return (
                <div
                  key={m.month}
                  className={`rounded-[16px] p-[14px] min-h-[72px] ${
                    isCurrent ? "bg-foreground text-background" : "bg-secondary text-foreground"
                  }`}
                >
                  <p className={`text-[12px] font-bold ${isCurrent ? "opacity-60" : "text-foreground-secondary"}`}>
                    Thang {m.month}
                  </p>
                  {m.hasData && !hidden && (
                    <p className={`text-[13px] font-bold tabular-nums mt-[4px] ${isCurrent ? "" : "text-foreground"}`}>
                      {m.isEstimate ? "~" : "+"}{formatVND(m.amount)}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </BottomSheet>

      {/* ── O2: Tong loi nhuan tam tinh ────────────────── */}
      <BottomSheet open={showO2} onClose={() => setShowO2(false)}>
        <div className="px-[22px] pb-[32px]">
          <div className="flex items-center gap-[8px] mb-[16px]">
            <button type="button" onClick={() => setShowO2(false)} className="text-lg">✕</button>
            <p className="flex-1 text-center text-lg font-semibold">Tong loi nhuan tam tinh</p>
            <div className="w-[18px]" />
          </div>

          <div className="text-center mb-[24px]">
            <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em]">LOI NHUAN TAM TINH</p>
            <p className="text-[28px] font-extrabold tabular-nums text-foreground mt-[4px]">
              {formatVND(monthlyProfit?.amount ?? 0)}
            </p>
          </div>

          <div className="flex items-start gap-[10px] mb-[12px]">
            <div className="w-[22px] h-[22px] rounded-[6px] bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">1</div>
            <p className="text-sm text-foreground">Loi nhuan hang ngay voi cong thuc sau</p>
          </div>

          <div className="bg-secondary rounded-[16px] p-[16px] mb-[16px]">
            <div className="flex items-center justify-center gap-[8px] text-sm">
              <div className="text-right">
                <p className="font-semibold text-xs">Loi nhuan moi ngay</p>
                <p className="font-semibold text-xs">tam tinh (VND)</p>
              </div>
              <span className="text-xl font-bold">=</span>
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold">So du sinh loi × Loi suat (%)</p>
                <div className="w-full h-[1px] bg-foreground-secondary my-[4px]" />
                <p className="text-xs font-semibold">365 ngay</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-foreground-secondary mb-[16px]">
            * So du sinh loi la so tien co trong tai khoan da duoc phan bo de sinh loi thong qua viec nam giu CCTG va cac tai san khac (neu co)
          </p>

          <div className="flex items-start gap-[10px] mb-[12px]">
            <div className="w-[22px] h-[22px] rounded-[6px] bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">2</div>
            <p className="text-sm text-foreground">Tong loi nhuan tam tinh voi cong thuc sau</p>
          </div>

          <div className="bg-secondary rounded-[16px] p-[16px] mb-[16px]">
            <div className="flex items-center justify-center gap-[8px] text-sm">
              <div className="text-right">
                <p className="font-semibold text-xs">Tong loi nhuan</p>
                <p className="font-semibold text-xs">tam tinh (VND)</p>
              </div>
              <span className="text-xl font-bold">=</span>
              <div className="flex items-center gap-[4px]">
                <span className="text-2xl font-light">∑</span>
                <div>
                  <p className="text-xs font-semibold">Loi nhuan moi ngay</p>
                  <p className="text-xs font-semibold">tam tinh (VND)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-[10px] mb-[8px]">
            <div className="w-[22px] h-[22px] rounded-[6px] bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">3</div>
            <p className="text-sm text-foreground">Ngay kich hoat sinh loi</p>
          </div>
          <div className="flex items-start gap-[10px]">
            <div className="w-[22px] h-[22px] rounded-[6px] bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">4</div>
            <p className="text-sm text-foreground">Ngay bat dau ghi nhan sinh loi</p>
          </div>
        </div>
      </BottomSheet>

      {/* ── O3: Thoi diem tra loi nhuan ────────────────── */}
      <BottomSheet open={showO3} onClose={() => setShowO3(false)}>
        <div className="px-[22px] pb-[32px]">
          <div className="flex items-center gap-[8px] mb-[16px]">
            <button type="button" onClick={() => setShowO3(false)} className="text-lg">✕</button>
            <p className="flex-1 text-center text-lg font-semibold">Thoi diem tra loi nhuan</p>
            <div className="w-[18px]" />
          </div>
          <p className="text-md text-foreground mb-[8px]">
            <span className="font-bold">Loi nhuan thuc nhan</span> se duoc chuyen toi tai khoan cua ban vao <span className="font-bold">ngay 27 hang thang</span>.
          </p>
          <p className="text-sm text-foreground-secondary mb-[20px]">
            VD: Loi nhuan thuc nhan thang 3 se duoc tra vao ngay 27/03
          </p>

          <div className="flex items-center justify-between py-[16px]">
            <div className="flex flex-col items-center gap-[4px]">
              <div className="px-[12px] py-[6px] rounded-[8px] bg-foreground/15 text-foreground text-sm font-bold">27/02</div>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-foreground/30 mx-[4px]" />
            <div className="flex flex-col items-center gap-[4px]">
              <div className="px-[12px] py-[6px] rounded-[8px] bg-foreground text-background text-sm font-bold">26/03</div>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-foreground/30 mx-[4px]" />
            <div className="flex flex-col items-center gap-[4px]">
              <div className="px-[12px] py-[6px] rounded-[8px] bg-foreground/15 text-foreground text-sm font-bold">27/03</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[60px]" />
            <p className="text-xs text-foreground-secondary text-center flex-1">1 chu ky tinh loi nhuan</p>
            <p className="text-xs text-foreground-secondary text-center w-[80px]">Ngay tra loi nhuan</p>
          </div>

          <div className="bg-secondary rounded-[16px] p-[14px] mt-[20px]">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Luu y:</span> Loi nhuan se duoc chuyen vao so du vi V-Smart Pay. Ban co the rut ve ngan hang bat ky luc nao.
            </p>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
