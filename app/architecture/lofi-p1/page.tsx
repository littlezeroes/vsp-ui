"use client"
/* Phase 1 — Home 30/4 */
import { Bell, CreditCard, ArrowDownLeft, ArrowUpRight, ChevronRight, Eye, QrCode, Receipt, Shield, TrendingUp, Wallet } from "lucide-react"

export default function P1Home() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <div className="h-[44px]" />
        {/* Top bar */}
        <div className="flex items-center justify-between px-[22px] py-[8px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center"><span className="text-sm font-bold">H</span></div>
            <span className="text-[16px] font-semibold">Xin chào Huy</span>
          </div>
          <div className="relative"><Bell size={22} /><span className="absolute -top-1 -right-1 w-[16px] h-[16px] rounded-full bg-destructive flex items-center justify-center text-[9px] font-bold text-white">3</span></div>
        </div>

        <div className="flex-1 overflow-y-auto pb-[90px]">
          {/* Wallet */}
          <div className="px-[22px] pt-[8px]">
            <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
              <div className="p-[20px]">
                <div className="flex items-center gap-[6px] mb-[4px]"><Wallet size={14} className="text-white/60" /><span className="text-[13px] font-medium text-white/70">Ví V-Smart Pay</span></div>
                <div className="flex items-center gap-[8px] mb-[2px]"><span className="text-[11px] text-white/60">Tài khoản của bạn</span><Eye size={14} className="text-white/60" /></div>
                <span className="text-[28px] font-bold text-white tabular-nums">14.328 <span className="text-[18px]">đ</span></span>
              </div>
            </div>
          </div>

          {/* Quick actions — 4 icons */}
          <div className="flex justify-between px-[22px] pt-[20px] pb-[4px]">
            {[
              { i: <CreditCard size={22} />, l: "Nạp tiền" },
              { i: <ArrowUpRight size={22} />, l: "Rút tiền" },
              { i: <ArrowUpRight size={22} />, l: "Chuyển tiền" },
              { i: <ArrowDownLeft size={22} />, l: "Nhận tiền" },
            ].map(({ i, l }) => (
              <button key={l} type="button" className="flex flex-col items-center gap-[6px] w-[72px]">
                <div className="w-[52px] h-[52px] rounded-full bg-secondary flex items-center justify-center text-foreground">{i}</div>
                <span className="text-[11px] font-medium text-foreground-secondary text-center leading-tight">{l}</span>
              </button>
            ))}
          </div>

          {/* Sinh lời card */}
          <div className="px-[22px] pt-[32px]">
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-success/10 flex items-center justify-center shrink-0"><TrendingUp size={22} className="text-success" /></div>
                <div className="flex-1"><p className="text-[15px] font-semibold">Sinh lời tự động</p><p className="text-[13px] text-foreground-secondary">Lãi suất lên đến <span className="text-success font-semibold">5.5%</span>/năm</p></div>
                <ChevronRight size={20} className="text-foreground-secondary" />
              </div>
            </div>
          </div>

          {/* BH card */}
          <div className="px-[22px] pt-[12px]">
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-foreground/5 flex items-center justify-center shrink-0"><Shield size={22} className="text-foreground" /></div>
                <div className="flex-1"><p className="text-[15px] font-semibold">Bảo hiểm xe TNDS</p><p className="text-[13px] text-foreground-secondary">Xe máy · Ô tô · Mua từ 66.000đ</p></div>
                <ChevronRight size={20} className="text-foreground-secondary" />
              </div>
            </div>
          </div>

          {/* GD gần đây */}
          <div className="pt-[32px]">
            <div className="flex items-center justify-between px-[22px] mb-[12px]"><p className="text-[15px] font-semibold">Giao dịch gần đây</p><button type="button" className="text-[13px] font-semibold text-success">Xem tất cả</button></div>
            <div className="px-[22px]">
              {[{ t: "CONG TY CO PHAN NAM MUOI...", s: "13:22 · 15/03", a: "-38.000đ" }, { t: "HO THI MY MY", s: "12:51 · 15/03", a: "-100.000đ" }, { t: "Nạp tiền ĐT Vinaphone", s: "21:01 · 03/02", a: "-20.000đ" }].map((tx, i) => (
                <div key={i} className="flex items-center gap-[12px] py-[12px] border-b border-border last:border-b-0">
                  <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0"><ArrowUpRight size={16} className="text-foreground-secondary" /></div>
                  <div className="flex-1 min-w-0"><p className="text-[13px] font-medium truncate">{tx.t}</p><p className="text-[11px] text-foreground-secondary">{tx.s}</p></div>
                  <span className="text-[13px] font-semibold tabular-nums shrink-0">{tx.a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
          <div className="flex items-center justify-around pt-[6px] pb-[26px]">
            {["Trang chủ", "Thanh toán", "QR", "Giao dịch", "Tài khoản"].map((t, i) => t === "QR" ? (
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
      </div>
    </div>
  )
}
