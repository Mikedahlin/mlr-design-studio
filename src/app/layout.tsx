import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mlrassets.com"),
  alternates: {
    canonical: "/",
  },
  title: "MLR Creative Studio — Websites, Branding & Visual Design",
  description:
    "Custom websites, branding, renderings, and graphic design with direct one-person service from start to finish.",
  keywords: [
    "small business web design",
    "custom website design",
    "logo design",
    "architectural renderings",
    "graphic design",
    "custom web development",
  ],
  openGraph: {
    title: "MLR Creative Studio — Websites, Branding & Visual Design",
    description:
      "Custom creative work with direct one-person service from start to finish.",
    url: "https://www.mlrassets.com",
    type: "website",
    locale: "en_US",
    siteName: "MLR Assets",
  },
  twitter: {
    card: "summary_large_image",
    title: "MLR Creative Studio — Websites, Branding & Visual Design",
    description:
      "Custom creative work with direct one-person service from start to finish.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased w-full max-w-full overflow-x-hidden">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "MLR Assets LLC",
              url: "https://www.mlrassets.com",
              telephone: "+13202009969",
              email: "hello@mlrassets.com",
              description:
                "Custom websites, branding, renderings, and graphic design with direct one-person service.",
              founder: {
                "@type": "Person",
                name: "Mike Dahlin",
              },
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
