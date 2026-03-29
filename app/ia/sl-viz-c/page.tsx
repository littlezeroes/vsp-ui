"use client"

import { Eye, EyeOff, ChevronLeft, ArrowDownLeft, ArrowUpRight, TrendingUp, Settings, ArrowUpDown } from "lucide-react"
import { useState } from "react"

/* ── Mock data ─────────────────────────────────────────────────────── */
const balance = 5_000_000
const yesterdayInterest = 685
const interestRate = 4.5
const monthEstimated = 12_500
const totalReceived = 275_000
const payoutDay = "27/04"

const txs = [
  { id: "1", type: "interest" as const, label: "Trả lãi tháng 2", amount: 18200, date: "27/02" },
  { id: "2", type: "deposit" as const, label: "Nạp tiền", amount: 1000000, date: "15/02" },
  { id: "3", type: "interest" as const, label: "Trả lãi tháng 1", amount: 16800, date: "27/01" },
  { id: "4", type: "withdrawal" as const, label: "Rút tiền", amount: -500000, date: "10/01" },
]

function fmt(n: number) {
  return Math.abs(n).toLocaleString("vi-VN")
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function VizC() {
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
        <button onClick={() => setHidden(!hidden)} className="w-[44px] h-[44px] flex items-center justify-center">
          {hidden ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Giant balance — Cash App centered style */}
        <div className="px-[22px] pt-[40px] pb-[8px] flex flex-col items-center">
          <p className="text-[48px] font-bold tracking-tight tabular-nums leading-[52px]">
            {hidden ? "••••••••" : `${fmt(balance)}đ`}
          </p>
          <p className="text-[15px] text-foreground-secondary mt-[6px]">
            {hidden ? "••••" : `Lợi nhuận hôm qua +${fmt(yesterdayInterest)}đ · Lãi suất ${interestRate}%/năm`}
          </p>
        </div>

        {/* Single action button */}
        <div className="px-[22px] pt-[24px]">
          <button className="w-full h-[52px] rounded-full bg-foreground text-background font-semibold text-[16px] flex items-center justify-center gap-[8px]">
            <ArrowUpDown size={18} />
            Nạp / Rút
          </button>
        </div>

        {/* Stat row — 3 columns */}
        <div className="px-[22px] pt-[32px]">
          <div className="flex items-center rounded-[28px] bg-secondary p-[20px]">
            <div className="flex-1 text-center">
              <p className="text-[12px] text-foreground-secondary">Tạm tính tháng</p>
              <p className="text-[17px] font-bold mt-[2px] tabular-nums">{hidden ? "••••" : fmt(monthEstimated)}</p>
              <p className="text-[11px] text-foreground-secondary">đồng</p>
            </div>
            <div className="w-[1px] h-[36px] bg-border" />
            <div className="flex-1 text-center">
              <p className="text-[12px] text-foreground-secondary">Đã nhận</p>
              <p className="text-[17px] font-bold mt-[2px] tabular-nums">{hidden ? "••••" : fmt(totalReceived)}</p>
              <p className="text-[11px] text-foreground-secondary">đồng</p>
            </div>
            <div className="w-[1px] h-[36px] bg-border" />
            <div className="flex-1 text-center">
              <p className="text-[12px] text-foreground-secondary">Ngày trả</p>
              <p className="text-[17px] font-bold mt-[2px]">{payoutDay}</p>
              <p className="text-[11px] text-foreground-secondary">hàng tháng</p>
            </div>
          </div>
        </div>

        {/* Transaction list — clean minimal */}
        <div className="pt-[32px]">
          <div className="flex items-center justify-between px-[22px] mb-[4px]">
            <p className="text-[15px] font-semibold">Giao dịch</p>
            <button className="text-[13px] font-semibold text-foreground-secondary">Tất cả</button>
          </div>
          <div className="px-[22px]">
            {txs.map((tx, i) => (
              <div key={tx.id} className={`flex items-center gap-[12px] py-[14px] ${i < txs.length - 1 ? "border-b border-border" : ""}`}>
                <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                  {tx.type === "interest" ? <TrendingUp size={16} /> :
                   tx.type === "deposit" ? <ArrowDownLeft size={16} /> :
                   <ArrowUpRight size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium truncate">{tx.label}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[15px] font-semibold tabular-nums">
                    {tx.amount > 0 ? "+" : ""}{fmt(tx.amount)}đ
                  </p>
                  <p className="text-[11px] text-foreground-secondary">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings link */}
        <div className="pt-[32px] px-[22px]">
          <button className="w-full flex items-center gap-[12px] py-[14px]">
            <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center">
              <Settings size={16} />
            </div>
            <p className="text-[15px] font-medium flex-1 text-left">Cài đặt sinh lời</p>
            <ChevronLeft size={16} className="text-foreground-secondary rotate-180" />
          </button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none z-10">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
