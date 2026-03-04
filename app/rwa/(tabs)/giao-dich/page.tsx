"use client"

import * as React from "react"
import {
  ArrowDownLeft, ArrowUpRight, CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  TRANSACTIONS, getProject, formatVNDShort,
} from "../../data"

/* ── Tab types ────────────────────────────────────────────────────── */
type Tab = "all" | "on-chain" | "off-chain"

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "on-chain", label: "On-chain" },
  { key: "off-chain", label: "Off-chain" },
]

// On-chain: allocate, transfer (token movements)
// Off-chain: register, refund (fiat movements)
const ON_CHAIN_TYPES = new Set(["allocate", "transfer"])
const OFF_CHAIN_TYPES = new Set(["register", "refund"])

/* ── Transaction Row ───────────────────────────────────────────────── */
function TransactionRow({ tx }: { tx: typeof TRANSACTIONS[0] }) {
  const project = getProject(tx.projectId)
  if (!project) return null

  const typeLabels: Record<string, string> = {
    register: "Đăng ký mua",
    allocate: "Nhận token",
    refund: "Hoàn tiền",
    transfer: "Chuyển nhượng",
  }

  const typeIcons: Record<string, React.ReactNode> = {
    register: <ArrowUpRight size={14} className="text-foreground" />,
    allocate: <CheckCircle size={14} className="text-success" />,
    refund: <ArrowDownLeft size={14} className="text-info" />,
    transfer: <ArrowUpRight size={14} className="text-foreground" />,
  }

  const statusColors: Record<string, string> = {
    pending: "text-warning",
    success: "text-success",
    refunded: "text-info",
    failed: "text-danger",
  }

  const isOnChain = ON_CHAIN_TYPES.has(tx.type)

  return (
    <div className="flex items-center gap-[12px] py-[12px]">
      <div className="w-[36px] h-[36px] rounded-full bg-secondary flex items-center justify-center shrink-0">
        {typeIcons[tx.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[6px]">
          <p className="text-sm font-medium text-foreground truncate">{typeLabels[tx.type]}</p>
          <span className={cn(
            "text-[9px] font-semibold uppercase tracking-wide px-[5px] py-[1px] rounded",
            isOnChain
              ? "bg-success/10 text-success"
              : "bg-foreground/5 text-foreground-secondary"
          )}>
            {isOnChain ? "on-chain" : "off-chain"}
          </span>
        </div>
        <p className="text-xs text-foreground-secondary mt-[1px]">{project.name}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={cn("text-sm font-semibold tabular-nums", statusColors[tx.status])}>
          {tx.type === "refund" || tx.type === "allocate" ? "+" : "-"}{formatVNDShort(tx.amount)}
        </p>
        <p className="text-[10px] text-foreground-secondary">{tx.date}</p>
      </div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function TransactionsPage() {
  const [tab, setTab] = React.useState<Tab>("all")

  const filtered = React.useMemo(() => {
    if (tab === "all") return TRANSACTIONS
    if (tab === "on-chain") return TRANSACTIONS.filter((tx) => ON_CHAIN_TYPES.has(tx.type))
    return TRANSACTIONS.filter((tx) => OFF_CHAIN_TYPES.has(tx.type))
  }, [tab])

  return (
    <div>
      {/* Tab bar */}
      <div className="px-[22px] pt-[4px] pb-[8px]">
        <div className="flex items-center gap-[6px] bg-secondary rounded-[12px] p-[3px]">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "flex-1 py-[7px] rounded-[10px] text-xs font-semibold text-center transition-colors",
                tab === t.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground-secondary"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction list */}
      <div className="px-[22px]">
        {filtered.length > 0 ? (
          <div className="divide-y divide-border">
            {filtered.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>
        ) : (
          <div className="py-[40px] text-center">
            <p className="text-sm text-foreground-secondary">Không có giao dịch nào</p>
          </div>
        )}
      </div>
    </div>
  )
}
