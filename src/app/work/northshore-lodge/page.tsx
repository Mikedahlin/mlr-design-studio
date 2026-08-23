import type { Metadata } from "next";
import NorthshoreExperience from "./NorthshoreExperienceRebuild";

export const metadata: Metadata = {
  title: "Northshore Lodge | Minnesota Resort",
  description:
    "A northwoods lodge experience focused on cedar, clear water, outdoor activities, cabins, camping, and RV sites.",
};

export default function NorthshoreLodgePage() {
  return <NorthshoreExperience />;
}
