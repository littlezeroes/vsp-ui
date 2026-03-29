"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SINHLOI_CONFIG, formatVND } from "../data"

/* ── S4/S5: Ket qua kich hoat — BIDV deposit-result pattern ───── */
export default function ResultActivatePage() {
  return <React.Suspense fallback={null}><ResultActivateContent /></React.Suspense>
}

function ResultActivateContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "success"
  const errorCode = searchParams.get("error")

  const isSuccess = status === "success"
  const isFailed = status === "failed"
  const isProcessing = status === "processing"
  const isNonRetryable = errorCode === "non-retryable"

  const getIcon = () => {
    if (isSuccess) return <CheckCircle size={48} className="text-success" />
    if (isProcessing) return <Clock size={48} className="text-warning" />
    return <XCircle size={48} className="text-danger" />
  }

  const getTitle = () => {
    if (isSuccess) return "Chuc mung ban da kich hoat sinh loi thanh cong!"
    if (isProcessing) return "Dang xu ly"
    if (isNonRetryable) return "Khong the kich hoat"
    return "Kich hoat sinh loi that bai"
  }

  const getDescription = () => {
    if (isSuccess) return "Tien trong vi sinh loi se tu dong sinh lai hang ngay."
    if (isProcessing) return "Yeu cau kich hoat dang duoc xu ly. Vui long kiem tra lai sau."
    if (isNonRetryable) return "Tai khoan khong du dieu kien kich hoat. Vui long lien he CSKH."
    return "Da xay ra loi. Vui long thu lai."
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

          {/* Detail info (success only) */}
          {isSuccess && (
            <div className="px-[24px] pb-[24px]">
              <div className="bg-secondary rounded-[14px] px-[14px] py-[12px] space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-foreground-secondary">Lai suat</span>
                  <span className="text-sm font-semibold text-success">{SINHLOI_CONFIG.interestRate}%/nam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground-secondary">Han muc</span>
                  <span className="text-sm font-semibold text-foreground">{formatVND(SINHLOI_CONFIG.maxBalance)}</span>
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
        {isSuccess && (
          <>
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/sinhloi/dashboard")}
            >
              Hoan tat, xem chi tiet Sinh loi
            </Button>
            <Button
              variant="secondary"
              size="48"
              className="w-full"
              onClick={() => router.push("/sinhloi/deposit-withdraw?tab=deposit")}
            >
              Nap tien ngay
            </Button>
          </>
        )}

        {isFailed && !isNonRetryable && (
          <>
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/sinhloi/activate")}
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
        )}

        {isFailed && isNonRetryable && (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Ve trang chu
          </Button>
        )}

        {isProcessing && (
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
