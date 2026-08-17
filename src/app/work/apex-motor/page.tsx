import type { Metadata } from "next";
import ApexExperience from "./ApexExperience";

export const metadata: Metadata = {
  title: "Apex Motor | Calibration & Performance Workshop",
  description:
    "A fictional technical performance workshop experience for calibrated street and track builds.",
};

export default function ApexMotorPage() {
  return <ApexExperience />;
}
