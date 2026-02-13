# TASK-002: README.md schreiben

**UUID:** TASK-002
**Status:** ✅ completed
**Created:** 2026-02-13
**Updated:** 2026-02-13
**Effort:** 20min
**Dependencies:** TASK-001

---

## Objective

Erstelle eine informative README.md für das GitHub Repository, die das Projekt vorstellt und Quick Start Anleitung bietet.

**Expected Outcome:**
- README.md existiert im Repository Root
- Projekt-Overview + Features beschrieben
- Quick Start Instructions (wie die App lokal öffnen)
- Roadmap-Verweis (auf Konzept-Dokument)
- GitHub Badges (optional: Build Status, License)

---

## Implementation Steps

1. **README.md erstellen** im Project Root

2. **Content-Struktur:**
   ```markdown
   # Wim Hof Breathwork App

   Personal guided breathing meditation app for the Wim Hof Method.

   ## Features
   - Customizable rounds, breath counts, retention times
   - Visual breathing guidance (animated circle)
   - Motivation messages during retention
   - Session summary with retention times
   - No accounts, no cloud — purely local

   ## Quick Start
   [Instructions: open wim-hof-app.html directly or serve locally]

   ## Tech Stack
   - Vanilla JS, HTML5, CSS3
   - Progressive Web App (planned)
   - Offline-capable (Service Worker planned)

   ## Roadmap
   See: [wim-hof-breathwork-konzept.md](wim-hof-breathwork-konzept.md)

   ## License
   [TBD]
   ```

3. **Git Commit + Push**
   ```bash
   git add README.md
   git commit -m "Add README with project overview and quick start

   Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
   git push
   ```

4. **GitHub Repository verifizieren**
   - README wird auf Hauptseite angezeigt ✅
   - Links im README funktionieren (zu Konzept-Datei)

---

## Acceptance Criteria

- [ ] README.md existiert im Repository Root
- [ ] README beschreibt Projekt-Ziel + Features
- [ ] Quick Start Section erklärt, wie die App geöffnet wird
- [ ] Link zu `wim-hof-breathwork-konzept.md` vorhanden
- [ ] README ist eingecheckt + gepusht
- [ ] GitHub Repository zeigt README auf Startseite

---

## Definition of Done (DoD)

Standard DoD für Task-Completion:

- [ ] Alle Acceptance Criteria erfüllt
- [ ] Task-Status in PROJEKT.md → `✅ completed`
- [ ] Audit Trail aktualisiert (Datum + Outcome)
- [ ] PROJEKT.md: Phase 1 DoD aktualisiert (README.md Checkbox ✅)

---

## Notes

**Tonality:** Professional aber persönlich ("personal tool", nicht "enterprise solution")

**Optional Enhancements:**
- Badges: ![License](badge-link)
- Screenshot der App (später hinzufügen)
- Demo-Link zu GitHub Pages (nach Deployment)

---

## Output Location

All execution outputs for this task go to this task's directory:
- **Logs:** `90_DOCS/tasks/TASK-002/execution-logs/`
- **Artifacts:** `90_DOCS/tasks/TASK-002/artifacts/`

---

## Audit Trail

- 2026-02-13 - Created via `/project-init`
- 2026-02-13 - Completed: README.md erstellt (Features, Quick Start, Tech Stack, Roadmap, MIT License)
