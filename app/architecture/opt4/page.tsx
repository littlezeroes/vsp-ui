"use client"
import * as React from "react"
import { Bell, ChevronRight, CreditCard, ArrowDownLeft, ArrowUpRight, Eye, EyeOff, Flame, Gift, QrCode, Receipt, TrendingUp, Wallet } from "lucide-react"

/* Option ④ — Giao dịch → Ưu đãi */
export default function Opt4() {
  const [bh, setBh] = React.useState(false)
  const [tab, setTab] = React.useState<"home" | "ud">("home")

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
              {/* Wallet */}
              <div className="px-[22px] pt-[8px]">
                <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
                  <div className="p-[20px]">
                    <div className="flex items-center gap-[6px] mb-[4px]"><Wallet size={14} className="text-white/60" /><span className="text-[13px] font-medium text-white/70">Ví V-Smart Pay</span></div>
                    <span className="text-[28px] font-bold text-white tabular-nums">{bh ? "••••••••" : "14.328"} <span className="text-[18px]">đ</span></span>
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
              {/* Sinh lời */}
              <div className="px-[22px] pt-[32px]">
                <div className="rounded-[28px] bg-secondary p-[20px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-success/10 flex items-center justify-center shrink-0"><TrendingUp size={22} className="text-success" /></div>
                    <div className="flex-1"><p className="text-[15px] font-semibold">Sinh lời tự động</p><p className="text-[13px] text-foreground-secondary">5.5%/năm</p></div>
                    <ChevronRight size={20} className="text-foreground-secondary" />
                  </div>
                </div>
              </div>
              {/* VAS */}
              <div className="px-[22px] pt-[16px]">
                <div className="rounded-[28px] bg-secondary p-[20px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-foreground/5 flex items-center justify-center shrink-0"><Receipt size={22} /></div>
                    <div className="flex-1"><p className="text-[15px] font-semibold">Thanh toán hóa đơn</p><p className="text-[13px] text-foreground-secondary">Điện, nước, internet</p></div>
                    <ChevronRight size={20} className="text-foreground-secondary" />
                  </div>
                </div>
              </div>
              {/* GD gần đây — mở rộng vì không còn tab GD */}
              <div className="pt-[32px]">
                <div className="flex items-center justify-between px-[22px] mb-[12px]"><p className="text-[15px] font-semibold">Giao dịch gần đây</p><button type="button" className="text-[13px] font-semibold text-success">Xem tất cả →</button></div>
                <div className="px-[22px]">
                  {[{ t: "CONG TY CO PHAN...", s: "13:22 · 15/03", a: "-38.000đ" }, { t: "HO THI MY MY", s: "12:51 · 15/03", a: "-100.000đ" }, { t: "Nạp ĐT Vinaphone", s: "21:01 · 03/02", a: "-20.000đ" }, { t: "THAI TRUONG LAM", s: "13:45 · 09/03", a: "-116.000đ" }].map((tx, i) => (
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
            {/* UU DAI TAB */}
            <div className="px-[22px] pb-[4px]"><h1 className="text-[24px] font-bold leading-8 tracking-[-0.25px]">Ưu đãi</h1></div>
            <div className="flex-1 overflow-y-auto pb-[90px]">
              {/* Featured */}
              <div className="px-[22px] pt-[8px]">
                <div className="rounded-[28px] overflow-hidden bg-amber-50 p-[20px]">
                  <div className="flex items-center gap-[6px] mb-[6px]"><Flame size={16} className="text-amber-500" /><span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Hot deal</span></div>
                  <p className="text-[18px] font-bold text-foreground">Giảm 50% XanhSM</p>
                  <p className="text-[13px] text-foreground-secondary mt-[2px]">HSD: 30/04/2026</p>
                  <div className="mt-[12px] inline-flex bg-amber-500 rounded-full px-[14px] py-[8px]"><span className="text-[13px] font-semibold text-white">Lấy ngay</span></div>
                </div>
              </div>
              {/* Categories */}
              <div className="flex gap-[8px] px-[22px] pt-[16px]">
                {["Ăn uống", "Di chuyển", "Mua sắm", "Du lịch"].map(c => (
                  <div key={c} className="bg-secondary rounded-full px-[12px] py-[6px]"><span className="text-[12px] font-medium text-foreground-secondary">{c}</span></div>
                ))}
              </div>
              {/* Deal list */}
              <div className="px-[22px] pt-[16px]">
                {[
                  { t: "VinPearl giảm 30%", s: "Du lịch · HSD 30/06", icon: "🎁" },
                  { t: "Vinhomes cashback 2%", s: "Bất động sản", icon: "🏠" },
                  { t: "XanhSM voucher 20K", s: "Di chuyển · HSD 15/04", icon: "🚗" },
                  { t: "Highland Coffee -15%", s: "Ăn uống · HSD 30/04", icon: "☕" },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-[12px] py-[14px] border-b border-border last:border-b-0">
                    <div className="w-[44px] h-[44px] rounded-[14px] bg-secondary flex items-center justify-center shrink-0 text-[20px]">{d.icon}</div>
                    <div className="flex-1"><p className="text-[14px] font-semibold">{d.t}</p><p className="text-[12px] text-foreground-secondary">{d.s}</p></div>
                    <ChevronRight size={18} className="text-foreground-secondary" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Nav — Giao dịch → Ưu đãi */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
          <div className="flex items-center justify-around pt-[6px] pb-[26px]">
            {[
              { l: "Trang chủ", v: "home" as const },
              { l: "Chuyển tiền", v: "ct" as const },
              { l: "QR", v: "qr" as const, isCenter: true },
              { l: "Ưu đãi", v: "ud" as const, isNew: true },
              { l: "Tài khoản", v: "tk" as const },
            ].map((t, i) => t.isCenter ? (
              <div key={i} className="w-[52px] h-[52px] rounded-full bg-foreground flex items-center justify-center -mt-[18px]"><QrCode size={24} className="text-background" /></div>
            ) : (
              <button key={i} type="button" onClick={() => { if (t.v === "home" || t.v === "ud") setTab(t.v) }} className="flex flex-col items-center gap-[3px]">
                <div className={`w-[22px] h-[22px] rounded-[6px] ${tab === t.v ? "bg-foreground" : t.isNew ? "bg-amber-500" : "bg-foreground/15"}`} />
                <span className={`text-[10px] font-medium ${tab === t.v ? "text-foreground" : t.isNew ? "text-amber-500" : "text-foreground-secondary"}`}>{t.l}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-center pb-[4px] -mt-[6px]"><div className="w-[139px] h-[5px] rounded-full bg-foreground" /></div>
        </div>

        <Label>④ Giao dịch → Ưu đãi — tap tabs để switch</Label>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-0 inset-x-0 bg-amber-500 text-white text-center py-[6px] text-[12px] font-bold z-50">{children}</div>
}
