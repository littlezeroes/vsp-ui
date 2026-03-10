"use client"

import * as React from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { formatVND } from "../../data"

/* ── S10: Ket qua giao dich — BIDV deposit-result pattern ──────── */
export default function ResultTxPage() {
  return <React.Suspense fallback={null}><ResultTxContent /></React.Suspense>
}

function ResultTxContent() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const type = params.type as string // deposit | withdraw
  const amount = parseInt(searchParams.get("amount") || "0", 10)
  const status = searchParams.get("status") || "success" // success | processing | failed

  const isDeposit = type === "deposit"
  const serviceTitle = isDeposit ? "Nap tien sinh loi" : "Rut tien sinh loi"
  const txnId = "TXN" + Date.now().toString().slice(-8)
  const timestamp = new Date().toLocaleString("vi-VN")

  const isSuccess = status === "success"
  const isPending = status === "processing"
  const isFailed = !isSuccess && !isPending

  const getTitle = () => {
    switch (status) {
      case "success": return "Giao dich thanh cong"
      case "processing": return "Dang xu ly"
      default: return "Giao dich that bai"
    }
  }

  const getIcon = () => {
    if (isSuccess) return <CheckCircle size={48} className="text-success" />
    if (isPending) return <Clock size={48} className="text-warning" />
    return <XCircle size={48} className="text-danger" />
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Dark header — BIDV pattern */}
      <div className="bg-foreground pt-[44px] pb-[60px] flex items-center justify-center">
        <span className="text-background text-lg font-semibold leading-6 tracking-[-0.005em]">
          V-Smart Pay
        </span>
      </div>

      {/* White card — overlaps dark header (BIDV pattern) */}
      <div className="flex-1 flex flex-col -mt-[32px]">
        <div className="mx-[22px] bg-background rounded-[28px] overflow-hidden">
          {/* Status section */}
          <div className="flex flex-col items-center text-center pt-[32px] pb-[24px] px-[24px]">
            <div className="w-16 h-16 flex items-center justify-center mb-[16px]">
              {getIcon()}
            </div>
            <h3 className="text-lg font-medium leading-6 tracking-[-0.005em] text-foreground">
              {getTitle()}
            </h3>
            {(isSuccess || isPending) && (
              <p className="text-[28px] font-bold leading-[34px] text-foreground mt-[8px]">
                {formatVND(amount)}
              </p>
            )}
            {isPending && (
              <p className="text-sm font-normal leading-5 text-foreground-secondary mt-[4px]">
                GD da duoc tiep nhan va cho xu ly. Vui long kiem tra lai trong it phut.
              </p>
            )}
            {isFailed && (
              <p className="text-sm font-normal leading-5 text-foreground-secondary mt-[4px]">
                Vui long thu lai hoac lien he CSKH.
              </p>
            )}
          </div>

          {/* Detail rows — success/processing */}
          {(isSuccess || isPending) && (
            <div className="px-[20px] pb-[18px]">
              <ItemList>
                <ItemListItem label="Thoi gian" metadata={timestamp} divider />
                <ItemListItem label="Ma giao dich" metadata={txnId} divider />
                <ItemListItem label="Dich vu" metadata={serviceTitle} divider />
                <ItemListItem label="Nguon thanh toan" metadata="Vi V-Smart Pay" divider />
                <ItemListItem label="So tien" metadata={formatVND(amount)} divider />
                <ItemListItem label="Phi" metadata="Mien phi" />
              </ItemList>
            </div>
          )}
        </div>

        {/* Spacer to push CTA to bottom */}
        <div className="flex-1" />
      </div>

      {/* Fixed CTAs */}
      <div className="shrink-0 bg-secondary px-[22px] pb-[34px] pt-[12px] space-y-3">
        {isFailed && (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() => router.push(`/sinhloi/confirm-tx?type=${type}&amount=${amount}`)}
          >
            Thu lai
          </Button>
        )}
        <Button
          variant={isFailed ? "secondary" : "primary"}
          size="48"
          className="w-full"
          onClick={() => router.push("/sinhloi/dashboard")}
        >
          Trang chu sinh loi
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
