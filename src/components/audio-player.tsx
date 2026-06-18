"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Headphones, Loader2 } from "lucide-react";

// AudioPlayer — "listen to this lesson" with personality.
// Two surfaces from one <audio>:
//   1. Inline hero card at the top of the lesson (with a live equalizer while playing).
//   2. A floating, audio-reactive orb that detaches when the card scrolls out of view
//      and follows you down the page — pulsing rings driven by the Web Audio analyser.
// Used in training MDX via the global MDX registry (no per-file import).
// Props: src (required), title (optional).

function fmt(t: number): string {
  if (!isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ src, title = "Listen to this lesson" }: { src: string; title?: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLSpanElement | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [docked, setDocked] = useState(false); // inline card has scrolled off-screen

  // Web Audio analyser (progressive enhancement — playback never depends on it)
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const wiredRef = useRef(false);
  const rafRef = useRef(0);

  const tick = useCallback(() => {
    const an = analyserRef.current;
    let level = 0;
    if (an) {
      const data = new Uint8Array(an.frequencyBinCount);
      an.getByteFrequencyData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) sum += data[i];
      level = Math.min(1, sum / data.length / 200);
    }
    const g = glowRef.current;
    if (g) {
      g.style.transform = `scale(${(1 + level * 0.7).toFixed(3)})`;
      g.style.opacity = (0.45 + level * 0.55).toFixed(3);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const wireAnalyser = useCallback(() => {
    if (wiredRef.current || !ref.current) return;
    try {
      const AC: typeof AudioContext =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const source = ctx.createMediaElementSource(ref.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      wiredRef.current = true;
    } catch {
      wiredRef.current = true; // don't retry; fall back to plain playback
    }
  }, []);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onMeta = () => {
      setDuration(a.duration || 0);
      setReady(true);
    };
    const onTime = () => setCurrent(a.currentTime);
    const onEnd = () => {
      setPlaying(false);
      setCurrent(0);
    };
    const onPlaying = () => {
      setPlaying(true);
      setLoading(false);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    const onPause = () => {
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
      if (glowRef.current) {
        glowRef.current.style.transform = "scale(1)";
        glowRef.current.style.opacity = "0.45";
      }
    };
    const onWaiting = () => setLoading(true);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("playing", onPlaying);
    a.addEventListener("pause", onPause);
    a.addEventListener("waiting", onWaiting);
    return () => {
      cancelAnimationFrame(rafRef.current);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("playing", onPlaying);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("waiting", onWaiting);
    };
  }, [tick]);

  // Dock the orb when the inline card leaves the viewport.
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setDocked(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = useCallback(async () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      wireAnalyser();
      if (ctxRef.current?.state === "suspended") {
        try { await ctxRef.current.resume(); } catch { /* ignore */ }
      }
      setLoading(true);
      try { await a.play(); } catch { setLoading(false); }
    } else {
      a.pause();
    }
  }, [wireAnalyser]);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const a = ref.current;
      if (!a || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      a.currentTime = ratio * duration;
      setCurrent(ratio * duration);
    },
    [duration],
  );

  const pct = duration ? (current / duration) * 100 : 0;
  const ringCirc = 2 * Math.PI * 26; // r=26 progress ring on the orb

  return (
    <>
      <audio ref={ref} src={src} preload="metadata" />

      {/* ---- Inline hero card ---- */}
      <div
        ref={cardRef}
        className="not-prose my-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50/70 to-white p-3 pr-5 shadow-sm"
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause narration" : "Play narration"}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/30 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : playing ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Headphones className="h-3.5 w-3.5 text-blue-600" />
            <span className="truncate text-xs font-semibold uppercase tracking-wide text-slate-500">
              {title}
            </span>
            {/* live equalizer */}
            <span className={`anc-eq ${playing ? "is-on" : ""}`} aria-hidden>
              <i /><i /><i /><i />
            </span>
          </div>
          <div
            className="mt-2 flex items-center gap-3"
            onClick={seek}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.max(0, Math.floor(duration))}
            aria-valuenow={Math.floor(current)}
            tabIndex={0}
          >
            <span className="w-9 shrink-0 text-right text-[11px] tabular-nums text-slate-400">
              {fmt(current)}
            </span>
            <div className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-slate-200">
              <div className="absolute left-0 top-0 h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-9 shrink-0 text-[11px] tabular-nums text-slate-400">
              {ready ? fmt(duration) : "—:—"}
            </span>
          </div>
        </div>
      </div>

      {/* ---- Floating orb (follows you when the card is off-screen) ---- */}
      {docked && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause narration" : "Play narration"}
          className="anc-orb group fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full text-white"
        >
          {/* audio-reactive glow */}
          <span
            ref={glowRef}
            aria-hidden
            className="absolute inset-0 rounded-full bg-blue-500 blur-md"
            style={{ opacity: 0.45 }}
          />
          {/* pulsing rings while playing */}
          {playing && (
            <>
              <span aria-hidden className="anc-ring" />
              <span aria-hidden className="anc-ring anc-ring-2" />
            </>
          )}
          {/* progress ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64" aria-hidden>
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
            <circle
              cx="32" cy="32" r="26" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={ringCirc} strokeDashoffset={ringCirc * (1 - pct / 100)}
              style={{ transition: "stroke-dashoffset .2s linear" }}
            />
          </svg>
          {/* core */}
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-900/30">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : playing ? (
              <Pause className="h-5 w-5" fill="currentColor" />
            ) : (
              <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
            )}
          </span>
        </button>
      )}

      <style>{`
        .anc-eq { display:inline-flex; align-items:flex-end; gap:2px; height:12px; margin-left:2px; }
        .anc-eq i { width:2px; height:20%; background:#2563eb; border-radius:1px; opacity:.5; }
        .anc-eq.is-on i { animation: ancBar .9s ease-in-out infinite; opacity:1; }
        .anc-eq.is-on i:nth-child(2){ animation-delay:.15s }
        .anc-eq.is-on i:nth-child(3){ animation-delay:.30s }
        .anc-eq.is-on i:nth-child(4){ animation-delay:.45s }
        @keyframes ancBar { 0%,100%{ height:20% } 50%{ height:100% } }
        .anc-orb { animation: ancFloatIn .35s cubic-bezier(.2,.8,.2,1.2) both; }
        @keyframes ancFloatIn { from{ opacity:0; transform: translateY(14px) scale(.7) } to{ opacity:1; transform:none } }
        .anc-ring { position:absolute; inset:0; border-radius:9999px; border:2px solid rgba(37,99,235,.55); animation: ancRing 1.8s ease-out infinite; }
        .anc-ring-2 { animation-delay:.9s }
        @keyframes ancRing { 0%{ transform:scale(.7); opacity:.7 } 100%{ transform:scale(1.9); opacity:0 } }
        @media (prefers-reduced-motion: reduce) {
          .anc-eq.is-on i, .anc-orb, .anc-ring { animation: none !important; }
        }
      `}</style>
    </>
  );
}

export default AudioPlayer;
