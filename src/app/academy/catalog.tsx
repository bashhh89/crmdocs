"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Compass, Cpu, Wrench, Megaphone, LineChart, ArrowRight, Headphones } from "lucide-react";

// ANC Academy — course-catalog. Premium sports-tech finish: deep-navy
// stadium-light hero with a floating product mock, per-track lucide icons,
// and live CRM screenshot thumbnails. Light body. Light-locked.
// Display font (--display) is injected by the server wrapper via next/font.

type Track = {
  key: string;
  tag: string;
  title: string;
  audience: string;
  desc: string;
  lessons: number;
  href: string;
  accent: string; // gradient for the top bar + icon tile
  icon: typeof Compass;
  shot: string; // CRM screenshot used as the card thumbnail
};

const TRACKS: Track[] = [
  {
    key: "core",
    tag: "Core",
    title: "Start Here — Core",
    audience: "Everyone",
    desc: "The foundation before your vertical: getting around, the daily basics, and how to just ask the assistant.",
    lessons: 3,
    href: "/docs/training/core",
    accent: "from-blue-500 to-blue-700",
    icon: Compass,
    shot: "/img/screenshots/crm/02-opportunities.png",
  },
  {
    key: "technology",
    tag: "Technology",
    title: "Technology",
    audience: "Technology team",
    desc: "Your pipeline, estimation and proposals, and the deals you run day to day.",
    lessons: 5,
    href: "/docs/training/technology",
    accent: "from-indigo-500 to-blue-700",
    icon: Cpu,
    shot: "/img/screenshots/crm/01-companies.png",
  },
  {
    key: "venue-services",
    tag: "Venue Services",
    title: "Venue Services",
    audience: "Venue Services team",
    desc: "Service tickets, the account view, and the workflow that keeps every venue covered.",
    lessons: 4,
    href: "/docs/training/venue-services",
    accent: "from-emerald-500 to-teal-700",
    icon: Wrench,
    shot: "/img/screenshots/crm/04-tasks.png",
  },
  {
    key: "media-sponsorship",
    tag: "Media & Sponsorship",
    title: "Media & Sponsorship",
    audience: "Media & Sponsorship team",
    desc: "Placements, Nielsen verification, sponsor contracts, and your dashboards.",
    lessons: 4,
    href: "/docs/training/media-sponsorship",
    accent: "from-violet-500 to-purple-700",
    icon: Megaphone,
    shot: "/img/screenshots/crm/03-people.png",
  },
  {
    key: "leadership",
    tag: "Leadership",
    title: "Leadership",
    audience: "Leadership",
    desc: "Cross-vertical dashboards, forecasts, win/loss, and one-line answers from the assistant.",
    lessons: 4,
    href: "/docs/training/leadership",
    accent: "from-amber-500 to-orange-600",
    icon: LineChart,
    shot: "/img/screenshots/crm/05-notes.png",
  },
];

