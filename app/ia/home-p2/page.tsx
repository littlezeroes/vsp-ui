"use client"

import { Eye, ArrowLeftRight, Send, QrCode, ChevronRight, Bell, Shield, TrendingUp, Clock, Zap, Droplets, Wifi, Smartphone, AlertCircle, PieChart } from "lucide-react"

export default function HomeP2() {
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

      <div className="h-[56px] px-[22px] flex items-center justify-between">
        <div>
          <p className="text-[11px] text-foreground-secondary">Xin chào</p>
          <p className="text-[17px] font-bold -mt-[2px]">Nguyễn Huy Kiều</p>
        </div>
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-secondary">
          <Bell size={20} />
        </button>
      </div>

      <div className="flex-1">
        {/* Wallet Card + Sinh lời inline */}
        <section className="px-[22px] pt-[8px]">
          <div className="bg-foreground text-background rounded-[28px] p-[20px]">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium opacity-60">Số dư ví</p>
              <button className="opacity-50"><Eye size={18} /></button>
            </div>
            <p className="text-[32px] font-bold tracking-tight mt-[2px]">14.328.000<span className="text-[18px] ml-1">đ</span></p>
            <div className="mt-[14px] w-full bg-background/12 rounded-[14px] px-[14px] py-[10px] flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <TrendingUp size={16} className="opacity-70" />
                <div>
                  <p className="text-[11px] opacity-50">Sinh lời</p>
                  <p className="text-[14px] font-bold">5.000.000 đ</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold">+12.500 đ</p>
                <p className="text-[10px] opacity-50">Hôm nay</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-[22px] pt-[20px]">
          <div className="flex justify-between">
            {[
              { icon: ArrowLeftRight, label: "Nạp / Rút" },
              { icon: Send, label: "Chuyển tiền" },
              { icon: QrCode, label: "Nhận tiền" },
              { icon: Clock, label: "Lịch sử" },
            ].map((a) => (
              <button key={a.label} className="flex flex-col items-center gap-[6px] w-[72px]">
                <div className="w-[48px] h-[48px] rounded-full bg-secondary flex items-center justify-center">
                  <a.icon size={22} />
                </div>
                <span className="text-[11px] font-medium text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Reminder hoá đơn */}
        <section className="px-[22px] pt-[32px]">
          <button className="w-full bg-secondary rounded-[20px] p-[14px] flex items-center gap-[12px] text-left">
            <div className="w-[40px] h-[40px] rounded-full bg-foreground/8 flex items-center justify-center shrink-0">
              <AlertCircle size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold">2 hoá đơn sắp đến hạn</p>
              <p className="text-[12px] text-foreground-secondary">EVN 380K · FPT 220K · Hạn 15/04</p>
            </div>
            <span className="text-[12px] font-semibold shrink-0">Trả</span>
          </button>
        </section>

        {/* Widget tài sản đầu tư (behavioral) */}
        <section className="px-[22px] pt-[16px]">
          <button className="w-full bg-secondary rounded-[20px] p-[14px] text-left">
            <div className="flex items-center justify-between mb-[8px]">
              <div className="flex items-center gap-[8px]">
                <PieChart size={18} />
                <p className="text-[13px] font-bold">Tài sản đầu tư</p>
              </div>
              <ChevronRight size={18} className="text-foreground-secondary" />
            </div>
            <p className="text-[22px] font-bold">25.000.000<span className="text-[14px] ml-1">đ</span></p>
            <div className="flex gap-[16px] mt-[8px]">
              <div>
                <p className="text-[10px] text-foreground-secondary">Sinh lời</p>
                <p className="text-[12px] font-semibold">5 triệu</p>
              </div>
              <div>
                <p className="text-[10px] text-foreground-secondary">Bất động sản</p>
                <p className="text-[12px] font-semibold">20 triệu</p>
              </div>
            </div>
          </button>
        </section>

        {/* Thanh toán — OKX widget pattern */}
        <section className="px-[22px] pt-[32px]">
          <div className="bg-secondary rounded-[20px] p-[10px]">
            <button className="w-full bg-background rounded-[14px] p-[14px] flex items-center justify-between text-left mb-[8px]">
              <div>
                <p className="text-[16px] font-bold">Thanh toán</p>
                <p className="text-[12px] text-foreground-secondary">Hoá đơn & dịch vụ</p>
              </div>
              <ChevronRight size={22} />
            </button>
            <div className="grid grid-cols-2 gap-[8px]">
              {[
                { icon: Zap, name: "Điện", desc: "EVN, EVNSPC..." },
                { icon: Droplets, name: "Nước", desc: "Viwaco, Sawaco..." },
                { icon: Wifi, name: "Internet", desc: "FPT, VNPT, Viettel" },
                { icon: Smartphone, name: "Nạp ĐT", desc: "Tất cả nhà mạng" },
              ].map((s) => (
                <button key={s.name} className="bg-background rounded-[14px] p-[10px] flex items-center gap-[8px] text-left">
                  <div className="w-[34px] h-[34px] rounded-[10px] bg-secondary flex items-center justify-center shrink-0">
                    <s.icon size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold leading-tight">{s.name}</p>
                    <p className="text-[10px] text-foreground-secondary truncate">{s.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Giao dịch gần đây */}
        <section className="px-[22px] pt-[32px] pb-[16px]">
          <div className="flex items-center justify-between mb-[12px]">
            <p className="text-[14px] font-bold">Giao dịch gần đây</p>
            <button className="text-[13px] font-semibold text-foreground-secondary">Tất cả</button>
          </div>
          {[
            { name: "Công ty Điện lực HN", desc: "Hoá đơn điện · 10:32", amount: "-380.000 đ", icon: Zap },
            { name: "Hồ Thị Minh Anh", desc: "Chuyển tiền · Hôm qua", amount: "-100.000 đ", icon: Send },
          ].map((tx, i) => (
            <div key={i} className={`flex items-center gap-[12px] py-[12px] ${i === 0 ? "border-b border-border" : ""}`}>
              <div className="w-[40px] h-[40px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                <tx.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold truncate">{tx.name}</p>
                <p className="text-[12px] text-foreground-secondary">{tx.desc}</p>
              </div>
              <p className="text-[14px] font-semibold tabular-nums text-foreground-secondary">{tx.amount}</p>
            </div>
          ))}
        </section>
      </div>

      <div className="w-full bg-background border-t border-border">
        <div className="flex items-center justify-around h-[52px]">
          {[
            { label: "Trang chủ", active: true },
            { label: "Thanh toán", active: false },
            { label: "QR", active: false },
            { label: "Giao dịch", active: false },
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
