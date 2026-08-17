"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Dash2027Overlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      
      {/* 2027 is holographic, floating UI elements */}

      {/* Center Holographic Ring (Data Visualization) */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 flex items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div 
          className="absolute w-full h-full rounded-full border border-cyan-500/30 border-t-cyan-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner reverse rotating ring */}
        <motion.div 
          className="absolute w-48 h-48 rounded-full border border-purple-500/30 border-b-purple-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Core Value Text */}
        <div className="text-cyan-300 font-mono text-center drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          <div className="text-3xl font-black tracking-tighter">AI.SYNC</div>
          <div className="text-[10px] tracking-widest opacity-70">OPTIMIZED</div>
        </div>
      </div>

      {/* Floating Action Menu (Right Side) */}
      <div className="absolute top-[35%] right-[15%] pointer-events-auto flex flex-col gap-6">
        <Link href="/contact" className="group flex items-center gap-4">
          {/* Biometric style button */}
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center relative overflow-hidden bg-black/50 backdrop-blur-sm group-hover:bg-cyan-900/50 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]">
             <div className="absolute inset-0 bg-[url('/fingerprint.svg')] bg-cover opacity-20 group-hover:opacity-100 transition-opacity" />
             <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
          </div>
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase opacity-80 group-hover:opacity-100">Initialize Project</span>
        </Link>

        <Link href="/services" className="group flex items-center gap-4">
          <div className="w-10 h-10 rounded border border-purple-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:border-purple-400 transition-colors">
            <div className="w-full h-[1px] bg-purple-500/50 group-hover:bg-purple-400 transition-colors" />
          </div>
          <span className="text-purple-400 font-mono text-xs tracking-widest uppercase opacity-60 group-hover:opacity-100">Neural Services</span>
        </Link>
      </div>

    </div>
  );
}
