"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./VelvetRoom.module.css";

const services = {
  Cut: [["The Signature Cut", "$95+"], ["Fringe / Shape Refresh", "$45+"], ["Transformation Cut", "$145+"]],
  Color: [["Gloss & Tone", "$90+"], ["Dimensional Color", "$225+"], ["Creative Color", "$310+"]],
  Ritual: [["Scalp & Silk Ritual", "$75+"], ["Event Finish", "$110+"], ["Texture Styling", "$125+"]],
} as const;

type ServiceKey = keyof typeof services;
const questions = [
  { title: "Your texture", options: ["Straight / fine", "Wavy / medium", "Curly / coily"] },
  { title: "Your rhythm", options: ["Low-maintenance", "Polished routine", "I love the ritual"] },
  { title: "Your direction", options: ["Subtle refinement", "Noticeable change", "Full transformation"] },
];
const bookingSteps = ["Service", "Artist", "Time", "Details"];

function Monogram() {
  return <svg className={styles.mark} viewBox="0 0 72 72" role="img" aria-label="Velvet Room folded V monogram"><path d="M8 13h19l9 35 9-35h19L44 61H28L8 13Z"/><path d="M27 13h18l-9 35-9-35Z"/></svg>;
}

export default function VelvetRoomExperience() {
  const [category, setCategory] = useState<ServiceKey>("Cut");
  const [answers, setAnswers] = useState([questions[0].options[0], questions[1].options[0], questions[2].options[0]]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    document.body.classList.add("velvetRoomConcept");
    return () => document.body.classList.remove("velvetRoomConcept");
  }, []);

  const setAnswer = (index: number, value: string) => setAnswers(current => current.map((item, i) => i === index ? value : item));

  return <main className={styles.shell}>
    <nav className={styles.nav} aria-label="Velvet Room navigation">
      <a className={styles.brand} href="#top"><Monogram /><span>Velvet Room<small>Salon concept</small></span></a>
      <div className={styles.navLinks}><a href="#services">Services</a><a href="#consultation">Consult</a><a href="#interior">The room</a></div>
      <a className={styles.bookLink} href="#booking">Book a sitting</a>
    </nav>

    <header className={styles.hero} id="top">
      <Image src="/media/velvet-room/velvet-room-hero.png" alt="Editorial view of the fictional Velvet Room salon" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={styles.heroCopy}><p className={styles.eyebrow}>A study in texture · color · form</p><h1>Enter the<br/><em>Velvet Room.</em></h1><p>A fictional salon concept where considered craft meets a richly personal ritual.</p><a href="#consultation" className={styles.primary}>Begin your consultation <span>↘</span></a></div>
      <p className={styles.vertical}>Editorial salon experience — Concept 01</p>
    </header>

    <section className={styles.services} id="services">
      <div className={styles.sectionHead}><p className={styles.eyebrow}>The service edit</p><h2>Considered,<br/><em>never prescribed.</em></h2><p>Starting prices are illustrative and may change after an in-person assessment of length, density, and desired result.</p></div>
      <div className={styles.servicePanel}>
        <div className={styles.tabs} role="tablist" aria-label="Service categories">
          {(Object.keys(services) as ServiceKey[]).map(item => <button key={item} role="tab" aria-selected={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className={styles.priceList} role="tabpanel" aria-live="polite">
          {services[category].map(([name, price], i) => <div key={name}><span>0{i + 1}</span><h3>{name}</h3><strong>{price}</strong></div>)}
        </div>
      </div>
    </section>

    <section className={styles.consult} id="consultation">
      <div className={styles.consultImage}><Image src="/media/velvet-room/velvet-room-consultation.png" alt="Hair swatches and consultation materials" fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
      <div className={styles.consultBody}><p className={styles.eyebrow}>Visual consultation</p><h2>Tell us what<br/>feels like <em>you.</em></h2>
        <div className={styles.questions}>{questions.map((q, index) => <fieldset key={q.title}><legend><span>0{index + 1}</span>{q.title}</legend><div>{q.options.map(option => <button type="button" className={answers[index] === option ? styles.selected : ""} aria-pressed={answers[index] === option} key={option} onClick={() => setAnswer(index, option)}>{option}</button>)}</div></fieldset>)}</div>
        <aside className={styles.summary} aria-live="polite"><p>Your consultation note</p><strong>{answers.join(" · ")}</strong><span>Bring this direction to a real consultation; it is not a diagnosis or confirmed service plan.</span></aside>
      </div>
    </section>

    <section className={styles.booking} id="booking">
      <div><p className={styles.eyebrow}>Booking demonstration</p><h2>Reserve the<br/><em>ritual.</em></h2><p>This four-step interface is a visual demo only. It does not collect information or create an appointment.</p></div>
      <div className={styles.bookingCard}>
        <ol>{bookingSteps.map((label, i) => <li className={i === step ? styles.activeStep : i < step ? styles.done : ""} key={label}><span>{i < step ? "✓" : i + 1}</span>{label}</li>)}</ol>
        <div className={styles.demoPane}><p>Step {step + 1} of 4</p><h3>{bookingSteps[step]}</h3><p>{["Choose a service category to begin.", "Match with an available artist profile.", "Select an example date and time.", "Review your fictional appointment details."][step]}</p><div className={styles.demoOptions}><button type="button">Option A</button><button type="button">Option B</button></div></div>
        <div className={styles.controls}><button type="button" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>Back</button><button type="button" onClick={() => setStep(s => s === 3 ? 0 : s + 1)}>{step === 3 ? "Restart demo" : "Continue"}</button></div>
      </div>
    </section>

    <section className={styles.interior} id="interior">
      <Image src="/media/velvet-room/velvet-room-interior.png" alt="Oxblood and cream interior of the fictional salon" fill sizes="100vw" />
      <div className={styles.interiorCopy}><p className={styles.eyebrow}>Inside the room</p><h2>Quiet glamour.<br/><em>Unhurried care.</em></h2><p>Imagined as a tactile retreat: lacquered cherry, brushed brass, softened light, and room to exhale.</p></div>
    </section>

    <section className={styles.notes}>
      <article><span>01</span><h3>Before your sitting</h3><p>Arrive with hair in its natural state when possible. Bring reference images and share color history, sensitivities, accessibility needs, and your daily routine.</p></article>
      <article><span>02</span><h3>Example cancellation policy</h3><p>As an illustrative policy, changes within 24 hours could incur 50% of the reserved service; missed appointments could incur 100%. No fees are actually charged here.</p></article>
    </section>

    <footer className={styles.footer}><Monogram /><p><strong>Velvet Room is a fictional portfolio concept.</strong><br/>No salon, artists, appointments, prices, or availability represented here are real.</p><a href="#top">Return to top ↑</a></footer>
  </main>;
}
