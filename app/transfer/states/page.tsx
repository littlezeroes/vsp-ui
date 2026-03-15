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
    title: "Epic 1 — Chọn người nhận",
    desc: "S1 Entry → Sheet P2P → Sheet Bank → Sheet Search → Sheet Nickname",
    color: "#6366f1",
    screens: [
      {
        screen: "S1: Entry Hub",
        route: "/transfer/entry",
        states: [
          { label: "default", param: "" },
          { label: "empty", param: "?state=empty" },
        ],
      },
      {
        screen: "S1-C: Sheet Global Search",
        route: "/transfer/entry",
        states: [
          { label: "default (đã lưu + danh bạ)", param: "?state=sheet-search" },
          { label: "typing SĐT", param: "?state=sheet-search-typing-sdt" },
          { label: "typing STK (bank list)", param: "?state=sheet-search-typing-stk" },
          { label: "typing tên", param: "?state=sheet-search-typing-name" },
          { label: "STK → bank list", param: "?state=sheet-search-stk-resolved" },
          { label: "no-result", param: "?state=sheet-search-no-result" },
        ],
      },
      {
        screen: "S1-D: Sheet Sửa tên gợi nhớ",
        route: "/transfer/entry",
        states: [
          { label: "default", param: "?state=edit-nickname" },
        ],
      },
    ],
  },
  {
    id: "e2",
    title: "Epic 2 — Nhập số tiền",
    desc: "S2 Numpad → Confirm page (Cash App Pay pattern)",
    color: "#22c55e",
    screens: [
      {
        screen: "S2-P2P: Sheet Đến ví (trên Amount)",
        route: "/transfer/amount",
        states: [
          { label: "danh bạ ví VSP", param: "?state=sheet-p2p" },
          { label: "typing SĐT", param: "?state=sheet-p2p-typing" },
          { label: "resolving", param: "?state=sheet-p2p-resolving" },
          { label: "resolved", param: "?state=sheet-p2p-resolved" },
          { label: "not-found", param: "?state=sheet-p2p-not-found" },
          { label: "error-format", param: "?state=sheet-p2p-error" },
        ],
      },
      {
        screen: "S2-Bank: Sheet Đến ngân hàng (trên Amount)",
        route: "/transfer/amount",
        states: [
          { label: "bank list (chọn NH)", param: "?state=sheet-bank" },
          { label: "typing STK", param: "?state=sheet-bank-typing" },
          { label: "resolved", param: "?state=sheet-bank-resolved" },
          { label: "not-found", param: "?state=sheet-bank-not-found" },
          { label: "error-format", param: "?state=sheet-bank-error-format" },
        ],
      },
      {
        screen: "S2: Nhập số tiền (Numpad)",
        route: "/transfer/amount",
        states: [
          { label: "empty", param: "" },
          { label: "typing", param: "?state=typing" },
          { label: "filled", param: "?state=filled" },
          { label: "over-balance", param: "?state=over-balance" },
          { label: "p2p-saved", param: "?state=p2p-saved" },
          { label: "bank-new", param: "?state=bank-new" },
        ],
      },
      {
        screen: "S2-Confirm: Xác nhận (Cash App Pay page)",
        route: "/transfer/amount",
        states: [
          { label: "review", param: "?state=confirm-review" },
          { label: "biometric-prompt", param: "?state=confirm-biometric" },
          { label: "biometric-scanning", param: "?state=confirm-biometric-scanning" },
          { label: "biometric-success", param: "?state=confirm-biometric-success" },
          { label: "biometric-fail", param: "?state=confirm-biometric-fail" },
          { label: "loading", param: "?state=confirm-loading" },
        ],
      },
    ],
  },
  {
    id: "e3",
    title: "Epic 3 — Kết quả",
    desc: "S3 Thành công / Thất bại / Đang xử lý",
    color: "#ef4444",
    screens: [
      {
        screen: "S3: Kết quả chuyển tiền",
        route: "/transfer/result",
        states: [
          { label: "success-p2p", param: "?state=success-p2p" },
          { label: "success-bank", param: "?state=success-bank" },
          { label: "failed", param: "?state=failed" },
          { label: "failed-timeout", param: "?state=failed-timeout" },
          { label: "pending", param: "?state=pending" },
        ],
      },
    ],
  },
]

