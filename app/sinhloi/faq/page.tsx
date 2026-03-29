"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronDown, ChevronUp, UserPlus, Settings, DollarSign, ArrowUpRight, TrendingUp, Shield } from "lucide-react"
import { Header } from "@/components/ui/header"
import { FAQ_DATA } from "../data"

const ICON_MAP: Record<string, React.ReactNode> = {
  "user-plus": <UserPlus size={20} className="text-info" />,
  "settings": <Settings size={20} className="text-warning" />,
  "dollar-sign": <DollarSign size={20} className="text-success" />,
  "arrow-up-right": <ArrowUpRight size={20} className="text-danger" />,
  "trending-up": <TrendingUp size={20} className="text-success" />,
  "shield": <Shield size={20} className="text-info" />,
}

/* ── S21: Cau hoi thuong gap ───────────────────────────────────── */
export default function FaqPage() {
  const router = useRouter()
  const [expandedCat, setExpandedCat] = React.useState<number | null>(null)
  const [expandedQ, setExpandedQ] = React.useState<string | null>(null)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Cau hoi thuong gap"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[21px]">
        {/* Quick question */}
        <div className="px-[22px] pb-[16px]">
          <button
            type="button"
            className="w-full bg-secondary rounded-[28px] p-[20px] text-left"
            onClick={() => {}}
          >
            <p className="text-md font-semibold text-foreground">Giao dich khong thanh cong thi phai lam the nao?</p>
            <p className="text-sm text-foreground-secondary mt-[4px]">Xem huong dan xu ly &rarr;</p>
          </button>
        </div>

        {/* Category grid */}
        <div className="px-[22px]">
          <p className="text-md font-semibold text-foreground mb-[16px]">Tim hieu theo chu de</p>
          <div className="grid grid-cols-3 gap-[12px]">
            {FAQ_DATA.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setExpandedCat(expandedCat === idx ? null : idx)}
                className={`flex flex-col items-center gap-[8px] p-[16px] rounded-[20px] transition-colors ${
                  expandedCat === idx ? "bg-foreground/5 ring-1 ring-foreground/10" : "bg-secondary"
                }`}
              >
                <div className="w-[40px] h-[40px] rounded-full bg-background flex items-center justify-center">
                  {ICON_MAP[cat.icon]}
                </div>
                <p className="text-sm text-foreground text-center leading-[16px]">{cat.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Expanded category questions */}
        {expandedCat !== null && (
          <div className="pt-[32px] px-[22px]">
            <p className="text-md font-semibold text-foreground mb-[12px]">
              {FAQ_DATA[expandedCat].label}
            </p>
            <div className="space-y-[8px]">
              {FAQ_DATA[expandedCat].items.map((item, qIdx) => {
                const key = `${expandedCat}-${qIdx}`
                const isOpen = expandedQ === key
                return (
                  <div key={key} className="bg-secondary rounded-[20px] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedQ(isOpen ? null : key)}
                      className="w-full flex items-center justify-between p-[16px] text-left"
                    >
                      <p className="text-md text-foreground flex-1 pr-[8px]">{item.q}</p>
                      {isOpen ? (
                        <ChevronUp size={18} className="text-foreground-secondary shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-foreground-secondary shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-[16px] pb-[16px]">
                        <p className="text-sm text-foreground-secondary">{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Policies */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-md font-semibold text-foreground mb-[12px]">Chinh sach / dieu khoan</p>
          <div className="space-y-[8px]">
            {["Chinh sach bao mat", "Dieu khoan su dung", "Chinh sach tra soat va boi hoan"].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => router.push("/sinhloi/terms")}
                className="w-full bg-secondary rounded-[20px] p-[16px] flex items-center justify-between"
              >
                <p className="text-md text-foreground">{label}</p>
                <ChevronDown size={16} className="text-foreground-secondary -rotate-90" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
