"use client"

import { Search, Zap, Droplets, Wifi, Smartphone, CreditCard, BarChart3, Star, Building2, Car, GraduationCap, ChevronRight } from "lucide-react"

export default function OptionB() {
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
        <span className="ml-2 text-[10px] font-bold bg-foreground text-background px-[6px] py-[2px] rounded-full">Option B</span>
      </div>

      <div className="px-[22px] pb-[10px]">
        <div className="flex items-center gap-[10px] bg-secondary rounded-full px-[14px] py-[10px]">
          <Search size={18} className="text-foreground-secondary" />
          <span className="text-[14px] text-foreground-secondary font-medium">Tìm dịch vụ, nhà cung cấp...</span>
        </div>
      </div>

      <div className="flex-1">
        {/* GRID FIRST — Smart sort, Vingroup in row 3 */}
        <section className="px-[22px] pt-[8px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[10px]">Dịch vụ</p>
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
              { icon: Building2, label: "Vinhomes" },
              { icon: Car, label: "VinFast" },
              { icon: GraduationCap, label: "Vinschool" },
              { icon: Star, label: "Thêm" },
            ].map((s) => (
              <button key={s.label} className="flex flex-col items-center gap-[5px]">
                <div className="w-[44px] h-[44px] rounded-[12px] bg-secondary flex items-center justify-center">
                  <s.icon size={20} />
                </div>
                <span className="text-[10px] font-medium">{s.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Cần thanh toán — bills with CTA */}
        <section className="px-[22px] pt-[24px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[8px]">Cần thanh toán</p>
          {[
            { icon: Zap, name: "EVN Hà Nội", desc: "Quá hạn 3 ngày", amount: "501.500 đ" },
            { icon: Wifi, name: "FPT Telecom", desc: "Hạn 25/03 · Mới", amount: "299.000 đ" },
          ].map((b,i) => (
            <button key={b.name} className={`w-full flex items-center gap-[12px] py-[12px] text-left ${i===0?"border-b border-border":""}`}>
              <div className="w-[40px] h-[40px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                <b.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold">{b.name}</p>
                <p className="text-[12px] text-foreground-secondary">{b.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[14px] font-bold">{b.amount}</p>
                <p className="text-[11px] font-semibold">Trả ngay</p>
              </div>
            </button>
          ))}
        </section>

        {/* Đã lưu */}
        <section className="px-[22px] pt-[24px]">
          <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px] mb-[8px]">Đã lưu</p>
          {[
            { icon: Droplets, name: "SAWACO", desc: "Chưa có hoá đơn" },
            { icon: Smartphone, name: "0912 345 678", desc: "Viettel" },
          ].map((s,i) => (
            <button key={s.name} className={`w-full flex items-center gap-[12px] py-[10px] text-left ${i===0?"border-b border-border":""}`}>
              <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                <s.icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold">{s.name}</p>
                <p className="text-[11px] text-foreground-secondary">{s.desc}</p>
              </div>
              <ChevronRight size={16} className="text-foreground-secondary" />
            </button>
          ))}
        </section>

        {/* Gần đây */}
        <section className="px-[22px] pt-[24px] pb-[8px]">
          <div className="flex items-center justify-between mb-[8px]">
            <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-[1px]">Gần đây</p>
            <button className="text-[12px] font-semibold text-foreground-secondary">Tất cả</button>
          </div>
          {[
            { name: "Nạp tiền 0912...", amount: "-100.000 đ" },
            { name: "EVN Hà Nội", amount: "-1.250.000 đ" },
          ].map((tx,i) => (
            <div key={tx.name} className={`flex items-center justify-between py-[10px] text-[13px] ${i===0?"border-b border-border":""}`}>
              <span className="font-semibold">{tx.name}</span>
              <span className="text-foreground-secondary">{tx.amount}</span>
            </div>
          ))}
        </section>
      </div>

      <div className="w-full bg-background border-t border-border">
        <div className="flex items-center justify-around h-[52px]">
          {["Trang chủ","Thanh toán","QR","Giao dịch","Tài khoản"].map((t,i) => (
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
