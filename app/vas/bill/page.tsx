"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Zap, Droplets, Wifi, Tv } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"

/* ── Sub-categories ──────────────────────────────────────────────────── */
const SUB_CATEGORIES = [
  {
    label: "Dien",
    type: "electric",
    Icon: Zap,
    bgColor: "bg-secondary",
    iconColor: "text-success",
  },
  {
    label: "Nuoc",
    type: "water",
    Icon: Droplets,
    bgColor: "bg-secondary",
    iconColor: "text-info",
  },
  {
    label: "Internet",
    type: "internet",
    Icon: Wifi,
    bgColor: "bg-secondary",
    iconColor: "text-foreground",
  },
  {
    label: "Truyen hinh",
    type: "tv",
    Icon: Tv,
    bgColor: "bg-secondary",
    iconColor: "text-warning",
  },
] as const

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function BillCategoryPage() {
  const router = useRouter()

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <Header
        variant="large-title"
        largeTitle="Thanh toan hoa don"
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
      <div className="flex-1 overflow-y-auto pb-[21px]">
        <div className="pt-[32px] px-[22px]">
          <ItemList>
            {SUB_CATEGORIES.map((cat, idx) => (
              <ItemListItem
                key={cat.type}
                label={cat.label}
                prefix={
                  <div className={`w-11 h-11 rounded-full ${cat.bgColor} flex items-center justify-center`}>
                    <cat.Icon size={20} className={cat.iconColor} />
                  </div>
                }
                showChevron
                divider={idx < SUB_CATEGORIES.length - 1}
                onPress={() => router.push(`/vas/bill/provider?type=${cat.type}`)}
              />
            ))}
          </ItemList>
        </div>
      </div>

      {/* ── Home indicator ──────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
