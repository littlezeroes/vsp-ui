"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Building2,
  ChevronRight,
  Eye,
  EyeOff,
  QrCode,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react"

/*
 * VSP Home v2 — Revolut Financial OS
 * Post-research update:
 * - Balance as HERO (centered, 40px) — Revolut pattern
 * - Account pill below balance — Revolut pattern
 * - Quick actions = 4 circles (56px) — Revolut pattern
 * - Product cards below — NOT service grid
 * - Recent transactions at bottom
 */

export default function HomeV2Wireframe() {
  const [balanceHidden, setBalanceHidden] = React.useState(false)

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Status bar ───────────────────────────────────── */}
        <div className="h-[44px] flex items-center justify-between px-[22px]">
          <span className="text-xs font-semibold text-foreground">12:39</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-foreground rounded-sm opacity-60" />
            <span className="text-[10px] font-semibold text-foreground opacity-60">4G</span>
            <div className="w-6 h-3 bg-foreground rounded-sm opacity-60" />
          </div>
        </div>

        {/* ── Top bar (Revolut: avatar left, actions right) ── */}
        <div className="flex items-center justify-between px-[22px] py-[6px]">
          <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center">
            <span className="text-sm font-bold text-foreground">H</span>
          </div>
          <div className="flex items-center gap-[2px]">
            <button type="button" className="flex items-center justify-center w-[40px] h-[40px] rounded-full">
              <Eye size={20} className="text-foreground" />
            </button>
            <button type="button" className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full">
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-[4px] right-[4px] w-[16px] h-[16px] rounded-full bg-destructive flex items-center justify-center text-[9px] font-bold text-white">
                3
              </span>
            </button>
          </div>
        </div>

        {/* ── Scrollable content ───────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[100px]">

          {/* ══ BALANCE HERO (Revolut pattern) ═══════════════ */}
          <div className="flex flex-col items-center pt-[24px] pb-[8px] px-[22px]">
            {/* Account label — Revolut: "Personal · VND" */}
            <p className="text-[12px] font-medium text-foreground-secondary tracking-widest uppercase mb-[8px]">
              Ví chính · VND
            </p>

            {/* Balance — Revolut: 40px bold centered */}
            <button
              type="button"
              onClick={() => setBalanceHidden(v => !v)}
              className="flex items-center gap-[8px] focus-visible:outline-none"
              aria-label={balanceHidden ? "Hiện số dư" : "Ẩn số dư"}
            >
              <span className="text-[40px] font-bold leading-none text-foreground tabular-nums">
                {balanceHidden ? "••••••••" : "14.328"}
              </span>
              <span className="text-[24px] font-bold text-foreground-secondary">đ</span>
            </button>

            {/* Sinh lời sub-balance */}
            <p className="text-[13px] text-foreground-secondary mt-[6px]">
              Sinh lời: <span className="text-success font-semibold">{balanceHidden ? "••••" : "+12.500đ"}</span>
            </p>

            {/* Account pill — Revolut pattern */}
            <button
              type="button"
              className="mt-[12px] bg-secondary rounded-full px-[16px] py-[8px] text-[13px] font-semibold text-foreground"
            >
              Tài khoản
            </button>
          </div>

          {/* ══ QUICK ACTIONS — 4 circles (Revolut: 56px) ═══ */}
          <div className="flex justify-between px-[36px] pt-[20px] pb-[8px]">
            {[
              { icon: <ArrowDownLeft size={22} />, label: "Nạp tiền" },
              { icon: <ArrowUpRight size={22} />, label: "Chuyển" },
              { icon: <Receipt size={22} />, label: "Thanh toán" },
              { icon: <QrCode size={22} />, label: "QR" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex flex-col items-center gap-[6px]"
              >
                <div className="w-[56px] h-[56px] rounded-full bg-secondary flex items-center justify-center text-foreground">
                  {icon}
                </div>
                <span className="text-[11px] font-medium text-foreground-secondary">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* ══ PRODUCT CARDS (Revolut: cards not grid) ══════ */}

          {/* ── Sinh lời — Primary product card ──────────── */}
          <div className="px-[22px] pt-[32px]">
            <div className="rounded-[28px] overflow-hidden" style={{
              background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)",
            }}>
              <div className="p-[20px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[44px] h-[44px] rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <TrendingUp size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white/60">Sinh lời tự động</p>
                    <p className="text-[22px] font-bold text-white tabular-nums leading-tight">
                      {balanceHidden ? "••••••" : "5.000.000"} <span className="text-[14px]">đ</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-semibold text-emerald-300">{balanceHidden ? "••••" : "+12.500đ"}</p>
                    <p className="text-[11px] text-white/50">5.5%/năm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sinh lời — Chưa kích hoạt (variant) ──────── */}
          <div className="px-[22px] pt-[12px]">
            <p className="text-[10px] font-medium text-foreground-secondary italic mb-[6px] px-[4px]">* Variant: chưa kích hoạt</p>
            <div className="rounded-[28px] bg-secondary p-[20px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <TrendingUp size={22} className="text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-foreground">Sinh lời tự động</p>
                  <p className="text-[13px] text-foreground-secondary">Lãi suất lên đến <span className="text-success font-semibold">5.5%</span>/năm</p>
                </div>
                <ChevronRight size={20} className="text-foreground-secondary shrink-0" />
              </div>
            </div>
          </div>

          {/* ── Đầu tư BĐS — Promo card (Revolut: promotional card on Home) */}
          <div className="px-[22px] pt-[24px]">
            <div className="rounded-[28px] overflow-hidden" style={{
              background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
            }}>
              <div className="p-[20px]">
                <div className="flex items-center gap-[12px]">
                  <div className="w-[44px] h-[44px] rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Building2 size={22} className="text-blue-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-white">Đầu tư BĐS mã hoá</p>
                    <p className="text-[13px] text-white/60">Sở hữu BĐS từ 1 triệu đồng</p>
                  </div>
                  <ChevronRight size={20} className="text-white/40 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* ══ RECENT TRANSACTIONS ══════════════════════════ */}
          <div className="pt-[32px]">
            <div className="flex items-center justify-between px-[22px] mb-[4px]">
              <p className="text-[15px] font-semibold text-foreground">Giao dịch gần đây</p>
              <button type="button" className="text-[13px] font-semibold text-success">
                Xem tất cả
              </button>
            </div>

            <div className="px-[22px]">
              {[
                { icon: <ArrowUpRight size={16} />, title: "CONG TY CO PHAN NAM MUOI NAM MUOI", time: "13:22 · Hôm nay", amount: "-38.000đ" },
                { icon: <ArrowUpRight size={16} />, title: "HO THI MY MY", time: "12:51 · Hôm nay", amount: "-100.000đ" },
                { icon: <ArrowDownLeft size={16} />, title: "Nạp tiền từ Techcombank", time: "10:30 · Hôm qua", amount: "+500.000đ", isPositive: true },
              ].map((tx, i) => (
                <div key={i} className="flex items-center gap-[12px] py-[12px] border-b border-border last:border-b-0">
                  <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-foreground-secondary">{tx.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{tx.title}</p>
                    <p className="text-[11px] text-foreground-secondary">{tx.time}</p>
                  </div>
                  <span className={`text-[13px] font-semibold tabular-nums shrink-0 ${tx.isPositive ? "text-success" : "text-foreground"}`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[32px]" />
        </div>

        {/* ── Bottom Nav ───────────────────────────────────── */}
        <BottomNav active="home" />

      </div>
    </div>
  )
}

/* ── Bottom Nav ────────────────────────────────────────────── */
function BottomNav({ active }: { active: string }) {
  const tabs = [
    { href: "/architecture/home", value: "home", label: "Trang chủ", icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    )},
    { href: "/architecture/taichinh", value: "taichinh", label: "Tài chính", icon: <TrendingUp size={22} /> },
    { href: "#", value: "qr", label: "", isCenter: true, icon: <QrCode size={24} /> },
    { href: "#", value: "giaodich", label: "Giao dịch", icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    )},
    { href: "#", value: "taikhoan", label: "Tài khoản", icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )},
  ]

  return (
    <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border">
      <div className="flex items-center justify-around pt-[6px] pb-[26px]">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.href}
            className="flex flex-col items-center gap-[3px]"
          >
            {tab.isCenter ? (
              <div className="w-[52px] h-[52px] rounded-full bg-foreground flex items-center justify-center -mt-[18px]">
                <span className="text-background">{tab.icon}</span>
              </div>
            ) : (
              <>
                <span className={active === tab.value ? "text-foreground" : "text-foreground-secondary"}>
                  {tab.icon}
                </span>
                <span className={`text-[10px] font-medium ${active === tab.value ? "text-foreground" : "text-foreground-secondary"}`}>
                  {tab.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>
      <div className="flex justify-center pb-[4px] -mt-[6px]">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
