"use client"

import { ChevronRight, Trophy, Gift, Users, Tag, Percent } from "lucide-react"

const DEALS = [
  { brand: "VinPearl", offer: "Giảm 30%", cat: "Du lịch", initial: "VP" },
  { brand: "Vinhomes", offer: "Hoàn tiền 2%", cat: "Bất động sản", initial: "VH" },
  { brand: "XanhSM", offer: "Giảm 20.000 đ", cat: "Di chuyển", initial: "XS" },
  { brand: "Highland Coffee", offer: "Giảm 15%", cat: "Ăn uống", initial: "HC" },
  { brand: "Phở 24", offer: "Mua 1 tặng 1", cat: "Ăn uống", initial: "P2" },
]

export default function TabUuDai() {
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
        <p className="text-[18px] font-bold">Ưu đãi</p>
      </div>

      <div className="flex-1">
        {/* V-Point card */}
        <section className="px-[22px] pt-[8px]">
          <button className="w-full bg-foreground text-background rounded-[28px] p-[20px] text-left">
            <div className="flex items-center gap-[12px]">
              <div className="w-[44px] h-[44px] rounded-full bg-background/15 flex items-center justify-center shrink-0">
                <Trophy size={22} className="text-background" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium opacity-60">V-Point</p>
                <p className="text-[26px] font-bold mt-[-2px]">1.250 <span className="text-[16px]">điểm</span></p>
                <p className="text-[12px] opacity-45">Tương đương 12.500 đ</p>
              </div>
              <ChevronRight size={20} className="opacity-40" />
            </div>
          </button>
        </section>

        {/* Featured deal */}
        <section className="px-[22px] pt-[16px]">
          <div className="bg-secondary rounded-[20px] p-[14px]">
            <div className="flex items-center gap-[6px] mb-[6px]">
              <Percent size={14} />
              <span className="text-[11px] font-bold uppercase tracking-[0.5px]">Nổi bật</span>
            </div>
            <p className="text-[18px] font-bold">XanhSM giảm 50%</p>
            <p className="text-[12px] text-foreground-secondary mt-[2px]">Hạn sử dụng: 30/12/2026</p>
            <button className="mt-[12px] bg-foreground text-background rounded-full px-[20px] py-[9px] text-[13px] font-semibold">
              Lấy ngay
            </button>
          </div>
        </section>

        {/* Category filter */}
        <section className="px-[22px] pt-[20px]">
          <div className="flex gap-[8px] overflow-x-auto pb-[4px]">
            {["Tất cả", "Ăn uống", "Di chuyển", "Mua sắm", "Du lịch"].map((c, i) => (
              <button key={c} className={`px-[14px] py-[6px] rounded-full text-[13px] font-semibold whitespace-nowrap ${i === 0 ? "bg-foreground text-background" : "bg-secondary text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Deal rows */}
        <section className="px-[22px] pt-[14px]">
          {DEALS.map((d, i) => (
            <button key={d.brand} className={`w-full flex items-center gap-[12px] py-[13px] text-left ${i < DEALS.length - 1 ? "border-b border-border" : ""}`}>
              <div className="w-[40px] h-[40px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="text-[12px] font-bold">{d.initial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold">{d.brand}</p>
                <p className="text-[12px] text-foreground-secondary">{d.offer}</p>
              </div>
              <div className="flex items-center gap-[4px] shrink-0">
                <span className="text-[10px] font-medium text-foreground-secondary bg-secondary px-[8px] py-[2px] rounded-full">{d.cat}</span>
                <ChevronRight size={16} className="text-foreground-secondary" />
              </div>
            </button>
          ))}
        </section>

        {/* Referral */}
        <section className="px-[22px] pt-[32px] pb-[16px]">
          <button className="w-full bg-secondary rounded-[20px] p-[14px] flex items-center gap-[12px] text-left">
            <div className="w-[40px] h-[40px] rounded-full bg-foreground/8 flex items-center justify-center shrink-0">
              <Users size={20} className="text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold">Giới thiệu bạn bè</p>
              <p className="text-[12px] text-foreground-secondary">Nhận 50.000 đ mỗi người</p>
            </div>
            <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
          </button>
        </section>
      </div>

      <div className="w-full bg-background border-t border-border">
        <div className="flex items-center justify-around h-[52px]">
          {[
            { label: "Trang chủ", active: false },
            { label: "Thanh toán", active: false },
            { label: "QR", active: false },
            { label: "Ưu đãi", active: true },
            { label: "Tài chính", active: false },
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
