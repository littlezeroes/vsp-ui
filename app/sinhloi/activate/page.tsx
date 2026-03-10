"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Dialog } from "@/components/ui/dialog"
import { MOCK_USER, SINHLOI_CONFIG } from "../data"

/* ── S2: Xac nhan kich hoat — BIDV dark header + white card pattern ── */
export default function ActivatePage() {
  const router = useRouter()
  const [cb1, setCb1] = React.useState(false)
  const [cb2, setCb2] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [errorDialog, setErrorDialog] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)

  const isValid = cb1 && cb2

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/sinhloi/otp?context=activate")
    }, 800)
  }

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

      {/* White card overlapping dark header — BIDV pattern */}
      <div className="px-[22px] -mt-[32px]">
        <div className="bg-background rounded-[28px] px-[20px] py-[24px] shadow-sm">
          <ItemList>
            <ItemListItem label="Ho va ten" metadata={MOCK_USER.fullName} divider />
            <ItemListItem label="So dien thoai" metadata={MOCK_USER.phone} divider />
            <ItemListItem label="Can cuoc cong dan" metadata={MOCK_USER.cccd} divider />
            <ItemListItem label="Lai suat" metadata={`${SINHLOI_CONFIG.interestRate}%/nam`} />
          </ItemList>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Checkboxes */}
        <div className="pt-[32px] px-[22px] space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox checked={cb1} onChange={setCb1} />
            <p className="text-sm text-foreground flex-1">
              Dong y{" "}
              <button type="button" onClick={() => router.push("/sinhloi/terms?doc=policy")} className="text-success font-semibold underline">
                chinh sach chia se du lieu
              </button>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox checked={cb2} onChange={setCb2} />
            <p className="text-sm text-foreground flex-1">
              Dong y{" "}
              <button type="button" onClick={() => router.push("/sinhloi/terms?doc=contract")} className="text-success font-semibold underline">
                hop dong cho vay voi cong ty {SINHLOI_CONFIG.provider}
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
