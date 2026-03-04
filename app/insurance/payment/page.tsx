"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import {
  DEFAULT_FORM,
  DURATION_FEES,
  SELF_OWNER,
  STORAGE_KEY,
  formatCurrency,
  type InsuranceFormData,
} from "../types"

export default function PaymentPage() {
  const router = useRouter()
  const [form, setForm] = React.useState<InsuranceFormData>(DEFAULT_FORM)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) setForm(JSON.parse(saved))
    } catch {}
  }, [])

  const fee = DURATION_FEES[form.duration]
  const isSelf = form.ownerType === "self"
  const ownerName = isSelf ? SELF_OWNER.name : form.ownerName

  const endDate = (() => {
    const [d, m, y] = form.startDate.split("/").map(Number)
    if (!d || !m || !y) return ""
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y + form.duration}`
  })()

  function handleConfirm() {
    setIsLoading(true)
    setTimeout(() => {
      sessionStorage.removeItem(STORAGE_KEY)
      router.push("/insurance/success")
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ────────────────────────────────────────────────── */}
        <Header
          variant="default"
          title="Thanh toán"
          showStatusBar={false}
          leading={
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center justify-center pl-[8px] pr-[10px] py-[10px] min-h-[44px] rounded-full text-foreground focus-visible:outline-none"
              aria-label="Quay lại"
            >
              <ChevronLeft size={18} />
            </button>
          }
        />

        {/* ── Scroll area ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[120px]">

          {/* ── Nguồn tiền ───────────────────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionTitle title="Nguồn tiền" />
            <div className="px-[22px]">
              <div className="flex items-center gap-3 border-2 border-foreground rounded-[28px] px-[16px] py-[14px] bg-background">
                <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                </div>
                <div className="w-[40px] h-[40px] rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Wallet size={20} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-md font-semibold text-foreground">Ví V-Pay</p>
                  <p className="text-sm text-foreground-secondary">Số dư: 1,250,000 đ</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Chi tiết đơn hàng ────────────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionTitle title="Chi tiết" />
            <div className="px-[22px] space-y-[2px]">
              <Row label="Sản phẩm" value="TNDS Xe máy" />
              <Row label="Biển số" value={form.plateNumber || "—"} />
              <Row label="Chủ xe" value={ownerName || "—"} />
              <Row label="Hiệu lực" value={form.startDate} />
              <Row label="Hết hạn" value={endDate} />
            </div>
          </div>

          {/* ── Tổng phí ─────────────────────────────────────────────── */}
          <div className="pt-[24px] px-[22px]">
            <div className="flex items-center justify-between bg-secondary rounded-[14px] px-[16px] py-[14px]">
              <span className="text-md font-semibold text-foreground">Phí bảo hiểm</span>
              <span className="text-md font-bold text-foreground">{formatCurrency(fee)}</span>
            </div>
          </div>

        </div>

        {/* ── Fixed CTAs ────────────────────────────────────────────── */}
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-3 space-y-3 bg-background">
          <Button
            variant="primary"
            size="48"
            className="w-full"
            isLoading={isLoading}
            onClick={handleConfirm}
          >
            Xác nhận thanh toán
          </Button>
          <Button
            variant="secondary"
            size="48"
            className="w-full"
            disabled={isLoading}
            onClick={() => router.back()}
          >
            Quay lại
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
      <span className="w-[120px] shrink-0 text-sm text-foreground-secondary">{label}</span>
      <span className="flex-1 text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  )
}
