import { kv } from "@vercel/kv"
import { NextRequest, NextResponse } from "next/server"
import type { TaskEntry } from "@/app/tasklog/types"
import { getWeekKey } from "@/app/tasklog/types"

function checkAuth(req: NextRequest): boolean {
  const key = process.env.TASKLOG_API_KEY
  if (!key) return true // no key configured = open (dev mode)
  const header = req.headers.get("x-api-key")
  return header === key
}

/* ── POST: Create task ────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { person, type, description, durationMinutes, source } = body

  if (!person || !type || !description || !durationMinutes) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const entry: TaskEntry = {
    id: crypto.randomUUID(),
    person,
    type,
    description,
    durationMinutes: Number(durationMinutes),
    timestamp: new Date().toISOString(),
    source: source ?? "web",
  }

  const weekKey = getWeekKey(new Date())
  const kvKey = `tasks:${weekKey}`

  const existing: TaskEntry[] = (await kv.get(kvKey)) ?? []
  existing.push(entry)
  await kv.set(kvKey, existing)

  return NextResponse.json({ ok: true, entry, weekKey })
}

/* ── GET: Read week ───────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const week = searchParams.get("week") ?? getWeekKey(new Date())
  const kvKey = `tasks:${week}`

  const entries: TaskEntry[] = (await kv.get(kvKey)) ?? []

  return NextResponse.json({ weekKey: week, entries })
}
