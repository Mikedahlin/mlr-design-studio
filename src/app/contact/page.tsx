"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company_website: formData.get("company_website"),
        }),
      });

      if (!response.ok) throw new Error("Unable to send message");

      form.reset();
      setSubmitted(true);
    } catch {
      setError(
        "We could not send that message. Please email hello@mlrassets.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-custom px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 md:mb-10">
            <p className="mono-label mb-3 text-xs text-primary">Contact</p>
            <h1 className="text-4xl font-bold tracking-tight text-text md:text-6xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              Tell us what you need. A name, an email, and a few words are
              enough to get the conversation started.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
            <section className="glass-card p-6 md:p-8" aria-labelledby="contact-form-title">
              {submitted ? (
                <div className="py-8 text-center" aria-live="polite">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-text">Message sent.</h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Thanks for reaching out. Your message made it through.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 id="contact-form-title" className="mb-6 text-xl font-bold text-text">
                    Send a message
                  </h2>

                  <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="company_website">Leave this field empty</label>
                    <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-text">Name</label>
                      <input id="name" name="name" type="text" autoComplete="name" required className="w-full border border-border bg-card px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none" placeholder="Your name" />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-text">Email</label>
                      <input id="email" name="email" type="email" autoComplete="email" required className="w-full border border-border bg-card px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none" placeholder="you@example.com" />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">How can we help?</label>
                      <textarea id="message" name="message" required rows={6} className="w-full resize-y border border-border bg-card px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none" placeholder="Tell us what you have in mind." />
                    </div>

                    {error && <p className="text-sm text-primary" role="alert">{error}</p>}

                    <button type="submit" disabled={submitting} className="btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-50">
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </section>

            <aside className="space-y-3" aria-label="Direct contact options">
              <a href="mailto:hello@mlrassets.com" className="glass-card glass-card-hover block p-5">
                <span className="mono-label text-[10px] text-text-secondary">Email</span>
                <span className="mt-2 block break-words text-sm font-medium text-text">hello@mlrassets.com</span>
              </a>
              <a href="tel:+13202009969" className="glass-card glass-card-hover block p-5">
                <span className="mono-label text-[10px] text-text-secondary">Call</span>
                <span className="mt-2 block text-sm font-medium text-text">(320) 200-9969</span>
              </a>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
