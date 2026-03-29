"use client"

import { Eye, EyeOff, ChevronLeft, ArrowDownLeft, ArrowUpRight, TrendingUp, ChevronRight, Settings, ArrowUpDown } from "lucide-react"
import { useState } from "react"

/* ── Mock data ─────────────────────────────────────────────────────── */
const balance = 5_000_000
const yesterdayInterest = 685
const monthEstimated = 12_500
const totalReceived = 275_000
const interestRate = 4.5
const payoutDay = "27/04"

const dailyData = [
  { day: "16/03", amount: 672 },
  { day: "17/03", amount: 680 },
  { day: "18/03", amount: 685 },
  { day: "19/03", amount: 678 },
  { day: "20/03", amount: 690 },
  { day: "21/03", amount: 683 },
  { day: "Hôm qua", amount: 685 },
]

const txs = [
  { id: "1", type: "interest" as const, label: "Trả lãi tháng 2", amount: 18200, date: "27/02/2026" },
  { id: "2", type: "deposit" as const, label: "Nạp tiền", amount: 1000000, date: "15/02/2026" },
  { id: "3", type: "interest" as const, label: "Trả lãi tháng 1", amount: 16800, date: "27/01/2026" },
  { id: "4", type: "withdrawal" as const, label: "Rút tiền", amount: -500000, date: "10/01/2026" },
]

function fmt(n: number) {
  return Math.abs(n).toLocaleString("vi-VN")
}

