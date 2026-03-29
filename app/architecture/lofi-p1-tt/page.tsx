"use client"
/* Phase 1 — Tab Thanh toán 30/4
 * Layout principles from Cash App / OKX / Revolut:
 * - Clean top: search + categories (horizontal pills)
 * - Content as list rows (Cash App) not grid icons
 * - Each service = row with icon, name, chevron
 * - Grouped by category with section headers
 */
import { ChevronRight, Film, QrCode, Search, Train, Zap, Droplets, Globe, Smartphone, CreditCard, Ticket } from "lucide-react"

export default function P1TT() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <div className="h-[44px]" />

        {/* Header — large title */}
        <div className="px-[22px] pb-[4px]">
          <h1 className="text-[24px] font-bold leading-8 tracking-[-0.25px]">Thanh toán</h1>
        </div>

        <div className="flex-1 overflow-y-auto pb-[90px]">
          {/* Search — Revolut/OKX pattern */}
          <div className="px-[22px] pt-[8px]">
            <div className="bg-secondary rounded-full px-[16px] py-[10px] flex items-center gap-[10px]">
              <Search size={18} className="text-foreground-secondary" />
              <span className="text-[14px] text-foreground-secondary">Tìm dịch vụ, nhà cung cấp...</span>
            </div>
          </div>

          {/* Categories — horizontal pills (OKX Discover pattern) */}
          <div className="flex gap-[8px] px-[22px] pt-[14px] overflow-x-auto pb-[2px]">
            {["Tất cả", "Hóa đơn", "Nạp tiền", "HST", "Vé", "Tài chính"].map((c, i) => (
              <div key={c} className={`rounded-full px-[14px] py-[7px] shrink-0 ${i === 0 ? "bg-foreground" : "bg-secondary"}`}>
                <span className={`text-[13px] font-medium ${i === 0 ? "text-background" : "text-foreground-secondary"}`}>{c}</span>
              </div>
            ))}
          </div>

          {/* ── Hóa đơn tiện ích ── */}
          <div className="pt-[24px]">
            <p className="text-[13px] font-semibold text-foreground-secondary uppercase tracking-wider px-[22px] mb-[8px]">Hóa đơn tiện ích</p>
            <div className="px-[22px]">
              {[
                { icon: <Zap size={20} />, name: "Điện", sub: "EVN toàn quốc" },
                { icon: <Droplets size={20} />, name: "Nước", sub: "Cấp nước các tỉnh" },
                { icon: <Globe size={20} />, name: "Internet", sub: "FPT · VNPT · Viettel" },
                { icon: <Smartphone size={20} />, name: "Nạp tiền điện thoại", sub: "Viettel · Mobi · Vina" },
                { icon: <CreditCard size={20} />, name: "Mua mã thẻ", sub: "Thẻ cào điện thoại" },
              ].map(item => (
                <div key={item.name} className="flex items-center gap-[14px] py-[14px] border-b border-border last:border-b-0">
                  <div className="w-[40px] h-[40px] rounded-full bg-secondary flex items-center justify-center shrink-0 text-foreground-secondary">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium">{item.name}</p>
                    <p className="text-[12px] text-foreground-secondary">{item.sub}</p>
                  </div>
                  <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Hệ sinh thái Vingroup ── */}
          <div className="pt-[32px]">
            <p className="text-[13px] font-semibold text-foreground-secondary uppercase tracking-wider px-[22px] mb-[8px]">Hệ sinh thái</p>
            <div className="px-[22px] grid grid-cols-4 gap-y-[16px]">
              {[
                { name: "XanhSM", color: "bg-emerald-100 text-emerald-700" },
                { name: "Vinhomes", color: "bg-blue-100 text-blue-700" },
                { name: "VinPearl", color: "bg-amber-100 text-amber-700" },
                { name: "VinFast", color: "bg-red-100 text-red-700" },
                { name: "Vinschool", color: "bg-purple-100 text-purple-700" },
                { name: "VinUni", color: "bg-indigo-100 text-indigo-700" },
                { name: "Vincom", color: "bg-pink-100 text-pink-700" },
                { name: "VinMec", color: "bg-teal-100 text-teal-700" },
              ].map(item => (
                <button key={item.name} type="button" className="flex flex-col items-center gap-[6px]">
                  <div className={`w-[48px] h-[48px] rounded-[14px] flex items-center justify-center ${item.color}`}>
                    <span className="text-[14px] font-bold">{item.name.slice(0, 2)}</span>
                  </div>
                  <span className="text-[11px] font-medium text-foreground-secondary">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Vé & Dịch vụ ── */}
          <div className="pt-[32px]">
            <p className="text-[13px] font-semibold text-foreground-secondary uppercase tracking-wider px-[22px] mb-[8px]">Vé & Dịch vụ</p>
            <div className="px-[22px]">
              {[
                { icon: <Film size={20} />, name: "Vé xem phim", sub: "CGV · Lotte · Galaxy" },
                { icon: <Train size={20} />, name: "Vé xe & tàu", sub: "Xe khách · Tàu hoả" },
                { icon: <Ticket size={20} />, name: "Mua data", sub: "Gói data 3G/4G/5G" },
              ].map(item => (
                <div key={item.name} className="flex items-center gap-[14px] py-[14px] border-b border-border last:border-b-0">
                  <div className="w-[40px] h-[40px] rounded-full bg-secondary flex items-center justify-center shrink-0 text-foreground-secondary">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium">{item.name}</p>
                    <p className="text-[12px] text-foreground-secondary">{item.sub}</p>
                  </div>
                  <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Thanh toán tài chính ── */}
          <div className="pt-[32px]">
            <p className="text-[13px] font-semibold text-foreground-secondary uppercase tracking-wider px-[22px] mb-[8px]">Tài chính</p>
            <div className="px-[22px]">
              {["FE Credit", "HomeCredit", "HD Saison", "Shinhan Finance"].map(name => (
                <div key={name} className="flex items-center gap-[14px] py-[14px] border-b border-border last:border-b-0">
                  <div className="w-[40px] h-[40px] rounded-[12px] bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-[14px] font-bold text-foreground-secondary">{name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium">{name}</p>
                    <p className="text-[12px] text-foreground-secondary">Thanh toán khoản vay</p>
                  </div>
                  <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="h-[24px]" />
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
          <div className="flex items-center justify-around pt-[6px] pb-[26px]">
            {["Trang chủ", "Thanh toán", "QR", "Giao dịch", "Tài khoản"].map((t, i) => t === "QR" ? (
              <div key={i} className="w-[52px] h-[52px] rounded-full bg-foreground flex items-center justify-center -mt-[18px]"><QrCode size={24} className="text-background" /></div>
            ) : (
              <div key={i} className="flex flex-col items-center gap-[3px]">
                <div className={`w-[22px] h-[22px] rounded-[6px] ${i === 1 ? "bg-foreground" : "bg-foreground/15"}`} />
                <span className={`text-[10px] font-medium ${i === 1 ? "text-foreground" : "text-foreground-secondary"}`}>{t}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center pb-[4px] -mt-[6px]"><div className="w-[139px] h-[5px] rounded-full bg-foreground" /></div>
        </div>
      </div>
    </div>
  )
}
