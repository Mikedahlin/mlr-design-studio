"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ApexMotor.module.css";
import Link from "next/link";

const services = [
  { id: "calibration", label: "01 / Calibration", title: "ECU calibration", price: "$695", text: "A measured calibration workflow built around the vehicle, installed hardware, fuel, and intended operating environment.", details: ["Baseline scan and health review", "Controlled load-cell sessions", "Road manners verification"] },
  { id: "diagnostics", label: "02 / Diagnostics", title: "Performance diagnostics", price: "$185", text: "Structured fault isolation for drivability, boost control, fueling, and thermal-management concerns.", details: ["Pre-test interview", "Sensor and log review", "Prioritized findings document"] },
  { id: "hardware", label: "03 / Hardware", title: "Hardware integration", price: "$480", text: "Careful installation and validation of supporting performance components with serviceability in mind.", details: ["Fitment planning", "Documented installation", "Post-install inspection"] },
  { id: "track", label: "04 / Track prep", title: "Track preparation", price: "$325", text: "A practical pre-event inspection and setup session focused on repeatability, safety, and clear driver notes.", details: ["Fluid and fastener checks", "Alignment review", "Cold/hot pressure plan"] },
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8,  } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ApexExperience() {
  const [activeService, setActiveService] = useState(0);
  const [plan, setPlan] = useState({ use: "Street + weekend", priority: "Balanced", state: "Lightly modified" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  useEffect(() => {
    document.body.classList.add("apex-motor-page");
    return () => document.body.classList.remove("apex-motor-page");
  }, []);

  const service = services[activeService];
  const recommendation = plan.use === "Closed-course" ? "Begin with track preparation and a baseline diagnostic session." : plan.state === "Stock" ? "Begin with a health review before selecting supporting hardware." : "Begin with diagnostics, then scope a measured calibration session.";

  return (
    <main className={styles.site} ref={containerRef}>
      <header className={styles.navWrap}>
        <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className={styles.nav} aria-label="Primary navigation">
          <Link className={styles.brand} href="/" aria-label="Return Home"><Mark /><span>APEX<span>MOTOR</span></span></Link>
          <div className={styles.links}>
            <a href="#services">Services</a><a href="#planner">Build planner</a><a href="#workshop">Workshop</a>
          </div>
          <a className={styles.navCta} href="#intake">Start intake</a>
        </motion.nav>
      </header>

      <section className={styles.hero} id="top">
        <motion.div style={{ y: yHero, width: "100%", height: "100%", position: "absolute", inset: 0 }}>
          <Image src="/media/production/apex/apex-hero-car-hero-CONCEPT.webp" alt="Performance coupe" fill priority sizes="100vw" className={styles.heroImage} />
        </motion.div>
        <div className={styles.heroShade} />
        
        <motion.div className={styles.heroContent} id="main-content" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} className={styles.eyebrow}><span /> CALIBRATION / DIAGNOSTICS / INTEGRATION</motion.p>
          <motion.h1 variants={fadeUp}>Performance,<br /><em>resolved.</em></motion.h1>
          <motion.p variants={fadeUp} className={styles.lede}>A technical workshop concept for intentional street and closed-course builds—measured before modified.</motion.p>
          <motion.div variants={fadeUp} className={styles.heroActions}>
            <a className={styles.primary} href="#planner">Plan your build <span>↗</span></a>
          </motion.div>
        </motion.div>
      </section>

      <section className={styles.bentoSection} id="services">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className={styles.bentoGrid}>
          
          <motion.div variants={fadeUp} className={styles.bentoCardHero}>
             <Image src="/media/production/apex/apex-engine-hero.webp" alt="Engine Bay" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.bentoImg} />
             <div className={styles.bentoOverlay}>
                <h2>Precision<br/>Engineering</h2>
                <p>Titanium headers, custom manifolds, exact tolerances.</p>
             </div>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.bentoCardInteractive}>
            <div className={styles.tabs} role="tablist">
              {services.map((item, index) => <button key={item.id} role="tab" aria-selected={activeService === index} onClick={() => setActiveService(index)}>{item.label}</button>)}
            </div>
            <div className={styles.servicePanel}>
              <motion.div key={service.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <p className={styles.panelNumber}>A0{activeService + 1}</p>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className={styles.price}><strong>{service.price}</strong><span>Starting at</span></div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.bentoCardHero}>
             <Image src="/media/production/apex/apex-dyno-hero.webp" alt="Dyno Room" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.bentoImg} />
             <div className={styles.bentoOverlay}>
                <h2>Measured<br/>Results</h2>
                <p>Instrumented validation on our load-cell dyno.</p>
             </div>
          </motion.div>

        </motion.div>
      </section>

      <section className={styles.planner} id="planner">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={styles.plannerWrapper}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>BUILD PLANNER</p>
            <h2>Define the brief.</h2>
          </div>
          <div className={styles.plannerGrid}>
            <div className={styles.questions}>
              {(["use", "priority", "state"] as const).map((key, i) => (
                <fieldset key={key}>
                  <legend><span>0{i + 1}</span>{key === "use" ? "How will the vehicle be used?" : key === "priority" ? "What is the primary priority?" : "What is the current configuration?"}</legend>
                  <div>
                    {plannerData[key].map(option => (
                      <label key={option} className={plan[key] === option ? styles.checked : ""}>
                        <input type="radio" name={key} value={option} checked={plan[key] === option} onChange={() => setPlan({ ...plan, [key]: option })} />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
            <aside className={styles.summary}>
              <p className={styles.kicker}>LIVE BUILD BRIEF</p>
              <h3>{plan.use}</h3>
              <dl><div><dt>Priority</dt><dd>{plan.priority}</dd></div><div><dt>Configuration</dt><dd>{plan.state}</dd></div><div><dt>Recommendation</dt><dd>{recommendation}</dd></div></dl>
            </aside>
          </div>
        </motion.div>
      </section>
      
      <footer className={styles.footer}>
         <div className={styles.footerTop}><Link className={styles.brand} href="/"><Mark /><span>APEX<span>MOTOR</span></span></Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
