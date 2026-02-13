# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wim Hof Breathwork App — a personal guided breathing meditation app for the Wim Hof Method. Target: Android PWA, parameterizable, with AI-generated voice guidance. No accounts, no cloud, purely local.

**Current status:** Phase 2 (Audio Integration) in progress — Audio Engine with oscillator placeholders implemented (TASK-004). Phase 3 (PWA/Deployment) pending.

## Architecture

### Dual Implementation

The app exists in two parallel versions:

- **`wim-hof-app.html`** — Standalone vanilla JS single-file app (production target). Opens directly in browser, no build step needed. All CSS/JS inline.
- **`wim-hof-app.jsx`** — React component version (Claude Artifact prototype). Exports `WimHofApp` as default. Not independently runnable — designed for Claude.ai Artifact rendering.

Both implement the same session logic and UI. The HTML version is the canonical runtime; the JSX is the iteration prototype.

### Session State Machine

Core flow: `CONFIG → COUNTDOWN (3s) → BREATHING → RETENTION → RECOVERY → [next round | SESSION_DONE]`

| Phase | Behavior | Key Detail |
|-------|----------|------------|
| **CONFIG** | Slider-based parameter selection | Settings: rounds (1-6), breaths (20-50), retention max (30-300s), recovery (10-30s) |
| **COUNTDOWN** | 3-second countdown | Transition buffer before breathing starts |
| **BREATHING** | Animated circle expands/contracts per breath cycle | 3600ms cycle (1800ms in + 1800ms out), uses `requestAnimationFrame` |
| **RETENTION** | Timer counts up, "Loslassen" abort button | Gold color scheme, motivation messages every ~20s, auto-ends at max retention |
| **RECOVERY** | Countdown timer | Teal color scheme, auto-transitions to next round or done |
| **SESSION_DONE** | Summary screen with retention times per round | Shows longest retention if >1 round |

### Design System

- Dark background: `#0a1628` → `#0d2137`
- Teal accent (breathing/recovery): `#7fdbda` / `#4fa8a7`
- Gold accent (retention): `#c8a050`
- Fonts: DM Sans (UI), Space Mono (data/labels)
- Animated breath circle with glow/main/inner rings

### Audio Engine (Lines 292-406)

- **Web Audio API** with `AudioContext` — initialized on user gesture (browser policy compliant)
- **Fallback chain**: MP3 files from `audio/` → oscillator-based placeholder tones
- **13 snippet types**: session_start/end, guide_01-03, motiv_01-04, breath_cue, recovery_end, round_done, ambient
- **Ambient**: Looping MP3 or 110Hz sine drone oscillator
- **Config**: Audio toggle (on/off) + volume slider (0-100%)

### Key Technical Decisions

- **Wake Lock API** used to prevent screen timeout during sessions
- **`performance.now()`** for breathing animation timing (sub-ms precision)
- **`Date.now()`** for retention/recovery timers (wall-clock accuracy)
- Timer intervals at 250ms for smooth UI updates without excessive CPU
- Guidance text changes at breath milestones (halfway, last 2 breaths)
- **Breath cue tracking** via `lastBreathPlayed` counter — plays once per cycle, not per frame

## Development

No build system. Open `wim-hof-app.html` directly in a browser.

```bash
# Quick test on Linux/WSL
xdg-open wim-hof-app.html
# Or serve locally for mobile testing
python3 -m http.server 8080
```

## Planned Next Steps (from Konzept)

- **Phase 2:** Audio integration (~14 pre-rendered snippets via ElevenLabs/Google TTS), project restructuring into proper PWA with Service Worker
- **Phase 3:** Fullscreen mode, vibration feedback, GitHub Pages deployment, PWA manifest/icons
- **Backlog:** Retention history tracking, ambient sounds, configurable breath speed, haptic patterns

## Language

UI and guidance text are in **German**. Code comments and technical documentation in English.
---

## Session-Continuous Workflow

This project uses an automated session workflow for context optimization and task tracking.

