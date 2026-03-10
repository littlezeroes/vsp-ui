"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Home, Zap, GraduationCap } from "lucide-react"
import { Header } from "@/components/ui/header"
import { FeedbackState } from "@/components/ui/feedback-state"
import {
  PROFILES, HOUSING_BILLS, BATTERY_BILLS, EDUCATION_BILLS, TRANSACTIONS,
  formatVND, getServiceIcon,
  type ServiceType,
} from "./data"

/* ── Service grid ──────────────────────────────────────────────────────── */
const SERVICES = [
  { label: "Nha o", href: "/sbh/housing", Icon: Home, accent: "bg-info" },
  { label: "Pin va Sac", href: "/sbh/battery", Icon: Zap, accent: "bg-warning" },
  { label: "Giao duc", href: "/sbh/education", Icon: GraduationCap, accent: "bg-success" },
] as const

function getServiceLucideIcon(service: ServiceType) {
  switch (service) {
    case "housing": return Home
    case "battery": return Zap
    case "education": return GraduationCap
  }
}

/* ── Pending bills for swipe preview ───────────────────────────────────── */
function getPendingBills() {
  const bills: { id: string; service: ServiceType; profileLabel: string; title: string; amount: number; dueDate: string; overdue: boolean }[] = []

  for (const p of PROFILES) {
    if (p.service === "housing") {
      for (const b of HOUSING_BILLS.filter((b) => b.apartmentId === p.refId && b.status !== "paid")) {
        bills.push({ id: b.id, service: "housing", profileLabel: p.label, title: b.title, amount: b.amount, dueDate: b.dueDate, overdue: b.status === "overdue" })
      }
    }
    if (p.service === "battery") {
      for (const b of BATTERY_BILLS.filter((b) => b.vehicleId === p.refId && b.status !== "paid")) {
        bills.push({ id: b.id, service: "battery", profileLabel: p.label, title: b.title, amount: b.amount, dueDate: b.dueDate, overdue: b.status === "overdue" })
      }
    }
    if (p.service === "education") {
      for (const b of EDUCATION_BILLS.filter((b) => b.studentId === p.refId && b.status !== "paid")) {
        bills.push({ id: b.id, service: "education", profileLabel: p.label, title: b.title, amount: b.amount, dueDate: b.dueDate, overdue: b.status === "overdue" })
      }
    }
  }
  return bills
}

/* ── Skeleton ──────────────────────────────────────────────────────────── */
function SkeletonPage() {
  return (
    <>
      <div className="px-[22px] pt-[32px]">
        <div className="h-[14px] w-[140px] rounded-full bg-secondary animate-pulse mb-[12px]" />
        <div className="flex gap-[12px] overflow-x-auto pb-[4px]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="shrink-0 w-[200px] h-[100px] rounded-[28px] bg-secondary animate-pulse" />
          ))}
        </div>
      </div>
      <div className="px-[22px] pt-[32px]">
        <div className="h-[14px] w-[100px] rounded-full bg-secondary animate-pulse mb-[16px]" />
        <div className="grid grid-cols-3 gap-[12px]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-[8px]">
              <div className="w-[48px] h-[48px] rounded-full bg-secondary animate-pulse" />
              <div className="w-[40px] h-[10px] rounded-full bg-secondary animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Page content ─────────────────────────────────────────────────────── */
function SbhHomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "loaded"

  const isLoading = state === "loading"
  const isEmpty = state === "empty"

  const pendingBills = getPendingBills()
  const recentTx = TRANSACTIONS.slice(0, 3)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="default"
        title="Hoa don"
        leading={
          <button type="button" onClick={() => router.push("/")} className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full">
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[21px]">
        {isLoading && <SkeletonPage />}

        {!isLoading && isEmpty && (
          <div className="pt-[32px] px-[22px]">
            <FeedbackState
              icon={<div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center"><Home size={32} className="text-foreground-secondary" /></div>}
              title="Chua co ho so nao"
              description="Them ho so de quan ly hoa don cua ban"
            />
          </div>
        )}

        {!isLoading && !isEmpty && (
          <>
            {/* ── Pending bills — horizontal swipe ─────────────────── */}
            {pendingBills.length > 0 && (
              <div className="pt-[16px]">
                <div className="flex items-center justify-between px-[22px] pb-[12px]">
                  <p className="text-sm font-semibold text-foreground">Hoa don can thanh toan</p>
                  <button type="button" onClick={() => router.push("/sbh/my-bills")} className="text-sm font-semibold text-success">
                    Xem tat ca
                  </button>
                </div>
                <div className="flex gap-[12px] overflow-x-auto px-[22px] pb-[4px] snap-x snap-mandatory scrollbar-hide">
                  {pendingBills.map((bill) => {
                    const Icon = getServiceLucideIcon(bill.service)
                    const { bg, color } = getServiceIcon(bill.service)
                    return (
                      <button
                        key={bill.id}
                        type="button"
                        onClick={() => router.push("/sbh/my-bills")}
                        className="shrink-0 w-[220px] bg-secondary rounded-[28px] p-[16px] text-left snap-start"
                      >
                        <div className="flex items-center gap-[8px] pb-[10px]">
                          <div className={`w-[28px] h-[28px] rounded-full ${bg} flex items-center justify-center`}>
                            <Icon size={14} className={color} />
                          </div>
                          <p className="text-xs text-foreground-secondary truncate flex-1">{bill.profileLabel}</p>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate">{bill.title}</p>
                        <div className="flex items-center justify-between pt-[6px]">
                          <p className="text-sm font-bold text-foreground">{formatVND(bill.amount)}</p>
                          {bill.overdue && (
                            <span className="text-xs font-semibold text-danger">Qua han</span>
                          )}
                        </div>
                        <p className="text-xs text-foreground-secondary pt-[4px]">{bill.dueDate}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── Service grid: Thanh toan hoa don ─────────────────── */}
            <div className="pt-[32px] px-[22px]">
              <p className="text-sm font-semibold text-foreground pb-[16px]">Thanh toan hoa don</p>
              <div className="grid grid-cols-3 gap-y-[20px] gap-x-[12px]">
                {SERVICES.map(({ label, href, Icon, accent }) => (
                  <button key={href} type="button" onClick={() => router.push(href)} className="flex flex-col items-center gap-[8px]">
                    <div className={`w-[48px] h-[48px] rounded-full ${accent} flex items-center justify-center`}>
                      <Icon size={22} className="text-background" />
                    </div>
                    <p className="text-xs font-medium text-foreground text-center leading-[16px]">{label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Recent payments ───────────────────────────────────── */}
            {recentTx.length > 0 && (
              <div className="pt-[32px]">
                <div className="flex items-center justify-between px-[22px] pb-[8px]">
                  <p className="text-sm font-semibold text-foreground">Lich su thanh toan</p>
                  <button type="button" onClick={() => router.push("/sbh/history")} className="text-sm font-semibold text-success">
                    Xem tat ca
                  </button>
                </div>
                <div className="px-[22px]">
                  {recentTx.map((tx, idx) => {
                    const Icon = getServiceLucideIcon(tx.service)
                    const { bg, color } = getServiceIcon(tx.service)
                    return (
                      <div key={tx.id} className={`flex items-center gap-[12px] py-[14px] ${idx < recentTx.length - 1 ? "border-b border-border" : ""}`}>
                        <div className={`w-11 h-11 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                          <Icon size={20} className={color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{tx.profileLabel}</p>
                          <p className="text-xs text-foreground-secondary">{tx.billTitle} · {tx.date}</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground shrink-0">{formatVND(tx.amount)}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function SbhHomePage() {
  return (
    <React.Suspense fallback={null}>
      <SbhHomeContent />
    </React.Suspense>
  )
}
