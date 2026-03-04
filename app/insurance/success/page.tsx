"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import { FeedbackState } from "@/components/ui/feedback-state"

/* Mock contract code */
const CONTRACT_CODE = "BH2026-" + Math.floor(100000 + Math.random() * 900000)

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ────────────────────────────────────────────────── */}
        <Header
          variant="default"
          title="Kết quả"
          showStatusBar={false}
        />

        {/* ── Content ───────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[120px]">

          {/* FeedbackState */}
          <div className="pt-[32px]">
            <FeedbackState
              icon={<CheckCircle2 size={64} className="text-success" />}
              title="Mua thành công"
              description="Giấy chứng nhận bảo hiểm đã được cấp và gửi về email của bạn."
            />
          </div>

          {/* Contract summary */}
          <div className="pt-[32px]">
            <SectionTitle title="Thông tin hợp đồng" />
            <div className="px-[22px] space-y-[2px]">
              <Row label="Mã hợp đồng" value={CONTRACT_CODE} />
              <Row label="Sản phẩm" value="TNDS Xe máy" />
              <Row label="Hiệu lực" value="01/03/2026" />
              <Row label="Hết hạn" value="01/03/2027" />
              <Row label="Phí đã thanh toán" value="180,000 đ" />
            </div>
          </div>

        </div>

        {/* ── Fixed CTAs ────────────────────────────────────────────── */}
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-3 space-y-3 bg-background">
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() => {}}
          >
            Xem giấy chứng nhận
          </Button>
          <Button
            variant="secondary"
            size="48"
            className="w-full"
            onClick={() => router.push("/insurance")}
          >
            Về trang chủ bảo hiểm
          </Button>
        </div>

        {/* ── Home indicator ────────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

      </div>
    </div>
  )
}

/* ── SectionTitle ─────────────────────────────────────────────────────── */
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="px-[22px] pb-[12px]">
      <p className="text-md font-semibold leading-6 text-foreground">{title}</p>
    </div>
  )
}

/* ── Row ──────────────────────────────────────────────────────────────── */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center py-[10px] border-b border-border last:border-0">
      <span className="w-[140px] shrink-0 text-sm text-foreground-secondary">{label}</span>
      <span className="flex-1 text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  )
}
