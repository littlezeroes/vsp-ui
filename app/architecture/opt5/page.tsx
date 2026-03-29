"use client"
import * as React from "react"
import { Bell, ChevronRight, CreditCard, ArrowDownLeft, ArrowUpRight, Eye, EyeOff, QrCode, Receipt, TrendingUp, Wallet } from "lucide-react"

/* Option ⑤ — Wallet Hub — mở rộng wallet card = mini dashboard */
export default function Opt5() {
  const [bh, setBh] = React.useState(false)
  const [walletTab, setWalletTab] = React.useState<"vi" | "sl" | "dt">("vi")

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <div className="h-[44px]" />
        <div className="flex items-center justify-between px-[22px] py-[8px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center"><span className="text-sm font-bold">H</span></div>
            <span className="text-[16px] font-semibold">Xin chào Huy</span>
          </div>
          <div className="relative"><Bell size={22} /></div>
        </div>
        <div className="flex-1 overflow-y-auto pb-[90px]">
          {/* Wallet Card MỞ RỘNG — internal tabs */}
          <div className="px-[22px] pt-[8px]">
            <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
              {/* Tabs */}
              <div className="flex gap-[6px] px-[16px] pt-[16px]">
                {[{ v: "vi" as const, l: "Ví" }, { v: "sl" as const, l: "Sinh lời" }, { v: "dt" as const, l: "Đầu tư" }].map(t => (
                  <button key={t.v} type="button" onClick={() => setWalletTab(t.v)} className={`px-[12px] py-[4px] rounded-full text-[11px] font-semibold ${walletTab === t.v ? "bg-white/20 text-white" : "bg-white/5 text-white/50"}`}>{t.l}</button>
                ))}
              </div>
              <div className="p-[20px] pt-[12px]">
                {walletTab === "vi" && (
                  <>
                    <div className="flex items-center gap-[6px] mb-[4px]"><Wallet size={14} className="text-white/60" /><span className="text-[13px] font-medium text-white/70">Ví V-Smart Pay</span></div>
                    <span className="text-[28px] font-bold text-white tabular-nums">{bh ? "••••••••" : "14.328"} <span className="text-[18px]">đ</span></span>
                    <p className="text-[11px] text-white/50 mt-[6px]">Tổng tài sản: {bh ? "••••" : "5.014.328đ"}</p>
                  </>
                )}
                {walletTab === "sl" && (
                  <>
                    <div className="flex items-center gap-[6px] mb-[4px]"><TrendingUp size={14} className="text-white/60" /><span className="text-[13px] font-medium text-white/70">Sinh lời tự động</span></div>
                    <span className="text-[28px] font-bold text-white tabular-nums">{bh ? "••••••••" : "5.000.000"} <span className="text-[18px]">đ</span></span>
                    <p className="text-[11px] text-emerald-300 mt-[6px]">+12.500đ lãi tích lũy · 5.5%/năm</p>
                  </>
                )}
                {walletTab === "dt" && (
                  <>
                    <div className="flex items-center gap-[6px] mb-[4px]"><span className="text-[13px] font-medium text-white/70">Đầu tư BĐS mã hoá</span></div>
                    <span className="text-[28px] font-bold text-white tabular-nums">0 <span className="text-[18px]">đ</span></span>
                    <p className="text-[11px] text-white/50 mt-[6px]">Vinhomes Grand Park · từ 1Mđ</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Quick actions — giữ 3 */}
          <div className="flex justify-between px-[40px] pt-[20px] pb-[4px]">
            {[{ i: <CreditCard size={22} />, l: "Nạp / Rút" }, { i: <ArrowDownLeft size={22} />, l: "Nhận tiền" }, { i: <Receipt size={22} />, l: "Thanh toán" }].map(({ i, l }) => (
              <button key={l} type="button" className="flex flex-col items-center gap-[6px]">
                <div className="w-[52px] h-[52px] rounded-full bg-secondary flex items-center justify-center text-foreground">{i}</div>
                <span className="text-[11px] font-medium text-foreground-secondary">{l}</span>
              </button>
            ))}
          </div>
          {/* VAS */}
          <div className="px-[22px] pt-[32px]">
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-foreground/5 flex items-center justify-center shrink-0"><Receipt size={22} /></div>
                <div className="flex-1"><p className="text-[15px] font-semibold">Thanh toán hóa đơn</p><p className="text-[13px] text-foreground-secondary">Điện, nước, internet, điện thoại</p></div>
                <ChevronRight size={20} className="text-foreground-secondary" />
              </div>
            </div>
          </div>
          {/* GD */}
          <div className="pt-[32px]">
            <div className="flex items-center justify-between px-[22px] mb-[12px]"><p className="text-[15px] font-semibold">Giao dịch gần đây</p><button type="button" className="text-[13px] font-semibold text-success">Xem tất cả</button></div>
            <div className="px-[22px]">
              {[{ t: "CONG TY CO PHAN...", s: "13:22 · 15/03", a: "-38.000đ" }, { t: "HO THI MY MY", s: "12:51 · 15/03", a: "-100.000đ" }].map((tx, i) => (
                <div key={i} className="flex items-center gap-[12px] py-[12px] border-b border-border last:border-b-0">
                  <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0"><ArrowUpRight size={16} className="text-foreground-secondary" /></div>
                  <div className="flex-1 min-w-0"><p className="text-[13px] font-medium truncate">{tx.t}</p><p className="text-[11px] text-foreground-secondary">{tx.s}</p></div>
                  <span className="text-[13px] font-semibold tabular-nums shrink-0">{tx.a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Nav — giữ nguyên */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
          <div className="flex items-center justify-around pt-[6px] pb-[26px]">
            {["Trang chủ", "Chuyển tiền", "QR", "Giao dịch", "Tài khoản"].map((t, i) => t === "QR" ? (
              <div key={i} className="w-[52px] h-[52px] rounded-full bg-foreground flex items-center justify-center -mt-[18px]"><QrCode size={24} className="text-background" /></div>
            ) : (
              <div key={i} className="flex flex-col items-center gap-[3px]">
                <div className={`w-[22px] h-[22px] rounded-[6px] ${i === 0 ? "bg-foreground" : "bg-foreground/15"}`} />
                <span className={`text-[10px] font-medium ${i === 0 ? "text-foreground" : "text-foreground-secondary"}`}>{t}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center pb-[4px] -mt-[6px]"><div className="w-[139px] h-[5px] rounded-full bg-foreground" /></div>
        </div>
        <Label>⑤ Wallet Hub — tap Ví / Sinh lời / Đầu tư trong card</Label>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-0 inset-x-0 bg-foreground text-background text-center py-[6px] text-[12px] font-bold z-50">{children}</div>
}
