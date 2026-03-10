"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/ui/header"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Dialog } from "@/components/ui/dialog"

/* ── Provider names lookup ───────────────────────────────────────────── */
const PROVIDER_NAMES: Record<string, string> = {
  "evn-hcm": "EVN HCMC",
  "evn-hn": "EVN Ha Noi",
  "evn-mt": "EVN Mien Trung",
  "sawaco": "SAWACO",
  "viwaco": "VIWACO",
  "fpt": "FPT Telecom",
  "vnpt": "VNPT",
  "viettel-net": "Viettel Internet",
  "vtv-cab": "VTVCab",
  "sctv": "SCTV",
  "htv": "HTVC",
}

/* ── Mock bill data ──────────────────────────────────────────────────── */
const MOCK_BILL = {
  period: "01/2026 - 02/2026",
  amount: "1.250.000 d",
  amountRaw: 1250000,
  deadline: "15/03/2026",
}

/* ── Type labels ─────────────────────────────────────────────────────── */
const TYPE_ICONS: Record<string, string> = {
  electric: "zap",
  water: "droplets",
  internet: "wifi",
  tv: "tv",
}

/* ── Page ─────────────────────────────────────────────────────────────── */
type PageState = "empty" | "typing" | "loading" | "bill-found" | "error-not-found" | "error-network" | "guide-sheet"

function BillInputContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const providerId = searchParams.get("provider") ?? ""
  const type = searchParams.get("type") ?? "electric"
  const rawState = searchParams.get("state")
  const stateParam = rawState as PageState | null
  const providerName = PROVIDER_NAMES[providerId] ?? providerId

  const [customerId, setCustomerId] = React.useState("")
  const [pageState, setPageState] = React.useState<PageState>(stateParam ?? "empty")
  const [showGuide, setShowGuide] = React.useState(rawState === "guide-sheet")
  const [showErrorDialog, setShowErrorDialog] = React.useState(rawState === "error-network")

  /* ── Derived state ─────────────────────────────────────────────────── */
  const isEmptyInput = customerId.trim().length === 0
  const isLoading = pageState === "loading"
  const billFound = pageState === "bill-found"

  /* ── Input change handler ──────────────────────────────────────────── */
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setCustomerId(val)
    if (val.trim().length === 0) {
      setPageState("empty")
    } else {
      setPageState("typing")
    }
  }

  /* ── Lookup handler ────────────────────────────────────────────────── */
  function handleLookup() {
    setPageState("loading")
    // Simulate API call
    setTimeout(() => {
      // Use customerId to determine outcome for demo purposes
      if (customerId.toLowerCase().includes("err")) {
        setPageState("error-not-found")
      } else if (customerId.toLowerCase().includes("net")) {
        setPageState("error-network")
        setShowErrorDialog(true)
      } else {
        setPageState("bill-found")
      }
    }, 1500)
  }

  /* ── Retry handler ─────────────────────────────────────────────────── */
  function handleRetry() {
    setShowErrorDialog(false)
    handleLookup()
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <Header
        variant="default"
        title={providerName}
        leading={
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* ── Scrollable content ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-[100px]">

        {/* ── Provider card ──────────────────────────────────────── */}
        <div className="px-[22px] pt-[32px]">
          <div className="bg-secondary rounded-[28px] p-[16px] flex items-center gap-[12px]">
            <div className="w-11 h-11 rounded-full bg-background flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-foreground">
                {providerName.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-md font-semibold leading-6 text-foreground truncate">
                {providerName}
              </p>
              <p className="text-sm font-normal leading-5 text-foreground-secondary">
                {type === "electric" ? "Dien" : type === "water" ? "Nuoc" : type === "internet" ? "Internet" : "Truyen hinh"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Customer ID input ──────────────────────────────────── */}
        <div className="pt-[32px] px-[22px]">
          <TextField
            label="Ma khach hang"
            placeholder="Nhap ma khach hang"
            value={customerId}
            onChange={handleInputChange}
            error={pageState === "error-not-found" ? "Khong tim thay hoa don voi ma nay" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            className="mt-[8px] text-sm font-semibold text-success"
          >
            Xem huong dan lay ma
          </button>
        </div>

        {/* ── Loading indicator ──────────────────────────────────── */}
        {isLoading && (
          <div className="flex items-center justify-center pt-[32px]">
            <Loader2 size={32} className="animate-spin text-foreground-secondary" />
          </div>
        )}

        {/* ── Bill detail (after fetch) ──────────────────────────── */}
        {billFound && (
          <div className="pt-[32px] px-[22px]">
            <p className="text-sm font-semibold text-foreground pb-[8px]">Hoa don</p>
            <ItemList>
              <ItemListItem
                label="Ky thanh toan"
                metadata={MOCK_BILL.period}
                divider
              />
              <ItemListItem
                label="So tien"
                metadata={MOCK_BILL.amount}
                divider
              />
              <ItemListItem
                label="Han thanh toan"
                metadata={MOCK_BILL.deadline}
              />
            </ItemList>
          </div>
        )}
      </div>

      {/* ── Fixed bottom button ──────────────────────────────────── */}
      <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[8px] bg-background">
        {billFound ? (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() => router.push("/vas/confirm")}
          >
            Thanh toan
          </Button>
        ) : (
          <Button
            variant="primary"
            size="48"
            className="w-full"
            disabled={isEmptyInput || isLoading}
            isLoading={isLoading}
            onClick={handleLookup}
          >
            Tra cuu
          </Button>
        )}
      </div>

      {/* ── Home indicator ──────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* ── Guide BottomSheet ────────────────────────────────────── */}
      <BottomSheet open={showGuide} onClose={() => setShowGuide(false)}>
        <div className="pb-[16px]">
          <p className="text-lg font-semibold leading-6 text-foreground pb-[16px]">
            Huong dan lay ma khach hang
          </p>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-start gap-[10px]">
              <span className="shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">1</span>
              <p className="text-sm font-normal leading-5 text-foreground">
                Tim ma khach hang tren hoa don giay hoac hoa don dien tu hang thang cua ban.
              </p>
            </div>
            <div className="flex items-start gap-[10px]">
              <span className="shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">2</span>
              <p className="text-sm font-normal leading-5 text-foreground">
                Ma khach hang thuong nam o goc trai phia tren cua hoa don, bat dau bang ky tu "PA" hoac "NV".
              </p>
            </div>
            <div className="flex items-start gap-[10px]">
              <span className="shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">3</span>
              <p className="text-sm font-normal leading-5 text-foreground">
                Neu ban khong tim thay, vui long lien he tong dai nha cung cap de duoc ho tro.
              </p>
            </div>
          </div>

          <div className="pt-[24px]">
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => setShowGuide(false)}
            >
              Da hieu
            </Button>
          </div>
        </div>
      </BottomSheet>

      {/* ── Error network Dialog ─────────────────────────────────── */}
      <Dialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        type="icon"
        icon={
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" className="fill-danger/10" />
            <path d="M18 12v8M18 24h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-danger" />
          </svg>
        }
        title="Loi ket noi"
        description="Khong the ket noi den may chu. Vui long kiem tra ket noi mang va thu lai."
        primaryLabel="Thu lai"
        secondaryLabel="Dong"
        footerProps={{
          primaryProps: { onClick: handleRetry },
          secondaryProps: {
            onClick: () => {
              setShowErrorDialog(false)
              setPageState("typing")
            },
          },
        }}
      />
    </div>
  )
}

export default function BillInputPage() {
  return (
    <React.Suspense fallback={null}>
      <BillInputContent />
    </React.Suspense>
  )
}
