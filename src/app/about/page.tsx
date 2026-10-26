import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About | MLR Assets",
  description:
    "A one-person web and visual design studio in Minnesota. Clear thinking, strong craft, and straight answers.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    title: "Straight Answers",
    description:
      "I tell you what I can do, what I can’t, and what it costs before you pay anything. No black boxes, no surprise fees.",
  },
  {
    title: "Care Over Speed",
    description:
      "I move fast, but not at the expense of the details that make a site dependable, accessible, and easy to use.",
  },
  {
    title: "No Hype",
    description:
      "I won’t promise you a #1 ranking on Google or invent results to win a sale. What I do: real, findable, working websites.",
  },
  {
    title: "You Own Everything",
    description:
      "You own your code, your design, your content. If you ever want to walk away, everything comes with you — no lock-in.",
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
                About
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                One person.
                <span className="gradient-text"> No middlemen.</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                MLR Assets is a one-person web and visual design studio.
                When you work with me, you’re talking to the person who
                plans, designs, builds, and tests every page. Nothing gets
                lost in a handoff, because there isn’t one.
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
              <h2 className="text-3xl font-bold text-text mb-5">Why I started this</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Small businesses usually get two choices: a cheap DIY builder
                  that makes your site look like everyone else’s, or an
                  agency that charges more than the site earns. Both are a
                  bad fit for most local shops and contractors.
                </p>
                <p>
                  Your site should be built around your business — not a
                  template, not a committee. It should be findable when
                  someone in your town searches for what you do, and it
                  should be easy for a customer to call or book.
                </p>
                <p>
                  I built MLR Assets to be that middle path: real craft,
                  one person, a fair price, and a site you actually own.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-3xl font-bold text-text mb-5">How I work</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Every project starts with a conversation. I learn what your
                  business does, who your customers are, and what you actually
                  need — not just what looks good.
                </p>
                <p>
                  Then I plan the structure, design it, build it, and review
                  every page on desktop and mobile before it goes live.
                  You see progress the whole way, and you get a say in every
                  decision.
                </p>
                <p>
                  When it’s done, you get a site that works and you know how
                  to use it. If anything ever needs fixing, you call me.
                  That’s the whole process.
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
              What I stand for
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
              Who
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              The person behind the work
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              No account managers, no subcontractors, no meetings that
              could have been an email. You talk to the builder.
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
                Mike Dahlin
              </h3>
              <p className="text-sm text-text-muted mb-4">
                Founder &amp; Builder — MLR Assets LLC
              </p>
              <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
                I build websites for real businesses. No hype, no overselling,
                just work I’m willing to put my name on.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
