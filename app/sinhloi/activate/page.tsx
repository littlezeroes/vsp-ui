"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Dialog } from "@/components/ui/dialog"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { ToastBar } from "@/components/ui/toast-bar"
import { MOCK_USER, SINHLOI_CONFIG, formatVND } from "../data"

/* ── Mask helpers ──────────────────────────────────────────────── */
function maskPhone(phone: string) {
  if (phone.length < 7) return phone
  return phone.slice(0, 3) + "****" + phone.slice(-3)
}

function maskCccd(cccd: string) {
  if (cccd.length < 8) return cccd
  return cccd.slice(0, 4) + "****" + cccd.slice(-4)
}

/* ── S2: Xac nhan kich hoat ────────────────────────────────────── */
export default function ActivatePage() {
  return <React.Suspense fallback={null}><ActivateContent /></React.Suspense>
}

function ActivateContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stateParam = searchParams.get("state")

  const [cb1, setCb1] = React.useState(stateParam === "valid")
  const [cb2, setCb2] = React.useState(stateParam === "valid")
  const [loading, setLoading] = React.useState(stateParam === "loading")
  const [showTermsSheet, setShowTermsSheet] = React.useState(false)
  const [showPolicySheet, setShowPolicySheet] = React.useState(false)
  const [toast, setToast] = React.useState<{ title: string; type: "error" | "default" } | null>(null)
  const [errorDialog, setErrorDialog] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)

  const isValid = cb1 && cb2

  const handleConfirm = () => {
    if (!isValid || loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/sinhloi/otp?context=activate")
    }, 800)
  }

  // Auto-dismiss toast
  React.useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-secondary text-foreground flex flex-col">
      {/* Header with back button */}
      <Header
        variant="default"
        title="Xac nhan kich hoat"
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
        <p className="text-[28px] font-bold leading-[34px] text-background">Sinh loi tu dong</p>
      </div>

      {/* White card overlapping dark header — personal info */}
      <div className="px-[22px] -mt-[32px]">
        <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
          <ItemList>
            <ItemListItem label="Ho va ten" metadata={MOCK_USER.fullName} divider />
            <ItemListItem label="So dien thoai" metadata={maskPhone(MOCK_USER.phone)} divider />
            <ItemListItem label="Can cuoc cong dan" metadata={maskCccd(MOCK_USER.cccd)} />
          </ItemList>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Product summary */}
        <div className="pt-[32px] px-[22px]">
          <div className="bg-background rounded-[28px] px-[20px] py-[20px] shadow-sm">
            <p className="text-sm font-semibold text-foreground mb-[12px]">Tom tat san pham</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-foreground-secondary">Lai suat</span>
                <span className="text-sm font-semibold text-success">{SINHLOI_CONFIG.interestRate}%/nam</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground-secondary">Han muc</span>
                <span className="text-sm font-semibold text-foreground">Toi da {formatVND(SINHLOI_CONFIG.maxBalance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground-secondary">Rut tien</span>
                <span className="text-sm font-semibold text-foreground">Tuc thi, khong mat phi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="pt-[32px] px-[22px] space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox checked={cb1} onChange={setCb1} />
            <p className="text-sm text-foreground flex-1">
              Dong y{" "}
              <button type="button" onClick={() => setShowTermsSheet(true)} className="text-success font-semibold underline">
                chinh sach chia se du lieu
              </button>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox checked={cb2} onChange={setCb2} />
            <p className="text-sm text-foreground flex-1">
              Toi hieu loi nhuan la tam tinh va co the thay doi.{" "}
              <button type="button" onClick={() => setShowPolicySheet(true)} className="text-success font-semibold underline">
                Hop dong cho vay
              </button>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-xs text-foreground-secondary">
            San pham hoat dong theo mo hinh cho vay. Lai suat co the thay doi theo thoa thuan voi doi tac.
          </p>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="shrink-0 px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isValid}
          isLoading={loading}
          onClick={handleConfirm}
        >
          Xac nhan
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* Terms bottom sheet */}
      <BottomSheet open={showTermsSheet} onClose={() => setShowTermsSheet(false)}>
        <div className="space-y-4 py-4">
          <p className="text-lg font-semibold text-foreground">Dieu khoan su dung</p>
          <ul className="space-y-2 text-md text-foreground">
            <li>- San pham hoat dong theo mo hinh cho vay qua doi tac tai chinh</li>
            <li>- Lai suat co the thay doi theo dieu kien thi truong</li>
            <li>- Nguoi dung co the rut tien bat ky luc nao</li>
            <li>- Moi giao dich duoc xac thuc bang OTP hoac sinh trac hoc</li>
            <li>- Thong tin ca nhan duoc bao ve theo phap luat</li>
          </ul>
          <button
            type="button"
            onClick={() => { setShowTermsSheet(false); router.push("/sinhloi/terms?doc=policy") }}
            className="text-sm font-semibold text-success"
          >
            Xem day du
          </button>
        </div>
      </BottomSheet>

      {/* Policy / Contract bottom sheet */}
      <BottomSheet open={showPolicySheet} onClose={() => setShowPolicySheet(false)}>
        <div className="space-y-4 py-4">
          <p className="text-lg font-semibold text-foreground">Hop dong cho vay</p>
          <ul className="space-y-2 text-md text-foreground">
            <li>- Tien duoc cho vay thong qua doi tac {SINHLOI_CONFIG.provider}</li>
            <li>- Lai suat tinh tren so du cuoi ngay, tra vao cuoi thang</li>
            <li>- Khong co thoi han co dinh — rut bat ky luc nao</li>
            <li>- Doi tac co nghia vu tra lai dung han</li>
          </ul>
          <button
            type="button"
            onClick={() => { setShowPolicySheet(false); router.push("/sinhloi/terms?doc=contract") }}
            className="text-sm font-semibold text-success"
          >
            Xem day du
          </button>
        </div>
      </BottomSheet>

      {/* Toast */}
      {toast && (
        <div className="absolute top-[100px] inset-x-[22px] z-50">
          <ToastBar type={toast.type} title={toast.title} onClose={() => setToast(null)} />
        </div>
      )}

      {/* Error dialog */}
      <Dialog
        open={errorDialog}
        onClose={() => setErrorDialog(false)}
        title="He thong dang ban"
        description="Dich vu tam thoi gian doan. Vui long thu lai sau it phut."
        primaryLabel="Thu lai"
        secondaryLabel="Dong"
        footerProps={{
          primaryProps: { onClick: () => setErrorDialog(false) },
          secondaryProps: { onClick: () => { setErrorDialog(false); router.push("/sinhloi/dashboard") } },
        }}
      />

      {/* Network dialog */}
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
