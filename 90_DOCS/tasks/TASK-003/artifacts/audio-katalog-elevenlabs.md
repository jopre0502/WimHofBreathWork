# Audio-Katalog — ElevenLabs Textliste

Fertige Texte zum 1:1 Einsprechen in ElevenLabs (oder Google Cloud TTS).

**Empfehlung:** Ruhige, warme Stimme. Deutsch. Langsames Sprechtempo.
**Format:** MP3, 44.1kHz, Mono reicht.
**Naming:** Dateinamen wie in Spalte "ID" angegeben.

---

## Anleitungen (3 Kern-Snippets)

### guide_01.mp3
> Atme tief ein... und lass los.

**Trigger:** Beginn Phase 1 (Power Breathing)
**Dauer:** ~3-4 Sek.

### guide_02.mp3
> Letzter Atemzug. Atme aus... und halte.

**Trigger:** Ende Phase 1, Übergang zu Retention
**Dauer:** ~4-5 Sek.

### guide_03.mp3
> Atme jetzt tief ein... und halte.

**Trigger:** Ende Phase 2 (Retention → Recovery)
**Dauer:** ~3-4 Sek.

---

## Motivation (4 Snippets, zufällig in Retention)

### motiv_01.mp3
> Entspanne deinen Körper.

**Trigger:** ~15s nach Retention-Start
**Dauer:** ~2-3 Sek.

### motiv_02.mp3
> Du machst das gut.

**Trigger:** Zufällig bei längerer Retention
**Dauer:** ~2 Sek.

### motiv_03.mp3
> Bleib ruhig. Lass los.

**Trigger:** Zufällig bei längerer Retention
**Dauer:** ~2-3 Sek.

### motiv_04.mp3
> Gib nicht auf.

**Trigger:** Zufällig bei längerer Retention
**Dauer:** ~2 Sek.

---

## Session-Rahmen (4 Snippets)

### session_start.mp3
> Mach es dir bequem. Wir beginnen.

**Trigger:** Session-Start (nach Config-Screen)
**Dauer:** ~3-4 Sek.

### round_done.mp3
> Gut gemacht. Nächste Runde.

**Trigger:** Ende Phase 3, wenn weitere Runden folgen
**Dauer:** ~3 Sek.

### recovery_end.mp3
> Langsam ausatmen.

**Trigger:** Ende Phase 3 (Recovery)
**Dauer:** ~2-3 Sek.

### session_end.mp3
> Session beendet. Gut gemacht.

**Trigger:** Ende letzte Runde
**Dauer:** ~3-4 Sek.

---

## Ambient / Sounds (2 Files)

### ambient_loop.mp3
**Beschreibung:** Ruhiger Ambient-Sound (Drone, Natur, Meeresrauschen o.ä.)
**Quelle:** Freesound.org (Creative Commons) — z.B. "meditation ambient drone"
**Dauer:** ~60-120 Sek. (wird geloopt)
**Lautstärke:** Leise, subtil im Hintergrund

### breath_cue.mp3
**Beschreibung:** Subtiler Ton/Gong für Atemrhythmus-Pacing
**Quelle:** Freesound.org — z.B. "soft bell" oder "singing bowl"
**Dauer:** ~1-2 Sek.
**Trigger:** Ein/Aus-Markierung in Phase 1

---

## Zusammenfassung

| # | ID | Text / Beschreibung | Dauer |
|---|-----|---------------------|-------|
| 1 | guide_01 | Atme tief ein... und lass los. | ~3s |
| 2 | guide_02 | Letzter Atemzug. Atme aus... und halte. | ~4s |
| 3 | guide_03 | Atme jetzt tief ein... und halte. | ~3s |
| 4 | motiv_01 | Entspanne deinen Körper. | ~2s |
| 5 | motiv_02 | Du machst das gut. | ~2s |
| 6 | motiv_03 | Bleib ruhig. Lass los. | ~2s |
| 7 | motiv_04 | Gib nicht auf. | ~2s |
| 8 | session_start | Mach es dir bequem. Wir beginnen. | ~3s |
| 9 | round_done | Gut gemacht. Nächste Runde. | ~3s |
| 10 | recovery_end | Langsam ausatmen. | ~2s |
| 11 | session_end | Session beendet. Gut gemacht. | ~3s |
| 12 | ambient_loop | Ambient-Drone/Natur (Loop) | ~90s |
| 13 | breath_cue | Subtiler Gong/Bell | ~1s |

**Gesamt: 13 Audio-Files** (11 Sprache + 1 Ambient + 1 Sound-Cue)

---

## ElevenLabs Workflow

1. Gehe zu elevenlabs.io → Text to Speech
2. Wähle eine deutsche Stimme (z.B. "Antoni" oder "Adam" auf Deutsch)
3. Stelle Stability auf ~0.7, Clarity auf ~0.8 (ruhig, nicht zu dynamisch)
4. Kopiere jeden Text einzeln rein → Generate → Download als MP3
5. Benenne die Datei nach der ID (z.B. `guide_01.mp3`)
6. Wiederhole für alle 11 Sprach-Snippets (~5 Min. Arbeit)

**Kosten:** ~0.50-1.00 EUR (Free Tier reicht für ~10.000 Zeichen)

Für ambient_loop und breath_cue: Freesound.org durchsuchen, passende CC0-Sounds downloaden.
