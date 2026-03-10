"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Dialog } from "@/components/ui/dialog"

/* ── Mock data lookup ──────────────────────────────────────────────────── */
const BILLS: Record<string, { provider: string; customerId: string; group: string }> = {
  "1": { provider: "EVN HCMC", customerId: "PA01234567", group: "Dien" },
  "2": { provider: "SAWACO", customerId: "NV0098765", group: "Nuoc" },
  "3": { provider: "VIWACO", customerId: "NV0045678", group: "Nuoc" },
  "4": { provider: "FPT Telecom", customerId: "FPT123456", group: "Internet" },
}

const PHONES: Record<string, { phone: string; carrier: string }> = {
  "1": { phone: "0912 345 678", carrier: "Viettel" },
  "2": { phone: "0987 654 321", carrier: "Mobifone" },
  "3": { phone: "0909 111 222", carrier: "Vinaphone" },
}

/* ── State param type ──────────────────────────────────────────────────── */
type StateParam = "loaded" | "auto-pay-on" | "auto-pay-off" | "confirm-delete"

/* ── Page ──────────────────────────────────────────────────────────────── */
function SavedDetailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get("id") || "1"
  const tab = searchParams.get("tab") || "bill"
  const stateParam = (searchParams.get("state") || "loaded") as StateParam

  const [autoPayOn, setAutoPayOn] = React.useState(stateParam === "auto-pay-on")
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(stateParam === "confirm-delete")

  const isBill = tab === "bill"
  const billData = BILLS[id]
  const phoneData = PHONES[id]

  const displayName = isBill ? (billData?.provider || "—") : (phoneData?.carrier || "—")
  const displayId = isBill ? (billData?.customerId || "—") : (phoneData?.phone || "—")
  const displayGroup = isBill ? (billData?.group || "—") : "Nap tien dien thoai"

  const handleDelete = () => {
    setShowDeleteDialog(false)
    router.push("/vas/saved")
  }

  const handlePayNow = () => {
    if (isBill) {
      const params = new URLSearchParams({
        type: "bill",
        provider: displayName,
        amount: "250000",
        detail: displayId,
      })
      router.push(`/vas/confirm?${params.toString()}`)
    } else {
      const params = new URLSearchParams({
        type: "topup",
        provider: phoneData?.carrier || "Viettel",
        amount: "50000",
        detail: phoneData?.phone || "",
      })
      router.push(`/vas/confirm?${params.toString()}`)
    }
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Chi tiet"
        leading={
          <button
            type="button"
            onClick={() => router.push("/vas/saved")}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[160px]">
        {/* Provider card */}
        <div className="px-[22px] pt-[32px]">
          <div className="bg-secondary rounded-[28px] p-[16px] flex items-center gap-[12px]">
            <div className="w-[44px] h-[44px] rounded-full bg-foreground flex items-center justify-center shrink-0">
              <span className="text-background text-xs font-bold">
                {displayName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col gap-[2px] min-w-0">
              <p className="text-md font-semibold leading-6 text-foreground truncate">{displayName}</p>
              <p className="text-sm font-normal leading-5 text-foreground-secondary truncate">{displayId}</p>
            </div>
          </div>
        </div>

        {/* Detail rows */}
        <div className="px-[22px] pt-[32px]">
          <ItemList>
            <ItemListItem
              label="Nha cung cap"
              metadata={displayName}
              divider
            />
            <ItemListItem
              label={isBill ? "Ma khach hang" : "So dien thoai"}
              metadata={displayId}
              divider
            />
            <ItemListItem
              label="Loai dich vu"
              metadata={displayGroup}
            />
          </ItemList>
        </div>

        {/* Auto-pay section */}
        <div className="px-[22px] pt-[32px]">
          <div className="flex items-center justify-between py-[12px]">
            <p className="text-md font-semibold leading-6 text-foreground">
              Thanh toan tu dong
            </p>
            {/* Toggle switch */}
            <button
              type="button"
              onClick={() => setAutoPayOn(!autoPayOn)}
              className={`relative w-[51px] h-[31px] rounded-full transition-colors ${
                autoPayOn ? "bg-success" : "bg-secondary"
              }`}
            >
              <div
                className={`absolute top-[2px] w-[27px] h-[27px] rounded-full bg-background shadow-sm transition-transform ${
                  autoPayOn ? "left-[22px]" : "left-[2px]"
                }`}
              />
            </button>
          </div>

          {/* Auto-pay config summary */}
          {autoPayOn && (
            <div className="pb-[8px]">
              <ItemList>
                <ItemListItem
                  label="Ngay TT"
                  metadata="15 hang thang"
                  divider
                />
                <ItemListItem
                  label="Nguon"
                  metadata="Vi V-Smart Pay"
                />
              </ItemList>
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom area */}
      <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[16px] bg-background flex flex-col gap-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          onClick={handlePayNow}
        >
          Thanh toan ngay
        </Button>
        <Button
          variant="secondary"
          intent="danger"
          size="48"
          className="w-full"
          onClick={() => setShowDeleteDialog(true)}
        >
          Xoa
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title={isBill ? "Xoa hoa don da luu?" : "Xoa so dien thoai da luu?"}
        description="Ban se can them lai neu muon su dung sau nay."
        primaryLabel="Xoa"
        secondaryLabel="Huy"
        footerProps={{
          primaryProps: {
            intent: "danger",
            onClick: handleDelete,
          },
          secondaryProps: {
            onClick: () => setShowDeleteDialog(false),
          },
        }}
      />
    </div>
  )
}

export default function SavedDetailPage() {
  return (
    <React.Suspense fallback={null}>
      <SavedDetailContent />
    </React.Suspense>
  )
}
