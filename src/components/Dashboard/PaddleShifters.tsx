"use client";

import { motion } from "framer-motion";
import { Era } from "./RaceDashboard";

interface PaddleShiftersProps {
  onShiftDown: () => void;
  onShiftUp: () => void;
  canShiftDown: boolean;
  canShiftUp: boolean;
  currentEra: Era;
}

export default function PaddleShifters({
  onShiftDown,
  onShiftUp,
  canShiftDown,
  canShiftUp,
  currentEra,
}: PaddleShiftersProps) {
  // Paddle styling mimics metallic levers. We use drop shadows and borders to give them a 3D feel.
  const basePaddleStyle =
    "fixed top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-75 group";

  // The actual "paddle" piece
  const paddleVisual =
    "w-12 md:w-20 h-48 md:h-64 bg-zinc-900 border-2 border-zinc-700/50 rounded-lg shadow-[8px_16px_32px_rgba(0,0,0,0.8),inset_2px_4px_8px_rgba(255,255,255,0.1)] flex items-center justify-center relative overflow-hidden";

  return (
    <>
      {/* LEFT PADDLE - SHIFT DOWN */}
      {canShiftDown && (
        <motion.button
          onClick={onShiftDown}
          className={`${basePaddleStyle} left-0 md:left-4 origin-left`}
          whileHover={{ scale: 1.05, x: 10 }}
          whileTap={{ scale: 0.95, rotateY: -15, x: -10 }} // Pulling towards you
          aria-label="Shift Down (Previous Era)"
        >
          <div className={paddleVisual}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 pointer-events-none" />
            <span className="text-zinc-500 font-mono text-2xl font-bold group-hover:text-white transition-colors">
              -
            </span>
          </div>
          <span className="mt-4 text-xs font-mono font-bold tracking-widest text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
            SHIFT DOWN
          </span>
        </motion.button>
      )}

      {/* RIGHT PADDLE - SHIFT UP */}
      {canShiftUp && (
        <motion.button
          onClick={onShiftUp}
          className={`${basePaddleStyle} right-0 md:right-4 origin-right`}
          whileHover={{ scale: 1.05, x: -10 }}
          whileTap={{ scale: 0.95, rotateY: 15, x: 10 }} // Pulling towards you
          aria-label="Shift Up (Next Era)"
        >
          <div className={paddleVisual}>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/5 pointer-events-none" />
            <span className="text-zinc-500 font-mono text-2xl font-bold group-hover:text-white transition-colors">
              +
            </span>
          </div>
          <span className="mt-4 text-xs font-mono font-bold tracking-widest text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
            SHIFT UP
          </span>
        </motion.button>
      )}
    </>
  );
}
