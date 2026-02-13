# TASK-004: Audio-Engine mit Platzhalter-Sounds

**UUID:** TASK-004
**Status:** ✅ completed
**Created:** 2026-02-13
**Completed:** 2026-02-13
**Effort:** 2h (geschaetzt 3h)
**Dependencies:** None (entkoppelt von TASK-003)

---

## Objective

Web Audio API Engine in `wim-hof-app.html` implementieren mit Oszillator-basierten Platzhalter-Sounds. Wenn spaeter echte MP3-Files in `audio/` liegen, werden sie automatisch geladen.

## Implementation

### AudioEngine (Zeilen 292-406)
- `init()` — AudioContext erstellen/resume (User-Gesture compliant)
- `loadAll()` — Versucht 13 MP3-Files zu laden (`audio/*.mp3`), graceful fail
- `play(name)` — Cached Buffer abspielen ODER Oszillator-Fallback
- `playTone(freq, dur, type)` — Platzhalter-Ton mit Fade-Out
- `startAmbient()` — Ambient Loop (MP3) oder 110Hz Drone-Oszillator
- `stopAmbient()` — Fade-Out + Stop
- `stopAll()` — Alles stoppen, AudioContext schliessen

### Platzhalter-Ton-Mapping
| Snippet-Typ | Frequenz | Dauer | Charakter |
|-------------|----------|-------|-----------|
| Session-Rahmen | 440Hz | 0.6s | Warmer Ton |
| Guide | 330Hz | 0.4s | Tiefer Hinweis |
| Motivation | 520Hz | 0.3s | Sanfter Ping |
| Breath Cue | 880Hz | 0.08s | Kurzer Tick |
| Ambient | 110Hz | continuous | Leiser Drone |

### Config-Screen (Zeilen 137-144)
- Audio Toggle (An/Aus) — Default: An
- Lautstaerke Slider (0-100%) — Default: 70%

### Session Flow Integration
- `startSession()` → init + loadAll + session_start + ambient
- `runBreathing()` → guide_01, breath_cue pro Zyklus, guide_02
- `runRetention()` → guide_03 (abort/timeout), motiv_01-04
- `runRecovery()` → recovery_end, round_done
- `showDone()` → session_end + stopAmbient
- `endSession()` → stopAll

## Acceptance Criteria
- [x] AudioEngine Klasse implementiert
- [x] Config-Screen zeigt Audio Toggle + Lautstaerke
- [x] Platzhalter-Toene an allen Session-Events
- [x] Audio deaktivierbar (Toggle Aus → keine Toene)
- [x] Graceful Degradation (keine MP3s → Oszillator-Fallback)
- [x] Browser-Autoplay-Policy compliant (init bei User-Klick)

## Audit Trail
- 2026-02-13: Implementation in wim-hof-app.html (640 Zeilen, +150 vs. vorher)
- Architektur-Entscheidung: TASK-003 Dependency entfernt — Platzhalter-Sounds machen Task eigenstaendig
