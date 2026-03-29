"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, Copy, Check } from "lucide-react"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { FeedbackState } from "@/components/ui/feedback-state"
import { Button } from "@/components/ui/button"
import { MOCK_TRANSACTIONS_FULL, formatVNDSigned, getStatusLabel } from "../../data"

/* ── S12: Chi tiet giao dich — BIDV transaction-detail pattern ─── */
export default function TransactionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const txId = params.id as string

  const [isLoading, setIsLoading] = React.useState(true)
  const [copied, setCopied] = React.useState(false)

  const tx = MOCK_TRANSACTIONS_FULL.find((t) => t.id === txId)

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const handleCopyId = () => {
    if (!tx) return
    navigator.clipboard?.writeText(tx.id.toUpperCase()).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /* ── Loading skeleton ────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
        <div className="bg-foreground px-[22px] pt-[54px] pb-[60px] flex flex-col items-center">
          <div className="h-4 w-24 bg-background/20 rounded-full animate-pulse mb-[8px]" />
          <div className="h-10 w-40 bg-background/20 rounded-full animate-pulse" />
        </div>
        <div className="px-[22px] -mt-[32px] flex-1">
          <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
            <div className="flex justify-center mb-[20px]">
              <div className="h-7 w-24 bg-secondary rounded-full animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-24 bg-secondary rounded-full animate-pulse" />
                  <div className="h-4 w-20 bg-secondary rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  /* ── Not found ───────────────────────────────────────────────── */
  if (!tx) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
        <div className="bg-background pt-[54px] pb-[32px] px-[22px]">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        </div>
        <div className="flex-1 bg-background px-[22px]">
          <FeedbackState
            title="Khong tim thay giao dich"
            description="Noi dung ban dang tim hien chua san sang hoac khong con ton tai"
            actionLabel="Quay lai"
            actionProps={{ onClick: () => router.back() }}
          />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  const status = getStatusLabel(tx.status)
  const typeLabel = tx.type === "deposit" ? "Nap tien" : tx.type === "withdrawal" ? "Rut tien" : tx.label
  const txStatus = tx.status

  /* Status badge */
  function getStatusBadge() {
    switch (txStatus) {
      case "success":
        return (
          <span className="inline-flex px-[12px] py-[4px] rounded-full text-sm font-semibold bg-success/10 text-success">
            Thanh cong
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex px-[12px] py-[4px] rounded-full text-sm font-semibold bg-warning/10 text-warning">
            Dang xu ly
          </span>
        )
      case "failed":
        return (
          <span className="inline-flex px-[12px] py-[4px] rounded-full text-sm font-semibold bg-danger/10 text-danger">
            That bai
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Dark header — BIDV pattern */}
      <div className="bg-foreground px-[22px] pt-[54px] pb-[60px] flex flex-col items-center relative">
        {/* Back button — absolute top-left */}
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute top-[44px] left-[14px] w-[44px] h-[44px] flex items-center justify-center rounded-full"
        >
          <ChevronLeft size={18} className="text-background" />
        </button>

        {/* V-Smart Pay label */}
        <p className="text-sm font-semibold text-background mb-[8px]">Sinh loi tu dong</p>

        {/* Amount */}
        <p className="text-[40px] font-bold tabular-nums text-background leading-tight">
          {formatVNDSigned(tx.amount)}
        </p>
      </div>

      {/* White card overlay — BIDV pattern */}
      <div className="px-[22px] -mt-[32px] flex-1">
        <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
          {/* Status badge */}
          <div className="flex justify-center mb-[20px]">
            {getStatusBadge()}
          </div>

          {/* Detail rows */}
          <ItemList>
            <ItemListItem label="Loai giao dich" metadata={typeLabel} divider />
            <ItemListItem label="Ngay giao dich" metadata={tx.date} divider />
            <ItemListItem
              label="Ma giao dich"
              suffix={
                <div className="flex items-center gap-2">
                  <span className="text-md text-foreground">{tx.id.toUpperCase()}</span>
                  <button type="button" onClick={handleCopyId} className="p-1">
                    {copied
                      ? <Check size={16} className="text-success" />
                      : <Copy size={16} className="text-foreground-secondary" />
                    }
                  </button>
                </div>
              }
            />
          </ItemList>

          {/* Failed reason */}
          {txStatus === "failed" && (
            <div className="mt-[16px] bg-danger/5 rounded-[14px] px-[14px] py-[12px]">
              <p className="text-sm text-danger">
                Giao dich khong thanh cong. Vui long thu lai hoac lien he CSKH.
              </p>
            </div>
          )}
        </div>

        {/* Repeat transaction button */}
        {(tx.type === "deposit" || tx.type === "withdrawal") && txStatus !== "pending" && (
          <div className="pt-[32px] pb-[21px]">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push("/sinhloi/deposit-withdraw")}
            >
              Thuc hien lai
            </Button>
          </div>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
