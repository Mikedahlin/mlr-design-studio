"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function FinalCTA() {
  return (
    <section className="section">
      <div className="container-custom px-4 md:px-6">
        <AnimatedSection>
          <div className="relative overflow-hidden border border-border bg-ink">
            <div className="relative px-6 py-16 md:px-12 md:py-20 text-center">
              <p className="mono-label text-xs text-primary mb-4">
                Human Crafted, 2026
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-5">
                Ready to build
                <span className="text-primary"> something real?</span>
              </h2>
              <p className="text-lg text-border-light max-w-xl mx-auto mb-8">
                No retainer. No lock-in. Just a conversation about what you
                need and a clear path to get there.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-primary text-background px-8 py-4 mono-label text-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0_#ffffff] transition-all"
                >
                  Book a Free Call
                </Link>
                <Link
                  href="/work"
                  className="border border-background text-background px-8 py-4 mono-label text-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0_#ff3e1a] transition-all"
                >
                  See Case Studies
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
