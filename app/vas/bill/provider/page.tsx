"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/ui/header"
import { TextField } from "@/components/ui/text-field"
import { ItemList, ItemListItem } from "@/components/ui/item-list"
import { FeedbackState } from "@/components/ui/feedback-state"

/* ── Provider data ───────────────────────────────────────────────────── */
interface Provider {
  id: string
  name: string
  fullName: string
}

interface RegionGroup {
  region: string
  items: Provider[]
}

const PROVIDERS: Record<string, RegionGroup[]> = {
  electric: [
    {
      region: "TP. Ho Chi Minh",
      items: [
        { id: "evn-hcm", name: "EVN HCMC", fullName: "Tong Cong ty Dien luc TP.HCM" },
      ],
    },
    {
      region: "Ha Noi",
      items: [
        { id: "evn-hn", name: "EVN Ha Noi", fullName: "Tong Cong ty Dien luc Ha Noi" },
      ],
    },
    {
      region: "Mien Trung",
      items: [
        { id: "evn-mt", name: "EVN Mien Trung", fullName: "Tong Cong ty Dien luc Mien Trung" },
      ],
    },
  ],
  water: [
    {
      region: "TP. Ho Chi Minh",
      items: [
        { id: "sawaco", name: "SAWACO", fullName: "Tong Cong ty Cap nuoc Sai Gon" },
      ],
    },
    {
      region: "Ha Noi",
      items: [
        { id: "viwaco", name: "VIWACO", fullName: "Cty CP Nuoc sach Ha Noi" },
      ],
    },
  ],
  internet: [
    {
      region: "Toan quoc",
      items: [
        { id: "fpt", name: "FPT Telecom", fullName: "Cong ty CP Vien thong FPT" },
        { id: "vnpt", name: "VNPT", fullName: "Tap doan Buu chinh Vien thong Viet Nam" },
        { id: "viettel-net", name: "Viettel Internet", fullName: "Tap doan Cong nghiep Vien thong Quan doi" },
      ],
    },
  ],
  tv: [
    {
      region: "Toan quoc",
      items: [
        { id: "vtv-cab", name: "VTVCab", fullName: "Tong Cong ty Truyen hinh Cap VN" },
        { id: "sctv", name: "SCTV", fullName: "Truyen hinh cap Saigontourist" },
        { id: "htv", name: "HTVC", fullName: "Truyen hinh cap TP.HCM" },
      ],
    },
  ],
}

const TYPE_LABELS: Record<string, string> = {
  electric: "Dien",
  water: "Nuoc",
  internet: "Internet",
  tv: "Truyen hinh",
}

/* ── Skeleton ────────────────────────────────────────────────────────── */
function SkeletonList() {
  return (
    <div className="px-[22px] pt-[32px] flex flex-col gap-[16px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-11 h-11 rounded-full bg-secondary" />
          <div className="flex-1 flex flex-col gap-[6px]">
            <div className="w-[120px] h-[14px] rounded-full bg-secondary" />
            <div className="w-[200px] h-[12px] rounded-full bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────── */
function ProviderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const type = searchParams.get("type") ?? "electric"
  const stateParam = searchParams.get("state") ?? "loaded"
  const title = TYPE_LABELS[type] ?? "Dich vu"
  const regions = PROVIDERS[type] ?? []

  const [search, setSearch] = React.useState("")

  /* ── Filter logic ─────────────────────────────────────────────────── */
  const filtered = React.useMemo(() => {
    if (!search.trim()) return regions
    const q = search.toLowerCase()
    return regions
      .map((r) => ({
        ...r,
        items: r.items.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.fullName.toLowerCase().includes(q)
        ),
      }))
      .filter((r) => r.items.length > 0)
  }, [search, regions])

  const isEmpty = search.trim().length > 0 && filtered.length === 0
  const isLoading = stateParam === "loading"

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <Header
        variant="default"
        title={title}
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

      {/* ── Scrollable content ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-[21px]">
        {/* ── Search field ──────────────────────────────────────── */}
        <div className="px-[22px] pt-[16px]">
          <TextField
            placeholder="Tim nha cung cap"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <SkeletonList />
        ) : isEmpty ? (
          <FeedbackState
            title="Khong tim thay"
            description={`Khong co nha cung cap nao phu hop voi "${search}"`}
          />
        ) : (
          /* ── Provider list grouped by region ─────────────────── */
          filtered.map((group) => (
            <div key={group.region} className="pt-[32px]">
              <p className="text-sm font-semibold text-foreground-secondary px-[22px] pb-[8px]">
                {group.region}
              </p>
              <div className="px-[22px]">
                <ItemList>
                  {group.items.map((provider, idx) => (
                    <ItemListItem
                      key={provider.id}
                      label={provider.name}
                      sublabel={provider.fullName}
                      prefix={
                        <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-sm font-bold text-foreground">
                            {provider.name.charAt(0)}
                          </span>
                        </div>
                      }
                      showChevron
                      divider={idx < group.items.length - 1}
                      onPress={() =>
                        router.push(
                          `/vas/bill/input?provider=${provider.id}&type=${type}`
                        )
                      }
                    />
                  ))}
                </ItemList>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Home indicator ──────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}

export default function ProviderPage() {
  return (
    <React.Suspense fallback={null}>
      <ProviderContent />
    </React.Suspense>
  )
}
