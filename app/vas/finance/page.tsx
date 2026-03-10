"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"

/* ── Provider data ─────────────────────────────────────────────────────── */
const FINANCE_PROVIDERS = [
  { id: "acs", name: "ACS", fullName: "ACS Finance" },
  { id: "fe-credit", name: "FE Credit", fullName: "FE Credit" },
  { id: "home-credit", name: "Home Credit", fullName: "Home Credit Vietnam" },
  { id: "mcredit", name: "Mcredit", fullName: "MB Shinsei Finance" },
  { id: "miraeasset", name: "Miraeasset", fullName: "Mirae Asset Finance" },
  { id: "ocb", name: "OCB", fullName: "Ngân hàng Phương Đông" },
  { id: "shinhan", name: "Shinhan Finance", fullName: "Shinhan Vietnam Finance" },
  { id: "tpfico", name: "TPFICO", fullName: "TP Finance Company" },
  { id: "ptfinance", name: "PTFINANCE", fullName: "PT Finance" },
  { id: "lotte", name: "Lotte Finance", fullName: "Lotte Finance Vietnam" },
  { id: "fccom", name: "FCCOM", fullName: "FCCOM Finance" },
  { id: "shbfinance", name: "SHBFINANCE", fullName: "SHB Finance" },
] as const

const LOGO_COLORS = [
  "bg-danger",
  "bg-info",
  "bg-success",
  "bg-foreground",
] as const

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function FinanceProviderListPage() {
  const router = useRouter()

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="large-title"
        largeTitle="Tài chính"
        leading={
          <button
            type="button"
            onClick={() => router.push("/vas")}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[21px]">
        <div className="pt-[32px] px-[22px]">
          <ItemList>
            {FINANCE_PROVIDERS.map((provider, idx) => (
              <ItemListItem
                key={provider.id}
                label={provider.name}
                sublabel={provider.fullName}
                prefix={
                  <div
                    className={`w-11 h-11 rounded-full ${LOGO_COLORS[idx % LOGO_COLORS.length]} flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold text-background">
                      {provider.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                }
                showChevron
                divider={idx < FINANCE_PROVIDERS.length - 1}
                onPress={() => router.push(`/vas/finance/input?provider=${provider.id}`)}
              />
            ))}
          </ItemList>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
