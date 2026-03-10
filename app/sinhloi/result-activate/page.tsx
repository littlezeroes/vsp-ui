"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ── S4: Ket qua dang ky — BIDV deposit-result pattern ─────────── */
export default function ResultActivatePage() {
  return <React.Suspense fallback={null}><ResultActivateContent /></React.Suspense>
}

function ResultActivateContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "success"

  const isSuccess = status === "success"

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
              {isSuccess
                ? <CheckCircle size={48} className="text-success" />
                : <XCircle size={48} className="text-danger" />
              }
            </div>
            <h3 className="text-lg font-medium leading-6 tracking-[-0.005em] text-foreground">
              {isSuccess
                ? "Chuc mung ban da kich hoat sinh loi thanh cong!"
                : "Kich hoat sinh loi that bai"
              }
            </h3>
            <p className="text-sm font-normal leading-5 text-foreground-secondary mt-[4px]">
              {isSuccess
                ? "Tien trong vi sinh loi se tu dong sinh lai hang ngay."
                : "Vui long thu lai hoac lien he CSKH."
              }
            </p>
          </div>
        </div>

        {/* Spacer to push CTA to bottom */}
        <div className="flex-1" />
      </div>

      {/* Fixed CTAs */}
      <div className="shrink-0 bg-secondary px-[22px] pb-[34px] pt-[12px] space-y-3">
        {isSuccess ? (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() => router.push("/sinhloi/dashboard")}
          >
            Hoan tat, xem chi tiet Sinh loi
          </Button>
        ) : (
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
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
