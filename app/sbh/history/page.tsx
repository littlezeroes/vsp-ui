"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Home, Zap, GraduationCap, Receipt } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { FeedbackState } from "@/components/ui/feedback-state"
import {
  TRANSACTIONS,
  formatVND,
  getServiceIcon,
  type ServiceType,
} from "../data"

/* ── Helpers ──────────────────────────────────────────────────────────── */
function getServiceLucideIcon(service: ServiceType) {
  switch (service) {
    case "housing": return Home
    case "battery": return Zap
    case "education": return GraduationCap
  }
}

function getStatusConfig(status: "success" | "failed" | "pending") {
  switch (status) {
    case "success": return { text: "Thanh cong", className: "text-success bg-success/10" }
    case "failed": return { text: "That bai", className: "text-danger bg-danger/10" }
    case "pending": return { text: "Dang xu ly", className: "text-warning bg-warning/10" }
  }
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function HistoryPage() {
  const router = useRouter()

  const transactions = TRANSACTIONS

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <Header
        variant="default"
        title="Lich su thanh toan"
        leading={
          <button
            type="button"
            onClick={() => router.push("/sbh")}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* ── Scrollable content ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-[21px]">
        {transactions.length === 0 ? (
          <div className="pt-[32px] px-[22px]">
            <FeedbackState
              icon={
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <Receipt size={32} className="text-foreground-secondary" />
                </div>
              }
              title="Chua co giao dich nao"
              description="Cac giao dich thanh toan hoa don se hien thi tai day"
            />
          </div>
        ) : (
          <div className="pt-[16px] px-[22px]">
            <ItemList>
              {transactions.map((tx, idx) => {
                const Icon = getServiceLucideIcon(tx.service)
                const { bg, color } = getServiceIcon(tx.service)
                const statusConfig = getStatusConfig(tx.status)

                return (
                  <ItemListItem
                    key={tx.id}
                    label={tx.profileLabel}
                    sublabel={`${tx.billTitle} · ${tx.date}`}
                    metadata={formatVND(tx.amount)}
                    prefix={
                      <div className={`w-11 h-11 rounded-full ${bg} flex items-center justify-center`}>
                        <Icon size={20} className={color} />
                      </div>
                    }
                    suffix={
                      <span className={`text-xs font-semibold px-[8px] py-[2px] rounded-full ${statusConfig.className}`}>
                        {statusConfig.text}
                      </span>
                    }
                    divider={idx < transactions.length - 1}
                  />
                )
              })}
            </ItemList>
          </div>
        )}
      </div>

      {/* ── Home indicator ──────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
