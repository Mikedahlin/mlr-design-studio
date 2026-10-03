import Link from "next/link";

export default function BuffaloKingWork() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 24,
        textAlign: "center",
      }}
    >
      <p style={{ letterSpacing: "0.15em", fontSize: 12, color: "#8a7a5c" }}>LIVE BUILD / SLOT GAME</p>
      <h1 style={{ fontSize: 44, fontWeight: 800 }}>Buffalo King</h1>
      <p style={{ maxWidth: 520, color: "#666" }}>
        A fully playable web slot game — custom art, video, and sound, built from scratch and running live in the
        browser.
      </p>
      <a
        href="https://buffalo-king.vercel.app"
        style={{ padding: "14px 28px", border: "1px solid #d59a32", borderRadius: 9999, color: "#d59a32" }}
      >
        Play Buffalo King →
      </a>
      <Link href="/work" style={{ fontSize: 13, color: "#888" }}>
        ← Back to work
      </Link>
    </main>
  );
}