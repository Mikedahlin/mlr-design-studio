"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const VIDEO_SRC = "/marketing-video.mp4";

export default function Hero() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("play") === "true") {
        setPlaying(true);
      }
    }
  }, []);

  return (
    <section className="relative flex items-center bg-background overflow-hidden">
      <div className="container-custom px-4 md:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* The Statement */}
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-border mb-8"
          >
            <span className="w-1.5 h-1.5 bg-primary" />
            <span className="mono-label text-[11px] text-text">
              Human Crafted, 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[0.98] mb-6 uppercase"
          >
            Don&apos;t bring a knife
            <br />
            to a gunfight.
            <br />
            <span className="text-primary">I&apos;ll help you smoke</span>
            <br />
            <span className="text-primary">your competition.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mono-label text-sm md:text-base text-text-secondary border-t border-border pt-4 max-w-xl mb-10"
          >
            Custom-coded sites that cost less than the builders. You own the
            code — forever. Not happy? Money back. Simple.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 mb-14 md:mb-20"
          >
            <Link href="/contact" className="btn-primary text-center">
              Start a Project
            </Link>
            <Link href="/work" className="btn-secondary text-center">
              See Proof
            </Link>
          </motion.div>
        </div>

        {/* The Reel — full width, click for sound */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative border border-border bg-surface overflow-hidden cursor-pointer group shadow-[8px_8px_0_var(--color-border)]"
            onClick={() => setPlaying(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
            aria-label="Watch the reel with sound"
          >
            <video
              src={VIDEO_SRC}
              className="w-full h-auto block"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            {/* Watch-with-sound overlay */}
            <div className="absolute inset-0 flex items-end md:items-center justify-center md:justify-end p-4 md:p-8 pointer-events-none">
              <span className="mono-label inline-flex items-center gap-2 px-4 py-3 bg-primary text-white text-xs md:text-sm border border-primary group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform shadow-[4px_4px_0_var(--color-ink)]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch with sound
              </span>
            </div>
          </div>
          <p className="mono-label text-[10px] text-text-muted mt-3">
            /// muted preview — click for the full reel
          </p>
        </motion.div>
      </div>

      {/* Sound-on modal */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={VIDEO_SRC}
                className="w-full h-auto border border-border"
                controls
                autoPlay
              />
              <button
                onClick={() => setPlaying(false)}
                className="absolute -top-12 right-0 mono-label text-xs text-white border border-white/40 px-3 py-2 hover:bg-white hover:text-black transition-colors"
                aria-label="Close video"
              >
                CLOSE ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
