"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"

/* ── Mock data ───────────────────────────────────────────────────────── */
const SAVED_PHONES = [
  { phone: "0912 345 678", carrier: "Viettel" },
  { phone: "0987 654 321", carrier: "Mobifone" },
]

const CARRIERS: Record<string, { name: string; color: string }> = {
  viettel: { name: "Viettel", color: "bg-danger" },
  mobifone: { name: "Mobifone", color: "bg-info" },
  vinaphone: { name: "Vinaphone", color: "bg-success" },
}

const DENOMINATIONS = [10_000, 20_000, 50_000, 100_000, 200_000, 500_000]

/* ── Carrier detection ───────────────────────────────────────────────── */
function detectCarrier(phone: string): string | null {
  const digits = phone.replace(/\s/g, "")
  if (digits.length < 3) return null
  const p3 = digits.slice(0, 3)
  const p4 = digits.length >= 4 ? digits.slice(0, 4) : null

  // Viettel: 091, 096, 032-039, 086
  if (p3 === "091" || p3 === "096" || p3 === "086") return "viettel"
  if (p4 && /^03[2-9]/.test(p4)) return "viettel"

  // Mobifone: 090, 093, 070, 076-079
  if (p3 === "090" || p3 === "093") return "mobifone"
  if (p4 && /^07[06789]/.test(p4)) return "mobifone"

  // Vinaphone: 091, 092, 088, 081-086
  if (p3 === "092" || p3 === "088") return "vinaphone"
  if (p4 && /^08[1-6]/.test(p4)) return "vinaphone"

  return null
}

function formatDenom(n: number): string {
  return n.toLocaleString("vi-VN")
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function TopupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stateParam = searchParams.get("state") || "empty"

  const [phone, setPhone] = React.useState("")
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(null)
  const [isLoading, setIsLoading] = React.useState(stateParam === "loading")
  const [error, setError] = React.useState(
    stateParam === "error-invalid-phone" ? "So dien thoai khong hop le" : ""
  )

  const carrier = detectCarrier(phone)
  const carrierInfo = carrier ? CARRIERS[carrier] : null
  const isValid = phone.replace(/\s/g, "").length >= 10 && carrier && selectedAmount

  function handleSavedPhoneClick(saved: (typeof SAVED_PHONES)[0]) {
    setPhone(saved.phone)
    setError("")
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setPhone(val)
    setError("")
  }

  function handleContinue() {
    const digits = phone.replace(/\s/g, "")
    if (digits.length < 10 || !carrier) {
      setError("So dien thoai khong hop le")
      return
    }
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
        title="Nap tien dien thoai"
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
        {/* Section: SDT da luu */}
        <div className="px-[22px] pt-[16px]">
          <p className="text-sm font-semibold text-foreground mb-[12px]">SDT da luu</p>
          <div className="flex gap-[8px] overflow-x-auto pb-[4px]">
            {SAVED_PHONES.map((s) => (
              <button
                key={s.phone}
                type="button"
                onClick={() => handleSavedPhoneClick(s)}
                className={cn(
                  "shrink-0 bg-secondary rounded-full px-[14px] py-[8px] text-sm font-medium text-foreground transition-colors",
                  phone === s.phone && "bg-foreground text-background"
                )}
              >
                {s.phone} · {s.carrier}
              </button>
            ))}
          </div>
        </div>

        {/* Section: Phone input */}
        <div className="px-[22px] pt-[32px]">
          <div className="relative">
            <TextField
              label="So dien thoai"
              inputMode="tel"
              maxLength={12}
              value={phone}
              onChange={handlePhoneChange}
              error={error || undefined}
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
        </div>

        {/* Section: Menh gia */}
        <div className="px-[22px] pt-[32px]">
          <p className="text-sm font-semibold text-foreground mb-[12px]">Menh gia</p>
          <div className="grid grid-cols-3 gap-[10px]">
            {DENOMINATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedAmount(d)}
                className={cn(
                  "rounded-full px-[16px] py-[10px] text-center text-sm font-medium transition-colors",
                  selectedAmount === d
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground"
                )}
              >
                {formatDenom(d)}
              </button>
            ))}
          </div>
        </div>
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
