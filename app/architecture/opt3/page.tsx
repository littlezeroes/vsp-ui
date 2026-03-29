"use client"
import * as React from "react"
import { Bell, ChevronRight, CreditCard, ArrowDownLeft, ArrowUpRight, Droplets, Eye, EyeOff, Globe, QrCode, Receipt, Smartphone, TrendingUp, Wallet, Zap } from "lucide-react"

/* Option ③ — Chuyển tiền → Dịch vụ */
export default function Opt3() {
  const [bh, setBh] = React.useState(false)
  const [tab, setTab] = React.useState<"home" | "dv">("home")

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <div className="h-[44px]" />

        {tab === "home" ? (
          <>
            <div className="flex items-center justify-between px-[22px] py-[8px]">
              <div className="flex items-center gap-[10px]">
                <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center"><span className="text-sm font-bold">H</span></div>
                <span className="text-[16px] font-semibold">Xin chào Huy</span>
              </div>
              <div className="relative"><Bell size={22} /></div>
            </div>
            <div className="flex-1 overflow-y-auto pb-[90px]">
              <div className="px-[22px] pt-[8px]">
                <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
                  <div className="p-[20px]">
                    <div className="flex items-center gap-[6px] mb-[4px]"><Wallet size={14} className="text-white/60" /><span className="text-[13px] font-medium text-white/70">Ví V-Smart Pay</span></div>
                    <span className="text-[28px] font-bold text-white tabular-nums">{bh ? "••••••••" : "14.328"} <span className="text-[18px]">đ</span></span>
                  </div>
                </div>
              </div>
              {/* Quick actions — Chuyển tiền gộp vào */}
              <div className="flex justify-between px-[40px] pt-[20px] pb-[4px]">
                {[{ i: <ArrowUpRight size={22} />, l: "Chuyển tiền" }, { i: <ArrowDownLeft size={22} />, l: "Nhận tiền" }, { i: <CreditCard size={22} />, l: "Nạp / Rút" }].map(({ i, l }) => (
                  <button key={l} type="button" className="flex flex-col items-center gap-[6px]">
                    <div className="w-[52px] h-[52px] rounded-full bg-secondary flex items-center justify-center text-foreground">{i}</div>
                    <span className="text-[11px] font-medium text-foreground-secondary">{l}</span>
                  </button>
                ))}
              </div>
              {/* Sinh lời card */}
              <div className="px-[22px] pt-[32px]">
                <div className="rounded-[28px] bg-secondary p-[20px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-success/10 flex items-center justify-center shrink-0"><TrendingUp size={22} className="text-success" /></div>
                    <div className="flex-1"><p className="text-[15px] font-semibold">Sinh lời tự động</p><p className="text-[13px] text-foreground-secondary">5.5%/năm · <span className="text-success font-semibold">Kích hoạt</span></p></div>
                    <ChevronRight size={20} className="text-foreground-secondary" />
                  </div>
                </div>
              </div>
              {/* GD */}
              <div className="pt-[32px]">
                <div className="flex items-center justify-between px-[22px] mb-[12px]"><p className="text-[15px] font-semibold">Giao dịch gần đây</p><button type="button" className="text-[13px] font-semibold text-success">Xem tất cả</button></div>
                <div className="px-[22px]">
                  {[{ t: "CONG TY CO PHAN...", s: "13:22 · 15/03", a: "-38.000đ" }, { t: "HO THI MY MY", s: "12:51 · 15/03", a: "-100.000đ" }, { t: "Nạp ĐT Vinaphone", s: "21:01 · 03/02", a: "-20.000đ" }].map((tx, i) => (
                    <div key={i} className="flex items-center gap-[12px] py-[12px] border-b border-border last:border-b-0">
                      <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0"><ArrowUpRight size={16} className="text-foreground-secondary" /></div>
                      <div className="flex-1 min-w-0"><p className="text-[13px] font-medium truncate">{tx.t}</p><p className="text-[11px] text-foreground-secondary">{tx.s}</p></div>
                      <span className="text-[13px] font-semibold tabular-nums shrink-0">{tx.a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* DICH VU TAB */}
            <div className="px-[22px] pb-[4px]"><h1 className="text-[24px] font-bold leading-8 tracking-[-0.25px]">Dịch vụ</h1></div>
            <div className="flex-1 overflow-y-auto pb-[90px]">
              {/* Search */}
              <div className="px-[22px] pt-[8px]">
                <div className="bg-secondary rounded-full px-[16px] py-[10px] flex items-center gap-[10px]">
                  <span className="text-[14px] text-foreground-secondary">🔍 Tìm dịch vụ...</span>
                </div>
              </div>
              {/* VAS Grid */}
              <div className="px-[22px] pt-[24px]">
                <p className="text-[15px] font-semibold mb-[14px]">Thanh toán hóa đơn</p>
                <div className="grid grid-cols-4 gap-y-[16px]">
                  {[{ i: <Zap size={22} />, l: "Điện" }, { i: <Droplets size={22} />, l: "Nước" }, { i: <Globe size={22} />, l: "Internet" }, { i: <Smartphone size={22} />, l: "Nạp ĐT" }].map(({ i, l }) => (
                    <button key={l} type="button" className="flex flex-col items-center gap-[6px]">
                      <div className="w-[48px] h-[48px] rounded-full bg-secondary flex items-center justify-center text-foreground">{i}</div>
                      <span className="text-[11px] font-medium text-foreground-secondary">{l}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Tài chính section */}
              <div className="px-[22px] pt-[32px]">
                <p className="text-[15px] font-semibold mb-[14px]">Tài chính</p>
                <div className="rounded-[28px] bg-secondary p-[20px] mb-[12px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-success/10 flex items-center justify-center shrink-0"><TrendingUp size={22} className="text-success" /></div>
                    <div className="flex-1"><p className="text-[15px] font-semibold">Sinh lời tự động</p><p className="text-[13px] text-foreground-secondary">5.5%/năm</p></div>
                    <ChevronRight size={20} className="text-foreground-secondary" />
                  </div>
                </div>
                <div className="rounded-[28px] bg-secondary p-[20px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-blue-500/10 flex items-center justify-center shrink-0"><Receipt size={22} className="text-blue-500" /></div>
                    <div className="flex-1"><p className="text-[15px] font-semibold">Đầu tư BĐS</p><p className="text-[13px] text-foreground-secondary">Vinhomes Grand Park</p></div>
                    <ChevronRight size={20} className="text-foreground-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Nav */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
          <div className="flex items-center justify-around pt-[6px] pb-[26px]">
            {[
              { l: "Trang chủ", v: "home" as const },
              { l: "Dịch vụ", v: "dv" as const, isNew: true },
              { l: "QR", v: "qr" as const, isCenter: true },
              { l: "Giao dịch", v: "gd" as const },
              { l: "Tài khoản", v: "tk" as const },
            ].map((t, i) => t.isCenter ? (
              <div key={i} className="w-[52px] h-[52px] rounded-full bg-foreground flex items-center justify-center -mt-[18px]"><QrCode size={24} className="text-background" /></div>
            ) : (
              <button key={i} type="button" onClick={() => { if (t.v === "home" || t.v === "dv") setTab(t.v) }} className="flex flex-col items-center gap-[3px]">
                <div className={`w-[22px] h-[22px] rounded-[6px] ${tab === t.v ? "bg-foreground" : t.isNew ? "bg-blue-500" : "bg-foreground/15"}`} />
                <span className={`text-[10px] font-medium ${tab === t.v ? "text-foreground" : t.isNew ? "text-blue-500" : "text-foreground-secondary"}`}>{t.l}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pb-[4px] -mt-[6px]"><div className="w-[139px] h-[5px] rounded-full bg-foreground" /></div>
        </div>

        <Label>③ Chuyển tiền → Dịch vụ — tap tabs để switch</Label>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-0 inset-x-0 bg-blue-600 text-white text-center py-[6px] text-[12px] font-bold z-50">{children}</div>
}
