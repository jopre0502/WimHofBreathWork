# Wim Hof Breathwork App — Konzept & Umsetzungsplan

## 1. Produktvision

Eine persönliche Atem-App im Stil einer geführten Meditation für die Wim Hof Methode. Nutzung auf Android, parameterierbar, mit KI-generierter Sprachführung. Kein Schnickschnack, kein Account, keine Cloud — ein Tool für dich allein.

---

## 2. Funktionskonzept

### 2.1 Atemrunde — Drei Phasen

Eine Runde besteht aus drei Phasen, die sequenziell ablaufen:

| Phase | Beschreibung | Parameter | Interaktion |
|-------|-------------|-----------|-------------|
| **1 — Power Breathing** | Rhythmisches Ein-/Ausatmen (tief ein, locker aus) | Anzahl Atemzüge (z.B. 30) | Visuelles Pacing (Animation), Audio-Guidance |
| **2 — Retention (Atemhalten)** | Nach letztem Ausatmen: Luft anhalten | Maximale Dauer in Sekunden (z.B. 90s) | Timer läuft, **Button zum vorzeitigen Abbrechen** |
| **3 — Recovery Breath** | Tief einatmen, halten | Dauer in Sekunden (z.B. 15s) | Timer läuft, dann automatisch nächste Runde |

Nach Phase 3 → nächste Runde (zurück zu Phase 1) oder Session-Ende.

### 2.2 Session-Konfiguration

Vor dem Start konfiguriert der User:

| Parameter | Default | Bereich |
|-----------|---------|---------|
| Anzahl Runden | 3 | 1–6 |
| Atemzüge pro Runde | 30 | 20–50 |
| Max. Retention (Sek.) | 90 | 30–300 |
| Recovery Breath (Sek.) | 15 | 10–30 |

Settings werden im `localStorage` persistiert (letzter Wert = nächster Default).

### 2.3 Guided Meditation — Sprachführung

Minimaler Snippet-Ansatz. Kein dynamisches Zusammenbauen von Zahlen oder Sätzen. Wenige, wirkungsvolle Audio-Dateien.

#### Audio-Katalog (~12 Snippets + 1 Loop)

**Anleitungen (3 Kern-Snippets):**

| ID | Phase | Text | Trigger |
|----|-------|------|---------|
| `guide_01` | 1 Start | *"Atme tief ein... und lass los."* | Beginn Phase 1 |
| `guide_02` | 1→2 Übergang | *"Letzter Atemzug. Atme aus... und halte."* | Ende Phase 1 |
| `guide_03` | 2→3 Übergang | *"Atme jetzt tief ein... und halte."* | Ende Phase 2 (Timer oder Button) |

**Motivation (3–4 Snippets, zufällig in Phase 2):**

| ID | Text | Trigger |
|----|------|---------|
| `motiv_01` | *"Entspanne deinen Körper."* | ~15s nach Retention-Start |
| `motiv_02` | *"Du machst das gut."* | Zufällig bei längerer Retention |
| `motiv_03` | *"Bleib ruhig. Lass los."* | Zufällig bei längerer Retention |
| `motiv_04` | *"Gib nicht auf."* | Zufällig bei längerer Retention |

**Session-Rahmen (3–4 Snippets):**

| ID | Text | Trigger |
|----|------|---------|
| `session_start` | *"Mach es dir bequem. Wir beginnen."* | Session-Start |
| `round_done` | *"Gut gemacht. Nächste Runde."* | Ende Phase 3 (wenn weitere Runden folgen) |
| `session_end` | *"Session beendet. Gut gemacht."* | Ende letzte Runde |
| `recovery_end` | *"Langsam ausatmen."* | Ende Phase 3 |

**Ambient/Sounds (2 Files):**

| ID | Beschreibung | Nutzung |
|----|-------------|---------|
| `ambient_loop` | Ruhiger Ambient-Sound (Drone, Natur, o.ä.) | Loopt während gesamter Session |
| `breath_cue` | Subtiler Ton/Gong für Atemrhythmus | Pacing in Phase 1 (ein/aus) |

