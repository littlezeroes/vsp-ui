"use client"

import * as React from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, GraduationCap } from "lucide-react"
import { Header } from "@/components/ui/header"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { FeedbackState } from "@/components/ui/feedback-state"
import {
  STUDENTS,
  getBillsByStudent,
  formatVND,
  getStatusBadge,
} from "../../../data"

export default function EducationBillsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  const student = STUDENTS.find((s) => s.id === id)
  const bills = getBillsByStudent(id)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header
        variant="default"
        title="Hoa don"
        leading={
          <button
            type="button"
            onClick={() => router.push("/sbh/education")}
            className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[40px]">
        {/* Profile card */}
        {student && (
          <div className="px-[22px] pt-[32px]">
            <div className="bg-secondary rounded-[28px] p-[16px] flex items-center gap-[12px]">
              <div className="w-11 h-11 rounded-full bg-background flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-md font-semibold leading-6 text-foreground truncate">
                  {student.name}
                </p>
                <p className="text-sm font-normal leading-5 text-foreground-secondary">
                  {student.studentId} · {student.provider}
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
                return (
                  <ItemListItem
                    key={bill.id}
                    label={bill.title}
                    sublabel={`Han: ${bill.dueDate}`}
                    metadata={formatVND(bill.amount)}
                    subMetadata={badge.text}
                    showChevron
                    divider={idx < bills.length - 1}
                    onPress={() =>
                      router.push(`/sbh/bill/${bill.id}?type=education`)
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
