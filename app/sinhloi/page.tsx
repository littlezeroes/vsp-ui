"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"

/* ── Data ─────────────────────────────────────────────────────── */
interface Screen {
  screen: string
  route: string
  states: { label: string; param: string }[]
}

interface Epic {
  id: string
  title: string
  desc: string
  color: string
  screens: Screen[]
}

const EPICS: Epic[] = [
  {
    id: "e1",
    title: "Epic 1 — Kich hoat",
    desc: "S1 → S2 → S3 → S4",
    color: "#6366f1",
    screens: [
      {
        screen: "S1: Product Page",
        route: "/sinhloi/intro",
        states: [
          { label: "default (da eKYC)", param: "" },
          { label: "chua eKYC", param: "?state=no-ekyc" },
          { label: "error", param: "?state=error" },
          { label: "rate-changed", param: "?state=rate-changed" },
        ],
      },
      {
        screen: "S2: Xac nhan kich hoat",
        route: "/sinhloi/activate",
        states: [
          { label: "default (unchecked)", param: "" },
          { label: "valid (both checked)", param: "?state=valid" },
          { label: "loading", param: "?state=loading" },
        ],
      },
      {
        screen: "S3: OTP",
        route: "/sinhloi/otp",
        states: [
          { label: "sent (empty)", param: "?context=activate" },
          { label: "wrong", param: "?context=activate&state=wrong" },
          { label: "expired", param: "?context=activate&state=expired" },
          { label: "api-error", param: "?context=activate&state=api-error" },
        ],
      },
      {
        screen: "S4: Ket qua kich hoat",
        route: "/sinhloi/result-activate",
        states: [
          { label: "success", param: "?status=success" },
          { label: "failed", param: "?status=failed" },
          { label: "processing", param: "?status=processing" },
          { label: "non-retryable", param: "?status=failed&error=non-retryable" },
        ],
      },
    ],
  },
  {
    id: "e2",
    title: "Epic 2 — Dashboard",
    desc: "S5: So du + Chart + GD",
    color: "#22c55e",
    screens: [
      {
        screen: "S5: Dashboard — Tab San pham",
        route: "/sinhloi/dashboard",
        states: [
          { label: "loaded", param: "" },
          { label: "balance-hidden", param: "?state=dashboard-hidden" },
          { label: "zero-balance", param: "?state=dashboard-zero" },
          { label: "error", param: "?state=dashboard-error" },
        ],
      },
      {
        screen: "S5b: Dashboard — Tab Quan ly",
        route: "/sinhloi/dashboard",
        states: [
          { label: "default", param: "?tab=manage" },
        ],
      },
    ],
  },
  {
    id: "e3",
    title: "Epic 3 — Nap/Rut tien",
    desc: "S7 → S8 → S9 → S10",
    color: "#f59e0b",
    screens: [
      {
        screen: "S7: Nap/Rut tien",
        route: "/sinhloi/deposit-withdraw",
        states: [
          { label: "Nap - empty", param: "?tab=deposit" },
          { label: "Nap - valid", param: "?tab=deposit&state=valid" },
          { label: "Nap - exceed", param: "?tab=deposit&state=exceed" },
          { label: "Rut - valid", param: "?tab=withdraw&state=valid" },
          { label: "Rut - exceed", param: "?tab=withdraw&state=exceed" },
        ],
      },
      {
        screen: "S8: Xac nhan giao dich",
        route: "/sinhloi/confirm-tx",
        states: [
          { label: "Nap ready", param: "?type=deposit&amount=5000000" },
          { label: "Rut ready", param: "?type=withdraw&amount=1000000" },
          { label: "loading", param: "?type=deposit&amount=5000000&state=loading" },
        ],
      },
      {
        screen: "S9: Auth PIN/Biometric",
        route: "/sinhloi/auth",
        states: [
          { label: "auth-method", param: "?type=deposit&amount=5000000" },
          { label: "pin-entry", param: "?type=deposit&amount=5000000&state=pin" },
          { label: "pin-error", param: "?type=deposit&amount=5000000&state=pin-error" },
          { label: "pin-locked", param: "?type=deposit&amount=5000000&state=pin-locked" },
        ],
      },
      {
        screen: "S10: Ket qua giao dich",
        route: "/sinhloi/result-tx/deposit",
        states: [
          { label: "success (Nap)", param: "?amount=5000000&status=success" },
          { label: "processing (Rut)", param: "?amount=1000000&status=processing" },
          { label: "failed (Nap)", param: "?amount=5000000&status=failed" },
        ],
      },
    ],
  },
  {
    id: "e4",
    title: "Epic 4 — Lich su giao dich",
    desc: "S11 · S12",
    color: "#8b5cf6",
    screens: [
      {
        screen: "S11: Lich su giao dich",
        route: "/sinhloi/history",
        states: [
          { label: "loaded", param: "" },
          { label: "empty", param: "?state=empty" },
          { label: "loading", param: "?state=loading" },
        ],
      },
      {
        screen: "S12: Chi tiet giao dich (success)",
        route: "/sinhloi/history/t1",
        states: [
          { label: "loaded", param: "" },
        ],
      },
      {
        screen: "S12: Chi tiet giao dich (failed)",
        route: "/sinhloi/history/t10",
        states: [
          { label: "loaded", param: "" },
        ],
      },
      {
        screen: "S12: Chi tiet giao dich (not found)",
        route: "/sinhloi/history/tx-invalid",
        states: [
          { label: "not-found", param: "" },
        ],
      },
    ],
  },
  {
    id: "e5",
    title: "Epic 5 — Huy sinh loi",
    desc: "S14 → S15 → S3(cancel) → S16",
    color: "#ef4444",
    screens: [
      {
        screen: "S14: Dieu khoan & Hop dong",
        route: "/sinhloi/terms",
        states: [{ label: "default", param: "" }],
      },
      {
        screen: "S15: Xac nhan huy",
        route: "/sinhloi/cancel",
        states: [
          { label: "co so du", param: "" },
          { label: "loading", param: "?state=loading" },
        ],
      },
      {
        screen: "S16: Ket qua huy",
        route: "/sinhloi/result-cancel",
        states: [
          { label: "success", param: "?status=success" },
          { label: "failed", param: "?status=failed" },
        ],
      },
    ],
  },
  {
    id: "e6",
    title: "Epic 6 — Gamification & Hang",
    desc: "S17 · S18 · S19",
    color: "#f59e0b",
    screens: [
      {
        screen: "S17: Nang cap lai suat",
        route: "/sinhloi/upgrade",
        states: [
          { label: "default", param: "" },
        ],
      },
      {
        screen: "S18: Hang thanh vien",
        route: "/sinhloi/membership",
        states: [
          { label: "Hang Bac (current)", param: "" },
        ],
      },
      {
        screen: "S19: Chi tiet tai khoan",
        route: "/sinhloi/account-detail",
        states: [
          { label: "default", param: "" },
        ],
      },
    ],
  },
  {
    id: "e7",
    title: "Epic 7 — Cai dat & FAQ",
    desc: "S20 · S21",
    color: "#06b6d4",
    screens: [
      {
        screen: "S20: Cai dat",
        route: "/sinhloi/settings",
        states: [
          { label: "default", param: "" },
        ],
      },
      {
        screen: "S21: Cau hoi thuong gap",
        route: "/sinhloi/faq",
        states: [
          { label: "default", param: "" },
        ],
      },
    ],
  },
]

