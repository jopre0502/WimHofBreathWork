# Wim Hof Breathwork - Projektdokumentation

Letzte Aktualisierung: 2026-02-13

---

## 📊 Executive Summary

**Was:** Persönliche Atem-App im Stil einer geführten Meditation für die Wim Hof Methode. Progressive Web App (PWA) für Android, parameterierbar, mit KI-generierter Sprachführung.

**Architektur:** Single-Page PWA (Vanilla JS), standalone HTML, später Service Worker + Audio Assets

**Phase 1 Status:**
- [x] GitHub Repository erstellt → github.com/jopre0502/WimHofBreathWork
- [x] Grundstruktur eingecheckt (HTML, Konzept, CLAUDE.md)
- [x] README.md mit Projekt-Overview
- [ ] GitHub Pages vorbereitet (Branch-Setup)

---

## 🎯 Immediate Next Actions

**Nächste Schritte:**
- [x] **TASK-005:** Phase 1.5 Polish (Vibration, Fullscreen, Atemtempo, Easing) ✅
- [x] **TASK-001:** GitHub Repo Setup ✅
- [x] **TASK-002:** README.md ✅
- [x] **TASK-004:** Audio-Engine mit Platzhalter-Sounds ✅
- [ ] **TASK-003:** Audio-Snippets generieren (manueller Schritt)

**Entscheidungspunkte:**
- Repo Public/Private: Public (für GitHub Pages Deployment)
- Branch-Strategie: `main` (production), `dev` (work), später Feature-Branches

---

## 🎯 Current Phase

### Phase 1: GitHub Repository Setup (AKTIV)

**Definition of Done:**
- [x] CLAUDE.md created + reviewed
- [x] PROJEKT.md created + task structure defined
- [x] GitHub Repository erstellt
- [x] Dateien eingecheckt (`wim-hof-app.html`, `wim-hof-app.jsx`, Konzept)
- [x] README.md geschrieben
- [ ] GitHub Pages Branch vorbereitet

**Tasks:**

| UUID | Task | Status | Dependencies | Effort | Deliverable | Task-File |
|------|------|--------|--------------|--------|-------------|-----------|
| **TASK-005** | Phase 1.5 Polish | ✅ completed | None | 45min | App-Update | — |
| **TASK-001** | GitHub Repo Setup | ✅ completed | None | 30min | GitHub Repo | [Details](tasks/TASK-001-github-setup.md) |
| **TASK-002** | README.md schreiben | ✅ completed | TASK-001 | 20min | README.md | [Details](tasks/TASK-002-readme.md) |

---

## 📈 Phase 2: Audio Integration (GEPLANT)

<details>
<summary>Phase 2 Details - Klick zum Ausklappen</summary>

**Ziel:** Geführte Meditation mit KI-Stimme und Ambient-Sound

**Geplante Tasks:**
- [ ] Audio-Snippets generieren (~14 Files via ElevenLabs)
- [ ] Audio-Engine implementieren (Web Audio API)
- [ ] Motivations-Snippets in Retention-Phase einstreuen

**Abhängigkeiten:**
- Requires completion of Phase 1

**Tasks:**

| UUID | Task | Status | Dependencies | Effort | Deliverable | Task-File |
|------|------|--------|--------------|--------|-------------|-----------|
| **TASK-003** | Audio-Generierung | 📋 pending | TASK-002 | 45min | 13 Audio-Files | [Details](tasks/TASK-003-audio-gen.md) |
| **TASK-004** | Audio-Engine (Platzhalter) | ✅ completed | None | 2h | JS Audio Logic | [Details](tasks/TASK-004-audio-engine.md) |

</details>

---

## 📈 Phase 3: PWA Deployment (GEPLANT)

<details>
<summary>Phase 3 Details - Klick zum Ausklappen</summary>

**Ziel:** Produktionsreife PWA mit GitHub Pages Deployment

**Geplante Tasks:**
- [ ] Service Worker implementieren
- [ ] PWA Manifest + Icons
- [ ] GitHub Pages Deployment
- [ ] Fullscreen Mode + Wake Lock
- [ ] Vibration Feedback (Android)

**Abhängigkeiten:**
- Requires completion of Phase 2

</details>

---

