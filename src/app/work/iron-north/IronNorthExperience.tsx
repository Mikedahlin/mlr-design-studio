"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import s from "./IronNorth.module.css";

const projects = [
  {
    name: "Structural Retrofit",
    phase: "STRUCTURE",
    image: "/media/production/ironnorth/ironnorth-sparks-hero-CONCEPT.webp",
    materials: ["STEEL", "CONCRETE"],
    docs: ["Survey", "Existing conditions", "Sequence"]
  },
  {
    name: "Envelope Renewal",
    phase: "ENCLOSURE",
    image: "/media/production/ironnorth/ironnorth-glass-hero.webp",
    materials: ["TIMBER", "MEMBRANE"],
    docs: ["Details", "Product data", "Field record"]
  },
  {
    name: "Interior Rebuild",
    phase: "FINISH",
    image: "/media/production/ironnorth/ironnorth-concrete-hero-CONCEPT.webp",
    materials: ["STEEL", "WOOD"],
    docs: ["Selections", "Schedule", "Closeout"]
  }
];

export default function IronNorthExperience() {
  const [project, setProject] = useState(0);
  const [phase, setPhase] = useState(1);
  const [qualified, setQualified] = useState<string[]>([]);
  
  const p = projects[project];
  const toggle = (x: string) => setQualified(v => v.includes(x) ? v.filter(i => i !== x) : [...v, x]);

  return (
    <main className={s.site}>
      <header>
        <b>IRON NORTH / CONSTRUCTION SYSTEM</b>
        <span>CONCEPT PROJECT ARCHIVE</span>
        <Link href="/">RETURN TO MLR</Link>
      </header>

      <aside className={s.map}>
        <p>PROJECT MAP / 03 RECORDS</p>
        <div className={s.siteImage}>
          <Image src={p.image} alt="Illustrative construction site" fill priority sizes="380px" style={{ objectFit: "cover" }} />
        </div>
        
        {projects.map((x, i) => (
          <button key={x.name} aria-pressed={project === i} onClick={() => { setProject(i); setPhase(1); }}>
            <i>0{i + 1}</i>
            <span>{x.name}</span>
            <small>{x.phase}</small>
          </button>
        ))}
      </aside>

      <section className={s.ledger}>
        <div className={s.title}>
          <small>ACTIVE RECORD / IN-0{project + 1}</small>
          <h1>{p.name}</h1>
          <p>A fictional project record demonstrating how scope, materials, sequence, and documentation stay connected.</p>
        </div>
        
        <nav aria-label="Project phases">
          {["SITE", "STRUCTURE", "ENCLOSURE", "FINISH", "RECORD"].map((x, i) => (
            <button key={x} aria-pressed={phase === i} onClick={() => setPhase(i)}>
              <span>0{i + 1}</span>{x}
            </button>
          ))}
        </nav>
        
        <div className={s.record}>
          <article>
            <small>CURRENT PHASE</small>
            <h2>{["Existing conditions", "Primary assembly", "Weather boundary", "Interior completion", "Closeout record"][phase]}</h2>
            <p>{["Survey access, constraints, logistics, and observed conditions before scope assumptions.", "Sequence, temporary support, connections, inspections, and documented changes.", "Transitions, penetrations, water management, products, and field verification.", "Coordination, approved selections, tolerances, protection, and punch documentation.", "As-built information, warranties when applicable, product records, and completion notes."][phase]}</p>
          </article>
          
          <div>
            <small>MATERIAL REGISTER</small>
            {p.materials.map(x => (
              <span key={x}>{x}</span>
            ))}
            
            <small>DOCUMENT SET</small>
            {p.docs.map((x, i) => (
              <button key={x}>D0{i + 1} / {x} ↘</button>
            ))}
          </div>
        </div>
      </section>

      <aside className={s.qualify}>
        <p>PROJECT QUALIFICATION</p>
        <h2>Bring the record you have.</h2>
        {["Project type", "Location / jurisdiction", "Current stage", "Plans or documentation"].map(x => (
          <button key={x} aria-pressed={qualified.includes(x)} onClick={() => toggle(x)}>
            <i />{x}
          </button>
        ))}
        <p>{qualified.length}/4 CONTEXT ITEMS MARKED</p>
        <button disabled={qualified.length < 3}>CONTINUE INQUIRY {qualified.length < 3 ? "— ADD CONTEXT" : "→"}</button>
        <small>No bid, capacity, schedule, or project outcome is promised.</small>
      </aside>

      <footer>
        <span>FICTIONAL CONSTRUCTION CONCEPT</span>
        <span>NO CLIENTS / PROJECTS / RESULTS ARE CLAIMED</span>
      </footer>
    </main>
  );
}
