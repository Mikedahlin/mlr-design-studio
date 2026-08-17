"use client";

import { motion } from "framer-motion";

const logos = [
  "Majestic Pine Renovations",
  "Ted Buselmeier Law",
];

export default function TrustBar() {
  return (
    <section className="py-12 md:py-16 border-y border-border bg-surface">
      <div className="container-custom px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mono-label text-xs text-text-muted text-center mb-8"
        >
          Trusted by our clients
        </motion.p>

        <div className="relative overflow-hidden w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee w-max">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
              >
                <span className="mono-label text-sm text-text-muted whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
