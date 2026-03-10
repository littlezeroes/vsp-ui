"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Home, Zap, GraduationCap, Check } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import {
  PROFILES,
  HOUSING_BILLS,
  BATTERY_BILLS,
  EDUCATION_BILLS,
  formatVND,
  getStatusBadge,
  type ServiceType,
  type HousingBill,
  type BatteryBill,
  type EducationBill,
} from "../data"

/* ── Types ───────────────────────────────────────────────────────────── */
type AnyBill = (HousingBill | BatteryBill | EducationBill) & { _profileLabel: string }

/* ── Helpers ──────────────────────────────────────────────────────────── */
function getServiceConfig(service: ServiceType) {
  switch (service) {
    case "housing":
      return { label: "NHA O", Icon: Home, accent: "bg-info", iconColor: "text-background" }
    case "battery":
      return { label: "PIN VA SAC", Icon: Zap, accent: "bg-warning", iconColor: "text-background" }
    case "education":
      return { label: "GIAO DUC", Icon: GraduationCap, accent: "bg-success", iconColor: "text-background" }
  }
}

function getBillsForProfile(profile: typeof PROFILES[number]): AnyBill[] {
  switch (profile.service) {
    case "housing":
      return HOUSING_BILLS
        .filter((b) => b.apartmentId === profile.refId && b.status !== "paid")
        .map((b) => ({ ...b, _profileLabel: profile.label }))
    case "battery":
      return BATTERY_BILLS
        .filter((b) => b.vehicleId === profile.refId && b.status !== "paid")
        .map((b) => ({ ...b, _profileLabel: profile.label }))
    case "education":
      return EDUCATION_BILLS
        .filter((b) => b.studentId === profile.refId && b.status !== "paid")
        .map((b) => ({ ...b, _profileLabel: profile.label }))
  }
}

