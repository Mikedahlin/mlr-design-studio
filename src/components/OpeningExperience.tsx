"use client";

import { useEffect, useState, type PointerEvent } from "react";
import dynamic from "next/dynamic";
import AuroraCanvas from "./AuroraCanvas";
import ModelSitesStack from "./ModelSitesStack";
import "./HomeExperience.css";

const GlassHouses = dynamic(() => import("./GlassHouses").then((m) => m.default), {
  ssr: false,
});

type Phase = "idle" | "charging" | "open";

export default function OpeningExperience() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [openSite, setOpenSite] = useState<number | null>(null);

  useEffect(() => {
    if (phase === "charging") {
      const t = window.setTimeout(() => setPhase("open"), 500);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  const start = () => {
    if (phase !== "idle") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("open");
      return;
    }

    setPhase("charging");
  };

  const moveLight = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <main
      className={`opening-experience opening-experience--${phase}`}
      onPointerMove={moveLight}
    >
      <AuroraCanvas />
      <div className="opening-experience__darkness" aria-hidden="true" />
      <div className="opening-experience__cursor-light" aria-hidden="true" />
      <div className="opening-experience__grain" aria-hidden="true" />

      <section className="opening-experience__start" aria-label="Opening experience">
        <button type="button" onClick={start} className="opening-experience__play">
          PRESS PLAY
        </button>
      </section>

      {phase === "open" && (
        <section className="opening-experience__reveal" aria-label="MLR Assets Creative Studio">
          <div className="opening-experience__brand">MLR / CREATIVE STUDIO</div>
          <GlassHouses onSelectSite={setOpenSite} />
          <ModelSitesStack
            openIndex={openSite}
            onRequestOpen={setOpenSite}
            onClose={() => setOpenSite(null)}
          />
        </section>
      )}
    </main>
  );
}
