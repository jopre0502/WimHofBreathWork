import { useState, useEffect, useRef, useCallback } from "react";

// --- Constants ---
const PHASES = {
  CONFIG: "config",
  COUNTDOWN: "countdown",
  BREATHING: "breathing",
  RETENTION: "retention",
  RECOVERY: "recovery",
  ROUND_DONE: "round_done",
  SESSION_DONE: "session_done",
};

const BREATH_IN_MS = 1800;
const BREATH_OUT_MS = 1800;
const BREATH_CYCLE_MS = BREATH_IN_MS + BREATH_OUT_MS;
const COUNTDOWN_SECONDS = 3;

const DEFAULT_CONFIG = {
  rounds: 3,
  breaths: 30,
  retentionMax: 90,
  recoveryDuration: 15,
};

const LIMITS = {
  rounds: [1, 6],
  breaths: [20, 50],
  retentionMax: [30, 300],
  recoveryDuration: [10, 30],
};

const LABELS = {
  rounds: "Runden",
  breaths: "Atemzüge",
  retentionMax: "Retention (Sek.)",
  recoveryDuration: "Recovery (Sek.)",
};

// --- Guidance Messages ---
const GUIDANCE = {
  countdown: (n) => n,
  breathingStart: "Atme tief ein… und lass los.",
  breathingHalf: "Weiter. Tief ein… locker aus.",
  breathingEnd: "Letzter Atemzug. Atme aus… und halte.",
  retentionStart: "Halte. Entspanne deinen Körper.",
  retentionMotivation: [
    "Du machst das gut.",
    "Bleib ruhig. Lass los.",
    "Gib nicht auf.",
    "Entspanne dich.",
  ],
  retentionAbort: "Okay. Atme tief ein.",
  retentionEnd: "Zeit. Atme jetzt tief ein.",
  recoveryStart: "Tief einatmen… und halten.",
  recoveryEnd: "Langsam ausatmen.",
  roundDone: "Gut gemacht. Nächste Runde.",
  sessionEnd: "Session beendet. Gut gemacht.",
};

// --- Helpers ---
function loadConfig() {
  return { ...DEFAULT_CONFIG };
}

function saveConfig(cfg) {
  // no-op in artifact
}

function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m > 0) return `${m}:${s.toString().padStart(2, "0")}`;
  return `${s}`;
}

// --- Components ---

