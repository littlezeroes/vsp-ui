"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

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

export default function ReviewPage() {
  const router = useRouter()
  const [form, setForm] = React.useState<InsuranceFormData>(DEFAULT_FORM)

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) setForm(JSON.parse(saved))
    } catch {}
  }, [])

  const isSelf = form.ownerType === "self"
  const owner = isSelf
    ? {
        name: SELF_OWNER.name,
        dob: SELF_OWNER.dob,
        cccd: SELF_OWNER.cccd,
        phone: SELF_OWNER.phone,
        address: `${SELF_OWNER.ward}, ${SELF_OWNER.district}, ${SELF_OWNER.province}`,
      }
    : {
        name: form.ownerName,
        dob: form.ownerDob,
        cccd: form.ownerCccd,
        phone: form.ownerPhone,
        address: `${form.ownerWard}, ${form.ownerDistrict}, ${form.ownerProvince}`,
      }

  const endDate = (() => {
    const [d, m, y] = form.startDate.split("/").map(Number)
    if (!d || !m || !y) return ""
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y + form.duration}`
  })()

  function handleEdit() {
    router.push("/insurance/register")
  }

  function handleContinue() {
    router.push("/insurance/payment")
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ────────────────────────────────────────────────── */}
        <Header
          variant="default"
          title="Kiểm tra thông tin"
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
        <div className="flex-1 overflow-y-auto pb-[100px]">

          {/* ── Thông tin xe ─────────────────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionHeader title="Thông tin xe" onEdit={handleEdit} />
            <div className="px-[22px] space-y-[2px]">
              <Row label="Loại xe" value="TNDS Xe máy" />
              <Row label="Biển số" value={form.plateNumber || "—"} />
              <Row label="Số khung" value={form.chassisNumber || "—"} />
              <Row label="Số máy" value={form.engineNumber || "—"} />
            </div>
          </div>

          {/* ── Thông tin chủ xe ─────────────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionHeader title="Thông tin chủ xe" onEdit={handleEdit} />
            <div className="px-[22px] space-y-[2px]">
              <Row label="Họ tên" value={owner.name} />
              <Row label="Ngày sinh" value={owner.dob} />
              <Row label="CCCD" value={owner.cccd} />
              <Row label="Điện thoại" value={owner.phone} />
              <Row label="Địa chỉ" value={owner.address} multiline />
            </div>
          </div>

          {/* ── Thời gian hiệu lực ────────────────────────────────────── */}
          <div className="pt-[32px]">
            <SectionHeader title="Thời gian hiệu lực" onEdit={handleEdit} />
            <div className="px-[22px] space-y-[2px]">
              <Row label="Hiệu lực từ" value={form.startDate} />
              <Row label="Hết hạn" value={endDate} />
              <Row label="Thời hạn" value={`${form.duration} năm`} />
            </div>
          </div>

          {/* ── Phí bảo hiểm ─────────────────────────────────────────── */}
          <div className="pt-[32px] px-[22px]">
            <div className="flex items-center justify-between bg-secondary rounded-[14px] px-[16px] py-[14px]">
              <span className="text-md font-semibold text-foreground">Phí bảo hiểm</span>
              <span className="text-md font-bold text-foreground">
                {formatCurrency(DURATION_FEES[form.duration])}
              </span>
            </div>
          </div>

        </div>

        {/* ── Fixed CTA ─────────────────────────────────────────────── */}
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-3 bg-background">
          <Button variant="primary" size="48" className="w-full" onClick={handleContinue}>
            Tiếp tục
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

/* ── SectionHeader ────────────────────────────────────────────────────── */
function SectionHeader({ title, onEdit }: { title: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between px-[22px] pb-[12px]">
      <p className="text-md font-semibold leading-6 text-foreground">{title}</p>
      <button
        type="button"
        onClick={onEdit}
        className="text-md font-semibold text-success focus-visible:outline-none"
      >
        Sửa
      </button>
    </div>
  )
}

/* ── Row ──────────────────────────────────────────────────────────────── */
function Row({
  label,
  value,
  multiline,
}: {
  label: string
  value: string
  multiline?: boolean
}) {
  return (
    <div className={`flex py-[10px] border-b border-border last:border-0 ${multiline ? "items-start" : "items-center"}`}>
      <span className="w-[120px] shrink-0 text-sm text-foreground-secondary">{label}</span>
      <span className={`flex-1 text-sm font-medium text-foreground text-right ${multiline ? "leading-5" : ""}`}>
        {value || "—"}
      </span>
    </div>
  )
}