/* ── Flow charts per epic ─────────────────────────────────────── */
const FLOW_CHARTS: Record<string, string> = {
  e1: `flowchart TD
  START((Vao\\nSinh loi)) --> S1[S1: Product Page\\nGioi thieu san pham]
  S1 --> D1{Da eKYC?}
  D1 -->|No| EKYC[Chuyen sang eKYC]
  EKYC --> S1
  D1 -->|Yes| S2[S2: Xac nhan kich hoat\\nThong tin + Dieu khoan]
  S2 --> D2{Dong y\\ndieu khoan?}
  D2 -->|No| S1
  D2 -->|Yes| S3[S3: Nhap OTP\\n6 so tu SMS]
  S3 --> D3{OTP dung?}
  D3 -->|No| D3B{Het lan thu?}
  D3B -->|No| S3
  D3B -->|Yes| S4F[S4: THAT BAI]
  D3 -->|Yes| S4S[S4: THANH CONG]
  S4S --> DASH((Dashboard))
  S4F --> S1
  classDef st fill:#6366f1,stroke:#4f46e5,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#6366f1,color:#c7d2fe
  classDef ok fill:#052e16,stroke:#22c55e,color:#86efac
  classDef fl fill:#450a0a,stroke:#ef4444,color:#fca5a5
  classDef dl fill:#1e1b4b,stroke:#818cf8,color:#c7d2fe
  class START,DASH st
  class S1,S2,S3 sc
  class D1,D2,D3,D3B dc
  class S4S ok
  class S4F fl
  class EKYC dl`,

  e2: `flowchart TD
  DASH((Vao\\nDashboard)) --> S5[S5: Dashboard\\nSo du + Chart + GD]
  S5 --> D5{Hanh dong?}
  D5 -->|Nap tien| NAP[Go Epic 3:\\nNhap so tien Nap]
  D5 -->|Rut tien| D5B{So du > 0?}
  D5B -->|No| O7[Dialog:\\nChua co so du]
  O7 --> S5
  D5B -->|Yes| RUT[Go Epic 3:\\nNhap so tien Rut]
  D5 -->|Xem lich su| LS[Go Epic 4:\\nLich su GD]
  D5 -->|Tat sinh loi| HUY[Go Epic 5:\\nXac nhan huy]
  D5 -->|Dieu khoan| TERMS[S14: Dieu khoan\\n& Hop dong]
  TERMS --> S5
  classDef st fill:#22c55e,stroke:#16a34a,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#22c55e,color:#bbf7d0
  classDef dl fill:#1e1b4b,stroke:#818cf8,color:#c7d2fe
  classDef lk fill:#162032,stroke:#3b82f6,color:#93c5fd
  class DASH st
  class S5,TERMS sc
  class D5,D5B dc
  class O7 dl
  class NAP,RUT,LS,HUY lk`,

  e3: `flowchart TD
  START((Tu\\nDashboard)) --> S7[S7: Nhap so tien\\nNap hoac Rut]
  S7 --> D7{So tien\\nhop le?}
  D7 -->|No| S7
  D7 -->|Yes| S8[S8: Xac nhan GD\\nSo tien + Phi]
  S8 --> D8{Xac nhan?}
  D8 -->|No| S7
  D8 -->|Yes| S9[S9: Xac thuc\\nChon phuong thuc]
  S9 --> D9{Phuong thuc?}
  D9 -->|Face/Touch ID| D9B{OK?}
  D9B -->|Yes| S10S[S10: THANH CONG]
  D9B -->|No| S10F[S10: THAT BAI]
  D9 -->|Ma PIN| PIN[Nhap 6 so PIN]
  PIN --> D9P{PIN dung?}
  D9P -->|Yes| S10S
  D9P -->|No| D9L{Khoa TK?}
  D9L -->|No| PIN
  D9L -->|Yes| S10F
  S10S --> DASH((Dashboard))
  S10F --> DASH
  classDef st fill:#f59e0b,stroke:#d97706,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#f59e0b,color:#fde68a
  classDef ok fill:#052e16,stroke:#22c55e,color:#86efac
  classDef fl fill:#450a0a,stroke:#ef4444,color:#fca5a5
  class START,DASH st
  class S7,S8,S9,PIN sc
  class D7,D8,D9,D9B,D9P,D9L dc
  class S10S ok
  class S10F fl`,

  e4: `flowchart TD
  START((Tu\\nDashboard)) --> S11[S11: Lich su GD\\nDanh sach]
  S11 --> D11{Hanh dong?}
  D11 -->|Chon 1 GD| S12[S12: Chi tiet GD\\nSo tien, ngay, TT]
  D11 -->|Quay lai| DASH((Dashboard))
  S12 --> S11
  classDef st fill:#8b5cf6,stroke:#7c3aed,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#8b5cf6,color:#ddd6fe
  class START,DASH st
  class S11,S12 sc
  class D11 dc`,

  e5: `flowchart TD
  START((Tu\\nQuan ly)) --> S14[S14: Dieu khoan\\n& Hop dong]
  S14 --> S15[S15: Xac nhan huy\\nSo du + Lai du kien]
  S15 --> D15{Quyet dinh?}
  D15 -->|Giu tinh nang| DASH((Dashboard))
  D15 -->|Tat sinh loi| S3[S3: Nhap OTP\\n6 so tu SMS]
  S3 --> D3{OTP dung?}
  D3 -->|Sai| D3R{Het\\nlan thu?}
  D3R -->|Chua| S3
  D3R -->|Het| S16F[S16: HUY THAT BAI\\nVui long thu lai]
  D3 -->|Dung| DB{Co so du?}
  DB -->|Co| REFUND[Tra so du + lai\\nve Vi V-Smart Pay]
  DB -->|Khong| SKIP[Khong can\\nhoan tien]
  REFUND --> S16S[S16: HUY THANH CONG]
  SKIP --> S16S
  S16S --> HOME((Trang chu))
  S16F --> S15
  classDef st fill:#ef4444,stroke:#dc2626,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#ef4444,color:#fecaca
  classDef ok fill:#052e16,stroke:#22c55e,color:#86efac
  classDef fl fill:#450a0a,stroke:#ef4444,color:#fca5a5
  classDef hm fill:#6366f1,stroke:#4f46e5,color:#fff
  classDef ac fill:#162032,stroke:#3b82f6,color:#93c5fd
  class START st
  class DASH,HOME hm
  class S14,S15,S3 sc
  class D15,D3,D3R,DB dc
  class S16S ok
  class S16F fl
  class REFUND,SKIP ac`,

  e6: `flowchart TD
  START((Tu\\nDashboard)) --> S17[S17: Nang cap lai suat\\nTier + Nhiem vu]
  S17 --> D17{Lam nhiem vu?}
  D17 -->|Thanh toan 3 lan| T1[Unlock 4.6%]
  D17 -->|Nap 5tr| T2[Unlock 4.8%]
  D17 -->|Moi 2 ban be| T3[Unlock 5.0%]
  T1 --> DASH((Dashboard))
  T2 --> DASH
  T3 --> DASH
  START --> S18[S18: Hang thanh vien\\nBac · Vang · Kim cuong]
  S18 --> DASH
  START --> S19[S19: Chi tiet tai khoan\\nBreakdown + Settings]
  S19 --> D19{Hanh dong?}
  D19 -->|Xem lich su| LS[Go Epic 4]
  D19 -->|Bat Nhan tien TD| SET[Toggle ON]
  D19 -->|Cai dat TT| S20[Go S20: Cai dat]
  SET --> S19
  classDef st fill:#f59e0b,stroke:#d97706,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#f59e0b,color:#fde68a
  classDef ok fill:#052e16,stroke:#22c55e,color:#86efac
  classDef lk fill:#162032,stroke:#3b82f6,color:#93c5fd
  class START,DASH st
  class S17,S18,S19 sc
  class D17,D19 dc
  class T1,T2,T3 ok
  class LS,SET,S20 lk`,

  e7: `flowchart TD
  START((Tu\\nDashboard)) --> S20[S20: Cai dat\\n3 toggles]
  S20 --> D20{Thay doi?}
  D20 -->|Toggle Nhan tien TD| ON1[Auto-receive ON/OFF]
  D20 -->|Toggle TT tu SDSL| ON2[Pay-from-balance ON/OFF]
  D20 -->|Toggle Hien thi| ON3[Show-balance ON/OFF]
  ON1 --> S20
  ON2 --> S20
  ON3 --> S20
  START --> S21[S21: FAQ\\nChon chu de]
  S21 --> D21{Chon?}
  D21 -->|Chu de| QA[Xem cau hoi + tra loi]
  D21 -->|Chinh sach| TERMS[Go S14: Dieu khoan]
  QA --> S21
  classDef st fill:#06b6d4,stroke:#0891b2,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#06b6d4,color:#a5f3fc
  classDef ac fill:#162032,stroke:#3b82f6,color:#93c5fd
  classDef lk fill:#1e1b4b,stroke:#818cf8,color:#c7d2fe
  class START st
  class S20,S21 sc
  class D20,D21 dc
  class ON1,ON2,ON3,QA ac
  class TERMS lk`,
}

