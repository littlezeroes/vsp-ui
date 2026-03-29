"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Zap, Droplets, Wifi, Tv, Loader2, Search, Check } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { BottomSheet } from "@/components/ui/bottom-sheet"

/* ── Provider data ───────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "electric", label: "Dien", Icon: Zap },
  { id: "water", label: "Nuoc", Icon: Droplets },
  { id: "internet", label: "Internet", Icon: Wifi },
  { id: "tv", label: "Truyen hinh", Icon: Tv },
] as const

const PROVIDERS: Record<string, { id: string; name: string }[]> = {
  electric: [
    { id: "evn-hcm", name: "EVN HCMC" },
    { id: "evn-hn", name: "EVN Ha Noi" },
    { id: "evn-mt", name: "EVN Mien Trung" },
  ],
  water: [
    { id: "sawaco", name: "SAWACO" },
    { id: "viwaco", name: "VIWACO" },
  ],
  internet: [
    { id: "fpt", name: "FPT Telecom" },
    { id: "vnpt", name: "VNPT" },
    { id: "viettel-net", name: "Viettel Internet" },
  ],
  tv: [
    { id: "vtv-cab", name: "VTVCab" },
    { id: "sctv", name: "SCTV" },
  ],
}

/* ── Steps ────────────────────────────────────────────────────────── */
type Step = "category" | "provider" | "input" | "verifying" | "success"