/* ── Streak Dots (Duolingo-style — interest always accrues) ──────── */
function StreakDots({ data, hidden }: { data: typeof dailyData; hidden: boolean }) {
  const streak = data.length // always full streak since interest always accrues

  if (hidden) {
    return (
      <div className="flex items-center justify-center h-[80px]">
        <p className="text-foreground-secondary text-sm">Ẩn biểu đồ</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-[4px]">
        {data.map((d, i) => {
          const isLast = i === data.length - 1
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-[4px]">
              <p className={`text-[10px] tabular-nums ${isLast ? "font-semibold text-foreground" : "text-foreground-secondary"}`}>
                +{fmt(d.amount)}
              </p>
              <div
                className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-[13px] font-bold ${
                  isLast
                    ? "bg-foreground text-background"
                    : "bg-foreground/15 text-foreground"
                }`}
              >
                ✓
              </div>
              <p className={`text-[10px] ${isLast ? "font-semibold text-foreground" : "text-foreground-secondary"}`}>
                {d.day}
              </p>
            </div>
          )
        })}
      </div>
      <div className="text-center mt-[10px]">
        <span className="text-[13px] font-semibold text-foreground">{streak} ngày liên tiếp</span>
        <span className="text-[12px] text-foreground-secondary ml-[6px]">· Tổng +{fmt(data.reduce((s, d) => s + d.amount, 0))}đ</span>
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function VizA() {
  const [hidden, setHidden] = useState(false)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Status bar */}
      <div className="h-[44px] px-[22px] flex items-end justify-between text-xs font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-[3px]">
          <div className="flex gap-[2px]">{[1,2,3,4].map(i=><div key={i} className="w-[3px] rounded-full bg-foreground" style={{height:4+i*2}} />)}</div>
          <div className="flex gap-[2px] ml-1">{[1,2,3,4].map(i=><div key={i} className="w-[3px] rounded-full bg-foreground" style={{height:4+i*2}} />)}</div>
          <div className="w-[22px] h-[11px] rounded-[3px] border-[1.5px] border-foreground relative ml-1">
            <div className="absolute inset-[1.5px] bg-foreground rounded-[1px]" style={{width:'65%'}} />
            <div className="absolute -right-[3px] top-[2.5px] w-[1.5px] h-[4px] bg-foreground rounded-r-full" />
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="h-[44px] px-[22px] flex items-center justify-between">
        <button className="w-[44px] h-[44px] flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-[12px]">
          <button className="w-[44px] h-[44px] flex items-center justify-center">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Dark hero — balance + yesterday interest */}
        <div className="mx-[22px] mt-[8px] bg-foreground text-background rounded-[28px] p-[20px]">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium opacity-60">Số dư sinh lời</p>
            <button onClick={() => setHidden(!hidden)} className="opacity-50">
              {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-[32px] font-bold tracking-tight mt-[4px] tabular-nums">
            {hidden ? "••••••••" : `${fmt(balance)}đ`}
          </p>
          <div className="flex items-center gap-[8px] mt-[8px]">
            <div className="px-[10px] py-[3px] rounded-full bg-background/15 text-[12px] font-semibold">
              Lợi nhuận hôm qua
            </div>
            <p className="text-[15px] font-semibold">
              {hidden ? "••••" : `+${fmt(yesterdayInterest)}đ`}
            </p>
          </div>
        </div>

        {/* Streak dots — 7 ngày lợi nhuận tạm tính (T-1) */}
        <div className="pt-[32px] px-[22px]">
          <div className="flex items-center justify-between mb-[16px]">
            <p className="text-[15px] font-semibold">Chuỗi sinh lời 7 ngày</p>
            <p className="text-[12px] text-foreground-secondary">Dữ liệu T-1</p>
          </div>
          <StreakDots data={dailyData} hidden={hidden} />
        </div>

        {/* Monthly estimate card */}
        <div className="pt-[32px] px-[22px]">
          <div className="bg-secondary rounded-[28px] p-[20px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-foreground-secondary">Tạm tính tháng này</p>
                <p className="text-[24px] font-bold mt-[2px] tabular-nums">{hidden ? "••••" : `${fmt(monthEstimated)}đ`}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-foreground-secondary">Ngày trả lãi</p>
                <p className="text-[20px] font-bold mt-[2px]">{payoutDay}</p>
              </div>
            </div>
            <p className="text-[12px] text-foreground-secondary mt-[12px]">
              Lãi được tính hàng ngày, trả vào số dư ngày 27 mỗi tháng
            </p>
          </div>
        </div>

        {/* Interest rate + tier */}
        <div className="pt-[32px] px-[22px]">
          <div className="bg-secondary rounded-[28px] p-[20px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-foreground-secondary">Lãi suất hiện tại</p>
                <p className="text-[24px] font-bold mt-[2px]">{interestRate}%<span className="text-[14px] font-normal text-foreground-secondary">/năm</span></p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-foreground-secondary">Tổng đã nhận</p>
                <p className="text-[20px] font-bold mt-[2px] tabular-nums">{hidden ? "••••" : `${fmt(totalReceived)}đ`}</p>
              </div>
            </div>
            {/* Tier badge */}
            <div className="mt-[16px] flex items-center gap-[8px]">
              <div className="px-[12px] py-[4px] rounded-full bg-foreground text-background text-[12px] font-semibold">
                Cơ bản
              </div>
              <button className="flex items-center gap-[2px] text-[12px] text-foreground-secondary">
                Xem hạng mức <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="pt-[32px]">
          <div className="flex items-center justify-between px-[22px] mb-[12px]">
            <p className="text-[15px] font-semibold">Giao dịch gần nhất</p>
            <button className="text-[13px] font-semibold text-foreground-secondary">Xem tất cả</button>
          </div>
          <div className="px-[22px]">
            {txs.map((tx, i) => (
              <div key={tx.id} className={`flex items-center gap-[12px] py-[14px] ${i < txs.length - 1 ? "border-b border-border" : ""}`}>
                <div className="w-[40px] h-[40px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                  {tx.type === "interest" ? <TrendingUp size={18} /> :
                   tx.type === "deposit" ? <ArrowDownLeft size={18} /> :
                   <ArrowUpRight size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium truncate">{tx.label}</p>
                  <p className="text-[12px] text-foreground-secondary">{tx.date}</p>
                </div>
                <p className="text-[15px] font-semibold tabular-nums">
                  {tx.amount > 0 ? "+" : ""}{fmt(tx.amount)}đ
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom — single button */}
      <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[13px] pt-[12px] bg-background">
        <button className="w-full h-[48px] rounded-full bg-foreground text-background font-semibold text-[15px] flex items-center justify-center gap-[8px]">
          <ArrowUpDown size={18} />
          Nạp / Rút
        </button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none z-10">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
