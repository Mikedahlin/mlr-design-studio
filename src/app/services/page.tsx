import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Services | MLR Assets",
  description:
    "Custom web development, applications, e-commerce, performance optimization, and business integrations.",
  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    title: "Web Development",
    description:
      "Custom websites planned, designed, and built around your business, audience, and goals.",
    features: [
      "Custom design (not templates)",
      "Strategy-led development",
      "Responsive, mobile-first builds",
      "Performance-optimized (sub-2s loads)",
      "SEO-ready architecture",
    ],
  },
  {
    title: "Custom Applications",
    description:
      "Full-stack web apps, dashboards, and internal tools. React, Next.js, and modern frameworks — built to your specifications with clean, maintainable code.",
    features: [
      "React / Next.js / TypeScript",
      "API design and integration",
      "Database design (PostgreSQL, MongoDB)",
      "Authentication & authorization",
      "Real-time features (WebSockets, SSE)",
    ],
  },
  {
    title: "E-Commerce",
    description:
      "Shopify stores, custom headless builds, or platform migrations. Optimized for conversion rate, page speed, and inventory management.",
    features: [
      "Shopify / headless commerce",
      "Payment integration (Stripe, etc.)",
      "Product catalog management",
      "Checkout optimization",
      "Analytics & conversion tracking",
    ],
  },
  {
    title: "Performance & SEO",
    description:
      "Core Web Vitals optimization, technical SEO audits, and speed improvements. Sites that rank higher and load faster — directly impacting revenue.",
    features: [
      "Core Web Vitals audit & fixes",
      "Technical SEO implementation",
      "Page speed optimization",
      "Schema markup & structured data",
      "Ongoing monitoring & reporting",
    ],
  },
  {
    title: "Automation & Integrations",
    description:
      "Connect the tools your business already uses and streamline the work that happens behind your website.",
    features: [
      "Forms and lead routing",
      "Search and data connections",
      "Content and workflow automation",
      "Custom API integrations",
    ],
  },
  {
    title: "Migrations & Redesigns",
    description:
      "Move from WordPress, Wix, Squarespace, or legacy platforms to modern stacks — without losing SEO equity, breaking links, or downtime.",
    features: [
      "Platform migration (WordPress, Wix, etc.)",
      "301 redirect mapping",
      "SEO equity preservation",
      "Content migration & cleanup",
      "Design refresh / rebrand",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-mesh grain">
        <div className="container-custom px-4 md:px-6">
          <div className="max-w-3xl">
            <AnimatedSection>
              <p className="mono-label text-xs text-primary mb-3">
                Services
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                What we
                <span className="gradient-text"> build</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                Full-spectrum web development for ambitious small businesses.
                From landing pages to full-stack applications — we build
                around your goals, not a template.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section">
        <div className="container-custom px-4 md:px-6">
          <div className="space-y-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.08}>
                <div className="glass-card p-6 md:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
                    <div className="lg:col-span-2">
                      <h2 className="text-xl md:text-2xl font-bold text-text mb-3">
                        {service.title}
                      </h2>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="lg:col-span-3">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-sm"
                          >
                            <svg
                              className="w-5 h-5 text-primary shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-text-secondary">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <FinalCTA />
    </>
  );
}
