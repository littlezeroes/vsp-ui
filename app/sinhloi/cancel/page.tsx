"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, AlertTriangle } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { InformMessage } from "@/components/ui/inform-message"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Dialog } from "@/components/ui/dialog"
import { ToastBar } from "@/components/ui/toast-bar"
import { MOCK_BALANCE, MOCK_PROFIT, formatVND, SINHLOI_CONFIG, calculateInterest, MOCK_MONTHLY_STATS } from "../data"

/* ── S15: Xac nhan huy — per decisions.md M1 + screens.md ──────── */
export default function CancelPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const { balance } = MOCK_BALANCE
  const hasBalance = balance > 0

  // Total profit earned
  const totalProfit = MOCK_PROFIT.reduce((sum, y) => sum + y.total, 0)
  // Current month unpaid interest
  const currentMonthInterest = MOCK_MONTHLY_STATS.interestMonth

  const handleCancel = () => {
    if (loading) return // double-tap prevention
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Navigate to OTP with cancel context
      router.push("/sinhloi/auth?context=cancel")
    }, 500)
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Header with back button */}
      <Header
        variant="default"
        title="Huy dang ky"
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Warning icon + title */}
        <div className="pt-[32px] px-[22px] flex flex-col items-center">
          <div className="w-[56px] h-[56px] rounded-full bg-danger/10 flex items-center justify-center mb-[16px]">
            <AlertTriangle size={28} className="text-danger" />
          </div>
          <h2 className="text-lg font-semibold leading-6 text-foreground text-center">
            Ban chac chan muon huy?
          </h2>
        </div>

        {hasBalance ? (
          <>
            {/* Balance > 0 — must withdraw first per decisions.md M1 */}
            <div className="pt-[16px] px-[22px]">
              <InformMessage
                hierarchy="secondary"
                icon={<AlertTriangle size={20} className="text-danger" />}
                body="Vui long rut het so du truoc khi huy dang ky sinh loi."
                actionLabel="Rut tien"
                onAction={() => router.push("/sinhloi/deposit-withdraw?tab=withdraw")}
              />
            </div>

            <div className="pt-[32px] px-[22px]">
              <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
                <ItemList>
                  <ItemListItem label="So du hien tai" metadata={formatVND(balance)} divider />
                  <ItemListItem label="Lai chua thanh toan" metadata={`+${currentMonthInterest.toLocaleString("vi-VN")}d`} />
                </ItemList>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Balance = 0 — can proceed with cancel */}
            <div className="pt-[16px] px-[22px]">
              <InformMessage
                hierarchy="secondary"
                icon={<AlertTriangle size={20} className="text-warning" />}
                body={
                  <span>
                    Sau khi huy dang ky sinh loi:
                    <br />• Tien loi se ngung duoc tinh
                    <br />• Du lieu lich su van duoc luu
                    <br />• Ban co the dang ky lai bat ky luc nao
                  </span>
                }
              />
            </div>

            {/* Summary */}
            <div className="pt-[32px] px-[22px]">
              <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
                <ItemList>
                  <ItemListItem
                    label="Tong loi nhuan da nhan"
                    metadata={`+${totalProfit.toLocaleString("vi-VN")}d`}
                    divider
                  />
                  <ItemListItem
                    label="Lai chua thanh toan thang nay"
                    metadata={`+${currentMonthInterest.toLocaleString("vi-VN")}d`}
                  />
                </ItemList>
                <p className="text-xs text-foreground-secondary mt-[12px]">
                  Lai chua thanh toan se duoc tra neu du dieu kien vao cuoi thang.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CTAs */}
      <div className="shrink-0 px-[22px] pb-[34px] pt-[12px] space-y-3">
        {hasBalance ? (
          <>
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/sinhloi/deposit-withdraw?tab=withdraw")}
            >
              Rut tien
            </Button>
            <Button
              variant="secondary"
              size="48"
              className="w-full"
              onClick={() => router.back()}
            >
              Quay lai
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
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
              Xac nhan huy
            </Button>
          </>
        )}
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="absolute top-[100px] inset-x-[22px] z-50">
          <ToastBar title={toastMessage} />
        </div>
      )}

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
