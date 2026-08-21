"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Ember.module.css";

const menuItems = [
  { name: "Wood-Fired Bone Marrow", price: "24", desc: "Charred sourdough, parsley salad, smoked sea salt" },
  { name: "Dry-Aged Ribeye", price: "72", desc: "45-day dry age, roasted garlic butter, blistered vine tomatoes" },
  { name: "Embered Venison Loin", price: "48", desc: "Juniper reduction, smoked parsnip purée, wild mushrooms" },
  { name: "Burnt Honey Panna Cotta", price: "14", desc: "Black mission figs, toasted hazelnut, thyme" }
];

export default function EmberExperience() {
  return (
    <main className={styles.site}>
      <header className={styles.header}>
        <Link href="/">RETURN TO MLR</Link>
        <span>EMBER / SUPPER CLUB</span>
      </header>

      <section className={styles.hero}>
        <Image 
          src="/media/production/ember/ember-grill-hero-CONCEPT.webp" 
          alt="Cinematic shot of food cooking over an open fire grill" 
          fill 
          priority 
          sizes="100vw" 
          className={styles.heroImage} 
        />
        <div className={styles.heroContent}>
          <h1>Ember</h1>
          <p>Fire, bourbon, and a table after dark.</p>
        </div>
      </section>

      <section className={styles.ingredientStory}>
        <div className={styles.ingredientText}>
          <h2>Smoke &<br/>Source.</h2>
          <p>We source heritage proteins and organic local produce, trusting the fundamental elements of fire and time to elevate them. Our kitchen operates around an open hardwood hearth, bringing primal warmth to every plate.</p>
        </div>
        <div className={styles.ingredientVisual}>
          <Image 
            src="/media/production/ember/ember-macro-oil-hero-CONCEPT.webp" 
            alt="Macro shot of olive oil and herbs near a fire" 
            fill 
            sizes="(max-width: 900px) 100vw, 50vw" 
          />
        </div>
      </section>

      <section className={styles.menuSection}>
        <h2>The Hearth Menu</h2>
        <div className={styles.menuList}>
          {menuItems.map((item, i) => (
            <div key={i} className={styles.menuItem}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.reservation}>
        <div className={styles.reservationBox}>
          <h2>Reserve a Table</h2>
          <p>Concept demonstration only.</p>
          
          <form className={styles.formGrid} onSubmit={e => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label>Date</label>
              <input type="date" />
            </div>
            
            <div className={styles.formGroup}>
              <label>Time</label>
              <select>
                <option>6:00 PM</option>
                <option>7:00 PM</option>
                <option>8:00 PM</option>
                <option>9:00 PM</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Party Size</label>
              <select>
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6+ Guests</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Seating</label>
              <select>
                <option>Main Dining</option>
                <option>Chef's Counter</option>
              </select>
            </div>
          </form>
          
          <button className={styles.bookBtn}>Find Table</button>
        </div>
      </section>
    </main>
  );
}
