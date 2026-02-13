# TASK-003: Audio-Generierung

**UUID:** TASK-003
**Status:** 📋 pending
**Created:** 2026-02-13
**Updated:** 2026-02-13
**Effort:** 45min (aktiv) + Wartezeit Downloads
**Dependencies:** TASK-002

---

## Objective

13 Audio-Files generieren (11 Sprach-Snippets + 1 Ambient-Loop + 1 Sound-Cue) fuer die gefuehrte Meditation. Alles machbar mit **ElevenLabs Free Tier** + **Freesound.org** (kostenlos).

**Expected Outcome:**
- 11 deutsche Sprach-Snippets als MP3 (ElevenLabs)
- 1 Ambient-Loop als MP3 (Freesound.org, CC0)
- 1 Breath-Cue Sound als MP3 (Freesound.org, CC0)
- Alle Files im Ordner `audio/` mit korrekten Dateinamen

---

## Budget-Check: Free Tier reicht locker

| Kennzahl | Wert |
|----------|------|
| **Alle 11 Texte zusammen** | ~296 Zeichen |
| **ElevenLabs Free Tier** | 10.000 Zeichen/Monat |
| **Auslastung** | ~3% (selbst mit 10x Neuversuchen: ~30%) |
| **Kosten** | 0 EUR |

Fazit: Kein Upgrade noetig. Sie koennen jeden Snippet mehrfach regenerieren, bis er passt.

---

## Teil A: ElevenLabs Setup (einmalig, ~5 Min.)

### Schritt 1: Account erstellen

1. Gehe zu **https://elevenlabs.io**
2. "Sign Up" → Free Account erstellen (E-Mail oder Google)
3. E-Mail bestaetigen

### Schritt 2: Stimme auswaehlen

1. Gehe zu **Text to Speech** (linke Navigation)
2. Klicke auf den **Voice-Selector** (oben)
3. Filter: **Language → German** setzen
4. Empfohlene Stimmen (ruhig, warm, meditativ):
   - **"Daniel"** — maennlich, ruhig, deutsch
   - **"Sarah"** — weiblich, warm, deutsch
   - Alternativ: Voice Library durchsuchen → Filter "German" + "Calm"
5. Stimme anhoeren (Play-Button) → die waehlen, die am besten zu Meditation passt

> **Tipp:** Dieselbe Stimme fuer ALLE 11 Snippets verwenden. Konsistenz ist wichtiger als Perfektion.

### Schritt 3: Voice Settings konfigurieren

Im Text-to-Speech Panel, klicke auf **"Settings"** (Zahnrad neben der Stimme):

| Setting | Empfehlung | Warum |
|---------|-----------|-------|
| **Stability** | 0.70 - 0.80 | Ruhig, konsistent, wenig Variation |
| **Clarity + Similarity** | 0.75 - 0.85 | Klare Aussprache |
| **Style** | 0.00 - 0.10 | Minimal — wir wollen neutral, nicht theatralisch |
| **Speaker Boost** | OFF | Nicht noetig fuer kurze Snippets |

> Diese Settings einmal setzen, dann fuer alle Snippets beibehalten.

---

## Teil B: Sprach-Snippets generieren (~20 Min.)

### Workflow pro Snippet

1. Text aus der Tabelle unten **copy-pasten** ins ElevenLabs Textfeld
2. **Generate** klicken
3. **Anhoeren** — passt Ton und Tempo?
   - Falls nicht: nochmal Generate (kostet nur ~30 Zeichen pro Versuch)
4. **Download** als MP3 (Download-Button rechts)
5. Datei umbenennen in den Dateinamen aus der Tabelle

### Snippet-Tabelle (copy-paste ready)

Generieren Sie die Snippets in dieser Reihenfolge. Gleiche Reihenfolge = gleicher Flow wie spaeter in der App.

#### Batch 1: Session-Rahmen

| # | Dateiname | Text zum Einfuegen | Zweck |
|---|-----------|-------------------|-------|
| 1 | `session_start.mp3` | Mach es dir bequem. Wir beginnen. | Session-Start |
| 2 | `round_done.mp3` | Gut gemacht. Naechste Runde. | Runden-Uebergang |
| 3 | `recovery_end.mp3` | Langsam ausatmen. | Ende Recovery |
| 4 | `session_end.mp3` | Session beendet. Gut gemacht. | Session-Ende |

#### Batch 2: Atem-Anleitungen

| # | Dateiname | Text zum Einfuegen | Zweck |
|---|-----------|-------------------|-------|
| 5 | `guide_01.mp3` | Atme tief ein... und lass los. | Start Power Breathing |
| 6 | `guide_02.mp3` | Letzter Atemzug. Atme aus... und halte. | Uebergang zu Retention |
| 7 | `guide_03.mp3` | Atme jetzt tief ein... und halte. | Uebergang zu Recovery |

#### Batch 3: Motivation (Retention-Phase)

| # | Dateiname | Text zum Einfuegen | Zweck |
|---|-----------|-------------------|-------|
| 8 | `motiv_01.mp3` | Entspanne deinen Koerper. | ~15s nach Retention-Start |
| 9 | `motiv_02.mp3` | Du machst das gut. | Zufaellig bei laengerer Retention |
| 10 | `motiv_03.mp3` | Bleib ruhig. Lass los. | Zufaellig bei laengerer Retention |
| 11 | `motiv_04.mp3` | Gib nicht auf. | Zufaellig bei laengerer Retention |

**Gesamt: 11 Snippets, ~296 Zeichen, ~3% vom Free Tier.**

