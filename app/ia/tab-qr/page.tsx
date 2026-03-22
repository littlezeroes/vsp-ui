"use client"

import { QrCode, Copy, Share2 } from "lucide-react"

export default function TabQR() {
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

      <div className="h-[56px] px-[22px] flex items-center justify-center">
        <p className="text-[18px] font-bold">QR</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-[22px]">
        {/* Tabs */}
        <div className="flex gap-[4px] bg-secondary rounded-full p-[3px] mb-[32px]">
          <button className="bg-foreground text-background rounded-full px-[20px] py-[8px] text-[13px] font-semibold">Nhận tiền</button>
          <button className="text-foreground-secondary rounded-full px-[20px] py-[8px] text-[13px] font-semibold">Quét mã</button>
        </div>

        {/* QR Code placeholder */}
        <div className="w-[220px] h-[220px] bg-secondary rounded-[20px] flex items-center justify-center">
          <div className="w-[180px] h-[180px] border-2 border-foreground/20 rounded-[12px] flex items-center justify-center">
            <QrCode size={120} className="text-foreground/30" />
          </div>
        </div>

        <p className="text-[16px] font-bold mt-[20px]">Nguyễn Huy Kiều</p>
        <p className="text-[13px] text-foreground-secondary mt-[2px]">V-Smart Pay · 0912***456</p>

        {/* Actions */}
        <div className="flex gap-[12px] mt-[24px]">
          <button className="flex items-center gap-[6px] bg-secondary rounded-full px-[16px] py-[10px]">
            <Copy size={16} />
            <span className="text-[13px] font-semibold">Sao chép</span>
          </button>
          <button className="flex items-center gap-[6px] bg-secondary rounded-full px-[16px] py-[10px]">
            <Share2 size={16} />
            <span className="text-[13px] font-semibold">Chia sẻ</span>
          </button>
        </div>

        <p className="text-[11px] text-foreground-secondary mt-[16px]">Quét mã VietQR để nhận tiền</p>
      </div>

      {/* Bottom Nav */}
      <div className="w-full bg-background border-t border-border">
        <div className="flex items-center justify-around h-[52px]">
          {[
            { label: "Trang chủ", active: false },
            { label: "Thanh toán", active: false },
            { label: "QR", active: true },
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
