"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  X,
  CreditCard,
  Wallet,
  Home,
  Zap,
  GraduationCap,
  Plus,
} from "lucide-react"
import { Header } from "@/components/ui/header"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import {
  PROFILES,
  getServiceIcon,
  type ServiceType,
} from "../../../data"

/* ── Icon map ──────────────────────────────────────────────────────────── */
function ServiceIcon({ service, size = 20 }: { service: ServiceType; size?: number }) {
  switch (service) {
    case "housing":
      return <Home size={size} />
    case "battery":
      return <Zap size={size} />
    case "education":
      return <GraduationCap size={size} />
  }
}

/* ── Bill type display labels ──────────────────────────────────────────── */
function getBillTypeLabel(billType: string): string {
  const map: Record<string, string> = {
    VHRService: "Phi dich vu nha o",
    CarLeasing: "Thue pin o to",
    CarCharging: "Sac pin o to",
    CarInstallment: "Tra gop pin o to",
    BikeCharging: "Sac pin xe may",
    BikeleAsing: "Thue pin xe may",
    Tuition: "Hoc phi",
    EarlyDrop: "Phi trong som",
  }
  return map[billType] ?? billType
}

/* ── Mock payment sources ──────────────────────────────────────────────── */
interface PaymentSource {
  id: string
  label: string
  icon: "card" | "wallet"
}

const DEFAULT_SOURCES: PaymentSource[] = [
  { id: "src-1", label: "Visa **** 3456", icon: "card" },
  { id: "src-2", label: "Vi V-Smart Pay", icon: "wallet" },
]

function SourceIcon({ type, size = 20 }: { type: "card" | "wallet"; size?: number }) {
  if (type === "card") return <CreditCard size={size} />
  return <Wallet size={size} />
}

/* ── Main page ─────────────────────────────────────────────────────────── */
export default function AutoPaymentSetupPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const billType = searchParams.get("billType") ?? ""

  const profile = PROFILES.find((p) => p.id === id)

  /* ── Payment day state ── */
  const [payDay, setPayDay] = React.useState("15")
  const [payDayError, setPayDayError] = React.useState("")

  /* ── Sources state ── */
  const [sources, setSources] = React.useState<PaymentSource[]>(DEFAULT_SOURCES)

  /* ── Handlers ── */
  function handlePayDayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "")
    if (val === "") {
      setPayDay("")
      setPayDayError("")
      return
    }
    const num = parseInt(val, 10)
    if (num > 28) {
      setPayDayError("Chi co the chon tu 01 den 28")
    } else {
      setPayDayError("")
    }
    setPayDay(val.slice(0, 2))
  }

  function moveSource(index: number, direction: "up" | "down") {
    const next = [...sources]
    const targetIdx = direction === "up" ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= next.length) return
    ;[next[index], next[targetIdx]] = [next[targetIdx], next[index]]
    setSources(next)
  }

  function removeSource(index: number) {
    setSources((prev) => prev.filter((_, i) => i !== index))
  }

  function handleConfirm() {
    if (!payDay || payDayError) return
    router.push("/sbh/auto-payment")
  }

  /* ── Not found ── */
  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header
          variant="default"
          title="Cai dat thanh toan tu dong"
          leading={
            <button
              type="button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full"
              onClick={() => router.push("/sbh/auto-payment")}
            >
              <ChevronLeft size={18} className="text-foreground" />
            </button>
          }
        />
        <div className="flex-1 flex items-center justify-center px-[22px]">
          <p className="text-sm text-foreground-secondary">Khong tim thay ho so</p>
        </div>
      </div>
    )
  }

  const iconStyle = getServiceIcon(profile.service)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Header ── */}
      <Header
        variant="default"
        title="Cai dat thanh toan tu dong"
        leading={
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full"
            onClick={() => router.push("/sbh/auto-payment")}
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto pb-[120px]">
        {/* ── Profile preview card ── */}
        <div className="px-[22px] pt-[32px]">
          <div className="bg-secondary rounded-[28px] p-[16px] flex items-center gap-[12px]">
            {/* Icon circle */}
            <div
              className={`w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 ${iconStyle.bg}`}
            >
              <span className={iconStyle.color}>
                <ServiceIcon service={profile.service} size={24} />
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {profile.label}
              </p>
              <p className="text-xs font-normal text-foreground-secondary truncate">
                {profile.sublabel}
              </p>
              {billType && (
                <p className="text-xs font-medium text-foreground-secondary mt-[2px]">
                  {getBillTypeLabel(billType)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Payment day selector ── */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm font-semibold text-foreground pb-[12px]">
            Ngay thanh toan hang thang
          </p>
          <TextField
            label="Ngay"
            value={payDay}
            onChange={handlePayDayChange}
            inputMode="numeric"
            maxLength={2}
            error={payDayError || undefined}
            helpText={!payDayError ? "Chi co the chon tu 01 den 28" : undefined}
            trailingIcon={
              <span className="text-xs font-normal text-foreground-secondary whitespace-nowrap">
                / thang
              </span>
            }
          />
        </div>

        {/* ── Payment sources ── */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm font-semibold text-foreground pb-[4px]">
            Nguon tien thanh toan
          </p>
          <p className="text-xs font-normal text-foreground-secondary pb-[12px]">
            Cac nguon tien duoc su dung theo thu tu uu tien tu tren xuong
          </p>

          {/* Source list */}
          <div className="flex flex-col gap-[8px]">
            {sources.map((source, index) => (
              <div
                key={source.id}
                className="bg-secondary rounded-[16px] px-[14px] py-[12px] flex items-center gap-[12px]"
              >
                {/* Priority number */}
                <span className="w-[24px] h-[24px] rounded-full bg-foreground text-background flex items-center justify-center text-xs font-semibold shrink-0">
                  {index + 1}
                </span>

                {/* Source icon */}
                <span className="text-foreground-secondary shrink-0">
                  <SourceIcon type={source.icon} size={20} />
                </span>

                {/* Label */}
                <span className="flex-1 text-sm font-medium text-foreground truncate">
                  {source.label}
                </span>

                {/* Reorder + remove buttons */}
                <div className="flex items-center gap-[4px] shrink-0">
                  <button
                    type="button"
                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full"
                    onClick={() => moveSource(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp
                      size={16}
                      className={index === 0 ? "text-disabled-fg" : "text-foreground-secondary"}
                    />
                  </button>
                  <button
                    type="button"
                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full"
                    onClick={() => moveSource(index, "down")}
                    disabled={index === sources.length - 1}
                  >
                    <ChevronDown
                      size={16}
                      className={
                        index === sources.length - 1
                          ? "text-disabled-fg"
                          : "text-foreground-secondary"
                      }
                    />
                  </button>
                  <button
                    type="button"
                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full"
                    onClick={() => removeSource(index)}
                  >
                    <X size={14} className="text-foreground-secondary" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add source button */}
          <div className="pt-[12px]">
            <Button variant="secondary" size="48" className="w-full">
              <Plus size={18} />
              Them nguon tien
            </Button>
          </div>
        </div>
      </div>

      {/* ── Sticky bottom CTA ── */}
      <div className="sticky bottom-0 bg-background px-[22px] pt-[12px] pb-[8px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          onClick={handleConfirm}
          disabled={!payDay || !!payDayError}
        >
          Xac nhan bat thanh toan tu dong
        </Button>

        {/* Home indicator */}
        <div className="w-full flex justify-center pt-[8px]">
          <div className="w-[139px] h-[5px] bg-foreground rounded-full" />
        </div>
      </div>
    </div>
  )
}
