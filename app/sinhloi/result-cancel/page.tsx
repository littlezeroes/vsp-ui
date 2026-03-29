"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MOCK_PROFIT } from "../data"

/* ── S16: Ket qua huy dang ky — per screens.md Epic 4 ──────────── */
export default function ResultCancelPage() {
  return <React.Suspense fallback={null}><ResultCancelContent /></React.Suspense>
}

function ResultCancelContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "success" // success | failed | processing

  const isSuccess = status === "success"
  const isFailed = status === "failed"
  const isProcessing = status === "processing"

  const totalProfit = MOCK_PROFIT.reduce((sum, y) => sum + y.total, 0)

  const getIcon = () => {
    if (isSuccess) return <CheckCircle size={48} className="text-success" />
    if (isProcessing) return <Clock size={48} className="text-warning" />
    return <XCircle size={48} className="text-danger" />
  }

  const getTitle = () => {
    if (isSuccess) return "Huy dang ky thanh cong"
    if (isProcessing) return "Dang xu ly"
    return "Huy that bai"
  }

  const getDescription = () => {
    if (isSuccess) {
      return "Tai khoan sinh loi da duoc huy. Tien lai (neu co) se duoc tra vao cuoi thang."
    }
    if (isProcessing) {
      return "Yeu cau huy dang duoc xu ly. Kiem tra lai sau."
    }
    return "Khong the huy dang ky sinh loi luc nay. Vui long thu lai sau."
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
            <p className="text-sm font-normal leading-5 text-foreground-secondary mt-[4px]">
              {getDescription()}
            </p>
          </div>

          {/* Summary for success */}
          {isSuccess && (
            <div className="px-[20px] pb-[18px]">
              <div className="bg-secondary rounded-[14px] px-[16px] py-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-secondary">Tong loi nhuan da nhan</span>
                  <span className="text-sm font-semibold text-success">+{totalProfit.toLocaleString("vi-VN")}d</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spacer to push CTA to bottom */}
        <div className="flex-1" />
      </div>

      {/* Fixed CTAs */}
      <div className="shrink-0 bg-secondary px-[22px] pb-[34px] pt-[12px] space-y-3">
        {isFailed ? (
          <>
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/sinhloi/cancel")}
            >
              Thu lai
            </Button>
            <Button
              variant="secondary"
              size="48"
              className="w-full"
              onClick={() => router.push("/")}
            >
              Ve trang chu
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Ve trang chu
          </Button>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
