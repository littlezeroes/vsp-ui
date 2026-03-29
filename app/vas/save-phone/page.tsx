"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Check, User, Phone } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"

/* ── Carrier detection ────────────────────────────────────────────── */
const CARRIERS: Record<string, { name: string; prefixes: string[] }> = {
  viettel: { name: "Viettel", prefixes: ["091", "096", "086", "032", "033", "034", "035", "036", "037", "038", "039"] },
  mobifone: { name: "Mobifone", prefixes: ["090", "093", "070", "076", "077", "078", "079"] },
  vinaphone: { name: "Vinaphone", prefixes: ["092", "088", "081", "082", "083", "084", "085"] },
}

function detectCarrier(phone: string): { id: string; name: string } | null {
  const digits = phone.replace(/\s/g, "")
  if (digits.length < 3) return null
  for (const [id, carrier] of Object.entries(CARRIERS)) {
    for (const prefix of carrier.prefixes) {
      if (digits.startsWith(prefix)) return { id, name: carrier.name }
    }
  }
  return null
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10)
  if (d.length <= 4) return d
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`
}

/* ── Steps ────────────────────────────────────────────────────────── */
type Step = "input" | "confirm" | "success"

export default function SavePhonePage() {
  const router = useRouter()
  const [step, setStep] = React.useState<Step>("input")
  const [rawPhone, setRawPhone] = React.useState("")
  const [nickname, setNickname] = React.useState("")

  const phone = formatPhone(rawPhone)
  const digits = rawPhone.replace(/\D/g, "")
  const carrier = detectCarrier(digits)
  const isValid = digits.length === 10 && carrier !== null

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10)
    setRawPhone(val)
  }

  function handleConfirm() {
    if (!isValid) return
    setStep("confirm")
  }

  function handleSave() {
    setStep("success")
  }

  function handleDone() {
    router.push("/vas/saved?state=phone-tab")
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle={step === "success" ? "Da luu" : "Luu so dien thoai"}
        leading={
          <button
            type="button"
            onClick={() => {
              if (step === "input") router.back()
              else if (step === "confirm") setStep("input")
              else handleDone()
            }}
            className="w-[44px] h-[44px] flex items-center justify-center"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[120px]">
        {/* ── Step 1: Nhap so dien thoai ───────────── */}
        {step === "input" && (
          <div className="px-[22px] pt-[8px]">
            <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px]">SO DIEN THOAI</p>
            <TextField
              placeholder="0912 345 678"
              value={phone}
              onChange={handlePhoneChange}
              inputMode="numeric"
            />

            {/* Carrier auto-detect */}
            {carrier && digits.length >= 3 && (
              <div className="flex items-center gap-[8px] mt-[12px] p-[12px] bg-secondary rounded-[16px]">
                <div className="w-[32px] h-[32px] rounded-[8px] bg-foreground text-background flex items-center justify-center">
                  <Phone size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-foreground">{carrier.name}</p>
                  <p className="text-[11px] text-foreground-secondary">Tu dong nhan dien</p>
                </div>
              </div>
            )}

            {/* Nickname */}
            <div className="pt-[32px]">
              <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px]">TEN GOI NHO (TUY CHON)</p>
              <TextField
                placeholder="VD: So cua me, So cong ty..."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            {/* Recent contacts suggestion */}
            <div className="pt-[32px]">
              <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px]">GOI Y</p>
              <div className="space-y-[8px]">
                {[
                  { phone: "0912 345 678", name: "Nguyen Van A", carrier: "Viettel" },
                  { phone: "0987 654 321", name: "Tran Thi B", carrier: "Mobifone" },
                ].map((contact) => (
                  <button
                    key={contact.phone}
                    type="button"
                    onClick={() => { setRawPhone(contact.phone.replace(/\s/g, "")); setNickname(contact.name) }}
                    className="w-full flex items-center gap-[12px] p-[14px] bg-secondary rounded-[20px]"
                  >
                    <div className="w-[36px] h-[36px] rounded-[10px] bg-background flex items-center justify-center shrink-0">
                      <User size={16} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[14px] font-semibold text-foreground">{contact.name}</p>
                      <p className="text-[12px] text-foreground-secondary tabular-nums">{contact.phone} · {contact.carrier}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Xac nhan ─────────────────────── */}
        {step === "confirm" && (
          <div className="px-[22px] pt-[8px]">
            <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px]">XAC NHAN THONG TIN</p>
            <div className="bg-secondary rounded-[28px] p-[20px] space-y-[12px]">
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-foreground-secondary">So dien thoai</p>
                <p className="text-[15px] font-bold text-foreground tabular-nums">{phone}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-foreground-secondary">Nha mang</p>
                <p className="text-[13px] font-semibold text-foreground">{carrier?.name}</p>
              </div>
              {nickname && (
                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-foreground-secondary">Ten goi nho</p>
                  <p className="text-[13px] font-semibold text-foreground">{nickname}</p>
                </div>
              )}
            </div>

            <div className="mt-[24px] p-[14px] bg-secondary rounded-[16px]">
              <p className="text-[12px] text-foreground-secondary">
                So dien thoai se duoc luu vao danh sach de nap tien nhanh hon lan sau.
              </p>
            </div>
          </div>
        )}

        {/* ── Step 3: Thanh cong ───────────────────── */}
        {step === "success" && (
          <div className="px-[22px] pt-[32px]">
            <div className="text-center mb-[32px]">
              <div className="w-[64px] h-[64px] rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-[16px]">
                <Check size={32} />
              </div>
              <p className="text-[20px] font-bold text-foreground">Luu thanh cong</p>
              <p className="text-[14px] text-foreground-secondary mt-[4px]">So dien thoai da duoc luu</p>
            </div>

            <div className="bg-secondary rounded-[28px] p-[20px] space-y-[12px]">
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-foreground-secondary">So dien thoai</p>
                <p className="text-[15px] font-bold text-foreground tabular-nums">{phone}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-foreground-secondary">Nha mang</p>
                <p className="text-[13px] font-semibold text-foreground">{carrier?.name}</p>
              </div>
              {nickname && (
                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-foreground-secondary">Ten goi nho</p>
                  <p className="text-[13px] font-semibold text-foreground">{nickname}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ────────────────────────────── */}
      {step === "input" && (
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[13px] pt-[12px] bg-background">
          <Button variant="primary" size="48" className="w-full" onClick={handleConfirm} disabled={!isValid}>
            Tiep tuc
          </Button>
        </div>
      )}

      {step === "confirm" && (
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[13px] pt-[12px] bg-background">
          <Button variant="primary" size="48" className="w-full" onClick={handleSave}>
            Luu so dien thoai
          </Button>
        </div>
      )}

      {step === "success" && (
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[13px] pt-[12px] bg-background space-y-[8px]">
          <Button variant="primary" size="48" className="w-full" onClick={() => router.push("/vas/topup")}>
            Nap tien ngay
          </Button>
          <Button variant="secondary" size="48" className="w-full" onClick={handleDone}>
            Xong
          </Button>
        </div>
      )}

      {/* ── Home indicator ────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
