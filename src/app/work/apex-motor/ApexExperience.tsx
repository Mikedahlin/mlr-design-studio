"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ApexMotor.module.css";

const services = [
  {
    id: "calibration",
    label: "01 / Calibration",
    title: "ECU calibration",
    price: "$695",
    text: "A measured calibration workflow built around the vehicle, installed hardware, fuel, and intended operating environment.",
    details: ["Baseline scan and health review", "Controlled load-cell sessions", "Road manners verification"],
  },
  {
    id: "diagnostics",
    label: "02 / Diagnostics",
    title: "Performance diagnostics",
    price: "$185",
    text: "Structured fault isolation for drivability, boost control, fueling, and thermal-management concerns.",
    details: ["Pre-test interview", "Sensor and log review", "Prioritized findings document"],
  },
  {
    id: "hardware",
    label: "03 / Hardware",
    title: "Hardware integration",
    price: "$480",
    text: "Careful installation and validation of supporting performance components with serviceability in mind.",
    details: ["Fitment planning", "Documented installation", "Post-install inspection"],
  },
  {
    id: "track",
    label: "04 / Track prep",
    title: "Track preparation",
    price: "$325",
    text: "A practical pre-event inspection and setup session focused on repeatability, safety, and clear driver notes.",
    details: ["Fluid and fastener checks", "Alignment review", "Cold/hot pressure plan"],
  },
];

const plannerData = {
  use: ["Daily street", "Street + weekend", "Closed-course"],
  priority: ["Response", "Balanced", "Thermal consistency"],
  state: ["Stock", "Lightly modified", "Built system"],
};

