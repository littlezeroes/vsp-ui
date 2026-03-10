"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X, CheckCircle, XCircle } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Dialog } from "@/components/ui/dialog"

/* ── Types ─────────────────────────────────────────────────────────────── */
type FlowType = "bill" | "topup" | "card" | "data" | "finance"
type PageState = "default" | "loading" | "cancel-confirm" | "result-success" | "result-failed"

/* ── Detail row configs per flow ───────────────────────────────────────── */
function getDetailRows(type: FlowType, provider: string, detail: string, amount: string) {
  const formatted = Number(amount).toLocaleString("vi-VN") + "đ"
  switch (type) {
    case "bill":
      return [
        { label: "Nhà cung cấp", value: provider },
        { label: "Mã khách hàng", value: detail || "PA01234567" },
        { label: "Kỳ thanh toán", value: "03/2026" },
        { label: "Phí dịch vụ", value: formatted },
      ]
    case "topup":
      return [
        { label: "Số điện thoại", value: detail || "0912 345 678" },
        { label: "Nhà mạng", value: provider || "Viettel" },
        { label: "Mệnh giá", value: formatted },
      ]
    case "card":
      return [
        { label: "Nhà mạng", value: provider || "Viettel" },
        { label: "Mệnh giá", value: formatted },
        { label: "Số lượng", value: "1" },
        { label: "Tổng tiền", value: formatted },
      ]
    case "data":
      return [
        { label: "Số điện thoại", value: detail || "0912 345 678" },
        { label: "Nhà mạng", value: provider || "Viettel" },
        { label: "Gói data", value: "D60 — 6GB/tháng" },
        { label: "Phí dịch vụ", value: formatted },
      ]
    case "finance":
      return [
        { label: "Nhà cung cấp", value: provider },
        { label: "Mã hợp đồng", value: detail || "HD001234" },
        { label: "Số tiền", value: formatted },
        { label: "Hạn thanh toán", value: "15/04/2026" },
      ]
    default:
      return [
        { label: "Nhà cung cấp", value: provider },
        { label: "Số tiền", value: formatted },
      ]
  }
}

/* ── Payment sources ───────────────────────────────────────────────────── */
const PAYMENT_SOURCES = [
  { id: "wallet", label: "Ví V-Smart Pay", balance: "12.315.000đ", selected: true },
  { id: "add", label: "Thêm liên kết", balance: null, selected: false },
]

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function ConfirmPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const type = (searchParams.get("type") || "bill") as FlowType
  const amount = searchParams.get("amount") || "250000"
  const provider = searchParams.get("provider") || "EVN HCMC"
  const detail = searchParams.get("detail") || ""

  const [state, setState] = React.useState<PageState>("default")
  const [selectedSource, setSelectedSource] = React.useState("wallet")

  const formattedAmount = Number(amount).toLocaleString("vi-VN") + "đ"
  const detailRows = getDetailRows(type, provider, detail, amount)

  const handleSubmit = () => {
    setState("loading")
    setTimeout(() => {
      setState("result-success")
    }, 1500)
  }

  const handleClose = () => {
    setState("cancel-confirm")
  }

  /* ── Result view ──────────────────────────────────────────────────── */
  if (state === "result-success" || state === "result-failed") {
    const isSuccess = state === "result-success"
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-foreground text-background flex flex-col">
        {/* Dark header area */}
        <div className="bg-foreground pt-[44px] pb-[48px] flex flex-col items-center gap-[8px]">
          <p className="text-sm font-medium leading-5 text-background opacity-60">V-Smart Pay</p>
          <p className="text-[28px] font-bold leading-9 text-background">{formattedAmount}</p>
        </div>

        {/* White card overlay */}
        <div className="flex-1 bg-background text-foreground rounded-t-[28px] -mt-[32px] flex flex-col">
          <div className="flex-1 px-[22px] pt-[32px] pb-[21px]">
            {/* Status icon + text */}
            <div className="flex flex-col items-center gap-[16px] pb-[32px]">
              {isSuccess ? (
                <CheckCircle size={64} className="text-success" />
              ) : (
                <XCircle size={64} className="text-danger" />
              )}
              <p className="text-lg font-semibold leading-6 text-foreground">
                {isSuccess ? "Giao dịch thành công" : "Giao dịch thất bại"}
              </p>
            </div>

            {/* Detail rows */}
            <ItemList>
              {detailRows.map((row, idx) => (
                <ItemListItem
                  key={row.label}
                  label={row.label}
                  metadata={row.value}
                  divider={idx < detailRows.length - 1}
                />
              ))}
              <ItemListItem
                label="Thời gian"
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

          {/* Bottom CTA */}
          <div className="px-[22px] pb-[21px]">
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/vas")}
            >
              Về trang chủ
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

  /* ── Main confirm view ────────────────────────────────────────────── */
  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Xác thực thanh toán"
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
        {/* Provider info card */}
        <div className="px-[22px] pt-[32px]">
          <div className="bg-secondary rounded-[28px] p-[16px] flex flex-col items-center gap-[12px]">
            {/* Provider logo circle */}
            <div className="w-[56px] h-[56px] rounded-full bg-foreground flex items-center justify-center">
              <span className="text-background text-lg font-bold">
                {provider.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-medium leading-5 text-foreground-secondary">{provider}</p>
            <p className="text-[28px] font-bold leading-9 text-foreground">{formattedAmount}</p>
          </div>
        </div>

        {/* Detail rows */}
        <div className="px-[22px] pt-[32px]">
          <ItemList>
            {detailRows.map((row, idx) => (
              <ItemListItem
                key={row.label}
                label={row.label}
                metadata={row.value}
                divider={idx < detailRows.length - 1}
              />
            ))}
          </ItemList>
        </div>

        {/* Payment source */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm font-semibold leading-5 text-foreground-secondary mb-[12px]">
            Nguồn thanh toán
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
          Xác thực giao dịch
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* Cancel confirmation dialog */}
      <Dialog
        open={state === "cancel-confirm"}
        onClose={() => setState("default")}
        title="Bạn có chắc muốn hủy?"
        description="Giao dịch của bạn sẽ không được thực hiện nếu bạn hủy."
        primaryLabel="Tiếp tục"
        secondaryLabel="Hủy giao dịch"
        footerProps={{
          primaryProps: { onClick: () => setState("default") },
          secondaryProps: { onClick: () => router.back() },
        }}
      />
    </div>
  )
}
