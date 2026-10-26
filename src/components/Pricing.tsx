"use client";

import AnimatedSection from "./AnimatedSection";

const pricing = [
  {
    name: "Simple fixes",
    price: "Scoped per fix",
    description:
      "Speed, styling, or mobile fixes on an existing site. You’ll know the price before I start.",
  },
  {
    name: "Custom websites",
    price: "From $99/mo",
    description:
      "A full custom build for local businesses: free build, $99/mo care plan, and you keep the site for 12 months on-time.",
  },
  {
    name: "Bigger builds",
    price: "Custom quote",
    description:
      "Web apps, online stores, and anything bigger than a website. I’ll scope it and give you one straight number.",
  },
];

export default function Pricing() {
  return (
    <section className="section">
      <div className="container-custom px-4 md:px-6">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <p className="mono-label text-xs text-primary mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Straight pricing,
            <br className="hidden md:block" />
            <span className="gradient-text"> no surprises</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Every project is scoped individually — you’ll know exactly what
            it costs before I start anything. Small fixes, full builds, and
            everything in between.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {pricing.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 0.1}>
              <div className="glass-card p-6 md:p-8 h-full">
                <h3 className="text-lg font-semibold text-text mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold gradient-text mb-4">{plan.price}</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {plan.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-8" delay={0.3}>
          <p className="text-xs text-text-muted">
            Every project scoped individually. You approve the price before I
            start, and I don’t bill past what you approved.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
