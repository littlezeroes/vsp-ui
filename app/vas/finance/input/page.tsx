"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Loader2 } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { BottomSheet } from "@/components/ui/bottom-sheet"

/* ── Provider names lookup ─────────────────────────────────────────────── */
const PROVIDER_NAMES: Record<string, string> = {
  acs: "ACS",
  "fe-credit": "FE Credit",
  "home-credit": "Home Credit",
  mcredit: "Mcredit",
  miraeasset: "Miraeasset",
  ocb: "OCB",
  shinhan: "Shinhan Finance",
  tpfico: "TPFICO",
  ptfinance: "PTFINANCE",
  lotte: "Lotte Finance",
  fccom: "FCCOM",
  shbfinance: "SHB Finance",
}

/* ── Multi-input providers (show segmented control) ────────────────────── */
const MULTI_INPUT_PROVIDERS = ["fe-credit", "ocb", "tpfico", "ptfinance", "fccom"]

/* ── Types ─────────────────────────────────────────────────────────────── */
type InputType = "contract" | "cccd"
type PageState = "empty" | "typing" | "loading" | "found" | "not-found" | "guide-sheet"

/* ── Mock loan result ──────────────────────────────────────────────────── */
const MOCK_LOAN = {
  contractId: "HD20260315001",
  customerName: "Nguyen Van A",
  amount: "5.250.000d",
  dueDate: "15/04/2026",
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function FinanceInputPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const providerId = searchParams.get("provider") || "acs"
  const rawState = searchParams.get("state")
  const providerName = PROVIDER_NAMES[providerId] || providerId
  const hasMultiInput = MULTI_INPUT_PROVIDERS.includes(providerId)

  const [pageState, setPageState] = React.useState<PageState>(
    (rawState as PageState) ?? "empty"
  )
  const [inputType, setInputType] = React.useState<InputType>("contract")
  const [inputValue, setInputValue] = React.useState("")
  const [showGuide, setShowGuide] = React.useState(rawState === "guide-sheet")

  /* ── Derived ─────────────────────────────────────────────────────────── */
  const inputLabel = inputType === "contract" ? "Ma hop dong" : "So CCCD"
  const inputPlaceholder = inputType === "contract" ? "Nhap ma hop dong" : "Nhap so CCCD"
  const isLoading = pageState === "loading"
  const isFound = pageState === "found"

  /* ── Handlers ────────────────────────────────────────────────────────── */
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setInputValue(val)
    setPageState(val.trim().length > 0 ? "typing" : "empty")
  }

  function handleSearch() {
    setPageState("loading")
    setTimeout(() => {
      if (inputValue.toLowerCase().includes("err")) {
        setPageState("not-found")
      } else {
        setPageState("found")
      }
    }, 1200)
  }

  function handlePay() {
    const params = new URLSearchParams({
      type: "finance",
      provider: providerName,
      amount: "5250000",
      detail: inputValue,
    })
    router.push(`/vas/confirm?${params.toString()}`)
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title={providerName}
        leading={
          <button
            type="button"
            onClick={() => router.push("/vas/finance")}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Provider card */}
        <div className="px-[22px] pt-[32px]">
          <div className="bg-secondary rounded-[28px] p-[16px] flex items-center gap-[12px]">
            <div className="w-[44px] h-[44px] rounded-full bg-foreground flex items-center justify-center shrink-0">
              <span className="text-background text-xs font-bold">
                {providerName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-md font-semibold leading-6 text-foreground truncate">
                {providerName}
              </p>
              <p className="text-sm font-normal leading-5 text-foreground-secondary">
                Tai chinh
              </p>
            </div>
          </div>
        </div>

        {/* Input type selector (multi-input providers only) */}
        {hasMultiInput && (
          <div className="px-[22px] pt-[32px]">
            <div className="flex bg-secondary rounded-full p-[4px]">
              {(["contract", "cccd"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setInputType(t)
                    setInputValue("")
                    setPageState("empty")
                  }}
                  className={`flex-1 py-[8px] text-sm font-semibold leading-5 rounded-full text-center transition-colors ${
                    inputType === t
                      ? "bg-background text-foreground shadow-sm"
                      : "text-foreground-secondary"
                  }`}
                >
                  {t === "contract" ? "Ma hop dong" : "CCCD"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text field */}
        <div className="px-[22px] pt-[32px]">
          <TextField
            label={inputLabel}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={handleInputChange}
            error={pageState === "not-found" ? "Khong tim thay khoan vay" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            className="mt-[8px] text-sm font-semibold text-success"
          >
            Xem huong dan
          </button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center justify-center pt-[32px]">
            <Loader2 size={32} className="animate-spin text-foreground-secondary" />
          </div>
        )}

        {/* Loan detail (found state) */}
        {isFound && (
          <div className="px-[22px] pt-[32px]">
            <p className="text-sm font-semibold leading-5 text-foreground pb-[8px]">
              Khoan vay
            </p>
            <ItemList>
              <ItemListItem
                label="Ma HD"
                metadata={MOCK_LOAN.contractId}
                divider
              />
              <ItemListItem
                label="Ten KH"
                metadata={MOCK_LOAN.customerName}
                divider
              />
              <ItemListItem
                label="So tien"
                metadata={MOCK_LOAN.amount}
                divider
              />
              <ItemListItem
                label="Han TT"
                metadata={MOCK_LOAN.dueDate}
              />
            </ItemList>
          </div>
        )}
      </div>

      {/* Fixed bottom CTA */}
      <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[8px] bg-background">
        {isFound ? (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={handlePay}
          >
            Thanh toan
          </Button>
        ) : (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            disabled={pageState === "empty" || isLoading}
            isLoading={isLoading}
            onClick={handleSearch}
          >
            Tra cuu
          </Button>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* Guide bottom sheet */}
      <BottomSheet
        open={showGuide}
        onClose={() => {
          setShowGuide(false)
          if (pageState === "guide-sheet") {
            setPageState(inputValue.length > 0 ? "typing" : "empty")
          }
        }}
      >
        <div className="pb-[16px]">
          <p className="text-lg font-semibold leading-6 text-foreground pb-[16px]">
            Huong dan tra cuu
          </p>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-start gap-[10px]">
              <span className="shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">1</span>
              <p className="text-sm font-normal leading-5 text-foreground">
                Nhap ma hop dong hoac so CCCD da dang ky khoan vay.
              </p>
            </div>
            <div className="flex items-start gap-[10px]">
              <span className="shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">2</span>
              <p className="text-sm font-normal leading-5 text-foreground">
                Bam &quot;Tra cuu&quot; de tim khoan vay can thanh toan.
              </p>
            </div>
            <div className="flex items-start gap-[10px]">
              <span className="shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">3</span>
              <p className="text-sm font-normal leading-5 text-foreground">
                Kiem tra thong tin va chon &quot;Thanh toan&quot; de tiep tuc.
              </p>
            </div>
          </div>

          <div className="pt-[24px]">
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => setShowGuide(false)}
            >
              Da hieu
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
