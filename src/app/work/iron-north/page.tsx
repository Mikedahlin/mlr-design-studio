import type { Metadata } from "next";
import IronNorthExperience from "./IronNorthExperience";

export const metadata: Metadata = {
  title: "Iron North | Commercial Construction",
  description:
    "A cinematic construction brand built around scale, trust, and raw industrial confidence.",
};

export default function IronNorthPage() {
  return <IronNorthExperience />;
}
