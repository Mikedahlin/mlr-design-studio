"use client";

import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We learn your business, audience, and goals. No templates — a strategy tailored to what actually needs building.",
    details: [
      "Business & audience analysis",
      "Technical requirements",
      "Content strategy",
      "Timeline & pricing",
    ],
  },
  {
    number: "02",
    title: "Build with care",
    description:
      "We turn the approved direction into a responsive, accessible site and review the details as we go.",
    details: [
      "Responsive development",
      "Code and accessibility review",
      "Design system creation",
      "Iterative feedback loops",
    ],
  },
  {
    number: "03",
    title: "Launch & Optimize",
    description:
      "Ship fast, measure everything, iterate. Your site gets better every week — not just at launch.",
    details: [
      "Performance optimization",
      "SEO implementation",
      "Analytics setup",
      "Ongoing support options",
    ],
  },
];

export default function HowWeWork() {
  return (
    <section className="section bg-surface">
      <div className="container-custom px-4 md:px-6">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <p className="mono-label text-xs text-text-muted mb-3">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            From concept to launch
            <br className="hidden md:block" />
            <span className="gradient-text"> in weeks, not months</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Clear strategy and careful execution keep the project moving.
            Here&apos;s how it works.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.15}>
              <div className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-border" />
                )}

                <div className="text-center">
                  {/* Step number */}
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 bg-card border border-border flex items-center justify-center">
                      <span className="text-2xl font-bold gradient-text font-mono">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-text mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-5 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>

                  <ul className="space-y-2 text-left max-w-xs mx-auto">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-text-muted"
                      >
                        <span className="w-1 h-1 bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
