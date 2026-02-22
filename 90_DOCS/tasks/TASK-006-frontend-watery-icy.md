# TASK-006: Frontend Redesign — "Watery / Icy" Look & Feel

**UUID:** TASK-006
**Status:** 📋 pending
**Created:** 2026-02-22
**Effort:** 3-5h
**Dependencies:** None (rein visuell, unabhaengig von Audio/PWA)

---

## Objective

Das gesamte visuelle Erscheinungsbild der App ueberarbeiten hin zu einem **"Watery / Icy"** Theme. Die Stimmung soll an **Eisbaden** erinnern: kalt, klar, herausfordernd — aber **nicht bedrohlich**, sondern nach innen gekehrt, meditativ und ruhig. Wie der Moment, in dem man ins kalte Wasser geht und der Atem kurz stockt, bevor Ruhe einkehrt.

## Design-Vision

### Stimmung & Emotionen
- **Challengend aber sicher** — wie der bewusste Schritt ins Eisbad
- **Introspektiv** — Fokus nach innen, keine aggressive Kälte
- **Klar & rein** — wie Gletscherwasser, nicht wie Sturm
- **Transformativ** — Kälte als Werkzeug, nicht als Bedrohung

### Farbpalette (Vorschlag — bei Implementation verfeinern)

| Rolle | Aktuell | Vorschlag | Beschreibung |
|-------|---------|-----------|--------------|
| **Hintergrund** | `#0a1628` → `#0d2137` | Tiefes Dunkelblau mit subtilen Unterwasser-Gradienten | Wie tiefer See, nicht wie Nachthimmel |
| **Primaer-Akzent** | `#7fdbda` (Teal) | Eisblau / helles Cyan `~#a0e8f0` bis `#d0f4ff` | Klar, leuchtend, wie Licht unter Eis |
| **Sekundaer-Akzent** | `#c8a050` (Gold) | Gold bleibt — als "Sonnenlicht durch Eis" | Nicht warmes Gold, sondern Licht das durch Eisdecke bricht. Warm-Kalt-Kontrast bewusst gewollt |
| **Text** | `#c8dce6` / `#e4f0f6` | Leicht blaeulicher, eisiger Weisston | Wie Reif auf Glas |
| **Subtile Akzente** | — | Frost-Weiss, transluzentes Blau | Fuer Glasmorphismus-Effekte |

### Visuelle Effekte & Techniken

#### 1. Glasmorphismus / Frosted Glass (bewusst sichtbar)
- UI-Panels mit `backdrop-filter: blur()` + semi-transparentem Hintergrund
- Slider-Bereiche, Config-Card, Done-Screen als "Eisscheiben"
- Subtile weisse Raender wie Reif-Kanten
- **Nicht dezent versteckt** — als bewusstes Gestaltungselement, wie Blick durch Eis/Wasser

#### 2. Breath-Circle Redesign
- **Einatmen:** Circle expandiert mit wellenartiger Bewegung, wie Wasser das sich ausbreitet
- **Ausatmen:** Circle kontrahiert, Wellen ziehen sich zurueck
- Ueberlegung: Concentrische Wellenringe (Ripple-Effekt) statt hartem Scale
- Glow-Effekt: Kuehles Eisblau, pulsierend, wie Licht unter Wasseroberfläche

#### 3. Hintergrund-Atmosphaere: Unterwasser-Welt
- **Leitmetapher:** Man ist unter Wasser und haelt die Luft an
- Unterwasser-Lichteffekte: Caustics / Lichtbrechungsmuster (CSS radial-gradient Animation)
  - Wie Sonnenlicht das durch die Wasseroberfläche bricht
  - Langsam wandernde Lichtflecken
- Aufsteigende Luftblasen (CSS-Partikel, wenige, langsam)
- Gradient-Shifts zwischen den Phasen (tieferes Blau → helleres Eis)
- Kein Schnee, keine abstrakten Partikel — alles soll "Wasser" sagen

#### 4. Phase-spezifische Variationen
| Phase | Visuelle Stimmung | Idee |
|-------|-------------------|------|
| **CONFIG** | Ruhiges Wasser, klar | Neutrale Eisblau-Palette |
| **BREATHING** | Rhythmisches Wasser | Wellenanimation synchron mit Atem |
| **RETENTION** | Unter Wasser / Luft anhalten | Tieferes Blau, Caustics intensiver, Sonnenlicht-Gold durch die Eisdecke |
| **RECOVERY** | Auftauchen / Waerme | Sanft waermere Toene mischen sich ein |
| **SESSION_DONE** | Klarheit nach Kaelte | Hellstes Blau, "frisch" Gefuehl |

#### 5. Typografie
- Bestehende Fonts (DM Sans / Space Mono) beibehalten — passen gut
- Ggf. duennere Font-Weights fuer "leichtes, klares" Gefuehl
- Letter-Spacing leicht erhoehen fuer "Luft"

