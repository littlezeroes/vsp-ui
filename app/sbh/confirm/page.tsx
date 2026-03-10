"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X, CheckCircle, XCircle, Home, Zap, Truck } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Dialog } from "@/components/ui/dialog"

/* ── Types ─────────────────────────────────────────────────────────────── */
type ServiceType = "housing" | "battery" | "education"
type PageState = "default" | "loading" | "cancel-confirm" | "result-success" | "result-failed"

/* ── Bill summary (passed via query or built from selection) ─────────── */
interface BillSummary {
  service: ServiceType
  profileName: string
  profileSub: string
  billCount: number
  amount: number
  items: { label: string; amount: number }[]
}

/* ── Mock: parse query params into bill summaries ────────────────────── */
function parseBills(searchParams: URLSearchParams): BillSummary[] {
  const service = (searchParams.get("service") || "housing") as ServiceType
  const amount = Number(searchParams.get("amount") || "4400000")
  const profile = searchParams.get("profile") || "A — Vinhomes Smart City"
  const count = Number(searchParams.get("count") || "1")

  // Single-service mock for now
  switch (service) {
    case "housing":
      return [{
        service: "housing",
        profileName: profile,
        profileSub: "Nha o",
        billCount: count,
        amount,
        items: [
          { label: "Hoa don thang 01/2026", amount: 4_400_000 },
          ...(count > 1 ? [{ label: "Hoa don thang 02/2026", amount: 2_376_000 }] : []),
        ].slice(0, count),
      }]
    case "battery":
      return [{
        service: "battery",
        profileName: profile || "VF9 — VIN A",
        profileSub: "Pin va Sac",
        billCount: count,
        amount,
        items: [
          { label: "Dich vu sac Pin — Tram Smart City", amount },
        ],
      }]
    case "education":
      return [{
        service: "education",
        profileName: profile || "Nguyen Van B",
        profileSub: "Giao duc",
        billCount: count,
        amount,
        items: [
          { label: "Hoc phi thang 03/2026", amount },
        ],
      }]
    default:
      return []
  }
}

/* ── Service icon ────────────────────────────────────────────────────── */
function ServiceIcon({ service, size = 20 }: { service: ServiceType; size?: number }) {
  switch (service) {
    case "housing":
      return <Home size={size} className="text-background" />
    case "battery":
      return <Zap size={size} className="text-background" />
    case "education":
      return <Truck size={size} className="text-background" />
  }
}

/* ── Payment sources ─────────────────────────────────────────────────── */
const PAYMENT_SOURCES = [
  { id: "wallet", label: "Vi V-Smart Pay", balance: "12.315.000d", selected: true },
  { id: "add", label: "Them lien ket", balance: null, selected: false },
]