export default function SaveBillPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<Step>("category")
  const [category, setCategory] = React.useState("")
  const [provider, setProvider] = React.useState("")
  const [providerName, setProviderName] = React.useState("")
  const [customerId, setCustomerId] = React.useState("")
  const [nickname, setNickname] = React.useState("")
  const [showNickname, setShowNickname] = React.useState(false)

  const categoryLabel = CATEGORIES.find((c) => c.id === category)?.label ?? ""

  function handleSelectCategory(id: string) {
    setCategory(id)
    setStep("provider")
  }

  function handleSelectProvider(id: string, name: string) {
    setProvider(id)
    setProviderName(name)
    setStep("input")
  }

  function handleVerify() {
    if (customerId.trim().length < 5) return
    setStep("verifying")
    setTimeout(() => setStep("success"), 1500)
  }

  function handleSave() {
    router.push("/vas/saved")
  }

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="large-title"
        largeTitle={
          step === "category" ? "Luu hoa don" :
          step === "provider" ? categoryLabel :
          step === "input" || step === "verifying" ? providerName :
          "Da luu"
        }
        leading={
          <button
            type="button"
            onClick={() => {
              if (step === "category") router.back()
              else if (step === "provider") setStep("category")
              else if (step === "input" || step === "verifying") setStep("provider")
              else router.push("/vas/saved")
            }}
            className="w-[44px] h-[44px] flex items-center justify-center"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[120px]">
        {/* ── Step 1: Chon loai hoa don ─────────────── */}
        {step === "category" && (
          <div className="px-[22px] pt-[8px]">
            <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px]">CHON LOAI HOA DON</p>
            <div className="space-y-[8px]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className="w-full flex items-center gap-[12px] p-[16px] bg-secondary rounded-[20px]"
                >
                  <div className="w-[40px] h-[40px] rounded-[10px] bg-background flex items-center justify-center shrink-0">
                    <cat.Icon size={18} />
                  </div>
                  <p className="flex-1 text-[14px] font-semibold text-foreground text-left">{cat.label}</p>
                  <ChevronRight size={16} className="text-foreground-secondary" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Chon nha cung cap ────────────── */}
        {step === "provider" && (
          <div className="px-[22px] pt-[8px]">
            <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px]">CHON NHA CUNG CAP</p>
            <div className="space-y-[8px]">
              {(PROVIDERS[category] ?? []).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectProvider(p.id, p.name)}
                  className="w-full flex items-center gap-[12px] p-[16px] bg-secondary rounded-[20px]"
                >
                  <div className="w-[40px] h-[40px] rounded-[10px] bg-background flex items-center justify-center shrink-0">
                    <Search size={16} />
                  </div>
                  <p className="flex-1 text-[14px] font-semibold text-foreground text-left">{p.name}</p>
                  <ChevronRight size={16} className="text-foreground-secondary" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Nhap ma khach hang ───────────── */}
        {(step === "input" || step === "verifying") && (
          <div className="px-[22px] pt-[8px]">
            <div className="bg-secondary rounded-[28px] p-[20px] mb-[24px]">
              <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[4px]">NHA CUNG CAP</p>
              <p className="text-[16px] font-bold text-foreground">{providerName}</p>
              <p className="text-[12px] text-foreground-secondary mt-[2px]">{categoryLabel}</p>
            </div>

            <p className="text-[10px] font-bold text-foreground-secondary uppercase tracking-[0.2em] mb-[12px]">MA KHACH HANG</p>
            <TextField
              placeholder="Nhap ma khach hang"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              disabled={step === "verifying"}
            />
            <p className="text-[11px] text-foreground-secondary mt-[6px]">Ma in tren hoa don giay hoac hop dong</p>

            {step === "verifying" && (
              <div className="flex items-center gap-[8px] mt-[20px] justify-center">
                <Loader2 size={18} className="animate-spin text-foreground-secondary" />
                <span className="text-[14px] text-foreground-secondary">Dang xac minh...</span>
              </div>
            )}
          </div>
        )}

        {/* ── Step 4: Thanh cong ───────────────────── */}
        {step === "success" && (
          <div className="px-[22px] pt-[32px]">
            <div className="text-center mb-[32px]">
              <div className="w-[64px] h-[64px] rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-[16px]">
                <Check size={32} />
              </div>
              <p className="text-[20px] font-bold text-foreground">Xac minh thanh cong</p>
              <p className="text-[14px] text-foreground-secondary mt-[4px]">Hoa don da duoc luu vao danh sach</p>
            </div>

            <div className="bg-secondary rounded-[28px] p-[20px] space-y-[12px]">
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-foreground-secondary">Loai</p>
                <p className="text-[13px] font-semibold text-foreground">{categoryLabel}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-foreground-secondary">Nha cung cap</p>
                <p className="text-[13px] font-semibold text-foreground">{providerName}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-foreground-secondary">Ma KH</p>
                <p className="text-[13px] font-semibold text-foreground tabular-nums">{customerId}</p>
              </div>
            </div>

            {/* Nickname optional */}
            <button
              type="button"
              onClick={() => setShowNickname(true)}
              className="w-full mt-[16px] p-[16px] bg-secondary rounded-[20px] text-center"
            >
              <p className="text-[14px] font-semibold text-foreground">{nickname || "Dat ten goi nho (tuy chon)"}</p>
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ────────────────────────────── */}
      {step === "input" && (
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[13px] pt-[12px] bg-background">
          <Button
            variant="primary"
            size="48"
            className="w-full"
            onClick={handleVerify}
            disabled={customerId.trim().length < 5}
          >
            Xac minh & Luu
          </Button>
        </div>
      )}

      {step === "success" && (
        <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-[13px] pt-[12px] bg-background">
          <Button variant="primary" size="48" className="w-full" onClick={handleSave}>
            Xong
          </Button>
        </div>
      )}

      {/* ── Home indicator ────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>

      {/* ── Nickname sheet ────────────────────────── */}
      <BottomSheet open={showNickname} onClose={() => setShowNickname(false)}>
        <div className="px-[22px] pb-[32px]">
          <div className="flex items-center gap-[8px] mb-[16px]">
            <button type="button" onClick={() => setShowNickname(false)} className="text-lg">✕</button>
            <p className="flex-1 text-center text-lg font-semibold">Ten goi nho</p>
            <div className="w-[18px]" />
          </div>
          <TextField
            placeholder="VD: Dien nha, Nuoc cong ty..."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button
            variant="primary"
            size="48"
            className="w-full mt-[16px]"
            onClick={() => setShowNickname(false)}
          >
            Luu
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}
