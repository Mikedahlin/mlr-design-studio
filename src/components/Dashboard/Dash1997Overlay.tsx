"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dash1997Overlay() {
  const [clients, setClients] = useState(142);

  // Simulate a slow odometer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setClients(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      
      {/* HUD Projection on the "windshield" area (top center) */}
      <div className="absolute top-[15%] left-[50%] -translate-x-1/2 flex flex-col items-center">
        <motion.div 
          className="text-green-500 font-mono text-xl tracking-[0.2em] uppercase blur-[0.5px] opacity-80"
          animate={{ opacity: [0.6, 0.9, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Human Crafted
        </motion.div>
        <div className="text-green-500/50 font-mono text-[10px] tracking-widest mt-1">EST. 2026</div>
      </div>

      {/* Modern Analog Cluster Area */}
      
      {/* Odometer (Center Bottom of main cluster) */}
      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 bg-zinc-900 border-2 border-zinc-700 px-3 py-1 rounded shadow-inner">
        <div className="flex gap-0.5 font-mono text-white text-lg font-bold">
          {clients.toString().padStart(6, '0').split('').map((digit, i) => (
            <div key={i} className="bg-black px-1.5 py-0.5 border border-zinc-800">
              {digit}
            </div>
          ))}
        </div>
        <div className="text-center text-[8px] text-zinc-500 mt-1 uppercase tracking-widest">Active Projects</div>
      </div>

      {/* Backlit Navigation Menu (Right side panel) */}
      <div className="absolute top-[35%] right-[22%] pointer-events-auto bg-zinc-800/80 p-4 rounded-lg border border-zinc-600 shadow-xl backdrop-blur-sm">
        <div className="text-xs text-orange-500 uppercase tracking-widest mb-3 border-b border-orange-500/30 pb-1">Menu System</div>
        <nav className="flex flex-col gap-2">
          <Link href="/work" className="text-sm font-bold text-white hover:text-orange-400 transition-colors flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" /> Portfolio
          </Link>
          <Link href="/services" className="text-sm font-bold text-white hover:text-orange-400 transition-colors flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-600" /> Services
          </Link>
          <Link href="/contact" className="mt-2 block w-full text-center py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded shadow hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-shadow">
            START
          </Link>
        </nav>
      </div>

    </div>
  );
}
