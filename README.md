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
└── 90_DOCS/                       # Project documentation
    ├── PROJEKT.md                 # Task tracking
    └── tasks/                     # Task details & artifacts
```

## Roadmap

- **Phase 2:** Audio integration — AI-generated voice guidance (~14 pre-rendered snippets), ambient sounds
- **Phase 3:** PWA deployment — Service Worker, manifest, GitHub Pages, installable on Android

Full details: [wim-hof-breathwork-konzept.md](wim-hof-breathwork-konzept.md)

## Language

UI and voice guidance are in **German**. Code and documentation in English.

## License

MIT
