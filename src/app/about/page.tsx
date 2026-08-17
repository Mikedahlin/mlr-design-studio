import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About | MLR Assets",
  description:
    "AI-forward web development studio. Human judgment, frontier tooling, measurable results.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    title: "Transparency First",
    description:
      "We show our process honestly — the AI tools we use, the human review steps, the real timelines. No black boxes.",
  },
  {
    title: "Speed Without Shortcuts",
    description:
      "AI compresses timelines. We never compress quality. Every output goes through thorough review before it ships.",
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
                <span className="gradient-text"> AI-native era</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                MLR Assets is an AI-forward web development studio. We pair
                frontier AI tooling with human expertise to build sites that
                are faster, better, and more cost-effective than traditional
                agency work — without the DIY risk of self-serve builder sites that you never truly own.
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
                  The web development industry is split into two camps: AI
                  builders selling self-serve automation for $10-30/month, and
                  traditional agencies charging $5K-$35K+ with weeks-long
                  timelines. Both have real limitations. We believe you should own your site with no hidden fees.
                </p>
                <p>
                  AI builders produce fast but generic output — no strategy, no
                  brand judgment, no custom work. Traditional agencies deliver
                  quality but at a pace and price that excludes many businesses
                  who need it. And by the time they&apos;re done building your site it&apos;s already outdated.
                </p>
                <p>
                  MLR Assets fills the gap. We&apos;re a new studio that
                  visibly builds with frontier AI tooling — borrowing the same
                  design language used by companies like Anthropic, Vercel, and
                  Linear. The result: agency-quality output at AI speed, with
                  the transparency and accountability of a real team behind it. We believe we should work as hard as you.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-3xl font-bold text-text mb-5">Our Approach</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Every project starts with human strategy. We learn your
                  business, your audience, and your goals. Then we deploy
                  AI tools to accelerate development — generating layouts,
                  scaffolding code, and drafting content — while we personally
                  review, refine, and polish every detail.
                </p>
                <p>
                  This isn&apos;t about replacing developers with AI. It&apos;s
                  about giving skilled humans better tools, Ai is a very useful TOOL. The ratio of
                  AI-to-human work varies by task, but the outcome is
                  consistent: faster delivery, lower cost, same (or better)
                  quality. We believe in working as hard as you do.
                </p>
                <p>
                  We&apos;re transparent about this because we believe the
                  industry&apos;s secrecy around AI use is a disservice to
                  clients. You deserve to know how your site gets built.
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
                  src="/mike-dahlin.jpg"
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
                Building with AI since before it was trendy. Focused on
                delivering real results for real businesses — not chasing
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