/* ── Checkbox ──────────────────────────────────────────────────────── */
function Checkbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      className={`w-[20px] h-[20px] rounded-[4px] border-2 shrink-0 flex items-center justify-center transition-colors ${
        checked
          ? "bg-foreground border-foreground"
          : "bg-transparent border-foreground-secondary"
      }`}
    >
      {checked && <Check size={14} className="text-background" />}
    </button>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function MyBillsPage() {
  const router = useRouter()
  const [selectedBills, setSelectedBills] = React.useState<Set<string>>(new Set())
  const serviceOrder: ServiceType[] = ["housing", "battery", "education"]

  /* Group profiles by service, only those with pending bills */
  const grouped = React.useMemo(() => {
    const map = new Map<ServiceType, { profile: typeof PROFILES[number]; bills: AnyBill[] }[]>()
    for (const svc of serviceOrder) {
      const profiles = PROFILES.filter((p) => p.service === svc)
      const entries = profiles
        .map((p) => ({ profile: p, bills: getBillsForProfile(p) }))
        .filter((e) => e.bills.length > 0)
      if (entries.length > 0) map.set(svc, entries)
    }
    return map
  }, [])

  const toggleBill = (billId: string) => {
    setSelectedBills((prev) => {
      const next = new Set(prev)
      if (next.has(billId)) next.delete(billId)
      else next.add(billId)
      return next
    })
  }

  /* Totals */
  const allBills = React.useMemo(() => {
    const bills: AnyBill[] = []
    grouped.forEach((entries) => entries.forEach((e) => bills.push(...e.bills)))
    return bills
  }, [grouped])

  const selectedTotal = allBills
    .filter((b) => selectedBills.has(b.id))
    .reduce((sum, b) => sum + b.amount, 0)
  const selectedCount = selectedBills.size
  const allSelected = allBills.length > 0 && allBills.every((b) => selectedBills.has(b.id))

  const toggleAll = () => {
    if (allSelected) {
      setSelectedBills(new Set())
    } else {
      setSelectedBills(new Set(allBills.map((b) => b.id)))
    }
  }

  const handlePay = () => {
    if (selectedCount === 0) return
    const params = new URLSearchParams()
    params.set("bills", Array.from(selectedBills).join(","))
    params.set("amount", String(selectedTotal))
    params.set("count", String(selectedCount))
    router.push(`/sbh/confirm?${params.toString()}`)
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="default"
        title="Hoa don"
        leading={
          <button
            type="button"
            onClick={() => router.push("/sbh")}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* ── Select all row ──────────────────────────────────────── */}
      <div className="flex items-center gap-[12px] px-[22px] py-[12px]">
        <Checkbox checked={allSelected} onToggle={toggleAll} />
        <button type="button" onClick={toggleAll} className="text-sm font-medium text-foreground">
          Chon tat ca ({allBills.length})
        </button>
      </div>

      {/* ── Scrollable content ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-[120px]">
        {Array.from(grouped.entries()).map(([service, entries]) => {
          const config = getServiceConfig(service)
          return (
            <div key={service} className="pt-[32px]">
              {/* Section label */}
              <div className="px-[22px] pb-[12px]">
                <p className="text-xs font-semibold text-foreground-secondary tracking-wide uppercase">
                  {config.label}
                </p>
              </div>

              {/* Profile cards */}
              {entries.map(({ profile, bills }) => (
                <div key={profile.id} className="px-[22px] pb-[16px]">
                  <div className="bg-secondary rounded-[28px] p-[16px]">
                    {/* Profile header */}
                    <div className="flex items-center gap-[12px] pb-[12px]">
                      <div className={`w-[36px] h-[36px] rounded-full ${config.accent} flex items-center justify-center shrink-0`}>
                        <config.Icon size={18} className={config.iconColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{profile.label}</p>
                        <p className="text-xs font-normal text-foreground-secondary">{profile.sublabel}</p>
                      </div>
                    </div>

                    {/* Bill rows with checkboxes */}
                    {bills.map((bill, idx) => {
                      const isSelected = selectedBills.has(bill.id)
                      const badge = getStatusBadge(bill.status)
                      return (
                        <button
                          key={bill.id}
                          type="button"
                          onClick={() => toggleBill(bill.id)}
                          className={`w-full flex items-start gap-[12px] py-[12px] text-left ${
                            idx < bills.length - 1 ? "border-b border-border" : ""
                          }`}
                        >
                          <div className="pt-[2px]">
                            <Checkbox checked={isSelected} onToggle={() => toggleBill(bill.id)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{bill.title}</p>
                            <p className="text-xs font-normal text-foreground-secondary">Han: {bill.dueDate}</p>
                            {bill.status === "overdue" && (
                              <span className={`inline-block mt-[4px] text-xs font-semibold ${badge.className}`}>
                                {badge.text}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-foreground shrink-0">
                            {formatVND(bill.amount)}
                          </p>
                        </button>
                      )
                    })}

                    {/* Auto-pay shortcut — inline inside card */}
                    <button
                      type="button"
                      onClick={() => router.push(`/sbh/auto-payment/setup/${profile.id}?billType=${encodeURIComponent(profile.billTypes[0])}`)}
                      className="w-full flex items-center justify-between pt-[12px] mt-[4px] border-t border-border"
                    >
                      <div className="flex items-center gap-[8px]">
                        <span className="text-xs font-medium text-foreground-secondary">Thanh toan tu dong</span>
                        {profile.autoPayEnabled && (
                          <span className="flex items-center gap-[4px] bg-success/10 rounded-full px-[6px] py-[1px]">
                            <span className="w-[5px] h-[5px] rounded-full bg-success" />
                            <span className="text-[10px] font-medium text-success">Da bat</span>
                          </span>
                        )}
                      </div>
                      <ChevronRight size={14} className="text-foreground-secondary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* ── Sticky bottom bar ───────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border px-[22px] pt-[12px] pb-[34px]">
        <div className="flex items-center justify-between pb-[12px]">
          <p className="text-sm font-normal text-foreground-secondary">Tong cong</p>
          <p className="text-md font-semibold text-foreground">{formatVND(selectedTotal)}</p>
        </div>
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={selectedCount === 0}
          onClick={handlePay}
        >
          Thanh toan ({selectedCount})
        </Button>
        <div className="flex justify-center pt-[8px]">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    </div>
  )
}
