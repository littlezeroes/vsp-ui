"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Check, X } from "lucide-react"
import { Header } from "@/components/ui/header"
import { MEMBERSHIP_RANKS } from "../data"

/* ── S18: Hang thanh vien ──────────────────────────────────────── */
export default function MembershipPage() {
  const router = useRouter()
  const [activeRank, setActiveRank] = React.useState(
    MEMBERSHIP_RANKS.findIndex((r) => r.isCurrent)
  )

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Hang thanh vien"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[21px]">
        {/* Rank tabs */}
        <div className="px-[22px] pb-[16px]">
          <div className="flex gap-[8px]">
            {MEMBERSHIP_RANKS.map((rank, idx) => (
              <button
                key={rank.id}
                type="button"
                onClick={() => setActiveRank(idx)}
                className={`flex-1 py-[10px] rounded-full text-sm font-semibold text-center transition-colors ${
                  activeRank === idx
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground"
                }`}
              >
                {rank.name}
                {rank.isCurrent && " ★"}
              </button>
            ))}
          </div>
        </div>

        {/* Active rank card */}
        {(() => {
          const rank = MEMBERSHIP_RANKS[activeRank]
          return (
            <div className="px-[22px]">
              <div
                className="rounded-[28px] p-[24px]"
                style={{ background: `${rank.color}15`, border: `1px solid ${rank.color}30` }}
              >
                <div className="flex items-center gap-[12px] mb-[20px]">
                  <div
                    className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
                    style={{ background: `${rank.color}30` }}
                  >
                    <span className="text-lg font-bold" style={{ color: rank.color }}>
                      {rank.name.charAt(rank.name.length - 1) === "c" ? "B" : rank.name.charAt(rank.name.length - 1) === "g" ? "V" : "K"}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{rank.name}</p>
                    {rank.isCurrent && (
                      <p className="text-sm text-foreground-secondary">Hang hien tai cua ban</p>
                    )}
                  </div>
                </div>

                <p className="text-md font-semibold text-foreground mb-[12px]">Quyen loi</p>
                <div className="space-y-[12px]">
                  {rank.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-[10px]">
                      {b.available ? (
                        <Check size={18} className="text-success shrink-0 mt-[1px]" />
                      ) : (
                        <X size={18} className="text-foreground-secondary shrink-0 mt-[1px]" />
                      )}
                      <p className={`text-md ${b.available ? "text-foreground" : "text-foreground-secondary"}`}>
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}

        {/* How to upgrade */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-md font-semibold text-foreground mb-[8px]">Cach len hang</p>
          <p className="text-sm text-foreground-secondary">
            Su dung cac tinh nang cua V-Smart Pay (thanh toan, chuyen tien, nap tien) de tich luy diem va len hang.
            Hang cang cao, quyen loi cang nhieu.
          </p>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
