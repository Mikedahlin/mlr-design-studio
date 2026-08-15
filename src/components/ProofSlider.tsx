"use client";

import { useRef, useState, useCallback } from "react";

const projects = [
  {
    label: "majesticpinerenovations.com",
    url: "https://majesticpinerenovations.com",
  },
  {
    label: "tedbuselmeierlaw.com",
    url: "https://tedbuselmeierlaw.com",
  },
];

const codeSnippet = `import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { LeadForm } from "@/components/ui/LeadForm";
import { buildMetadata, PAGE_META } from "@/lib/metadata";
import { CORE_SERVICES } from "@/lib/services";

export const metadata: Metadata =
  buildMetadata(PAGE_META.home);

// real excerpt — majesticpinerenovations.com`;

export default function ProofSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [liveLoaded, setLiveLoaded] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const startDrag = () => {
    setDragging(true);
    setLiveLoaded(true);
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/5] md:aspect-square bg-[#0a0a0a] border border-border select-none overflow-hidden"
        onMouseMove={(e) => dragging && updateFromClientX(e.clientX)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
      >
        {/* Code panel (left / base layer) */}
        <div className="absolute inset-0 p-5 md:p-6 overflow-hidden">
          <p className="mono-label text-[10px] text-primary mb-4">code.tsx</p>
          <pre className="font-mono text-[10px] md:text-[11px] leading-relaxed text-[#d4d1c9] whitespace-pre-wrap">
            {codeSnippet}
          </pre>
        </div>

        {/* Live site panel (right, clipped by slider position) — real embedded client site */}
        <div
          className="absolute inset-0 bg-background overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <div className="absolute top-0 inset-x-0 z-10 p-3 bg-background border-b border-border">
            <p className="mono-label text-[10px] text-primary">
              live · {projects[activeProject].label}
            </p>
          </div>
          {liveLoaded && (
            <iframe
              key={projects[activeProject].url}
              src={projects[activeProject].url}
              title={projects[activeProject].label}
              loading="lazy"
              className="pointer-events-none border-0"
              style={{
                width: "1280px",
                height: "1600px",
                transform: "scale(0.36)",
                transformOrigin: "top left",
                marginTop: "36px",
              }}
            />
          )}
        </div>

        {/* Load prompt — full-container overlay, NOT inside the clipped live panel,
            so it's clickable across the whole slider regardless of handle position */}
        {!liveLoaded && (
          <button
            onClick={() => setLiveLoaded(true)}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 mono-label text-[11px] text-text-muted hover:text-primary transition-colors cursor-pointer bg-transparent"
          >
            <span className="text-2xl">↔</span>
            <span>drag or click to load live site</span>
          </button>
        )}

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-primary cursor-ew-resize"
          style={{ left: `${position}%` }}
          onMouseDown={startDrag}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-[#333333] border border-primary flex items-center justify-center cursor-ew-resize"
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            onTouchEnd={() => setDragging(false)}
          >
            <span className="text-primary mono-label text-[10px]">↔</span>
          </div>
        </div>
      </div>

      {/* Project switcher */}
      <div className="flex gap-2 mt-3">
        {projects.map((project, index) => (
          <button
            key={project.url}
            onClick={() => {
              setActiveProject(index);
              setLiveLoaded(true);
            }}
            className={`mono-label text-[10px] px-3 py-1.5 border transition-colors ${
              activeProject === index
                ? "border-primary text-primary"
                : "border-border text-text-muted hover:text-text"
            }`}
          >
            {project.label}
          </button>
        ))}
      </div>
    </div>
  );
}
