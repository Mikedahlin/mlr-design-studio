"use client";

import AnimatedSection from "./AnimatedSection";
import FAQSection from "./FAQ";

const faqItems = [
  {
    question: "What does 'AI-forward' actually mean?",
    answer:
      "It means we use AI tools throughout our development process — for design generation, code scaffolding, content creation, and testing. Every project is human-reviewed and polished. AI makes us faster; humans ensure the result is right.",
  },
  {
    question: "How is this different from using Wix or Squarespace?",
    answer:
      "Those are template-based DIY platforms. We build custom sites from scratch using AI as a development tool — not a template engine. You get original design, custom code you own, and human expertise in strategy, brand, and conversion optimization.",
  },
  {
    question: "How is this different from a traditional agency?",
    answer:
      "Traditional agencies bill for hours and often take months. We use AI to compress timelines dramatically while maintaining the same quality. A site that takes an agency 8-12 weeks might take us 2-4 weeks. Lower cost, faster delivery, same (or better) output.",
  },
  {
    question: "What tech stack do you use?",
    answer:
      "We build with modern frameworks — typically Next.js, React, TypeScript, and Tailwind CSS. We deploy on Vercel or Netlify for global edge performance. The specific stack depends on your project's needs, but we always use current, well-supported technologies.",
  },
  {
    question: "Do I own the code?",
    answer:
      "Yes. Unlike platforms like Wix or Squarespace where you're locked into their ecosystem, you own 100% of the code, design assets, and content we create. You can host it anywhere, modify it, or hand it off to another team.",
  },
  {
    question: "Can you work with my existing brand?",
    answer:
      "Absolutely. We adapt to your existing brand guidelines, or we can help evolve your brand as part of the project. Either way, the site will feel like you — not like a template.",
  },
  {
    question: "What about ongoing support?",
    answer:
      "We offer optional monthly support retainings for updates, maintenance, and optimization. But there's no obligation — you're not locked into anything after launch.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free 15-minute call through our contact page. We'll discuss your project, give you a ballpark estimate, and outline next steps. No sales pressure — just a conversation about what you need.",
  },
];

export default function FAQPage() {
  return (
    <section className="section">
      <div className="container-custom px-4 md:px-6 max-w-3xl">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            Frequently asked questions
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <FAQSection items={faqItems} />
        </AnimatedSection>
      </div>
    </section>
  );
}
