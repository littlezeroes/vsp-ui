"use client"

/**
 * ONBO · Wallet Setup Screen
 *
 * First Principles:
 * - Do: Design for Waiting — transparent waiting state với timeline rõ (4-step RegisterIdentityWorkflow)
 * - Do: "85% duyệt tự động" (Trust gap) + progress connector giữa steps
 * - Do: Giải thích jargon inline — "OnChainID ⓘ", "Blockchain wallet ⓘ" (Knowledge gap)
 * - User emotion: Anxious waiting → reassurance qua progress + plain language
 * - Avoid: "SPV, Escrow hiển thị không giải thích" → mọi technical term đều có tooltip
 *
 * Flow: KYC Processing → this screen → onbo-success → Home
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ShieldCheck, CheckCircle2, Loader2, Clock, HelpCircle } from "lucide-react"

import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"

/* ── Types ──────────────────────────────────────────────────────────── */
type StepStatus = "done" | "active" | "pending"

interface WalletStep {
  label: string
  plainLabel: string   // jargon-free label
  sub: string
  status: StepStatus
  hasTooltip?: boolean
  tooltipText?: string
}

/* ── Steps — plain language, no jargon ─────────────────────────────── */
const STEPS_INIT: WalletStep[] = [
  {
    label:      "Tạo ví đầu tư",
    plainLabel: "Tạo ví đầu tư",
    sub:        "Ví được tạo tự động, bạn không cần làm gì",
    status:     "done",
  },
  {
    label:      "Đăng ký danh tính blockchain",
    plainLabel: "Đăng ký danh tính",
    sub:        "Liên kết ví với danh tính đã xác minh của bạn",
    status:     "active",
    hasTooltip: true,
    tooltipText: "Danh tính blockchain = hợp đồng kỹ thuật số không thể giả mạo, chứng minh bạn là chủ ví",
  },
  {
    label:      "Xác nhận quyền đầu tư",
    plainLabel: "Xác nhận quyền đầu tư",
    sub:        "Ghi nhận KYC Level 2 của bạn lên mạng lưới",
    status:     "pending",
    hasTooltip: true,
    tooltipText: "Quyền đầu tư được lưu trên blockchain — không ai có thể thay đổi hoặc xoá",
  },
  {
    label:      "Hoàn tất",
    plainLabel: "Hoàn tất",
    sub:        "Tài khoản đầu tư sẵn sàng",
    status:     "pending",
  },
]

