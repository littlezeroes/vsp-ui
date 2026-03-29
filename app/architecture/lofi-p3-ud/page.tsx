"use client"
/* Phase 3 — Tab Ưu đãi Q4 */
import { ChevronRight, Flame, Gift, QrCode, Star, Users } from "lucide-react"

export default function P3UD() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <div className="h-[44px]" />
        <div className="px-[22px] pb-[8px]"><h1 className="text-[24px] font-bold leading-8 tracking-[-0.25px]">Ưu đãi</h1></div>

        <div className="flex-1 overflow-y-auto pb-[90px]">
          {/* V-Point */}
          <div className="px-[22px] pt-[8px]">
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-foreground/5 flex items-center justify-center shrink-0"><Star size={22} className="text-foreground" /></div>
                <div className="flex-1"><p className="text-[15px] font-semibold">V-Point</p><p className="text-[22px] font-bold tabular-nums">1.250 <span className="text-[14px] text-foreground-secondary">điểm</span></p></div>
                <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
              </div>
            </div>
          </div>

          {/* Hot deal */}
          <div className="px-[22px] pt-[24px]">
            <div className="rounded-[28px] overflow-hidden bg-amber-50 p-[20px]">
              <div className="flex items-center gap-[6px] mb-[6px]"><Flame size={16} className="text-amber-500" /><span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Hot deal</span></div>
              <p className="text-[18px] font-bold">Giảm 50% XanhSM</p>
              <p className="text-[13px] text-foreground-secondary mt-[2px]">HSD: 30/12/2026</p>
              <div className="mt-[12px] inline-flex bg-foreground rounded-full px-[14px] py-[8px]"><span className="text-[13px] font-semibold text-background">Lấy ngay</span></div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-[8px] px-[22px] pt-[16px] overflow-x-auto">
            {["Tất cả", "Ăn uống", "Di chuyển", "Mua sắm", "Du lịch"].map((c, i) => (
              <div key={c} className={`rounded-full px-[14px] py-[8px] shrink-0 ${i === 0 ? "bg-foreground" : "bg-secondary"}`}><span className={`text-[12px] font-medium ${i === 0 ? "text-background" : "text-foreground-secondary"}`}>{c}</span></div>
            ))}
          </div>

          {/* Deals */}
          <div className="px-[22px] pt-[16px]">
            {[
              { icon: "🎁", t: "VinPearl giảm 30%", s: "Du lịch · HSD 30/06" },
              { icon: "🏠", t: "Vinhomes cashback 2%", s: "Bất động sản" },
              { icon: "🚗", t: "XanhSM voucher 20K", s: "Di chuyển · HSD 15/04" },
              { icon: "☕", t: "Highland Coffee -15%", s: "Ăn uống · HSD 30/04" },
              { icon: "🛒", t: "VinMart giảm 10%", s: "Mua sắm · HSD 30/05" },
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-[12px] py-[14px] border-b border-border last:border-b-0">
                <div className="w-[44px] h-[44px] rounded-[14px] bg-secondary flex items-center justify-center shrink-0 text-[20px]">{d.icon}</div>
                <div className="flex-1"><p className="text-[14px] font-semibold">{d.t}</p><p className="text-[12px] text-foreground-secondary">{d.s}</p></div>
                <ChevronRight size={18} className="text-foreground-secondary" />
              </div>
            ))}
          </div>

          {/* Referral */}
          <div className="px-[22px] pt-[24px]">
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-success/10 flex items-center justify-center shrink-0"><Users size={22} className="text-success" /></div>
                <div className="flex-1"><p className="text-[15px] font-semibold">Giới thiệu bạn bè</p><p className="text-[13px] text-foreground-secondary">Nhận 50.000đ mỗi người</p></div>
                <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
          <div className="flex items-center justify-around pt-[6px] pb-[26px]">
            {["Trang chủ", "Thanh toán", "QR", "Tài chính", "Ưu đãi"].map((t, i) => t === "QR" ? (
              <div key={i} className="w-[52px] h-[52px] rounded-full bg-foreground flex items-center justify-center -mt-[18px]"><QrCode size={24} className="text-background" /></div>
            ) : (
              <div key={i} className="flex flex-col items-center gap-[3px]">
                <div className={`w-[22px] h-[22px] rounded-[6px] ${i === 4 ? "bg-foreground" : "bg-foreground/15"}`} />
                <span className={`text-[10px] font-medium ${i === 4 ? "text-foreground" : "text-foreground-secondary"}`}>{t}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center pb-[4px] -mt-[6px]"><div className="w-[139px] h-[5px] rounded-full bg-foreground" /></div>
        </div>
      </div>
    </div>
  )
}
