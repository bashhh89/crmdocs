"use client";

import Link from "next/link";
import { useState } from "react";

// ANC Academy — course-catalog front door. White/blue ANC brand, light-locked.
// Tracks mirror content/docs/training/** (counts read from each meta.json).

type Track = {
  key: string;
  tag: string;
  title: string;
  audience: string;
  desc: string;
  lessons: number;
  href: string;
  accent: string; // gradient for the top bar + icon
  ring: string; // chip/active accent
};

const TRACKS: Track[] = [
  {
    key: "core",
    tag: "Core",
    title: "Start Here — Core",
    audience: "Everyone",
    desc: "The foundation everyone needs before their vertical: getting around, the daily basics, and how to just ask the assistant.",
    lessons: 3,
    href: "/docs/training/core",
    accent: "from-blue-500 to-blue-700",
    ring: "blue",
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
    ring: "indigo",
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
    ring: "emerald",
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
    ring: "violet",
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
    ring: "amber",
  },
];

const FILTERS = ["All", "Core", "Technology", "Venue Services", "Media & Sponsorship", "Leadership"];
const TOTAL_LESSONS = TRACKS.reduce((n, t) => n + t.lessons, 0);

export default function AcademyPage() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? TRACKS : TRACKS.filter((t) => t.tag === filter);

  return (
    <main className="min-h-screen bg-white text-slate-900" style={{ colorScheme: "light" }}>
      {/* Top bar */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-blue-700">
            anc <span className="font-medium text-slate-400">| Academy</span>
          </Link>
          <a
            href="https://crm.ancsports.net"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
          >
            Open the CRM →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50/80 via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(40rem 20rem at 70% -10%, rgba(37,99,235,0.18), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            ANC CRM Academy
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Get confident on the CRM — <span className="text-blue-700">fast.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Short, friendly lessons built around how you actually work. Everyone starts with the
            basics, then learns their own track. If you can send a text, you can do this.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/training/core/orientation"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start with the basics
            </Link>
            <a
              href="https://proposals.anc.com/training-intake"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              Take the 2-minute intake
            </a>
          </div>
          <p className="mt-6 text-sm font-medium text-slate-400">
            5 tracks · {TOTAL_LESSONS} lessons · learn at your own pace
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 sm:grid-cols-3">
          {[
            { n: "1", t: "Take the 2-minute intake", d: "A quick chat tailors your training to your role — no wrong answers." },
            { n: "2", t: "Learn your track", d: "Start with Core, then your vertical. Short lessons, at your own pace." },
            { n: "3", t: "Forget something? Just ask", d: "The assistant is one click away — ask it anything, anytime." },
          ].map((s) => (
            <div key={s.n} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Browse the tracks</h2>
            <p className="mt-1 text-sm text-slate-500">Pick your team — or start with Core.</p>
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
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
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
          {shown.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${t.accent}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${t.accent} text-base font-bold text-white shadow-sm`}
                  >
                    {t.title.charAt(0)}
                  </div>
                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                    {t.audience}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{t.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {t.lessons} lessons
                  </span>
                  <span className="text-sm font-semibold text-blue-600 transition group-hover:translate-x-0.5">
                    Start →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row">
          <span className="font-bold text-blue-700">anc</span>
          <span>© {new Date().getFullYear()} ANC Sports. CRM Academy.</span>
          <a href="https://proposals.anc.com/training-intake" className="font-medium text-blue-600 hover:text-blue-700">
            Take the intake →
          </a>
        </div>
      </footer>
    </main>
  );
}