/* ── Page ───────────────────────────────────────────────────────────── */
export default function WalletSetupPage() {
  const router = useRouter()
  const [steps, setSteps] = React.useState<WalletStep[]>(STEPS_INIT)
  const [activeTooltip, setActiveTooltip] = React.useState<number | null>(null)
  const [done, setDone] = React.useState(false)

  /* Demo: auto-advance setup */
  React.useEffect(() => {
    const t1 = setTimeout(() => {
      setSteps(prev => prev.map((s, i) =>
        i === 1 ? { ...s, status: "done" } :
        i === 2 ? { ...s, status: "active" } : s
      ))
    }, 2000)

    const t2 = setTimeout(() => {
      setSteps(prev => prev.map((s, i) =>
        i === 2 ? { ...s, status: "done" } :
        i === 3 ? { ...s, status: "active" } : s
      ))
    }, 4000)

    const t3 = setTimeout(() => {
      setSteps(prev => prev.map(s => ({ ...s, status: "done" })))
      setDone(true)
    }, 5500)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const completedCount = steps.filter(s => s.status === "done").length

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ──────────────────────────────────────────────── */}
        <Header
          variant="default"
          title="Thiết lập ví đầu tư"
          showStatusBar={false}
          leading={
            done ? (
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center justify-center pl-[8px] pr-[10px] py-[10px] min-h-[44px] rounded-full text-foreground focus-visible:outline-none"
              >
                <ChevronLeft size={18} />
              </button>
            ) : undefined
          }
        />

        {/* ── Content ─────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[100px]">

          {/* ── Status hero ───────────────────────────────────────── */}
          <div className="px-[22px] pt-[24px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[20px]">
              <div className="flex items-center gap-3 mb-[16px]">
                <div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center shrink-0">
                  {done
                    ? <CheckCircle2 size={22} className="text-success" />
                    : <Loader2 size={22} className="text-success animate-spin" />
                  }
                </div>
                <div>
                  <p className="text-md font-semibold text-foreground leading-6">
                    {done ? "Ví đầu tư đã sẵn sàng!" : "Đang thiết lập ví đầu tư"}
                  </p>
                  <p className="text-xs text-foreground-secondary leading-4 mt-[1px]">
                    {done
                      ? "Bạn có thể bắt đầu đầu tư ngay bây giờ"
                      : `Bước ${completedCount + 1}/4 · Thường mất 2–3 phút`
                    }
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between mb-[6px]">
                  <span className="text-xs text-foreground-secondary">Tiến trình</span>
                  <span className="text-xs font-semibold text-success">
                    {Math.round((completedCount / steps.length) * 100)}%
                  </span>
                </div>
                <div className="h-[6px] bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(completedCount / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── 4-step RegisterIdentityWorkflow — plain language ───── */}
          <div className="pt-[12px] px-[22px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[16px]">
              <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[12px]">
                Các bước thiết lập
              </p>
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[13px] top-[28px] bottom-[28px] w-[2px] bg-border" />

                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 py-[10px] relative">
                    {/* Status node */}
                    <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.status === "done"    ? "bg-success"     :
                      step.status === "active"  ? "bg-background border-2 border-success" :
                                                  "bg-background border-2 border-border"
                    }`}>
                      {step.status === "done"   && <CheckCircle2 size={14} className="text-background" />}
                      {step.status === "active" && <Loader2 size={13} className="text-success animate-spin" />}
                      {step.status === "pending"&& <span className="text-[10px] font-bold text-foreground-secondary">{i + 1}</span>}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-[4px]">
                      <div className="flex items-center gap-[6px]">
                        <p className={`text-sm font-medium leading-5 ${
                          step.status === "pending" ? "text-foreground-secondary" : "text-foreground"
                        }`}>
                          {step.plainLabel}
                        </p>
                        {/* Inline tooltip for jargon — Knowledge gap */}
                        {step.hasTooltip && (
                          <button
                            type="button"
                            onClick={() => setActiveTooltip(activeTooltip === i ? null : i)}
                            className="focus-visible:outline-none"
                          >
                            <HelpCircle size={13} className="text-foreground-secondary" />
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-foreground-secondary leading-4 mt-[1px]">{step.sub}</p>

                      {/* Tooltip content */}
                      {activeTooltip === i && step.tooltipText && (
                        <div className="mt-[8px] bg-background rounded-[10px] px-[12px] py-[10px] border border-border">
                          <p className="text-xs text-foreground leading-5">{step.tooltipText}</p>
                        </div>
                      )}
                    </div>

                    {step.status === "done" && (
                      <span className="text-xs font-semibold text-success shrink-0 pt-[5px]">Xong</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Security / trust anchor ───────────────────────────── */}
          <div className="pt-[12px] px-[22px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[16px] flex items-start gap-3">
              <ShieldCheck size={18} className="text-success shrink-0 mt-[1px]" />
              <div>
                <p className="text-sm font-semibold text-foreground leading-5">
                  Ví của bạn được bảo vệ hoàn toàn
                </p>
                <p className="text-xs text-foreground-secondary leading-4 mt-[2px]">
                  Bảo mật bởi Fireblocks · Bạn không cần quản lý private key · Platform giữ an toàn thay bạn
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Fixed CTA — only when done ──────────────────────────── */}
        {done && (
          <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-3 bg-background">
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/rwa/onbo/success")}
            >
              Bắt đầu khám phá dự án
            </Button>
          </div>
        )}

        {/* ── Home indicator ──────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

      </div>
    </div>
  )
}
