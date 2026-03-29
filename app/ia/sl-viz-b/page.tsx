"use client"

import { Eye, EyeOff, ChevronLeft, ArrowDownLeft, ArrowUpRight, TrendingUp, ChevronRight, Settings, Lock, ArrowUpDown } from "lucide-react"
import { useState } from "react"

/* ── Mock data ─────────────────────────────────────────────────────── */
const balance = 5_000_000
const yesterdayInterest = 685
const monthEstimated = 12_500
const lastMonthReceived = 18_200
const totalReceived = 275_000
const interestRate = 4.5
const daysUntilPayout = 5
const payoutDay = "27/04"

const tiers = [
  { rate: 4.5, label: "Cơ bản", current: true },
  { rate: 4.6, label: "Bạc", current: false },
  { rate: 4.8, label: "Vàng", current: false },
  { rate: 5.0, label: "Kim cương", current: false },
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

/* ── Page ───────────────────────────────────────────────────────────── */
export default function VizB() {
  const [hidden, setHidden] = useState(false)

  const progressPct = Math.round(((30 - daysUntilPayout) / 30) * 100)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
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
        <p className="text-[17px] font-semibold">Sinh lời</p>
        <button className="w-[44px] h-[44px] flex items-center justify-center">
          <Settings size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Dark hero — balance + yesterday interest */}
        <div className="px-[22px] pt-[8px]">
          <div className="bg-foreground text-background rounded-[28px] p-[20px]">
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
        </div>

        {/* Monthly breakdown card */}
        <div className="pt-[32px] px-[22px]">
          <div className="bg-background rounded-[28px] p-[20px]">
            <p className="text-[15px] font-semibold mb-[16px]">Lãi tháng 3</p>
            <div className="space-y-[12px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-foreground/30" />
                  <p className="text-[13px] text-foreground-secondary">Tạm tính</p>
                </div>
                <p className="text-[15px] font-semibold tabular-nums">{hidden ? "••••" : `${fmt(monthEstimated)}đ`}</p>
              </div>
              <p className="text-[11px] text-foreground-secondary ml-[12px] -mt-[6px]">Đang tích luỹ — chưa trả vào số dư</p>

              <div className="h-[1px] bg-border" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-foreground" />
                  <p className="text-[13px] text-foreground-secondary">Đã nhận tháng 2</p>
                </div>
                <p className="text-[15px] font-semibold tabular-nums">{hidden ? "••••" : `${fmt(lastMonthReceived)}đ`}</p>
              </div>

              <div className="h-[1px] bg-border" />

              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">Tổng đã nhận</p>
                <p className="text-[15px] font-bold tabular-nums">{hidden ? "••••" : `${fmt(totalReceived)}đ`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payout progress bar */}
        <div className="pt-[32px] px-[22px]">
          <div className="bg-background rounded-[28px] p-[20px]">
            <div className="flex items-center justify-between mb-[12px]">
              <p className="text-[15px] font-semibold">Ngày trả lãi tiếp theo</p>
              <p className="text-[15px] font-bold">{payoutDay}</p>
            </div>
            {/* Progress bar */}
            <div className="w-full h-[8px] rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-foreground transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[12px] text-foreground-secondary mt-[8px]">
              Còn {daysUntilPayout} ngày — Lãi tính hàng ngày, trả vào số dư ngày 27
            </p>
          </div>
        </div>

        {/* Interest rate + tier */}
        <div className="pt-[32px] px-[22px]">
          <div className="bg-background rounded-[28px] p-[20px]">
            <div className="flex items-center justify-between mb-[16px]">
              <div>
                <p className="text-[13px] text-foreground-secondary">Lãi suất hiện tại</p>
                <p className="text-[24px] font-bold mt-[2px]">{interestRate}%<span className="text-[14px] font-normal text-foreground-secondary">/năm</span></p>
              </div>
              <button className="flex items-center gap-[2px] text-[13px] text-foreground-secondary">
                Chi tiết <ChevronRight size={14} />
              </button>
            </div>
            {/* Tier progress */}
            <div className="flex items-center gap-[4px]">
              {tiers.map((t) => (
                <div
                  key={t.rate}
                  className={`flex items-center gap-[3px] px-[10px] py-[5px] rounded-full text-[12px] font-semibold ${
                    t.current ? "bg-foreground text-background" : "bg-secondary text-foreground-secondary"
                  }`}
                >
                  {!t.current && <Lock size={10} />}
                  {t.rate}%
                </div>
              ))}
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
                <div className="w-[40px] h-[40px] rounded-full bg-background flex items-center justify-center shrink-0">
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
      <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[13px] pt-[12px] bg-secondary">
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
