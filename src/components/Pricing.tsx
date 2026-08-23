"use client";

import AnimatedSection from "./AnimatedSection";
import PricingCard from "./PricingCard";

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    period: "one-time",
    description:
      "Perfect for a focused landing page, MVP, or single-page site that needs to look professional and load fast.",
    features: [
      "Single-page or simple multi-page site",
      "Custom design and development",
      "Responsive, mobile-first build",
      "Basic SEO setup",
      "2 revision rounds",
      "14-day delivery",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$5,000",
    period: "- $12,000",
    description:
      "Full custom website for growing businesses. Multiple pages,CMS integration, and conversion-focused design.",
    features: [
      "Multi-page custom website",
      "Custom design system",
      "CMS integration (Sanity, Contentful, etc.)",
      "Advanced SEO + analytics",
      "Interactive elements & animations",
      "Priority support for 30 days",
      "3-week delivery",
    ],
    cta: "Start a Project",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Complex builds — web apps, e-commerce platforms, or multi-site architectures. Scoped to your needs.",
    features: [
      "Full-stack web application",
      "Custom API integrations",
      "E-commerce / payments",
      "Performance & security audits",
      "Dedicated project manager",
      "Ongoing support retainer available",
      "Timeline: scoped per project",
    ],
    cta: "Book a Call",
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
            Transparent pricing,
            <br className="hidden md:block" />
            <span className="gradient-text"> no surprises</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Unlike traditional agencies, we publish our ranges. Every project
            is scoped individually, but you&apos;ll know what ballpark
            you&apos;re in before we ever talk.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 0.1}>
              <PricingCard
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                cta={plan.cta}
                highlighted={plan.highlighted}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-8" delay={0.3}>
          <p className="text-xs text-text-muted">
            All prices in USD. Payment milestones available for larger
            projects.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
