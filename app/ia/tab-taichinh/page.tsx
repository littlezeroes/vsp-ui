"use client"

import { ChevronRight, TrendingUp, Building2, Shield, BarChart3, CreditCard, Car, Eye } from "lucide-react"

const CHART_POINTS = [20, 22, 21, 23, 22, 24, 23, 25, 24, 26, 25, 27, 26, 25, 27, 28, 27, 29, 28, 30, 29, 31, 30, 32, 33, 32, 34, 33, 35]
const chartMax = Math.max(...CHART_POINTS)
const chartMin = Math.min(...CHART_POINTS)

function ChartLine() {
  const w = 346, h = 70
  const pts = CHART_POINTS.map((v, i) => {
    const x = (i / (CHART_POINTS.length - 1)) * w
    const y = h - ((v - chartMin) / (chartMax - chartMin)) * h
    return `${x},${y}`
  }).join(" ")
  return (
    <svg width={w} height={h} className="w-full" viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export default function TabTaiChinh() {
  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
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

      <div className="h-[56px] px-[22px] flex items-center">
        <p className="text-[18px] font-bold">Tài chính</p>
      </div>

      <div className="flex-1">
        {/* ═══ PHẦN TRÊN: ĐẦU TƯ ═══ */}

        {/* Dark card + chart */}
        <section className="px-[22px] pt-[4px]">
          <div className="bg-foreground text-background rounded-[28px] p-[20px]">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium opacity-60">Tài sản đầu tư</p>
              <button className="opacity-50"><Eye size={18} /></button>
            </div>
            <p className="text-[32px] font-bold tracking-tight mt-[2px]">25.000.000<span className="text-[18px] ml-1">đ</span></p>
            <p className="text-[13px] font-semibold opacity-70 mt-[2px]">+57.500 đ · +0,23% hôm nay</p>
            <div className="mt-[10px] -mx-[4px]"><ChartLine /></div>
            <div className="flex gap-[6px] mt-[8px]">
              {["1T", "1Th", "3Th", "6Th", "1N", "Tất cả"].map((t, i) => (
                <button key={t} className={`px-[8px] py-[3px] rounded-full text-[10px] font-semibold ${i === 1 ? "bg-background/25" : "opacity-40"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Swipe 3 cards: BĐS, CCQ, Sinh lời */}
        <section className="pt-[16px]">
          <div className="flex gap-[10px] overflow-x-auto px-[22px] pb-[4px]" style={{scrollbarWidth:'none'}}>
            {/* Sinh lời */}
            <button className="bg-secondary rounded-[20px] p-[14px] text-left shrink-0 w-[160px]">
              <div className="w-[32px] h-[32px] rounded-full bg-foreground/8 flex items-center justify-center mb-[8px]">
                <TrendingUp size={16} />
              </div>
              <p className="text-[12px] text-foreground-secondary">Sinh lời</p>
              <p className="text-[17px] font-bold mt-[1px]">5.000.000 đ</p>
              <p className="text-[11px] font-semibold mt-[4px]">+12.500 đ · 5,5%/năm</p>
            </button>

            {/* BĐS */}
            <button className="bg-secondary rounded-[20px] p-[14px] text-left shrink-0 w-[160px]">
              <div className="w-[32px] h-[32px] rounded-full bg-foreground/8 flex items-center justify-center mb-[8px]">
                <Building2 size={16} />
              </div>
              <p className="text-[12px] text-foreground-secondary">Bất động sản</p>
              <p className="text-[17px] font-bold mt-[1px]">20.000.000 đ</p>
              <p className="text-[11px] font-semibold mt-[4px]">+2,3% · Vinhomes GP</p>
            </button>

            {/* CCQ */}
            <button className="bg-secondary rounded-[20px] p-[14px] text-left shrink-0 w-[160px]">
              <div className="w-[32px] h-[32px] rounded-full bg-foreground/8 flex items-center justify-center mb-[8px]">
                <BarChart3 size={16} />
              </div>
              <p className="text-[12px] text-foreground-secondary">Chứng chỉ quỹ</p>
              <p className="text-[17px] font-bold mt-[1px]">Khám phá</p>
              <p className="text-[11px] text-foreground-secondary mt-[4px]">Từ 50.000 đ</p>
            </button>
          </div>
        </section>

        {/* ═══ DIVIDER ═══ */}
        <div className="mx-[22px] mt-[20px] mb-[16px] border-t border-border" />

        {/* ═══ PHẦN DƯỚI: BẢO VỆ & VAY ═══ */}
        <section className="px-[22px] pb-[8px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[8px]">Bảo vệ &amp; Tín dụng</p>
          {[
            { icon: Shield, label: "Bảo hiểm", sub: "4 loại · 2 hợp đồng hoạt động" },
            { icon: CreditCard, label: "Ví trả sau", sub: "Hạn mức 5 triệu · Dư nợ 1,2 triệu" },
            { icon: Car, label: "Vay trả góp VinFast", sub: "Kỳ 12/36 · Còn lại 8,5 triệu" },
          ].map((p, i) => (
            <button key={p.label} className={`w-full flex items-center gap-[12px] py-[13px] text-left ${i < 2 ? "border-b border-border" : ""}`}>
              <div className="w-[40px] h-[40px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                <p.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold">{p.label}</p>
                <p className="text-[12px] text-foreground-secondary">{p.sub}</p>
              </div>
              <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
            </button>
          ))}
        </section>
      </div>

      <div className="w-full bg-background border-t border-border">
        <div className="flex items-center justify-around h-[52px]">
          {[
            { label: "Trang chủ", active: false },
            { label: "Thanh toán", active: false },
            { label: "QR", active: false },
            { label: "Giao dịch", active: false },
            { label: "Tài chính", active: true },
          ].map((t) => (
            <button key={t.label} className="flex flex-col items-center gap-[3px] min-w-[56px]">
              <div className={`w-[22px] h-[22px] rounded-[6px] ${t.active ? "bg-foreground" : "bg-foreground/12"}`} />
              <span className={`text-[10px] font-semibold ${t.active ? "text-foreground" : "text-foreground-secondary"}`}>{t.label}</span>
            </button>
          ))}
        </div>
        <div className="w-full h-[21px] flex items-end justify-center pb-[4px]">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    </div>
  )
}