### At Session Start

1. **Read CLAUDE.md** (this file) - Understand architecture and conventions
2. **Read 90_DOCS/PROJEKT.md** - Know current phase and next tasks
3. **Check token budget** - If previous session ended cleanly, you're ready to work
4. **Run `/run-next-tasks`** - Shows tasks ready to execute

> **Note:** No `/session-refresh` needed at start if previous session ended with it.
> Only run `/session-refresh` when token budget >65% or before ending a session.

### Starting Work

1. **From `/run-next-tasks` output** - Pick a ready task
   - Parses `90_DOCS/PROJEKT.md` task table
   - Resolves dependencies (shows only unblocked tasks)
   - Recommends: Start with TASK-001, TASK-002, etc.

2. **Select a task** from the ready list
   - Check `90_DOCS/tasks/TASK-NNN-name.md` for details
   - Update task status in `PROJEKT.md` to `⏳ in_progress`

### During Work

- **Log progress** in `90_DOCS/tasks/TASK-NNN-name.md` (Audit Trail section)
- **Watch token budget** - If >65%: Plan to trigger `/session-refresh` soon
- **Update task status** in `PROJEKT.md` when task is complete: `✅ completed`
- **Next task** - Run `/run-next-tasks` again to find newly-ready tasks

### At Session End (or Token >65%)

1. **Mark completed tasks** `✅` in `PROJEKT.md`
2. **Update blockers/learnings** in `PROJEKT.md` "Known Issues" section
3. **Trigger `/session-refresh`** - Consolidates learnings + optimizes for next session
   - Guides: Review & update CLAUDE.md sections (learnings, decisions)
   - Guides: Verify PROJEKT.md task status
   - Auto-runs: `/project-doc-restructure` (optimization)
   - User reduziert Token-Budget manuell (CLI Built-in)
4. **Commit changes** to git

> **Why at END, not START?** Learnings are fresh in context → can be captured accurately.
> Next session starts with optimized docs → no overhead.

### Task Structure

**⚠️ KRITISCH - Dateistruktur (nicht verwechseln!):**
```
90_DOCS/tasks/
├── TASK-001-setup.md       ← Task-Dokument DIREKT hier (nicht in Unterordner!)
├── TASK-001/               ← Output-Ordner (NUR für Logs/Artifacts)
│   ├── execution-logs/
│   └── artifacts/
├── TASK-002-feature.md     ← Nächstes Task-Dokument (direkt)
└── TASK-002/               ← Dessen Output-Ordner
```

- **PROJEKT.md** - SSOT (Single Source of Truth) for task status
  - UUID-based: TASK-001, TASK-002, etc.
  - Status: `📋 pending` | `⏳ in_progress` | `📘 ongoing` | `✅ completed` | `🚫 blocked` | `❌ cancelled`
  - Dependencies tracked (task blockers)
  - Keep <8,000 chars (move old phases to PROJEKT-ARCHIVE.md)

- **Task-Dokument:** `90_DOCS/tasks/TASK-NNN-name.md` (DIREKT unter tasks/, objective, steps, criteria, audit trail)
- **Output-Ordner:** `90_DOCS/tasks/TASK-NNN/` (NUR für background task outputs, keine .md Files hier!)
  - `execution-logs/` - Background agent logs
  - `artifacts/` - Generated outputs (reports, exports, etc.)

### Neue Task erstellen

1. **Nächste UUID bestimmen** - Check PROJEKT.md für höchste TASK-NNN
2. **Task-Dokument erstellen** - Nutze Skill-Template (SSOT):
   ```bash
   # Template anzeigen:
   cat ~/.claude/skills/project-init/assets/task-md-template.txt
   # → Inhalt nach 90_DOCS/tasks/TASK-NNN-name.md kopieren
   # → Platzhalter ersetzen: {{TASK_ID}}, 90_DOCS, {{DATE}}, etc.
   ```
