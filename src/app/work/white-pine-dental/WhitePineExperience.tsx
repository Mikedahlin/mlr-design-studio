"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import styles from "./WhitePineDental.module.css";

const treatments = [
  {
    id: "preventive",
    label: "Preventive",
    title: "Keep small concerns small.",
    text: "Routine exams, professional cleanings, digital imaging when appropriate, fluoride, and personalized home-care coaching.",
    items: ["Exams & cleanings", "Gum health", "Night guards"],
  },
  {
    id: "restorative",
    label: "Restorative",
    title: "Repair with a long view.",
    text: "Conservative plans to restore comfort and function, explained with clear options and time for your questions.",
    items: ["Tooth-colored fillings", "Crowns & bridges", "Root canal care"],
  },
  {
    id: "cosmetic",
    label: "Cosmetic",
    title: "Confident, still-you smiles.",
    text: "Thoughtful aesthetic care shaped around your goals, oral health, and a result that feels natural to you.",
    items: ["Professional whitening", "Bonding", "Veneer consultations"],
  },
  {
    id: "family",
    label: "Family care",
    title: "One familiar place for every age.",
    text: "Age-aware visits with gentle pacing, prevention-first guidance, and room for parents and kids to feel at ease.",
    items: ["Children’s visits", "Sealants", "Healthy habit coaching"],
  },
];

const steps = ["Service", "Timing", "Your details"];

function PineMark() {
  return <svg className={styles.pineMark} viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5 12 20h7l-10 12h11v10h8V32h11L29 20h7L24 5Z"/><path className={styles.smileCut} d="M15 29c5.2 5.8 12.8 5.8 18 0"/></svg>;
}

