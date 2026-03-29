"use client"

import Link from "next/link"
import {
  Building2,
  Home,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

/*
 * VSP Architecture 2026 — Wireframe Index
 * Financial OS approach (Revolut-style)
 */

export default function ArchitectureIndex() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ───────────────────────────────────── */}
        <div className="px-[22px] pt-[60px] pb-[8px]">
          <p className="text-[11px] font-bold text-success uppercase tracking-wider mb-[4px]">
            Architecture 2026
          </p>
          <h1 className="text-[24px] font-bold leading-8 tracking-[-0.25px] text-foreground">
            Wireframes 30/4
          </h1>
          <p className="text-[14px] text-foreground-secondary mt-[8px]">
            Financial OS — Revolut-style. Products as cards, không service grid.
          </p>
        </div>

        {/* ── Cards ────────────────────────────────────── */}
        <div className="flex-1 px-[22px] pt-[32px] space-y-[16px]">

          {/* 5 Options */}
          <Link href="/architecture/options">
            <div className="rounded-[28px] bg-foreground p-[20px] active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-[14px]">
                <div className="w-[48px] h-[48px] rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="text-[20px]">⚡</span>
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-semibold text-background">5 Options — Chọn hướng</p>
                  <p className="text-[13px] text-background/60 mt-[2px]">
                    Revolut · Monzo · ZaloPay · Cash App · Hybrid
                  </p>
                </div>
                <ArrowRight size={20} className="text-background/40 shrink-0" />
              </div>
            </div>
          </Link>

          {/* Home v2 */}
          <Link href="/architecture/home">
            <div className="rounded-[28px] bg-secondary p-[20px] active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-[14px]">
                <div className="w-[48px] h-[48px] rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <Home size={24} className="text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-semibold text-foreground">Home v2</p>
                  <p className="text-[13px] text-foreground-secondary mt-[2px]">
                    Wallet + Quick actions + Product cards + GD gần đây
                  </p>
                </div>
                <ArrowRight size={20} className="text-foreground-secondary shrink-0" />
              </div>
              <div className="flex gap-[6px] mt-[12px] flex-wrap">
                <span className="text-[10px] font-semibold bg-success/10 text-success rounded-full px-[8px] py-[3px]">Redesign</span>
                <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-500 rounded-full px-[8px] py-[3px]">+Sinh lời</span>
                <span className="text-[10px] font-semibold bg-purple-500/10 text-purple-500 rounded-full px-[8px] py-[3px]">+BĐS banner</span>
              </div>
            </div>
          </Link>

          {/* Tab Tài chính */}
          <Link href="/architecture/taichinh">
            <div className="rounded-[28px] bg-secondary p-[20px] active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-[14px]">
                <div className="w-[48px] h-[48px] rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <TrendingUp size={24} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-semibold text-foreground">Tab Tài chính</p>
                  <p className="text-[13px] text-foreground-secondary mt-[2px]">
                    Tổng tài sản + Sinh lời + Đầu tư + BNPL + Bảo hiểm
                  </p>
                </div>
                <ArrowRight size={20} className="text-foreground-secondary shrink-0" />
              </div>
              <div className="flex gap-[6px] mt-[12px] flex-wrap">
                <span className="text-[10px] font-semibold bg-red-500/10 text-red-500 rounded-full px-[8px] py-[3px]">New Tab</span>
                <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-500 rounded-full px-[8px] py-[3px]">Thay Chuyển tiền</span>
                <span className="text-[10px] font-semibold bg-success/10 text-success rounded-full px-[8px] py-[3px]">4 product lines</span>
              </div>
            </div>
          </Link>

          {/* Bottom Nav comparison */}
          <div className="rounded-[28px] bg-secondary p-[20px]">
            <p className="text-[14px] font-semibold text-foreground mb-[12px]">Bottom Nav — Before / After</p>

            <div className="space-y-[12px]">
              <div>
                <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-wider mb-[6px]">V1.0.6 (hiện tại)</p>
                <div className="flex items-center justify-between bg-background rounded-[16px] px-[12px] py-[10px]">
                  {["Trang chủ", "Chuyển tiền", "QR", "Giao dịch", "Tài khoản"].map((t) => (
                    <span key={t} className={`text-[10px] font-medium ${t === "Chuyển tiền" ? "text-red-500 line-through" : "text-foreground-secondary"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-success uppercase tracking-wider mb-[6px]">V2.0 (30/4)</p>
                <div className="flex items-center justify-between bg-background rounded-[16px] px-[12px] py-[10px]">
                  {["Trang chủ", "Tài chính", "QR", "Giao dịch", "Tài khoản"].map((t) => (
                    <span key={t} className={`text-[10px] font-medium ${t === "Tài chính" ? "text-success font-bold" : "text-foreground-secondary"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="rounded-[28px] bg-secondary p-[20px]">
            <p className="text-[14px] font-semibold text-foreground mb-[12px]">Target 30/4</p>
            <div className="grid grid-cols-2 gap-[12px]">
              <div className="bg-background rounded-[16px] p-[14px] text-center">
                <p className="text-[24px] font-bold text-success">78%</p>
                <p className="text-[10px] text-foreground-secondary mt-[2px]">Parity vs MoMo</p>
              </div>
              <div className="bg-background rounded-[16px] p-[14px] text-center">
                <p className="text-[24px] font-bold text-foreground">4</p>
                <p className="text-[10px] text-foreground-secondary mt-[2px]">Product lines ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Home indicator ───────────────────────────── */}
        <div className="h-[21px] flex items-end justify-center pb-[4px]">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

      </div>
    </div>
  )
}
