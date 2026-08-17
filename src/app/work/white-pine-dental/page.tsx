import type { Metadata } from "next";
import WhitePineExperience from "./WhitePineExperience";

export const metadata: Metadata = {
  title: "White Pine Dental | Thoughtful Dentistry in Minnesota",
  description:
    "A fictional concept for a calm, modern Minnesota dental practice, with treatment guidance, first-visit resources, and appointment planning.",
  alternates: { canonical: "/work/white-pine-dental" },
};

export default function WhitePineDentalPage() {
  return <WhitePineExperience />;
}
