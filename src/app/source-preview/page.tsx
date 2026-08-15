import type { Metadata } from "next";
import OpeningExperience from "@/components/OpeningExperience";

export const metadata: Metadata = {
  title: "Source Preview | MLR Assets",
  robots: { index: false, follow: false },
};

export default function SourcePreviewPage() {
  return <OpeningExperience />;
}