/* Flatten for Prev/Next navigation */
const ALL_SCREENS = EPICS.flatMap((e) => e.screens)
const TOTAL_STATES = ALL_SCREENS.reduce((acc, s) => acc + s.states.length, 0)

function findEpicIdx(flatScreenIdx: number): number {
  let count = 0
  for (let i = 0; i < EPICS.length; i++) {
    count += EPICS[i].screens.length
    if (flatScreenIdx < count) return i
  }
  return 0
}

/* ── Shared styles ────────────────────────────────────────────── */
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: "8px 16px",
  fontSize: 12,
  fontWeight: 600,
  fontFamily: FONT,
  border: "none",
  borderBottom: active ? "2px solid #fff" : "2px solid transparent",
  background: "transparent",
  color: active ? "#fff" : "#525252",
  cursor: "pointer",
  letterSpacing: "0.5px",
})

/* ── Mermaid renderer ─────────────────────────────────────────── */
function FlowRenderer({ chart, epicId }: { chart: string; epicId: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function render() {
      const mermaid = (await import("mermaid")).default
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          darkMode: true,
          primaryColor: "#6366f1",
          primaryTextColor: "#e5e5e5",
          primaryBorderColor: "#4f46e5",
          lineColor: "#525252",
          secondaryColor: "#1e1b4b",
          tertiaryColor: "#0f172a",
          fontSize: "13px",
          fontFamily: FONT,
        },
        flowchart: { htmlLabels: true, curve: "basis", padding: 14, nodeSpacing: 28, rankSpacing: 44 },
      })
      if (cancelled || !ref.current) return
      const uid = `flow-${epicId}-${Date.now()}`
      const { svg } = await mermaid.render(uid, chart)
      if (cancelled || !ref.current) return
      ref.current.innerHTML = svg
      const svgEl = ref.current.querySelector("svg")
      if (svgEl) { svgEl.style.maxWidth = "100%"; svgEl.style.height = "auto" }
    }
    render()
    return () => { cancelled = true }
  }, [chart, epicId])

  return <div ref={ref} style={{ display: "flex", justifyContent: "center", overflow: "auto" }} />
}

