"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/ui/header"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import {
  VEHICLES,
  BATTERY_BILLS,
  getVehicleTypeLabel,
  type Vehicle,
  type VehicleType,
} from "../data"

/* ── States ──────────────────────────────────────────────────────────── */
type PageState = "empty" | "typing" | "loading" | "found" | "error"

const VEHICLE_TYPES: { value: VehicleType; label: string }[] = [
  { value: "auto", label: "O to" },
  { value: "bike", label: "Xe may" },
  { value: "taxi", label: "Taxi Xanh" },
]

export default function BatteryAddPage() {
  const router = useRouter()

  const [selectedType, setSelectedType] = React.useState<VehicleType>("auto")
  const [vinCode, setVinCode] = React.useState("")
  const [pageState, setPageState] = React.useState<PageState>("empty")
  const [foundVehicle, setFoundVehicle] = React.useState<Vehicle | null>(null)
  const [billCount, setBillCount] = React.useState(0)

  /* ── Derived ────────────────────────────────────────────────────────── */
  const isEmpty = vinCode.trim().length === 0
  const isLoading = pageState === "loading"

  /* ── Input handler ──────────────────────────────────────────────────── */
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setVinCode(val)
    setPageState(val.trim().length === 0 ? "empty" : "typing")
    setFoundVehicle(null)
  }

  /* ── Lookup handler ─────────────────────────────────────────────────── */
  function handleLookup() {
    setPageState("loading")
    setTimeout(() => {
      const vehicle = VEHICLES.find(
        (v) => v.vinCode.toLowerCase() === vinCode.trim().toLowerCase()
      )
      if (vehicle) {
        const bills = BATTERY_BILLS.filter((b) => b.vehicleId === vehicle.id)
        setFoundVehicle(vehicle)
        setBillCount(bills.length)
        setPageState("found")
      } else {
        setFoundVehicle(null)
        setPageState("error")
      }
    }, 1500)
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <Header
        variant="default"
        title="Them hoa don"
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

      {/* ── Scrollable content ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* ── Vehicle type selector ─────────────────────────────── */}
        <div className="px-[22px] pt-[32px]">
          <div className="flex gap-[8px]">
            {VEHICLE_TYPES.map((vt) => (
              <button
                key={vt.value}
                type="button"
                onClick={() => {
                  setSelectedType(vt.value)
                  // Reset state when switching type
                  if (pageState === "found" || pageState === "error") {
                    setPageState(vinCode.trim().length > 0 ? "typing" : "empty")
                    setFoundVehicle(null)
                  }
                }}
                className={cn(
                  "flex-1 h-[40px] rounded-full text-sm font-semibold transition-colors",
                  selectedType === vt.value
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground"
                )}
              >
                {vt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── VIN code input ────────────────────────────────────── */}
        <div className="pt-[32px] px-[22px]">
          <TextField
            label="So VIN"
            placeholder="Nhap so VIN xe"
            value={vinCode}
            onChange={handleInput}
            error={
              pageState === "error"
                ? "Khong tim thay xe voi so VIN nay"
                : undefined
            }
          />
        </div>

        {/* ── Loading ───────────────────────────────────────────── */}
        {isLoading && (
          <div className="flex items-center justify-center pt-[32px]">
            <Loader2
              size={32}
              className="animate-spin text-foreground-secondary"
            />
          </div>
        )}

        {/* ── Found state ───────────────────────────────────────── */}
        {pageState === "found" && foundVehicle && (
          <div className="pt-[32px] px-[22px]">
            {/* Vehicle info card */}
            <div className="bg-secondary rounded-[28px] p-[16px] flex items-center gap-[12px]">
              <div className="w-11 h-11 rounded-full bg-background flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-foreground">
                  {foundVehicle.model.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-md font-semibold leading-6 text-foreground truncate">
                  {foundVehicle.model}
                </p>
                <p className="text-sm font-normal leading-5 text-foreground-secondary">
                  {foundVehicle.vinCode} · {getVehicleTypeLabel(foundVehicle.type)}
                </p>
              </div>
            </div>

            {/* Bill count message */}
            <p className="text-sm font-normal leading-5 text-foreground-secondary pt-[16px]">
              Tim thay {billCount} hoa don
            </p>
          </div>
        )}
      </div>

      {/* ── Fixed bottom button ──────────────────────────────────── */}
      <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[8px] bg-background">
        {pageState === "found" && foundVehicle ? (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() =>
              router.push(`/sbh/battery/bills/${foundVehicle.id}`)
            }
          >
            Xem hoa don
          </Button>
        ) : (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            disabled={isEmpty || isLoading}
            isLoading={isLoading}
            onClick={handleLookup}
          >
            Tra cuu hoa don
          </Button>
        )}
      </div>

      {/* ── Home indicator ──────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
