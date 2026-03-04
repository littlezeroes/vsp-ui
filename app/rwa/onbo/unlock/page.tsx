"use client"

/**
 * ONBO · S2 — Unlock (KYC Gate → KYC Processing → Wallet Setup)
 *
 * First Principles:
 * - 1 screen, 3 phases — job là "mở khóa tài khoản đầu tư"
 * - Stepper [KYC → Tạo ví] CHỈ xuất hiện SAU khi user tap CTA (commit rồi mới show journey)
 * - KYC Gate = decision moment → full screen, không distract
 * - Processing + Setup = waiting → stepper là reassurance
 * - Skip → home với warning banner (progressive commitment)
 * - Design for Waiting: progress bar + timeline rõ ở mọi waiting state
 */

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft, ShieldCheck, CheckCircle2, Loader2,
  Clock, Camera, TrendingUp, Unlock, HelpCircle,
} from "lucide-react"

import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"

/* ── Types ──────────────────────────────────────────────────────────── */
type Phase = "gate" | "kyc" | "wallet"
type StepStatus = "done" | "active" | "pending"

interface Step {
  label: string
  sub: string
  status: StepStatus
  hasTooltip?: boolean
  tooltipText?: string
}

/* ── Static data ────────────────────────────────────────────────────── */
const BENEFITS = [
  {
    icon:  <Unlock size={16} className="text-success" />,
    title: "Đầu tư không giới hạn",
    sub:   "Sở hữu nhiều token, từ 5 triệu đồng",
  },
  {
    icon:  <TrendingUp size={16} className="text-success" />,
    title: "Nhận lợi nhuận hàng quý",
    sub:   "Về ví VPay tự động",
  },
  {
    icon:  <ShieldCheck size={16} className="text-success" />,
    title: "Quyền lợi pháp lý",
    sub:   "Ghi nhận trên blockchain",
  },
]

const KYC_STEPS_INIT: Step[] = [
  { label: "Kiểm tra CCCD",     sub: "Đọc thông tin từ ảnh",     status: "done"    },
  { label: "Xác minh liveness", sub: "Đối chiếu khuôn mặt",      status: "active"  },
  { label: "Phê duyệt tự động", sub: "AI xử lý · ~30 giây",      status: "pending" },
]

const WALLET_STEPS_INIT: Step[] = [
  {
    label: "Tạo ví đầu tư",
    sub:   "Ví tạo tự động, bạn không cần làm gì",
    status: "done",
  },
  {
    label: "Đăng ký danh tính",
    sub:   "Liên kết ví với danh tính đã xác minh",
    status: "active",
    hasTooltip: true,
    tooltipText: "Danh tính blockchain = hợp đồng kỹ thuật số, chứng minh bạn là chủ ví",
  },
  {
    label: "Xác nhận quyền đầu tư",
    sub:   "Ghi nhận KYC Level 2 lên mạng lưới",
    status: "pending",
    hasTooltip: true,
    tooltipText: "Quyền đầu tư lưu trên blockchain — không ai thay đổi được",
  },
  {
    label: "Hoàn tất",
    sub:   "Tài khoản đầu tư sẵn sàng",
    status: "pending",
  },
]

