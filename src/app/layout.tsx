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
  title: "60BELOW — Interactive Digital Studio",
  description: "Interactive digital art, spatial interfaces, and experimental web systems.",
  openGraph: {
    title: "60BELOW — Interactive Digital Studio",
    description: "Interactive digital art, spatial interfaces, and experimental web systems.",
    url: "https://www.mlrassets.com",
    type: "website",
    locale: "en_US",
    siteName: "60BELOW",
  },
  twitter: {
    card: "summary_large_image",
    title: "60BELOW — Interactive Digital Studio",
    description: "Interactive digital art, spatial interfaces, and experimental web systems.",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
