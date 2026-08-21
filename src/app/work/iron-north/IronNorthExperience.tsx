"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./IronNorth.module.css";

const projects = [
  {
    id: "p1",
    name: "Terminal 4 Expansion",
    phase: "Phase 3: Structural Steel",
    location: "MSP International",
    image: "/media/production/ironnorth/ironnorth-sparks-hero-CONCEPT.webp"
  },
  {
    id: "p2",
    name: "Riverfront Tower",
    phase: "Phase 1: Foundation Pour",
    location: "Downtown Minneapolis",
    image: "/media/production/ironnorth/ironnorth-concrete-hero-CONCEPT.webp"
  },
  {
    id: "p3",
    name: "Logistics Hub Alpha",
    phase: "Phase 4: Enclosure",
    location: "Lakeville, MN",
    image: "/media/production/ironnorth/ironnorth-sparks-card-CONCEPT.webp"
  }
];

export default function IronNorthExperience() {
  const [activeProject, setActiveProject] = useState(1);
  
  return (
    <main className={styles.site}>
      <header className={styles.header}>
        <Link href="/">RETURN TO MLR</Link>
        <span>IRON NORTH / COMMERCIAL CONSTRUCTION</span>
      </header>
      
      <section className={styles.hero}>
        <Image 
          src="/media/production/ironnorth/ironnorth-concrete-hero-CONCEPT.webp" 
          alt="Massive concrete foundation pour at a commercial site" 
          fill 
          priority 
          sizes="100vw" 
          className={styles.heroImage} 
        />
        <div className={styles.heroContent}>
          <h1>Iron North</h1>
          <p>Minnesota Steel. Serious Work.</p>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapContent}>
          <h2>Active Sites</h2>
          <p>We believe in transparency at scale. Track the structural progress of our current major commercial developments across the Midwest.</p>
          
          <div className={styles.projectList}>
            {projects.map((p, i) => (
              <button 
                key={p.id} 
                className={`${styles.projectBtn} ${activeProject === i ? styles.active : ''}`}
                onClick={() => setActiveProject(i)}
              >
                <div>
                  {p.name}
                  <br />
                  <span style={{ fontSize: '0.85rem', color: '#a0a0a0', fontWeight: 400 }}>{p.location}</span>
                </div>
                <span>{activeProject === i ? 'VIEWING' : 'VIEW'}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.mapVisual}>
          {projects.map((p, i) => (
            <Image 
              key={p.id}
              src={p.image}
              alt={`Project visual for ${p.name}`}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ opacity: activeProject === i ? 0.8 : 0, zIndex: activeProject === i ? 2 : 1 }}
            />
          ))}
          <div className={styles.mapOverlay}>
            <h3>{projects[activeProject].name}</h3>
            <p>{projects[activeProject].phase}</p>
          </div>
        </div>
      </section>

      <section className={styles.materials}>
        <h2>Forged Materials</h2>
        <div className={styles.materialGrid}>
          <div className={styles.materialCard}>
            <Image src="/media/production/ironnorth/ironnorth-sparks-hero-CONCEPT.webp" alt="Welder sparks" fill sizes="(max-width: 900px) 100vw, 33vw" />
            <h3>Structural Steel</h3>
          </div>
          <div className={styles.materialCard}>
            <Image src="/media/production/ironnorth/ironnorth-concrete-card-CONCEPT.webp" alt="Concrete pour" fill sizes="(max-width: 900px) 100vw, 33vw" />
            <h3>High-PSI Concrete</h3>
          </div>
          <div className={styles.materialCard}>
            <Image src="/media/production/ironnorth/ironnorth-sparks-card-CONCEPT.webp" alt="Welder sparks" fill sizes="(max-width: 900px) 100vw, 33vw" />
            <h3>Industrial Glass</h3>
          </div>
        </div>
      </section>

      <section className={styles.intake}>
        <h2>Bid Intake & Consultation</h2>
        <p>This is a simulated intake form for a commercial general contractor. In a live site, this would connect to a CRM or estimating team.</p>
        
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label>Project Name / RFQ Title</label>
            <input type="text" placeholder="e.g. Downtown Mixed-Use Tower" />
          </div>
          
          <div className={styles.formGroup}>
            <label>Scope of Work</label>
            <select>
              <option>Full General Contracting</option>
              <option>Concrete & Foundation</option>
              <option>Structural Steel</option>
              <option>Site Development</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label>Estimated Timeline</label>
            <select>
              <option>Q1 2027</option>
              <option>Q2 2027</option>
              <option>Q3 2027</option>
              <option>Q4 2027</option>
              <option>2028+</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label>Brief Description</label>
            <textarea rows={4} placeholder="Key details about the project..."></textarea>
          </div>
          
          <button type="submit" className={styles.submitBtn}>Submit for Review</button>
        </form>
      </section>
    </main>
  );
}
