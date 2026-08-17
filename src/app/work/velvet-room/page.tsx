import type { Metadata } from "next";
import VelvetRoomExperience from "./VelvetRoomExperience";

export const metadata: Metadata = {
  title: "Velvet Room — Editorial Salon Concept",
  description: "A fictional salon experience concept featuring transparent example pricing, a visual consultation, and a booking demonstration.",
};

export default function VelvetRoomPage() {
  return <VelvetRoomExperience />;
}
