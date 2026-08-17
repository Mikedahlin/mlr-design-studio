"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type ServiceKind = "web" | "logo" | "home" | "commercial" | "graphic";

export const services: { name: string; kind: ServiceKind }[] = [
  { name: "Website Design", kind: "web" },
  { name: "Logo Design", kind: "logo" },
  { name: "Home Renderings", kind: "home" },
  { name: "Commercial Renderings", kind: "commercial" },
  { name: "Graphic Design", kind: "graphic" },
];

export function ServiceArtwork({ kind }: { kind: ServiceKind }) {
  const shared = {
    viewBox: "0 0 420 300",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  if (kind === "web") {
    return <svg {...shared}><rect x="28" y="28" width="364" height="244" rx="4" stroke="currentColor"/><path d="M28 68H392" stroke="currentColor"/><circle cx="49" cy="48" r="4" fill="currentColor"/><circle cx="65" cy="48" r="4" fill="currentColor" opacity=".5"/><path d="M52 216L127 120L178 179L228 112L367 232" stroke="currentColor" strokeWidth="3"/><circle cx="305" cy="111" r="28" stroke="currentColor"/><path d="M53 89H155M53 105H125" stroke="currentColor" opacity=".55"/></svg>;
  }

  if (kind === "logo") {
    return <svg {...shared}><circle cx="210" cy="150" r="116" stroke="currentColor" opacity=".2"/><circle cx="210" cy="150" r="91" stroke="currentColor" strokeDasharray="3 9"/><path d="M123 229V71L210 190L297 71V229" stroke="currentColor" strokeWidth="18" strokeLinejoin="bevel"/><circle cx="210" cy="150" r="10" fill="currentColor"/></svg>;
  }

  if (kind === "home") {
    return <svg {...shared}><path d="M31 246H389M58 235V133L205 44L363 133V235" stroke="currentColor" strokeWidth="2"/><path d="M24 143L205 32L396 143M205 32V235" stroke="currentColor"/><path d="M81 142H179V235H81V142ZM229 142H337V202H229V142Z" stroke="currentColor"/><path d="M244 155H323V189H244V155ZM107 160H153V202H107V160Z" stroke="currentColor" opacity=".55"/></svg>;
  }

  if (kind === "commercial") {
    return <svg {...shared}><path d="M31 246H389V94L289 44L31 115V246Z" stroke="currentColor" strokeWidth="2"/><path d="M31 115L289 44V246M82 101V246M137 86V246M194 71V246M246 57V246M289 93H389M289 139H389M289 186H389" stroke="currentColor" opacity=".72"/><path d="M47 129H67V231H47zM99 113H120V231H99zM155 98H177V231H155zM211 83H233V231H211z" fill="currentColor" opacity=".13"/></svg>;
  }

  return <svg {...shared}><rect x="79" y="24" width="262" height="252" stroke="currentColor"/><circle cx="187" cy="118" r="75" fill="currentColor"/><circle cx="222" cy="84" r="75" fill="#09090a"/><path d="M105 205H315" stroke="currentColor" strokeWidth="13"/><path d="M105 229H278M105 250H236" stroke="currentColor" strokeWidth="5"/><rect x="285" y="225" width="30" height="30" fill="currentColor"/></svg>;
}

function ReelCard({ service, duplicate }: { service: (typeof services)[number]; duplicate?: boolean }) {
  return (
    <button
      type="button"
      className="foundation-reel__card"
      aria-label={duplicate ? undefined : `View ${service.name}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : 0}
    >
      <ServiceArtwork kind={service.kind} />
      <strong>{service.name}</strong>
    </button>
  );
}

export default function ServiceReel() {
  const [selected, setSelected] = useState<(typeof services)[number] | null>(null);
  const top = [...services, ...services];
  const bottomBase = [services[2], services[4], services[0], services[3], services[1]];
  const bottom = [...bottomBase, ...bottomBase];

  return (
    <section className="foundation-reel" aria-label="Creative services reel">
      <div className="foundation-reel__shell">
        <div className="foundation-reel__rim foundation-reel__rim--top" aria-hidden="true" />
        <div className="foundation-reel__belt foundation-reel__belt--top">
          <div className="foundation-reel__track">
            {top.map((service, index) => (
              <div key={`${service.kind}-top-${index}`} onClick={() => setSelected(service)}>
                <ReelCard service={service} duplicate={index >= services.length} />
              </div>
            ))}
          </div>
        </div>
        <div className="foundation-reel__belt foundation-reel__belt--bottom">
          <div className="foundation-reel__track foundation-reel__track--offset">
            {bottom.map((service, index) => (
              <div key={`${service.kind}-bottom-${index}`} onClick={() => setSelected(service)}>
                <ReelCard service={service} duplicate={index >= bottomBase.length} />
              </div>
            ))}
          </div>
        </div>
        <div className="foundation-reel__rim foundation-reel__rim--bottom" aria-hidden="true" />
      </div>
      <div className="foundation-reel__desktop-note">AUTOMATIC REEL</div>
      <div className="foundation-reel__mobile-note">← SWIPE TO SPIN →</div>

      <AnimatePresence>
        {selected && (
          <motion.div className="foundation-reel__focus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.button
              type="button"
              initial={{ scale: .8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: .86, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={() => setSelected(null)}
            >
              <ServiceArtwork kind={selected.kind} />
              <strong>{selected.name}</strong>
              <small>CLICK TO CLOSE</small>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
