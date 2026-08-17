import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Template: AtlasLume | MLR Assets",
  description:
    "A real template concept — an AI website-generator landing page design. Not a live business, a demo of what we can build.",
  alternates: {
    canonical: "/templates/atlaslume",
  },
};

const features = [
  {
    title: "Built in Seconds",
    description:
      "AI extracts your content, optimizes your SEO, and generates a conversion-focused layout instantly.",
  },
  {
    title: "AI Chatbot Included",
    description:
      "Every site comes with an embedded AI agent trained on your business data to answer customer questions 24/7.",
  },
  {
    title: "Fully Managed",
    description:
      "Hosting, SSL, and mobile responsiveness handled. Just approve the design and we take care of the rest.",
  },
];

export default function AtlasLumeTemplatePage() {
  return (
    <>
      {/* Banner — honest labeling */}
      <div className="bg-primary text-background text-center py-3 px-4">
        <p className="mono-label text-xs">
          Template Concept — not a live business. A design example, not a client.{" "}
          <Link href="/work" className="underline hover:no-underline">
            Back to Work
          </Link>
        </p>
      </div>

      {/* Hero */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 bg-background">
        <div className="container-custom px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <p className="mono-label text-xs text-primary mb-4">
                Template — AI SaaS Landing
              </p>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                AI Builds Your Website.
                <br />
                <span className="text-text-muted">You Just Say Yes.</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
                Enter your business URL. AI analyzes your business and generates
                a better, modern site in 60 seconds. Free to generate.
              </p>
              <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="url"
                  placeholder="https://your-outdated-site.com"
                  className="flex-1 h-12 px-4 bg-card border border-border text-text text-sm placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <button type="button" className="btn-primary h-12 px-8">
                  Dare Us
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-custom px-4 md:px-6">
          <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <div className="w-10 h-10 bg-ink text-background flex items-center justify-center mb-4">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-surface">
        <div className="container-custom px-4 md:px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text">Simple Pricing</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="glass-card p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-text mb-4">Starter</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-text">$49</span>
                  <span className="text-text-muted ml-1">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 text-text-secondary flex-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary" /> AI-generated
                    website
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary" /> Basic AI chatbot
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary" /> Auto SEO
                  </li>
                </ul>
                <button className="btn-secondary w-full py-3">
                  Choose Starter
                </button>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="border border-primary bg-ink text-background p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold">$99</span>
                  <span className="text-border-light ml-1">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 text-border-light flex-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary" /> Everything in
                    Starter
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary" /> Smart booking
                    agent
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary" /> Review manager
                  </li>
                </ul>
                <button className="bg-primary text-background w-full py-3 mono-label text-sm">
                  Choose Pro
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
