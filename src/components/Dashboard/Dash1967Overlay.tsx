"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dash1967Overlay() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Calculate a "rev" based on mouse position. 
  // When mouse is near bottom right, it revs higher.
  const calculateRev = () => {
    if (typeof window === 'undefined') return -100;
    const normalizedX = mousePosition.x / window.innerWidth;
    const normalizedY = mousePosition.y / window.innerHeight;
    // Map to a rotation between -100deg (idle) and 100deg (redline)
    return -100 + ((normalizedX + normalizedY) / 2) * 200;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [toggles, setToggles] = useState([true, false, true]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      
      {/* Central Tachometer - Revs with mouse movement */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full flex items-center justify-center pointer-events-auto group">
        <motion.div 
          className="w-1.5 h-28 bg-white origin-bottom rounded-t-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          animate={{ rotate: calculateRev() }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ y: "-50%" }}
        />
        <div className="absolute w-8 h-8 bg-zinc-900 rounded-full border border-zinc-500 z-10 shadow-inner" />
        <div className="absolute bottom-6 text-[10px] font-bold text-white tracking-widest uppercase">Project Intensity</div>
      </div>

      {/* Aircraft Toggle Switches (Filters/Navigation) */}
      <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 flex gap-8 pointer-events-auto">
        {['Websites', 'Brand', 'Video'].map((label, idx) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <button 
              onClick={() => {
                const newToggles = [...toggles];
                newToggles[idx] = !newToggles[idx];
                setToggles(newToggles);
              }}
              className="relative w-6 h-12 flex justify-center items-center group"
            >
              {/* Switch Base */}
              <div className="absolute w-6 h-6 bg-zinc-800 rounded-full border border-zinc-600 shadow-inner" />
              {/* Switch Lever */}
              <motion.div 
                className="w-2 h-10 bg-gradient-to-b from-zinc-200 to-zinc-500 rounded-sm shadow-[0_4px_4px_rgba(0,0,0,0.5)] origin-center"
                animate={{ rotateX: toggles[idx] ? 45 : -45, y: toggles[idx] ? -4 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              />
            </button>
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>

      {/* Heavy Chrome Start Button */}
      <div className="absolute top-[45%] right-[25%] pointer-events-auto">
        <Link href="/contact" className="group relative block w-32 h-12 bg-zinc-800 rounded-lg border-2 border-zinc-600 shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          <span className="text-white font-bold text-sm tracking-widest uppercase drop-shadow-md">Ignition</span>
        </Link>
      </div>

    </div>
  );
}
