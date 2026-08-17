"use client";

import AnimatedSection from "./AnimatedSection";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Vercel",
  "Figma",
  "AI/ML Tools",
  "Headless CMS",
];

export default function TechStack() {
  return (
    <section className="py-16 md:py-20 border-y border-border">
      <div className="container-custom px-4 md:px-6">
        <AnimatedSection className="text-center mb-10">
          <p className="mono-label text-xs text-text-muted mb-3">
            Our Stack
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-text">
            Modern tools. Proven results.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="px-4 py-2.5 border border-border bg-card mono-label text-xs text-text-secondary hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
