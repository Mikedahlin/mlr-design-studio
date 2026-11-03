import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          background: "#03070e",
          border: "2px solid #38bdf8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f8fafc",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
        }}
      >
        -60°
      </div>
    ),
    { ...size }
  );
}
