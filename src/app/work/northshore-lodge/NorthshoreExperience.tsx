"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Northshore.module.css";

const accommodations = [
  {
    name: "The Water Cabins",
    desc: "Direct lake access, private dock.",
    image: "/media/production/northshore/TEST-northshore-lodge-exterior.webp"
  },
  {
    name: "The Ridge Suites",
    desc: "Elevated canopy views, cedar soaking tubs.",
    image: "/media/production/northshore/TEST-northshore-interior-lake-view.webp"
  }
];

export default function NorthshoreExperience() {
  return (
    <main className={styles.site}>
      <header className={styles.header}>
        <Link href="/">RETURN TO MLR</Link>
        <span>NORTHSHORE LODGE</span>
      </header>

      <section className={styles.hero}>
        <Image 
          src="/media/production/northshore/TEST-northshore-hero-lake-approach.webp" 
          alt="Misty lake approach to the lodge" 
          fill 
          priority 
          sizes="100vw" 
          className={styles.heroImage} 
        />
        <div className={styles.heroContent}>
          <h1>Northshore</h1>
          <p>The quiet water.</p>
        </div>
      </section>

      <section className={styles.intro}>
        <p>A place designed to disappear into the landscape. We built Northshore Lodge around the existing pines, utilizing charred cedar and local stone to create a sanctuary that breathes with the lake.</p>
      </section>

      <section className={styles.explorer}>
        <div className={styles.explorerHeader}>
          <h2>Accommodations</h2>
        </div>
        <div className={styles.cabins}>
          {accommodations.map((acc, i) => (
            <div key={i} className={styles.cabinCard}>
              <Image 
                src={acc.image} 
                alt={acc.name} 
                fill 
                sizes="(max-width: 900px) 100vw, 50vw" 
              />
              <div className={styles.cabinInfo}>
                <h3>{acc.name}</h3>
                <p>{acc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.booking}>
        <div className={styles.bookingBox}>
          <h2>Reserve Your Stay</h2>
          <p>Select your dates to view seasonal availability.</p>
          
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <div className={styles.dates}>
              <div className={styles.dateField}>
                <label>Arrival</label>
                <input type="date" />
              </div>
              <div className={styles.dateField}>
                <label>Departure</label>
                <input type="date" />
              </div>
            </div>
            
            <button className={styles.checkBtn}>Check Availability</button>
          </form>
        </div>
      </section>
    </main>
  );
}
