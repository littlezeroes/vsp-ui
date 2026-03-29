"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, TrendingUp, Shield, Zap, WifiOff, Info } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { FeedbackState } from "@/components/ui/feedback-state"
import { Dialog } from "@/components/ui/dialog"
import { InformMessage } from "@/components/ui/inform-message"
import { SINHLOI_CONFIG, formatVND, calculateInterest } from "../data"

/* ── S1: Product Intro — Sinh loi tu dong ──────────────────────────── */
export default function ProductPage() {
  return <React.Suspense fallback={null}><ProductContent /></React.Suspense>
}

function ProductContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stateParam = searchParams.get("state")

  const [sliderValue, setSliderValue] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isEkyc, setIsEkyc] = React.useState(true)
  const [error, setError] = React.useState(stateParam === "error")
  const [rateChanged, setRateChanged] = React.useState(stateParam === "rate-changed")
  const [showEkycDialog, setShowEkycDialog] = React.useState(false)
  const [isReactivation] = React.useState(false)

  const { interestRate, maxBalance } = SINHLOI_CONFIG
  const estimatedInterest = calculateInterest(sliderValue, interestRate)

  // Simulate loading
  React.useEffect(() => {
    if (stateParam === "no-ekyc") {
      setIsEkyc(false)
    }
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [stateParam])

  /* ── Loading skeleton ────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <Header
          variant="large-title"
          largeTitle="Sinh loi"
          leading={
            <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
              <ChevronLeft size={24} className="text-foreground" />
            </button>
          }
        />
        <div className="flex-1 px-[22px]">
          <div className="space-y-4 pt-[16px]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary animate-pulse shrink-0" />
                <div className="flex-1 h-5 bg-secondary rounded-full animate-pulse" />
              </div>
            ))}
          </div>
          <div className="pt-[32px] space-y-3">
            <div className="h-5 w-2/3 bg-secondary rounded-full animate-pulse" />
            <div className="h-4 w-full bg-secondary rounded-full animate-pulse" />
            <div className="h-4 w-3/4 bg-secondary rounded-full animate-pulse" />
          </div>
          <div className="pt-[32px] space-y-3">
            <div className="h-5 w-1/2 bg-secondary rounded-full animate-pulse" />
            <div className="h-[6px] w-full bg-secondary rounded-full animate-pulse" />
            <div className="h-12 w-full bg-secondary rounded-[14px] animate-pulse" />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  /* ── Error state ─────────────────────────────────────────────── */
  if (error) {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <Header
          variant="large-title"
          largeTitle="Sinh loi"
          leading={
            <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
              <ChevronLeft size={24} className="text-foreground" />
            </button>
          }
        />
        <div className="flex-1 flex items-center justify-center">
          <FeedbackState
            icon={<WifiOff size={48} className="text-foreground-secondary" />}
            title="Khong the tai thong tin"
            description="Vui long thu lai"
            actionLabel="Thu lai"
            actionProps={{ onClick: () => setError(false) }}
          />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  const handleActivate = () => {
    if (!isEkyc) {
      setShowEkycDialog(true)
      return
    }
    router.push("/sinhloi/activate")
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Sinh loi"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Re-activation banner */}
        {isReactivation && (
          <div className="px-[22px] py-[8px]">
            <InformMessage
              hierarchy="primary"
              icon={<Info size={24} />}
              body="Chao mung ban quay lai!"
            />
          </div>
        )}

        {/* Rate changed banner */}
        {rateChanged && (
          <div className="px-[22px] py-[8px]">
            <InformMessage
              hierarchy="primary"
              icon={<Info size={24} />}
              body={`Lai suat da cap nhat: ${interestRate}%/nam`}
              actionLabel="Xem chi tiet"
              onAction={() => setRateChanged(false)}
            />
          </div>
        )}

        {/* Tagline */}
        <div className="px-[22px] pt-[16px]">
          <p className="text-lg font-bold leading-6 text-foreground">
            Tien nhan roi, sinh loi moi ngay
          </p>
          <p className="text-sm text-foreground-secondary mt-[4px]">
            Toi uu hoa so du voi lai suat canh tranh
          </p>
        </div>

        {/* USP Section */}
        <div className="pt-[32px] px-[22px] space-y-3">
          {[
            { icon: <TrendingUp size={20} className="text-success" />, text: `Lai suat canh tranh len den ${interestRate}%/nam` },
            { icon: <Shield size={20} className="text-info" />, text: "Rut tien bat ky luc nao ve Vi V-Smart Pay" },
            { icon: <Zap size={20} className="text-warning" />, text: "Khong mat phi, khong cam ket thoi gian" },
          ].map((usp, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                {usp.icon}
              </div>
              <p className="text-md text-foreground">{usp.text}</p>
            </div>
          ))}
        </div>

        {/* Product info */}
        <div className="pt-[32px] px-[22px] space-y-2">
          <p className="text-md font-semibold text-foreground">Thong tin san pham</p>
          <div className="flex justify-between">
            <span className="text-md text-foreground-secondary">So du toi da</span>
            <span className="text-md font-semibold text-foreground">{formatVND(maxBalance)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-md text-foreground-secondary">Rut tien ve vi</span>
            <span className="text-md font-semibold text-foreground">{formatVND(SINHLOI_CONFIG.dailyWithdrawLimit)}/ngay</span>
          </div>
          <div className="flex justify-between">
            <span className="text-md text-foreground-secondary">Doi tac tai chinh</span>
            <span className="text-md font-semibold text-foreground">{SINHLOI_CONFIG.provider}</span>
          </div>
        </div>

        {/* How it works */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-md font-semibold text-foreground mb-3">Cach thuc hoat dong</p>
          <div className="space-y-3">
            {[
              { step: "1", label: "Kich hoat", desc: "Xac nhan thong tin va dong y dieu khoan" },
              { step: "2", label: "Nap tien", desc: "Chuyen tien tu Vi V-Smart Pay" },
              { step: "3", label: "Nhan lai", desc: "Lai tinh hang ngay, tra hang thang" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-success">{item.step}</span>
                </div>
                <div className="flex-1">
                  <p className="text-md font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-foreground-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interest calculator */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-md font-semibold text-foreground mb-4">
            Tinh thu loi nhuan voi lai suat {interestRate}%
          </p>

          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={maxBalance}
              step={5_000_000}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-[6px] rounded-full appearance-none bg-secondary accent-foreground cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-foreground-secondary">
              <span>0</span>
              <span>{formatVND(maxBalance)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div>
              <p className="text-md text-foreground-secondary">So tien trong vi sinh loi</p>
              <p className="text-xl font-bold tabular-nums text-foreground">{formatVND(sliderValue)}</p>
            </div>
            <div>
              <p className="text-md text-foreground-secondary">Tien lai du kien nhan duoc 1 nam</p>
              <p className="text-xl font-bold tabular-nums text-success">+{formatVND(estimatedInterest)}</p>
            </div>
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
      <div className="absolute bottom-0 inset-x-0 bg-background px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          onClick={handleActivate}
        >
          {isEkyc ? "Kich hoat sinh loi" : "Xac thuc ngay"}
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* eKYC required dialog */}
      <Dialog
        open={showEkycDialog}
        onClose={() => setShowEkycDialog(false)}
        title="Xac thuc danh tinh"
        description="Ban can hoan tat eKYC de su dung Sinh loi tu dong"
        primaryLabel="Xac thuc ngay"
        secondaryLabel="De sau"
        footerProps={{
          primaryProps: { onClick: () => { setShowEkycDialog(false); router.push("/ekyc") } },
          secondaryProps: { onClick: () => { setShowEkycDialog(false); router.push("/") } },
        }}
      />
    </div>
  )
}
