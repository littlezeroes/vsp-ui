"use client"

import * as React from "react"
import Link from "next/link"
import {
  Building2,
  ChevronRight,
  Eye,
  EyeOff,
  QrCode,
  TrendingUp,
  Wallet,
} from "lucide-react"

/*
 * VSP Tab Tài chính — Revolut Wealth Tab Style
 * Post-research: Portfolio view with chart + breakdown
 * NOT just stacked cards — Revolut treats Wealth as a dashboard
 */

export default function TaiChinhWireframe() {
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

        {/* ── NavBar ───────────────────────────────────────── */}
        <div className="px-[22px] pb-[4px]">
          <h1 className="text-[24px] font-bold leading-8 tracking-[-0.25px] text-foreground">
            Tài chính
          </h1>
        </div>

        {/* ── Scrollable content ───────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[100px]">

          {/* ══ PORTFOLIO HERO (Revolut Wealth style) ════════ */}
          <div className="flex flex-col items-center pt-[20px] pb-[4px] px-[22px]">
            {/* Total label */}
            <div className="flex items-center gap-[6px] mb-[6px]">
              <span className="text-[12px] font-medium text-foreground-secondary tracking-wider uppercase">Tổng tài sản</span>
              <button
                type="button"
                onClick={() => setBalanceHidden(v => !v)}
                className="text-foreground-secondary"
              >
                {balanceHidden ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {/* Total balance — centered hero */}
            <p className="text-[36px] font-bold text-foreground tabular-nums leading-none">
              {balanceHidden ? "••••••••" : "5.014.328"} <span className="text-[20px] text-foreground-secondary">đ</span>
            </p>

            {/* Change indicator */}
            <div className="flex items-center gap-[4px] mt-[8px]">
              <TrendingUp size={14} className="text-success" />
              <span className="text-[13px] font-semibold text-success">+12.500đ</span>
              <span className="text-[12px] text-foreground-secondary">tháng này</span>
            </div>
          </div>

          {/* ── Mini chart placeholder (Revolut: sparkline) ── */}
          <div className="px-[22px] pt-[16px]">
            <div className="h-[100px] rounded-[20px] bg-secondary flex items-end justify-between px-[16px] pb-[12px] pt-[12px] overflow-hidden relative">
              {/* Fake sparkline chart */}
              <svg viewBox="0 0 300 60" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(0,177,130)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="rgb(0,177,130)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,50 L30,45 L60,48 L90,35 L120,38 L150,25 L180,28 L210,15 L240,18 L270,10 L300,8" fill="none" stroke="rgb(0,177,130)" strokeWidth="2" />
                <path d="M0,50 L30,45 L60,48 L90,35 L120,38 L150,25 L180,28 L210,15 L240,18 L270,10 L300,8 L300,60 L0,60Z" fill="url(#chartGrad)" />
              </svg>
              {/* Time labels */}
              <span className="text-[10px] text-foreground-secondary relative z-10">T1</span>
              <span className="text-[10px] text-foreground-secondary relative z-10">T2</span>
              <span className="text-[10px] text-foreground-secondary relative z-10">T3</span>
              <span className="text-[10px] text-foreground-secondary relative z-10">T4</span>
              <span className="text-[10px] font-semibold text-foreground relative z-10">Nay</span>
            </div>
          </div>

          {/* ── Breakdown pills (Revolut: asset allocation) ── */}
          <div className="px-[22px] pt-[16px]">
            <div className="flex gap-[8px]">
              <div className="flex-1 rounded-[16px] bg-secondary p-[14px]">
                <div className="flex items-center gap-[6px] mb-[6px]">
                  <Wallet size={14} className="text-foreground-secondary" />
                  <span className="text-[11px] text-foreground-secondary">Ví</span>
                </div>
                <p className="text-[16px] font-bold text-foreground tabular-nums">
                  {balanceHidden ? "••••" : "14.328đ"}
                </p>
              </div>
              <div className="flex-1 rounded-[16px] bg-secondary p-[14px]">
                <div className="flex items-center gap-[6px] mb-[6px]">
                  <TrendingUp size={14} className="text-success" />
                  <span className="text-[11px] text-foreground-secondary">Sinh lời</span>
                </div>
                <p className="text-[16px] font-bold text-foreground tabular-nums">
                  {balanceHidden ? "••••" : "5.000.000đ"}
                </p>
              </div>
            </div>
          </div>

          {/* ══ PRODUCTS (Revolut: each product = row card) ══ */}
          <div className="pt-[32px]">
            <div className="flex items-center justify-between px-[22px] mb-[4px]">
              <p className="text-[15px] font-semibold text-foreground">Sản phẩm</p>
            </div>

            {/* Sinh lời tự động */}
            <div className="px-[22px] pt-[8px]">
              <div className="rounded-[28px] overflow-hidden" style={{
                background: "linear-gradient(135deg, #0d3d2e 0%, #1a5c45 40%, #0f4a38 100%)",
              }}>
                <div className="p-[20px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <TrendingUp size={22} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-[6px]">
                        <p className="text-[14px] font-semibold text-white">Sinh lời tự động</p>
                        <div className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <p className="text-[20px] font-bold text-white tabular-nums leading-tight">
                        {balanceHidden ? "••••••" : "5.000.000"} <span className="text-[13px]">đ</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[12px] font-semibold text-emerald-300">{balanceHidden ? "••" : "+12.500đ"}</p>
                      <p className="text-[10px] text-white/50">5.5%/năm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Đầu tư BĐS */}
            <div className="px-[22px] pt-[12px]">
              <div className="rounded-[28px] overflow-hidden" style={{
                background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
              }}>
                <div className="p-[20px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Building2 size={22} className="text-blue-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-white">Đầu tư BĐS mã hoá</p>
                      <p className="text-[12px] text-white/60">Vinhomes Grand Park · từ 1Mđ</p>
                    </div>
                    <ChevronRight size={18} className="text-white/40 shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ ACTIVITY (Revolut Wealth: recent activity) ═══ */}
          <div className="pt-[32px]">
            <div className="flex items-center justify-between px-[22px] mb-[4px]">
              <p className="text-[15px] font-semibold text-foreground">Hoạt động</p>
              <button type="button" className="text-[13px] font-semibold text-success">
                Tất cả
              </button>
            </div>

            <div className="px-[22px]">
              {[
                { title: "Lãi sinh lời tháng 3", time: "21/03/2026", amount: "+4.200đ", isPositive: true },
                { title: "Kích hoạt sinh lời", time: "15/02/2026", amount: "5.000.000đ", isPositive: false },
              ].map((tx, i) => (
                <div key={i} className="flex items-center gap-[12px] py-[12px] border-b border-border last:border-b-0">
                  <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <TrendingUp size={16} className="text-foreground-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground">{tx.title}</p>
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
        <BottomNav active="taichinh" />

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