const FILTERS = ["All", "Core", "Technology", "Venue Services", "Media & Sponsorship", "Leadership"];
const TOTAL_LESSONS = TRACKS.reduce((n, t) => n + t.lessons, 0);
export default function AcademyCatalog({ display }: { display: string }) {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? TRACKS : TRACKS.filter((t) => t.tag === filter);
  const displayStyle: React.CSSProperties = { fontFamily: display };

  return (
    <main className="relative min-h-screen bg-white text-slate-900" style={{ colorScheme: "light" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-black text-white shadow-sm">
              A
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white" style={displayStyle}>
              ANC <span className="font-medium text-slate-500">Academy</span>
            </span>
          </Link>
          <a
            href="https://crm.ancsports.net"
            className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/10"
          >
            Open the CRM →
          </a>
        </div>
      </header>

      {/* Hero — dark stadium-light */}
      <section className="relative overflow-hidden border-b border-white/5 bg-slate-950">
        {/* mesh */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60rem 32rem at 80% -20%, rgba(37,99,235,0.55), transparent 60%), radial-gradient(44rem 26rem at 6% 120%, rgba(99,102,241,0.35), transparent 60%), linear-gradient(180deg, #020617 0%, #0b1224 100%)",
          }}
        />
        {/* faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(42rem 30rem at 70% 8%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(42rem 30rem at 70% 8%, black, transparent 75%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          {/* Left: copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              ANC CRM Academy
            </span>
            <h1 className="mt-6 max-w-xl text-5xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl" style={displayStyle}>
              Get confident on the CRM —{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                fast.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-300">
              Short, friendly lessons built around how you actually work. Everyone starts with
              the basics, then learns their own track. If you can send a text, you can do this.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/training/core/orientation"
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Start with the basics
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://proposals.anc.com/training-intake"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10"
              >
                <Headphones className="h-4 w-4 text-blue-300" />
                Take the 2-minute intake
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-400">
              <span><span className="text-white">5</span> tracks</span>
              <span className="h-3 w-px bg-white/15" />
              <span><span className="text-white">{TOTAL_LESSONS}</span> lessons</span>
              <span className="h-3 w-px bg-white/15" />
              <span>self-paced</span>
              <span className="h-3 w-px bg-white/15" />
              <span>listen or read</span>
            </div>
          </div>

          {/* Right: floating product mock */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/20 blur-3xl" aria-hidden />
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-blue-950/50"
              style={{ transform: "perspective(1200px) rotateY(-9deg) rotateX(3deg)" }}
            >
              {/* window chrome */}
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-slate-800/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 hidden rounded bg-white/5 px-3 py-0.5 text-[11px] font-medium text-slate-400 sm:block">
                  crm.ancsports.net
                </span>
              </div>
              <Image
                src="/img/screenshots/crm/02-opportunities.png"
                alt="The CRM — Opportunities view"
                width={2880}
                height={1800}
                priority
                className="block h-auto w-full"
              />
            </div>
            {/* floating assistant chip */}
            <div
              className="absolute -bottom-5 -left-6 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/95 px-4 py-3 shadow-xl shadow-slate-950/40"
              style={{ transform: "rotate(2deg)" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                <Headphones className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-bold text-slate-900">Just ask the assistant</span>
                <span className="block text-[11px] text-slate-500">&ldquo;What&rsquo;s due this week?&rdquo;</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              { n: "01", t: "Take the 2-minute intake", d: "A quick chat tailors your training to your role — no wrong answers." },
              { n: "02", t: "Learn your track", d: "Start with Core, then your vertical. Short lessons, at your own pace." },
              { n: "03", t: "Forget something? Just ask", d: "The assistant is one click away — ask it anything, anytime." },
            ].map((s) => (
              <div key={s.n} className="flex flex-col items-start">
                <span className="text-2xl font-extrabold text-blue-700/90" style={displayStyle}>
                  {s.n}
                </span>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900" style={displayStyle}>
              Browse the tracks
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">Pick your team — or start with Core.</p>
          </div>
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.key}
                href={t.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/10"
              >
                {/* thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <div className={`absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r ${t.accent}`} />
                  <Image
                    src={t.shot}
                    alt={`${t.title} — CRM view`}
                    width={2880}
                    height={1800}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/0 to-slate-900/0" />
                  {/* icon tile */}
                  <div className="absolute left-4 top-5 z-10">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${t.accent} text-white shadow-lg ring-1 ring-white/20`}>
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                  </div>
                  {/* audience chip */}
                  <span className="absolute bottom-3 left-4 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
                    {t.audience}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-slate-900" style={displayStyle}>
                    {t.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t.desc}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {t.lessons} lessons
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition group-hover:gap-1.5">
                      Start <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-slate-50/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row">
          <span className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-blue-800 text-[11px] text-white">A</span>
            ANC
          </span>
          <span>© {new Date().getFullYear()} ANC Sports. CRM Academy.</span>
          <a href="https://proposals.anc.com/training-intake" className="font-medium text-blue-600 hover:text-blue-700">
            Take the intake →
          </a>
        </div>
      </footer>
    </main>
  );
}
