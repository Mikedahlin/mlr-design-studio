import type { Metadata } from "next";
import Northshore from "./Northshore";

export const metadata: Metadata = {
  title: "Northshore Lodge | MLR Creative Studio",
  description: "Minnesota resort concept — the lake is waiting.",
};

export default function Page() {
  return <Northshore />;
}
