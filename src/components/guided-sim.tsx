"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, RotateCcw, CheckCircle2, Sparkles, GripVertical } from "lucide-react";

// GuidedSim — a voice-guided, hands-on CRM onboarding.
// A SAFE simulated CRM (not the live system) where the learner actually performs
// each task — drag a deal to the next stage, open it, then do it again by asking.
// Voice narrates each step; a spotlight highlights exactly what to touch; a ✅ confirms.
// Drop into MDX as <GuidedSim /> (uses the built-in pipeline flow by default).

type Card = { id: string; name: string; sub: string; value: string; col: string };
type StepKind = "drag" | "click" | "type";
type Step = {
  id: string;
  kind: StepKind;
  say: string; // instruction (also the voice script)
  voice?: string; // audio src
  done: string; // success line
  targets: string[]; // data-sim ids to spotlight
  cardId?: string;
  toCol?: string; // drag
  clickTarget?: string; // click
  expect?: string; // type (substring, lowercased)
};

const COLS = [
  { id: "prospecting", name: "Prospecting" },
  { id: "proposal", name: "Proposal" },
  { id: "negotiation", name: "Negotiation" },
  { id: "won", name: "Won" },
];

const INITIAL: Card[] = [
  { id: "dodgers", name: "LA Dodgers", sub: "Stadium LED — main board", value: "$2.4M", col: "prospecting" },
  { id: "yankees", name: "NY Yankees", sub: "Ribbon board upgrade", value: "$1.1M", col: "proposal" },
  { id: "lakers", name: "LA Lakers", sub: "Courtside tables", value: "$880K", col: "prospecting" },
];

const STEPS: Step[] = [
  {
    id: "s1", kind: "drag", cardId: "dodgers", toCol: "proposal",
    say: "This is your pipeline — every card is a deal, and the columns are the stages. Let's move one. Drag the Dodgers deal from Prospecting into Proposal.",
    voice: "/audio/onboarding/step-1.mp3",
    targets: ["card-dodgers", "col-proposal"],
    done: "Nice — that's exactly how you advance a deal. Just drag it to the next stage.",
  },
  {
    id: "s2", kind: "click", clickTarget: "card-dodgers",
    say: "Now open it. Click the Dodgers card to see the full deal — every field in one place.",
    voice: "/audio/onboarding/step-2.mp3",
    targets: ["card-dodgers"],
    done: "That's the deal page. Everything about the opportunity lives right here.",
  },
  {
    id: "s3", kind: "type", expect: "won",
    say: "Here's the magic part. Instead of clicking, just ask. In the assistant box at the bottom, type: move this deal to won.",
    voice: "/audio/onboarding/step-3.mp3",
    targets: ["ask"],
    done: "That's the whole idea — anything you can click, you can also just ask for in plain English.",
  },
];

