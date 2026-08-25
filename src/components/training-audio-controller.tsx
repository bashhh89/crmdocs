"use client";

import { usePathname } from "next/navigation";
import { Pause, Play, Volume2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type TrainingAudio = {
  src: string;
  title: string;
};

const TRAINING_AUDIO: Record<string, TrainingAudio> = {
  "/docs/training": {
    src: "/audio/training/training-start-here.mp3",
    title: "ANC Training",
  },
  "/docs/training/choose-your-track": {
    src: "/audio/training/choose-your-track.mp3",
    title: "Choose Your Track",
  },
  "/docs/training/core": {
    src: "/audio/training/core-index.mp3",
    title: "Core Start Here",
  },
  "/docs/training/core/account-cleanup": {
    src: "/audio/training/core-account-cleanup.mp3",
    title: "Cleaning Up Accounts",
  },
  "/docs/training/core/account-info-for-bids": {
    src: "/audio/training/core-account-info-for-bids.mp3",
    title: "Pulling Account Info for Bids",
  },
  "/docs/training/core/asking-for-numbers": {
    src: "/audio/training/core-asking-for-numbers.mp3",
    title: "Asking the CRM for Numbers",
  },
  "/docs/training/core/daily-basics": {
    src: "/audio/training/core-daily-basics.mp3",
    title: "The Daily Basics",
  },
  "/docs/training/core/finding-anything": {
    src: "/audio/training/core-finding-anything.mp3",
    title: "Finding Anything Fast",
  },
  "/docs/training/core/meet-the-ai": {
    src: "/audio/training/core-meet-the-ai.mp3",
    title: "Meet the Assistant",
  },
  "/docs/training/core/orientation": {
    src: "/audio/training/core-orientation.mp3",
    title: "Getting Around",
  },
  "/docs/training/core/whats-new-june-2026": {
    src: "/audio/training/core-whats-new-june-2026.mp3",
    title: "What's New: June 2026",
  },
  "/docs/training/core/whats-possible": {
    src: "/audio/training/core-whats-possible.mp3",
    title: "What's Possible",
  },
  "/docs/training/core/working-standard": {
    src: "/audio/training/core-working-standard.mp3",
    title: "Working Standard",
  },
  "/docs/training/leadership": {
    src: "/audio/training/leadership-index.mp3",
    title: "Leadership",
  },
  "/docs/training/leadership/dashboards": {
    src: "/audio/training/leadership-dashboards.mp3",
    title: "The Dashboards",
  },
  "/docs/training/leadership/exporting-and-asking-the-assistant": {
    src: "/audio/training/leadership-exporting-and-asking-the-assistant.mp3",
    title: "Exporting and Asking",
  },
  "/docs/training/leadership/forecasting-and-pipeline": {
    src: "/audio/training/leadership-forecasting-and-pipeline.mp3",
    title: "Forecasting and Pipeline",
  },
  "/docs/training/leadership/win-loss": {
    src: "/audio/training/leadership-win-loss.mp3",
    title: "Win/Loss",
  },
  "/docs/training/media-sponsorship": {
    src: "/audio/training/media-sponsorship-index.mp3",
    title: "Media and Sponsorship",
  },
  "/docs/training/media-sponsorship/dashboards": {
    src: "/audio/training/media-sponsorship-dashboards.mp3",
    title: "Your Dashboards",
  },
  "/docs/training/media-sponsorship/nielsen-verification": {
    src: "/audio/training/media-sponsorship-nielsen-verification.mp3",
    title: "Nielsen Verification",
  },
  "/docs/training/media-sponsorship/placements": {
    src: "/audio/training/media-sponsorship-placements.mp3",
    title: "Placements",
  },
  "/docs/training/media-sponsorship/sponsor-contracts": {
    src: "/audio/training/media-sponsorship-sponsor-contracts.mp3",
    title: "Sponsor Contracts",
  },
  "/docs/training/technology": {
    src: "/audio/training/technology-index.mp3",
    title: "Sales / Technology",
  },
  "/docs/training/technology/estimation-and-proposals": {
    src: "/audio/training/technology-estimation-and-proposals.mp3",
    title: "Estimation and Proposals",
  },
  "/docs/training/technology/managing-your-deals": {
    src: "/audio/training/technology-managing-your-deals.mp3",
    title: "Managing Your Deals",
  },
  "/docs/training/technology/pipeline": {
    src: "/audio/training/technology-pipeline.mp3",
    title: "Your Pipeline",
  },
  "/docs/training/technology/proposals-and-due-dates": {
    src: "/audio/training/technology-proposals-and-due-dates.mp3",
    title: "Proposals and Due Dates",
  },
  "/docs/training/technology/your-dashboard": {
    src: "/audio/training/technology-your-dashboard.mp3",
    title: "Reading Your Dashboard",
  },
  "/docs/training/tracks/leadership": {
    src: "/audio/training/track-leadership.mp3",
    title: "Executive Summary",
  },
  "/docs/training/tracks/proposals": {
    src: "/audio/training/track-proposals.mp3",
    title: "Proposals and Estimation",
  },
  "/docs/training/tracks/sales-crm": {
    src: "/audio/training/track-sales-crm.mp3",
    title: "Sales and Account Management",
  },
  "/docs/training/tracks/services": {
    src: "/audio/training/track-services.mp3",
    title: "Services and Operations",
  },
  "/docs/training/venue-services": {
    src: "/audio/training/venue-services-index.mp3",
    title: "Services",
  },
  "/docs/training/venue-services/service-tickets": {
    src: "/audio/training/venue-services-service-tickets.mp3",
    title: "Service Tickets",
  },
  "/docs/training/venue-services/the-account-view": {
    src: "/audio/training/venue-services-the-account-view.mp3",
    title: "The Account View",
  },
  "/docs/training/venue-services/venue-activity": {
    src: "/audio/training/venue-services-venue-activity.mp3",
    title: "Venue Activity",
  },
  "/docs/training/venue-services/your-day-to-day": {
    src: "/audio/training/venue-services-your-day-to-day.mp3",
    title: "Your Day-to-Day",
  },
  "/docs/training/workflows/rfp-to-win": {
    src: "/audio/training/workflow-rfp-to-win.mp3",
    title: "RFP to Win Workflow",
  },
};

function normalizePath(value: string): string {
  const path = value.split("#")[0]?.split("?")[0] || "/";
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

function getTrainingAudio(pathname: string): TrainingAudio | null {
  return TRAINING_AUDIO[normalizePath(pathname)] ?? null;
}

export function TrainingAudioController() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldPlayAfterRouteRef = useRef(false);
  const [active, setActive] = useState<TrainingAudio | null>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const currentRouteAudio = useMemo(() => getTrainingAudio(pathname), [pathname]);

  const playAudio = useCallback(async (audio: TrainingAudio, restart = true) => {
    const el = audioRef.current;
    if (!el) return;

    setActive(audio);
    setVisible(true);
    if (el.getAttribute("src") !== audio.src) {
      el.src = audio.src;
    }
    if (restart) {
      el.currentTime = 0;
    }

    try {
      await el.play();
    } catch {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const syncPlaying = () => setPlaying(!el.paused);
    el.addEventListener("play", syncPlaying);
    el.addEventListener("playing", syncPlaying);
    el.addEventListener("pause", syncPlaying);
    el.addEventListener("ended", syncPlaying);
    return () => {
      el.removeEventListener("play", syncPlaying);
      el.removeEventListener("playing", syncPlaying);
      el.removeEventListener("pause", syncPlaying);
      el.removeEventListener("ended", syncPlaying);
    };
  }, []);

  useEffect(() => {
    const keepOneNarrationPlaying = (event: Event) => {
      const activeMedia = event.target;
      if (!(activeMedia instanceof HTMLAudioElement) && !(activeMedia instanceof HTMLVideoElement)) return;

      document.querySelectorAll<HTMLAudioElement | HTMLVideoElement>("audio, video").forEach((media) => {
        if (media !== activeMedia && !media.paused) media.pause();
      });
    };

    document.addEventListener("play", keepOneNarrationPlaying, true);
    return () => document.removeEventListener("play", keepOneNarrationPlaying, true);
  }, []);

  useEffect(() => {
    if (currentRouteAudio) {
      setActive((previous) => previous ?? currentRouteAudio);
      setVisible(true);
      if (shouldPlayAfterRouteRef.current) {
        const timer = window.setTimeout(() => {
          void playAudio(currentRouteAudio, false);
        }, 0);
        return () => window.clearTimeout(timer);
      }
      return;
    }

    shouldPlayAfterRouteRef.current = false;
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    setActive(null);
    setVisible(false);
  }, [currentRouteAudio]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;

      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      const audio = getTrainingAudio(url.pathname);
      if (!audio) return;

      shouldPlayAfterRouteRef.current = true;
      void playAudio(audio, true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [playAudio]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    const audio = active ?? currentRouteAudio;
    if (!el || !audio) return;
    if (el.paused) {
      void playAudio(audio, false);
    } else {
      el.pause();
    }
  }, [active, currentRouteAudio, playAudio]);

  const close = useCallback(() => {
    const el = audioRef.current;
    if (el) el.pause();
    setVisible(false);
  }, []);

  return (
    <>
      <audio ref={audioRef} preload="none" data-anc-training-audio-controller />
      {visible && active ? (
        <div className="fixed bottom-5 left-1/2 z-[70] w-[min(calc(100vw-24px),460px)] -translate-x-1/2 border border-blue-400/35 bg-slate-950/92 px-3 py-3 text-white shadow-[0_0_44px_rgba(10,82,239,.38)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a52ef] text-white shadow-[0_0_24px_rgba(10,82,239,.55)] transition hover:brightness-110"
              aria-label={playing ? "Pause CRM Training audio" : "Play CRM Training audio"}
            >
              {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="h-4 w-4 translate-x-px" fill="currentColor" />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.22em] text-[#9bbcff]">
                <Volume2 className="h-3.5 w-3.5" />
                CRM Training audio
              </div>
              <div className="truncate text-sm font-bold text-white">{active.title}</div>
            </div>
            <button
              type="button"
              onClick={close}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Close CRM Training audio"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