## 🔄 Session Execution Model

### Session-Start Checklist

- [x] Read CLAUDE.md (architecture)
- [x] Read PROJEKT.md (current tasks)
- [ ] Check token budget (>65%? Plan restructure)
- [ ] List next 2-3 high-priority tasks → TASK-001, TASK-002

### Session-End (10-15 min)

1. Update task status in PROJEKT.md
2. Note blockers/learnings in SESSION-HANDOFF-YYYY-MM-DD.md
3. If token budget >65%: Trigger `/session-refresh`

---

## 🏗️ System Architecture (Quick Reference)

**Komponenten:**
1. **wim-hof-app.html** - Standalone Vanilla JS PWA (production target)
2. **wim-hof-app.jsx** - React Artifact prototype (Claude.ai iteration)
3. **Audio Assets** - ~14 pre-rendered TTS snippets (planned)

**Technologie-Stack:**
- HTML5 / CSS3 / Vanilla JavaScript
- Web Audio API (für Audio-Integration)
- Service Worker (für PWA + Offline)
- GitHub Pages (Hosting)

→ **Vollständige Details:** Siehe CLAUDE.md + wim-hof-breathwork-konzept.md

---

## ⚙️ Configuration Status

| Component | Status | Details |
|-----------|--------|---------|
| **CLAUDE.md** | ✅ Created | Architecture documented |
| **PROJEKT.md** | ✅ Created | Task structure defined |
| **Task-Scheduler** | ✅ Ready | TASK-001 ready, dependency resolution works |
| **Session-Refresh** | ✅ Tested | First run 2026-02-13 |

---

## 📚 Reference Information

<details>
<summary>Entscheidungslog</summary>

**Track architectural and process decisions - NOT task status or events.**

**Was gehört rein:**
- Architectural Decisions (Systemdesign, Patterns, Struktur)
- Process Decisions (Workflow-Prinzipien, Standards)
- Constraints & Targets (Größenlimits, Metriken)

| Datum | Entscheidung | Begründung | Phase |
|-------|--------------|-----------|-------|
| 2026-02-13 | PWA statt Native Android | Kein App Store, kein Build-Prozess, schnelles Deployment | Phase 0 (Concept) |
| 2026-02-13 | Vanilla JS (nicht React/Vue) | Single-File production target, zero dependencies | Phase 0 (Concept) |
| 2026-02-13 | Pre-rendered Audio (~14 Files) | Keine dynamische TTS → offline-fähig, vorhersagbare Qualität | Phase 0 (Concept) |
| 2026-02-13 | Docs-Pfad: 90_DOCS/ statt docs/ | Numerische Präfix-Sortierung, erscheint am Ende von Verzeichnis-Listings | Phase 1 |
| 2026-02-13 | Bestehende CLAUDE.md erweitert | Workflow-Block injiziert statt Template-Neustart | Phase 1 |
| 2026-02-13 | Phase 1.5 Polish vor GitHub Setup | UX-Verbesserungen direkt machbar, GitHub kann warten | Phase 1.5 |
| 2026-02-13 | Atemtempo konfigurierbar (2-8s) | War hardcoded 3.6s, jetzt Slider im Config-Screen | Phase 1.5 |
| 2026-02-13 | Audio-Engine mit Oszillator-Fallback | TASK-004 von TASK-003 entkoppelt, Platzhalter statt echte Files | Phase 2 |

</details>

<details>
<summary>Offene Fragen</summary>

| # | Frage | Status | Verantwortlich |
|---|-------|--------|----------------|
| 1 | GitHub Pages URL: Custom Domain oder github.io? | 🟡 In Progress | User |

**Verwendung:**
- Offene Fragen dokumentieren, die die Implementation beeinflussen
- Status updaten: 🔴 Blocked, 🟡 In Progress, ✅ Resolved
- Verantwortlichen zuweisen für Follow-up

</details>

---

## Known Issues / Blockers

- None yet

---

## Abgeschlossene Phasen

_Noch keine abgeschlossenen Phasen. Nach Phase-Completion: Content nach `90_DOCS/phases/Phase-NN-Name.md` verschieben._

---

*Last updated: 2026-02-13 (TASK-004 Audio-Engine completed)*