**Gesamt: ~12 Sprach-Snippets + 1 Ambient-Loop + 1 Sound-Cue = 14 Audio-Files.**

Keine Kombinatorik, keine Zahlen-Snippets, kein dynamisches Zusammenbauen.

### 2.4 UI/UX-Konzept

- **Minimalistisch.** Dunkler Hintergrund, beruhigende Farben (tiefes Blau/Türkis).
- **Zentrales Element:** Animierter Kreis, der sich mit dem Atemrhythmus ausdehnt/zusammenzieht (Phase 1) bzw. als Timer pulsiert (Phase 2/3).
- **Großer "Let Go"-Button** in Phase 2 zum vorzeitigen Abbrechen — fingerfreundlich, Mitte unten.
- **Phasen-Indikator:** Welche Phase, welche Runde, dezent oben.
- **Kein Scrollen, kein Navigieren während der Session.** Fullscreen-Erlebnis.
- **Start-Screen:** Parameter-Slider, Start-Button. Fertig.
- **End-Screen:** Zusammenfassung (Retention-Zeiten pro Runde).

---

## 3. Technische Architektur

### 3.1 Plattform-Entscheidung: Progressive Web App (PWA)

| Option | Pro | Contra |
|--------|-----|--------|
| **PWA (Web-App)** | Kein App Store, kein Build-Prozess, installierbar auf Android, ein Tech-Stack | Audio-Handling etwas tricky auf Mobile |
| Native Android (Kotlin) | Volle Audio-Kontrolle | Overengineering für ein Solo-Tool |
| React Native / Flutter | Cross-Platform | Build-Pipeline, Dependencies — Overkill |

**Entscheidung: PWA.** Single-Page Web-App, installierbar als Home-Screen-App auf Android. Läuft offline nach erstem Laden.

### 3.2 Audio/Sprach-Strategie

**Ansatz: Vorgerenderte Snippets (einmalig generiert).**

~14 Audio-Files total, einmalig mit ElevenLabs oder Google Cloud TTS erzeugt, als statische Assets in die PWA gebündelt. Kein dynamisches Zusammenbauen, keine API zur Laufzeit.

| Aspekt | Detail |
|--------|--------|
| **Umfang** | ~12 Sprach-Snippets + 1 Ambient-Loop + 1 Atem-Cue |
| **Generierung** | ElevenLabs (einmalig, ~2€) oder kostenlos via Google Cloud TTS Free Tier |
| **Format** | MP3 oder OGG, kurze Files (~3–10 Sek. pro Snippet) |
| **Offline** | Ja, alles lokal in der PWA |
| **Fallback MVP** | Browser Web Speech API (kostenlos, robotisch, aber funktional) |

### 3.3 Tech-Stack

| Komponente | Technologie |
|------------|-------------|
| **Frontend** | Vanilla HTML/CSS/JS oder React (single file) |
| **Animation** | CSS Animations / Canvas (Atem-Kreis) |
| **Audio** | Web Audio API + vorgerenderte Snippets |
| **State Management** | Vanilla JS (kein Framework nötig) |
| **Persistenz** | localStorage |
| **Hosting** | GitHub Pages (kostenlos, statisch) |
| **PWA** | Service Worker + Manifest |
| **Audio-Generierung** | ElevenLabs / Google Cloud TTS (einmalig, ~14 Files) |

### 3.4 Umsetzungsoptionen

| Option | Tool | Beschreibung | Geeignet für |
|--------|------|-------------|-------------|
| **A) Artifact** | Claude.ai Artifact | Single-File React-App, direkt im Chat iterierbar | MVP/Prototyp ohne Audio-Files |
| **B) Claude Code CLI** | Claude Code | Vollständiges Projekt mit Dateistruktur, PWA-Setup, Asset-Management | Finale Version mit Audio |
| **C) Hybrid** | Artifact → Claude Code | Prototyp als Artifact, dann Migration in vollständiges Projekt | Empfohlen |

**Empfehlung: Option C (Hybrid).**

