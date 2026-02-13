# TASK-001: GitHub Repository Setup

**UUID:** TASK-001
**Status:** ✅ completed
**Created:** 2026-02-13
**Updated:** 2026-02-13
**Effort:** 30min
**Dependencies:** None

---

## Objective

Erstelle ein GitHub Repository für das Wim Hof Breathwork Projekt und pushe die initiale Codebase (MVP-Files + Dokumentation).

**Expected Outcome:**
- GitHub Repository ist erstellt (Public für GitHub Pages)
- Alle Projekt-Files sind eingecheckt (wim-hof-app.html, wim-hof-app.jsx, Konzept, CLAUDE.md, PROJEKT.md)
- Commit-History zeigt initiales Setup
- Repository ist bereit für Collaboration + GitHub Pages Deployment

---

## Implementation Steps

1. **GitHub Repository erstellen**
   - Name: `WimHofBreathWork` (oder `wim-hof-breathwork`)
   - Visibility: Public (für GitHub Pages)
   - Initialize: Ohne README (kommt in TASK-002)

2. **Git lokal initialisieren** (falls nicht bereits vorhanden)
   ```bash
   cd /mnt/c/Development/Projects/Claude/WimHofBreathWork
   git init
   git config user.name "YOUR_NAME"
   git config user.email "YOUR_EMAIL"
   ```

3. **Files stagen + Initial Commit**
   ```bash
   git add wim-hof-app.html wim-hof-app.jsx wim-hof-breathwork-konzept.md CLAUDE.md 90_DOCS/
   git commit -m "Initial commit: MVP Breathwork App + Project Setup

   - wim-hof-app.html: Standalone PWA (production target)
   - wim-hof-app.jsx: React Artifact prototype
   - wim-hof-breathwork-konzept.md: Project concept & roadmap
   - CLAUDE.md: Architecture + development guide
   - 90_DOCS/PROJEKT.md: Task tracking + phase documentation

   Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
   ```

4. **Remote hinzufügen + Push**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/WimHofBreathWork.git
   git branch -M main
   git push -u origin main
   ```

5. **Repository Settings verifizieren**
   - Visibility: Public ✅
   - Default Branch: `main` ✅
   - GitHub Pages vorbereiten (für TASK-004)

---

## Acceptance Criteria

- [ ] GitHub Repository existiert unter `github.com/YOUR_USERNAME/WimHofBreathWork`
- [ ] Repository ist Public (für GitHub Pages)
- [ ] Alle MVP-Files sind eingecheckt (HTML, JSX, Konzept, CLAUDE.md, PROJEKT.md)
- [ ] Initial Commit mit Co-Author Tag vorhanden
- [ ] Remote `origin` zeigt auf GitHub Repository
- [ ] Branch `main` ist Default-Branch

---

## Definition of Done (DoD)

Standard DoD für Task-Completion:

- [ ] Alle Acceptance Criteria erfüllt
- [ ] Task-Status in PROJEKT.md → `✅ completed`
- [ ] Audit Trail aktualisiert (Datum + Outcome)
- [ ] Repository URL notiert in PROJEKT.md (Vault Paths Section)

> **Hinweis:** Nach GitHub Setup → TASK-002 (README.md schreiben) wird unmittelbar folgen.

---

## Notes

**GitHub Username Placeholder:** Die Kommandos enthalten `YOUR_USERNAME` — ersetze mit tatsächlichem GitHub-Account.

**Branch-Strategie (zukünftig):**
- `main` = Production (GitHub Pages Source)
- `dev` = Development (Feature-Branches mergen hier)
- Feature-Branches = `feature/audio-integration`, etc.

---

## Output Location

All execution outputs for this task go to this task's directory:
- **Logs:** `90_DOCS/tasks/TASK-001/execution-logs/`
- **Artifacts:** `90_DOCS/tasks/TASK-001/artifacts/`

> Falls Background-Agents genutzt werden (z.B. für automatisches Git-Setup), schreiben sie Output hierhin.

---

## Audit Trail

- 2026-02-13 - Created via `/project-init`
- 2026-02-13 - Completed: Repo erstellt (github.com/jopre0502/WimHofBreathWork), 12 Files committed, pushed to main