### Qualitaets-Check pro Snippet

Bevor Sie zum naechsten weitergehen, pruefen:

- [ ] Klingt ruhig und meditativ (nicht hektisch)?
- [ ] Deutsche Aussprache korrekt?
- [ ] Kein Knacksen/Rauschen am Anfang oder Ende?
- [ ] Laenge plausibel (2-5 Sekunden)?

> **Falls ein Snippet nicht passt:** Einfach nochmal "Generate" klicken. Die Variation zwischen Generierungen ist normal und gewollt. Jeder Versuch kostet nur die Textlaenge (~20-40 Zeichen).

---

## Teil C: Ambient + Sound-Cue von Freesound.org (~15 Min.)

Diese zwei Files sind keine Sprache, sondern Sounds. Kostenlos von Freesound.org.

### Schritt 1: Freesound Account

1. Gehe zu **https://freesound.org**
2. Account erstellen (kostenlos)
3. Einloggen

### Schritt 2: Ambient-Loop finden

1. Suche: **"meditation ambient drone"** oder **"calm ocean loop"**
2. Filter: **License → Creative Commons 0** (CC0 = keine Attribution noetig)
3. Filter: **Duration → 60-120 Sekunden**
4. Anhoeren — soll ruhig, subtil, nicht ablenkend sein
5. Download als **WAV oder MP3**
6. Umbenennen zu: **`ambient_loop.mp3`**

**Gute Suchbegriffe als Fallback:**
- "meditation background"
- "ambient nature loop"
- "relaxing drone"
- "ocean waves calm"

### Schritt 3: Breath-Cue finden

1. Suche: **"singing bowl"** oder **"soft bell meditation"**
2. Filter: **License → CC0**
3. Filter: **Duration → 1-3 Sekunden**
4. Anhoeren — soll subtil sein, ein sanfter "Ding"-Ton
5. Download
6. Umbenennen zu: **`breath_cue.mp3`**

**Gute Suchbegriffe als Fallback:**
- "tibetan bowl"
- "chime soft"
- "meditation bell single"

---

## Teil D: Files organisieren (~5 Min.)

### Ordner-Struktur

Alle 13 Files in diesen Ordner legen:

```
WimHofBreathWork/
  audio/
    session_start.mp3
    round_done.mp3
    recovery_end.mp3
    session_end.mp3
    guide_01.mp3
    guide_02.mp3
    guide_03.mp3
    motiv_01.mp3
    motiv_02.mp3
    motiv_03.mp3
    motiv_04.mp3
    ambient_loop.mp3
    breath_cue.mp3
```

### Checkliste nach dem Ablegen

- [ ] 13 MP3-Files im `audio/` Ordner vorhanden?
- [ ] Dateinamen exakt wie oben (lowercase, underscore, .mp3)?
- [ ] Alle Sprach-Snippets mit derselben Stimme generiert?
- [ ] ambient_loop.mp3 ist mindestens 60 Sekunden lang?
- [ ] breath_cue.mp3 ist 1-3 Sekunden lang?

---

## Acceptance Criteria

- [ ] 11 Sprach-Snippets als MP3 vorhanden (guide_01-03, motiv_01-04, session_start/end, round_done, recovery_end)
- [ ] 1 Ambient-Loop als MP3 vorhanden (CC0 Lizenz)
- [ ] 1 Breath-Cue als MP3 vorhanden (CC0 Lizenz)
- [ ] Alle Files im Ordner `audio/` mit korrekten Dateinamen
- [ ] Sprach-Snippets klingen ruhig, meditativ, deutsch
- [ ] Free Tier Budget nicht ueberschritten

---

## Definition of Done (DoD)

- [ ] Alle Acceptance Criteria erfuellt
- [ ] Task-Status in PROJEKT.md auf `completed` setzen
- [ ] Audit Trail aktualisiert (Datum + Outcome)
- [ ] Audio-Files in Git committen (oder separat vorhalten wenn zu gross)

---

## Troubleshooting

**Problem: ElevenLabs zeigt "Quota exceeded"**
→ Unwahrscheinlich bei 296 Zeichen. Falls doch: Warten bis naechster Monat oder zweiten Free Account.

**Problem: Deutsche Stimme klingt komisch**
→ Andere Stimme aus der Voice Library probieren. "Daniel" und "Sarah" sind erfahrungsgemaess gut fuer Deutsch.

**Problem: Ambient-Loop hat Knackser beim Loopen**
→ Suche nach Sounds mit "seamless loop" im Titel. Oder: In Audacity (kostenlos) Fade-In/Fade-Out von 2s hinzufuegen.

**Problem: Downloads von Freesound sind WAV statt MP3**
→ WAV funktioniert auch. Oder online konvertieren: https://cloudconvert.com/wav-to-mp3

---

## Referenz

Detaillierter Audio-Katalog mit Trigger-Zeitpunkten und Beschreibungen:
→ [`audio-katalog-elevenlabs.md`](TASK-003/artifacts/audio-katalog-elevenlabs.md)

---

## Output Location

- **Audio-Files:** `audio/` (Project Root)
- **Logs:** `90_DOCS/tasks/TASK-003/execution-logs/`
- **Artifacts:** `90_DOCS/tasks/TASK-003/artifacts/`

---

## Audit Trail

- 2026-02-13 - Created via `/project-init` (Platzhalter)
- 2026-02-13 - Aufgebohrt: Vollstaendiger Step-by-Step Guide mit Free Tier Analyse, Batch-Workflow, Freesound.org Anleitung