Phase 1 als Artifact (schnelles Feedback, UI/UX iterieren), dann mit Claude Code in ein richtiges Projekt überführen (PWA, Audio-Assets, GitHub Pages Deployment).

---

## 4. Umsetzungsplan

### Phase 1 — MVP/Prototyp (Artifact)

**Ziel:** Funktionierender Atem-Timer mit visueller Führung, ohne Audio.

| Inkrement | Inhalt | Output |
|-----------|--------|--------|
| 1.1 | Start-Screen mit Parameter-Konfiguration (Slider/Inputs) | UI |
| 1.2 | Session-Engine: Phasen-State-Machine (Phase 1→2→3→Runde++) | Logik |
| 1.3 | Atem-Animation (expandierender/kontrahierender Kreis mit Pacing) | Animation |
| 1.4 | Phase 2: Timer + Abbruch-Button | Interaktion |
| 1.5 | Phase 3: Timer + Auto-Transition | Logik |
| 1.6 | End-Screen mit Session-Zusammenfassung | UI |
| 1.7 | Textuelle Anweisungen als Overlay (statt Audio) | UX |
| 1.8 | localStorage-Persistierung der Settings | Persistenz |

**Ergebnis:** Nutzbare App ohne Sound. Validierung von UX und Timing.

### Phase 2 — Audio-Integration (Claude Code)

**Ziel:** Geführte Meditation mit KI-Stimme und Ambient-Sound.

| Inkrement | Inhalt | Output |
|-----------|--------|--------|
| 2.1 | Projekt-Setup: Dateistruktur, PWA-Manifest, Service Worker | Infrastruktur |
| 2.2 | Migration Artifact-Code in Projektstruktur | Code |
| 2.3 | Audio-Snippets generieren (~12 Sprach-Files + 1 Ambient-Loop + 1 Atem-Cue via ElevenLabs) | 14 Audio-Files |
| 2.4 | Audio-Engine: Snippets an Session-Events koppeln, Ambient-Loop starten/stoppen | Logik |
| 2.5 | Motivations-Snippets zufällig in Phase 2 einstreuen | Logik |
| 2.6 | Integration Audio + Session-Engine, Timing-Feinschliff | Integration |

### Phase 3 — Polish & Deployment

| Inkrement | Inhalt | Output |
|-----------|--------|--------|
| 3.1 | Fullscreen-Modus, Wake Lock (Screen bleibt an) | UX |
| 3.2 | Vibration-Feedback bei Phasenwechsel (Android) | UX |
| 3.3 | GitHub Pages Deployment | Live |
| 3.4 | PWA installierbar machen (Icons, Splash Screen) | PWA |
| 3.5 | Feinschliff: Animationen, Timing, Audio-Übergänge | Polish |

### Optionale Erweiterungen (Backlog)

- Retention-Tracking über Sessions hinweg (Historie/Chart)
- Hintergrund-Ambient-Sound (z.B. Meeresrauschen)
- Unterschiedliche Stimmen/Sprachen
- Konfigurierbare Atemzug-Geschwindigkeit (Sekunden pro Ein/Ausatmen)
- Haptic Feedback Pattern

---

## 5. Kritische Punkte / Risiken

| Risiko | Beschreibung | Mitigation |
|--------|-------------|------------|
| **Audio auf Mobile** | Browser blockieren Autoplay ohne User-Interaktion | Erster Tap auf "Start" entsperrt Audio-Kontext |
| **Screen-Timeout** | Handy geht in Standby während Session | Wake Lock API nutzen (Chrome Android unterstützt das) |
| **TTS-Qualität** | Browser-TTS klingt schlecht auf Deutsch | Vorgerenderte Snippets (ElevenLabs) |
| **Timing** | Audio-Playback und Timer müssen synchron sein | Web Audio API statt HTML5 Audio Element |

---

## 6. Nächster Schritt

Phase 1, Inkrement 1.1–1.8 als **Claude Artifact** bauen. Kein Audio, rein visuell/textuell geführt. Damit validierst du UX und Timing, bevor du in Audio investierst.

**Bereit? Dann sag Bescheid, und ich starte mit dem Artifact.**
