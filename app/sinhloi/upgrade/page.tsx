"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Lock, Check, Star } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { INTEREST_TIERS, CURRENT_TIER_IDX } from "../data"

/* ── S17: Nang cap lai suat (Gamification) ─────────────────────── */
export default function UpgradePage() {
  const router = useRouter()

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Nang cap lai suat"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Current tier badge */}
        <div className="px-[22px] pt-[8px]">
          <div className="bg-success/10 rounded-[28px] p-[20px] flex items-center gap-[12px]">
            <div className="w-[48px] h-[48px] rounded-full bg-success/20 flex items-center justify-center shrink-0">
              <Star size={24} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground-secondary">Muc hien tai</p>
              <p className="text-[28px] font-bold leading-[34px] text-success tabular-nums">
                {INTEREST_TIERS[CURRENT_TIER_IDX].rate}%
                <span className="text-sm font-semibold text-foreground-secondary">/nam</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tier progress */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-md font-semibold text-foreground mb-[16px]">Cac muc lai suat</p>

          {/* Tier bar */}
          <div className="flex items-center gap-[4px] mb-[24px]">
            {INTEREST_TIERS.map((tier, idx) => (
              <div key={tier.rate} className="flex-1 flex flex-col items-center gap-[6px]">
                <div
                  className={`w-full h-[6px] rounded-full ${
                    idx <= CURRENT_TIER_IDX ? "bg-success" : "bg-secondary"
                  }`}
                />
                <div className="flex items-center gap-[4px]">
                  {tier.unlocked ? (
                    <Check size={12} className="text-success" />
                  ) : (
                    <Lock size={12} className="text-foreground-secondary" />
                  )}
                  <span className={`text-sm font-semibold tabular-nums ${
                    idx <= CURRENT_TIER_IDX ? "text-success" : "text-foreground-secondary"
                  }`}>
                    {tier.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mission cards */}
          <div className="space-y-[12px]">
            {INTEREST_TIERS.map((tier, idx) => {
              if (idx <= CURRENT_TIER_IDX) return null
              return (
                <div key={tier.rate} className="bg-secondary rounded-[28px] p-[20px]">
                  <div className="flex items-center justify-between mb-[8px]">
                    <div className="flex items-center gap-[8px]">
                      <Lock size={16} className="text-foreground-secondary" />
                      <p className="text-md font-semibold text-foreground">
                        {tier.rate}% — {tier.label}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-foreground-secondary" />
                  </div>
                  <p className="text-sm text-foreground-secondary">{tier.mission}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Info note */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm text-foreground-secondary">
            Hoan thanh nhiem vu de mo khoa muc lai suat cao hon. Lai suat duoc ap dung ngay khi mo khoa.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-[21px] inset-x-0 bg-background px-[22px] pb-[13px] pt-[12px]">
        <Button variant="primary" className="w-full" onClick={() => router.back()}>
          Lam nhiem vu ngay
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
