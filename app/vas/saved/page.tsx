"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, FileText } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { FeedbackState } from "@/components/ui/feedback-state"

/* ── Mock data ─────────────────────────────────────────────────────────── */
const SAVED_BILLS = [
  { id: "1", group: "Dien", provider: "EVN HCMC", customerId: "PA01234567" },
  { id: "2", group: "Nuoc", provider: "SAWACO", customerId: "NV0098765" },
  { id: "3", group: "Nuoc", provider: "VIWACO", customerId: "NV0045678" },
  { id: "4", group: "Internet", provider: "FPT Telecom", customerId: "FPT123456" },
]

const SAVED_PHONES = [
  { id: "1", phone: "0912 345 678", carrier: "Viettel" },
  { id: "2", phone: "0987 654 321", carrier: "Mobifone" },
  { id: "3", phone: "0909 111 222", carrier: "Vinaphone" },
]

/* ── Group bills by category ───────────────────────────────────────────── */
function groupBills(bills: typeof SAVED_BILLS) {
  const groups: Record<string, typeof SAVED_BILLS> = {}
  bills.forEach((b) => {
    if (!groups[b.group]) groups[b.group] = []
    groups[b.group].push(b)
  })
  return groups
}

/* ── Icon colors per group ─────────────────────────────────────────────── */
const GROUP_COLORS: Record<string, string> = {
  Dien: "bg-warning",
  Nuoc: "bg-info",
  Internet: "bg-success",
}

/* ── Tab type ──────────────────────────────────────────────────────────── */
type Tab = "bill" | "phone"
type StateParam = "bill-tab" | "phone-tab" | "empty-bill" | "empty-phone"

/* ── Page ──────────────────────────────────────────────────────────────── */
function SavedManageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const stateParam = searchParams.get("state") as StateParam | null

  /* Derive initial tab from state param */
  const initialTab: Tab =
    stateParam === "phone-tab" || stateParam === "empty-phone" ? "phone" : "bill"
  const [activeTab, setActiveTab] = React.useState<Tab>(initialTab)

  /* Derive whether to show empty states */
  const isEmptyBill = stateParam === "empty-bill"
  const isEmptyPhone = stateParam === "empty-phone"

  const bills = isEmptyBill ? [] : SAVED_BILLS
  const phones = isEmptyPhone ? [] : SAVED_PHONES

  const groupedBills = groupBills(bills)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="large-title"
        largeTitle="Quan ly"
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

      {/* Pill tab switcher */}
      <div className="px-[22px] pt-[16px]">
        <div className="flex bg-secondary rounded-full p-[4px]">
          {(["bill", "phone"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-[8px] text-sm font-semibold leading-5 rounded-full text-center transition-colors ${
                activeTab === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground-secondary"
              }`}
            >
              {tab === "bill" ? "Hoa don" : "So dien thoai"}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[21px]">
        {activeTab === "bill" ? (
          bills.length > 0 ? (
            Object.entries(groupedBills).map(([group, items]) => (
              <div key={group} className="pt-[32px] px-[22px]">
                <p className="text-sm font-semibold leading-5 text-foreground-secondary mb-[12px]">
                  {group}
                </p>
                <ItemList>
                  {items.map((bill, idx) => (
                    <ItemListItem
                      key={bill.id}
                      label={bill.provider}
                      sublabel={bill.customerId}
                      prefix={
                        <div
                          className={`w-11 h-11 rounded-full ${GROUP_COLORS[bill.group] ?? "bg-info"} flex items-center justify-center`}
                        >
                          <span className="text-xs font-bold text-background">
                            {bill.provider.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      }
                      showChevron
                      divider={idx < items.length - 1}
                      onPress={() => router.push(`/vas/saved/detail?id=${bill.id}&tab=bill`)}
                    />
                  ))}
                </ItemList>
              </div>
            ))
          ) : (
            <div className="pt-[32px] px-[22px]">
              <FeedbackState
                icon={
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <FileText size={32} className="text-foreground-secondary" />
                  </div>
                }
                title="Chua luu hoa don nao"
                description="Hoa don ban luu se hien thi o day"
              />
            </div>
          )
        ) : phones.length > 0 ? (
          <div className="pt-[32px] px-[22px]">
            <ItemList>
              {phones.map((phone, idx) => (
                <ItemListItem
                  key={phone.id}
                  label={phone.phone}
                  sublabel={phone.carrier}
                  prefix={
                    <div className="w-11 h-11 rounded-full bg-success flex items-center justify-center">
                      <span className="text-xs font-bold text-background">
                        {phone.carrier.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  }
                  showChevron
                  divider={idx < phones.length - 1}
                  onPress={() => router.push(`/vas/saved/detail?id=${phone.id}&tab=phone`)}
                />
              ))}
            </ItemList>
          </div>
        ) : (
          <div className="pt-[32px] px-[22px]">
            <FeedbackState
              icon={
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <FileText size={32} className="text-foreground-secondary" />
                </div>
              }
              title="Chua luu so dien thoai nao"
              description="So dien thoai ban luu se hien thi o day"
            />
          </div>
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function SavedManagePage() {
  return (
    <React.Suspense fallback={null}>
      <SavedManageContent />
    </React.Suspense>
  )
}