#### 6. Buttons & Interaktive Elemente
- "Start Session" Button: Eisblau-Gradient mit Frost-Schimmer-Effekt
- Hover/Active: Subtiles Leuchten wie Licht auf Eisoberfläche
- Slider-Thumb: Rund, glaesern, wie Eiskugel oder Wassertropfen
- "Loslassen" Button (Retention): Kann Gold bleiben als bewusster Waerme-Kontrast

### Animationen & Transitions
- **Langsam und fliessend** — wie Wasser, nie abrupt
- Ease-Curves: `cubic-bezier(0.25, 0.1, 0.25, 1.0)` — natuerlich, organisch
- Screen-Transitions: Fade + leichter Blur (wie durch Wasser tauchen)
- Keine bounce/spring Effekte — die gehoeren nicht zu Wasser/Eis

## Technische Constraints

- **Alles in einer HTML-Datei** — kein Build-System, keine externen CSS-Files
- **Rein CSS + Vanilla JS** — keine Libraries (kein Three.js, kein GSAP)
- **Performance:** Mobile-first, Android PWA — Animationen muessen auf Mittelklasse-Phones fluessig laufen
- **CSS-Partikel wenn ueberhaupt:** Maximal 10-15 Elemente, keine Canvas-Loesung
- **backdrop-filter:** Wird von modernen Android-Browsern unterstuetzt, aber Fallback bedenken
- **Bestehende Funktionalitaet:** Null Regression — Session-Logik, Audio-Engine, Config bleiben identisch

## Scope & Abgrenzung

**In Scope:**
- Farbpalette ueberarbeiten
- Breath-Circle visuell ueberarbeiten (Wellen, Glow, Eis-Aesthetik)
- Glasmorphismus fuer UI-Panels
- Hintergrund-Atmosphaere (Gradienten, ggf. dezente Partikel)
- Phase-spezifische Farbvariationen
- Button-Styling anpassen
- Animations-Timing verfeinern

**Out of Scope:**
- Session-Logik aendern
- Audio-Engine aendern
- Neue Features hinzufuegen
- PWA/Service Worker
- JSX-Version synchronisieren (spaeter)

## Acceptance Criteria

- [ ] Farbpalette vermittelt "kaltes Wasser / Eis" — nicht "dunkler Weltraum"
- [ ] Breath-Circle hat wasseraehnliche Bewegung / Welleneffekt
- [ ] Mindestens 2 UI-Elemente nutzen Glasmorphismus (blur-Effekt)
- [ ] Hintergrund hat subtile Tiefe (nicht flach)
- [ ] Retention-Phase fuehlt sich visuell anders an als Breathing-Phase
- [ ] Kein bedrohliches Gefuehl — meditativ, ruhig, einladend
- [ ] Performance: 60fps Animationen auf Android Mittelklasse-Phone
- [ ] Keine Regression: Alle Session-Funktionen identisch
- [ ] Getestet in Chrome Android + Desktop Chrome

## Referenz-Inspiration

- **Eisbaden-Aesthetik:** Klares, blaues Wasser, weisser Dampf, Frost am Rand
- **Unterwasser-Fotografie:** Lichtbrechung, Blasen, tiefes Blau
- **Nordic Spa Design:** Minimalistisch, natuerlich, beruhigend trotz Kaelte
- **Wim Hof Branding:** Blau/Cyan-Toene, Natur, Stärke + Ruhe

## Design-Entscheidungen (geklaert)

1. **Gold → Sonnenlicht durch Eis** ✅
   Gold bleibt in der Retention-Phase, aber interpretiert als Sonnenlicht das durch Eis/Wasser bricht. Nicht "warmes Gold" sondern "Licht das durch die Eisdecke dringt". Verbindet Waerme (Sonne) mit Kaelte (Eis) — perfekt fuer den Retention-Moment.

2. **Partikel: Unterwasser-Reflexionen** ✅
   Keine Schneeflocken oder abstrakte Partikel. Stattdessen: **Wasserreflexionen / Caustics** — wie wenn man unter Wasser ist und Luft anhaelt. Lichtbrechungsmuster an der Oberfläche, aufsteigende Luftblasen. Das passt perfekt zur Retention-Phase (Luft anhalten) und zur Gesamt-Metapher.

3. **Glasmorphismus: Bewusst wahrnehmbar** ✅
   Nicht versteckt-dezent, sondern als bewusstes Gestaltungselement. Panels sollen sich anfuehlen wie Blick durch Eis oder Wasser. Der Blur-Effekt darf praesent sein und zum visuellen Erlebnis beitragen.

## Audit Trail

- 2026-02-22: Task erstellt — Design-Vision und Acceptance Criteria definiert
- 2026-02-22: Offene Fragen geklaert — Gold als Sonnenlicht-durch-Eis, Unterwasser-Reflexionen statt abstrakte Partikel, Glasmorphismus bewusst sichtbar
