# VSP UI — Project Rules

## Stack
- Next.js 16 App Router · TypeScript · Tailwind v4 · CVA · Lucide React
- Tailwind config is CSS-only (`app/globals.css`) — no `tailwind.config.ts`
- All tokens are CSS variables, mapped via `@theme inline {}`

## Design System
- **Figma file:** `m8U2GMl2eptDD5gv9iwXDs` (VSP_Core-Components)
- **Token file:** `app/globals.css`
- **Component library:** `components/ui/` (11 components)
- **Principles:** `.claude/design-principles.md`
- **Ref apps:** `.claude/ref-patterns.md` (OKX / Cash App / Revolut)
- **UX Knowledge Base:** `.claude/ux-knowledge.md` (V-Smart Pay v1.0 — flows, pages, node IDs)

## Golden Rules (never break)
1. **Never hardcode color** — always use token class (`text-foreground`, `bg-secondary`, etc.)
2. **Never rebuild a VSP component** — use the library, compose don't create
3. **Content column = `px-[22px]`** — always, no exceptions. This includes section titles, labels, rows, cards, and any horizontal padding on the page content area.
4. **Sections separated by `pt-[32px]`** — never use `<hr>`, `border-b`, or margins between sections
5. **`variant="large-title"` NavBar is icon-only** — page name goes in `largeTitle`, NOT `title`
6. **`ChevronLeft` for back** — never `ArrowLeft`
7. **One `variant="primary"` button per screen** — all others are `secondary`
8. **Home indicator on every full-screen page** — `w-[139px] h-[5px] bg-foreground`
9. **Dark mode via semantic tokens only** — never raw CSS invert
10. **`text-muted-foreground` is banned** — use `text-foreground-secondary`

## Pipelines

### UXUI Pipeline (Feature Design → Code)
See `.claude/workflows/uxui-pipeline/workflow.md` — full BRD → Flow → Screen → Code → QC.

**Team:**
| Agent | Name | Role | Platform |
|---|---|---|---|
| 🤖 VI | Vi | Design Lead / Orchestrator | OpenClaw |
| 🔍 Nate | Nate | UX Researcher | Claude Code |
| 👹 Đức | Đức | Senior UX Reviewer | Claude Code |
| 🎨 Ivy | Ivy | UI Designer / Builder | Claude Code |
| 📋 Khoa | Khoa | QA Design | Claude Code |

**Trigger:** "pipeline", "new feature", "start flow", "bắt đầu feature"
**Steps:** `.claude/workflows/uxui-pipeline/steps/step-01..11`
**Edge cases:** `.claude/edge-case-library.md`
**Feature output:** `.claude/features/[name]/`

### Code Pipeline (Figma → Code → QC)
See `.claude/pipeline.md` for the Figma → Code → QC → Ship workflow.

## Agents (Code Pipeline — existing)
| Agent | File | Trigger |
|---|---|---|
| VSP Designer | `.claude/agents/vsp-designer.md` | "design", "screen", "page", "implement" |
| Design Ops QC | `.claude/agents/vsp-design-ops.md` | "check", "QC", "audit", "review" |
| Token Fix Loop | `.claude/agents/token-check-fix.md` | "fix tokens", "token loop", "auto fix" |
| Pipeline | `.claude/agents/vsp-pipeline.md` | "pipeline", "full flow", "build and check" |
| UX Review | `.claude/agents/ux-review.md` | paste Figma URL + "review", "ux review", "audit ux" |
| Figma Design Loop | `.claude/agents/figma-design-loop.md` | "design screen", "vẽ figma", "build figma screen" |
| Figma Structure QC | `.claude/agents/figma-structure-qc.md` | "structure check", "QC figma", "check layers" |
| Figma Auto Research | `.claude/agents/figma-auto-research.md` | "auto research figma", "scan figma", "design audit loop" |
| Figma Restructure | `/restructure-figma` (command) | "restructure", "clean layers", "fix structure" |

## Agents (UXUI Pipeline — team)
| Agent | File | Trigger |
|---|---|---|
| 🤖 Vi — Lead | `.claude/agents/vi-lead.md` | Orchestrator (OpenClaw) |
| 🔍 Nate — Researcher | `.claude/agents/nate-researcher.md` | BRD analysis, flow design |
| 👹 Đức — Reviewer | `.claude/agents/duc-reviewer.md` | Flow/UX review, adversarial |
| 🎨 Ivy — Designer | `.claude/agents/ivy-designer.md` | Screen breakdown, code gen |
| 📋 Khoa — QA | `.claude/agents/khoa-qa.md` | State coverage, token check |

## Commands
```
npm run dev          # start dev server
npm run token-check  # Playwright CSS vs Figma token audit
npm run build        # production build
```

## Absolute Don'ts
- No `border` to separate content sections
- No `inline style={{ color/background }}`
- No custom button divs
- No `text-center` on body/list text
- No `ArrowLeft` icons
- No `rounded-lg` / `rounded-xl` on cards (use `rounded-[28px]`)
- No `px-4` / `px-5` / `px-6` / `px-[16px]` on content columns (use `px-[22px]`)
- No `space-y-8` / `space-y-10` between sections (use `pt-[32px]`)
