"use client"

import * as React from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Zap, Bike } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { Button } from "@/components/ui/button"
import {
  BATTERY_BILLS,
  VEHICLES,
  formatVND,
  getStatusBadge,
  getVehicleTypeLabel,
} from "../../../data"

export default function BatteryBillDetailPage({
  params,
}: {
  params: Promise<{ billId: string }>
}) {
  const { billId } = use(params)
  const router = useRouter()

  const bill = BATTERY_BILLS.find((b) => b.id === billId)
  const vehicle = bill ? VEHICLES.find((v) => v.id === bill.vehicleId) : null
  const badge = bill ? getStatusBadge(bill.status) : null

  const VehicleIcon = vehicle?.type === "bike" ? Bike : Zap
  const detailEntries = bill ? Object.entries(bill.details) : []

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
        {/* Vehicle info card */}
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

        {/* Bill title + status */}
        {bill && (
          <div className="pt-[32px] px-[22px]">
            <p className="text-md font-semibold leading-6 text-foreground">
              {bill.title}
            </p>
            <p className="text-sm font-normal leading-5 text-foreground-secondary">
              Ngay phat hanh: {bill.issuedAt} · Han: {bill.dueDate}
            </p>
            {badge && (
              <p className={`text-sm font-semibold leading-5 pt-[4px] ${badge.className}`}>
                {badge.text}
              </p>
            )}
          </div>
        )}

        {/* Detail rows from bill.details Record */}
        {detailEntries.length > 0 && (
          <div className="pt-[32px] px-[22px]">
            <p className="text-sm font-semibold text-foreground pb-[8px]">
              Chi tiet
            </p>
            <ItemList>
              {detailEntries.map(([key, value], idx) => (
                <ItemListItem
                  key={key}
                  label={key}
                  metadata={value}
                  divider={idx < detailEntries.length - 1}
                />
              ))}
            </ItemList>
          </div>
        )}

        {/* Total amount card */}
        {bill && (
          <div className="pt-[32px] px-[22px]">
            <div className="bg-secondary rounded-[28px] p-[16px] flex items-center justify-between">
              <p className="text-md font-semibold leading-6 text-foreground">
                Tong cong
              </p>
              <p className="text-lg font-bold leading-6 text-foreground">
                {formatVND(bill.amount)}
              </p>
            </div>
          </div>
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
                `/sbh/confirm?service=battery&amount=${bill.amount}`
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
