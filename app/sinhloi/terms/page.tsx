"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { ItemListItem } from "@/components/ui/item-list"

/* ── S14: Dieu khoan va Hop dong ──────────────────────────────────── */
export default function TermsPage() {
  return <React.Suspense fallback={null}><TermsContent /></React.Suspense>
}

function TermsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const doc = searchParams.get("doc")

  // If doc param exists, show full screen document
  if (doc === "policy") {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <Header
          variant="default"
          title="Dieu khoan su dung"
          leading={
            <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
              <ChevronLeft size={24} className="text-foreground" />
            </button>
          }
        />
        <div className="flex-1 overflow-y-auto px-[22px] pb-[40px] pt-[16px]">
          <div className="space-y-4 text-md text-foreground">
            <p className="font-semibold">Dieu 1: Pham vi ap dung</p>
            <p>Dieu khoan nay ap dung cho toan bo nguoi dung su dung tinh nang Sinh loi tu dong tren ung dung V-Smart Pay.</p>
            <p className="font-semibold">Dieu 2: Mo hinh hoat dong</p>
            <p>San pham hoat dong theo mo hinh cho vay. Tien cua nguoi dung se duoc cho vay thong qua doi tac tai chinh da duoc cap phep.</p>
            <p className="font-semibold">Dieu 3: Lai suat</p>
            <p>Lai suat duoc cong bo tren ung dung va co the thay doi theo thoa thuan giua V-Smart Pay va doi tac. Moi thay doi se duoc thong bao truoc cho nguoi dung.</p>
            <p className="font-semibold">Dieu 4: Rut tien</p>
            <p>Nguoi dung co the rut tien bat ky luc nao trong han muc cho phep. Tien se duoc chuyen ve Vi V-Smart Pay.</p>
            <p className="font-semibold">Dieu 5: Bao mat</p>
            <p>Moi giao dich deu duoc xac thuc bang OTP hoac PIN/Biometric. Thong tin ca nhan duoc bao ve theo quy dinh phap luat.</p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  if (doc === "contract") {
    return (
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
        <Header
          variant="default"
          title="Hop dong cho vay"
          leading={
            <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
              <ChevronLeft size={24} className="text-foreground" />
            </button>
          }
        />
        <div className="flex-1 overflow-y-auto px-[22px] pb-[40px] pt-[16px]">
          <div className="space-y-4 text-md text-foreground">
            <p className="font-semibold">HOP DONG CHO VAY</p>
            <p>Giua: Nguoi dung V-Smart Pay (Ben A) va Cong ty {"{provider}"} (Ben B)</p>
            <p className="font-semibold">Dieu 1: Noi dung cho vay</p>
            <p>Ben A dong y cho Ben B vay so tien tuong ung voi so du trong Vi sinh loi. Ben B cam ket tra lai theo lai suat da thoa thuan.</p>
            <p className="font-semibold">Dieu 2: Lai suat va thoi han</p>
            <p>Lai suat duoc tinh tren so du cuoi ngay va tra vao cuoi moi thang. Hop dong khong co thoi han co dinh — Ben A co the rut tien bat ky luc nao.</p>
            <p className="font-semibold">Dieu 3: Quyen va nghia vu</p>
            <p>Ben A co quyen rut tien, xem lich su giao dich, va tat tinh nang bat ky luc nao. Ben B co nghia vu tra lai dung han va bao cao minh bach.</p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    )
  }

  // Default: Terms navigation page (S14)
  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="default"
        title="Dieu khoan va hop dong"
        leading={
          <button type="button" onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[100px]">
        <div className="px-[22px] pt-[16px]">
          <ItemListItem
            label="Dieu khoan su dung"
            showChevron
            onPress={() => router.push("/sinhloi/terms?doc=policy")}
            divider
          />
          <ItemListItem
            label="Hop dong cho vay"
            showChevron
            onPress={() => router.push("/sinhloi/terms?doc=contract")}
          />
        </div>
      </div>

      {/* Destructive CTA */}
      <div className="absolute bottom-0 inset-x-0 bg-background px-[22px] pb-[34px] pt-[12px]">
        <Button
          variant="primary"
          intent="danger"
          size="48"
          className="w-full"
          onClick={() => router.push("/sinhloi/cancel")}
        >
          Tat sinh loi
        </Button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