export default function WhitePineExperience() {
  useEffect(() => { document.body.classList.add("whitePineConcept"); return () => document.body.classList.remove("whitePineConcept"); }, []);
  const [treatment, setTreatment] = useState(treatments[0]);
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [timing, setTiming] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className={styles.site}>
      <a className={styles.skip} href="#main">Skip to content</a>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="White Pine Dental home">
          <span className={styles.mark}><PineMark /></span>
          <span>White Pine <b>Dental</b></span>
        </a>
        <nav className={styles.nav} aria-label="Practice navigation">
          <a href="#care">Care</a><a href="#visit">Your visit</a><a href="#resources">Resources</a>
        </nav>
        <a className={styles.navCta} href="#request">Book a visit</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top">
          <Image className={styles.heroImage} src="/media/production/whitepine/whitepine-chair-card-CONCEPT.webp" alt="A serene White Pine Dental practice interior" fill priority sizes="100vw" />
          <div className={styles.heroShade} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>North woods calm · modern dental care</p>
            <h1>Care that makes room <em>for you.</em></h1>
            <p className={styles.lede}>Unhurried conversations, understandable options, and a comfort-first approach for Minnesota families.</p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="#visit">I’m a new patient</a>
              <a className={styles.secondary} href="#request">Book a visit</a>
            </div>
          </div>
          <aside className={styles.heroNote} aria-label="Practice approach"><span>Our approach</span><strong>Listen first.<br />Plan together.</strong></aside>
        </section>

        <section className={styles.intro} aria-labelledby="welcome-heading">
          <div><p className={styles.kicker}>A gentler rhythm</p><h2 id="welcome-heading">The confidence of clear care. The comfort of being known.</h2></div>
          <div><p>Dental care should feel collaborative—not rushed or confusing. We pair attentive clinical care with plain-language guidance, sensory-conscious comforts, and choices you can understand.</p><ul className={styles.checks}><li>Time reserved for questions</li><li>Comfort preferences noted</li><li>Costs reviewed before treatment</li></ul></div>
        </section>

        <section className={styles.care} id="care" aria-labelledby="care-heading">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>Explore your care</p><h2 id="care-heading">Start with what you need.</h2></div><p>From everyday prevention to restoring a tooth, every plan begins with a conversation.</p></div>
          <div className={styles.explorer}>
            <div className={styles.tabs} role="tablist" aria-label="Treatment categories">
              {treatments.map((item) => <button key={item.id} role="tab" aria-selected={treatment.id === item.id} aria-controls="treatment-panel" id={`tab-${item.id}`} onClick={() => setTreatment(item)}>{item.label}<span aria-hidden="true">→</span></button>)}
            </div>
            <div className={styles.treatmentPanel} role="tabpanel" id="treatment-panel" aria-labelledby={`tab-${treatment.id}`}>
              <span className={styles.pineIcon} aria-hidden="true">♧</span><p className={styles.kicker}>{treatment.label}</p><h3>{treatment.title}</h3><p>{treatment.text}</p><ul>{treatment.items.map((item) => <li key={item}>{item}</li>)}</ul><a href="#request">Ask about this care <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className={styles.visit} id="visit" aria-labelledby="visit-heading">
          <div className={styles.visitMedia}><Image src="/media/production/whitepine/whitepine-macro-tools-hero-CONCEPT.webp" alt="A calm consultation corner with pale pine furnishings" fill sizes="(max-width: 850px) 100vw, 42vw" /></div>
          <div className={styles.visitCopy}><p className={styles.kicker}>Your first visit</p><h2 id="visit-heading">Come as you are. We’ll take it from there.</h2><p>A first appointment is for understanding your health, priorities, and comfort preferences. Treatment is never assumed.</p><div className={styles.callout}><strong>Prefer a quieter visit?</strong><span>Tell us when you request an appointment. We can note pacing, breaks, and communication preferences.</span></div></div>
          <div className={styles.checklist}><h3>Before you arrive</h3><ol><li><span>01</span><div><strong>Bring your essentials</strong><p>Photo ID, insurance card if using benefits, and a current medication list.</p></div></li><li><span>02</span><div><strong>Share what matters</strong><p>Previous records, current concerns, and anything that helps you feel comfortable.</p></div></li><li><span>03</span><div><strong>Plan a little time</strong><p>Arrive 10 minutes early for forms and an unrushed welcome.</p></div></li></ol></div>
        </section>

        <section className={styles.request} id="request" aria-labelledby="request-heading">
          <div className={styles.requestIntro}><p className={styles.kicker}>Appointment request</p><h2 id="request-heading">Let’s find a good time.</h2><p>This three-step form demonstrates a possible booking experience.</p><div className={styles.demoBadge}>Concept demo · Not connected to a dental practice</div></div>
          <div className={styles.formCard}>
            <ol className={styles.progress} aria-label="Appointment request progress">{steps.map((label, index) => <li key={label} className={step >= index + 1 ? styles.current : ""} aria-current={step === index + 1 ? "step" : undefined}><span>{index + 1}</span>{label}</li>)}</ol>
            {submitted ? <div className={styles.confirm} role="status"><span aria-hidden="true">✓</span><h3>Demo complete</h3><p>No appointment was sent and no information was stored. In a live experience, the practice would follow up to confirm availability.</p><button type="button" onClick={() => { setSubmitted(false); setStep(1); }}>Start over</button></div> :
            <form onSubmit={submitDemo}>
              {step === 1 && <fieldset><legend>1. What can we help with?</legend><p>Select the closest match. A real care team would confirm the right visit type.</p><div className={styles.choiceGrid}>{["New patient exam", "Cleaning & checkup", "Specific concern", "Cosmetic consultation"].map(value => <label key={value}><input required type="radio" name="service" value={value} checked={service === value} onChange={() => setService(value)} /><span>{value}</span></label>)}</div><button className={styles.formNext} type="button" disabled={!service} onClick={() => setStep(2)}>Continue to timing →</button></fieldset>}
              {step === 2 && <fieldset><legend>2. When works best?</legend><p>Choose a general preference; this demo does not show live availability.</p><div className={styles.choiceGrid}>{["Weekday mornings", "Weekday afternoons", "As soon as available", "I’m flexible"].map(value => <label key={value}><input required type="radio" name="timing" value={value} checked={timing === value} onChange={() => setTiming(value)} /><span>{value}</span></label>)}</div><div className={styles.formButtons}><button type="button" onClick={() => setStep(1)}>← Back</button><button className={styles.formNext} type="button" disabled={!timing} onClick={() => setStep(3)}>Continue to details →</button></div></fieldset>}
              {step === 3 && <fieldset><legend>3. How could we reach you?</legend><p>For this concept demo, use placeholder information only. Nothing is submitted or stored.</p><div className={styles.fields}><label>First name<input required name="name" autoComplete="given-name" placeholder="Sample name" /></label><label>Email<input required type="email" name="email" autoComplete="email" placeholder="sample@example.com" /></label><label>Phone <span>(optional)</span><input type="tel" name="phone" autoComplete="tel" placeholder="(555) 555-0123" /></label></div><label className={styles.consent}><input required type="checkbox" /> I understand this is a non-functional concept demo.</label><div className={styles.formButtons}><button type="button" onClick={() => setStep(2)}>← Back</button><button className={styles.formNext} type="submit">Complete demo</button></div></fieldset>}
            </form>}
          </div>
        </section>

        <section className={styles.resources} id="resources" aria-labelledby="resources-heading">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>Practical resources</p><h2 id="resources-heading">Know what to expect.</h2></div><p>Clear information helps you make decisions with less stress.</p></div>
          <div className={styles.resourceGrid}>
            <article><span>Coverage</span><h3>Insurance & benefits</h3><p>A live practice could verify many PPO plans as a courtesy and provide an estimate before care. Coverage varies; your insurer determines final benefits.</p><a href="#request">Request a benefits conversation →</a></article>
            <article><span>Payment</span><h3>Flexible ways to plan</h3><p>Transparent estimates, major payment methods, and third-party financing options may help make care more manageable. Approval and terms would vary.</p><a href="#request">Ask about payment options →</a></article>
            <article><span>Learning</span><h3>Your five-minute guide</h3><p>Learn why gums bleed, what sensitivity can mean, how to choose a toothbrush, and what happens during a crown visit—in useful, plain language.</p><a href="#education">Browse patient education ↓</a></article>
          </div>
        </section>

        <section className={styles.education} id="education" aria-labelledby="education-heading"><div className={styles.educationFeature}><div className={styles.editorialImage}><Image src="/media/production/whitepine/whitepine-chair-card-CONCEPT.webp" alt="A toothbrush, floss, porcelain cup, and white-pine sprig arranged for patient education" fill sizes="(max-width: 850px) 100vw, 50vw" /></div><div><p className={styles.kicker}>Patient education</p><h2 id="education-heading">Small habits. Meaningful protection.</h2><p>Consistent basics matter: brush gently twice daily with fluoride toothpaste, clean between teeth, and keep a preventive schedule recommended for your needs.</p></div></div><div className={styles.tipList}><details><summary>Making brushing more effective <span>+</span></summary><p>Use a soft-bristled brush, light pressure, and take two minutes. Ask your dental professional for technique guidance tailored to you.</p></details><details><summary>Understanding tooth sensitivity <span>+</span></summary><p>Sensitivity has many possible causes. Note what triggers it and how long it lasts, then discuss it with a licensed dental professional.</p></details><details><summary>Helping kids build healthy routines <span>+</span></summary><p>Keep the routine predictable, model it together, and let children choose an age-appropriate toothbrush. Supervise based on their needs.</p></details></div></section>

        <section className={styles.emergency} aria-labelledby="urgent-heading"><div className={styles.emergencyIcon} aria-hidden="true">!</div><div><p className={styles.kicker}>Urgent dental concerns</p><h2 id="urgent-heading">Know when to seek help.</h2><p>This concept site cannot assess or diagnose symptoms. For dental pain, swelling, injury, or a broken tooth, contact a licensed dentist promptly. For severe facial swelling, trouble breathing or swallowing, uncontrolled bleeding, or a life-threatening emergency, call 911 or seek emergency medical care.</p></div></section>
      </main>

      <footer className={styles.footer}><div className={styles.footerTop}><a className={styles.brand} href="#top"><span className={styles.mark}><PineMark /></span><span>White Pine <b>Dental</b></span></a><p>Fictional Minnesota dental practice concept<br />Designed to feel calm, clear, and human.</p><nav aria-label="Footer navigation"><a href="#care">Care</a><a href="#visit">First visit</a><a href="#resources">Patient resources</a><a href="#request">Appointment demo</a></nav></div><div className={styles.disclaimer}><strong>Concept disclaimer:</strong> White Pine Dental is a fictional practice created as a website design demonstration. It does not provide dental services, medical advice, diagnosis, appointments, or emergency care. Do not submit real personal or health information.<span>© 2026 White Pine Dental concept</span></div></footer>
    </div>
  );
}


