"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Dialog } from "@/components/ui/dialog"
import { FeedbackState } from "@/components/ui/feedback-state"
import { formatVND } from "../data"

/* ── S8: Xac nhan giao dich — BIDV deposit-auth pattern ─────────── */
export default function ConfirmTxPage() {
  return <React.Suspense fallback={null}><ConfirmTxContent /></React.Suspense>
}

function ConfirmTxContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "deposit"
  const amount = parseInt(searchParams.get("amount") || "0", 10)

  const [loading, setLoading] = React.useState(false)
  const [fetchLoading, setFetchLoading] = React.useState(true)
  const [fetchError, setFetchError] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)
  const [sessionDialog, setSessionDialog] = React.useState(false)

  const isDeposit = type === "deposit"
  const serviceTitle = isDeposit ? "Nap tien sinh loi" : "Rut tien sinh loi"

  // Simulate fetch loading
  React.useEffect(() => {
    const timer = setTimeout(() => setFetchLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push(`/sinhloi/auth?type=${type}&amount=${amount}`)
    }, 500)
  }

  if (fetchError) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
        <Header variant="default" title={isDeposit ? "Xac nhan nap tien" : "Xac nhan rut tien"} leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center rounded-full">
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        } />
        <div className="flex-1 flex items-center justify-center px-[22px]">
          <FeedbackState
            title="Khong the tai thong tin giao dich"
            actionLabel="Thu lai"
            actionProps={{ onClick: () => { setFetchError(false); setFetchLoading(true); setTimeout(() => setFetchLoading(false), 800) } }}
          />
        </div>
        <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
          <Button variant="secondary" size="48" className="w-full" onClick={() => router.back()}>
            Quay lai
          </Button>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Header with back button */}
      <Header
        variant="default"
        title={isDeposit ? "Xac nhan nap tien" : "Xac nhan rut tien"}
        showStatusBar={false}
        leading={
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {fetchLoading ? (
        <>
          {/* Dark header skeleton */}
          <div className="bg-foreground px-[22px] pt-[54px] pb-[60px] flex flex-col items-center">
            <div className="h-4 w-24 bg-background/20 rounded-full animate-pulse mb-[8px]" />
            <div className="h-8 w-40 bg-background/20 rounded-full animate-pulse" />
          </div>
          <div className="px-[22px] -mt-[32px]">
            <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-secondary rounded-[14px] animate-pulse" />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Dark header — amount hero (BIDV pattern) */}
          <div className="bg-foreground px-[22px] pt-[54px] pb-[60px] flex flex-col items-center">
            <p className="text-sm font-semibold text-background mb-[8px]">V-Smart Pay</p>
            <p className="text-[28px] font-bold leading-[34px] text-background">
              {amount.toLocaleString("vi-VN")}d
            </p>
          </div>

          {/* White card overlapping dark header (BIDV pattern) */}
          <div className="px-[22px] -mt-[32px]">
            <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
              <ItemList>
                <ItemListItem label="Service Title" metadata={serviceTitle} divider />
                <ItemListItem label="So tien" metadata={formatVND(amount)} divider />
                <ItemListItem label="Phi giao dich" metadata="Mien phi" divider />
                <ItemListItem label="Nguon thanh toan" metadata="Vi V-Smart Pay" />
              </ItemList>
            </div>
          </div>
        </>
      )}

      <div className="flex-1" />

      {/* Bottom CTA */}
      <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={fetchLoading}
          isLoading={loading}
          onClick={handleConfirm}
        >
          Xac thuc giao dich
        </Button>
      </div>

      {/* Session Timeout Dialog */}
      <Dialog
        open={sessionDialog}
        onClose={() => setSessionDialog(false)}
        title="Phien giao dich het han"
        description="Vui long thuc hien lai giao dich."
        primaryLabel="Quay lai"
        footerProps={{
          primaryProps: { onClick: () => { setSessionDialog(false); router.back() } },
        }}
      />

      {/* Network Dialog */}
      <Dialog
        open={networkDialog}
        onClose={() => setNetworkDialog(false)}
        title="Khong co ket noi mang"
        description="Vui long kiem tra Internet va thu lai"
        primaryLabel="Thu lai"
        secondaryLabel="Dong"
        footerProps={{
          primaryProps: { onClick: () => setNetworkDialog(false) },
          secondaryProps: { onClick: () => setNetworkDialog(false) },
        }}
      />

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