/* ── Sidebar (shared between UI and Flow) ─────────────────────── */
function Sidebar({
  epics,
  expandedEpic,
  setExpandedEpic,
  activeEpicId,
  onSelectEpic,
  mode,
  /* UI mode props */
  screenIdx,
  stateIdx,
  onSelectScreen,
  onSelectState,
  getFlatIdx,
}: {
  epics: Epic[]
  expandedEpic: string
  setExpandedEpic: (id: string) => void
  activeEpicId?: string
  onSelectEpic?: (id: string) => void
  mode: "ui" | "flow"
  screenIdx?: number
  stateIdx?: number
  onSelectScreen?: (flatIdx: number) => void
  onSelectState?: (idx: number) => void
  getFlatIdx?: (epicIdx: number, localScreenIdx: number) => number
}) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
      {epics.map((epic, eIdx) => {
        const isExpanded = expandedEpic === epic.id
        const epicStateCount = epic.screens.reduce((a, s) => a + s.states.length, 0)

        return (
          <div key={epic.id}>
            <button
              onClick={() => {
                setExpandedEpic(isExpanded ? "" : epic.id)
                if (mode === "flow" && onSelectEpic) onSelectEpic(epic.id)
              }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                width: "100%", textAlign: "left", padding: "10px 16px",
                background: isExpanded ? `${epic.color}10` : "transparent",
                border: "none", borderLeft: `3px solid ${isExpanded ? epic.color : "transparent"}`,
                color: isExpanded ? "#fff" : "#a3a3a3",
                fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT, letterSpacing: "0.3px",
              }}
            >
              <span style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s", fontSize: 10 }}>&#9654;</span>
              <span style={{ flex: 1 }}>{epic.title}</span>
              <span style={{ fontSize: 10, color: "#525252", fontWeight: 400 }}>
                {mode === "ui" ? epicStateCount : `${epic.screens.length} screens`}
              </span>
            </button>

            {isExpanded && (
              <div style={{ padding: "0 16px 6px 30px", fontSize: 10, color: "#525252" }}>{epic.desc}</div>
            )}

            {/* UI mode: show screens + state pills */}
            {mode === "ui" && isExpanded && getFlatIdx && onSelectScreen && onSelectState &&
              epic.screens.map((screen, sIdx) => {
                const flatIdx = getFlatIdx(eIdx, sIdx)
                const isActive = flatIdx === screenIdx
                return (
                  <div key={sIdx}>
                    <button
                      onClick={() => onSelectScreen(flatIdx)}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "6px 16px 6px 30px",
                        background: isActive ? `${epic.color}20` : "transparent",
                        border: "none", color: isActive ? "#fff" : "#a3a3a3",
                        fontSize: 12, fontWeight: isActive ? 600 : 400, cursor: "pointer", fontFamily: FONT,
                      }}
                    >
                      {screen.screen}
                    </button>
                    {isActive && (
                      <div style={{ padding: "4px 16px 8px 40px", display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {screen.states.map((s, idx) => {
                          const isStateActive = idx === stateIdx
                          return (
                            <button
                              key={idx}
                              onClick={() => onSelectState(idx)}
                              style={{
                                padding: "3px 10px", borderRadius: 100, border: "none",
                                fontSize: 10, fontWeight: isStateActive ? 600 : 400,
                                background: isStateActive ? epic.color : "#262626",
                                color: isStateActive ? "#fff" : "#a3a3a3",
                                cursor: "pointer", fontFamily: FONT,
                              }}
                            >
                              {s.label}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })
            }

            {/* Flow mode: show screen list (no states) */}
            {mode === "flow" && isExpanded &&
              epic.screens.map((screen, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    padding: "4px 16px 4px 30px", fontSize: 11, color: "#737373", fontFamily: FONT,
                  }}
                >
                  {screen.screen}
                </div>
              ))
            }
          </div>
        )
      })}
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function AllStatesPage() {
  const [tab, setTab] = useState<"ui" | "flow">("ui")

  /* UI mode state */
  const [screenIdx, setScreenIdx] = useState(0)
  const [stateIdx, setStateIdx] = useState(0)
  const [expandedEpicUI, setExpandedEpicUI] = useState("e1")

  /* Flow mode state */
  const [flowEpicId, setFlowEpicId] = useState("e1")
  const [expandedEpicFlow, setExpandedEpicFlow] = useState("e1")

  const currentScreen = ALL_SCREENS[screenIdx]
  const currentState = currentScreen.states[stateIdx]
  const iframeSrc = `${currentScreen.route}${currentState.param}`
  const currentEpicIdx = findEpicIdx(screenIdx)
  const currentEpic = EPICS[currentEpicIdx]
  const flowEpic = EPICS.find((e) => e.id === flowEpicId) || EPICS[0]

  function selectScreen(flatIdx: number) {
    setScreenIdx(flatIdx)
    setStateIdx(0)
    setExpandedEpicUI(EPICS[findEpicIdx(flatIdx)].id)
  }

  function getFlatIdx(epicIdx: number, localScreenIdx: number): number {
    let flat = 0
    for (let i = 0; i < epicIdx; i++) flat += EPICS[i].screens.length
    return flat + localScreenIdx
  }

  const globalStatePos =
    ALL_SCREENS.slice(0, screenIdx).reduce((acc, s) => acc + s.states.length, 0) + stateIdx + 1

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0a0a", color: "#e5e5e5", fontFamily: FONT }}>
      {/* ── Sidebar ── */}
      <div style={{ width: 300, minWidth: 300, borderRight: "1px solid #262626", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "20px 16px 0", borderBottom: "1px solid #262626" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>
            SINH LOI TU DONG v2
          </div>
          <div style={{ fontSize: 11, color: "#737373", marginTop: 4 }}>
            5 epics &middot; {ALL_SCREENS.length} screens &middot; {TOTAL_STATES} states
          </div>
          {/* Tab bar */}
          <div style={{ display: "flex", gap: 0, marginTop: 12 }}>
            <button style={tabStyle(tab === "ui")} onClick={() => setTab("ui")}>UI</button>
            <button style={tabStyle(tab === "flow")} onClick={() => setTab("flow")}>Flow</button>
          </div>
        </div>

        {/* Sidebar content */}
        {tab === "ui" ? (
          <Sidebar
            epics={EPICS}
            expandedEpic={expandedEpicUI}
            setExpandedEpic={setExpandedEpicUI}
            mode="ui"
            screenIdx={screenIdx}
            stateIdx={stateIdx}
            onSelectScreen={selectScreen}
            onSelectState={setStateIdx}
            getFlatIdx={getFlatIdx}
          />
        ) : (
          <Sidebar
            epics={EPICS}
            expandedEpic={expandedEpicFlow}
            setExpandedEpic={(id) => { setExpandedEpicFlow(id); if (id) setFlowEpicId(id) }}
            activeEpicId={flowEpicId}
            onSelectEpic={setFlowEpicId}
            mode="flow"
          />
        )}
      </div>

      {/* ── Main area ── */}
      {tab === "ui" ? (
        /* ── Device Preview ── */
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "16px 32px", overflow: "hidden" }}>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: `${currentEpic.color}20`, color: currentEpic.color, letterSpacing: "0.3px" }}>
                {currentEpic.title.split(" — ")[0]}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{currentScreen.screen}</div>
            <div style={{ fontSize: 11, color: "#525252", marginTop: 2 }}>{currentState.label} &mdash; {iframeSrc}</div>
          </div>

          {(() => {
            const SCALE = 0.78, W = 390, H = 844, PAD = 8
            const frameW = Math.round(W * SCALE) + PAD * 2
            const frameH = Math.round(H * SCALE) + PAD * 2
            return (
              <div style={{ width: frameW, height: frameH, borderRadius: Math.round(52 * SCALE), background: "#1a1a1a", border: "1px solid #333", padding: PAD, boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)", position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: Math.round(12 * SCALE) + PAD, left: "50%", transform: "translateX(-50%)", width: Math.round(120 * SCALE), height: Math.round(36 * SCALE), borderRadius: 16, background: "#000", zIndex: 10 }} />
                <div style={{ width: Math.round(W * SCALE), height: Math.round(H * SCALE), borderRadius: Math.round(44 * SCALE), overflow: "hidden", background: "#000" }}>
                  <iframe key={iframeSrc} src={iframeSrc} style={{ width: W, height: H, border: "none", transform: `scale(${SCALE})`, transformOrigin: "0 0" }} title={`${currentScreen.screen} — ${currentState.label}`} />
                </div>
              </div>
            )
          })()}

          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <button
              onClick={() => { if (stateIdx > 0) { setStateIdx(stateIdx - 1) } else if (screenIdx > 0) { const prev = ALL_SCREENS[screenIdx - 1]; selectScreen(screenIdx - 1); setStateIdx(prev.states.length - 1) } }}
              disabled={screenIdx === 0 && stateIdx === 0}
              style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: screenIdx === 0 && stateIdx === 0 ? "#404040" : "#e5e5e5", fontSize: 12, cursor: screenIdx === 0 && stateIdx === 0 ? "not-allowed" : "pointer", fontFamily: FONT }}
            >
              ← Prev
            </button>
            <span style={{ fontSize: 11, color: "#525252", minWidth: 60, textAlign: "center" }}>{globalStatePos} / {TOTAL_STATES}</span>
            <button
              onClick={() => { if (stateIdx < currentScreen.states.length - 1) { setStateIdx(stateIdx + 1) } else if (screenIdx < ALL_SCREENS.length - 1) { selectScreen(screenIdx + 1) } }}
              disabled={screenIdx === ALL_SCREENS.length - 1 && stateIdx === currentScreen.states.length - 1}
              style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: screenIdx === ALL_SCREENS.length - 1 && stateIdx === currentScreen.states.length - 1 ? "#404040" : "#e5e5e5", fontSize: 12, cursor: screenIdx === ALL_SCREENS.length - 1 && stateIdx === currentScreen.states.length - 1 ? "not-allowed" : "pointer", fontFamily: FONT }}
            >
              Next →
            </button>
          </div>
        </div>
      ) : (
        /* ── Flow view (no device frame) ── */
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Flow header */}
          <div style={{ padding: "20px 32px 16px", borderBottom: "1px solid #1a1a1a", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: flowEpic.color }} />
              <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{flowEpic.title}</span>
            </div>
            <div style={{ fontSize: 12, color: "#737373" }}>{flowEpic.desc}</div>
            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
              {[
                { bg: "#1a1a2e", border: "#374151", label: "Screen" },
                { bg: "#0f172a", border: "#6366f1", label: "Decision" },
                { bg: "#052e16", border: "#22c55e", label: "Thanh cong" },
                { bg: "#450a0a", border: "#ef4444", label: "That bai" },
                { bg: "#162032", border: "#3b82f6", label: "Link epic" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: item.bg, border: `1.5px solid ${item.border}` }} />
                  <span style={{ color: "#737373" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mermaid chart */}
          <div style={{ flex: 1, overflow: "auto", padding: "32px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <FlowRenderer key={flowEpicId} chart={FLOW_CHARTS[flowEpicId]} epicId={flowEpicId} />
          </div>
        </div>
      )}
    </div>
  )
}
