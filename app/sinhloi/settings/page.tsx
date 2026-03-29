"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"

/* ── Toggle ─────────────────────────────────────────────────────── */
function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = React.useState(initial)
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors shrink-0 ${on ? "bg-success" : "bg-secondary"}`}
      style={{ border: on ? "none" : "2px solid var(--border)" }}
    >
      <div className={`w-[27px] h-[27px] rounded-full bg-background shadow-sm transition-transform ${on ? "translate-x-[20px]" : "translate-x-0"}`} />
    </button>
  )
}

/* ── S20: Cai dat Sinh loi ─────────────────────────────────────── */
export default function SettingsPage() {
  const router = useRouter()

  const sections = [
    {
      title: "Uu tien su dung So du sinh loi",
      items: [
        {
          label: "Nhan tien tu dong vao So du sinh loi",
          description: "Tien chuyen den tu ban be, QR ca nhan se tu dong vao So du sinh loi",
          initial: false,
        },
        {
          label: "Uu tien thanh toan bang So du sinh loi",
          description: "Khi thanh toan, uu tien tru tien tu So du sinh loi truoc",
          initial: false,
        },
      ],
    },
    {
      title: "Cai dat nhanh",
      items: [
        {
          label: "Hien thi thong tin",
          description: "Luon thay Tien hien co va Tien loi, khong can xac thuc",
          initial: true,
        },
      ],
    },
  ]

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle="Cai dat"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[21px]">
        {sections.map((section) => (
          <div key={section.title} className="pt-[32px] first:pt-0">
            <p className="px-[22px] text-md font-semibold text-foreground mb-[12px]">{section.title}</p>
            <div className="px-[22px]">
              <div className="bg-secondary rounded-[28px] p-[20px] space-y-[20px]">
                {section.items.map((item, idx) => (
                  <div key={idx}>
                    {idx > 0 && <div className="h-[1px] bg-border mb-[20px]" />}
                    <div className="flex items-start gap-[12px]">
                      <div className="flex-1">
                        <p className="text-md text-foreground">{item.label}</p>
                        <p className="text-sm text-foreground-secondary mt-[4px]">{item.description}</p>
                      </div>
                      <Toggle initial={item.initial} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="pt-[32px] px-[22px]">
          <p className="text-sm text-foreground-secondary">
            Cac thay doi se duoc ap dung ngay lap tuc. Ban co the thay doi bat ky luc nao.
          </p>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
