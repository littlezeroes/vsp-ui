"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ShieldCheck,
  TrendingUp,
  Unlock,
  Camera,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"

/* ── Static data ────────────────────────────────────────────────────── */

const STEPS = [
  { label: "Chụp CCCD mặt trước", time: "~1 phút" },
  { label: "Chụp CCCD mặt sau",   time: "~1 phút" },
  { label: "Selfie xác nhận",      time: "~30 giây" },
]

const BENEFITS = [
  {
    icon: <Unlock size={16} className="text-success" />,
    title: "Đầu tư không giới hạn số tiền",
    sub:   "Sở hữu nhiều token theo nhu cầu, từ 5 triệu đồng",
  },
  {
    icon: <TrendingUp size={16} className="text-success" />,
    title: "Nhận lợi nhuận & rút token dễ dàng",
    sub:   "Lợi nhuận thuê nhà về ví hàng quý, bán token khi muốn",
  },
  {
    icon: <ShieldCheck size={16} className="text-success" />,
    title: "Quyền lợi được bảo vệ pháp lý",
    sub:   "Token ghi nhận trên blockchain, được pháp lý VN bảo vệ",
  },
]

const AVATAR_COLORS = ["bg-indigo-500", "bg-cyan-600", "bg-emerald-600", "bg-amber-500"]
const AVATAR_LABELS = ["N", "T", "M", "H"]

/* ── Page ───────────────────────────────────────────────────────────── */

export default function KycGatePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ──────────────────────────────────────────────── */}
        <Header
          variant="default"
          title="Mở khóa đầu tư"
          showStatusBar={false}
          leading={
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center justify-center pl-[8px] pr-[10px] py-[10px] min-h-[44px] rounded-full text-foreground focus-visible:outline-none"
            >
              <ChevronLeft size={18} />
            </button>
          }
        />

        {/* ── Scrollable content ──────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[120px]">

          {/* ── Intent banner ─────────────────────────────────────── */}
          <div className="px-[22px] pt-[16px]">
            <div className="bg-blue-50 rounded-[14px] px-[14px] py-[12px]">
              <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[4px]">
                Dự án bạn quan tâm
              </p>
              <p className="text-sm font-bold text-foreground">
                Landmark 81 · Giai đoạn 1
              </p>
            </div>
          </div>

          {/* ── Hero ──────────────────────────────────────────────── */}
          <div className="pt-[20px] px-[22px]">
            <h1 className="text-xl font-bold leading-8 tracking-[-0.016em] text-foreground mb-[6px]">
              Còn 1 bước để bắt đầu đầu tư
            </h1>
            <p className="text-sm font-normal leading-5 text-foreground-secondary">
              Xác minh danh tính để mở khóa toàn bộ tính năng POLARIS —{" "}
              chỉ mất <span className="font-semibold text-foreground">5 phút</span>.
            </p>
          </div>

          {/* ── Step preview ──────────────────────────────────────── */}
          <div className="pt-[20px] px-[22px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[16px]">
              <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[12px]">
                3 bước đơn giản
              </p>
              <div className="space-y-0">
                {STEPS.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-[10px] ${
                      i < STEPS.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    {/* Step number pill */}
                    <div className="w-[28px] h-[28px] rounded-full bg-background flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-success">{i + 1}</span>
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {step.label}
                    </span>
                    <span className="text-xs text-foreground-secondary shrink-0">
                      {step.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Benefits ──────────────────────────────────────────── */}
          <div className="pt-[12px] px-[22px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[16px]">
              <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[12px]">
                Sau khi xác minh, bạn được
              </p>
              <div className="space-y-0">
                {BENEFITS.map((b, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-[10px] ${
                      i < BENEFITS.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-[32px] h-[32px] rounded-[8px] bg-background flex items-center justify-center shrink-0 mt-[1px]">
                      {b.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-5">
                        {b.title}
                      </p>
                      <p className="text-xs text-foreground-secondary leading-5 mt-[2px]">
                        {b.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Social proof ──────────────────────────────────────── */}
          <div className="pt-[16px] px-[22px] flex items-center justify-center gap-[10px]">
            {/* Avatar stack */}
            <div className="flex">
              {AVATAR_LABELS.map((label, i) => (
                <div
                  key={i}
                  className={`w-[22px] h-[22px] rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold text-white ${AVATAR_COLORS[i]} ${
                    i > 0 ? "-ml-[6px]" : ""
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
            <p className="text-xs text-foreground-secondary">
              <span className="font-semibold text-foreground">1,247 nhà đầu tư</span>{" "}
              đã xác minh thành công
            </p>
          </div>

        </div>

        {/* ── Fixed bottom area ───────────────────────────────────── */}
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] flex flex-col gap-[8px] pb-3 bg-background">

          {/* Primary CTA */}
          <Button variant="primary" size="48" className="w-full">
            <Camera size={18} />
            Bắt đầu xác minh · 5 phút
          </Button>

          {/* Security micro-copy */}
          <div className="flex items-center justify-center gap-[6px]">
            <ShieldCheck size={12} className="text-success shrink-0" />
            <p className="text-xs text-foreground-secondary text-center">
              Bảo mật bởi VPay · 85% duyệt tự động trong 30 giây
            </p>
          </div>

          {/* Skip — low-weight text link, not a button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs text-foreground-secondary text-center py-[4px] focus-visible:outline-none focus-visible:underline"
          >
            Xem dự án trước, xác minh sau
          </button>

        </div>

        {/* ── Home indicator ──────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

      </div>
    </div>
  )
}
