"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import s from "./NorthshoreRebuild.module.css";

type Season = "WINTER" | "SPRING" | "SUMMER" | "AUTUMN";

const activities = [
  { name: "Paddle the shoreline", type: "ON THE WATER", image: "/media/northshore-lodge/northshore_canoeing_1787300257136.jpg", alt: "A canoe moving across a calm northwoods lake at sunset", copy: "Quiet coves, warm light, and a route that follows the weather." },
  { name: "Gather by the fire", type: "AFTER DARK", image: "/media/northshore-lodge/northshore_bonfire_1787300240354.jpg", alt: "Friends laughing around a lakeside bonfire with marshmallows", copy: "Bring a sweater, make s'mores, and let the evening take its time." },
  { name: "Find a fishing line", type: "ON THE WATER", image: "/media/production/northshore/northshore-fishing.png", alt: "An angler casting from inside a small aluminum boat on a mountain lake", copy: "A quiet boat, a long cast, and the kind of morning that starts before everyone else." },
  { name: "Watch the lake wake up", type: "WILDLIFE + WATER", image: "/media/production/northshore/northshore-loon.png", alt: "A common loon floating on a calm lake with pine forest and mountains behind it", copy: "Look for loons, listen for the water, and leave room for the view." }
];

const stays = [
  { name: "LAKE HOUSE", detail: "Shared gathering space, water views, and room to settle in.", image: "/media/northshore-lodge/northshore_hero_1787300229950.jpg", alt: "A lakeside cabin at sunset" },
  { name: "CEDAR CABIN", detail: "A quiet base for two, with a stone hearth and morning light.", image: "/media/northshore-lodge/northshore_cabin_interior_1787300247912.jpg", alt: "A log cabin interior with a stone fireplace and lake view" },
  { name: "FAMILY CABIN", detail: "Flexible space for a long weekend outside together.", image: "/media/northshore-lodge/northshore_bonfire_1787300240354.jpg", alt: "Friends gathered beside a lakeside bonfire" },
  { name: "TENT CAMPING", detail: "Wooded lakeside sites with room for a tent, a picnic table, and a small evening fire.", image: "/media/production/northshore/northshore-camping.png", alt: "A lakeside tent campsite with a fire ring and canoe" },
  { name: "RV SITES", detail: "Gravel RV sites among the pines, close to the water, with a picnic table, fire ring, and hookup point.", image: "/media/production/northshore/northshore-rv-site.png", alt: "A travel trailer parked at a lakeside RV site among pines" }
];

const outdoorActivities = [
  "Canoeing and kayaking",
  "Fishing from the dock or a small boat",
  "Hiking and cedar-trail walks",
  "Swimming and shoreline exploring",
  "Wildlife and loon watching",
  "Bonfires and s'mores",
  "Stargazing after dark",
  "Snowshoeing and cross-country skiing",
  "Ice fishing in winter",
  "Scenic drives through the northwoods"
];

const seasonCopy: Record<Season, string> = {
  WINTER: "Snow underfoot, fire in the evening, and a slower start to the day.",
  SPRING: "Changing trails, cold water, and the first green showing through.",
  SUMMER: "Long light, open water, and more reasons to stay outside.",
  AUTUMN: "Cedar color, cool mornings, warm meals, and the lake at its quietest."
};