export function GuidedSim() {
  const [cards, setCards] = useState<Card[]>(INITIAL);
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<"doing" | "done" | "finished">("doing");
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null); // tap-to-move fallback
  const [ask, setAsk] = useState("");
  const [voicePlaying, setVoicePlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const step = STEPS[stepIdx];
  const isTarget = (id: string) => phase === "doing" && step?.targets.includes(id);

  const playVoice = useCallback(() => {
    const a = audioRef.current;
    if (!a || !step?.voice) return;
    try {
      a.src = step.voice;
      a.currentTime = 0;
      void a.play().catch(() => {});
    } catch {}
  }, [step]);

  // auto-play the voice when a new step begins
  useEffect(() => {
    if (phase === "doing") playVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const on = () => setVoicePlaying(true);
    const off = () => setVoicePlaying(false);
    a.addEventListener("play", on);
    a.addEventListener("pause", off);
    a.addEventListener("ended", off);
    return () => { a.removeEventListener("play", on); a.removeEventListener("pause", off); a.removeEventListener("ended", off); };
  }, []);

  const complete = useCallback(() => {
    setPhase("done");
    setPicked(null);
    window.setTimeout(() => {
      if (stepIdx + 1 >= STEPS.length) setPhase("finished");
      else { setStepIdx((i) => i + 1); setPhase("doing"); }
    }, 1700);
  }, [stepIdx]);

  const moveCard = (cardId: string, col: string) => setCards((cs) => cs.map((c) => (c.id === cardId ? { ...c, col } : c)));

  const onDropCol = (colId: string) => {
    if (phase !== "doing" || !picked && !draggingRef.current) return;
    const cardId = draggingRef.current || picked;
    if (!cardId) return;
    moveCard(cardId, colId);
    draggingRef.current = null;
    if (step.kind === "drag" && cardId === step.cardId && colId === step.toCol) complete();
    else setPicked(null);
  };

  const draggingRef = useRef<string | null>(null);

  const onCardClick = (cardId: string) => {
    if (phase !== "doing") return;
    if (step.kind === "click" && step.clickTarget === `card-${cardId}`) { setOpenCard(cardId); complete(); return; }
    if (step.kind === "drag" && cardId === step.cardId) setPicked((p) => (p === cardId ? null : cardId)); // tap-to-move
  };

  const onColClick = (colId: string) => {
    if (phase === "doing" && step.kind === "drag" && picked) onDropCol(colId);
  };

  const submitAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "doing" || step.kind !== "type") return;
    if (ask.trim().toLowerCase().includes(step.expect || "✗")) {
      moveCard("dodgers", "won");
      setOpenCard(null);
      setAsk("");
      complete();
    }
  };

  const reset = () => {
    setCards(INITIAL); setStepIdx(0); setPhase("doing"); setOpenCard(null); setPicked(null); setAsk("");
  };

  const openCardData = cards.find((c) => c.id === openCard);

  return (
    <div className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-900/5">
      <audio ref={audioRef} preload="none" />

      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 rounded bg-white px-2 py-0.5 text-[10px] font-medium text-slate-400">the CRM · practice mode</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600">
          <Sparkles className="h-3 w-3" /> Guided
        </span>
      </div>

      {/* coach bar */}
      {phase !== "finished" && (
        <div className="flex items-center gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white px-4 py-3">
          <button
            type="button"
            onClick={playVoice}
            aria-label="Play the instruction"
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 ${voicePlaying ? "sim-speaking" : ""}`}
          >
            <Volume2 className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wide text-blue-500">
              Step {stepIdx + 1} of {STEPS.length}
            </div>
            <p className="mt-0.5 text-sm font-medium leading-snug text-slate-700">
              {phase === "done" ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> {step.done}
                </span>
              ) : (
                step.say
              )}
            </p>
          </div>
        </div>
      )}

      {/* board */}
      <div className="relative bg-slate-50 p-3">
        {phase === "finished" ? (
          <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
            <div className="sim-pop flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">You just worked a deal — two ways.</h4>
            <p className="max-w-sm text-sm text-slate-600">
              You moved it by dragging, and again just by asking. That's the whole job. Everything else in the CRM works the same way.
            </p>
            <button onClick={reset} className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
              <RotateCcw className="h-4 w-4" /> Try it again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {COLS.map((col) => (
              <div
                key={col.id}
                data-sim={`col-${col.id}`}
                onDragOver={(e) => { if (step?.kind === "drag") e.preventDefault(); }}
                onDrop={() => onDropCol(col.id)}
                onClick={() => onColClick(col.id)}
                className={`flex min-h-[150px] flex-col rounded-xl border p-2 transition ${
                  isTarget(`col-${col.id}`) ? "sim-glow border-blue-400 bg-blue-50/60" : "border-slate-200 bg-white"
                } ${picked && step?.kind === "drag" ? "cursor-pointer" : ""}`}
              >
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{col.name}</span>
                  <span className="text-[11px] font-semibold text-slate-300">{cards.filter((c) => c.col === col.id).length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {cards.filter((c) => c.col === col.id).map((c) => (
                    <div
                      key={c.id}
                      data-sim={`card-${c.id}`}
                      draggable={step?.kind === "drag"}
                      onDragStart={() => { draggingRef.current = c.id; }}
                      onClick={(e) => { e.stopPropagation(); onCardClick(c.id); }}
                      className={`group cursor-pointer rounded-lg border bg-white p-2.5 shadow-sm transition ${
                        isTarget(`card-${c.id}`) ? "sim-glow border-blue-400 ring-2 ring-blue-300" : "border-slate-200 hover:border-slate-300"
                      } ${picked === c.id ? "ring-2 ring-blue-400" : ""}`}
                    >
                      <div className="flex items-start gap-1.5">
                        <GripVertical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 group-hover:text-slate-400" />
                        <div className="min-w-0">
                          <div className="truncate text-[13px] font-bold text-slate-800">{c.name}</div>
                          <div className="truncate text-[11px] text-slate-500">{c.sub}</div>
                          <div className="mt-1 text-[11px] font-semibold text-emerald-600">{c.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* record slide-over */}
        {openCardData && phase !== "finished" && (
          <div className="sim-slide absolute inset-y-0 right-0 w-64 border-l border-slate-200 bg-white p-4 shadow-xl">
            <div className="text-sm font-extrabold text-slate-900">{openCardData.name}</div>
            <div className="text-[11px] text-slate-500">{openCardData.sub}</div>
            <dl className="mt-3 space-y-2 text-[12px]">
              {[["Stage", COLS.find((c) => c.id === openCardData.col)?.name], ["Value", openCardData.value], ["Owner", "You"], ["Close date", "Next month"]].map(([k, v]) => (
                <div key={k as string} className="flex justify-between border-b border-slate-100 pb-1.5">
                  <dt className="text-slate-400">{k}</dt>
                  <dd className="font-semibold text-slate-700">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {/* ask bar */}
      {phase !== "finished" && (
        <form onSubmit={submitAsk} data-sim="ask" className={`flex items-center gap-2 border-t bg-white px-3 py-2.5 ${isTarget("ask") ? "sim-glow border-blue-400 bg-blue-50/40" : "border-slate-200"}`}>
          <Sparkles className={`h-4 w-4 shrink-0 ${isTarget("ask") ? "text-blue-600" : "text-slate-400"}`} />
          <input
            value={ask}
            onChange={(e) => setAsk(e.target.value)}
            placeholder="Ask the assistant…  (try: move this deal to won)"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          <button type="submit" className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700">
            Ask
          </button>
        </form>
      )}

      <style>{`
        .sim-glow { animation: simGlow 1.4s ease-in-out infinite; }
        @keyframes simGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(37,99,235,0) } 50%{ box-shadow:0 0 0 4px rgba(37,99,235,.18) } }
        .sim-speaking::after { content:""; position:absolute; inset:-4px; border-radius:9999px; border:2px solid rgba(37,99,235,.5); animation:simRing 1.2s ease-out infinite; }
        @keyframes simRing { 0%{ transform:scale(.8); opacity:.7 } 100%{ transform:scale(1.5); opacity:0 } }
        .sim-pop { animation: simPop .5s cubic-bezier(.2,.8,.2,1.4) both; }
        @keyframes simPop { from{ transform:scale(0); opacity:0 } to{ transform:scale(1); opacity:1 } }
        .sim-slide { animation: simSlide .3s ease-out both; }
        @keyframes simSlide { from{ transform:translateX(100%) } to{ transform:none } }
        @media (prefers-reduced-motion: reduce) { .sim-glow,.sim-speaking::after,.sim-pop,.sim-slide { animation:none !important; } }
      `}</style>
    </div>
  );
}

export default GuidedSim;