function ConfigSlider({ id, value, onChange }) {
  const [min, max] = LIMITS[id];
  const label = LABELS[id];
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "rgba(180,210,220,0.7)",
        }}
      >
        <span>{label}</span>
        <span
          style={{
            color: "#7fdbda",
            fontFamily: "'Space Mono', monospace",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {value}
          {id === "retentionMax" || id === "recoveryDuration" ? "s" : ""}
        </span>
      </div>
      <div style={{ position: "relative", height: 6, borderRadius: 3 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(127,219,218,0.12)",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: `${pct}%`,
            background: "linear-gradient(90deg, #7fdbda, #4fa8a7)",
            borderRadius: 3,
            transition: "width 0.15s ease",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(id, parseInt(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            margin: 0,
          }}
        />
      </div>
    </div>
  );
}

function BreathCircle({ phase, breathProgress, timerProgress }) {
  let scale = 1;
  let opacity = 0.6;
  let pulseClass = "";
  let innerColor = "rgba(127,219,218,0.15)";
  let borderColor = "rgba(127,219,218,0.4)";

  if (phase === PHASES.BREATHING) {
    // breathProgress: 0..1 within one breath cycle
    // 0..0.5 = inhale (scale up), 0.5..1 = exhale (scale down)
    if (breathProgress <= 0.5) {
      const t = breathProgress / 0.5;
      scale = 0.55 + t * 0.45;
      opacity = 0.4 + t * 0.5;
    } else {
      const t = (breathProgress - 0.5) / 0.5;
      scale = 1.0 - t * 0.45;
      opacity = 0.9 - t * 0.5;
    }
    innerColor = `rgba(127,219,218,${0.1 + opacity * 0.2})`;
    borderColor = `rgba(127,219,218,${0.3 + opacity * 0.4})`;
  } else if (phase === PHASES.RETENTION) {
    scale = 0.5;
    opacity = 0.3 + timerProgress * 0.15;
    innerColor = "rgba(200,160,80,0.1)";
    borderColor = `rgba(200,160,80,${0.3 + Math.sin(Date.now() / 1500) * 0.15})`;
  } else if (phase === PHASES.RECOVERY) {
    scale = 0.95;
    opacity = 0.7;
    innerColor = "rgba(127,219,218,0.2)";
    borderColor = "rgba(127,219,218,0.6)";
  } else if (phase === PHASES.COUNTDOWN) {
    scale = 0.7;
    innerColor = "rgba(127,219,218,0.08)";
    borderColor = "rgba(127,219,218,0.3)";
  }

  return (
    <div
      style={{
        position: "relative",
        width: 260,
        height: 260,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${innerColor} 0%, transparent 70%)`,
          transform: `scale(${scale * 1.3})`,
          transition:
            phase === PHASES.BREATHING
              ? "none"
              : "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          opacity: opacity * 0.5,
        }}
      />
      {/* Main circle */}
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: `2px solid ${borderColor}`,
          background: innerColor,
          transform: `scale(${scale})`,
          transition:
            phase === PHASES.BREATHING
              ? "none"
              : "transform 0.8s cubic-bezier(0.4,0,0.2,1), background 0.5s ease, border-color 0.5s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      {/* Inner ring */}
      <div
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: "50%",
          border: `1px solid ${borderColor}`,
          opacity: 0.4,
          transform: `scale(${scale * 0.95})`,
          transition:
            phase === PHASES.BREATHING
              ? "none"
              : "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

// --- Main App ---
export default function WimHofApp() {
  const [config, setConfig] = useState(loadConfig);
  const [phase, setPhase] = useState(PHASES.CONFIG);
  const [round, setRound] = useState(1);
  const [breathCount, setBreathCount] = useState(0);
  const [breathProgress, setBreathProgress] = useState(0);
  const [timerSec, setTimerSec] = useState(0);
  const [timerMax, setTimerMax] = useState(0);
  const [guidance, setGuidance] = useState("");
  const [countdownVal, setCountdownVal] = useState(COUNTDOWN_SECONDS);
  const [retentionTimes, setRetentionTimes] = useState([]);
  const [breathLabel, setBreathLabel] = useState("");

  const animRef = useRef(null);
  const timerRef = useRef(null);
  const breathStartRef = useRef(null);
  const retentionStartRef = useRef(null);
  const motivationShownRef = useRef(new Set());
  const wakeLockRef = useRef(null);

  // Wake Lock
  const requestWakeLock = useCallback(async () => {
    try {
      if ("wakeLock" in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      }
    } catch {}
  }, []);

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  }, []);

  // Config change
  const handleConfigChange = useCallback((id, val) => {
    setConfig((prev) => {
      const next = { ...prev, [id]: val };
      saveConfig(next);
      return next;
    });
  }, []);

  // Start session
  const startSession = useCallback(() => {
    setRound(1);
    setRetentionTimes([]);
    setPhase(PHASES.COUNTDOWN);
    setCountdownVal(COUNTDOWN_SECONDS);
    setGuidance("");
    requestWakeLock();
  }, [requestWakeLock]);

  // Countdown phase
  useEffect(() => {
    if (phase !== PHASES.COUNTDOWN) return;
    setGuidance(GUIDANCE.countdown(countdownVal));

    if (countdownVal <= 0) {
      setPhase(PHASES.BREATHING);
      return;
    }

    const t = setTimeout(() => setCountdownVal((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdownVal]);

  // Breathing phase
  useEffect(() => {
    if (phase !== PHASES.BREATHING) return;

    setBreathCount(0);
    setBreathProgress(0);
    breathStartRef.current = performance.now();
    setGuidance(GUIDANCE.breathingStart);
    setBreathLabel("Einatmen");

    let currentBreath = 0;
    let guidanceHalfShown = false;
    let guidanceEndShown = false;

    const animate = () => {
      const elapsed = performance.now() - breathStartRef.current;
      const totalBreaths = config.breaths;
      const cyclePos = (elapsed % BREATH_CYCLE_MS) / BREATH_CYCLE_MS;
      const completedBreaths = Math.floor(elapsed / BREATH_CYCLE_MS);

      if (completedBreaths >= totalBreaths) {
        cancelAnimationFrame(animRef.current);
        setPhase(PHASES.RETENTION);
        return;
      }

      // Update breath label
      if (cyclePos <= 0.5) {
        setBreathLabel("Einatmen");
      } else {
        setBreathLabel("Ausatmen");
      }

      if (completedBreaths !== currentBreath) {
        currentBreath = completedBreaths;
        setBreathCount(currentBreath);
      }

      // Guidance at halfway
      if (!guidanceHalfShown && currentBreath >= Math.floor(totalBreaths / 2)) {
        guidanceHalfShown = true;
        setGuidance(GUIDANCE.breathingHalf);
      }

      // Guidance near end
      if (!guidanceEndShown && currentBreath >= totalBreaths - 2) {
        guidanceEndShown = true;
        setGuidance(GUIDANCE.breathingEnd);
      }

      setBreathProgress(cyclePos);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, config.breaths]);

  // Retention phase
  useEffect(() => {
    if (phase !== PHASES.RETENTION) return;

    setTimerSec(0);
    setTimerMax(config.retentionMax);
    retentionStartRef.current = Date.now();
    motivationShownRef.current = new Set();
    setGuidance(GUIDANCE.retentionStart);

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - retentionStartRef.current) / 1000);
      setTimerSec(elapsed);

      // Motivation messages at intervals
      const motivations = GUIDANCE.retentionMotivation;
      const interval20s = Math.floor(elapsed / 20);
      if (
        elapsed > 10 &&
        interval20s > 0 &&
        !motivationShownRef.current.has(interval20s)
      ) {
        motivationShownRef.current.add(interval20s);
        const idx = (interval20s - 1) % motivations.length;
        setGuidance(motivations[idx]);
      }

      if (elapsed >= config.retentionMax) {
        clearInterval(interval);
        const actualTime = Math.floor(
          (Date.now() - retentionStartRef.current) / 1000
        );
        setRetentionTimes((prev) => [...prev, actualTime]);
        setGuidance(GUIDANCE.retentionEnd);
        setTimeout(() => setPhase(PHASES.RECOVERY), 1500);
      }
    }, 250);

    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [phase, config.retentionMax]);

  // Retention abort
  const abortRetention = useCallback(() => {
    if (phase !== PHASES.RETENTION) return;
    clearInterval(timerRef.current);
    const actualTime = Math.floor(
      (Date.now() - retentionStartRef.current) / 1000
    );
    setRetentionTimes((prev) => [...prev, actualTime]);
    setGuidance(GUIDANCE.retentionAbort);
    setTimeout(() => setPhase(PHASES.RECOVERY), 1200);
  }, [phase]);

  // Recovery phase
  useEffect(() => {
    if (phase !== PHASES.RECOVERY) return;

    setTimerSec(0);
    setTimerMax(config.recoveryDuration);
    setGuidance(GUIDANCE.recoveryStart);

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setTimerSec(elapsed);

      if (elapsed >= config.recoveryDuration) {
        clearInterval(interval);
        setGuidance(GUIDANCE.recoveryEnd);
        setTimeout(() => {
          if (round < config.rounds) {
            setGuidance(GUIDANCE.roundDone);
            setPhase(PHASES.ROUND_DONE);
          } else {
            setPhase(PHASES.SESSION_DONE);
          }
        }, 1500);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [phase, config.recoveryDuration, round, config.rounds]);

  // Round done -> next round after short pause
  useEffect(() => {
    if (phase !== PHASES.ROUND_DONE) return;
    const t = setTimeout(() => {
      setRound((r) => r + 1);
      setCountdownVal(COUNTDOWN_SECONDS);
      setPhase(PHASES.COUNTDOWN);
    }, 2500);
    return () => clearTimeout(t);
  }, [phase]);

  // Session done
  useEffect(() => {
    if (phase !== PHASES.SESSION_DONE) return;
    setGuidance(GUIDANCE.sessionEnd);
    releaseWakeLock();
  }, [phase, releaseWakeLock]);

  const backToConfig = useCallback(() => {
    setPhase(PHASES.CONFIG);
    releaseWakeLock();
    cancelAnimationFrame(animRef.current);
    clearInterval(timerRef.current);
  }, [releaseWakeLock]);

  // --- Render ---
  const isActive =
    phase !== PHASES.CONFIG && phase !== PHASES.SESSION_DONE;

  const timerProgress = timerMax > 0 ? timerSec / timerMax : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(170deg, #0a1628 0%, #0d2137 40%, #0a1a2e 100%)",
        color: "#c8dce6",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Subtle background texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(127,219,218,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(79,168,167,0.03) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* === CONFIG SCREEN === */}
      {phase === PHASES.CONFIG && (
        <div
          style={{
            width: "100%",
            maxWidth: 380,
            zIndex: 1,
            animation: "fadeIn 0.6s ease",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(127,219,218,0.5)",
                marginBottom: 8,
              }}
            >
              Wim Hof Methode
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                margin: 0,
                color: "#e4f0f6",
                letterSpacing: "-0.02em",
              }}
            >
              Breathwork
            </h1>
          </div>

          {Object.keys(LABELS).map((key) => (
            <ConfigSlider
              key={key}
              id={key}
              value={config[key]}
              onChange={handleConfigChange}
            />
          ))}

          <button
            onClick={startSession}
            style={{
              width: "100%",
              marginTop: 32,
              padding: "18px 0",
              background: "linear-gradient(135deg, #7fdbda, #4fa8a7)",
              color: "#0a1628",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              boxShadow: "0 4px 24px rgba(127,219,218,0.2)",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Session starten
          </button>
        </div>
      )}

      {/* === ACTIVE SESSION === */}
      {isActive && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 400,
            zIndex: 1,
            flex: 1,
            minHeight: "80vh",
          }}
        >
          {/* Phase & Round indicator */}
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(180,210,220,0.45)",
              marginBottom: 8,
            }}
          >
            {phase === PHASES.COUNTDOWN && "Bereit machen"}
            {phase === PHASES.BREATHING && `Phase 1 · Atmen`}
            {phase === PHASES.RETENTION && `Phase 2 · Halten`}
            {phase === PHASES.RECOVERY && `Phase 3 · Recovery`}
            {phase === PHASES.ROUND_DONE && "Runde geschafft"}
          </div>

          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "rgba(127,219,218,0.4)",
              marginBottom: 40,
            }}
          >
            Runde {round} / {config.rounds}
          </div>

          {/* Breath Circle */}
          <div style={{ position: "relative", marginBottom: 32 }}>
            <BreathCircle
              phase={phase}
              breathProgress={breathProgress}
              timerProgress={timerProgress}
            />

            {/* Center content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {phase === PHASES.COUNTDOWN && (
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 64,
                    fontWeight: 700,
                    color: "#7fdbda",
                  }}
                >
                  {countdownVal > 0 ? countdownVal : ""}
                </span>
              )}

              {phase === PHASES.BREATHING && (
                <>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 42,
                      fontWeight: 700,
                      color: "#e4f0f6",
                    }}
                  >
                    {breathCount + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "rgba(127,219,218,0.6)",
                      marginTop: 4,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {breathLabel}
                  </span>
                </>
              )}

              {phase === PHASES.RETENTION && (
                <>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 42,
                      fontWeight: 700,
                      color: "#c8a050",
                    }}
                  >
                    {formatTime(timerSec)}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "rgba(200,160,80,0.5)",
                      marginTop: 4,
                    }}
                  >
                    / {formatTime(config.retentionMax)}
                  </span>
                </>
              )}

              {phase === PHASES.RECOVERY && (
                <>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 42,
                      fontWeight: 700,
                      color: "#7fdbda",
                    }}
                  >
                    {formatTime(config.recoveryDuration - timerSec)}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "rgba(127,219,218,0.5)",
                      marginTop: 4,
                    }}
                  >
                    Recovery
                  </span>
                </>
              )}

              {phase === PHASES.ROUND_DONE && (
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 18,
                    color: "#7fdbda",
                  }}
                >
                  ✓
                </span>
              )}
            </div>
          </div>

          {/* Guidance text */}
          <div
            style={{
              minHeight: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                fontWeight: 500,
                color: "rgba(228,240,246,0.85)",
                lineHeight: 1.5,
                margin: 0,
                fontStyle: "italic",
                transition: "opacity 0.4s ease",
              }}
            >
              {guidance}
            </p>
          </div>

          {/* Retention abort button */}
          {phase === PHASES.RETENTION && (
            <button
              onClick={abortRetention}
              style={{
                marginTop: 40,
                padding: "20px 48px",
                background: "rgba(200,160,80,0.12)",
                color: "#c8a050",
                border: "1px solid rgba(200,160,80,0.3)",
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.15s ease",
                minWidth: 200,
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.96)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Loslassen
            </button>
          )}

          {/* Abort session (small, top right) */}
          <button
            onClick={backToConfig}
            style={{
              position: "fixed",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              color: "rgba(180,210,220,0.3)",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              padding: "8px 12px",
            }}
          >
            ✕ Beenden
          </button>
        </div>
      )}

      {/* === SESSION DONE === */}
      {phase === PHASES.SESSION_DONE && (
        <div
          style={{
            width: "100%",
            maxWidth: 380,
            zIndex: 1,
            textAlign: "center",
            animation: "fadeIn 0.8s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(127,219,218,0.5)",
              marginBottom: 8,
            }}
          >
            Session beendet
          </div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#e4f0f6",
              margin: "0 0 48px 0",
            }}
          >
            Gut gemacht.
          </h2>

          {/* Retention summary */}
          <div style={{ marginBottom: 48 }}>
            {retentionTimes.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(127,219,218,0.08)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "rgba(180,210,220,0.6)",
                  }}
                >
                  Runde {i + 1}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#7fdbda",
                  }}
                >
                  {formatTime(t)}
                </span>
              </div>
            ))}

            {retentionTimes.length > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 0 0 0",
                  marginTop: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "rgba(180,210,220,0.4)",
                  }}
                >
                  Längste
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#e4f0f6",
                  }}
                >
                  {formatTime(Math.max(...retentionTimes))}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={backToConfig}
            style={{
              width: "100%",
              padding: "18px 0",
              background: "linear-gradient(135deg, #7fdbda, #4fa8a7)",
              color: "#0a1628",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(127,219,218,0.2)",
            }}
          >
            Neue Session
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
