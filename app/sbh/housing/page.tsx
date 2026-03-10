"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronDown, Loader2 } from "lucide-react"
import { Header } from "@/components/ui/header"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import {
  APARTMENTS,
  HOUSING_BILLS,
  type Apartment,
} from "../data"

/* ── States ──────────────────────────────────────────────────────────── */
type PageState = "empty" | "typing" | "loading" | "found" | "error"

export default function HousingAddPage() {
  const router = useRouter()

  const [code, setCode] = React.useState("")
  const [pageState, setPageState] = React.useState<PageState>("empty")
  const [foundApt, setFoundApt] = React.useState<Apartment | null>(null)
  const [billCount, setBillCount] = React.useState(0)

  /* ── Derived ────────────────────────────────────────────────────────── */
  const isEmpty = code.trim().length === 0
  const isLoading = pageState === "loading"

  /* ── Input handler ──────────────────────────────────────────────────── */
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.slice(0, 64)
    setCode(val)
    setPageState(val.trim().length === 0 ? "empty" : "typing")
    setFoundApt(null)
  }

  /* ── Lookup handler ─────────────────────────────────────────────────── */
  function handleLookup() {
    setPageState("loading")
    setTimeout(() => {
      const apt = APARTMENTS.find(
        (a) => a.name.toLowerCase() === code.trim().toLowerCase()
      )
      if (apt) {
        const bills = HOUSING_BILLS.filter((b) => b.apartmentId === apt.id)
        setFoundApt(apt)
        setBillCount(bills.length)
        setPageState("found")
      } else {
        setFoundApt(null)
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
        {/* ── Provider dropdown ──────────────────────────────────── */}
        <div className="px-[22px] pt-[32px]">
          <p className="text-xs font-normal leading-5 text-foreground-secondary pb-[4px]">
            Nha cung cap
          </p>
          <button
            type="button"
            className="w-full h-[58px] rounded-[14px] border border-border bg-background px-[14px] flex items-center justify-between"
          >
            <span className="text-sm font-medium text-foreground">Vinhomes</span>
            <ChevronDown size={16} className="text-foreground-secondary" />
          </button>
        </div>

        {/* ── Apartment code input ──────────────────────────────── */}
        <div className="pt-[32px] px-[22px]">
          <TextField
            label="Ma can ho"
            placeholder="Nhap ma can ho"
            value={code}
            onChange={handleInput}
            maxLength={64}
            error={
              pageState === "error"
                ? "Khong tim thay can ho voi ma nay"
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
        {pageState === "found" && foundApt && (
          <div className="pt-[32px] px-[22px]">
            {/* Apartment info card */}
            <div className="bg-secondary rounded-[28px] p-[16px] flex items-center gap-[12px]">
              <div className="w-11 h-11 rounded-full bg-background flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-foreground">
                  {foundApt.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-md font-semibold leading-6 text-foreground truncate">
                  Can ho {foundApt.name}
                </p>
                <p className="text-sm font-normal leading-5 text-foreground-secondary">
                  {foundApt.address}
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
        {pageState === "found" && foundApt ? (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() =>
              router.push(`/sbh/housing/bills/${foundApt.id}`)
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
