"use client"
/* Phase 2 — Tab Tài chính Q3 */
import { Building2, ChevronRight, CreditCard, Eye, QrCode, Shield, TrendingUp, Wallet } from "lucide-react"

export default function P2TC() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <div className="h-[44px]" />
        <div className="px-[22px] pb-[8px]"><h1 className="text-[24px] font-bold leading-8 tracking-[-0.25px]">Tài chính</h1></div>

        <div className="flex-1 overflow-y-auto pb-[90px]">
          {/* Tổng tài sản */}
          <div className="px-[22px] pt-[8px]">
            <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)" }}>
              <div className="p-[20px]">
                <div className="flex items-center gap-[8px] mb-[10px]"><span className="text-[13px] font-medium text-white/70">Tổng tài sản</span><Eye size={14} className="text-white/60" /></div>
                <p className="text-[32px] font-bold text-white tabular-nums leading-none mb-[12px]">5.014.328 <span className="text-[18px]">đ</span></p>
                <div className="flex gap-[8px]">
                  <div className="flex items-center gap-[6px] bg-white/10 rounded-full px-[12px] py-[6px]"><Wallet size={12} className="text-white/60" /><span className="text-[11px] text-white/70">Ví</span><span className="text-[11px] font-semibold text-white">14.328đ</span></div>
                  <div className="flex items-center gap-[6px] bg-white/10 rounded-full px-[12px] py-[6px]"><TrendingUp size={12} className="text-white/60" /><span className="text-[11px] text-white/70">Sinh lời</span><span className="text-[11px] font-semibold text-white">5Mđ</span></div>
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
                  <div className="flex-1"><div className="flex items-center gap-[6px]"><p className="text-[14px] font-semibold text-white">Sinh lời tự động</p><div className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" /></div><p className="text-[20px] font-bold text-white tabular-nums leading-tight">5.000.000 <span className="text-[13px]">đ</span></p></div>
                  <div className="text-right shrink-0"><p className="text-[12px] font-semibold text-emerald-300">+12.500đ</p><p className="text-[10px] text-white/50">5.5%/năm</p></div>
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

          {/* Bảo hiểm */}
          <div className="px-[22px] pt-[12px]">
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-foreground/5 flex items-center justify-center shrink-0"><Shield size={22} /></div>
                <div className="flex-1"><p className="text-[15px] font-semibold">Bảo hiểm</p><p className="text-[13px] text-foreground-secondary">Xe máy · Ô tô · Du lịch · Sức khỏe</p><p className="text-[12px] text-foreground-secondary">2 hợp đồng active</p></div>
                <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
              </div>
            </div>
          </div>

          {/* CCQ */}
          <div className="px-[22px] pt-[12px]">
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-foreground/5 flex items-center justify-center shrink-0"><TrendingUp size={22} /></div>
                <div className="flex-1"><p className="text-[15px] font-semibold">Chứng chỉ quỹ</p><p className="text-[13px] text-foreground-secondary">Mua · Bán · Portfolio</p></div>
                <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
              </div>
            </div>
          </div>

          {/* BNPL */}
          <div className="px-[22px] pt-[12px]">
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-foreground/5 flex items-center justify-center shrink-0"><CreditCard size={22} /></div>
                <div className="flex-1"><p className="text-[15px] font-semibold">Ví trả sau</p><p className="text-[13px] text-foreground-secondary">BNPL · Hạn mức · Dư nợ</p></div>
                <ChevronRight size={18} className="text-foreground-secondary shrink-0" />
              </div>
            </div>
          </div>

          {/* Hoạt động */}
          <div className="pt-[32px]">
            <div className="flex items-center justify-between px-[22px] mb-[4px]"><p className="text-[15px] font-semibold">Hoạt động</p><button type="button" className="text-[13px] font-semibold text-success">Tất cả</button></div>
            <div className="px-[22px]">
              {[{ t: "Lãi sinh lời tháng 3", s: "21/03/2026", a: "+4.200đ", p: true }, { t: "Mua BH xe máy TNDS", s: "15/03/2026", a: "-66.000đ" }].map((tx, i) => (
                <div key={i} className="flex items-center gap-[12px] py-[12px] border-b border-border last:border-b-0">
                  <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0"><TrendingUp size={16} className="text-foreground-secondary" /></div>
                  <div className="flex-1"><p className="text-[13px] font-medium">{tx.t}</p><p className="text-[11px] text-foreground-secondary">{tx.s}</p></div>
                  <span className={`text-[13px] font-semibold tabular-nums shrink-0 ${tx.p ? "text-success" : ""}`}>{tx.a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
          <div className="flex items-center justify-around pt-[6px] pb-[26px]">
            {["Trang chủ", "Thanh toán", "QR", "Tài chính", "Tài khoản"].map((t, i) => t === "QR" ? (
              <div key={i} className="w-[52px] h-[52px] rounded-full bg-foreground flex items-center justify-center -mt-[18px]"><QrCode size={24} className="text-background" /></div>
            ) : (
              <div key={i} className="flex flex-col items-center gap-[3px]">
                <div className={`w-[22px] h-[22px] rounded-[6px] ${i === 3 ? "bg-foreground" : "bg-foreground/15"}`} />
                <span className={`text-[10px] font-medium ${i === 3 ? "text-foreground" : "text-foreground-secondary"}`}>{t}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center pb-[4px] -mt-[6px]"><div className="w-[139px] h-[5px] rounded-full bg-foreground" /></div>
        </div>
      </div>
    </div>
  )
}
