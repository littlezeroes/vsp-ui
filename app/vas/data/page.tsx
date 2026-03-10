"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"

/* ── Mock data ───────────────────────────────────────────────────────── */
const CARRIERS: Record<string, { name: string; color: string }> = {
  viettel: { name: "Viettel", color: "bg-danger" },
  mobifone: { name: "Mobifone", color: "bg-info" },
  vinaphone: { name: "Vinaphone", color: "bg-success" },
}

const DATA_PACKAGES = [
  { id: "d1", data: "1GB", duration: "7 ngay", price: 10000 },
  { id: "d2", data: "3GB", duration: "30 ngay", price: 30000 },
  { id: "d3", data: "5GB", duration: "30 ngay", price: 50000 },
  { id: "d4", data: "10GB", duration: "30 ngay", price: 90000 },
  { id: "d5", data: "15GB", duration: "30 ngay", price: 120000 },
  { id: "d6", data: "30GB", duration: "30 ngay", price: 200000 },
]

/* ── Carrier detection (same as topup) ───────────────────────────────── */
function detectCarrier(phone: string): string | null {
  const digits = phone.replace(/\s/g, "")
  if (digits.length < 3) return null
  const p3 = digits.slice(0, 3)
  const p4 = digits.length >= 4 ? digits.slice(0, 4) : null

  // Viettel
  if (p3 === "091" || p3 === "096" || p3 === "086") return "viettel"
  if (p4 && /^03[2-9]/.test(p4)) return "viettel"

  // Mobifone
  if (p3 === "090" || p3 === "093") return "mobifone"
  if (p4 && /^07[06789]/.test(p4)) return "mobifone"

  // Vinaphone
  if (p3 === "092" || p3 === "088") return "vinaphone"
  if (p4 && /^08[1-6]/.test(p4)) return "vinaphone"

  return null
}

function formatPrice(n: number): string {
  return n.toLocaleString("vi-VN") + "d"
}

/* ── Page ─────────────────────────────────────────────────────────────── */
function DataContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stateParam = searchParams.get("state") || "empty"

  const [phone, setPhone] = React.useState("")
  const [selectedPackage, setSelectedPackage] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(stateParam === "loading")

  const carrier = detectCarrier(phone)
  const carrierInfo = carrier ? CARRIERS[carrier] : null
  const isValid = phone.replace(/\s/g, "").length >= 10 && carrier && selectedPackage

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(e.target.value)
    setSelectedPackage(null)
  }

  function handleContinue() {
    setIsLoading(true)
    setTimeout(() => {
      router.push("/vas/confirm")
    }, 800)
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <Header
        variant="default"
        title="Mua goi data"
        leading={
          <button
            type="button"
            onClick={() => router.push("/vas")}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full text-foreground"
          >
            <ChevronLeft size={18} />
          </button>
        }
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Section: Phone input */}
        <div className="px-[22px] pt-[32px]">
          <TextField
            label="So dien thoai"
            inputMode="tel"
            value={phone}
            onChange={handlePhoneChange}
            trailingIcon={
              carrierInfo ? (
                <span
                  className={cn(
                    "inline-flex items-center px-[8px] py-[2px] rounded-full text-[11px] font-semibold text-background",
                    carrierInfo.color
                  )}
                >
                  {carrierInfo.name}
                </span>
              ) : undefined
            }
          />
        </div>

        {/* Section: Goi data (visible after carrier detected) */}
        {carrier && (
          <div className="px-[22px] pt-[32px]">
            <p className="text-sm font-semibold text-foreground mb-[12px]">Goi data</p>
            <div className="grid grid-cols-2 gap-[12px]">
              {DATA_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={cn(
                    "bg-secondary rounded-[28px] p-[16px] flex flex-col items-start gap-[4px] text-left transition-all",
                    selectedPackage === pkg.id && "ring-2 ring-foreground"
                  )}
                >
                  <span className="text-md font-bold text-foreground">{pkg.data}</span>
                  <span className="text-sm text-foreground-secondary">{pkg.duration}</span>
                  <span className="text-sm font-semibold text-foreground">{formatPrice(pkg.price)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Fixed bottom CTA ────────────────────────────────────── */}
      <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[12px] bg-background">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isValid}
          isLoading={isLoading}
          onClick={handleContinue}
        >
          Tiep tuc
        </Button>
      </div>

      {/* ── Home indicator ──────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function DataPage() {
  return (
    <React.Suspense fallback={null}>
      <DataContent />
    </React.Suspense>
  )
}