const seasonImages: Record<Season, { src: string; alt: string }> = {
  WINTER: { src: "/media/brand-reference-pack/winter_lodge_evening.webp", alt: "A warm lodge glowing beside a winter lake" },
  SPRING: { src: "/media/northshore-lodge/northshore_canoeing_1787300257136.jpg", alt: "A canoe on a calm lake surrounded by trees" },
  SUMMER: { src: "/media/production/northshore/northshore-fishing.png", alt: "An angler casting from a boat at golden hour" },
  AUTUMN: { src: "/media/northshore-lodge/northshore_hero_1787300229950.jpg", alt: "A lakeside cabin at sunset surrounded by pine trees" }
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function NorthshoreExperienceRebuild() {
  const [activity, setActivity] = useState(0);
  const [stay, setStay] = useState(0);
  const [season, setSeason] = useState<Season>("AUTUMN");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className={s.site}>
      <header className={s.topbar}>
        <Link className={s.brand} href="/work/northshore-lodge">NORTHSHORE LODGE</Link>
        <span className={s.topbarNote}>WILDERNESS / WATER / TIME OUTSIDE</span>
        <Link className={s.returnLink} href="/">RETURN TO MLR</Link>
      </header>

      <section className={s.hero} id="top">
        <div className={s.heroImage}><Image src="/media/northshore-lodge/northshore_hero_1787300229950.jpg" alt="A log cabin beside a mountain lake at sunset" fill priority loading="eager" sizes="100vw" style={{ objectFit: "cover" }} /></div>
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <p className={s.eyebrow}>A NORTHWOODS LODGE / WATER / TIME OUTSIDE</p>
          <h1>Come for the lake.<br /><em>Stay for everything around it.</em></h1>
          <p className={s.heroIntro}>A northwoods lodge built around clear water, cedar, long evenings, and time with the people you brought with you.</p>
          <div className={s.heroActions}><button className={s.button} onClick={() => scrollToSection("activities")} type="button">SEE THE DAYS OUTSIDE</button><button className={s.buttonGhost} onClick={() => scrollToSection("stays")} type="button">EXPLORE LODGING</button></div>
          <div className={s.heroMeta}><span><b>01</b> WATER</span><span><b>02</b> TRAILS</span><span><b>03</b> CAMPING + RV</span><span><b>04</b> WILDLIFE</span></div>
        </div>
      </section>

      <section className={s.introduction}>
        <div><p className={s.eyebrow}>THE NORTHSHORE IDEA</p><h2>Pack less. Notice more.</h2></div>
        <p>Northshore is a place for people who would rather spend the day outside and let the schedule soften around them. Canoes by the dock. A fire after dinner. A loon somewhere out past the trees.</p>
      </section>

      <section className={s.activities} id="activities">
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>MAKE A DAY OF IT</p><h2>Outside looks different here.</h2></div><p className={s.sectionLead}>Choose a starting point. Leave room for the rest.</p></div>
        <div className={s.activityGrid}>{activities.map((item, index) => <button className={index === activity ? s.activityActive : s.activity} key={item.name} onClick={() => setActivity(index)} aria-pressed={index === activity} type="button"><span className={s.activityImage}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 25vw" style={{ objectFit: "cover" }} /></span><span className={s.activityType}>{item.type}</span><strong>{item.name}</strong><span className={s.activityCopy}>{item.copy}</span></button>)}</div>
        <div className={s.activityFeature}><div className={s.featureImage}><Image src={activities[activity].image} alt={activities[activity].alt} fill sizes="(max-width: 800px) 100vw, 48vw" style={{ objectFit: "cover" }} /></div><div className={s.featureCopy}><p className={s.eyebrow}>{activities[activity].type}</p><h3>{activities[activity].name}</h3><p>{activities[activity].copy}</p><button className={s.textButton} onClick={() => scrollToSection("inquiry")} type="button">BUILD A WEEKEND AROUND THIS <span>↗</span></button></div></div>
        <div className={s.activityDirectory}><div><p className={s.eyebrow}>OUTDOOR ACTIVITIES</p><h3>Pick your pace.</h3><p>Water, woods, weather, and a few good reasons to stay outside all day.</p></div><ul>{outdoorActivities.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className={s.stays} id="stays">
        <div className={s.stayIntro}><p className={s.eyebrow}>FIND YOUR PLACE</p><h2>Bring a weekend.<br /><em>We&apos;ll handle the setting.</em></h2><p>Choose a cabin, a tent site, or an RV site that fits your group. The planning form is ready to show the experience, but it is not connected to live availability.</p><div className={s.stayButtons}>{stays.map((item, index) => <button key={item.name} aria-pressed={stay === index} className={stay === index ? s.stayActive : s.stayButton} onClick={() => setStay(index)} type="button"><span>0{index + 1}</span>{item.name}</button>)}</div></div>
        <div className={s.stayCard}><div className={s.stayImage}><Image src={stays[stay].image} alt={stays[stay].alt} fill sizes="(max-width: 800px) 100vw, 52vw" style={{ objectFit: "cover" }} /></div><div className={s.stayDetails}><span>{stays[stay].name}</span><h3>{stays[stay].detail}</h3><button className={s.button} onClick={() => scrollToSection("inquiry")} type="button">ASK ABOUT THIS SPACE</button></div></div>
      </section>

      <section className={s.seasons}>
        <div className={s.seasonCopy}><p className={s.eyebrow}>THE SAME PLACE, ANOTHER SEASON</p><h2>What are you in the mood for?</h2><nav className={s.seasonTabs} aria-label="Northshore seasons">{(["WINTER", "SPRING", "SUMMER", "AUTUMN"] as Season[]).map((item) => <button key={item} aria-pressed={season === item} className={season === item ? s.seasonActive : s.seasonButton} onClick={() => setSeason(item)} type="button">{item}</button>)}</nav><p className={s.seasonDescription}>{seasonCopy[season]}</p></div><div className={s.seasonImage}><Image src={seasonImages[season].src} alt={seasonImages[season].alt} fill sizes="(max-width: 800px) 100vw, 52vw" style={{ objectFit: "cover" }} /></div>
      </section>

      <section className={s.moments}><div className={s.sectionHeading}><div><p className={s.eyebrow}>THE PARTS YOU REMEMBER</p><h2>Keep the day open.</h2></div><p className={s.sectionLead}>The lodge is only the beginning. The good stuff happens out past the front door.</p></div><div className={s.momentGrid}><article><div className={s.momentImage}><Image src="/media/northshore-lodge/northshore_bonfire_1787300240354.jpg" alt="Friends making s'mores around a lakeside bonfire" fill sizes="(max-width: 800px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><p>AFTER DARK</p><h3>Make s&apos;mores until the stories get better.</h3></article><article><div className={s.momentImage}><Image src="/media/northshore-lodge/northshore_canoeing_1787300257136.jpg" alt="A canoeist crossing a lake at sunset" fill sizes="(max-width: 800px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><p>ON THE WATER</p><h3>Take the long way back to the dock.</h3></article><article><div className={s.momentImage}><Image src="/media/production/northshore/northshore-loon.png" alt="A loon floating on a lake with mountains behind it" fill sizes="(max-width: 800px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><p>WILDLIFE + WATER</p><h3>Watch the lake wake up before you do.</h3></article></div></section>

      <section className={s.inquiry} id="inquiry"><div className={s.inquiryIntro}><p className={s.eyebrow}>START PLANNING YOUR STAY</p><h2>Tell us what kind of weekend you want.</h2><p>Use the form to show what you are looking for. It does not send a message, check inventory, or create a reservation.</p></div><form className={s.inquiryForm} onSubmit={handleSubmit}><div className={s.formGrid}><label><span>YOUR NAME</span><input name="name" required placeholder="Your name" /></label><label><span>EMAIL</span><input name="email" type="email" required placeholder="you@example.com" /></label><label><span>SPACE</span><select name="space" defaultValue="Lake House"><option>Lake House</option><option>Cedar Cabin</option><option>Family Cabin</option><option>Tent Camping</option><option>RV Sites</option></select></label><label><span>SEASON</span><select name="season" defaultValue="Autumn"><option>Winter</option><option>Spring</option><option>Summer</option><option>Autumn</option></select></label></div><label><span>WHAT ARE YOU PICTURING?</span><textarea name="message" rows={4} placeholder="Canoeing, fishing, a fire, a quiet morning..." /></label><button className={s.button} type="submit">SEND STAY INQUIRY</button>{submitted && <p className={s.success} aria-live="polite">Thanks — this demo does not send anything and no reservation was created.</p>}</form></section>

      <footer className={s.footer}><span>NORTHSHORE LODGE / WEBSITE DEMO</span><span>NO RATES, REVIEWS, OR AVAILABILITY ARE CLAIMED</span></footer>
    </div>
  );
}
