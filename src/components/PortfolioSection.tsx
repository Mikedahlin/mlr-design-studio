"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Ted Buselmeier Law",
    description:
      "Live client site for a Minnesota law firm. Clean, authoritative, and built to instill trust before the first call.",
    url: "https://tedbuselmeierlaw.com",
    tag: "Live Client",
  },
  {
    title: "Majestic Pine Renovations",
    description:
      "Live client site for a Minnesota home renovation company. Built to rank locally and convert on mobile.",
    url: "https://majesticpinerenovations.com",
    tag: "Live Client",
  },
  {
    title: "Templates & Demos",
    description:
      "Not live businesses — demo templates and earlier drafts. Click to preview the templates and demos on the Work page.",
    url: "/work#templates",
    tag: "Not Live / Demo",
  },
];

function PortfolioCard({
  title,
  description,
  url,
  tag,
  index,
}: (typeof projects)[0] & { index: number }) {
  const isExternal = url.startsWith("http");

  return (
    <motion.a
      href={url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group block h-full glass-card glass-card-hover overflow-hidden"
    >
      {/* Live preview / placeholder */}
      <div className="relative w-full aspect-video overflow-hidden border-b border-border bg-surface flex items-center justify-center">
        {isExternal ? (
          <iframe
            src={url}
            title={title}
            className="w-full h-full pointer-events-none"
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted"> 
            <div className="text-center p-6">
              <div className="mb-2 text-sm mono-label text-text-muted">Templates & Demos</div>
              <div className="text-xs text-text-secondary">Preview multiple templates on the Work page</div>
            </div>
          </div>
        )}
        {/* Click-through overlay so the whole card is the link */}
        <div className="absolute inset-0" />
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-extrabold uppercase tracking-tight leading-snug text-text">
            {title}
          </h3>
          <span className="mono-label flex-shrink-0 text-[10px] px-2 py-1 border border-primary text-primary">
            {tag}
          </span>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          {description}
        </p>
        <span className="btn-primary inline-block w-full text-center">
          Open Site ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function PortfolioSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-custom px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="mono-label text-[11px] text-primary mb-3">
            {"/// Our Work"}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-text mb-4">
            Real sites. <span className="text-primary">Click them.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl border-t border-border pt-4">
            Every site below is real and live — click any card to open it in a
            new tab and look around. No templates, no recycled layouts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <PortfolioCard key={project.url} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
