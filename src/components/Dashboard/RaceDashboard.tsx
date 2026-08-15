"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PaddleShifters from "./PaddleShifters";
import Dash1957Overlay from "./Dash1957Overlay";
import Dash1967Overlay from "./Dash1967Overlay";
import Dash1988Overlay from "./Dash1988Overlay";
import Dash1997Overlay from "./Dash1997Overlay";
import Dash2027Overlay from "./Dash2027Overlay";

export const ERAS = ["1957", "1967", "1988", "1997", "2027"] as const;
export type Era = (typeof ERAS)[number];

const BACKGROUNDS: Record<Era, string> = {
  "1957": "/images/dashboards/dash_1957.png",
  "1967": "/images/dashboards/dash_1967.png",
  "1988": "/images/dashboards/dash_1988.png",
  "1997": "/images/dashboards/dash_1997.png",
  "2027": "/images/dashboards/dash_2027.png",
};

export default function RaceDashboard() {
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const currentEra = ERAS[currentEraIndex];

  // Optional: Add a mechanical click sound
  const playShiftSound = () => {
    // We could add a small audio file later.
    // For now, this is a placeholder.
    console.log("CLACK - Shifted to", ERAS[currentEraIndex]);
  };

  const shiftUp = useCallback(() => {
    setCurrentEraIndex((prev) => {
      const next = prev < ERAS.length - 1 ? prev + 1 : prev;
      if (next !== prev) playShiftSound();
      return next;
    });
  }, []);

  const shiftDown = useCallback(() => {
    setCurrentEraIndex((prev) => {
      const next = prev > 0 ? prev - 1 : prev;
      if (next !== prev) playShiftSound();
      return next;
    });
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        shiftUp();
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        shiftDown();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shiftUp, shiftDown]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background Images - We use standard img tags or div backgrounds, snapping instantly */}
      {ERAS.map((era) => (
        <div
          key={era}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-none ${
            currentEra === era ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
          style={{ backgroundImage: `url(${BACKGROUNDS[era]})` }}
        />
      ))}

      {/* The UI Overlays - Snapping instantly */}
      <div className="absolute inset-0 z-20">
        {currentEra === "1957" && <Dash1957Overlay />}
        {currentEra === "1967" && <Dash1967Overlay />}
        {currentEra === "1988" && <Dash1988Overlay />}
        {currentEra === "1997" && <Dash1997Overlay />}
        {currentEra === "2027" && <Dash2027Overlay />}
      </div>

      {/* Paddle Shifters (Global UI, Highest Z-Index) */}
      <PaddleShifters
        onShiftDown={shiftDown}
        onShiftUp={shiftUp}
        canShiftDown={currentEraIndex > 0}
        canShiftUp={currentEraIndex < ERAS.length - 1}
        currentEra={currentEra}
      />
      
      {/* Small UI indicator to tell user to use keyboard */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/50 text-xs uppercase tracking-widest font-mono pointer-events-none text-center">
        Use <span className="text-white border border-white/20 px-1 py-0.5 rounded">←</span> and <span className="text-white border border-white/20 px-1 py-0.5 rounded">→</span> or paddles to shift gears
        <br/>
        <span className="text-white font-bold mt-2 inline-block">CURRENT GEAR: {currentEra}</span>
      </div>
    </section>
  );
}
