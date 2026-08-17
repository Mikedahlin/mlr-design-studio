"use client";

import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const models = [
  {
    title: "Contractor",
    code: "BUILD / 01",
    className: "contractor",
    blurb: "A heavy-duty construction brand with a grounded, tool-first aesthetic. Bold typography, exposed grid, and a no-nonsense portfolio layout built for winning bids.",
  },
  {
    title: "Restaurant",
    code: "HOSPITALITY / 02",
    className: "restaurant",
    blurb: "A warm, editorial dining experience. Rich photography, generous whitespace, and a menu-first flow that turns first-time visitors into reservations.",
  },
  {
    title: "Law Firm",
    code: "LEGAL / 03",
    className: "law",
    blurb: "Authority without the boilerplate. A restrained, column-driven system with a calm hierarchy that reads instantly as trustworthy.",
  },
  {
    title: "Fitness Studio",
    code: "FITNESS / 04",
    className: "fitness",
    blurb: "High-energy, high-contrast coaching brand. Sharp diagonal motion, big stat blocks, and a schedule-first layout built to fill classes.",
  },
  {
    title: "Real Estate",
    code: "PROPERTY / 05",
    className: "realestate",
    blurb: "Prestige real estate with a gallery-grade feel. Full-bleed listings, refined serif headlines, and a lead flow that closes on trust.",
  },
];

function ModelArtwork({ kind }: { kind: string }) {
  if (kind === "restaurant") {
    return (
      <svg viewBox="0 0 1200 760" role="presentation">
        <path d="M70 86h1060v590H70zM70 154h1060M160 154v522M1040 154v522" />
        <path d="M280 154v186M600 154v186M920 154v186" />
        <circle cx="280" cy="372" r="34" /><circle cx="600" cy="372" r="34" /><circle cx="920" cy="372" r="34" />
        <path d="M240 510h720M300 510l-56 166M900 510l56 166M398 510v166M802 510v166" />
        <path d="M238 478h724l-52-86H290zM96 640h1008" />
      </svg>
    );
  }

  if (kind === "law") {
    return (
      <svg viewBox="0 0 1200 760" role="presentation">
        <path d="M170 246h860L600 66zM216 246v64h768v-64M170 650h860v64H170z" />
        <path d="M260 310v340M410 310v340M560 310v340M710 310v340M860 310v340M1010 310v340" />
        <path d="M530 410h140M600 340v230M480 426l-74 128h148zM720 426l-74 128h148z" />
        <circle cx="600" cy="324" r="18" />
      </svg>
    );
  }

  if (kind === "fitness") {
    return (
      <svg viewBox="0 0 1200 760" role="presentation">
        <path d="M90 92h1020v578H90zM90 164h1020M170 164v506M1030 164v506" />
        <path d="M254 478h692M342 478v192M858 478v192M422 554h356" />
        <path d="M474 390h252M516 350v80M684 350v80M442 366v48M758 366v48" />
        <circle cx="600" cy="286" r="58" /><path d="M552 286h96M600 238v96" />
        <path d="M184 250h210v140H184zM806 250h210v140H806z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1200 760" role="presentation">
      <path d="M82 666h1036M174 666V344l426-238 426 238v322" />
      <path d="M260 666V386l340-188 340 188v280M600 198v468" />
      <path d="M328 666V470h182v196M690 666V438h172v228" />
      <path d="M342 486h154M704 454h144M206 362h788" />
      <circle cx="600" cy="392" r="72" /><path d="M528 392h144M600 320v144" />
      {kind === "realestate" && <path d="M120 136h260M120 166h188M820 112h260M892 142h188" />}
    </svg>
  );
}

function ModelCard({
  model,
  index,
  progress,
  onClick,
}: {
  model: (typeof models)[number];
  index: number;
  progress: MotionValue<number>;
  onClick: () => void;
}) {
  const start = index * .19;
  const end = start + .085;
  const scale = useTransform(progress, [start, end], [.7 - index * .012, 1]);
  const y = useTransform(progress, [start, end], [`${58 + index * 5}vh`, "0vh"]);
  const radius = useTransform(progress, [start, end], [34, 18]);

  return (
    <motion.button
      type="button"
      className={`model-stack__card model-stack__card--${model.className}`}
      style={{ scale, y, borderRadius: radius, zIndex: index + 1 }}
      onClick={onClick}
      aria-label={`Open ${model.title} model site`}
    >
      <div className="model-stack__chrome">
        <b>FOUNDATION</b>
        <span>WORK&nbsp;&nbsp;&nbsp; ABOUT&nbsp;&nbsp;&nbsp; CONTACT</span>
      </div>
      <div className="model-stack__visual" aria-hidden="true">
        <ModelArtwork kind={model.className} />
        <span /><span /><span />
      </div>
      <div className="model-stack__copy">
        <small>{model.code}</small>
        <h2>{model.title}</h2>
      </div>
      <div className="model-stack__foot"><span>OPEN</span><b>↗</b></div>
    </motion.button>
  );
}

export default function ModelSitesStack({
  openIndex,
  onRequestOpen,
  onClose,
}: {
  openIndex: number | null;
  onRequestOpen: (index: number) => void;
  onClose: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const activeModel = openIndex !== null ? models[openIndex] : null;

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, onClose]);

  return (
    <section ref={sectionRef} className="model-stack" aria-label="Model website examples">
      <div className="model-stack__sticky">
        <div className="model-stack__label">MODEL SITES / SCROLL TO EXPAND</div>
        {models.map((model, index) => (
          <ModelCard
            key={model.title}
            model={model}
            index={index}
            progress={scrollYProgress}
            onClick={() => onRequestOpen(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeModel && (
          <motion.div
            className="model-stack__modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeModel.title} model site`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
          >
            <motion.div
              className="model-stack__modal-card"
              initial={{ y: 24, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 12, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="model-stack__modal-close" onClick={onClose} aria-label="Close">
                CLOSE ✕
              </button>
              <div className={`model-stack__modal-visual model-stack__modal-visual--${activeModel.className}`} aria-hidden="true">
                <ModelArtwork kind={activeModel.className} />
              </div>
              <div className="model-stack__modal-body">
                <small>{activeModel.code}</small>
                <h2>{activeModel.title}</h2>
                <p>{activeModel.blurb}</p>
                <div className="model-stack__modal-cta">
                  <span>VIEW LIVE SITE</span>
                  <b>↗</b>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
