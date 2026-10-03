import Link from "next/link";

export default function AlleyCatInkWork() {
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
      <p style={{ letterSpacing: "0.15em", fontSize: 12, color: "#8a7a5c" }}>LIVE BUILD / TATTOO &amp; PIERCING STUDIO</p>
      <h1 style={{ fontSize: 44, fontWeight: 800 }}>Alley Cat Ink</h1>
      <p style={{ maxWidth: 520, color: "#666" }}>
        A fast, mobile-first site for a Hutchinson, MN tattoo studio — custom work, cover-ups, flash, and piercing with
        walk-ins welcome. LocalBusiness schema, sitemap, and SEO built in.
      </p>
      <a
        href="https://www.alleycatinkmn.com"
        style={{ padding: "14px 28px", border: "1px solid #e8a038", borderRadius: 9999, color: "#e8a038" }}
      >
        Visit alleycatinkmn.com →
      </a>
      <Link href="/work" style={{ fontSize: 13, color: "#888" }}>
        ← Back to work
      </Link>
    </main>
  );
}