"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, TrendingUp, Shield, Zap } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { FeedbackState } from "@/components/ui/feedback-state"
import { SINHLOI_CONFIG, formatVND, calculateInterest } from "../data"

/* ── S1: Product Page ──────────────────────────────────────────────── */
export default function ProductPage() {
  const router = useRouter()
  const [sliderValue, setSliderValue] = React.useState(0)
  const [isEkyc] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [rateChanged] = React.useState(false)

  const { interestRate, maxBalance } = SINHLOI_CONFIG
  const estimatedInterest = calculateInterest(sliderValue, interestRate)

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
        {/* Rate changed banner */}
        {rateChanged && (
          <div className="px-[22px] py-[8px]">
            <p className="text-sm text-foreground-secondary">Lai suat da duoc cap nhat</p>
          </div>
        )}

        {/* USP Section */}
        <div className="px-[22px] space-y-3">
          {[
            { icon: <TrendingUp size={20} className="text-success" />, text: "Lai suat canh tranh len den " + interestRate + "%/nam" },
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
        </div>

        {/* Demo section */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-md font-semibold text-foreground mb-4">
            Tinh thu loi nhuan voi lai suat {interestRate}%
          </p>

          {/* Progress bar */}
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
          onClick={() => {
            if (isEkyc) {
              router.push("/sinhloi/activate")
            }
          }}
        >
          {isEkyc ? "Kich hoat sinh loi" : "Xac thuc ngay"}
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