/* ── Flow charts per epic ─────────────────────────────────────── */
const FLOW_CHARTS: Record<string, string> = {
  e1: `flowchart TD
  START((Vao\\nChuyen tien)) --> S1[S1: Entry Hub\\n2 Hub Cards + Search + Da luu]
  S1 --> D1{Hanh dong?}
  D1 -->|Tap Den vi| S1A[S1-A: Sheet P2P\\nNhap SDT]
  D1 -->|Tap Den NH| S1B[S1-B: Sheet Bank\\nNhap STK]
  D1 -->|Tap Search| S1C[S1-C: Global Search\\nDa luu + Danh ba]
  D1 -->|Tap Da luu| AMT((S2: Nhap\\nso tien))
  D1 -->|Tap Edit| S1D[S1-D: Sheet Nickname\\nSua ten goi nho]
  S1D --> S1
  S1A --> D1A{SDT hop le?}
  D1A -->|Co| R1A[Resolved:\\nTen + Avatar]
  D1A -->|Sai format| E1A[Error: SDT\\nkhong hop le]
  D1A -->|Khong tim thay| NF1A[Not Found:\\nChua dang ky VSP]
  R1A --> AMT
  E1A --> S1A
  NF1A --> S1A
  S1B --> D1B{STK hop le?}
  D1B -->|Co| DET[Auto-detect\\nngan hang]
  DET --> D1B2{Xac minh\\nten?}
  D1B2 -->|OK| R1B[Resolved:\\nTen + Bank]
  D1B2 -->|Loi| ERR1B[Error:\\nKhong xac minh]
  D1B -->|Sai format| E1B[Error: STK\\nkhong hop le]
  D1B -->|Khong ton tai| NF1B[Not Found]
  R1B --> AMT
  ERR1B --> S1B
  E1B --> S1B
  NF1B --> S1B
  S1C --> D1C{Nhap gi?}
  D1C -->|SDT| FILT1[Filter Da luu\\n+ Danh ba]
  D1C -->|STK| DET2[Auto-detect\\nbank]
  D1C -->|Ten| FILT2[Filter\\ntheo ten]
  D1C -->|Tap ket qua| AMT
  FILT1 --> D1C
  FILT2 --> D1C
  DET2 --> D1C2{Resolved?}
  D1C2 -->|Co| AMT
  D1C2 -->|Khong| NR[No Result:\\nNhap SDT/STK moi]
  NR -->|SDT moi| S1A
  NR -->|STK moi| S1B
  classDef st fill:#6366f1,stroke:#4f46e5,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#6366f1,color:#c7d2fe
  classDef ok fill:#052e16,stroke:#22c55e,color:#86efac
  classDef fl fill:#450a0a,stroke:#ef4444,color:#fca5a5
  classDef lk fill:#162032,stroke:#3b82f6,color:#93c5fd
  class START,AMT st
  class S1,S1A,S1B,S1C,S1D sc
  class D1,D1A,D1B,D1B2,D1C,D1C2 dc
  class R1A,R1B ok
  class E1A,E1B,NF1A,NF1B,ERR1B,NR fl
  class DET,DET2,FILT1,FILT2 lk`,

  e2: `flowchart TD
  START((Tu\\nEpic 1)) --> S2[S2: Numpad\\nHero amount + Chips]
  S2 --> D2{So tien\\nhop le?}
  D2 -->|Khong| S2
  D2 -->|Vuot so du| OB[Over Balance:\\nNap tien ngay]
  OB --> S2
  D2 -->|Hop le + Tiep tuc| CONF[S2-Confirm:\\nTo + For + Detail]
  CONF -->|Back| S2
  CONF --> D2A{Xac nhan?}
  D2A -->|Bam Xac nhan| BIO[Biometric:\\nNhin camera]
  BIO --> D2B{Ket qua?}
  D2B -->|OK| BSUC[Biometric\\nthanh cong]
  BSUC --> LOAD[Loading:\\nDang xu ly GD]
  LOAD --> RESULT((S3: Ket qua))
  D2B -->|Fail| BFAIL[Biometric\\nthat bai]
  BFAIL --> D2C{Thu lai?}
  D2C -->|Co| BIO
  D2C -->|Huy| S2
  D2A -->|Huy| S2
  classDef st fill:#22c55e,stroke:#16a34a,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#22c55e,color:#bbf7d0
  classDef ok fill:#052e16,stroke:#22c55e,color:#86efac
  classDef fl fill:#450a0a,stroke:#ef4444,color:#fca5a5
  classDef lk fill:#162032,stroke:#3b82f6,color:#93c5fd
  class START,RESULT st
  class S2,CONF sc
  class D2,D2A,D2B,D2C dc
  class BSUC ok
  class OB,BFAIL fl
  class BIO,LOAD lk`,

  e3: `flowchart TD
  START((Tu\\nEpic 2)) --> D3{Ket qua\\nGD?}
  D3 -->|Thanh cong P2P| S3A[S3: Thanh cong\\nVi VSP]
  D3 -->|Thanh cong Bank| S3B[S3: Thanh cong\\nNgan hang]
  D3 -->|That bai| S3C[S3: That bai\\nLoi he thong]
  D3 -->|Timeout| S3D[S3: That bai\\nHet thoi gian]
  D3 -->|Dang xu ly| S3E[S3: Pending\\nCho xu ly]
  S3A --> D3A{Hanh dong?}
  S3B --> D3A
  S3C --> D3B{Hanh dong?}
  S3D --> D3B
  S3E --> D3A
  D3A -->|Ve trang chu| HOME((Trang chu))
  D3A -->|Chuyen tiep| AGAIN((Chuyen\\ntien moi))
  D3B -->|Thu lai| AGAIN
  D3B -->|Ve trang chu| HOME
  classDef st fill:#ef4444,stroke:#dc2626,color:#fff
  classDef sc fill:#1a1a2e,stroke:#374151,color:#e5e5e5
  classDef dc fill:#0f172a,stroke:#ef4444,color:#fecaca
  classDef ok fill:#052e16,stroke:#22c55e,color:#86efac
  classDef fl fill:#450a0a,stroke:#ef4444,color:#fca5a5
  classDef hm fill:#6366f1,stroke:#4f46e5,color:#fff
  class START st
  class HOME,AGAIN hm
  class S3A,S3B ok
  class S3C,S3D fl
  class S3E sc
  class D3,D3A,D3B dc`,
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
          fontSize: "16px",
          fontFamily: FONT,
        },
        flowchart: { htmlLabels: true, curve: "basis", padding: 20, nodeSpacing: 50, rankSpacing: 60 },
      })
      if (cancelled || !ref.current) return
      const uid = `flow-${epicId}-${Date.now()}`
      const { svg } = await mermaid.render(uid, chart)
      if (cancelled || !ref.current) return
      ref.current.innerHTML = svg
      const svgEl = ref.current.querySelector("svg")
      if (svgEl) { svgEl.style.minWidth = "900px"; svgEl.style.height = "auto" }
    }
    render()
    return () => { cancelled = true }
  }, [chart, epicId])

  return <div ref={ref} style={{ display: "flex", justifyContent: "center", overflow: "auto", padding: "24px 0" }} />
}

/* ── Sidebar (shared between UI and Flow) ─────────────────────── */
function Sidebar({
  epics,
  expandedEpic,
  setExpandedEpic,
  activeEpicId,
  onSelectEpic,
  mode,
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
            CHUYỂN TIỀN
          </div>
          <div style={{ fontSize: 11, color: "#737373", marginTop: 4 }}>
            {EPICS.length} epics &middot; {ALL_SCREENS.length} screens &middot; {TOTAL_STATES} states
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
        /* ── Flow view ── */
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
                { bg: "#052e16", border: "#22c55e", label: "Thành công" },
                { bg: "#450a0a", border: "#ef4444", label: "Thất bại" },
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
