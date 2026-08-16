"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import s from "./HomepageFoldingNav.module.css";

type PanelName = "services" | "work" | "studio";

const panels: Record<PanelName, { label: string; eyebrow: string; links: Array<{ label: string; detail: string; href: string; external?: boolean }> }> = {
  services: {
    label: "SERVICES",
    eyebrow: "Strategy through launch",
    links: [
      { label: "Websites + development", detail: "Custom, responsive digital systems", href: "/services#websites" },
      { label: "Brand identity", detail: "Identity, campaign, and graphic design", href: "/services#brand" },
      { label: "Renderings + visual production", detail: "Architecture, product, and spatial imagery", href: "/services#visuals" },
      { label: "Video + motion", detail: "Films, loops, interaction, and launch media", href: "/services#motion" },
      { label: "SEO + performance", detail: "Search foundations, speed, and accessibility", href: "/services#performance" },
    ],
  },
  work: {
    label: "WORK",
    eyebrow: "Client work + studio concepts",
    links: [
      { label: "Featured projects", detail: "Explore the six-project wheel", href: "/work#featured" },
      { label: "Complete archive", detail: "Browse client and concept work", href: "/work" },
      { label: "Majestic Pine Renovations", detail: "Client website + project presentation", href: "/work#majestic-pine" },
      { label: "Case studies", detail: "Strategy, systems, and process", href: "/work#case-studies" },
    ],
  },
  studio: {
    label: "STUDIO",
    eyebrow: "Direct creative partnership",
    links: [
      { label: "About MLR", detail: "Independent, hands-on creative direction", href: "/about" },
      { label: "Process", detail: "Brief, build, refine, and launch", href: "/about#process" },
      { label: "Ownership + portability", detail: "Own the agreed work; hosting remains flexible", href: "/about#ownership" },
      { label: "Start a project", detail: "Tell us what you are building", href: "/contact" },
    ],
  },
};

export default function HomepageFoldingNav() {
  const [open, setOpen] = useState<PanelName | null>(null);
  const root = useRef<HTMLElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (open && root.current && !root.current.contains(event.target as Node)) setOpen(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <nav ref={root} className={s.nav} aria-label="Studio navigation">
      <div className={s.tabs}>
        {(Object.keys(panels) as PanelName[]).map((name) => {
          const panelId = `${uid}-${name}-panel`;
          return (
            <button
              key={name}
              type="button"
              className={open === name ? s.activeTab : s.tab}
              aria-expanded={open === name}
              aria-controls={panelId}
              onClick={() => setOpen((current) => (current === name ? null : name))}
            >
              <span>{panels[name].label}</span><i aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {(Object.keys(panels) as PanelName[]).map((name) => {
        const panel = panels[name];
        const visible = open === name;
        return (
          <section
            key={name}
            id={`${uid}-${name}-panel`}
            className={visible ? s.panelOpen : s.panel}
            aria-hidden={!visible}
            inert={!visible}
          >
            <header><small>{panel.eyebrow}</small><strong>{panel.label}</strong></header>
            <div className={s.linkList}>
              {panel.links.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setOpen(null)}>
                  <span>{item.label}</span><small>{item.detail}</small><b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
            <button className={s.mobileClose} type="button" onClick={() => setOpen(null)}>CLOSE</button>
          </section>
        );
      })}
    </nav>
  );
}