3. **Output-Ordner anlegen**:
   ```bash
   mkdir -p 90_DOCS/tasks/TASK-NNN/{execution-logs,artifacts}
   ```
4. **Template ausfüllen** - Objective, Steps, Acceptance Criteria
5. **In PROJEKT.md eintragen** - Neue Zeile im 7-Column Schema:
   ```markdown
   | **TASK-NNN** | Kurzbeschreibung | 📋 pending | Dependencies | Effort | Deliverable | [Details](tasks/TASK-NNN-name.md) |
   ```

**Task-Template (SSOT):** `~/.claude/skills/project-init/assets/task-md-template.txt`

### Token Budget Tracking

| Budget | Status | Action |
|--------|--------|--------|
| <50% | ✅ Healthy | Continue working |
| 50-65% | ⏳ Monitor | Watch for next trigger |
| **65-70%** | **⚠️ TRIGGER** | **Run `/session-refresh`** |
| 70-85% | 🔴 Alert | Plan session end |
| 85%+ | 🚨 Emergency | Finish task, commit, end session |

### Tools & Commands

| Command | Purpose | When |
|---------|---------|------|
| `/session-refresh` | Update docs + optimize context | Session END, token >65% |
| `/run-next-tasks` | Show ready tasks (dependencies resolved) | Before starting work |
| `/project-doc-restructure` | Optimize documentation (TTO, DocDebt) | Auto-triggered by session-refresh |
| Token-Budget reduzieren | Context history reduzieren | Manuell nach session-refresh |

### Example Session Flow

```
Session Start (clean - previous session ended with /session-refresh)
├─ Read CLAUDE.md + PROJEKT.md (5 min)
├─ /run-next-tasks (1 min)
│  └─ Shows: "TASK-002, TASK-003 ready"
├─ Start TASK-002 (1-2 hours)
│  ├─ Work on implementation
│  ├─ Document in 90_DOCS/tasks/TASK-002-feature.md
│  └─ Mark ✅ when complete
├─ /run-next-tasks (1 min)
│  └─ Shows: "TASK-003, TASK-004 ready"
├─ Continue working... (token budget rising)
│
└─ Session End (or token >65%)
   ├─ Update PROJEKT.md status
   ├─ /session-refresh (15 min)  ← HERE, not at start!
   │  ├─ Update CLAUDE.md learnings
   │  ├─ Verify PROJEKT.md tasks
   │  ├─ Auto-restructure + compact
   │  └─ Ready for next session
   └─ Commit to git
```

### Key Concepts

- **Dependency Resolution:** `/run-next-tasks` only shows tasks with satisfied dependencies
- **Phase Transitions:** When phase complete, archive to `90_DOCS/phases/Phase-NN-Name.md`
- **Context Optimization:** `/session-refresh` reduces context bloat by restructuring + compressing
- **Continuity:** Next developer reads SESSION-HANDOFF → understands blockers + recommendations

---

### Phase Completion Workflow

**Wann:** Eine Phase ist vollständig abgeschlossen (alle Tasks ✅ completed, DoD erfüllt)

**Warum auslagern:**
- PROJEKT.md bleibt kompakt (<8K Zeichen)
- Historische Details bleiben erhalten, aber außerhalb des aktiven Kontexts
- Schnellere Orientierung für neue Sessions

**Wie:**

1. **Phase als abgeschlossen markieren**
   - Alle Tasks der Phase: Status → `✅ completed`
   - Definition of Done: Alle Checkboxen → `[x]`

2. **Phase-Datei erstellen**
   ```
   90_DOCS/phases/Phase-NN-Name.md
   ```
   - Verwende Template: `~/.claude/skills/project-init/assets/phase-template.txt`
   - Kopiere Phase-Content (Header, DoD, Tasks, Learnings) in die neue Datei
   - Füge Audit Trail hinzu (Zeitraum, wichtige Ereignisse)

