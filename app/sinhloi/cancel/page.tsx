"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Dialog } from "@/components/ui/dialog"
import { MOCK_BALANCE, formatVND, SINHLOI_CONFIG, calculateInterest } from "../data"

/* ── S15: Xac nhan huy — BIDV dark header + white card pattern ────── */
export default function CancelPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)

  const { balance } = MOCK_BALANCE
  const hasBalance = balance > 0
  const estimatedInterest = calculateInterest(balance, SINHLOI_CONFIG.interestRate)

  const handleCancel = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/sinhloi/otp?context=cancel")
    }, 500)
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Header with back button */}
      <Header
        variant="default"
        title="Tat sinh loi"
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

      {/* Dark header — BIDV hero pattern */}
      <div className="bg-foreground px-[22px] pt-[54px] pb-[60px] flex flex-col items-center">
        <p className="text-sm font-semibold text-background mb-[8px]">V-Smart Pay</p>
        <p className="text-[28px] font-bold leading-[34px] text-background">Tat sinh loi</p>
      </div>

      {/* White card overlapping dark header — BIDV pattern */}
      <div className="px-[22px] -mt-[32px]">
        <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
          <p className="text-md font-semibold text-foreground mb-[12px]">
            Ban co chac muon tat tinh nang sinh loi?
          </p>

          {hasBalance ? (
            <>
              <p className="text-sm text-foreground-secondary mb-[16px]">
                So du va lai se duoc chuyen ve Vi V-Smart Pay trong ngay
              </p>
              <ItemList>
                <ItemListItem label="So du" metadata={formatVND(balance)} divider />
                <ItemListItem label="Lai du kien" metadata={formatVND(estimatedInterest)} />
              </ItemList>
            </>
          ) : (
            <p className="text-sm text-foreground-secondary">
              Vi sinh loi cua ban hien khong co so du
            </p>
          )}
        </div>
      </div>

      <div className="flex-1" />

      {/* CTAs */}
      <div className="shrink-0 px-[22px] pb-[34px] pt-[12px] space-y-3">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          onClick={() => router.back()}
        >
          Giu tinh nang
        </Button>
        <Button
          variant="primary"
          intent="danger"
          size="48"
          className="w-full"
          isLoading={loading}
          onClick={handleCancel}
        >
          Tat sinh loi
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

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
    </div>
  )
}
