# /auto-research-figma — Figma Auto Research Loop

Autonomous design health scan + dedup. Two phases:
- **Phase 1** (default): Detect structural issues, auto-fix, verify visual unchanged
- **Phase 2** (`--dedup`): Find duplicate/similar screens, output dedup report for human review

## Input
User provides Figma URL + optional flags.
Parse: `figma.com/design/:fileKey/:name?node-id=:nodeId`

## Flags
- No flag → Phase 1 (structure fix, auto)
- `--dedup` → Phase 2 (dedup report, semi-auto)
- `--full` → Phase 1 then Phase 2

## Pre-flight
1. Load figma-use skill from `/Users/huykieu/.claude/plugins/cache/claude-plugins-official/figma/2.0.2/skills/figma-use/SKILL.md`
2. Read agent spec from `/Users/huykieu/Documents/vsp-ui/.claude/agents/figma-auto-research.md`

## Phase 1: Structure Fix (auto)
1. Discover all screens in file
2. For each screen: snapshot → detect → fix → verify → report
3. Output Design Health Report
4. Key method: `figma.createComponentFromNode(frame)` for zero-copy FRAME→COMPONENT

## Phase 2: Dedup (semi-auto)
1. Collect all COMPONENT screens
2. Group by name similarity + structure comparison
3. Classify: DUPLICATE / CONTEXT REUSE / STATE VARIANT / DIFFERENT
4. Output Dedup Report with screenshots + recommendations
5. **WAIT for human approval** — never auto-execute merges
6. After approval: execute merges (delete duplicates, create instances, create ComponentSets)

## Quick mode
If user provides a specific node-id, run on just that screen/section.

## Arguments
- `$ARGUMENTS` — Figma URL, optionally with `--dedup` or `--full`
