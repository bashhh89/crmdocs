"use client";

import { CheckCircle2, GitBranch, ListChecks, MessageSquareText, Route, Target } from "lucide-react";

type Accent = "crm" | "proposals" | "services" | "leadership" | "connected";

const accents: Record<Accent, { line: string; soft: string; text: string; icon: string }> = {
  crm: {
    line: "border-emerald-500",
    soft: "bg-emerald-50",
    text: "text-emerald-900",
    icon: "bg-emerald-100 text-emerald-700",
  },
  proposals: {
    line: "border-blue-500",
    soft: "bg-blue-50",
    text: "text-blue-900",
    icon: "bg-blue-100 text-blue-700",
  },
  services: {
    line: "border-orange-500",
    soft: "bg-orange-50",
    text: "text-orange-900",
    icon: "bg-orange-100 text-orange-700",
  },
  leadership: {
    line: "border-slate-700",
    soft: "bg-slate-50",
    text: "text-slate-900",
    icon: "bg-slate-200 text-slate-800",
  },
  connected: {
    line: "border-violet-500",
    soft: "bg-violet-50",
    text: "text-violet-900",
    icon: "bg-violet-100 text-violet-700",
  },
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function WorkflowMap({
  title,
  steps,
  accent = "crm",
}: {
  title: string;
  steps: string[];
  accent?: Accent;
}) {
  const tone = accents[accent];
  return (
    <section className={cx("not-prose my-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm", tone.line, "border-l-4")}>
      <div className="mb-4 flex items-center gap-2">
        <span className={cx("rounded-md p-1.5", tone.icon)}>
          <Route className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      </div>
      <ol className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step} className="relative rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 shadow-sm">
              {index + 1}
            </div>
            <p className="text-sm leading-6 text-slate-700">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function DecisionTree({
  title,
  branches,
  accent = "connected",
}: {
  title: string;
  branches: Array<{ if: string; then: string }>;
  accent?: Accent;
}) {
  const tone = accents[accent];
  return (
    <section className={cx("not-prose my-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm", tone.line, "border-l-4")}>
      <div className="mb-4 flex items-center gap-2">
        <span className={cx("rounded-md p-1.5", tone.icon)}>
          <GitBranch className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {branches.map((branch) => (
          <div key={`${branch.if}-${branch.then}`} className={cx("rounded-md border border-slate-200 p-3", tone.soft)}>
            <p className={cx("text-xs font-bold uppercase tracking-wide", tone.text)}>If</p>
            <p className="mt-1 text-sm text-slate-800">{branch.if}</p>
            <p className={cx("mt-3 text-xs font-bold uppercase tracking-wide", tone.text)}>Then</p>
            <p className="mt-1 text-sm text-slate-800">{branch.then}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PracticeChecklist({
  title,
  items,
  accent = "crm",
}: {
  title: string;
  items: string[];
  accent?: Accent;
}) {
  const tone = accents[accent];
  return (
    <section className={cx("not-prose my-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm", tone.line, "border-l-4")}>
      <div className="mb-3 flex items-center gap-2">
        <span className={cx("rounded-md p-1.5", tone.icon)}>
          <ListChecks className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      </div>
      <ul className="grid gap-2 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ScenarioBoard({
  title,
  situation,
  goal,
  proof,
  accent = "connected",
}: {
  title: string;
  situation: string;
  goal: string;
  proof: string;
  accent?: Accent;
}) {
  const tone = accents[accent];
  return (
    <section className={cx("not-prose my-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm", tone.line, "border-l-4")}>
      <div className="mb-4 flex items-center gap-2">
        <span className={cx("rounded-md p-1.5", tone.icon)}>
          <Target className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-md border border-slate-200 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Situation</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{situation}</p>
        </div>
        <div className="rounded-md border border-slate-200 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Goal</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{goal}</p>
        </div>
        <div className={cx("rounded-md border border-slate-200 p-3", tone.soft)}>
          <p className={cx("text-xs font-bold uppercase tracking-wide", tone.text)}>Proof</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{proof}</p>
        </div>
      </div>
    </section>
  );
}

export function PromptCard({
  title = "Ask the assistant",
  prompt,
  accent = "crm",
}: {
  title?: string;
  prompt: string;
  accent?: Accent;
}) {
  const tone = accents[accent];
  return (
    <section className={cx("not-prose my-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm", tone.line, "border-l-4")}>
      <div className="mb-3 flex items-center gap-2">
        <span className={cx("rounded-md p-1.5", tone.icon)}>
          <MessageSquareText className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      </div>
      <div className="rounded-md bg-slate-950 p-3 text-sm leading-6 text-white">
        {prompt}
      </div>
    </section>
  );
}
