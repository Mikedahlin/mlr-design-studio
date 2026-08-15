"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dash1957Overlay() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress (0 to 1) into a rotation for the speedometer needle (-120deg to 120deg)
  const needleRotation = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  // A fun little "creative juice" state that we can toggle
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="absolute inset-0 pointer-events-none">
      
      {/* 
        This is a conceptual mapping. In a final production build, these top/left percentages 
        would need to be precisely aligned to the background image's specific dials.
      */}

      {/* Speedometer - Scroll Progress */}
      <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full flex items-center justify-center pointer-events-auto">
        {/* The Needle */}
        <motion.div 
          className="w-1 h-24 bg-red-600 origin-bottom rounded-t-full shadow-lg"
          style={{ rotate: needleRotation, y: "-50%" }}
        />
        <div className="absolute w-6 h-6 bg-zinc-800 rounded-full border-2 border-zinc-400 z-10 shadow-inner" />
        <div className="absolute bottom-4 text-xs font-mono text-white/70 tracking-widest bg-black/40 px-2 py-1 rounded">SCROLL SPEED</div>
      </div>

      {/* Fuel Gauge - Light/Dark Mode Toggle */}
      <div className="absolute top-[45%] left-[15%] w-24 h-24 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer group" onClick={() => setIsDark(!isDark)}>
         {/* A fake needle that just flicks when clicked */}
         <motion.div 
          className="w-1 h-12 bg-white origin-bottom"
          animate={{ rotate: isDark ? 45 : -45 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          style={{ y: "-50%" }}
        />
        <div className="absolute bottom-2 text-[10px] font-mono text-white/50 group-hover:text-white">JUICE</div>
      </div>

      {/* Radio Knobs - Navigation */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex gap-12 pointer-events-auto">
        <Link href="/work" className="group flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 border-[3px] border-zinc-200 shadow-[0_4px_10px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform" />
          <span className="mt-2 text-xs font-bold text-white/80 uppercase tracking-widest">Work</span>
        </Link>
        <Link href="/services" className="group flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 border-[3px] border-zinc-200 shadow-[0_4px_10px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform" />
          <span className="mt-2 text-xs font-bold text-white/80 uppercase tracking-widest">Svcs</span>
        </Link>
        <Link href="/contact" className="group flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 border-[3px] border-zinc-200 shadow-[0_4px_10px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform" />
          <span className="mt-2 text-xs font-bold text-white/80 uppercase tracking-widest">Contact</span>
        </Link>
      </div>

    </div>
  );
}