3. **PROJEKT.md aktualisieren**
   - Ersetze Inline-Phase-Content durch Link:
   ```markdown
   ## Abgeschlossene Phasen

   - [Phase 01: Foundation](phases/Phase-01-Foundation.md) - ✅ Completed (2025-01-15 - 2025-01-20)
   ```
   - Behalte nur aktive Phase(n) mit vollem Detail

4. **Verifizieren**
   - PROJEKT.md Größe: `wc -c 90_DOCS/PROJEKT.md` → <8000 Bytes
   - Phase-Datei existiert: `ls 90_DOCS/phases/`
   - `/run-next-tasks` funktioniert noch (keine kaputten Dependencies)

**Beispiel Phase-Link in PROJEKT.md:**
```markdown
<!-- Abgeschlossene Phasen -->
| Phase | Status | Zeitraum | Link |
|-------|--------|----------|------|
| Phase 01: Foundation | ✅ | 2025-01-15 - 2025-01-20 | [Details](phases/Phase-01-Foundation.md) |
```

**Hinweis:** PROJEKT.md bleibt SSOT (Single Source of Truth) für aktuelle Tasks. Phase-Dateien sind reine Archive für historische Referenz.

**For detailed workflow guide, see:** `references/WORKFLOW.md` in the project-init skill
or read: `~/.claude/skills/project-init/references/WORKFLOW.md`

---

### Task-Tabellen-Format (Standardisierung)

Jedes PROJEKT.md nutzt ein einheitliches **7-Spalten-Format** für zuverlässiges Parsing durch task-scheduler:

| UUID | Task | Status | Dependencies | Effort | Deliverable | Task-File |
|------|------|--------|--------------|--------|-------------|-----------|

**Spalten-Definition:**

| Spalte | Format | Beispiel | Notiz |
|--------|--------|---------|-------|
| **UUID** | `**TASK-NNN**` | `**TASK-001**` | Zero-padded, eindeutig |
| **Task** | Frei-form Text | `Project Setup` | Kurzbeschreibung |
| **Status** | `📋\|⏳\|📘\|✅\|🚫\|❌` + Text | `✅ completed` | 6 MECE Status (SSOT: task-scheduler/SKILL.md) |
| **Dependencies** | `None` oder `TASK-NNN` | `TASK-001` | Komma-separiert für multiple |
| **Effort** | Schätzung | `1h` oder `2-3h` | Für Planung |
| **Deliverable** | Artefakt/Ergebnis | `docs` oder `feature` | Was wird produziert |
| **Task-File** | Markdown Link | `[Details](tasks/TASK-001-setup.md)` | Link zu Audit-Trail |

**Beispiel Task-Zeile:**
```markdown
| **TASK-001** | Setup | ✅ completed | None | 1h | docs | [Details](tasks/TASK-001-setup.md) |
| **TASK-002** | Feature Build | 📋 pending | TASK-001 | 2.5h | feature | [Details](tasks/TASK-002-feature.md) |
| **TASK-003** | Testing | ⏳ in_progress | TASK-002 | 1.5h | test-results | [Details](tasks/TASK-003-testing.md) |
```

**Scheduler nutzt dieses Format:**
- ✅ Parst alle 7 Spalten zuverlässig
- ✅ Identifiziert Ready-Tasks (Dependencies erfüllt)
- ✅ Blockiert Tasks (Dependencies nicht erfüllt)
- ✅ Ignores Style-Variationen (Leerzeichen, Emoji-Position, etc.)

---

### Task Management Integration

Your PROJEKT.md is compatible with task-scheduler:
- **Command:** `/run-next-tasks` shows ready tasks + resolves dependencies
- **Auto-Trigger:** Skill activates on "analyze tasks" or "show ready tasks" keywords
- **Zero Setup:** Task table format already valid from project-init

**Next Steps:**
1. Run: `/run-next-tasks` to identify unblocked tasks
2. Work on recommended tasks in priority order
3. Update PROJEKT.md status → `/run-next-tasks` finds newly-ready tasks

**More info:** `~/.claude/skills/task-scheduler/SKILL.md`