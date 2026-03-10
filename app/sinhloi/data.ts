/* ── Sinh loi tu dong v2 — Types & Mock Data ───────────────────────── */

export type TransactionType = "interest" | "deposit" | "withdrawal"

export interface SinhLoiTransaction {
  id: string
  type: TransactionType
  label: string
  amount: number
  date: string
  status: "success" | "pending" | "failed"
}

export interface SinhLoiConfig {
  interestRate: number
  maxBalance: number
  dailyWithdrawLimit: number
  monthlyDepositLimit: number
  provider: string
}

export interface ProfitMonth {
  month: number
  amount: number
  isEstimate: boolean
}

export interface ProfitYear {
  year: number
  months: ProfitMonth[]
  total: number
}

/* ── Config ────────────────────────────────────────────────────────── */
export const SINHLOI_CONFIG: SinhLoiConfig = {
  interestRate: 4.5,
  maxBalance: 100_000_000,
  dailyWithdrawLimit: 30_000_000,
  monthlyDepositLimit: 100_000_000,
  provider: "ABC",
}

/* ── Mock user ─────────────────────────────────────────────────────── */
export const MOCK_USER = {
  fullName: "Nguyen Van A",
  phone: "0912345678",
  cccd: "012345678901",
  walletBalance: 25_000_000,
}

/* ── Mock balance ──────────────────────────────────────────────────── */
export const MOCK_BALANCE = {
  balance: 10_831_048,
  totalInterestEarned: 100_000,
  todayInterest: 2_714,
}

/* ── Quick amount chips ────────────────────────────────────────────── */
export const QUICK_AMOUNTS = [500_000, 1_000_000, 5_000_000, 10_000_000]

/* ── Mock transactions ─────────────────────────────────────────────── */
export const MOCK_TRANSACTIONS: SinhLoiTransaction[] = [
  { id: "t1", type: "interest", label: "Tra lai thang 11", amount: 2_714, date: "06/03/2026", status: "success" },
  { id: "t2", type: "deposit", label: "Nap tien", amount: 150_000, date: "06/03/2026", status: "success" },
  { id: "t3", type: "interest", label: "Tra lai thang 10", amount: 2_672, date: "05/03/2026", status: "success" },
]

export const MOCK_TRANSACTIONS_FULL: SinhLoiTransaction[] = [
  ...MOCK_TRANSACTIONS,
  { id: "t4", type: "withdrawal", label: "Rut tien", amount: -200_000, date: "05/03/2026", status: "success" },
  { id: "t5", type: "deposit", label: "Nap tien", amount: 3_000_000, date: "04/03/2026", status: "success" },
  { id: "t6", type: "interest", label: "Tra lai thang 09", amount: 2_650, date: "04/03/2026", status: "success" },
  { id: "t7", type: "withdrawal", label: "Rut tien", amount: -500_000, date: "03/03/2026", status: "success" },
  { id: "t8", type: "deposit", label: "Nap tien", amount: 5_000_000, date: "02/03/2026", status: "success" },
  { id: "t9", type: "interest", label: "Tra lai thang 08", amount: 2_510, date: "02/03/2026", status: "success" },
  { id: "t10", type: "withdrawal", label: "Rut tien", amount: -1_000_000, date: "01/03/2026", status: "failed" },
  { id: "t11", type: "deposit", label: "Nap tien", amount: 2_000_000, date: "28/02/2026", status: "pending" },
]

/* ── Profit data ───────────────────────────────────────────────────── */
export const MOCK_PROFIT: ProfitYear[] = [
  {
    year: 2026,
    total: 28_500,
    months: [
      { month: 1, amount: 8_200, isEstimate: false },
      { month: 2, amount: 9_100, isEstimate: false },
      { month: 3, amount: 11_200, isEstimate: true },
    ],
  },
  {
    year: 2025,
    total: 95_000,
    months: [
      { month: 10, amount: 22_000, isEstimate: false },
      { month: 11, amount: 35_000, isEstimate: false },
      { month: 12, amount: 38_000, isEstimate: false },
    ],
  },
]

/* ── Daily interest (7 ngay gan nhat) ────────────────────────────── */
export interface DailyInterest {
  day: string   // "T2", "T3", ...
  date: string  // "04/03"
  amount: number
}

export const MOCK_DAILY_INTEREST: DailyInterest[] = [
  { day: "T2", date: "04/03", amount: 1_480 },
  { day: "T3", date: "05/03", amount: 1_520 },
  { day: "T4", date: "06/03", amount: 2_100 },
  { day: "T5", date: "07/03", amount: 2_350 },
  { day: "T6", date: "08/03", amount: 2_680 },
  { day: "T7", date: "09/03", amount: 2_714 },
  { day: "CN", date: "10/03", amount: 2_750 },
]

/* ── Helpers ────────────────────────────────────────────────────────── */
export function formatVND(n: number): string {
  const abs = Math.abs(n)
  const formatted = abs.toLocaleString("vi-VN")
  if (n < 0) return `-${formatted} d`
  return `${formatted} d`
}

export function formatVNDSigned(n: number): string {
  const abs = Math.abs(n)
  const formatted = abs.toLocaleString("vi-VN")
  if (n < 0) return `-${formatted} d`
  return `+${formatted} d`
}

export function formatVNDInput(n: number): string {
  if (n === 0) return ""
  return n.toLocaleString("vi-VN")
}

export function getStatusLabel(status: SinhLoiTransaction["status"]): { text: string; color: string } {
  switch (status) {
    case "success":
      return { text: "Thanh cong", color: "text-success" }
    case "pending":
      return { text: "Dang xu ly", color: "text-warning" }
    case "failed":
      return { text: "That bai", color: "text-danger" }
  }
}

export function getTxIcon(type: TransactionType): { bg: string; color: string; sign: string } {
  switch (type) {
    case "interest":
      return { bg: "bg-success/10", color: "text-success", sign: "+" }
    case "deposit":
      return { bg: "bg-info/10", color: "text-info", sign: "+" }
    case "withdrawal":
      return { bg: "bg-danger/10", color: "text-danger", sign: "-" }
  }
}

export function calculateInterest(amount: number, rate: number): number {
  return Math.round((amount * rate) / 100)
}
