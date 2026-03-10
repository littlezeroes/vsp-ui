"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Button } from "@/components/ui/button"

/* ── Page ──────────────────────────────────────────────────────── */
function TransferResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const state = searchParams.get("state") ?? "success-p2p"

  const isSuccess = state.startsWith("success")
  const isPending = state === "pending"
  const isFailed = state.startsWith("failed")
  const isBank = state === "success-bank"

  const getTitle = () => {
    switch (state) {
      case "success-p2p":
      case "success-bank":
        return "Giao dịch thành công"
      case "failed":
        return "Giao dịch thất bại"
      case "failed-timeout":
        return "Giao dịch thất bại"
      case "pending":
        return "Đang xử lý"
      default:
        return "Giao dịch thất bại"
    }
  }

  const getDescription = () => {
    switch (state) {
      case "failed":
        return "Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại."
      case "failed-timeout":
        return "Hết thời gian xử lý giao dịch. Vui lòng thử lại."
      case "pending":
        return "Giao dịch đang được xử lý. Kết quả sẽ được thông báo qua tin nhắn."
      default:
        return undefined
    }
  }

  const getIcon = () => {
    if (isSuccess) return <CheckCircle size={48} className="text-success" />
    if (isPending) return <Clock size={48} className="text-warning" />
    return <XCircle size={48} className="text-danger" />
  }

  const getDetailRows = () => {
    if (isBank) {
      return (
        <ItemList>
          <ItemListItem label="Người nhận" metadata="NGUYEN VAN MANH" divider />
          <ItemListItem label="STK" metadata="19038291832" divider />
          <ItemListItem label="Ngân hàng" metadata="Techcombank" divider />
          <ItemListItem label="Số tiền" metadata="100.000 ₫" divider />
          <ItemListItem label="Phí" metadata="Miễn phí" divider />
          <ItemListItem label="Thời gian" metadata="09/03/2026 14:30" divider />
          <ItemListItem label="Mã giao dịch" metadata="TXN001234" showChevron />
        </ItemList>
      )
    }
    return (
      <ItemList>
        <ItemListItem label="Người nhận" metadata="LÊ VĂN HÙNG" divider />
        <ItemListItem label="SĐT" metadata="0987 654 321" divider />
        <ItemListItem label="Loại" metadata="Ví → Ví" divider />
        <ItemListItem label="Số tiền" metadata="100.000 ₫" divider />
        <ItemListItem label="Phí" metadata="Miễn phí" divider />
        <ItemListItem label="Thời gian" metadata="09/03/2026 14:30" divider />
        <ItemListItem label="Mã giao dịch" metadata="TXN001234" showChevron />
      </ItemList>
    )
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Dark header */}
      <div className="bg-foreground pt-[44px] pb-[60px] flex items-center justify-center">
        <span className="text-background text-lg font-semibold leading-6 tracking-[-0.005em]">
          V-Smart Pay
        </span>
      </div>

      {/* White card — overlaps dark header */}
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
            {isSuccess && (
              <p className="text-[28px] font-bold leading-[36px] tracking-[-0.3px] text-foreground mt-[8px]">
                100.000 ₫
              </p>
            )}
            {getDescription() && (
              <p className="text-sm font-normal leading-5 text-foreground-secondary mt-[4px]">
                {getDescription()}
              </p>
            )}
          </div>

          {/* Detail rows — success only */}
          {isSuccess && (
            <div className="px-[20px] pb-[18px]">
              {getDetailRows()}
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
              onClick={() => router.push("/transfer/entry")}
            >
              Chuyển tiền khác
            </Button>
            <Button
              variant="secondary"
              size="48"
              className="w-full"
              onClick={() => router.push("/")}
            >
              Về trang chủ
            </Button>
          </>
        )}
        {isPending && (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Về trang chủ
          </Button>
        )}
        {isFailed && (
          <>
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/transfer/amount?state=filled")}
            >
              Thử lại
            </Button>
            <Button
              variant="secondary"
              size="48"
              className="w-full"
              onClick={() => router.push("/")}
            >
              Về trang chủ
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

export default function TransferResultPage() {
  return (
    <React.Suspense fallback={null}>
      <TransferResultContent />
    </React.Suspense>
  )
}
