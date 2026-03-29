"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  X, CheckCircle, ChevronRight,
  UserCheck, Wallet, ShieldCheck, ArrowUpDown,
  Sprout, CreditCard, Home
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getProject, formatVND, formatVNDShort } from "../../data"

/* ══════════════════════════════════════════════════════════════════════
   REGISTER PAGE — Trước khi mua token
   User cần hiểu: mua gì, điều kiện gì, bước tiếp theo là gì
   ══════════════════════════════════════════════════════════════════════ */
export default function RegisterPage() {
  const params = useParams()
  const router = useRouter()
  const [agreed, setAgreed] = React.useState(false)

  const project = getProject(params.id as string)

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground-secondary">Không tìm thấy dự án</p>
      </div>
    )
  }

  const symbol = project.tokenName.split("-")[0] ?? project.tokenName.slice(0, 3)

  return (
    <div className="min-h-screen bg-grey-100 dark:bg-grey-900 flex flex-col items-center">
      <div className="relative w-[390px] h-[844px] bg-background text-foreground flex flex-col rounded-[40px] shadow-xl overflow-hidden mt-[16px]">

        {/* Status bar */}
        <div className="w-full shrink-0 flex items-center px-6 h-[44px]" aria-hidden="true">
          <span className="text-[17px] font-semibold leading-none text-foreground flex-1">9:41</span>
          <div className="flex items-center gap-[6px]">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" className="text-foreground">
              <rect x="0" y="8" width="3" height="4" rx="0.5" /><rect x="4" y="5" width="3" height="7" rx="0.5" />
              <rect x="8" y="2" width="3" height="10" rx="0.5" /><rect x="12" y="0" width="3" height="12" rx="0.5" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-foreground">
              <path d="M8 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" fill="currentColor" />
              <path d="M4.5 7.5a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M2 5a8 8 0 0 1 12 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <div className="flex items-center gap-[1px]">
              <div className="w-[22px] h-[11px] rounded-[3px] border border-current flex items-center p-[1px]">
                <div className="flex-1 h-full bg-current rounded-[1.5px]" />
              </div>
              <div className="w-[1px] h-[4px] bg-current opacity-40 rounded-full" />
            </div>
          </div>
        </div>

        {/* Close button */}
        <div className="px-[22px] flex items-center justify-between">
          <button type="button" onClick={() => router.back()}
            className="w-[32px] h-[32px] rounded-full bg-secondary flex items-center justify-center">
            <X size={16} className="text-foreground" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-[140px]">

          {/* ── Title + Token identity ─────────────────────── */}
          <div className="px-[22px] pt-[16px]">
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              Bạn đang mua token<br />{project.tokenName}
            </h1>
            <p className="text-sm text-foreground-secondary mt-[8px] leading-relaxed">
              Mỗi token {project.tokenName} đại diện cho một phần giá trị bất động sản <strong className="text-foreground">{project.name}</strong>. Bạn sẽ được hưởng lợi nhuận cho thuê, giao dịch token 24/7, và tích lũy để đổi BĐS thật.
            </p>
          </div>

          {/* ── Token summary card ─────────────────────────── */}
          <div className="px-[22px] pt-[20px]">
            <div className="bg-foreground rounded-[20px] px-[16px] py-[16px] overflow-hidden relative">
              <div className="absolute -top-[30px] -right-[30px] w-[100px] h-[100px] rounded-full border border-background/5" />
              <div className="relative flex items-center gap-[12px]">
                <div className="w-[48px] h-[48px] rounded-full bg-background/10 flex items-center justify-center shrink-0 border border-background/20">
                  <span className="text-lg font-black text-background">{symbol}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-background">{project.tokenName}</p>
                  <p className="text-xs text-background/50">{project.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-background tabular-nums">{formatVNDShort(project.tokenPrice)}</p>
                  <p className="text-[10px] text-background/40">/ token</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bạn sẽ được gì ────────────────────────────── */}
          <div className="px-[22px] pt-[24px]">
            <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wide mb-[10px]">
              Khi sở hữu token, bạn được
            </p>
            <div className="space-y-[6px]">
              {[
                { icon: Sprout,      color: "text-success", bg: "bg-success/10", text: "Nhận lợi nhuận cho thuê hàng quý" },
                { icon: ArrowUpDown, color: "text-foreground", bg: "bg-foreground/5", text: "Giao dịch mua bán 24/7 trên sàn" },
                { icon: CreditCard,  color: "text-foreground", bg: "bg-foreground/5", text: "Dùng token để thanh toán" },
                { icon: Home,        color: "text-warning", bg: "bg-warning/10", text: "Tích lũy đủ → đổi thành BĐS thật" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.text} className="flex items-center gap-[10px] py-[8px]">
                    <div className={cn("w-[32px] h-[32px] rounded-[10px] flex items-center justify-center shrink-0", item.bg)}>
                      <Icon size={14} className={item.color} />
                    </div>
                    <p className="text-sm text-foreground">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Tài khoản đã sẵn sàng ────────────────────── */}
          <div className="px-[22px] pt-[24px]">
            <p className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wide mb-[10px]">
              Tài khoản của bạn đã sẵn sàng
            </p>
            <div className="bg-secondary rounded-[20px] px-[14px] py-[4px]">
              {[
                { icon: UserCheck,   text: "Tài khoản V-Smart Pay đã liên kết",  sub: "Nạp/rút tiền nhanh qua ví VSP" },
                { icon: ShieldCheck, text: "Danh tính đã xác minh (eKYC)",       sub: "Bắt buộc theo quy định pháp luật" },
                { icon: Wallet,      text: "Ví đầu tư đã tạo",                   sub: "Nơi lưu trữ token BĐS của bạn" },
              ].map((item, i, arr) => {
                const Icon = item.icon
                return (
                  <div key={item.text} className={cn(
                    "flex items-start gap-[10px] py-[12px]",
                    i < arr.length - 1 && "border-b border-border/50"
                  )}>
                    <div className="w-[28px] h-[28px] rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-[1px]">
                      <CheckCircle size={14} className="text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{item.text}</p>
                      <p className="text-[11px] text-foreground-secondary mt-[1px]">{item.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Lưu ý quan trọng ──────────────────────────── */}
          <div className="px-[22px] pt-[20px]">
            <div className="bg-warning/5 rounded-[14px] px-[14px] py-[10px]">
              <p className="text-[11px] text-foreground-secondary leading-relaxed">
                <strong className="text-foreground">Lưu ý:</strong> Token BĐS là sản phẩm đầu tư, không phải tiền gửi. Giá trị có thể tăng hoặc giảm. Tiền mua token được ngân hàng giữ trong tài khoản Escrow cho đến khi phân bổ hoàn tất.
              </p>
            </div>
          </div>

        </div>

        {/* ── Sticky bottom: Terms + CTA ──────────────────── */}
        <div className="absolute bottom-0 inset-x-0 bg-background border-t border-border px-[22px] pb-[34px] pt-[12px]">

          {/* Checkbox */}
          <label className="flex items-start gap-[10px] mb-[14px] cursor-pointer">
            <div className="mt-[2px] shrink-0">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only peer"
              />
              <div className={cn(
                "w-[20px] h-[20px] rounded-[6px] border-2 flex items-center justify-center transition-colors",
                agreed ? "bg-foreground border-foreground" : "border-border bg-background"
              )}>
                {agreed && <CheckCircle size={12} className="text-background" />}
              </div>
            </div>
            <span className="text-xs text-foreground-secondary leading-relaxed">
              Tôi hiểu rằng đây là sản phẩm đầu tư, đã đọc và đồng ý với{" "}
              <span className="text-foreground font-semibold underline">Điều khoản đầu tư</span> của dự án này.
            </span>
          </label>

          <Button
            variant="primary"
            size="48"
            className="w-full"
            disabled={!agreed}
            onClick={() => router.push(`/rwa/invest/${params.id}`)}
          >
            Tiếp tục chọn số lượng token
          </Button>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] pointer-events-none">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>

      </div>
    </div>
  )
}
