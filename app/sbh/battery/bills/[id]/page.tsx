"use client"

import * as React from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Zap, Bike } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { FeedbackState } from "@/components/ui/feedback-state"
import {
  VEHICLES,
  getBillsByVehicle,
  formatVND,
  getStatusBadge,
  getVehicleTypeLabel,
} from "../../../data"

export default function BatteryBillsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  const vehicle = VEHICLES.find((v) => v.id === id)
  const bills = getBillsByVehicle(id)

  const VehicleIcon = vehicle?.type === "bike" ? Bike : Zap

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Hoa don"
        leading={
          <button
            type="button"
            onClick={() => router.push("/sbh/battery")}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[40px]">
        {/* Profile card */}
        {vehicle && (
          <div className="px-[22px] pt-[32px]">
            <div className="bg-secondary rounded-[28px] p-[16px] flex items-center gap-[12px]">
              <div className="w-11 h-11 rounded-full bg-background flex items-center justify-center shrink-0">
                <VehicleIcon size={20} className="text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-md font-semibold leading-6 text-foreground truncate">
                  {vehicle.model}
                </p>
                <p className="text-sm font-normal leading-5 text-foreground-secondary">
                  {vehicle.vinCode} · {getVehicleTypeLabel(vehicle.type)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bill list */}
        {bills.length > 0 ? (
          <div className="pt-[32px] px-[22px]">
            <p className="text-sm font-semibold text-foreground pb-[8px]">
              Danh sach hoa don
            </p>
            <ItemList>
              {bills.map((bill, idx) => {
                const badge = getStatusBadge(bill.status)
                const overdueDays =
                  bill.status === "overdue"
                    ? (() => {
                        const parts = bill.dueDate.split("/")
                        const due = new Date(
                          Number(parts[2]),
                          Number(parts[1]) - 1,
                          Number(parts[0])
                        )
                        const now = new Date()
                        const diff = Math.floor(
                          (now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
                        )
                        return diff > 0 ? diff : 0
                      })()
                    : 0

                return (
                  <ItemListItem
                    key={bill.id}
                    label={bill.title}
                    sublabel={
                      bill.status === "overdue" && overdueDays > 0
                        ? `Qua han ${overdueDays} ngay`
                        : `Han: ${bill.dueDate}`
                    }
                    metadata={formatVND(bill.amount)}
                    subMetadata={badge.text}
                    showChevron
                    divider={idx < bills.length - 1}
                    onPress={() =>
                      router.push(`/sbh/battery/bill/${bill.id}`)
                    }
                  />
                )
              })}
            </ItemList>
          </div>
        ) : (
          <div className="pt-[32px] px-[22px]">
            <FeedbackState title="Chua co hoa don nao" />
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
