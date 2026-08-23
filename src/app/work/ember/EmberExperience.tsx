"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import s from "./Ember.module.css";

const dishes = [
  {
    name: "Charred onion + rye",
    kind: "SMALL PLATE",
    price: "$14",
    image: "/media/production/ember/ember-dish-hero.webp",
    copy: "Sweet, smoky, brightened at the table."
  },
  {
    name: "Roasted roots",
    kind: "FROM THE FIRE",
    price: "$19",
    image: "/media/production/ember/ember-grill-hero-CONCEPT.webp",
    copy: "Caramelized vegetables, cultured cream, herbs."
  },
  {
    name: "Herb oil + warm grain",
    kind: "TO SHARE",
    price: "$16",
    image: "/media/production/ember/ember-macro-oil-hero-CONCEPT.webp",
    copy: "Green, savory, and built for passing around."
  }
];

const drinks = [
  { name: "House Old Fashioned", note: "Bourbon / orange / smoke" },
  { name: "Ember Spritz", note: "Bitter citrus / bubbles / rosemary" },
  { name: "Northstar Sour", note: "Rye / lemon / honey" }
];

export default function EmberExperience() {
  const [dish, setDish] = useState(0);
  const [tab, setTab] = useState("MENU");
  const [inquiry, setInquiry] = useState(false);

  return (
    <main className={s.site}>
      <Image src={dishes[dish].image} alt={dishes[dish].name} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      <div className={s.dark} />
      <header>
        <b>EMBER</b>
        <span>SUPPER / DRINKS / GOOD COMPANY</span>
        <Link href="/">RETURN TO MLR</Link>
      </header>

      <section className={s.hero}>
        <p>DINNER AFTER DARK</p>
        <h1>Come hungry.<br/><em>Stay for one more.</em></h1>
        <p className={s.intro}>A fictional supper-club concept shaped by live fire, good drinks, and food worth slowing down for.</p>
        <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>SEE TONIGHT&apos;S MENU</button>
      </section>

      <section className={s.menu} id="menu">
        <nav>
          {["MENU", "DRINKS", "SPECIALS"].map(x => (
            <button key={x} aria-pressed={tab === x} onClick={() => setTab(x)}>{x}</button>
          ))}
        </nav>
        
        {tab === "MENU" && (
          <div className={s.dishGrid}>
            {dishes.map((d, i) => (
              <button key={d.name} className={i === dish ? s.dishActive : s.dish} onClick={() => setDish(i)}>
                <span>
                  <Image src={d.image} alt={d.name} fill sizes="(max-width:800px) 88vw,28vw" style={{ objectFit: "cover" }} />
                </span>
                <small>{d.kind} / {d.price}</small>
                <strong>{d.name}</strong>
                <p>{d.copy}</p>
              </button>
            ))}
          </div>
        )}
        
        {tab === "DRINKS" && (
          <div className={s.drinks}>
            <Image src="/media/production/ember/ember-cocktail-hero.webp" alt="Cocktail" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.3, zIndex: -1 }} />
            {drinks.map(d => (
              <article key={d.name}>
                <span>EMBER BAR</span>
                <h2>{d.name}</h2>
                <p>{d.note}</p>
              </article>
            ))}
          </div>
        )}
        
        {tab === "SPECIALS" && (
          <article className={s.special}>
            <small>THIS WEEK / FICTIONAL SPECIAL</small>
            <h2>Fire-roasted supper for two</h2>
            <p>A rotating plate, something sweet, and a drink selected from the bar. The exact menu changes with the season.</p>
          </article>
        )}
      </section>

      <section className={s.visit}>
        <div>
          <p>MAKE AN EVENING OF IT</p>
          <h2>Good food is only part of the plan.</h2>
          <p>Ask about a table, a private gathering, or the kind of night you want to make.</p>
        </div>
        <button onClick={() => setInquiry(true)}>ASK ABOUT A TABLE</button>
        <button onClick={() => setInquiry(true)}>PRIVATE EVENTS</button>
      </section>

      {inquiry && (
        <aside className={s.inquiry}>
          <button onClick={() => setInquiry(false)}>CLOSE</button>
          <p>START A CONVERSATION</p>
          <h2>Tell us what you&apos;re planning.</h2>
          <p>A concept inquiry would collect a preferred date range, party size, dietary questions, and whether you&apos;re joining us for dinner or a private event.</p>
          <button>CONTINUE CONCEPT</button>
        </aside>
      )}

      <footer>
        <span>FICTIONAL SUPPER-CLUB CONCEPT / ILLUSTRATIVE MENU</span>
        <span>NO LIVE RESERVATIONS, PRICES, OR AVAILABILITY ARE CLAIMED</span>
      </footer>
    </main>
  );
}
