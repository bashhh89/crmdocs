"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Headphones, Loader2 } from "lucide-react";

// AudioPlayer — a warm, on-brand "listen to this lesson" control.
// Used in training MDX via the global MDX registry (no per-file import).
// Props: src (required), title (optional, default "Listen to this lesson").

function fmt(t: number): string {
  if (!isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ src, title = "Listen to this lesson" }: { src: string; title?: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

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
    };
    const onWaiting = () => setLoading(true);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("playing", onPlaying);
    a.addEventListener("waiting", onWaiting);
    return () => {
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("playing", onPlaying);
      a.removeEventListener("waiting", onWaiting);
    };
  }, []);

  const toggle = useCallback(() => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      setLoading(true);
      void a.play().catch(() => setLoading(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  }, []);

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

  return (
    <div className="not-prose my-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50/70 to-white p-3 pr-5 shadow-sm">
      <audio ref={ref} src={src} preload="metadata" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause narration" : "Play narration"}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/30 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
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
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-blue-600"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-9 shrink-0 text-[11px] tabular-nums text-slate-400">
            {ready ? fmt(duration) : "—:—"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;