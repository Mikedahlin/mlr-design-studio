"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import s from "./EmberRebuild.module.css";

type MenuTab = "MENU" | "DRINKS" | "SPECIALS";

const plateShots = [
  { name: "Coal-roasted ribeye", label: "FROM THE FIRE", image: "/media/production/ember/ember-dish-hero.webp", alt: "A grilled steak on a white plate with candlelight behind it" },
  { name: "The live-fire table", label: "FOR THE TABLE", image: "/media/production/ember/ember-grill-card-CONCEPT.webp", alt: "Steaks, corn, mushrooms, and vegetables arranged around a live grill" },
  { name: "Smoke, citrus, and rye", label: "FROM THE BAR", image: "/media/production/ember/ember-cocktail-hero.webp", alt: "A whiskey cocktail glowing beside a flame" },
  { name: "Green things, warmed slowly", label: "FROM THE GARDEN", image: "/media/production/ember/ember-macro-oil-hero-CONCEPT.webp", alt: "Green herb oil and fire-warmed ingredients on a dark plate" }
];

const menuSections = [
  { title: "To start", note: "Small plates for passing around", items: [["Ember hearth focaccia", "Whipped cultured butter, charred scallion, sea salt"], ["Crisp potatoes", "Smoked aioli, pickled mustard seed, chives"], ["Charred carrots", "Sunflower tahini, dill, toasted rye"], ["Warm mushroom toast", "Garlic cream, grilled sourdough, black pepper"]] },
  { title: "From the fire", note: "The center of the evening", items: [["Coal-roasted ribeye", "Green peppercorn jus, ember fries, bitter greens"], ["Maple-brined chicken", "Roasted grapes, crispy skin, thyme pan sauce"], ["Cedar-plank trout", "Brown butter, lemon, fennel, warm grain"], ["Whole roasted cauliflower", "Almond romesco, herbs, toasted seeds"]] },
  { title: "Something sweet", note: "A little smoke after dinner", items: [["Dark chocolate pot de crème", "Flaky salt, olive oil, rye cookie"], ["Grilled stone fruit", "Vanilla cream, honeycomb, toasted oats"], ["Warm skillet cookie", "Brown butter, malted cream, bourbon caramel"], ["Cheese for the table", "Three selections, ember crackers, seasonal preserve"]] }
];

const drinks = [
  ["House Old Fashioned", "Bourbon, orange, smoked demerara"],
  ["Ember Spritz", "Bitter citrus, bubbles, rosemary"],
  ["Northstar Sour", "Rye, lemon, honey, egg white"],
  ["Blackberry & Tonic", "Juniper, blackberry, lime, tonic"],
  ["The Afterglow", "Amaro, coffee, cream, sea salt"],
  ["Zero-Proof Hearth", "Blood orange, ginger, lapsang, soda"]
];

