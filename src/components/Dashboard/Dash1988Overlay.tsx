"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dash1988Overlay() {
  const [linesOfCode, setLinesOfCode] = useState(842000);
  const [speed, setSpeed] = useState(0);

  // Simulate live data ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setLinesOfCode((prev) => prev + Math.floor(Math.random() * 5));
      setSpeed(Math.floor(Math.random() * 120) + 60); // Random speed between 60 and 180
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none font-mono">
      
      {/* 
        The 1988 dash is all about glowing green and orange LCDs.
        We position these absolutely to fall over the "blank" screens in the background image.
      */}

      {/* Main Digital Speedometer Area */}
      <div className="absolute top-[35%] left-[45%] flex flex-col items-center">
        <div className="text-orange-500 text-6xl font-black drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] tracking-tighter">
          {speed}
        </div>
        <div className="text-orange-500/80 text-xs tracking-[0.3em] mt-1">KM/H</div>
      </div>

      {/* Left LCD Screen - Stats */}
      <div className="absolute top-[40%] left-[20%] bg-black/40 border border-green-500/30 p-4 rounded text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
        <div className="text-[10px] text-green-600 mb-1">SYSTEM STATUS</div>
        <div className="text-sm">LOC: {linesOfCode.toLocaleString()}</div>
        <div className="text-sm">UPTIME: 99.9%</div>
        
        {/* Animated Bar Chart */}
        <div className="flex gap-1 mt-3 h-8 items-end">
          {[40, 70, 100, 60, 85].map((h, i) => (
            <motion.div 
              key={i}
              className="w-2 bg-green-500"
              initial={{ height: "10%" }}
              animate={{ height: `${h}%` }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 + i * 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Right Screen - Navigation / CTA */}
      <div className="absolute top-[40%] right-[20%] pointer-events-auto flex flex-col gap-3">
        <Link 
          href="/contact" 
          className="group relative px-6 py-3 bg-black border-2 border-orange-500 text-orange-500 font-bold uppercase tracking-widest overflow-hidden transition-colors hover:bg-orange-500 hover:text-black"
        >
          <span className="relative z-10">Start Project</span>
          <div className="absolute inset-0 bg-orange-500/20 group-hover:bg-transparent blur-md" />
        </Link>
        <Link 
          href="/work" 
          className="text-xs text-green-500 border border-green-500/50 px-4 py-2 text-center hover:bg-green-500/10 transition-colors"
        >
          VIEW_PORTFOLIO.EXE
        </Link>
      </div>

    </div>
  );
}
