"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const contactMethods = [
  {
    title: "Email Us",
    value: "hello@mlrassets.com",
    href: "mailto:hello@mlrassets.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Call Us",
    value: "(320) 200-9969",
    href: "tel:+13202009969",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      budget: formData.get("budget"),
      message: formData.get("message"),
      company_website: formData.get("company_website"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your message. Please email us directly at hello@mlrassets.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-mesh grain">
        <div className="container-custom px-4 md:px-6">
          <div className="max-w-3xl">
            <AnimatedSection>
              <p className="mono-label text-xs text-primary mb-3">
                Contact
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Let&apos;s talk about
                <span className="gradient-text"> your project</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                No sales pitch. No pressure. Just a conversation about what
                you need and whether we&apos;re the right fit.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section">
        <div className="container-custom px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                {submitted ? (
                  <div className="glass-card p-8 md:p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-5 flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-text mb-3">
                      Message sent
                    </h3>
                    <p className="text-sm text-text-secondary">
                      We&apos;ll get back to you within 24 hours. In the
                      meantime, feel free to explore our{" "}
                      <Link href="/work" className="text-primary hover:text-primary-light transition-colors">
                        case studies
                      </Link>
                      .
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text mb-6">
                      Send us a message
                    </h2>
                    <div
                      className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
                      aria-hidden="true"
                    >
                      <label htmlFor="company_website">
                        Leave this field empty
                      </label>
                      <input
                        type="text"
                        id="company_website"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 bg-card border border-border text-text text-sm placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-card border border-border text-text text-sm placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-text mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          className="w-full px-4 py-3 bg-card border border-border text-text text-sm focus:outline-none focus:border-primary transition-colors"
                        >
                          <option value="">Select a range</option>
                          <option value="2500-5000">$2,500 – $5,000</option>
                          <option value="5000-12000">$5,000 – $12,000</option>
                          <option value="12000+">$12,000+</option>
                          <option value="unsure">Not sure yet</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                          Tell us about your project
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          className="w-full px-4 py-3 bg-card border border-border text-text text-sm placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                          placeholder="What are you looking to build? What's your timeline?"
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-primary">{error}</p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full py-4 disabled:opacity-50"
                      >
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.15}>
                <div className="space-y-5">
                  {contactMethods.map((method) => (
                    <a
                      key={method.title}
                      href={method.href}
                      className="glass-card glass-card-hover p-5 flex items-center gap-4 block"
                    >
                      <div className="w-10 h-10 border border-border flex items-center justify-center text-primary shrink-0">
                        {method.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text">
                          {method.title}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {method.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-8 glass-card p-6">
                  <h3 className="text-sm font-semibold text-text mb-3">
                    What happens next?
                  </h3>
                  <ol className="space-y-3 text-sm text-text-secondary">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-primary text-background text-xs flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      We review your message (usually within 24 hours)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-primary text-background text-xs flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </span>
                      Quick 15-minute discovery call
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-primary text-background text-xs flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </span>
                      Custom proposal within 48 hours
                    </li>
                  </ol>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
