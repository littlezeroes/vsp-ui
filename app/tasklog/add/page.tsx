"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Check } from "lucide-react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import {
  TEAM_MEMBERS, TASK_TYPES, TYPE_CONFIG, MEMBER_COLORS, DURATION_PRESETS,
  formatDuration, type TeamMember, type TaskType,
} from "../types"

export default function AddTaskPage() {
  const router = useRouter()
  const [person, setPerson] = React.useState<TeamMember | null>(null)
  const [type, setType] = React.useState<TaskType | null>(null)
  const [description, setDescription] = React.useState("")
  const [duration, setDuration] = React.useState<number>(0)
  const [customDuration, setCustomDuration] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)

  const isValid = person && type && description.trim() && duration > 0

  const handleSubmit = async () => {
    if (!isValid || submitting) return
    setSubmitting(true)

    try {
      const res = await fetch("/api/tasklog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person, type, description: description.trim(), durationMinutes: duration, source: "web" }),
      })
      if (res.ok) {
        setDone(true)
        setTimeout(() => router.push("/tasklog"), 1200)
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="w-full max-w-[390px] min-h-screen bg-background flex flex-col items-center justify-center gap-[16px]">
        <div className="w-[56px] h-[56px] rounded-full bg-success flex items-center justify-center">
          <Check size={28} className="text-background" />
        </div>
        <p className="text-md font-semibold text-foreground">Da luu task!</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[390px] min-h-screen bg-background text-foreground flex flex-col">
      <Header
        variant="default"
        title="Them task"
        leading={
          <button type="button" onClick={() => router.back()} className="flex items-center justify-center p-[10px] min-h-[44px] rounded-full">
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Person picker */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm font-semibold text-foreground pb-[12px]">Ai</p>
          <div className="flex gap-[8px] flex-wrap">
            {TEAM_MEMBERS.map((m) => {
              const mc = MEMBER_COLORS[m]
              const active = person === m
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPerson(m)}
                  className={`flex items-center gap-[6px] px-[14px] py-[8px] rounded-full transition-colors ${
                    active ? "bg-foreground text-background" : "bg-secondary text-foreground"
                  }`}
                >
                  <span className="text-[14px]">{mc.emoji}</span>
                  <span className="text-sm font-medium">{m}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Type picker */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm font-semibold text-foreground pb-[12px]">Loai</p>
          <div className="grid grid-cols-3 gap-[8px]">
            {TASK_TYPES.map((t) => {
              const tc = TYPE_CONFIG[t]
              const active = type === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex items-center justify-center gap-[6px] px-[12px] py-[10px] rounded-full transition-colors ${
                    active ? "bg-foreground text-background" : "bg-secondary text-foreground"
                  }`}
                >
                  <div className={`w-[8px] h-[8px] rounded-full ${active ? "bg-background" : tc.bg}`} />
                  <span className="text-xs font-medium">{tc.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Description */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm font-semibold text-foreground pb-[12px]">Mo ta</p>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Review flow chuyen tien..."
            className="w-full bg-secondary rounded-[16px] px-[16px] py-[14px] text-sm text-foreground placeholder:text-foreground-secondary outline-none"
          />
        </div>

        {/* Duration picker */}
        <div className="pt-[32px] px-[22px]">
          <p className="text-sm font-semibold text-foreground pb-[12px]">Thoi gian</p>
          <div className="flex gap-[8px] flex-wrap">
            {DURATION_PRESETS.map((p) => {
              const active = duration === p.minutes && !customDuration
              return (
                <button
                  key={p.minutes}
                  type="button"
                  onClick={() => { setDuration(p.minutes); setCustomDuration("") }}
                  className={`px-[14px] py-[8px] rounded-full text-sm font-medium transition-colors ${
                    active ? "bg-foreground text-background" : "bg-secondary text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              )
            })}
            <input
              type="text"
              inputMode="numeric"
              value={customDuration}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "")
                setCustomDuration(val)
                if (val) setDuration(Number(val))
              }}
              placeholder="Phut"
              className="w-[72px] bg-secondary rounded-full px-[14px] py-[8px] text-sm text-foreground text-center placeholder:text-foreground-secondary outline-none"
            />
          </div>
          {duration > 0 && (
            <p className="text-xs text-foreground-secondary pt-[8px]">{formatDuration(duration)}</p>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 inset-x-0 px-[22px] pb-[34px] pt-[12px] bg-background">
        <Button
          variant="primary"
          size="48"
          className="w-full"
          disabled={!isValid || submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Dang luu..." : "Luu task"}
        </Button>
        <div className="flex justify-center pt-[8px]">
          <div className="w-[139px] h-[5px] rounded-full bg-foreground" />
        </div>
      </div>
    </div>
  )
}
