import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Work | MLR Assets",
  description:
    "Real projects, live and visitable.",
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
      "Custom website for a construction contractor — project galleries, service pages, and lead generation.",
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
    title: "Buffalo King",
    category: "Interactive Experience",
    description:
      "A playable slot-machine experience with custom art, synchronized sound, and a live production build.",
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Type", value: "Game Experience" },
      { label: "Build", value: "Production" },
    ],
    tags: ["Interaction", "Motion", "Sound"],
    status: "Live",
    url: "https://buffalo-king.vercel.app/",
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
                Real work.
                <span className="gradient-text"> No promises.</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                Real projects, no invented numbers. The projects below are
                live � you can visit them yourself.
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

          {/* Process CTA */}
          <AnimatedSection className="mt-12 text-center" delay={0.3}>
            <div className="glass-card p-8 md:p-10 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-text mb-3">Want to see how I build??</h3>
              <p className="text-sm text-text-secondary mb-6">
                I walk you through the process at every step. Ask me
                about it � no mystery, no surprises.
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
