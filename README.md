# Wim Hof Breathwork

A personal guided breathing app for the Wim Hof Method. Built as a standalone PWA for Android — no accounts, no cloud, purely local.

## What It Does

Guides you through Wim Hof breathing sessions with three phases per round:

1. **Power Breathing** — Deep rhythmic breathing with animated visual pacing
2. **Retention** — Hold your breath after exhaling, timer counts up, abort anytime
3. **Recovery Breath** — Deep inhale and hold for a set duration

After recovery, the next round starts automatically — or you see your session summary.

## Features

- Configurable sessions: rounds (1–6), breaths (20–50), max retention (30–300s), recovery (10–30s)
- Configurable breath tempo (2–8 seconds per cycle)
- Animated breathing circle with smooth easing
- Motivation messages during retention ("Entspanne deinen Körper.", "Du machst das gut.")
- Fullscreen mode & Wake Lock (screen stays on)
- Vibration feedback at phase transitions (Android)
- Session summary with retention times per round
- Settings persist in localStorage

## Quick Start

No build step needed. Just open the file:

```bash
# Option 1: Open directly
open wim-hof-app.html      # macOS
xdg-open wim-hof-app.html  # Linux

# Option 2: Serve locally (for mobile testing)
python3 -m http.server 8080
# Then open http://localhost:8080/wim-hof-app.html on your phone
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Vanilla HTML/CSS/JS (single file, zero dependencies) |
| Animation | CSS + requestAnimationFrame |
| Timing | performance.now() (breathing), Date.now() (timers) |
| Persistence | localStorage |
| Hosting | GitHub Pages (planned) |

## Project Structure

```
WimHofBreathWork/
├── wim-hof-app.html              # Production app (standalone PWA)
├── wim-hof-app.jsx               # React prototype (Claude Artifact)
├── wim-hof-breathwork-konzept.md  # Full concept & roadmap
├── CLAUDE.md                      # Architecture guide
├── audio/                         # Optional MP3 audio snippets
│   ├── session_start.mp3
│   ├── session_end.mp3
│   ├── breath_cue.mp3
│   ├── round_done.mp3
│   ├── recovery_end.mp3
│   ├── guide_01.mp3 … guide_03.mp3
│   ├── motiv_01.mp3 … motiv_04.mp3
│   └── ambient.mp3
└── 90_DOCS/                       # Project documentation
    ├── PROJEKT.md                 # Task tracking
    └── tasks/                     # Task details & artifacts
```

## Audio

The app uses a **hybrid audio engine** (Web Audio API): MP3 files with synthesis fallback.

### How it works

1. On session start, the engine tries to load each MP3 from `audio/<name>.mp3`
2. If an MP3 exists, it plays the file
3. If not, it falls back to a Web Audio synthesis (singing bowls, FM chimes, shaped tones)

This means **all MP3 files are optional** — the app works without any audio files present.

### Snippet naming (fixed convention)

MP3 files must use these exact names in the `audio/` directory:

| File | Purpose | Synthesis fallback |
|------|---------|-------------------|
| `session_start.mp3` | Played at session begin | Singing bowl (220 Hz) |
| `session_end.mp3` | Played at session end | Singing bowl (196 Hz) |
| `guide_01.mp3` | Voice guidance: breathing intro | FM chime |
| `guide_02.mp3` | Voice guidance: retention intro | FM chime |
| `guide_03.mp3` | Voice guidance: recovery intro | FM chime |
| `motiv_01.mp3` … `motiv_04.mp3` | Motivation messages during retention | Warm tone |
| `breath_cue.mp3` | Short cue per breath cycle | Soft breath cue tone |
| `recovery_end.mp3` | Recovery phase finished | Singing bowl (262 Hz) |
| `round_done.mp3` | Round completed | FM chime |
| `ambient.mp3` | Looping background ambient | Synthesized ocean drone |

### Adding your own audio

Drop MP3 files into `audio/` with the names above — no code changes needed. You can replace individual snippets selectively; missing files simply use the synthesis fallback.

Voice guidance and motivation snippets (`guide_*`, `motiv_*`) are the primary candidates for MP3 replacement, since speech cannot be synthesized. Sound effects (bowls, chimes, cues) already sound good via synthesis.

## Roadmap

- **Phase 2:** Audio integration — AI-generated voice guidance (~14 pre-rendered snippets), ambient sounds
- **Phase 3:** PWA deployment — Service Worker, manifest, GitHub Pages, installable on Android

Full details: [wim-hof-breathwork-konzept.md](wim-hof-breathwork-konzept.md)

## Language

UI and voice guidance are in **German**. Code and documentation in English.

## License

MIT
