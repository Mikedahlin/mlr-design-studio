"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const capabilities = [
  {
    label: "Design Generation",
    tool: "AI-Assisted",
    description: "Layouts, color systems, and design tokens generated in seconds, refined by human designers.",
    bar: 85,
  },
  {
    label: "Code Development",
    tool: "AI-Powered",
    description: "Component scaffolding, boilerplate, and patterns — reviewed and polished by senior developers.",
    bar: 90,
  },
  {
    label: "Content & Copy",
    tool: "AI + Human",
    description: "SEO-optimized content drafted with AI, shaped by humans who understand your brand voice.",
    bar: 75,
  },
  {
    label: "Quality Assurance",
    tool: "Human-Led",
    description: "Accessibility testing, cross-browser checks, and performance audits — always human-verified.",
    bar: 100,
  },
];

export default function AICapabilities() {
  return (
    <section className="section">
      <div className="container-custom px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <p className="mono-label text-xs text-primary mb-3">
              Transparency
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-5">
              How we actually
              <span className="gradient-text"> work with AI</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              We don&apos;t hide behind the buzzword. AI is a tool we use
              daily — it makes us faster and more efficient, but it
              doesn&apos;t replace the humans who ensure your site is right.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Every project goes through AI-assisted development and
              human-led review. The ratio depends on the task — some things
              AI handles well, others require a human eye. Here&apos;s an
              honest breakdown.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary" />
                <span className="mono-label text-xs text-text-muted">AI-Assisted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-ink" />
                <span className="mono-label text-xs text-text-muted">Human-Led</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Capability Bars */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              {capabilities.map((cap, index) => (
                <div key={cap.label} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-text">
                        {cap.label}
                      </span>
                      <span className="ml-2 text-xs text-text-muted">
                        {cap.tool}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-primary-light">
                      {cap.bar}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-border-light mb-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cap.bar}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.3 + index * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
