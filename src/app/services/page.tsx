import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Services | MLR Assets",
  description:
    "Websites, custom applications, online stores, and site fixes — built by one person, priced straight.",
  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    title: "Website Design",
    description:
      "A custom website built around your business — not a template. Designed to look sharp, load fast, and make it easy for customers to call or book.",
    features: [
      "Custom design, no template look",
      "Mobile-first build",
      "Google Business Profile setup",
      "Local SEO basics",
      "Contact and booking forms",
    ],
  },
  {
    title: "Custom Applications",
    description:
      "Got a tool your business needs that doesn’t exist yet? I build custom web apps for booking, scheduling, quoting, and whatever else your workflow needs.",
    features: [
      "Booking and scheduling systems",
      "Custom dashboards",
      "Internal tools and forms",
      "Data entry and reporting",
    ],
  },
  {
    title: "E-Commerce",
    description:
      "Sell online without the headache. A store your customers can actually use, and one you can manage yourself.",
    features: [
      "Product and inventory setup",
      "Payment processing",
      "Order management",
      "Training so you can run it yourself",
    ],
  },
  {
    title: "Site Optimization",
    description:
      "Your site already exists but it’s slow, broken, or invisible to Google? I fix it — without breaking your links or losing your content.",
    features: [
      "Speed and performance fixes",
      "Mobile and accessibility fixes",
      "Google findability fixes",
      "Platform migration (WordPress, Wix, etc.)",
      "301 redirects and link cleanup",
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
                What I do<span className="gradient-text">.</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                Websites, custom apps, online stores, and fixes for sites
                that aren’t working. One person. You tell me what you need,
                I tell you what it takes, and I build it.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container-custom px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="glass-card p-6 md:p-8 h-full">
                  <h2 className="text-xl font-bold text-text mb-3">
                    {service.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-text-secondary flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">→</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Pricing />

      <FinalCTA />
    </>
  );
}
