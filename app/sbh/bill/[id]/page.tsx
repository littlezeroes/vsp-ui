"use client"

import * as React from "react"
import { use } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Button } from "@/components/ui/button"
import {
  HOUSING_BILLS,
  EDUCATION_BILLS,
  formatVND,
  getStatusBadge,
} from "../../data"

function BillDetailContent({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") ?? "housing"

  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(
    new Set()
  )

  const housingBill = type === "housing"
    ? HOUSING_BILLS.find((b) => b.id === id)
    : null
  const educationBill = type === "education"
    ? EDUCATION_BILLS.find((b) => b.id === id)
    : null

  const bill = housingBill ?? educationBill
  const amount = bill?.amount ?? 0
  const badge = bill ? getStatusBadge(bill.status) : null

  function toggleItem(idx: number) {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Chi tiet hoa don"
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

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {type === "housing" && housingBill && (
          <>
            {/* Bill info card */}
            <div className="px-[22px] pt-[32px]">
              <div className="bg-secondary rounded-[28px] p-[16px]">
                <p className="text-md font-semibold leading-6 text-foreground">
                  {housingBill.title}
                </p>
                <p className="text-sm font-normal leading-5 text-foreground-secondary">
                  Ky: {housingBill.period} · Han: {housingBill.dueDate}
                </p>
                {badge && (
                  <p className={`text-sm font-semibold leading-5 pt-[4px] ${badge.className}`}>
                    {badge.text}
                  </p>
                )}
              </div>
            </div>

            {/* Line items — expandable */}
            <div className="pt-[32px] px-[22px]">
              <p className="text-sm font-semibold text-foreground pb-[8px]">
                Chi tiet
              </p>
              <ItemList>
                {housingBill.lineItems.map((item, idx) => (
                  <ItemListItem
                    key={idx}
                    label={item.label}
                    metadata={formatVND(item.amount)}
                    suffix={
                      <button
                        type="button"
                        onClick={() => toggleItem(idx)}
                        className="p-1"
                      >
                        {expandedItems.has(idx) ? (
                          <ChevronUp size={18} className="text-foreground-secondary" />
                        ) : (
                          <ChevronDown size={18} className="text-foreground-secondary" />
                        )}
                      </button>
                    }
                    divider={idx < housingBill.lineItems.length - 1}
                  />
                ))}
              </ItemList>
            </div>

            {/* Total */}
            <div className="pt-[32px] px-[22px]">
              <div className="bg-secondary rounded-[28px] p-[16px] flex items-center justify-between">
                <p className="text-md font-semibold leading-6 text-foreground">
                  Tong cong
                </p>
                <p className="text-lg font-bold leading-6 text-foreground">
                  {formatVND(housingBill.amount)}
                </p>
              </div>
            </div>
          </>
        )}

        {type === "education" && educationBill && (
          <>
            {/* Education bill card */}
            <div className="px-[22px] pt-[32px]">
              <div className="bg-secondary rounded-[28px] p-[16px] flex flex-col gap-[12px]">
                <div>
                  <p className="text-md font-semibold leading-6 text-foreground">
                    {educationBill.title}
                  </p>
                  {badge && (
                    <p className={`text-sm font-semibold leading-5 pt-[4px] ${badge.className}`}>
                      {badge.text}
                    </p>
                  )}
                </div>

                <ItemList>
                  <ItemListItem
                    label="Ky thanh toan"
                    metadata={educationBill.period}
                    divider
                  />
                  <ItemListItem
                    label="So tien"
                    metadata={formatVND(educationBill.amount)}
                    divider
                  />
                  <ItemListItem
                    label="Han thanh toan"
                    metadata={educationBill.dueDate}
                    divider
                  />
                  <ItemListItem
                    label="Trang thai"
                    metadata={badge?.text ?? ""}
                  />
                </ItemList>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fixed bottom CTA */}
      {bill && (
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[8px] bg-background">
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={() =>
              router.push(
                `/sbh/confirm?service=${type}&amount=${amount}`
              )
            }
          >
            Thanh toan
          </Button>
        </div>
      )}

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function BillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <React.Suspense fallback={null}>
      <BillDetailContent params={params} />
    </React.Suspense>
  )
}
