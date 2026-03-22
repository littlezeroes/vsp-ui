"use client"

import { Search, ChevronRight, Zap, Droplets, Wifi, Smartphone, CreditCard, BarChart3, Clapperboard, Train, Plane, Bus, Star, Bell, Clock } from "lucide-react"

export default function TabThanhToan() {
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
        <p className="text-[18px] font-bold">Thanh toán</p>
      </div>

      {/* Search */}
      <div className="px-[22px] pb-[10px]">
        <div className="flex items-center gap-[10px] bg-secondary rounded-full px-[14px] py-[10px]">
          <Search size={18} className="text-foreground-secondary shrink-0" />
          <span className="text-[14px] text-foreground-secondary font-medium">Tìm dịch vụ, nhà cung cấp...</span>
        </div>
      </div>

      <div className="flex-1">
        {/* Sắp đến hạn — urgency cao nhất, lên đầu */}
        <section className="px-[22px] pt-[8px]">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px]">Sắp đến hạn</p>
            <Bell size={14} className="text-foreground-secondary" />
          </div>
          <button className="w-full bg-secondary rounded-[20px] p-[14px] flex items-center gap-[12px] text-left">
            <div className="w-[40px] h-[40px] rounded-full bg-foreground/8 flex items-center justify-center shrink-0">
              <Zap size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold">EVN Hà Nội</p>
              <p className="text-[12px] text-foreground-secondary">Hoá đơn tháng 4 · Hạn 15/04</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[14px] font-bold">380.000 đ</p>
              <p className="text-[11px] text-foreground-secondary">Trả ngay</p>
            </div>
          </button>
        </section>

        {/* Đã lưu — repeat users, 2 chạm trả xong */}
        <section className="px-[22px] pt-[24px]">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px]">Đã lưu</p>
            <button className="text-[12px] font-semibold text-foreground-secondary">Tất cả</button>
          </div>
          <div className="flex gap-[8px] overflow-x-auto pb-[4px]">
            {[
              { name: "EVN HN", amount: "380K", icon: Zap },
              { name: "FPT", amount: "220K", icon: Wifi },
              { name: "Viettel", amount: "100K", icon: Smartphone },
            ].map((s) => (
              <button key={s.name} className="bg-secondary rounded-[16px] px-[14px] py-[12px] flex items-center gap-[8px] shrink-0">
                <div className="w-[32px] h-[32px] rounded-full bg-foreground/8 flex items-center justify-center shrink-0">
                  <s.icon size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-semibold">{s.name}</p>
                  <p className="text-[11px] text-foreground-secondary">{s.amount}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Hoá đơn — trả định kỳ */}
        <section className="px-[22px] pt-[24px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[10px]">Hoá đơn</p>
          <div className="grid grid-cols-4 gap-y-[14px] gap-x-[8px]">
            {[
              { icon: Zap, label: "Điện" },
              { icon: Droplets, label: "Nước" },
              { icon: Wifi, label: "Internet" },
              { icon: Smartphone, label: "Nạp ĐT" },
              { icon: CreditCard, label: "Mua thẻ" },
              { icon: BarChart3, label: "Data 4G" },
              { icon: CreditCard, label: "Trả vay" },
              { icon: Star, label: "Học phí" },
            ].map((s) => (
              <button key={s.label} className="flex flex-col items-center gap-[5px]">
                <div className="w-[44px] h-[44px] rounded-[12px] bg-secondary flex items-center justify-center">
                  <s.icon size={20} />
                </div>
                <span className="text-[10px] font-medium text-center leading-tight">{s.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Vé & Di chuyển — mua 1 lần */}
        <section className="px-[22px] pt-[24px] pb-[8px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[10px]">Vé & Di chuyển</p>
          <div className="grid grid-cols-4 gap-y-[14px] gap-x-[8px]">
            {[
              { icon: Clapperboard, label: "Vé phim" },
              { icon: Train, label: "Vé tàu" },
              { icon: Bus, label: "Vé xe" },
              { icon: Plane, label: "Máy bay" },
            ].map((s) => (
              <button key={s.label} className="flex flex-col items-center gap-[5px]">
                <div className="w-[44px] h-[44px] rounded-[12px] bg-secondary flex items-center justify-center">
                  <s.icon size={20} />
                </div>
                <span className="text-[10px] font-medium text-center leading-tight">{s.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Nav */}
      <div className="w-full bg-background border-t border-border">
        <div className="flex items-center justify-around h-[52px]">
          {[
            { label: "Trang chủ", active: false },
            { label: "Thanh toán", active: true },
            { label: "QR", active: false },
            { label: "Giao dịch", active: false },
            { label: "Tài khoản", active: false },
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
