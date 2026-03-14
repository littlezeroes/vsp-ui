/* ── Team Task Logger — Types & Helpers ───────────────────────────────── */

export type TaskType = "design" | "review" | "code" | "research" | "meeting" | "other"
export type TeamMember = "Vi" | "Nate" | "Duc" | "Ivy" | "Khoa"

export interface TaskEntry {
  id: string
  person: TeamMember
  type: TaskType
  description: string
  durationMinutes: number
  timestamp: string
  source: "web" | "telegram"
}

export interface WeeklyReport {
  weekKey: string
  startDate: string
  endDate: string
  entries: TaskEntry[]
}

/* ── Constants ────────────────────────────────────────────────────────── */

export const TEAM_MEMBERS: TeamMember[] = ["Vi", "Nate", "Duc", "Ivy", "Khoa"]

export const TASK_TYPES: TaskType[] = ["design", "review", "code", "research", "meeting", "other"]

export const MEMBER_COLORS: Record<TeamMember, { bg: string; text: string; emoji: string }> = {
  Vi:   { bg: "bg-blue-500",   text: "text-blue-500",   emoji: "🤖" },
  Nate: { bg: "bg-green-500",  text: "text-green-500",  emoji: "🔍" },
  Duc:  { bg: "bg-red-500",    text: "text-red-500",    emoji: "👹" },
  Ivy:  { bg: "bg-purple-500", text: "text-purple-500", emoji: "🎨" },
  Khoa: { bg: "bg-yellow-500", text: "text-yellow-500", emoji: "📋" },
}

export const TYPE_CONFIG: Record<TaskType, { bg: string; text: string; label: string }> = {
  design:   { bg: "bg-blue-500",   text: "text-blue-500",   label: "Thiet ke" },
  review:   { bg: "bg-yellow-500", text: "text-yellow-500", label: "Review" },
  code:     { bg: "bg-success",    text: "text-success",    label: "Code" },
  research: { bg: "bg-teal-500",   text: "text-teal-500",   label: "Nghien cuu" },
  meeting:  { bg: "bg-red-400",    text: "text-red-400",    label: "Hop" },
  other:    { bg: "bg-grey-400",   text: "text-grey-400",   label: "Khac" },
}

export const DURATION_PRESETS = [
  { label: "15m", minutes: 15 },
  { label: "30m", minutes: 30 },
  { label: "1h", minutes: 60 },
  { label: "2h", minutes: 120 },
  { label: "3h", minutes: 180 },
]

/* ── Week helpers ─────────────────────────────────────────────────────── */

export function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export function getWeekKey(date: Date): string {
  const week = getISOWeek(date)
  const year = date.getFullYear()
  return `${year}-W${String(week).padStart(2, "0")}`
}

export function getWeekRange(weekKey: string): { start: Date; end: Date } {
  const [yearStr, weekStr] = weekKey.split("-W")
  const year = parseInt(yearStr)
  const week = parseInt(weekStr)
  const jan4 = new Date(year, 0, 4)
  const dayOfWeek = jan4.getDay() || 7
  const start = new Date(jan4)
  start.setDate(jan4.getDate() - dayOfWeek + 1 + (week - 1) * 7)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start, end }
}

export function formatWeekLabel(weekKey: string): string {
  const { start, end } = getWeekRange(weekKey)
  const fmt = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`
  const week = weekKey.split("-W")[1]
  return `Tuan ${parseInt(week)} (${fmt(start)} - ${fmt(end)})`
}

export function prevWeekKey(weekKey: string): string {
  const { start } = getWeekRange(weekKey)
  const prev = new Date(start)
  prev.setDate(prev.getDate() - 1)
  return getWeekKey(prev)
}

export function nextWeekKey(weekKey: string): string {
  const { end } = getWeekRange(weekKey)
  const next = new Date(end)
  next.setDate(next.getDate() + 1)
  return getWeekKey(next)
}

/* ── Format helpers ───────────────────────────────────────────────────── */

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${m}m` : `${h}h`
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getDate()}/${d.getMonth() + 1}`
}

export function getDayOfWeek(iso: string): number {
  const d = new Date(iso)
  return (d.getDay() + 6) % 7 // Mon=0, Sun=6
}

export const DAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
