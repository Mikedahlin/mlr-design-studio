import type { Metadata } from "next";
import EmberExperience from "./EmberExperience";

export const metadata: Metadata = {
  title: "Ember | Upscale Supper Club",
  description:
    "A moody hospitality site with rich food photography and old-school Minnesota warmth.",
};

export default function EmberPage() {
  return <EmberExperience />;
}
