export type LockedConcept = {
  slug: string;
  name: string;
  industry: string;
  image: string;
  video?: string;
  videoMobile?: string;
  poster?: string;
  accent: string;
  bg: string;
  ink: string;
  sub: string;
  line: string;
};
export const lockedConcepts: LockedConcept[] = [
  {
    slug: "iron-north",
    name: "Iron North",
    industry: "Concept Experience / Commercial Construction",
    image: "/media/production/ironnorth/ironnorth-glass-hero.webp",
    video: "/media/card-previews/iron-north-three-clip-reel.mp4",
    videoMobile: "/media/card-previews/iron-north-three-clip-reel.mp4",
    poster: "/media/card-previews/posters/iron-north.jpg",
    accent: "#ff5a1f",
    bg: "#101215",
    ink: "#f4f4f1",
    sub: "Minnesota steel. Serious work.",
    line: "A cinematic construction brand built around scale, trust, and raw industrial confidence.",
  },
  {
    slug: "ember",
    name: "Ember",
    industry: "Concept Experience / Upscale Supper Club",
    image: "/media/production/ember/ember-dish-hero.webp",
    video: "/media/card-previews/ember-clean-reel-20260831.mp4",
    videoMobile: "/media/card-previews/ember-clean-reel-20260831.mp4",
    poster: "/media/card-previews/posters/ember.jpg",
    accent: "#d08b61",
    bg: "#2a0b09",
    ink: "#fff0df",
    sub: "Fire, bourbon, and a table after dark.",
    line: "A moody hospitality site with rich food photography and old-school Minnesota warmth.",
  },
  {
    slug: "apex-motor",
    name: "Apex Motor Co.",
    industry: "Concept Experience / Performance Automotive",
    image: "/media/production/apex/apex-hero-car-card-CONCEPT.webp",
    video: "/media/card-previews/apex-motor-american-performance-reel.mp4",
    videoMobile: "/media/card-previews/apex-motor-american-performance-reel.mp4",
    poster: "/media/card-previews/posters/apex-motor.jpg",
    accent: "#2f7cff",
    bg: "#06080d",
    ink: "#f4f6fa",
    sub: "Built beyond stock.",
    line: "A high-contrast motorsport site made for tuning, dyno proof, and premium builds.",
  },
  {
    slug: "white-pine-dental",
    name: "White Pine Dental",
    industry: "Concept Experience / Modern Dentistry",
    image: "/media/production/whitepine/whitepine-chair-card-CONCEPT.webp",
    video: "/media/card-previews/white-pine-dental-clean-reel.mp4",
    videoMobile: "/media/card-previews/white-pine-dental-clean-reel.mp4",
    poster: "/media/card-previews/posters/white-pine-dental.jpg",
    accent: "#6d9278",
    bg: "#f1f0e9",
    ink: "#193629",
    sub: "Clean, calm, not cold.",
    line: "A healthcare site that feels modern and trustworthy without looking sterile.",
  },
  {
    slug: "northshore-lodge",
    name: "Northshore Lodge",
    industry: "Concept Experience / Minnesota Resort",
    image: "/media/production/northshore/northshore-render-1.webp",
    video: "/media/card-previews/northshore-lodge-clean-reel.mp4",
    videoMobile: "/media/card-previews/northshore-lodge-clean-reel.mp4",
    poster: "/media/card-previews/posters/northshore-lodge.jpg",
    accent: "#dc9447",
    bg: "#14201c",
    ink: "#f4ead5",
    sub: "The lake is waiting.",
    line: "A premium travel site built around quiet water, warm timber, and northern Minnesota escape.",
  },
  {
    slug: "velvet-room",
    name: "Velvet Room",
    industry: "Concept Experience / Salon & Beauty Studio",
    image: "/media/production/velvet/velvet-salon-card-CONCEPT.webp",
    video: "/media/card-previews/velvet-room-clean-reel.mp4",
    videoMobile: "/media/card-previews/velvet-room-clean-reel.mp4",
    poster: "/media/card-previews/posters/velvet-room.jpg",
    accent: "#ff9eb1",
    bg: "#4a1523",
    ink: "#fae6df",
    sub: "Your hair, louder.",
    line: "A fashion-forward salon site with editorial attitude and bold beauty movement.",
  },
  {
    slug: "buffalo-king",
    name: "Buffalo King",
    industry: "Live Build / Slot Game",
    image: "/media/card-previews/buffalo-king-action.jpg",
    video: "/media/card-previews/buffalo-king-action.mp4",
    videoMobile: "/media/card-previews/buffalo-king-action.mp4",
    poster: "/media/card-previews/buffalo-king-action.jpg",
    accent: "#d59a32",
    bg: "#1a1206",
    ink: "#ffe9c4",
    sub: "Spin the reels.",
    line: "A fully playable web slot game with custom art, video, and sound - live at buffalo-king.vercel.app.",
  },
  {
    slug: "alley-cat-ink",
    name: "Alley Cat Ink",
    industry: "Live Build / Tattoo & Piercing Studio",
    image: "/media/production/alley-cat/alley-cat-card.jpg",
    video: "/media/card-previews/alley-cat-reel.mp4",
    videoMobile: "/media/card-previews/alley-cat-reel.mp4",
    poster: "/media/card-previews/posters/alley-cat-ink.jpg",
    accent: "#e8a038",
    bg: "#0b0f0d",
    ink: "#f4f4f1",
    sub: "Walk-ins welcome.",
    line: "A fast, mobile-first site for a Hutchinson tattoo studio - live at alleycatinkmn.com.",
  }
];
