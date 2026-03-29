"use client"

import { Search, Zap, Wifi, Smartphone, Building2, Check, Plus, Car, GraduationCap, Clapperboard, Train, Bus, Plane, Droplets, CreditCard, BarChart3 } from "lucide-react"

// OPTION C: UNIFIED FEED
// IA: Filter chips → Feed (hoá đơn + gợi ý + Vingroup xen kẽ) → Dịch vụ grid dưới cùng
// Core idea: Không tách section. Tất cả trong 1 feed theo timeline. Grid dịch vụ nhỏ ở cuối.

export default function OptionC() {
  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <div className="h-[44px] px-[22px] flex items-end justify-between text-xs font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-[3px]">
          <div className="flex gap-[2px]">{[1,2,3,4].map(i=><div key={i} className="w-[3px] rounded-full bg-foreground" style={{height:4+i*2}} />)}</div>
          <div className="w-[22px] h-[11px] rounded-[3px] border-[1.5px] border-foreground relative ml-1">
            <div className="absolute inset-[1.5px] bg-foreground rounded-[1px]" style={{width:'65%'}} />
          </div>
        </div>
      </div>

      <div className="h-[56px] px-[22px] flex items-center">
        <p className="text-[18px] font-bold">Hoá đơn & Dịch vụ</p>
        <span className="ml-2 text-[10px] font-bold bg-foreground text-background px-[6px] py-[2px] rounded-full">C</span>
      </div>

      <div className="px-[22px] pb-[6px]">
        <div className="flex items-center gap-[10px] bg-secondary rounded-full px-[14px] py-[10px]">
          <Search size={18} className="text-foreground-secondary" />
          <span className="text-[14px] text-foreground-secondary font-medium">Tìm hoá đơn, dịch vụ...</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-[22px] flex gap-[8px] pb-[10px]">
        {["Cần trả","Đã TT","Dịch vụ"].map((t,i)=>(
          <button key={t} className={`px-[14px] py-[6px] rounded-full text-[13px] font-semibold ${i===0?"bg-foreground text-background":"bg-secondary text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {/* FEED — mixed bills + Vingroup + suggestions */}
        <section className="px-[22px]">
          {/* Overdue — dark card */}
          <div className="bg-foreground text-background rounded-[18px] p-[14px] mb-[8px]">
            <div className="flex items-center gap-[10px]">
              <Zap size={18} className="shrink-0" />
              <div className="flex-1">
                <p className="text-[14px] font-bold">EVN Hà Nội</p>
                <p className="text-[11px] opacity-60">Quá hạn 3 ngày</p>
              </div>
              <p className="text-[16px] font-bold">501.500 đ</p>
            </div>
            <button className="w-full mt-[10px] bg-background/20 rounded-full py-[8px] text-[13px] font-semibold text-center">
              Thanh toán ngay
            </button>
          </div>

          {/* Normal bill */}
          <div className="bg-secondary rounded-[18px] p-[14px] mb-[8px] flex items-center gap-[10px]">
            <Wifi size={18} className="shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-semibold">FPT Telecom</p>
              <p className="text-[11px] text-foreground-secondary">299.000 đ · Hạn 25/03</p>
            </div>
            <span className="text-[12px] font-semibold">Trả</span>
          </div>

          {/* Vingroup bill — same level as regular bills */}
          <div className="bg-secondary rounded-[18px] p-[14px] mb-[8px] flex items-center gap-[10px]">
            <Building2 size={18} className="shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-semibold">Vinhomes Ocean Park</p>
              <p className="text-[11px] text-foreground-secondary">1.850.000 đ · Phí QL T3</p>
            </div>
            <span className="text-[12px] font-semibold">Trả</span>
          </div>

          {/* VinFast bill */}
          <div className="bg-secondary rounded-[18px] p-[14px] mb-[8px] flex items-center gap-[10px]">
            <Car size={18} className="shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-semibold">VinFast · Thuê pin</p>
              <p className="text-[11px] text-foreground-secondary">900.000 đ · Hạn 28/03</p>
            </div>
            <span className="text-[12px] font-semibold">Trả</span>
          </div>

          {/* Suggestion — dashed */}
          <div className="border border-dashed border-foreground/20 rounded-[18px] p-[14px] mb-[8px] flex items-center gap-[10px]">
            <Smartphone size={18} className="text-foreground-secondary shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-foreground-secondary">Nạp ĐT · 0912...</p>
              <p className="text-[11px] text-foreground-secondary">Gợi ý · Hàng tháng</p>
            </div>
            <span className="text-[12px] font-semibold text-foreground-secondary">Nạp</span>
          </div>

          {/* Past — muted */}
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mt-[16px] mb-[6px]">Đã thanh toán</p>
          {[{n:"EVN Hà Nội",a:"485.000 đ"},{n:"Vinhomes",a:"1.850.000 đ"},{n:"FPT",a:"299.000 đ"}].map((tx,i)=>(
            <div key={tx.n} className={`flex items-center gap-[8px] py-[8px] ${i<2?"border-b border-border":""}`}>
              <Check size={14} className="text-foreground-secondary" />
              <span className="flex-1 text-[12px] text-foreground-secondary">{tx.n}</span>
              <span className="text-[12px] text-foreground-secondary">{tx.a}</span>
            </div>
          ))}
        </section>

        {/* DỊCH VỤ MỚI — grid nhỏ cuối trang */}
        <section className="px-[22px] pt-[24px] pb-[8px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[10px]">Thêm dịch vụ</p>
          <div className="grid grid-cols-4 gap-y-[12px] gap-x-[8px]">
            {[{icon:Zap,l:"Điện"},{icon:Droplets,l:"Nước"},{icon:Wifi,l:"Internet"},{icon:Smartphone,l:"Nạp ĐT"},{icon:Clapperboard,l:"Vé phim"},{icon:Train,l:"Vé tàu"},{icon:Bus,l:"Vé xe"},{icon:Plane,l:"Máy bay"}].map(s=>(
              <button key={s.l} className="flex flex-col items-center gap-[4px]">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-secondary flex items-center justify-center"><s.icon size={16} /></div>
                <span className="text-[10px] font-medium">{s.l}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="w-full bg-background border-t border-border">
        <div className="flex items-center justify-around h-[52px]">
          {["Trang chủ","Thanh toán","QR","Giao dịch","Tài khoản"].map((t,i)=>(
            <button key={t} className="flex flex-col items-center gap-[3px] min-w-[56px]">
              <div className={`w-[22px] h-[22px] rounded-[6px] ${i===1?"bg-foreground":"bg-foreground/12"}`} />
              <span className={`text-[10px] font-semibold ${i===1?"text-foreground":"text-foreground-secondary"}`}>{t}</span>
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
