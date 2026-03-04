"use client"

/**
 * ONBO · KYC Processing Screen
 *
 * First Principles:
 * - Avoid: "Màn chờ không có timeline" → user nghĩ app lỗi → back
 * - Do: Progress rõ 1/3 → 2/3 → 3/3 + "85% duyệt tự động" (Trust gap)
 * - Do: Design for Waiting — reassurance + timeline rõ ràng
 * - User emotion: Hoang mang → Mất tin tưởng nếu không có feedback
 *
 * Flow: KYC Gate → [VPay eKYC CCCD capture, external] → this screen → wallet-setup
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, CheckCircle2, Clock, Loader2 } from "lucide-react"

import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"

/* ── Types ──────────────────────────────────────────────────────────── */
type StepStatus = "done" | "active" | "pending"

interface Step {
  label: string
  sub: string
  status: StepStatus
}

/* ── Simulate processing state (demo) ──────────────────────────────── */
const STEPS_INIT: Step[] = [
  { label: "Kiểm tra CCCD",         sub: "Đọc thông tin từ ảnh",        status: "done"    },
  { label: "Xác minh liveness",     sub: "Đối chiếu khuôn mặt",        status: "active"  },
  { label: "Phê duyệt tự động",     sub: "AI xử lý · ~30 giây",        status: "pending" },
]

/* ── Page ───────────────────────────────────────────────────────────── */
export default function KycProcessingPage() {
  const router = useRouter()
  const [steps, setSteps] = React.useState<Step[]>(STEPS_INIT)
  const [progress, setProgress] = React.useState(35)
  const [done, setDone] = React.useState(false)

  /* Demo: auto-advance processing */
  React.useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(65)
      setSteps(prev => prev.map((s, i) =>
        i === 1 ? { ...s, status: "done" } :
        i === 2 ? { ...s, status: "active" } : s
      ))
    }, 1800)

    const t2 = setTimeout(() => {
      setProgress(100)
      setSteps(prev => prev.map(s => ({ ...s, status: "done" })))
      setDone(true)
    }, 3600)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header — no back when processing ──────────────────── */}
        <Header
          variant="default"
          title="Đang xử lý"
          showStatusBar={false}
        />

        {/* ── Content ─────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-[100px]">

          {/* ── Progress bar + status ─────────────────────────────── */}
          <div className="px-[22px] pt-[24px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[20px]">

              {/* Icon + headline */}
              <div className="flex items-center gap-3 mb-[16px]">
                <div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center shrink-0">
                  {done
                    ? <CheckCircle2 size={22} className="text-success" />
                    : <Loader2 size={22} className="text-success animate-spin" />
                  }
                </div>
                <div>
                  <p className="text-md font-semibold text-foreground leading-6">
                    {done ? "Xác minh thành công" : "Đang xác minh danh tính"}
                  </p>
                  <p className="text-xs text-foreground-secondary leading-4 mt-[1px]">
                    {done ? "AI duyệt tự động trong 2 giây" : "Thường hoàn thành trong 30 giây"}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-[8px]">
                <div className="flex items-center justify-between mb-[6px]">
                  <span className="text-xs text-foreground-secondary">Tiến trình</span>
                  <span className="text-xs font-semibold text-success">{progress}%</span>
                </div>
                <div className="h-[6px] bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Step list — transparent waiting state ─────────────── */}
          <div className="pt-[12px] px-[22px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[16px]">
              <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[12px]">
                Các bước xử lý
              </p>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-[10px] ${
                    i < steps.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {/* Status icon */}
                  <div className="w-[28px] h-[28px] rounded-full bg-background flex items-center justify-center shrink-0">
                    {step.status === "done"    && <CheckCircle2 size={14} className="text-success" />}
                    {step.status === "active"  && <Loader2 size={14} className="text-success animate-spin" />}
                    {step.status === "pending" && <Clock size={14} className="text-foreground-secondary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium leading-5 ${
                      step.status === "pending" ? "text-foreground-secondary" : "text-foreground"
                    }`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-foreground-secondary leading-4 mt-[1px]">{step.sub}</p>
                  </div>
                  {step.status === "done" && (
                    <span className="text-xs font-semibold text-success shrink-0">Xong</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Trust anchor — address legitimacy anxiety ─────────── */}
          <div className="pt-[12px] px-[22px]">
            <div className="bg-secondary rounded-[28px] px-[20px] py-[16px] flex items-start gap-3">
              <ShieldCheck size={18} className="text-success shrink-0 mt-[1px]" />
              <div>
                <p className="text-sm font-semibold text-foreground leading-5">
                  Bảo mật bởi VPay
                </p>
                <p className="text-xs text-foreground-secondary leading-4 mt-[2px]">
                  Ảnh CCCD của bạn được mã hoá và không lưu trên thiết bị. Xử lý bởi hệ thống eKYC của VPay — 85% được duyệt tự động.
                </p>
              </div>
            </div>
          </div>

          {/* ── Stats row ─────────────────────────────────────────── */}
          <div className="pt-[12px] px-[22px]">
            <div className="flex gap-3">
              {[
                { value: "85%",    label: "Duyệt tự động" },
                { value: "~30s",   label: "Thời gian xử lý" },
                { value: "1,247",  label: "Đã xác minh" },
              ].map((stat, i) => (
                <div key={i} className="flex-1 bg-secondary rounded-[14px] px-[12px] py-[12px] text-center">
                  <p className="text-md font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-foreground-secondary mt-[2px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Fixed CTA — only show when done ─────────────────────── */}
        {done && (
          <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-3 bg-background">
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={() => router.push("/rwa/onbo/wallet-setup")}
            >
              Tiếp tục thiết lập ví
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
