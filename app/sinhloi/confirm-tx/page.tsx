"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Info } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { InformMessage } from "@/components/ui/inform-message"
import { Dialog } from "@/components/ui/dialog"
import { FeedbackState } from "@/components/ui/feedback-state"
import { formatVND, SINHLOI_CONFIG, MOCK_USER, MOCK_BALANCE, calculateInterest } from "../data"

/* ── Constants ──────────────────────────────────────────────────── */
const STALE_TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes
const AUTH_THRESHOLD = 5_000_000 // Nap <= 5M skip auth per decisions.md

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
  const [staleWarning, setStaleWarning] = React.useState(false)
  const [balanceChanged, setBalanceChanged] = React.useState(false)

  const isDeposit = type === "deposit"
  const serviceTitle = isDeposit ? "Nap tien sinh loi" : "Rut tien sinh loi"

  const estimatedInterestYear = calculateInterest(amount, SINHLOI_CONFIG.interestRate)
  const estimatedInterestDay = Math.round(estimatedInterestYear / 365)
  const estimatedInterestMonth = Math.round(estimatedInterestYear / 12)

  // Simulate fresh balance fetch on mount — per decisions.md M3
  React.useEffect(() => {
    const timer = setTimeout(() => setFetchLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Stale timeout — 5 minutes on confirm screen
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStaleWarning(true)
    }, STALE_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [])

  // Tiered auth per decisions.md:
  // Nap <= 5M → skip auth → go directly to result
  // Nap > 5M → OTP
  // Rut (any) → always OTP
  const handleConfirm = () => {
    if (loading) return // double-tap prevention
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      if (isDeposit && amount <= AUTH_THRESHOLD) {
        // Skip auth for small deposits — go directly to success result
        router.push(`/sinhloi/result-tx/${type}?amount=${amount}&status=success`)
      } else {
        // Require OTP auth
        router.push(`/sinhloi/auth?type=${type}&amount=${amount}`)
      }
    }, 500)
  }

  // Balance after withdraw
  const balanceAfterWithdraw = MOCK_BALANCE.balance - amount

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
          {/* Stale warning */}
          {staleWarning && (
            <div className="px-[22px] pt-[8px]">
              <InformMessage
                hierarchy="primary"
                icon={<Info size={20} />}
                body="Thong tin co the da thay doi. Vui long kiem tra lai."
                actionLabel="Quay lai"
                onAction={() => router.back()}
              />
            </div>
          )}

          {/* Balance changed warning — per decisions.md M3 */}
          {balanceChanged && (
            <div className="px-[22px] pt-[8px]">
              <InformMessage
                hierarchy="primary"
                icon={<Info size={20} />}
                body="So du da thay doi, vui long kiem tra lai."
                actionLabel="Quay lai"
                onAction={() => router.back()}
              />
            </div>
          )}

          {/* Dark header — amount hero (BIDV pattern) */}
          <div className="bg-foreground px-[22px] pt-[54px] pb-[60px] flex flex-col items-center">
            <p className="text-sm font-semibold text-background mb-[8px]">{serviceTitle}</p>
            <p className="text-[28px] font-bold leading-[34px] text-background">
              {amount.toLocaleString("vi-VN")}d
            </p>
          </div>

          {/* White card overlapping dark header (BIDV pattern) */}
          <div className="px-[22px] -mt-[32px]">
            <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
              <ItemList>
                <ItemListItem label="Dich vu" metadata={serviceTitle} divider />
                <ItemListItem label="So tien" metadata={formatVND(amount)} divider />
                <ItemListItem label="Phi giao dich" metadata="Mien phi" divider />
                <ItemListItem
                  label={isDeposit ? "Tu" : "Tu"}
                  metadata={isDeposit ? "Vi V-Smart Pay" : "Vi sinh loi"}
                  divider
                />
                <ItemListItem
                  label={isDeposit ? "Den" : "Ve"}
                  metadata={isDeposit ? "Vi sinh loi" : "Vi V-Smart Pay"}
                  divider
                />
                {isDeposit ? (
                  <>
                    <ItemListItem
                      label="Lai uoc tinh/ngay"
                      metadata={`+${estimatedInterestDay.toLocaleString("vi-VN")}d`}
                      divider
                    />
                    <ItemListItem
                      label="Lai uoc tinh/thang"
                      metadata={`+${estimatedInterestMonth.toLocaleString("vi-VN")}d`}
                    />
                  </>
                ) : (
                  <>
                    <ItemListItem
                      label="So du SL sau rut"
                      metadata={`${balanceAfterWithdraw.toLocaleString("vi-VN")}d`}
                      divider
                    />
                    <ItemListItem
                      label="Lai bi giam/ngay"
                      metadata={`-${estimatedInterestDay.toLocaleString("vi-VN")}d`}
                    />
                  </>
                )}
              </ItemList>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="px-[22px] pt-[16px]">
            <p className="text-xs text-foreground-secondary text-center">
              {isDeposit
                ? "Loi nhuan la tam tinh va co the thay doi"
                : "Tien se ve Vi V-Smart Pay ngay lap tuc"
              }
            </p>
          </div>

          {/* Tiered auth notice for small deposits */}
          {isDeposit && amount <= AUTH_THRESHOLD && (
            <div className="px-[22px] pt-[12px]">
              <p className="text-xs text-foreground-secondary text-center">
                Giao dich nap duoi 5 trieu khong can xac thuc OTP
              </p>
            </div>
          )}
        </>
      )}

      <div className="flex-1" />

      {/* Bottom CTA */}
      <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={fetchLoading || staleWarning}
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
