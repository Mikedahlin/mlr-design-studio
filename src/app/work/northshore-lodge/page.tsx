import type { Metadata } from "next";
import NorthshoreExperience from "./NorthshoreExperience";

export const metadata: Metadata = {
  title: "Northshore Lodge | Minnesota Resort",
  description:
    "A tranquil resort experience focused on tactile luxury, cedar, and quiet water.",
};

export default function NorthshoreLodgePage() {
  return <NorthshoreExperience />;
}
