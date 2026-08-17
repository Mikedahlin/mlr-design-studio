import type { Metadata } from "next";
import CircularReelCandidate from "@/components/CircularReelCandidate";
export const metadata: Metadata = { title: "Circular Source Candidate | MLR Assets", robots: { index: false, follow: false } };
export default function CircularSourceCandidatePage() { return <CircularReelCandidate />; }