/* ── Page ─────────────────────────────────────────────────────────────── */
function SBHConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const bills = parseBills(searchParams)
  const totalAmount = bills.reduce((s, b) => s + b.amount, 0)
  const totalBillCount = bills.reduce((s, b) => s + b.billCount, 0)
  const formattedTotal = totalAmount.toLocaleString("vi-VN") + " d"

  const [state, setState] = React.useState<PageState>("default")
  const [selectedSource, setSelectedSource] = React.useState("wallet")

  const handleSubmit = () => {
    setState("loading")
    setTimeout(() => {
      setState("result-success")
    }, 1500)
  }

  const handleClose = () => {
    setState("cancel-confirm")
  }

  /* ── Result view ────────────────────────────────────────────────────── */
  if (state === "result-success" || state === "result-failed") {
    const isSuccess = state === "result-success"
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-foreground text-background flex flex-col">
        {/* Dark header */}
        <div className="bg-foreground pt-[44px] pb-[48px] flex flex-col items-center gap-[8px]">
          <p className="text-sm font-medium leading-5 text-background opacity-60">V-Smart Pay</p>
          <p className="text-[28px] font-bold leading-9 text-background">{formattedTotal}</p>
        </div>

        {/* White card overlay */}
        <div className="flex-1 bg-background text-foreground rounded-t-[28px] -mt-[32px] flex flex-col">
          <div className="flex-1 px-[22px] pt-[32px] pb-[21px]">
            {/* Status */}
            <div className="flex flex-col items-center gap-[16px] pb-[32px]">
              {isSuccess ? (
                <CheckCircle size={64} className="text-success" />
              ) : (
                <XCircle size={64} className="text-danger" />
              )}
              <p className="text-lg font-semibold leading-6 text-foreground">
                {isSuccess ? "Thanh toan thanh cong" : "Thanh toan that bai"}
              </p>
              {totalBillCount > 1 && (
                <p className="text-sm text-foreground-secondary">
                  {totalBillCount} hoa don
                </p>
              )}
            </div>

            {/* Bill breakdown */}
            {bills.map((bill) => (
              <div key={bill.profileName} className="pt-[16px]">
                <div className="flex items-center gap-[8px] pb-[8px]">
                  <div className="w-[28px] h-[28px] rounded-full bg-foreground flex items-center justify-center">
                    <ServiceIcon service={bill.service} size={14} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{bill.profileName}</p>
                </div>
                <ItemList>
                  {bill.items.map((item, idx) => (
                    <ItemListItem
                      key={item.label}
                      label={item.label}
                      metadata={item.amount.toLocaleString("vi-VN") + " d"}
                      divider={idx < bill.items.length - 1}
                    />
                  ))}
                </ItemList>
              </div>
            ))}

            {/* Timestamp */}
            <div className="pt-[16px]">
              <ItemList>
                <ItemListItem
                  label="Thoi gian"
                  metadata={new Date().toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                />
              </ItemList>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="px-[22px] pb-[21px]">
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/sbh")}
            >
              Ve trang chu
            </Button>
          </div>

          {/* Home indicator */}
          <div className="h-[21px] flex items-end justify-center pb-[4px]">
            <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
          </div>
        </div>
      </div>
    )
  }

  /* ── Main confirm view ──────────────────────────────────────────────── */
  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Xac nhan thanh toan"
        leading={
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <X size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Total amount card */}
        <div className="px-[22px] pt-[32px]">
          <div className="bg-secondary rounded-[28px] p-[16px] flex flex-col items-center gap-[8px]">
            <p className="text-sm font-medium leading-5 text-foreground-secondary">
              Tong thanh toan {totalBillCount > 1 ? `(${totalBillCount} hoa don)` : ""}
            </p>
            <p className="text-[28px] font-bold leading-9 text-foreground">{formattedTotal}</p>
          </div>
        </div>

        {/* Bill groups by service */}
        {bills.map((bill) => (
          <div key={bill.profileName} className="pt-[32px]">
            {/* Profile header */}
            <div className="flex items-center gap-[8px] px-[22px] pb-[12px]">
              <div className="w-[32px] h-[32px] rounded-full bg-foreground flex items-center justify-center">
                <ServiceIcon service={bill.service} size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{bill.profileName}</p>
                <p className="text-xs text-foreground-secondary">{bill.profileSub}</p>
              </div>
            </div>

            {/* Bill items */}
            <div className="px-[22px]">
              <ItemList>
                {bill.items.map((item, idx) => (
                  <ItemListItem
                    key={item.label}
                    label={item.label}
                    metadata={item.amount.toLocaleString("vi-VN") + " d"}
                    divider={idx < bill.items.length - 1}
                  />
                ))}
              </ItemList>
            </div>
          </div>
        ))}

        {/* Payment source */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm font-semibold leading-5 text-foreground-secondary mb-[12px]">
            Nguon thanh toan
          </p>
          <div className="flex gap-[8px] overflow-x-auto pb-[4px]">
            {PAYMENT_SOURCES.map((src) => {
              const isSelected = src.id === selectedSource
              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => setSelectedSource(src.id)}
                  className={`shrink-0 flex items-center gap-[8px] px-[16px] py-[10px] rounded-full text-sm font-medium leading-5 transition-colors ${
                    isSelected
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {src.label}
                  {src.balance && (
                    <span className={isSelected ? "text-background opacity-70" : "text-foreground-secondary"}>
                      {src.balance}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[16px] bg-background">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          isLoading={state === "loading"}
          onClick={handleSubmit}
        >
          Xac nhan thanh toan
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* Cancel dialog */}
      <Dialog
        open={state === "cancel-confirm"}
        onClose={() => setState("default")}
        title="Huy thanh toan?"
        description="Giao dich cua ban se khong duoc thuc hien."
        primaryLabel="Tiep tuc"
        secondaryLabel="Huy giao dich"
        footerProps={{
          primaryProps: { onClick: () => setState("default") },
          secondaryProps: { onClick: () => router.back() },
        }}
      />
    </div>
  )
}

export default function SBHConfirmPage() {
  return (
    <React.Suspense fallback={null}>
      <SBHConfirmContent />
    </React.Suspense>
  )
}
