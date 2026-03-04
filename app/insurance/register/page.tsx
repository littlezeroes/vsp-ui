"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, User } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import { TextField } from "@/components/ui/text-field"
import {
  DEFAULT_FORM,
  DURATION_FEES,
  SELF_OWNER,
  STORAGE_KEY,
  formatCurrency,
  type InsuranceFormData,
} from "../types"

const DURATION_OPTIONS = [
  { years: 1 as const, label: "1 năm" },
  { years: 2 as const, label: "2 năm" },
  { years: 3 as const, label: "3 năm" },
]

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = React.useState<InsuranceFormData>(() => {
    if (typeof window === "undefined") return DEFAULT_FORM
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : DEFAULT_FORM
    } catch {
      return DEFAULT_FORM
    }
  })

  const [errors, setErrors] = React.useState<Partial<Record<keyof InsuranceFormData, string>>>({})

  function set<K extends keyof InsuranceFormData>(key: K, value: InsuranceFormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const e: typeof errors = {}
    if (!form.plateNumber.trim()) e.plateNumber = "Vui lòng nhập biển số"
    if (!form.chassisNumber.trim()) e.chassisNumber = "Vui lòng nhập số khung"
    if (!form.engineNumber.trim()) e.engineNumber = "Vui lòng nhập số máy"
    if (form.ownerType === "other") {
      if (!form.ownerName.trim()) e.ownerName = "Vui lòng nhập họ tên"
      if (!form.ownerDob.trim()) e.ownerDob = "Vui lòng nhập ngày sinh"
      if (!form.ownerCccd.trim()) e.ownerCccd = "Vui lòng nhập CCCD"
      if (!form.ownerPhone.trim()) e.ownerPhone = "Vui lòng nhập số điện thoại"
      if (!form.ownerProvince.trim()) e.ownerProvince = "Vui lòng nhập tỉnh/thành phố"
      if (!form.ownerDistrict.trim()) e.ownerDistrict = "Vui lòng nhập quận/huyện"
      if (!form.ownerWard.trim()) e.ownerWard = "Vui lòng nhập phường/xã"
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleContinue() {
    if (!validate()) return
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    router.push("/insurance/review")
  }

  const fee = DURATION_FEES[form.duration]
  const isSelf = form.ownerType === "self"

  const endDate = React.useMemo(() => {
    const [d, m, y] = form.startDate.split("/").map(Number)
    if (!d || !m || !y) return ""
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y + form.duration}`
  }, [form.startDate, form.duration])

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ────────────────────────────────────────────────── */}
        <Header
          variant="default"
          title="TNDS Xe máy"
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

        {/* ── Scroll area ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[100px]">
          <div className="pt-[32px]">
            <SectionTitle title="Đăng ký" />
            <div className="px-[22px] space-y-[24px]">

              {/* ── Thông tin người mua ───────────────────────────────── */}
              <div className="space-y-3">
                <GroupLabel>Thông tin người mua</GroupLabel>

                {/* Pill toggle: Tôi / Người khác */}
                <div className="flex bg-secondary rounded-full p-[4px] gap-[4px]">
                  <PillTab
                    active={isSelf}
                    onClick={() => set("ownerType", "self")}
                  >
                    Tôi
                  </PillTab>
                  <PillTab
                    active={!isSelf}
                    onClick={() => set("ownerType", "other")}
                  >
                    Người khác
                  </PillTab>
                </div>

                {/* Tôi — info card */}
                {isSelf && (
                  <div className="flex items-center gap-3 bg-secondary rounded-[20px] px-[16px] py-[14px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-background flex items-center justify-center shrink-0">
                      <User size={18} className="text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md font-semibold text-foreground">{SELF_OWNER.name}</p>
                      <p className="text-sm text-foreground-secondary">
                        {SELF_OWNER.district}, {SELF_OWNER.province}
                      </p>
                    </div>
                  </div>
                )}

                {/* Người khác — inline fields */}
                {!isSelf && (
                  <div className="space-y-3">
                    <TextField label="Họ và tên" placeholder="Nguyễn Văn B" value={form.ownerName} onChange={e => set("ownerName", e.target.value)} error={errors.ownerName} />
                    <TextField label="Ngày sinh" placeholder="DD/MM/YYYY" value={form.ownerDob} onChange={e => set("ownerDob", e.target.value)} error={errors.ownerDob} />
                    <TextField label="CCCD / CMT" placeholder="012345678901" value={form.ownerCccd} onChange={e => set("ownerCccd", e.target.value)} error={errors.ownerCccd} inputMode="numeric" />
                    <TextField label="Số điện thoại" placeholder="0901234567" value={form.ownerPhone} onChange={e => set("ownerPhone", e.target.value)} error={errors.ownerPhone} inputMode="tel" />
                    <TextField label="Tỉnh / Thành phố" placeholder="TP. Hồ Chí Minh" value={form.ownerProvince} onChange={e => set("ownerProvince", e.target.value)} error={errors.ownerProvince} />
                    <TextField label="Quận / Huyện" placeholder="Quận 1" value={form.ownerDistrict} onChange={e => set("ownerDistrict", e.target.value)} error={errors.ownerDistrict} />
                    <TextField label="Phường / Xã" placeholder="Phường Bến Nghé" value={form.ownerWard} onChange={e => set("ownerWard", e.target.value)} error={errors.ownerWard} />
                  </div>
                )}
              </div>

              {/* ── Thông tin xe ──────────────────────────────────────── */}
              <div className="space-y-3">
                <GroupLabel>Thông tin xe</GroupLabel>
                <TextField
                  label="Biển số"
                  placeholder="29A-12345"
                  value={form.plateNumber}
                  onChange={e => set("plateNumber", e.target.value)}
                  error={errors.plateNumber}
                  autoCapitalize="characters"
                />
                <TextField
                  label="Số khung"
                  placeholder="VN1234567890"
                  value={form.chassisNumber}
                  onChange={e => set("chassisNumber", e.target.value)}
                  error={errors.chassisNumber}
                  autoCapitalize="characters"
                />
                <TextField
                  label="Số máy"
                  placeholder="MX9876543"
                  value={form.engineNumber}
                  onChange={e => set("engineNumber", e.target.value)}
                  error={errors.engineNumber}
                  autoCapitalize="characters"
                />
              </div>

              {/* ── Thời hạn mua ──────────────────────────────────────── */}
              <div className="space-y-3">
                <GroupLabel>Thời hạn mua</GroupLabel>
                <TextField
                  label="Từ ngày"
                  placeholder="DD/MM/YYYY"
                  value={form.startDate}
                  onChange={e => set("startDate", e.target.value)}
                />

                <div className="flex gap-2">
                  {DURATION_OPTIONS.map(opt => (
                    <button
                      key={opt.years}
                      type="button"
                      onClick={() => set("duration", opt.years)}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-[4px] rounded-[14px] py-[12px] border-2 transition-colors focus-visible:outline-none",
                        form.duration === opt.years
                          ? "border-foreground bg-foreground"
                          : "border-border bg-background"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-semibold",
                        form.duration === opt.years ? "text-background" : "text-foreground"
                      )}>
                        {opt.label}
                      </span>
                      <span className={cn(
                        "text-xs",
                        form.duration === opt.years ? "text-background/70" : "text-foreground-secondary"
                      )}>
                        {formatCurrency(DURATION_FEES[opt.years])}
                      </span>
                    </button>
                  ))}
                </div>

                {endDate && (
                  <div className="flex items-center justify-between px-[2px]">
                    <span className="text-sm text-foreground-secondary">Đến ngày</span>
                    <span className="text-sm font-semibold text-foreground">{endDate}</span>
                  </div>
                )}
              </div>

              {/* ── Phí tổng ──────────────────────────────────────────── */}
              <div className="flex items-center justify-between bg-secondary rounded-[14px] px-[16px] py-[12px]">
                <span className="text-sm text-foreground-secondary">Phí bảo hiểm</span>
                <span className="text-md font-bold text-foreground">{formatCurrency(fee)}</span>
              </div>

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

/* ── PillTab ──────────────────────────────────────────────────────────── */
function PillTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 h-[36px] rounded-full text-sm font-semibold transition-colors focus-visible:outline-none",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-foreground-secondary"
      )}
    >
      {children}
    </button>
  )
}

/* ── GroupLabel ───────────────────────────────────────────────────────── */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest">
      {children}
    </p>
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