const specials = [
  { label: "SAMPLE SUNDAY PROGRAM", title: "The long-table supper", copy: "A family-style fire-roasted menu with shared starters, a main from the grill, and something sweet to finish." },
  { label: "SAMPLE LATE-NIGHT PROGRAM", title: "The last set", copy: "A smaller menu, a low-lit bar, and live acoustic music for the part of the night that should not be rushed." },
  { label: "SAMPLE PRIVATE PROGRAM", title: "A room of your own", copy: "A reception, rehearsal dinner, or milestone gathering shaped around the table, the fire, and the people you brought." }
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function EmberExperienceRebuild() {
  const [tab, setTab] = useState<MenuTab>("MENU");
  const [eventType, setEventType] = useState("Dinner inquiry");
  const [submitted, setSubmitted] = useState(false);

  function openInquiry(type: string) {
    setEventType(type);
    setSubmitted(false);
    window.setTimeout(() => scrollToSection("inquiry"), 0);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className={s.site}>
      <header className={s.topbar}>
        <Link className={s.brand} href="/work/ember">EMBER</Link>
        <span className={s.topbarNote}>SUPPER / DRINKS / GOOD COMPANY</span>
        <Link className={s.returnLink} href="/">RETURN TO MLR</Link>
      </header>

      <section className={s.hero} id="top">
        <div className={s.heroMedia}><Image src="/media/production/ember/ember-dish-hero.webp" alt="A fire-grilled steak in warm candlelight" fill priority sizes="100vw" style={{ objectFit: "cover" }} /></div>
        <div className={s.heroShade} />
        <div className={s.heroContent}>
          <p className={s.eyebrow}>DINNER AFTER DARK / FICTIONAL CONCEPT</p>
          <h1>Come hungry.<br /><em>Stay for one more.</em></h1>
          <p className={s.heroIntro}>A supper-club concept built around live fire, good drinks, and the kind of table where the evening keeps going.</p>
          <div className={s.heroActions}><button className={s.button} onClick={() => scrollToSection("menu")} type="button">SEE THE MENU</button><button className={s.buttonGhost} onClick={() => openInquiry("Private gathering")} type="button">PLAN A GATHERING</button></div>
          <div className={s.heroMeta}><span><b>01</b> FIRE / FOOD</span><span><b>02</b> MUSIC / MOMENTS</span><span><b>03</b> TABLE / TOGETHER</span></div>
        </div>
      </section>

      <section className={s.statement}>
        <p className={s.eyebrow}>THE IDEA</p>
        <h2>The best nights have a little smoke in the air.</h2>
        <p>Ember is a fictional restaurant direction for a warm, fire-led supper club. The page is intentionally presented as a concept: the menu, spaces, programs, and inquiry form are visual design work, not live business information.</p>
      </section>

      <section className={s.menuSection} id="menu">
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>TONIGHT AT EMBER</p><h2>Take your time.</h2></div><p className={s.sectionLead}>A sample menu written for the concept presentation. Built to be shared, passed, and ordered one more time.</p></div>
        <div className={s.tabs} role="tablist" aria-label="Ember menu areas">
          {(["MENU", "DRINKS", "SPECIALS"] as MenuTab[]).map((item) => <button className={tab === item ? s.tabActive : s.tab} key={item} onClick={() => setTab(item)} role="tab" aria-selected={tab === item} type="button">{item}</button>)}
        </div>

        {tab === "MENU" && <div className={s.menuView} role="tabpanel">
          <div className={s.plateGrid}>{plateShots.map((plate) => <article className={s.plateCard} key={plate.name}><div className={s.plateImage}><Image src={plate.image} alt={plate.alt} fill sizes="(max-width: 800px) 100vw, 25vw" style={{ objectFit: "cover" }} /></div><div className={s.plateCopy}><span>{plate.label}</span><h3>{plate.name}</h3></div></article>)}</div>
          <div className={s.menuColumns}>{menuSections.map((section) => <section className={s.menuList} key={section.title}><div className={s.menuListHeading}><h3>{section.title}</h3><p>{section.note}</p></div>{section.items.map(([name, description]) => <article className={s.menuItem} key={name}><h4>{name}</h4><p>{description}</p></article>)}</section>)}</div>
        </div>}

        {tab === "DRINKS" && <div className={s.drinkView} role="tabpanel"><div className={s.drinkPhoto}><Image src="/media/production/ember/ember-cocktail-hero.webp" alt="A smoky whiskey cocktail at the Ember bar" fill sizes="(max-width: 800px) 100vw, 48vw" style={{ objectFit: "cover" }} /></div><div className={s.drinkList}><p className={s.eyebrow}>THE EMBER BAR / SAMPLE LIST</p><h3>Something with a little edge.</h3>{drinks.map(([name, description]) => <article className={s.drinkItem} key={name}><h4>{name}</h4><p>{description}</p></article>)}</div></div>}

        {tab === "SPECIALS" && <div className={s.specialGrid} role="tabpanel">{specials.map((special) => <article className={s.specialCard} key={special.title}><span>{special.label}</span><h3>{special.title}</h3><p>{special.copy}</p><button className={s.textButton} onClick={() => openInquiry("Special program inquiry")} type="button">ASK ABOUT THIS IDEA <span>↗</span></button></article>)}</div>}
      </section>

      <section className={s.fireStory}><div className={s.storyImage}><Image src="/media/production/ember/ember-grill-hero-CONCEPT.webp" alt="A live grill covered with steaks, corn, mushrooms, and vegetables" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: "cover" }} /></div><div className={s.storyCopy}><p className={s.eyebrow}>THE CENTER OF THE ROOM</p><h2>Let the fire do some of the talking.</h2><p>Every section of the Ember idea comes back to the same feeling: a room with warmth, a plate with some char, and enough time to hear the whole story across the table.</p><button className={s.button} onClick={() => openInquiry("Dinner inquiry")} type="button">START WITH DINNER</button></div></section>

      <section className={s.experiences} id="experiences"><div className={s.sectionHeading}><div><p className={s.eyebrow}>MORE THAN A MEAL</p><h2>Make the room yours.</h2></div><p className={s.sectionLead}>Three ways the concept can stretch beyond dinner without losing the warmth that makes it Ember.</p></div><div className={s.experienceGrid}>
        <article className={s.experienceCard}><div className={s.experienceImage}><Image src="/media/production/ember/ember-live-music-concept.png" alt="A small acoustic trio playing for diners in a warm supper club" fill sizes="(max-width: 800px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className={s.experienceCopy}><span>01 / LIVE MUSIC</span><h3>The last set.</h3><p>A small stage, a low-lit bar, and a room that can listen while dinner keeps moving.</p></div></article>
        <article className={s.experienceCard}><div className={s.experienceImage}><Image src="/media/production/ember/ember-reception-concept.png" alt="An elegant candlelit reception room with long tables and a dance floor" fill sizes="(max-width: 800px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className={s.experienceCopy}><span>02 / WEDDINGS + RECEPTIONS</span><h3>A room of your own.</h3><p>A flexible reception setting for a rehearsal dinner, a toast, or a celebration built around one long table.</p></div></article>
        <article className={s.experienceCard}><div className={s.experienceImage}><Image src="/media/production/ember/ember-patio-concept.png" alt="Guests dining around a fire feature on a patio at dusk" fill sizes="(max-width: 800px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className={s.experienceCopy}><span>03 / OUTDOOR TABLES</span><h3>Stay outside awhile.</h3><p>Patio tables, string lights, and a fire feature for nights when the weather is part of the plan.</p></div></article>
      </div></section>

      <section className={s.inquirySection} id="inquiry"><div className={s.inquiryIntro}><p className={s.eyebrow}>START A CONVERSATION</p><h2>Tell us what you&apos;re planning.</h2><p>Use the form to show how a future Ember experience could begin. This is a local concept interaction; it does not send a message or create a reservation.</p><div className={s.inquiryLinks}><button className={eventType === "Dinner inquiry" ? s.linkActive : s.link} onClick={() => setEventType("Dinner inquiry")} type="button">DINNER</button><button className={eventType === "Private gathering" ? s.linkActive : s.link} onClick={() => setEventType("Private gathering")} type="button">PRIVATE GATHERING</button><button className={eventType === "Wedding or reception" ? s.linkActive : s.link} onClick={() => setEventType("Wedding or reception")} type="button">WEDDING / RECEPTION</button></div></div><form className={s.inquiryForm} onSubmit={handleSubmit}><div className={s.formGrid}><label className={s.field}><span>YOUR NAME</span><input name="name" required placeholder="Your name" /></label><label className={s.field}><span>EMAIL</span><input name="email" type="email" required placeholder="you@example.com" /></label><label className={s.field}><span>EVENT TYPE</span><select name="eventType" value={eventType} onChange={(event) => setEventType(event.target.value)}><option>Dinner inquiry</option><option>Private gathering</option><option>Wedding or reception</option><option>Live music night</option><option>Special program inquiry</option></select></label><label className={s.field}><span>GUEST COUNT</span><input name="guests" inputMode="numeric" placeholder="Example: 12" /></label></div><label className={s.field}><span>WHAT ARE YOU IMAGINING?</span><textarea name="message" rows={4} placeholder="Tell us about the night you have in mind" /></label><button className={s.button} type="submit">SEND CONCEPT INQUIRY</button>{submitted && <p className={s.success} aria-live="polite">Thanks — this is only a concept interaction. Nothing was sent and no reservation was created.</p>}</form></section>

      <footer className={s.footer}><span>FICTIONAL SUPPER-CLUB CONCEPT / ILLUSTRATIVE MENU</span><span>NO LIVE RESERVATIONS, PRICES, OR AVAILABILITY ARE CLAIMED</span></footer>
    </main>
  );
}
