"use client"
import * as React from "react"
import Link from "next/link"
import { Bell, Building2, ChevronRight, CreditCard, ArrowDownLeft, ArrowUpRight, Eye, EyeOff, QrCode, Receipt, TrendingUp, Wallet } from "lucide-react"

/* Option ② — Chuyển tiền → Tài chính (RECOMMENDED) */
export default function Opt2() {
  const [bh, setBh] = React.useState(false)
  const [tab, setTab] = React.useState<"home" | "tc">("home")

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <div className="h-[44px]" />

        {tab === "home" ? (
          <>
            {/* Top bar */}
            <div className="flex items-center justify-between px-[22px] py-[8px]">
              <div className="flex items-center gap-[10px]">
                <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center"><span className="text-sm font-bold">H</span></div>
                <span className="text-[16px] font-semibold">Xin chào Huy</span>
              </div>
              <div className="relative"><Bell size={22} /><span className="absolute -top-1 -right-1 w-[16px] h-[16px] rounded-full bg-destructive flex items-center justify-center text-[9px] font-bold text-white">12</span></div>
            </div>
            <div className="flex-1 overflow-y-auto pb-[90px]">
              {/* Wallet */}
              <div className="px-[22px] pt-[8px]">
                <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
                  <div className="p-[20px]">
                    <div className="flex items-center gap-[6px] mb-[4px]"><Wallet size={14} className="text-white/60" /><span className="text-[13px] font-medium text-white/70">Ví V-Smart Pay</span></div>
                    <div className="flex items-center gap-[8px] mb-[2px]"><span className="text-[11px] text-white/60">Tài khoản của bạn</span><button type="button" onClick={() => setBh(v => !v)} className="text-white/60">{bh ? <EyeOff size={14} /> : <Eye size={14} />}</button></div>
                    <span className="text-[28px] font-bold text-white tabular-nums">{bh ? "••••••••" : "14.328"} <span className="text-[18px]">đ</span></span>
                  </div>
                </div>
              </div>
              {/* Quick actions — 4 icons (Chuyển tiền gộp vào) */}
              <div className="flex justify-between px-[22px] pt-[20px] pb-[4px]">
                {[{ i: <CreditCard size={22} />, l: "Nạp / Rút" }, { i: <ArrowUpRight size={22} />, l: "Chuyển tiền" }, { i: <ArrowDownLeft size={22} />, l: "Nhận tiền" }, { i: <Receipt size={22} />, l: "Thanh toán" }].map(({ i, l }) => (
                  <button key={l} type="button" className="flex flex-col items-center gap-[6px] w-[72px]">
                    <div className="w-[52px] h-[52px] rounded-full bg-secondary flex items-center justify-center text-foreground">{i}</div>
                    <span className="text-[11px] font-medium text-foreground-secondary text-center leading-tight">{l}</span>
                  </button>
                ))}
              </div>
              {/* Sinh lời card */}
              <div className="px-[22px] pt-[32px]">
                <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
                  <div className="p-[20px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[44px] h-[44px] rounded-full bg-white/10 flex items-center justify-center shrink-0"><TrendingUp size={22} className="text-white" /></div>
                      <div className="flex-1"><p className="text-[13px] text-white/60">Sinh lời tự động</p><p className="text-[22px] font-bold text-white tabular-nums leading-tight">{bh ? "••••••" : "5.000.000"} <span className="text-[14px]">đ</span></p></div>
                      <div className="text-right shrink-0"><p className="text-[13px] font-semibold text-emerald-300">{bh ? "••" : "+12.500đ"}</p><p className="text-[11px] text-white/50">5.5%/năm</p></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* VAS */}
              <div className="px-[22px] pt-[16px]">
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
                  {[{ t: "Chuyển tiền đến CONG TY CO PHAN...", s: "13:22 · 15/03", a: "-38.000đ" }, { t: "Chuyển tiền đến HO THI MY MY", s: "12:51 · 15/03", a: "-100.000đ" }].map((tx, i) => (
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
            {/* TAI CHINH TAB */}
            <div className="px-[22px] pb-[4px]"><h1 className="text-[24px] font-bold leading-8 tracking-[-0.25px]">Tài chính</h1></div>
            <div className="flex-1 overflow-y-auto pb-[90px]">
              {/* Tổng tài sản */}
              <div className="px-[22px] pt-[8px]">
                <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
                  <div className="p-[20px]">
                    <div className="flex items-center gap-[8px] mb-[14px]"><span className="text-[13px] font-medium text-white/70">Tổng tài sản</span><button type="button" onClick={() => setBh(v => !v)} className="text-white/60">{bh ? <EyeOff size={14} /> : <Eye size={14} />}</button></div>
                    <p className="text-[32px] font-bold text-white tabular-nums leading-none mb-[16px]">{bh ? "••••••••" : "5.014.328"} <span className="text-[18px]">đ</span></p>
                    <div className="flex gap-[8px]">
                      <div className="flex items-center gap-[6px] bg-white/10 rounded-full px-[12px] py-[6px]"><Wallet size={12} className="text-white/60" /><span className="text-[11px] text-white/70">Ví</span><span className="text-[11px] font-semibold text-white">{bh ? "••••" : "14.328đ"}</span></div>
                      <div className="flex items-center gap-[6px] bg-white/10 rounded-full px-[12px] py-[6px]"><TrendingUp size={12} className="text-white/60" /><span className="text-[11px] text-white/70">Sinh lời</span><span className="text-[11px] font-semibold text-white">{bh ? "••••" : "5Mđ"}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sinh lời */}
              <div className="px-[22px] pt-[32px]">
                <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
                  <div className="p-[20px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[44px] h-[44px] rounded-full bg-white/10 flex items-center justify-center shrink-0"><TrendingUp size={22} className="text-white" /></div>
                      <div className="flex-1"><div className="flex items-center gap-[6px]"><p className="text-[14px] font-semibold text-white">Sinh lời tự động</p><div className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" /></div><p className="text-[20px] font-bold text-white tabular-nums leading-tight">{bh ? "••••••" : "5.000.000"} <span className="text-[13px]">đ</span></p></div>
                      <div className="text-right shrink-0"><p className="text-[12px] font-semibold text-emerald-300">{bh ? "••" : "+12.500đ"}</p><p className="text-[10px] text-white/50">5.5%/năm</p></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* BĐS */}
              <div className="px-[22px] pt-[12px]">
                <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)" }}>
                  <div className="p-[20px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[44px] h-[44px] rounded-full bg-white/10 flex items-center justify-center shrink-0"><Building2 size={22} className="text-blue-300" /></div>
                      <div className="flex-1"><p className="text-[14px] font-semibold text-white">Đầu tư BĐS mã hoá</p><p className="text-[12px] text-white/60">Vinhomes Grand Park · từ 1Mđ</p></div>
                      <ChevronRight size={18} className="text-white/40 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Hoạt động */}
              <div className="pt-[32px]">
                <div className="flex items-center justify-between px-[22px] mb-[4px]"><p className="text-[15px] font-semibold">Hoạt động</p><button type="button" className="text-[13px] font-semibold text-success">Tất cả</button></div>
                <div className="px-[22px]">
                  {[{ t: "Lãi sinh lời tháng 3", s: "21/03/2026", a: "+4.200đ", p: true }, { t: "Kích hoạt sinh lời", s: "15/02/2026", a: "5.000.000đ", p: false }].map((tx, i) => (
                    <div key={i} className="flex items-center gap-[12px] py-[12px] border-b border-border last:border-b-0">
                      <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0"><TrendingUp size={16} className="text-foreground-secondary" /></div>
                      <div className="flex-1"><p className="text-[13px] font-medium">{tx.t}</p><p className="text-[11px] text-foreground-secondary">{tx.s}</p></div>
                      <span className={`text-[13px] font-semibold tabular-nums shrink-0 ${tx.p ? "text-success" : ""}`}>{tx.a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bottom Nav — Chuyển tiền → Tài chính */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
          <div className="flex items-center justify-around pt-[6px] pb-[26px]">
            {[
              { l: "Trang chủ", v: "home" as const },
              { l: "Tài chính", v: "tc" as const, isNew: true },
              { l: "QR", v: "qr" as const, isCenter: true },
              { l: "Giao dịch", v: "gd" as const },
              { l: "Tài khoản", v: "tk" as const },
            ].map((t, i) => t.isCenter ? (
              <div key={i} className="w-[52px] h-[52px] rounded-full bg-foreground flex items-center justify-center -mt-[18px]"><QrCode size={24} className="text-background" /></div>
            ) : (
              <button key={i} type="button" onClick={() => { if (t.v === "home" || t.v === "tc") setTab(t.v) }} className="flex flex-col items-center gap-[3px] relative">
                <div className={`w-[22px] h-[22px] rounded-[6px] ${tab === t.v ? "bg-foreground" : t.isNew ? "bg-success" : "bg-foreground/15"}`} />
                <span className={`text-[10px] font-medium ${tab === t.v ? "text-foreground" : t.isNew ? "text-success" : "text-foreground-secondary"}`}>{t.l}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pb-[4px] -mt-[6px]"><div className="w-[139px] h-[5px] rounded-full bg-foreground" /></div>
        </div>

        <Label>② Chuyển tiền → Tài chính ★ RECOMMENDED — tap tabs để switch</Label>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-0 inset-x-0 bg-success text-white text-center py-[6px] text-[12px] font-bold z-50">{children}</div>
}