/* ── Stepper ─────────────────────────────────────────────────────────── */
function Stepper({ phase }: { phase: Phase }) {
  const kycDone   = phase === "wallet"
  const walletActive = phase === "wallet"

  return (
    <div className="flex items-center justify-center gap-0 px-[22px] py-[14px] border-b border-border">
      {/* Step 1 */}
      <div className="flex items-center gap-[8px]">
        <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0 ${
          kycDone ? "bg-success" : "bg-success/15 border-2 border-success"
        }`}>
          {kycDone
            ? <CheckCircle2 size={13} className="text-background" />
            : <span className="text-[10px] font-bold text-success">1</span>
          }
        </div>
        <span className={`text-xs font-semibold ${kycDone ? "text-foreground-secondary" : "text-foreground"}`}>
          Xác minh KYC
        </span>
      </div>

      {/* Connector */}
      <div className={`h-[2px] w-[36px] mx-[10px] rounded-full transition-colors duration-500 ${
        kycDone ? "bg-success" : "bg-border"
      }`} />

      {/* Step 2 */}
      <div className="flex items-center gap-[8px]">
        <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0 ${
          walletActive ? "bg-success/15 border-2 border-success" : "bg-background border-2 border-border"
        }`}>
          <span className={`text-[10px] font-bold ${walletActive ? "text-success" : "text-foreground-secondary"}`}>
            2
          </span>
        </div>
        <span className={`text-xs font-semibold ${walletActive ? "text-foreground" : "text-foreground-secondary"}`}>
          Tạo ví
        </span>
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function UnlockPage() {
  const router = useRouter()

  const [phase, setPhase]             = React.useState<Phase>("gate")
  const [showStepper, setShowStepper] = React.useState(false)
  const [activeTooltip, setActiveTooltip] = React.useState<number | null>(null)

  /* KYC processing state */
  const [kycProgress, setKycProgress] = React.useState(35)
  const [kycSteps, setKycSteps]       = React.useState<Step[]>(KYC_STEPS_INIT)
  const [kycDone, setKycDone]         = React.useState(false)

  /* Wallet setup state */
  const [walletSteps, setWalletSteps]     = React.useState<Step[]>(WALLET_STEPS_INIT)
  const [walletProgress, setWalletProgress] = React.useState(25)
  const [walletDone, setWalletDone]       = React.useState(false)

  /* Auto-advance KYC */
  React.useEffect(() => {
    if (phase !== "kyc") return
    const t1 = setTimeout(() => {
      setKycProgress(65)
      setKycSteps(prev => prev.map((s, i) =>
        i === 1 ? { ...s, status: "done" } :
        i === 2 ? { ...s, status: "active" } : s
      ))
    }, 1800)
    const t2 = setTimeout(() => {
      setKycProgress(100)
      setKycSteps(prev => prev.map(s => ({ ...s, status: "done" })))
      setKycDone(true)
    }, 3600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase])

  /* Auto-advance Wallet */
  React.useEffect(() => {
    if (phase !== "wallet") return
    const t1 = setTimeout(() => {
      setWalletSteps(prev => prev.map((s, i) =>
        i === 1 ? { ...s, status: "done" } :
        i === 2 ? { ...s, status: "active" } : s
      ))
      setWalletProgress(50)
    }, 2000)
    const t2 = setTimeout(() => {
      setWalletSteps(prev => prev.map((s, i) =>
        i === 2 ? { ...s, status: "done" } :
        i === 3 ? { ...s, status: "active" } : s
      ))
      setWalletProgress(75)
    }, 4000)
    const t3 = setTimeout(() => {
      setWalletSteps(prev => prev.map(s => ({ ...s, status: "done" })))
      setWalletProgress(100)
      setWalletDone(true)
    }, 5500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [phase])

  const handleStartKyc = () => {
    setShowStepper(true)
    setPhase("kyc")
  }

  const handleAdvanceToWallet = () => {
    setPhase("wallet")
  }

  const walletCompletedCount = walletSteps.filter(s => s.status === "done").length

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">

        {/* ── Header ───────────────────────────────────────────────── */}
        <Header
          variant="default"
          title="Mở khóa đầu tư"
          showStatusBar={false}
          leading={
            phase === "gate" ? (
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

        {/* ── Stepper — chỉ xuất hiện sau khi user commit ──────────── */}
        {showStepper && <Stepper phase={phase} />}

        {/* ══════════════════════════════════════════════════════════
            PHASE: GATE — decision moment, no distractions
        ══════════════════════════════════════════════════════════ */}
        {phase === "gate" && (
          <div className="flex-1 overflow-y-auto pb-[168px]">

            {/* Intent banner */}
            <div className="px-[22px] pt-[16px]">
              <div className="bg-blue-50 rounded-[14px] px-[14px] py-[12px]">
                <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[4px]">
                  Dự án bạn quan tâm
                </p>
                <p className="text-sm font-bold text-foreground">
                  Landmark 81 · Giai đoạn 1
                </p>
              </div>
            </div>

            {/* Hero */}
            <div className="pt-[20px] px-[22px]">
              <h1 className="text-xl font-bold leading-8 tracking-[-0.016em] text-foreground mb-[6px]">
                Còn 1 bước để bắt đầu đầu tư
              </h1>
              <p className="text-sm text-foreground-secondary leading-5">
                Xác minh danh tính để mở khóa toàn bộ tính năng POLARIS —{" "}
                chỉ mất <span className="font-semibold text-foreground">5 phút</span>.
              </p>
            </div>

            {/* 3 steps */}
            <div className="pt-[20px] px-[22px]">
              <div className="bg-secondary rounded-[28px] px-[20px] py-[16px]">
                <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[12px]">
                  3 bước đơn giản
                </p>
                {[
                  { label: "Chụp CCCD mặt trước", time: "~1 phút"  },
                  { label: "Chụp CCCD mặt sau",   time: "~1 phút"  },
                  { label: "Selfie xác nhận",      time: "~30 giây" },
                ].map((step, i, arr) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-[10px] ${
                      i < arr.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="w-[28px] h-[28px] rounded-full bg-background flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-success">{i + 1}</span>
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground">{step.label}</span>
                    <span className="text-xs text-foreground-secondary shrink-0">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="pt-[12px] px-[22px]">
              <div className="bg-secondary rounded-[28px] px-[20px] py-[16px]">
                <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[12px]">
                  Sau khi xác minh, bạn được
                </p>
                {BENEFITS.map((b, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-[10px] ${
                      i < BENEFITS.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="w-[32px] h-[32px] rounded-[8px] bg-background flex items-center justify-center shrink-0 mt-[1px]">
                      {b.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-5">{b.title}</p>
                      <p className="text-xs text-foreground-secondary leading-4 mt-[2px]">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social proof */}
            <div className="pt-[16px] px-[22px] flex items-center justify-center gap-[10px]">
              <div className="flex">
                {["N","T","M","H"].map((l, i) => (
                  <div
                    key={i}
                    className={`w-[22px] h-[22px] rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold text-white ${
                      ["bg-indigo-500","bg-cyan-600","bg-emerald-600","bg-amber-500"][i]
                    } ${i > 0 ? "-ml-[6px]" : ""}`}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground-secondary">
                <span className="font-semibold text-foreground">1,247 nhà đầu tư</span>{" "}
                đã xác minh thành công
              </p>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            PHASE: KYC PROCESSING — waiting state
        ══════════════════════════════════════════════════════════ */}
        {phase === "kyc" && (
          <div className="flex-1 overflow-y-auto pb-[100px]">

            {/* Status hero */}
            <div className="px-[22px] pt-[24px]">
              <div className="bg-secondary rounded-[28px] px-[20px] py-[20px]">
                <div className="flex items-center gap-3 mb-[16px]">
                  <div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center shrink-0">
                    {kycDone
                      ? <CheckCircle2 size={22} className="text-success" />
                      : <Loader2 size={22} className="text-success animate-spin" />
                    }
                  </div>
                  <div>
                    <p className="text-md font-semibold text-foreground leading-6">
                      {kycDone ? "Xác minh thành công" : "Đang xác minh danh tính"}
                    </p>
                    <p className="text-xs text-foreground-secondary leading-4 mt-[1px]">
                      {kycDone ? "AI duyệt tự động trong 2 giây" : "Thường hoàn thành trong 30 giây"}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-[6px]">
                    <span className="text-xs text-foreground-secondary">Tiến trình</span>
                    <span className="text-xs font-semibold text-success">{kycProgress}%</span>
                  </div>
                  <div className="h-[6px] bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${kycProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step list */}
            <div className="pt-[12px] px-[22px]">
              <div className="bg-secondary rounded-[28px] px-[20px] py-[16px]">
                <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[12px]">
                  Các bước xử lý
                </p>
                {kycSteps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-[10px] ${
                      i < kycSteps.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="w-[28px] h-[28px] rounded-full bg-background flex items-center justify-center shrink-0">
                      {step.status === "done"    && <CheckCircle2 size={14} className="text-success" />}
                      {step.status === "active"  && <Loader2 size={14} className="text-success animate-spin" />}
                      {step.status === "pending" && <Clock size={14} className="text-foreground-secondary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium leading-5 ${
                        step.status === "pending" ? "text-foreground-secondary" : "text-foreground"
                      }`}>{step.label}</p>
                      <p className="text-xs text-foreground-secondary leading-4 mt-[1px]">{step.sub}</p>
                    </div>
                    {step.status === "done" && (
                      <span className="text-xs font-semibold text-success shrink-0">Xong</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust anchor */}
            <div className="pt-[12px] px-[22px]">
              <div className="bg-secondary rounded-[28px] px-[20px] py-[16px] flex items-start gap-3">
                <ShieldCheck size={18} className="text-success shrink-0 mt-[1px]" />
                <div>
                  <p className="text-sm font-semibold text-foreground leading-5">Bảo mật bởi VPay</p>
                  <p className="text-xs text-foreground-secondary leading-4 mt-[2px]">
                    Ảnh CCCD mã hoá, không lưu thiết bị · 85% duyệt tự động trong 30 giây
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="pt-[12px] px-[22px]">
              <div className="flex gap-3">
                {[
                  { value: "85%",   label: "Duyệt tự động"  },
                  { value: "~30s",  label: "Thời gian xử lý" },
                  { value: "1,247", label: "Đã xác minh"     },
                ].map((stat, i) => (
                  <div key={i} className="flex-1 bg-secondary rounded-[14px] px-[12px] py-[12px] text-center">
                    <p className="text-md font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-foreground-secondary mt-[2px]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            PHASE: WALLET SETUP — waiting state
        ══════════════════════════════════════════════════════════ */}
        {phase === "wallet" && (
          <div className="flex-1 overflow-y-auto pb-[100px]">

            {/* Status hero */}
            <div className="px-[22px] pt-[24px]">
              <div className="bg-secondary rounded-[28px] px-[20px] py-[20px]">
                <div className="flex items-center gap-3 mb-[16px]">
                  <div className="w-[44px] h-[44px] rounded-full bg-background flex items-center justify-center shrink-0">
                    {walletDone
                      ? <CheckCircle2 size={22} className="text-success" />
                      : <Loader2 size={22} className="text-success animate-spin" />
                    }
                  </div>
                  <div>
                    <p className="text-md font-semibold text-foreground leading-6">
                      {walletDone ? "Ví đầu tư đã sẵn sàng!" : "Đang thiết lập ví đầu tư"}
                    </p>
                    <p className="text-xs text-foreground-secondary leading-4 mt-[1px]">
                      {walletDone
                        ? "Bạn có thể bắt đầu đầu tư ngay"
                        : `Bước ${walletCompletedCount + 1}/4 · Thường mất 2–3 phút`
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-[6px]">
                    <span className="text-xs text-foreground-secondary">Tiến trình</span>
                    <span className="text-xs font-semibold text-success">{walletProgress}%</span>
                  </div>
                  <div className="h-[6px] bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${walletProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4-step workflow */}
            <div className="pt-[12px] px-[22px]">
              <div className="bg-secondary rounded-[28px] px-[20px] py-[16px]">
                <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-widest mb-[12px]">
                  Các bước thiết lập
                </p>
                <div className="relative">
                  <div className="absolute left-[13px] top-[28px] bottom-[28px] w-[2px] bg-border" />
                  {walletSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 py-[10px] relative">
                      <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.status === "done"   ? "bg-success" :
                        step.status === "active" ? "bg-background border-2 border-success" :
                                                   "bg-background border-2 border-border"
                      }`}>
                        {step.status === "done"    && <CheckCircle2 size={14} className="text-background" />}
                        {step.status === "active"  && <Loader2 size={13} className="text-success animate-spin" />}
                        {step.status === "pending" && <span className="text-[10px] font-bold text-foreground-secondary">{i + 1}</span>}
                      </div>
                      <div className="flex-1 min-w-0 pt-[4px]">
                        <div className="flex items-center gap-[6px]">
                          <p className={`text-sm font-medium leading-5 ${
                            step.status === "pending" ? "text-foreground-secondary" : "text-foreground"
                          }`}>{step.label}</p>
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

            {/* Security anchor */}
            <div className="pt-[12px] px-[22px]">
              <div className="bg-secondary rounded-[28px] px-[20px] py-[16px] flex items-start gap-3">
                <ShieldCheck size={18} className="text-success shrink-0 mt-[1px]" />
                <div>
                  <p className="text-sm font-semibold text-foreground leading-5">Ví của bạn được bảo vệ hoàn toàn</p>
                  <p className="text-xs text-foreground-secondary leading-4 mt-[2px]">
                    Bảo mật bởi Fireblocks · Bạn không cần quản lý private key
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            CTAs — contextual per phase
        ══════════════════════════════════════════════════════════ */}

        {/* Gate CTA */}
        {phase === "gate" && (
          <div className="absolute bottom-[21px] inset-x-0 px-[22px] flex flex-col gap-[8px] pb-3 bg-background">
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={handleStartKyc}
            >
              <Camera size={18} />
              Bắt đầu xác minh · 5 phút
            </Button>
            <div className="flex items-center justify-center gap-[6px]">
              <ShieldCheck size={12} className="text-success shrink-0" />
              <p className="text-xs text-foreground-secondary text-center">
                Bảo mật bởi VPay · 85% duyệt tự động trong 30 giây
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/rwa/preo?kyc=skipped")}
              className="text-xs text-foreground-secondary text-center py-[4px] focus-visible:outline-none focus-visible:underline"
            >
              Xem dự án trước, xác minh sau
            </button>
          </div>
        )}

        {/* KYC done → advance to wallet */}
        {phase === "kyc" && kycDone && (
          <div className="absolute bottom-[21px] inset-x-0 px-[22px] pb-3 bg-background">
            <Button
              variant="primary"
              size="48"
              className="w-full"
              onClick={handleAdvanceToWallet}
            >
              Tiếp tục thiết lập ví
            </Button>
          </div>
        )}

        {/* Wallet done → success */}
        {phase === "wallet" && walletDone && (
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

        {/* ── Home indicator ────────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

      </div>
    </div>
  )
}
