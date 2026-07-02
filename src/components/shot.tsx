"use client";

import { useState } from "react";
import { ZoomIn, X } from "lucide-react";

// Shot — a captioned, click-to-zoom screenshot for the training lessons.
// <Shot src="/img/..." caption="What you're looking at" />
export function Shot({ src, caption, alt }: { src: string; caption?: string; alt?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="not-prose my-6">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-xl border border-fd-border shadow-sm transition hover:shadow-md"
        aria-label="Enlarge screenshot"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || caption || "Screenshot"} className="block w-full" loading="lazy" />
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-slate-900/70 px-2 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" /> Click to enlarge
        </span>
      </button>
      {caption && <figcaption className="mt-2 text-center text-[13px] text-fd-muted-foreground">{caption}</figcaption>}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt || caption || "Screenshot"} className="max-h-[90vh] max-w-[95vw] rounded-lg shadow-2xl" />
        </div>
      )}
    </figure>
  );
}

export default Shot;