function Mark() {
  return (
    <svg className={styles.mark} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M4 34 17 12l7 11 6-9 14 20H30l-6-9-5 9H4Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M7 38h34" stroke="currentColor" strokeWidth="3" />
      <path className={styles.motion} d="M5 7h16M1 13h10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function ApexExperience() {
  const [activeService, setActiveService] = useState(0);
  const [plan, setPlan] = useState({ use: "Street + weekend", priority: "Balanced", state: "Lightly modified" });

  useEffect(() => {
    document.body.classList.add("apex-motor-page");
    return () => document.body.classList.remove("apex-motor-page");
  }, []);

  const service = services[activeService];
  const recommendation = plan.use === "Closed-course"
    ? "Begin with track preparation and a baseline diagnostic session."
    : plan.state === "Stock"
      ? "Begin with a health review before selecting supporting hardware."
      : "Begin with diagnostics, then scope a measured calibration session.";

  return (
    <main className={styles.site}>
      <a className={styles.skip} href="#main-content">Skip to content</a>
      <header className={styles.navWrap}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a className={styles.brand} href="#top" aria-label="Apex Motor home"><Mark /><span>APEX<span>MOTOR</span></span></a>
          <div className={styles.links}>
            <a href="#services">Services</a><a href="#planner">Build planner</a><a href="#workshop">Workshop</a>
          </div>
          <a className={styles.navCta} href="#intake">Start intake</a>
        </nav>
      </header>

      <section className={styles.hero} id="top">
        <Image src="/media/production/apex/apex-hero-car-hero-CONCEPT.webp" alt="Performance coupe in a dark technical workshop" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroContent} id="main-content">
          <p className={styles.eyebrow}><span /> CALIBRATION / DIAGNOSTICS / INTEGRATION</p>
          <h1>Performance,<br /><em>resolved.</em></h1>
          <p className={styles.lede}>A technical workshop concept for intentional street and closed-course builds—measured before modified.</p>
          <div className={styles.heroActions}><a className={styles.primary} href="#planner">Plan your build <span>↗</span></a><a className={styles.textLink} href="#services">Explore services →</a></div>
          <dl className={styles.readout}><div><dt>PROCESS</dt><dd>Baseline first</dd></div><div><dt>OUTPUT</dt><dd>Documented setup</dd></div><div><dt>FOCUS</dt><dd>Repeatable behavior</dd></div></dl>
        </div>
      </section>

      <section className={styles.section} id="services" aria-labelledby="services-title">
        <div className={styles.sectionHead}><p className={styles.kicker}>CAPABILITY MATRIX</p><h2 id="services-title">Focused work.<br />Clear scope.</h2><p>Each engagement begins with fitment, condition, and intended-use review. Prices below are fictional examples, not quotes.</p></div>
        <div className={styles.serviceLayout}>
          <div className={styles.tabs} role="tablist" aria-label="Performance services">
            {services.map((item, index) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={activeService === index} aria-controls="service-panel" tabIndex={activeService === index ? 0 : -1} onClick={() => setActiveService(index)}>{item.label}<span>→</span></button>)}
          </div>
          <div className={styles.servicePanel} id="service-panel" role="tabpanel" aria-labelledby={`tab-${service.id}`}>
            <div><p className={styles.panelNumber}>A0{activeService + 1}</p><h3>{service.title}</h3><p>{service.text}</p><ul>{service.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div>
            <div className={styles.price}><small>EXAMPLE STARTING AT</small><strong>{service.price}</strong><span>Final scope follows inspection</span></div>
          </div>
        </div>
      </section>

      <section className={styles.calibration} aria-labelledby="data-title">
        <div className={styles.photo}><Image src="/media/production/apex/apex-macro-turbo-hero-CONCEPT.webp" alt="Technician reviewing calibration data beside a vehicle" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className={styles.dataPanel}><p className={styles.kicker}>SAMPLE DATA / NOT A RESULT</p><h2 id="data-title">See the whole curve.</h2><p>We use plots to discuss behavior across the operating range—not to promote a single peak number.</p>
          <div className={styles.chart} role="img" aria-label="Illustrative sample dyno chart comparing baseline and revised curves from 2500 to 7000 RPM">
            <svg viewBox="0 0 620 260" aria-hidden="true"><g className={styles.gridLines}><path d="M48 20V220H600M48 60H600M48 100H600M48 140H600M48 180H600M48 220H600" /></g><path className={styles.baseLine} d="M48 196 C140 188 195 160 262 126 S397 81 480 99 S560 131 600 152"/><path className={styles.apexLine} d="M48 193 C120 182 186 143 262 104 S404 47 482 63 S558 103 600 122"/><g className={styles.axisText}><text x="48" y="242">2.5K</text><text x="302" y="242">4.5K</text><text x="566" y="242">7K RPM</text></g></svg>
            <div className={styles.legend}><span><i className={styles.dotBase} />Baseline</span><span><i className={styles.dotApex} />Illustrative revision</span></div>
          </div>
        </div>
      </section>

      <section className={styles.planner} id="planner" aria-labelledby="planner-title">
        <div className={styles.sectionHead}><p className={styles.kicker}>BUILD PLANNER / 03 INPUTS</p><h2 id="planner-title">Define the brief.</h2><p>This planning tool provides a general starting point only. It does not diagnose a vehicle or create a service quote.</p></div>
        <div className={styles.plannerGrid}>
          <div className={styles.questions}>
            {(["use", "priority", "state"] as const).map((key, i) => <fieldset key={key}><legend><span>0{i + 1}</span>{key === "use" ? "How will the vehicle be used?" : key === "priority" ? "What is the primary priority?" : "What is the current configuration?"}</legend><div>{plannerData[key].map(option => <label key={option} className={plan[key] === option ? styles.checked : ""}><input type="radio" name={key} value={option} checked={plan[key] === option} onChange={() => setPlan({ ...plan, [key]: option })} />{option}</label>)}</div></fieldset>)}
          </div>
          <aside className={styles.summary} aria-live="polite"><p className={styles.kicker}>LIVE BUILD BRIEF</p><h3>{plan.use}</h3><dl><div><dt>Priority</dt><dd>{plan.priority}</dd></div><div><dt>Configuration</dt><dd>{plan.state}</dd></div><div><dt>Suggested first step</dt><dd>{recommendation}</dd></div></dl><a href="#intake" className={styles.primary}>Continue to intake <span>↓</span></a><small>Illustrative guidance. Vehicle inspection required.</small></aside>
        </div>
      </section>

      <section className={styles.workshop} id="workshop" aria-labelledby="workshop-title">
        <Image src="/media/production/apex/apex-hero-car-card-CONCEPT.webp" alt="Organized performance workshop with a vehicle on a lift" fill sizes="100vw" />
        <div className={styles.workshopShade} />
        <div className={styles.workshopCopy}><p className={styles.kicker}>THE WORKSHOP</p><h2 id="workshop-title">Controlled inputs.<br />Useful outputs.</h2><p>A concept environment organized around inspection, instrumented testing, careful integration, and documentation.</p><div className={styles.facilities}><span>01 / LOAD-CELL DYNO</span><span>02 / CALIBRATION BAY</span><span>03 / ALIGNMENT</span><span>04 / FABRICATION</span></div></div>
      </section>

      <section className={styles.intake} id="intake" aria-labelledby="intake-title">
        <div className={styles.sectionHead}><p className={styles.kicker}>PROJECT INTAKE / DEMO</p><h2 id="intake-title">Start with context.</h2><p>This four-step display is nonfunctional and does not transmit or store information.</p></div>
        <ol className={styles.steps}><li><span>01</span><strong>Vehicle</strong><p>Year, make, model, powertrain.</p></li><li><span>02</span><strong>Configuration</strong><p>Hardware, software, fuel.</p></li><li><span>03</span><strong>Objective</strong><p>Use case, symptoms, priorities.</p></li><li><span>04</span><strong>Review</strong><p>Workshop fit and next steps.</p></li></ol>
        <div className={styles.demoForm} aria-label="Disabled project intake demonstration"><label>Vehicle<input disabled placeholder="e.g. 2024 fictional coupe" /></label><label>Project objective<input disabled placeholder="Briefly describe the goal" /></label><button disabled>Demo only — unavailable</button></div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}><a className={styles.brand} href="#top"><Mark /><span>APEX<span>MOTOR</span></span></a><p>Fictional performance workshop concept.<br />No services are offered through this page.</p><a href="#top">Back to top ↑</a></div>
        <div className={styles.legal}><p><strong>Safety & legal:</strong> Vehicle modification can affect reliability, warranties, insurance, noise, safety systems, and road legality. Closed-course components may be unsuitable for public roads. Always comply with local laws and use qualified professionals.</p><p><strong>Emissions:</strong> Apex Motor does not depict, encourage, or offer emissions-control tampering. Any real modification must preserve required emissions and diagnostic equipment and comply with applicable regulations.</p><p><strong>Fictional / privacy:</strong> Apex Motor is a fictional portfolio experience. Names, services, pricing, charts, and facilities are illustrative. The disabled intake does not collect, store, or transmit personal information.</p></div>
      </footer>
    </main>
  );
}
