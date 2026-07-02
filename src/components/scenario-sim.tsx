"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, AlertTriangle, XCircle, RotateCcw, Swords, Trophy } from "lucide-react";

// ScenarioSim — a branching "what would you do?" decision simulator for training pages.
// Config-driven from MDX. In-memory only (resets on reload), dark-mode aware.
//
// <ScenarioSim
//   title="The RFP just landed"
//   intro="It is 9 AM Monday..."
//   steps={[
//     { situation: "...", options: [
//       { label: "...", quality: "best", outcome: "..." },
//       { label: "...", quality: "ok", outcome: "..." },
//       { label: "...", quality: "bad", outcome: "..." },
//     ]},
//   ]}
// />

type Quality = "best" | "ok" | "bad";

type Option = { label: string; quality: Quality; outcome: string };
type Step = { situation: string; options: Option[] };

const qualityMeta: Record<Quality, { icon: typeof CheckCircle2; tone: string; label: string; points: number }> = {
  best: {
    icon: CheckCircle2,
    tone: "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
    label: "Strong call",
    points: 2,
  },
  ok: {
    icon: AlertTriangle,
    tone: "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    label: "Workable, but slower",
    points: 1,
  },
  bad: {
    icon: XCircle,
    tone: "border-red-400 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200",
    label: "This one costs you",
    points: 0,
  },
};

export function ScenarioSim({ title, intro, steps }: { title: string; intro: string; steps: Step[] }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const step = steps[stepIdx];
  const maxScore = steps.length * 2;

  const pick = (index: number) => {
    if (picked !== null) return;
    setPicked(index);
    setScore((s) => s + qualityMeta[step.options[index].quality].points);
  };

  const next = () => {
    if (stepIdx + 1 >= steps.length) setFinished(true);
    else {
      setStepIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const reset = () => {
    setStepIdx(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const verdict =
    score >= maxScore - 1
      ? "You run this workflow like you have done it for years. Records stay clean behind you."
      : score >= Math.ceil(maxScore * 0.6)
        ? "Solid instincts. Review the steps where you lost points — those are the habits that separate clean pipeline from cleanup work."
        : "Worth a re-run. Read the lesson above once more, then try again — the best answers all come straight from the working standard.";

  return (
    <section className="not-prose my-6 overflow-hidden rounded-lg border border-fd-border bg-fd-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-secondary/50 px-4 py-3">
        <span className="rounded-md bg-violet-100 p-1.5 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
          <Swords className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-fd-foreground">Decision drill: {title}</h3>
          <p className="text-xs text-fd-muted-foreground">Pick the move you would actually make. Score at the end.</p>
        </div>
        {!finished && (
          <span className="shrink-0 rounded-full bg-fd-secondary px-2.5 py-1 text-[11px] font-bold text-fd-secondary-foreground">
            {stepIdx + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="p-4">
        {finished ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
              <Trophy className="h-7 w-7" />
            </div>
            <p className="text-lg font-bold text-fd-foreground">
              {score} / {maxScore} points
            </p>
            <p className="max-w-md text-sm leading-6 text-fd-muted-foreground">{verdict}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-1 inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-secondary/50 px-4 py-2 text-sm font-semibold text-fd-foreground transition hover:border-violet-400"
            >
              <RotateCcw className="h-4 w-4" /> Run it again
            </button>
          </div>
        ) : (
          <>
            {stepIdx === 0 && picked === null && (
              <p className="mb-3 rounded-md bg-fd-secondary/50 p-3 text-sm italic leading-6 text-fd-muted-foreground">{intro}</p>
            )}
            <p className="mb-3 text-sm font-medium leading-6 text-fd-foreground">{step.situation}</p>
            <div className="grid gap-2">
              {step.options.map((option, index) => {
                const meta = qualityMeta[option.quality];
                const Icon = meta.icon;
                const revealed = picked !== null;
                const isPicked = picked === index;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => pick(index)}
                    disabled={revealed && !isPicked}
                    className={[
                      "rounded-md border p-3 text-left text-sm leading-6 transition",
                      !revealed && "border-fd-border bg-fd-secondary/40 text-fd-foreground hover:border-violet-400",
                      revealed && isPicked && `border-l-4 ${meta.tone}`,
                      revealed && !isPicked && "border-fd-border bg-fd-secondary/20 text-fd-muted-foreground opacity-60",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="flex items-start gap-2">
                      {revealed && isPicked ? (
                        <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                      ) : (
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-fd-border text-[10px] font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                      <span>
                        {option.label}
                        {revealed && isPicked && (
                          <span className="mt-2 block text-[13px] font-normal">
                            <span className="font-bold">{meta.label}.</span> {option.outcome}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  {stepIdx + 1 >= steps.length ? "See my score" : "Next situation"} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default ScenarioSim;
