"use client"

import { Search, Zap, Droplets, Wifi, Smartphone, CreditCard, BarChart3, Bell, ChevronRight, Building2, Car, GraduationCap, Clapperboard, Train, Bus, Plane, Star } from "lucide-react"

// OPTION A: URGENCY-FIRST
// IA: Sắp hạn → Đã lưu → Dịch vụ (grid nhỏ) → Vingroup
// Core idea: Bill cần trả lên trước hết. Grid dịch vụ secondary. Vingroup tách riêng.

export default function OptionA() {
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
        <p className="text-[18px] font-bold">Thanh toán</p>
        <span className="ml-2 text-[10px] font-bold bg-foreground text-background px-[6px] py-[2px] rounded-full">A</span>
      </div>

      <div className="px-[22px] pb-[10px]">
        <div className="flex items-center gap-[10px] bg-secondary rounded-full px-[14px] py-[10px]">
          <Search size={18} className="text-foreground-secondary" />
          <span className="text-[14px] text-foreground-secondary font-medium">Tìm dịch vụ...</span>
        </div>
      </div>

      <div className="flex-1">
        {/* 1. SẮP ĐẾN HẠN — chiếm nhiều space, urgency nổi bật */}
        <section className="px-[22px] pt-[4px]">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px]">Sắp đến hạn</p>
            <Bell size={14} className="text-foreground-secondary" />
          </div>
          <button className="w-full bg-foreground text-background rounded-[20px] p-[16px] text-left mb-[8px]">
            <div className="flex items-center gap-[10px]">
              <Zap size={20} className="text-background shrink-0" />
              <div className="flex-1">
                <p className="text-[15px] font-bold">EVN Hà Nội</p>
                <p className="text-[12px] opacity-60">Quá hạn 3 ngày</p>
              </div>
              <div className="text-right">
                <p className="text-[18px] font-bold">501.500 đ</p>
              </div>
            </div>
            <div className="mt-[12px] bg-background/20 rounded-full py-[8px] text-center text-[13px] font-semibold">
              Thanh toán ngay
            </div>
          </button>
          <button className="w-full bg-secondary rounded-[16px] p-[14px] flex items-center gap-[10px] text-left">
            <Wifi size={18} className="shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] font-semibold">FPT Telecom · 299.000 đ</p>
              <p className="text-[12px] text-foreground-secondary">Hạn 25/03</p>
            </div>
            <span className="text-[12px] font-semibold">Trả</span>
          </button>
        </section>

        {/* 2. ĐÃ LƯU — chips */}
        <section className="px-[22px] pt-[24px]">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px]">Đã lưu</p>
            <button className="text-[12px] font-semibold text-foreground-secondary">Tất cả</button>
          </div>
          <div className="flex gap-[8px] overflow-x-auto">
            {[{name:"SAWACO",icon:Droplets},{name:"Viettel",icon:Smartphone},{name:"Vinhomes",icon:Building2}].map(s=>(
              <button key={s.name} className="bg-secondary rounded-[14px] px-[12px] py-[8px] flex items-center gap-[6px] shrink-0">
                <s.icon size={14} /><span className="text-[12px] font-semibold">{s.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. DỊCH VỤ — grid nhỏ 4×2 */}
        <section className="px-[22px] pt-[24px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[10px]">Dịch vụ</p>
          <div className="grid grid-cols-4 gap-y-[12px] gap-x-[8px]">
            {[{icon:Zap,l:"Điện"},{icon:Droplets,l:"Nước"},{icon:Wifi,l:"Internet"},{icon:Smartphone,l:"Nạp ĐT"},{icon:Clapperboard,l:"Vé phim"},{icon:Train,l:"Vé tàu"},{icon:Bus,l:"Vé xe"},{icon:Plane,l:"Máy bay"}].map(s=>(
              <button key={s.l} className="flex flex-col items-center gap-[4px]">
                <div className="w-[42px] h-[42px] rounded-[12px] bg-secondary flex items-center justify-center"><s.icon size={18} /></div>
                <span className="text-[10px] font-medium">{s.l}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. VINGROUP — section riêng, horizontal scroll */}
        <section className="px-[22px] pt-[24px] pb-[8px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[10px]">Hệ sinh thái Vingroup</p>
          <div className="flex gap-[8px] overflow-x-auto">
            {[{icon:Building2,n:"Vinhomes",d:"Phí QL, gửi xe"},{icon:Car,n:"VinFast",d:"Pin & sạc"},{icon:GraduationCap,n:"Vinschool",d:"Học phí"}].map(v=>(
              <button key={v.n} className="bg-secondary rounded-[16px] p-[12px] shrink-0 w-[115px] text-left">
                <v.icon size={16} className="mb-[6px]" />
                <p className="text-[12px] font-semibold">{v.n}</p>
                <p className="text-[10px] text-foreground-secondary">{v.d}</p>
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
