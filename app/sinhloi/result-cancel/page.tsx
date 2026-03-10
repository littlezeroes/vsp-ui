"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { MOCK_BALANCE, formatVND, SINHLOI_CONFIG, calculateInterest } from "../data"

/* ── S16: Ket qua huy dang ky — BIDV deposit-result pattern ────── */
export default function ResultCancelPage() {
  return <React.Suspense fallback={null}><ResultCancelContent /></React.Suspense>
}

function ResultCancelContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "success"

  const isSuccess = status === "success"
  const { balance } = MOCK_BALANCE
  const estimatedInterest = calculateInterest(balance, SINHLOI_CONFIG.interestRate)

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
                ? "Da tiep nhan yeu cau tat tinh nang"
                : "Huy that bai"
              }
            </h3>
            <p className="text-sm font-normal leading-5 text-foreground-secondary mt-[4px]">
              {isSuccess
                ? "So du va lai cua ban se duoc chuyen ve Vi V-Smart Pay trong ngay. Vui long kiem tra lai sau."
                : "Khong the tat tinh nang sinh loi luc nay. Vui long thu lai sau."
              }
            </p>
          </div>

          {/* Balance details for success */}
          {isSuccess && balance > 0 && (
            <div className="px-[20px] pb-[18px]">
              <ItemList>
                <ItemListItem label="So du" metadata={formatVND(balance)} divider />
                <ItemListItem label="Lai du kien" metadata={formatVND(estimatedInterest)} />
              </ItemList>
            </div>
          )}
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
            onClick={() => router.push("/")}
          >
            Ve trang chu
          </Button>
        ) : (
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
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
