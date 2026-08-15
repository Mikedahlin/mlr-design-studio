import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Work | MLR Assets",
  description:
    "See what we build. Using AI-forward web development.",
  alternates: {
    canonical: "/work",
  },
};

interface Project {
  title: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  status: string;
  url?: string;
  templateUrl?: string;
}

const projects: Project[] = [
  {
    title: "Majestic Pine Renovations",
    category: "Client Project",
    description:
      "Custom website for a construction contractor — project galleries, service pages, and lead generation forms built with modern web tooling.",
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Stack", value: "Full Build" },
      { label: "Type", value: "Business Site" },
    ],
    tags: ["Web Design", "Lead Generation", "Responsive"],
    status: "Live",
    url: "https://majesticpinerenovations.com",
  },
  {
    title: "Buselmeier Law — Live Site",
    category: "Client Project · What Ted Chose",
    description:
      "The real site in production. We presented multiple design directions; this is the one the client selected. Practice area pages, attorney profile, case results, and a legal AI assistant.",
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Version", value: "In Production" },
      { label: "Type", value: "Professional Site" },
    ],
    tags: ["Web Design", "Professional", "Client's Pick"],
    status: "Live",
    url: "https://tedbuselmeierlaw.com",
  },
  {
    title: "Buselmeier Law — Rendering A",
    category: "Design Direction · Light & Traditional",
    description:
      "A clean, conservative law-firm direction — light palette, serif typography, structured sections built around trust and readability.",
    metrics: [
      { label: "Status", value: "Live Demo" },
      { label: "Direction", value: "Light & Traditional" },
      { label: "Type", value: "Static Build" },
    ],
    tags: ["Concept", "Traditional", "Trust-First"],
    status: "Live Demo",
    url: "https://www.mlrassets.com/templates/ted-v1/index.html",
  },
  {
    title: "Buselmeier Law — Rendering B",
    category: "Design Direction · Cinematic & Motion",
    description:
      "An immersive, motion-forward alternative — dark palette, bold display type, animated hero. A second real direction for the same client.",
    metrics: [
      { label: "Status", value: "Live Demo" },
      { label: "Direction", value: "Cinematic & Motion" },
      { label: "Type", value: "React Build" },
    ],
    tags: ["Concept", "Motion Design", "Cinematic"],
    status: "Live Demo",
    url: "https://www.mlrassets.com/templates/ted-v2/index.html",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-mesh grain">
        <div className="container-custom px-4 md:px-6">
          <div className="max-w-3xl">
            <AnimatedSection>
              <p className="mono-label text-xs text-primary mb-3">Work</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Proof over
                <span className="gradient-text"> promises</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                We lead with outcomes. Every project page includes real
                metrics — load times, conversion rates, Lighthouse scores.
                Here&apos;s what we&apos;ve built so far.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container-custom px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            {projects.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 0.15}>
                <div className="glass-card glass-card-hover p-6 md:p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="mono-label text-xs text-primary">
                        {project.category}
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-text mt-1">
                        {project.title}
                      </h2>
                    </div>
                    <span
                      className={`px-3 py-1 mono-label text-[11px] border ${
                        project.status === "Live"
                          ? "bg-primary text-background border-primary"
                          : "bg-surface text-text-muted border-border"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-surface border border-border p-3 text-center"
                      >
                        <div className="text-lg font-bold gradient-text">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-text-muted uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 mono-label text-[11px] text-text-muted bg-surface border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono-label text-xs text-primary hover:underline mt-auto inline-flex items-center gap-1"
                    >
                      Visit live site →
                    </a>
                  )}
                  {project.templateUrl && (
                    <Link
                      href={project.templateUrl}
                      className="mono-label text-xs text-primary hover:underline mt-auto inline-flex items-center gap-1"
                    >
                      Preview template →
                    </Link>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Templates anchor and compact list */}
          <AnimatedSection className="mt-12" delay={0.2}>
            <div id="templates" className="glass-card p-6 md:p-8 max-w-3xl mx-auto">
              <p className="mono-label text-xs text-primary mb-2">Templates & Demos</p>
              <h3 className="text-xl font-bold text-text mb-3">Preview templates and earlier drafts</h3>
              <p className="text-sm text-text-secondary mb-4">
                These are demos and design iterations — not live client sites. Click any item to view the template in full.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link href="/templates/ted-v1/index.html" className="px-4 py-3 border border-border bg-surface text-text text-sm hover:bg-primary/5">
                  Ted — Cinematic Draft
                </Link>
                <Link href="/templates/ted-v2/index.html" className="px-4 py-3 border border-border bg-surface text-text text-sm hover:bg-primary/5">
                  Ted — React Build
                </Link>
                <Link href="/templates/ted-blue/index.html" className="px-4 py-3 border border-border bg-surface text-text text-sm hover:bg-primary/5">
                  Ted — Black &amp; Gold
                </Link>
                <Link href="/templates/atlaslume" className="px-4 py-3 border border-border bg-surface text-text text-sm hover:bg-primary/5">
                  AtlasLume — AI SaaS Demo
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Process CTA */}
          <AnimatedSection className="mt-12 text-center" delay={0.3}>
            <div className="glass-card p-8 md:p-10 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-text mb-3">Want to see how we build?</h3>
              <p className="text-sm text-text-secondary mb-6">
                We document our build process for every project. Ask us
                about our transparent workflow on your next project.
              </p>
              <Link href="/contact" className="btn-primary">
                Start a Project
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
