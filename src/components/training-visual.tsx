"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  GitBranch,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Route,
  Sparkles,
  Target,
  Users,
  XCircle,
} from "lucide-react";

type Accent = "crm" | "proposals" | "services" | "leadership" | "connected";

const accents: Record<Accent, { line: string; soft: string; text: string; icon: string; chip: string }> = {
  crm: {
    line: "border-l-emerald-500",
    soft: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-900 dark:text-emerald-200",
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
    chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
  },
  proposals: {
    line: "border-l-blue-500",
    soft: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-900 dark:text-blue-200",
    icon: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
    chip: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200",
  },
  services: {
    line: "border-l-orange-500",
    soft: "bg-orange-50 dark:bg-orange-950/40",
    text: "text-orange-900 dark:text-orange-200",
    icon: "bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-300",
    chip: "bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200",
  },
  leadership: {
    line: "border-l-slate-600 dark:border-l-slate-400",
    soft: "bg-slate-100 dark:bg-slate-800/60",
    text: "text-slate-900 dark:text-slate-200",
    icon: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
    chip: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  },
  connected: {
    line: "border-l-violet-500",
    soft: "bg-violet-50 dark:bg-violet-950/40",
    text: "text-violet-900 dark:text-violet-200",
    icon: "bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300",
    chip: "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200",
  },
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const shell = "not-prose my-6 rounded-lg border border-fd-border bg-fd-card p-4 shadow-sm border-l-4";
const heading = "text-sm font-semibold text-fd-foreground";
const bodyText = "text-sm leading-6 text-fd-muted-foreground";
const cell = "rounded-md border border-fd-border bg-fd-secondary/50 p-3";

function Header({ icon, title, tone }: { icon: React.ReactNode; title: string; tone: (typeof accents)[Accent] }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className={cx("rounded-md p-1.5", tone.icon)}>{icon}</span>
      <h3 className={heading}>{title}</h3>
    </div>
  );
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
    <section className={cx(shell, tone.line)}>
      <Header icon={<Route className="h-4 w-4" />} title={title} tone={tone} />
      <ol className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step} className={cx("relative", cell)}>
            <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-fd-background text-xs font-bold text-fd-foreground shadow-sm ring-1 ring-fd-border">
              {index + 1}
            </div>
            <p className={bodyText}>{step}</p>
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
    <section className={cx(shell, tone.line)}>
      <Header icon={<GitBranch className="h-4 w-4" />} title={title} tone={tone} />
      <div className="grid gap-3 md:grid-cols-2">
        {branches.map((branch) => (
          <div key={`${branch.if}-${branch.then}`} className={cx("rounded-md border border-fd-border p-3", tone.soft)}>
            <p className={cx("text-xs font-bold uppercase tracking-wide", tone.text)}>If</p>
            <p className="mt-1 text-sm text-fd-foreground">{branch.if}</p>
            <p className={cx("mt-3 text-xs font-bold uppercase tracking-wide", tone.text)}>Then</p>
            <p className="mt-1 text-sm text-fd-foreground">{branch.then}</p>
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
    <section className={cx(shell, tone.line)}>
      <Header icon={<ListChecks className="h-4 w-4" />} title={title} tone={tone} />
      <ul className="grid gap-2 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className={cx("flex gap-2", cell, "text-sm leading-6 text-fd-muted-foreground")}>
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
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
    <section className={cx(shell, tone.line)}>
      <Header icon={<Target className="h-4 w-4" />} title={title} tone={tone} />
      <div className="grid gap-3 md:grid-cols-3">
        <div className={cell}>
          <p className="text-xs font-bold uppercase tracking-wide text-fd-muted-foreground">Situation</p>
          <p className={cx("mt-2", bodyText)}>{situation}</p>
        </div>
        <div className={cell}>
          <p className="text-xs font-bold uppercase tracking-wide text-fd-muted-foreground">Goal</p>
          <p className={cx("mt-2", bodyText)}>{goal}</p>
        </div>
        <div className={cx("rounded-md border border-fd-border p-3", tone.soft)}>
          <p className={cx("text-xs font-bold uppercase tracking-wide", tone.text)}>Proof</p>
          <p className="mt-2 text-sm leading-6 text-fd-foreground">{proof}</p>
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
  const [copied, setCopied] = useState(false);
  return (
    <section className={cx(shell, tone.line)}>
      <Header icon={<MessageSquareText className="h-4 w-4" />} title={title} tone={tone} />
      <div className="flex items-start gap-2 rounded-md bg-slate-950 p-3 text-sm leading-6 text-white dark:bg-slate-900 dark:ring-1 dark:ring-slate-700">
        <span className="flex-1 font-mono text-[13px]">{prompt}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="shrink-0 rounded bg-white/10 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/20"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </section>
  );
}

export function LessonMeta({
  time,
  audience,
  level,
  accent = "crm",
}: {
  time: string;
  audience: string;
  level?: "Starter" | "Core" | "Advanced";
  accent?: Accent;
}) {
  const tone = accents[accent];
  return (
    <div className="not-prose my-4 flex flex-wrap items-center gap-2">
      <span className={cx("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", tone.chip)}>
        <Clock3 className="h-3.5 w-3.5" /> {time}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-fd-secondary px-3 py-1 text-xs font-semibold text-fd-secondary-foreground">
        <Users className="h-3.5 w-3.5" /> {audience}
      </span>
      {level && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-fd-secondary px-3 py-1 text-xs font-semibold text-fd-secondary-foreground">
          <GraduationCap className="h-3.5 w-3.5" /> {level}
        </span>
      )}
    </div>
  );
}

export function KeyTakeaways({
  items,
  title = "Key takeaways",
  accent = "connected",
}: {
  items: string[];
  title?: string;
  accent?: Accent;
}) {
  const tone = accents[accent];
  return (
    <section className={cx(shell, tone.line)}>
      <Header icon={<Lightbulb className="h-4 w-4" />} title={title} tone={tone} />
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-fd-foreground">
            <Sparkles className={cx("mt-1 h-3.5 w-3.5 shrink-0", tone.text)} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function KnowledgeCheck({
  question,
  options,
  answer,
  explanation,
  accent = "crm",
}: {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  accent?: Accent;
}) {
  const tone = accents[accent];
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <section className={cx(shell, tone.line)}>
      <Header icon={<HelpCircle className="h-4 w-4" />} title="Check yourself" tone={tone} />
      <p className="mb-3 text-sm font-medium leading-6 text-fd-foreground">{question}</p>
      <div className="grid gap-2">
        {options.map((option, index) => {
          const isPicked = picked === index;
          const isAnswer = index === answer;
          const revealed = picked !== null;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setPicked(index)}
              className={cx(
                "flex items-start gap-2 rounded-md border p-3 text-left text-sm leading-6 transition",
                !revealed && "border-fd-border bg-fd-secondary/50 text-fd-foreground hover:border-fd-primary/50",
                revealed && isAnswer && "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
                revealed && isPicked && !isAnswer && "border-red-400 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200",
                revealed && !isPicked && !isAnswer && "border-fd-border bg-fd-secondary/30 text-fd-muted-foreground",
              )}
            >
              {revealed && isAnswer ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : revealed && isPicked ? (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              ) : (
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-fd-border text-[10px] font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
              )}
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className={cx("mt-3 rounded-md p-3 text-sm leading-6", tone.soft, "text-fd-foreground")}>
          {picked === answer ? "Correct. " : "Not quite. "}
          {explanation}
        </p>
      )}
    </section>
  );
}
