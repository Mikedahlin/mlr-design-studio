"use client";

import { useState, type CSSProperties } from "react";
import { ServiceArtwork, services } from "./ServiceReel";

export default function CircularReelCandidate() {
  const [selected, setSelected] = useState<(typeof services)[number] | null>(null);
  return (
    <main className="circular-source-preview">
      <section className={"service-reel" + (selected ? " service-reel--selected" : "")} aria-label="Circular service reel archive candidate">
        <div className="service-reel__halo" aria-hidden="true" />
        <div className="service-reel__orbit service-reel__orbit--back" aria-hidden="true" />
        <div className="service-reel__stage">
          <div className="service-reel__track">
            {services.map((service, index) => (
              <button type="button" className="service-reel__card" style={{ "--i": index } as CSSProperties} key={service.kind} onClick={() => setSelected(service)}>
                <span className="service-reel__card-number">0{index + 1}</span>
                <ServiceArtwork kind={service.kind} />
                <strong>{service.name}</strong>
              </button>
            ))}
          </div>
        </div>
        <div className="service-reel__orbit service-reel__orbit--front" aria-hidden="true" />
        {selected && (
          <div className="service-reel__focus">
            <button type="button" className="service-reel__focus-card" onClick={() => setSelected(null)}>
              <span>SELECTED SERVICE</span><ServiceArtwork kind={selected.kind} /><strong>{selected.name}</strong><small>CLICK TO CLOSE</small>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
