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

/* ── Interest Tiers (Gamification) ─────────────────────────────── */
export interface InterestTier {
  rate: number
  label: string
  unlocked: boolean
  mission?: string
}

export const INTEREST_TIERS: InterestTier[] = [
  { rate: 4.5, label: "Co ban", unlocked: true },
  { rate: 4.6, label: "Bac", unlocked: false, mission: "Thanh toan 3 lan trong thang" },
  { rate: 4.8, label: "Vang", unlocked: false, mission: "Nap them 5.000.000 d" },
  { rate: 5.0, label: "Kim cuong", unlocked: false, mission: "Moi 2 ban be su dung" },
]

export const CURRENT_TIER_IDX = 0

/* ── Membership Ranks ──────────────────────────────────────────── */
export interface MembershipRank {
  id: string
  name: string
  color: string
  benefits: { text: string; available: boolean }[]
  isCurrent: boolean
}

export const MEMBERSHIP_RANKS: MembershipRank[] = [
  {
    id: "silver",
    name: "Hang Bac",
    color: "#94a3b8",
    isCurrent: true,
    benefits: [
      { text: "Mien phi rut them 50 trieu", available: true },
      { text: "Them 0.1%/nam lai suat", available: true },
      { text: "Hoan tien 0.5% khi thanh toan", available: false },
      { text: "x2 toc do len hang", available: true },
    ],
  },
  {
    id: "gold",
    name: "Hang Vang",
    color: "#f59e0b",
    isCurrent: false,
    benefits: [
      { text: "Mien phi rut them 100 trieu", available: true },
      { text: "Them 0.2%/nam lai suat", available: true },
      { text: "Hoan tien 1% khi thanh toan", available: true },
      { text: "x3 toc do len hang", available: true },
    ],
  },
  {
    id: "diamond",
    name: "Hang Kim cuong",
    color: "#818cf8",
    isCurrent: false,
    benefits: [
      { text: "Mien phi rut khong gioi han", available: true },
      { text: "Them 0.5%/nam lai suat", available: true },
      { text: "Hoan tien 2% khi thanh toan", available: true },
      { text: "x5 toc do len hang", available: true },
    ],
  },
]

/* ── Account Breakdown ─────────────────────────────────────────── */
export const MOCK_ACCOUNT_BREAKDOWN = {
  totalDeposited: 12_376_681,
  totalInterest: 100_000,
  totalWithdrawn: 1_645_633,
}

/* ── Monthly Stats ─────────────────────────────────────────────── */
export const MOCK_MONTHLY_STATS = {
  month: "Thang 3/2026",
  totalIn: 8_150_000,
  totalOut: 1_700_000,
  interestMonth: 8_036,
  cashbackMonth: 0,
}

/* ── Settings ──────────────────────────────────────────────────── */
export interface SinhLoiSettings {
  autoReceive: boolean
  payFromBalance: boolean
  showBalance: boolean
}

export const MOCK_SETTINGS: SinhLoiSettings = {
  autoReceive: false,
  payFromBalance: false,
  showBalance: true,
}

/* ── FAQ ───────────────────────────────────────────────────────── */
export interface FaqCategory {
  icon: string
  label: string
  items: { q: string; a: string }[]
}

export const FAQ_DATA: FaqCategory[] = [
  {
    icon: "user-plus",
    label: "Bat dau / Dang ky",
    items: [
      { q: "Sinh loi tu dong la gi?", a: "La tinh nang giup so du trong vi cua ban tu dong sinh loi voi lai suat canh tranh, khong can cam ket thoi gian." },
      { q: "Lam sao de kich hoat?", a: "Vao muc Sinh loi > Bam Kich hoat > Xac nhan dieu khoan > Nhap OTP." },
    ],
  },
  {
    icon: "settings",
    label: "Quan ly tai khoan",
    items: [
      { q: "Toi co the thay doi cai dat khong?", a: "Co, ban vao Cai dat de bat/tat cac tuy chon nhu Nhan tien tu dong, Thanh toan tu so du sinh loi." },
    ],
  },
  {
    icon: "dollar-sign",
    label: "Nap tien",
    items: [
      { q: "Han muc nap toi da la bao nhieu?", a: "So du toi da trong vi sinh loi la 100.000.000 d." },
      { q: "Nap tien mat bao lau?", a: "Tien nap se duoc ghi nhan ngay lap tuc." },
    ],
  },
  {
    icon: "arrow-up-right",
    label: "Rut & Thanh toan",
    items: [
      { q: "Rut tien mat phi khong?", a: "Khong mat phi rut tien. Tien se ve vi V-Smart Pay ngay lap tuc." },
      { q: "Han muc rut toi da?", a: "Toi da 30.000.000 d/ngay." },
      { q: "Thanh toan truc tiep la gi?", a: "Ban co the dung so du sinh loi de thanh toan QR, chuyen tien ma khong can rut ve vi truoc." },
    ],
  },
  {
    icon: "trending-up",
    label: "Tien loi",
    items: [
      { q: "Lai suat duoc tinh nhu the nao?", a: "Lai suat duoc tinh tren so du cuoi ngay, tra ve tai khoan moi thang vao ngay cuoi thang." },
      { q: "Lai suat co thay doi khong?", a: "Lai suat co the thay doi theo thoa thuan voi doi tac tai chinh. Ban se duoc thong bao truoc khi thay doi." },
    ],
  },
  {
    icon: "shield",
    label: "An toan & Bao mat",
    items: [
      { q: "Tien cua toi co an toan khong?", a: "Tien cua ban duoc luu ky tai ngan hang doi tac uy tin va duoc bao ve theo quy dinh phap luat." },
    ],
  },
]
