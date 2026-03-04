"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Bike, Car, Heart, Moon, Plane, Shield, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import { FeedbackState } from "@/components/ui/feedback-state"

/* ── Product catalog ───────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "xe_may",
    label: "Xe máy",
    price: "Từ 180.000 đ/năm",
    icon: Bike,
    available: true,
  },
  {
    id: "o_to",
    label: "Ô tô",
    price: "Từ 486.000 đ/năm",
    icon: Car,
    available: true,
  },
  {
    id: "du_lich",
    label: "Du lịch",
    price: "Dự kiến 05/2026",
    icon: Plane,
    available: false,
  },
  {
    id: "suc_khoe",
    label: "Sức khỏe",
    price: "Dự kiến 06/2026",
    icon: Heart,
    available: false,
  },
]

/* ── Demo contracts ────────────────────────────────────────────────── */
const CONTRACTS = [
  {
    id: "1",
    status: "draft" as const,
    product: "TNDS Xe máy",
    plate: "51A-99999",
    meta: "Chưa thanh toán",
    cta: "Thanh toán",
  },
  {
    id: "2",
    status: "expiring" as const,
    product: "TNDS Xe máy",
    plate: "29A-12345",
    meta: "Còn 15 ngày",
    cta: "Gia hạn",
  },
  {
    id: "3",
    status: "active" as const,
    product: "TNDS Ô tô",
    plate: "51F-67890",
    meta: "HH: 15/08/2026",
    cta: "Xem GCN",
  },
  {
    id: "4",
    status: "expired" as const,
    product: "TNDS Xe máy",
    plate: "30E-55555",
    meta: "Hết hạn 01/01/2025",
    cta: "Gia hạn",
  },
]

const STATUS_STYLE = {
  draft:    { badge: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",         label: "Chưa TT" },
  expiring: { badge: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400", label: "Sắp hết" },
  active:   { badge: "bg-green-50 text-success dark:bg-green-950",                           label: "Hiệu lực" },
  expired:  { badge: "bg-secondary text-foreground-secondary border border-border",          label: "Hết hạn" },
}

export default function InsuranceHomePage() {
  const router = useRouter()
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const hasContracts = CONTRACTS.length > 0

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ────────────────────────────────────────────── */}
        <Header
          variant="large-title"
          largeTitle="Bảo hiểm"
          trailing={
            <button
              type="button"
              onClick={() => setIsDark(v => !v)}
              className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full text-foreground"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          }
        />

        <div className="flex-1 overflow-y-auto pb-[40px]">

          {/* ── Products 2×2 grid ─────────────────────────────────── */}
          <div className="pt-[16px] px-[22px] grid grid-cols-2 gap-3">
            {PRODUCTS.map((p) => {
              const Icon = p.icon
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={!p.available}
                  onClick={() => p.available && router.push(`/insurance/register?product=${p.id}`)}
                  className={cn(
                    "relative flex flex-col justify-between rounded-[28px] p-[16px] h-[120px] text-left",
                    "focus-visible:outline-none transition-opacity",
                    p.available
                      ? "bg-secondary active:opacity-75"
                      : "bg-sub-primary opacity-60 cursor-default"
                  )}
                >
                  {!p.available && (
                    <span className="absolute top-[12px] right-[12px] text-[11px] font-medium text-foreground-secondary">
                      Sắp ra mắt
                    </span>
                  )}
                  <div className="w-[40px] h-[40px] rounded-full bg-background flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-md font-bold leading-snug text-foreground">{p.label}</p>
                    <p className="text-xs font-medium text-foreground-secondary mt-[2px]">{p.price}</p>
                  </div>
                </button>
              )
            })}
          </div>


          {/* ── My contracts ───────────────────────────────────────── */}
          <div className="pt-[32px]">

            <div className="flex items-center justify-between px-[22px] pb-[12px]">
              <p className="text-md font-semibold text-foreground">Hợp đồng của tôi</p>
              {hasContracts && (
                <button type="button" className="text-md font-semibold text-success focus-visible:outline-none">
                  Xem tất cả
                </button>
              )}
            </div>

            {!hasContracts ? (
              <div className="px-[22px]">
                <div className="bg-secondary rounded-[28px]">
                  <FeedbackState
                    icon={<Shield size={64} className="text-foreground-secondary" />}
                    title="Chưa có hợp đồng nào"
                    description="Mua bảo hiểm để được bảo vệ toàn diện."
                    actionLabel="Mua ngay"
                    actionProps={{ onClick: () => router.push("/insurance/register") }}
                  />
                </div>
              </div>
            ) : (
              <div className="px-[22px]">
                <div className="bg-sub-primary rounded-[28px] px-[16px]">
                  {CONTRACTS.map((c, i) => {
                    const s = STATUS_STYLE[c.status]
                    const isBike = c.product.includes("Xe máy")
                    const isLast = i === CONTRACTS.length - 1

                    return (
                      <div key={c.id}>
                        <div className="py-[14px] flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-[44px] h-[44px] rounded-full bg-background shrink-0 flex items-center justify-center">
                              {isBike
                                ? <Bike size={20} className="text-foreground" />
                                : <Car size={20} className="text-foreground" />
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-md font-semibold text-foreground">{c.plate}</p>
                                <span className={cn(
                                  "text-xs font-semibold px-[8px] py-[2px] rounded-full shrink-0",
                                  s.badge
                                )}>
                                  {s.label}
                                </span>
                              </div>
                              <p className="text-sm text-foreground-secondary mt-[2px]">{c.product} · {c.meta}</p>
                            </div>
                          </div>

                          {c.cta && (
                            <Button
                              variant="secondary"
                              size="32"
                              className="w-full"
                              onClick={() => {
                                if (c.status === "draft" || c.status === "expiring") {
                                  router.push("/insurance/register")
                                } else if (c.status === "active") {
                                  router.push("/insurance/review")
                                }
                              }}
                            >
                              {c.cta}
                            </Button>
                          )}
                        </div>
                        {!isLast && <div className="h-px bg-border" />}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ── Home indicator ─────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

      </div>
    </div>
  )
}
