"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"

/* ── Mock data ───────────────────────────────────────────────────────── */
const CARRIERS = [
  { id: "viettel", name: "Viettel", abbr: "VT" },
  { id: "mobifone", name: "Mobifone", abbr: "MB" },
  { id: "vinaphone", name: "Vinaphone", abbr: "VN" },
  { id: "vnmobile", name: "VNMobile", abbr: "VM" },
  { id: "reddi", name: "Reddi", abbr: "RD" },
  { id: "itel", name: "Itel", abbr: "IT" },
]

const CARRIER_COLORS: Record<string, string> = {
  viettel: "bg-danger",
  mobifone: "bg-info",
  vinaphone: "bg-success",
  vnmobile: "bg-foreground",
  reddi: "bg-foreground",
  itel: "bg-foreground",
}

const DENOMINATIONS = [10_000, 20_000, 50_000, 100_000, 200_000, 500_000]

function formatDenom(n: number): string {
  return n.toLocaleString("vi-VN")
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function CardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stateParam = searchParams.get("state") || "empty"

  const [selectedCarrier, setSelectedCarrier] = React.useState<string | null>(null)
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(null)
  const [quantity, setQuantity] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(stateParam === "loading")

  const isValid = selectedCarrier && selectedAmount

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
        title="Mua the cao"
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
        {/* Section: Chon nha mang */}
        <div className="px-[22px] pt-[32px]">
          <p className="text-sm font-semibold text-foreground mb-[12px]">Chon nha mang</p>
          <div className="grid grid-cols-2 gap-[12px]">
            {CARRIERS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCarrier(c.id)
                  setSelectedAmount(null)
                }}
                className={cn(
                  "bg-secondary rounded-[28px] p-[16px] flex flex-col items-center gap-[8px] transition-all",
                  selectedCarrier === c.id && "ring-2 ring-foreground"
                )}
              >
                {/* Colored circle logo */}
                <div
                  className={cn(
                    "w-[48px] h-[48px] rounded-full flex items-center justify-center",
                    CARRIER_COLORS[c.id]
                  )}
                >
                  <span className="text-background text-sm font-bold">{c.abbr}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section: Menh gia (visible after carrier selected) */}
        {selectedCarrier && (
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
        )}

        {/* Section: So luong */}
        {selectedCarrier && (
          <div className="px-[22px] pt-[32px]">
            <p className="text-sm font-semibold text-foreground mb-[12px]">So luong</p>
            <div className="inline-flex items-center bg-secondary rounded-full">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="flex items-center justify-center w-[44px] h-[44px] rounded-full text-foreground disabled:text-disabled-fg"
              >
                <Minus size={18} />
              </button>
              <span className="min-w-[40px] text-center text-md font-semibold text-foreground tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                disabled={quantity >= 5}
                className="flex items-center justify-center w-[44px] h-[44px] rounded-full text-foreground disabled:text-disabled-fg"
              >
                <Plus size={18} />
              </button>
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
