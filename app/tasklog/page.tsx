"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import {
  TEAM_MEMBERS, TASK_TYPES, TYPE_CONFIG, MEMBER_COLORS, DAY_LABELS,
  getWeekKey, formatWeekLabel, prevWeekKey, nextWeekKey, formatDuration, getDayOfWeek,
  type TaskEntry, type TeamMember, type TaskType,
} from "./types"

/* ── Fetch hook ───────────────────────────────────────────────────────── */
function useWeekData(weekKey: string) {
  const [entries, setEntries] = React.useState<TaskEntry[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    fetch(`/api/tasklog?week=${weekKey}`)
      .then((r) => r.json())
      .then((d) => { setEntries(d.entries ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [weekKey])

  return { entries, loading }
}

/* ── Team Timeline (horizontal bars) ──────────────────────────────────── */
function TeamTimeline({ entries }: { entries: TaskEntry[] }) {
  const maxMinutesPerDay = 480 // 8h as 100% width

  return (
    <div className="px-[22px]">
      <p className="text-sm font-semibold text-foreground pb-[12px]">Tong quan team</p>

      {/* Day headers */}
      <div className="flex gap-[2px] pl-[56px] pb-[6px]">
        {DAY_LABELS.map((d) => (
          <div key={d} className="flex-1 text-center text-[10px] font-medium text-foreground-secondary">{d}</div>
        ))}
      </div>

      {/* Rows per person */}
      {TEAM_MEMBERS.map((person) => {
        const personEntries = entries.filter((e) => e.person === person)
        const mc = MEMBER_COLORS[person]

        return (
          <div key={person} className="flex items-center gap-[8px] py-[6px]">
            {/* Avatar */}
            <div className="w-[48px] shrink-0 flex items-center gap-[4px]">
              <span className="text-[14px]">{mc.emoji}</span>
              <span className="text-xs font-medium text-foreground truncate">{person}</span>
            </div>

            {/* 7 day cells */}
            <div className="flex-1 flex gap-[2px]">
              {Array.from({ length: 7 }, (_, dayIdx) => {
                const dayEntries = personEntries.filter((e) => getDayOfWeek(e.timestamp) === dayIdx)
                const totalMin = dayEntries.reduce((s, e) => s + e.durationMinutes, 0)
                const pct = Math.min(100, (totalMin / maxMinutesPerDay) * 100)

                return (
                  <div key={dayIdx} className="flex-1 h-[20px] bg-secondary rounded-[4px] overflow-hidden relative">
                    {totalMin > 0 && (
                      <div
                        className={`h-full rounded-[4px] ${mc.bg} opacity-70`}
                        style={{ width: `${pct}%` }}
                      />
                    )}
                    {totalMin > 0 && (
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-background">
                        {formatDuration(totalMin)}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Type Breakdown (horizontal bars) ─────────────────────────────────── */
function TypeBreakdown({ entries }: { entries: TaskEntry[] }) {
  const totalMinutes = entries.reduce((s, e) => s + e.durationMinutes, 0)

  const byType = TASK_TYPES.map((type) => {
    const typeEntries = entries.filter((e) => e.type === type)
    const minutes = typeEntries.reduce((s, e) => s + e.durationMinutes, 0)
    return { type, minutes, count: typeEntries.length }
  }).filter((t) => t.minutes > 0)
    .sort((a, b) => b.minutes - a.minutes)

  return (
    <div className="px-[22px]">
      <p className="text-sm font-semibold text-foreground pb-[12px]">Theo loai task</p>
      <div className="flex flex-col gap-[10px]">
        {byType.map(({ type, minutes, count }) => {
          const tc = TYPE_CONFIG[type]
          const pct = totalMinutes > 0 ? (minutes / totalMinutes) * 100 : 0
          return (
            <div key={type}>
              <div className="flex items-center justify-between pb-[4px]">
                <span className="text-xs font-medium text-foreground">{tc.label}</span>
                <span className="text-xs text-foreground-secondary">{count} tasks · {formatDuration(minutes)}</span>
              </div>
              <div className="h-[8px] bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${tc.bg}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
        {byType.length === 0 && (
          <p className="text-xs text-foreground-secondary text-center py-[20px]">Chua co task nao</p>
        )}
      </div>
    </div>
  )
}

/* ── Productivity Metrics (2×2 grid) ──────────────────────────────────── */
function ProductivityMetrics({ entries }: { entries: TaskEntry[] }) {
  const totalTasks = entries.length
  const totalMinutes = entries.reduce((s, e) => s + e.durationMinutes, 0)

  // Unique days worked
  const uniqueDays = new Set(entries.map((e) => e.timestamp.slice(0, 10))).size
  const tasksPerDay = uniqueDays > 0 ? (totalTasks / uniqueDays).toFixed(1) : "0"
  const hoursPerDay = uniqueDays > 0 ? (totalMinutes / 60 / uniqueDays).toFixed(1) : "0"

  // Top type
  const typeCounts = new Map<TaskType, number>()
  for (const e of entries) typeCounts.set(e.type, (typeCounts.get(e.type) ?? 0) + 1)
  let topType: TaskType = "other"
  let topCount = 0
  typeCounts.forEach((c, t) => { if (c > topCount) { topCount = c; topType = t } })

  // Top person
  const personMinutes = new Map<TeamMember, number>()
  for (const e of entries) personMinutes.set(e.person, (personMinutes.get(e.person) ?? 0) + e.durationMinutes)
  let topPerson: TeamMember = "Vi"
  let topMin = 0
  personMinutes.forEach((m, p) => { if (m > topMin) { topMin = m; topPerson = p } })

  const stats = [
    { label: "Tasks/ngay", value: tasksPerDay, sub: `${totalTasks} tong` },
    { label: "Gio/ngay", value: `${hoursPerDay}h`, sub: formatDuration(totalMinutes) },
    { label: "Top loai", value: TYPE_CONFIG[topType].label, sub: `${topCount} tasks` },
    { label: "Top nguoi", value: topPerson, sub: formatDuration(topMin) },
  ]

  return (
    <div className="px-[22px]">
      <p className="text-sm font-semibold text-foreground pb-[12px]">Nang suat</p>
      <div className="grid grid-cols-2 gap-[12px]">
        {stats.map((s) => (
          <div key={s.label} className="bg-secondary rounded-[28px] p-[16px]">
            <p className="text-xs text-foreground-secondary">{s.label}</p>
            <p className="text-lg font-bold text-foreground pt-[4px]">{s.value}</p>
            <p className="text-xs text-foreground-secondary pt-[2px]">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Recent Entries ───────────────────────────────────────────────────── */
function RecentEntries({ entries }: { entries: TaskEntry[] }) {
  const sorted = [...entries].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 10)

  return (
    <div className="px-[22px]">
      <p className="text-sm font-semibold text-foreground pb-[8px]">Gan day</p>
      {sorted.length === 0 && (
        <p className="text-xs text-foreground-secondary text-center py-[20px]">Chua co task nao</p>
      )}
      {sorted.map((entry, idx) => {
        const tc = TYPE_CONFIG[entry.type]
        const mc = MEMBER_COLORS[entry.person]
        const time = new Date(entry.timestamp)
        const timeStr = `${time.getDate()}/${time.getMonth() + 1} ${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`
        return (
          <div key={entry.id} className={`flex items-center gap-[12px] py-[12px] ${idx < sorted.length - 1 ? "border-b border-border" : ""}`}>
            <div className={`w-[8px] h-[8px] rounded-full ${tc.bg} shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-[6px]">
                <span className="text-[12px]">{mc.emoji}</span>
                <p className="text-sm font-medium text-foreground truncate">{entry.description}</p>
              </div>
              <p className="text-xs text-foreground-secondary">{tc.label} · {formatDuration(entry.durationMinutes)} · {timeStr}</p>
            </div>
            <span className="text-xs font-medium text-foreground-secondary shrink-0">
              {entry.source === "telegram" ? "📱" : "🌐"}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function TaskLogDashboard() {
  const router = useRouter()
  const [weekKey, setWeekKey] = React.useState(() => getWeekKey(new Date()))
  const { entries, loading } = useWeekData(weekKey)
  const isCurrentWeek = weekKey === getWeekKey(new Date())

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="px-[22px] pt-[56px] pb-[8px]">
        <p className="text-2xl font-bold text-foreground">Task Logger</p>
      </div>

      {/* Week selector */}
      <div className="flex items-center justify-between px-[22px] py-[12px]">
        <button type="button" onClick={() => setWeekKey(prevWeekKey(weekKey))} className="p-[8px] rounded-full">
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <p className="text-sm font-semibold text-foreground">{formatWeekLabel(weekKey)}</p>
        <button
          type="button"
          onClick={() => !isCurrentWeek && setWeekKey(nextWeekKey(weekKey))}
          className="p-[8px] rounded-full"
          disabled={isCurrentWeek}
        >
          <ChevronRight size={18} className={isCurrentWeek ? "text-foreground-secondary opacity-30" : "text-foreground"} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {loading ? (
          <div className="px-[22px] pt-[32px]">
            <div className="h-[200px] rounded-[28px] bg-secondary animate-pulse" />
          </div>
        ) : (
          <>
            <div className="pt-[16px]"><TeamTimeline entries={entries} /></div>
            <div className="pt-[32px]"><TypeBreakdown entries={entries} /></div>
            <div className="pt-[32px]"><ProductivityMetrics entries={entries} /></div>
            <div className="pt-[32px]"><RecentEntries entries={entries} /></div>
          </>
        )}
      </div>

      {/* FAB */}
      <button
        type="button"
        onClick={() => router.push("/tasklog/add")}
        className="fixed bottom-[32px] right-[22px] w-[56px] h-[56px] rounded-full bg-foreground flex items-center justify-center shadow-lg"
      >
        <Plus size={24} className="text-background" />
      </button>

      {/* Home indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[21px] flex items-end justify-center pb-[4px] bg-background pointer-events-none">
        <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
      </div>
    </div>
  )
}
