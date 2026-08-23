import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About | MLR Assets",
  description:
    "A small web and visual design studio focused on clear thinking, strong craft, and measurable results.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    title: "Transparency First",
    description:
      "We show the plan, the work, the timeline, and the handoff clearly. No black boxes.",
  },
  {
    title: "Speed Without Shortcuts",
    description:
      "We move quickly without skipping the details that make a site dependable, accessible, and easy to use.",
  },
  {
    title: "Results Over Aesthetics",
    description:
      "Beautiful sites that don't convert are expensive art. We design for measurable outcomes — traffic, leads, revenue.",
  },
  {
    title: "Client Ownership",
    description:
      "You own everything — code, design, content. No lock-in, no hidden pricing, no platform dependency, no surprise fees. Sleep good knowing if anything ever happens to us, your site stays the same.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-mesh grain">
        <div className="container-custom px-4 md:px-6">
          <div className="max-w-3xl">
            <AnimatedSection>
              <p className="mono-label text-xs text-primary mb-3">
                About Us
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Built for the
                <span className="gradient-text"> work that matters</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                MLR Assets is a small web and visual design studio. We pair
                clear strategy, thoughtful design, and dependable code to
                build sites that help real businesses earn attention and
                make it easier for customers to take the next step.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container-custom px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-text mb-5">Our Story</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  The web development industry often makes a choice between
                  do-it-yourself builders and expensive agency processes. Both
                  can leave a business with the wrong fit. We believe you
                  should own your site with no hidden fees.
                </p>
                <p>
                  Do-it-yourself builders can be fast but generic. Traditional
                  agencies can deliver quality but at a pace and price that
                  excludes many businesses who need it. Your site should be
                  specific to your work, not a compromise.
                </p>
                <p>
                  MLR Assets fills the gap with direct, focused collaboration.
                  You work with the person making the decisions, the design,
                  and the code. The result is a site with agency-level care
                  without layers of handoffs or unnecessary meetings.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-3xl font-bold text-text mb-5">Our Approach</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Every project starts with strategy. We learn your business,
                  your audience, and your goals. Then we plan the structure,
                  design the experience, build the site, and personally review
                  every detail before handoff.
                </p>
                <p>
                  The process is collaborative and practical. You get clear
                  decisions, visible progress, and a finished site that your
                  business can actually own and use. We believe in working as
                  hard as you do.
                </p>
                <p>
                  We&apos;re transparent because you deserve to know how your site
                  gets planned, built, tested, and handed over.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface">
        <div className="container-custom px-4 md:px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="mono-label text-xs text-secondary mb-3">
              Values
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text">
              What we stand for
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="glass-card p-6 md:p-8 h-full">
                  <h3 className="text-lg font-semibold text-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container-custom px-4 md:px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="mono-label text-xs text-primary mb-3">
              Team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              The people behind the work
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              A small, focused team. Every person here builds — no
              middlemen, no account managers, no wasted meetings.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto text-center">
              <div className="relative w-28 h-28 mx-auto mb-5 border border-border overflow-hidden">
                <Image
                  src="/Mikes_Website_Profile_Pic.jpg"
                  alt="Mike Dahlin, Founder of MLR Assets"
                  fill
                  className="object-cover grayscale"
                  sizes="112px"
                />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Founder & Lead Developer
              </h3>
              <p className="text-sm text-text-muted mb-4">
                MLR Assets LLC
              </p>
              <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
                Building useful digital work for real businesses — not chasing
                hype, not overselling capabilities.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
