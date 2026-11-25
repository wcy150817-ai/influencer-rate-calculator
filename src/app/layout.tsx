import type { Metadata } from "next";
import "./globals.css";

const geistSans = {
  variable: "font-sans",
};

const geistMono = {
  variable: "font-mono",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.influencerratecalc.com"),
  title: "Influencer Rate Calculator (2026) - Free Brand Deal & Sponsorship Pricing Tool",
  description:
    "Calculate how much to charge brands for sponsored posts across TikTok, Instagram, YouTube, and X. Get instant recommended rates, CPM benchmarks, and copyable email pitch scripts.",
  keywords: [
    "influencer rate calculator",
    "sponsored post pricing",
    "how much to charge for brand deal",
    "tiktok sponsorship calculator",
    "youtube sponsor rate calculator",
    "creator rate card generator",
    "instagram sponsorship calculator",
  ],
  authors: [{ name: "InfluencerRateCalc" }],
  openGraph: {
    title: "Influencer Rate Calculator - Free Brand Deal Pricing Tool",
    description:
      "Calculate your fair sponsorship rates across YouTube, TikTok, Instagram & X in seconds.",
    url: "https://www.influencerratecalc.com",
    siteName: "InfluencerRateCalc",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Influencer Rate Calculator (2026)",
    description:
      "Know your worth. Calculate instant brand deal pricing and copy pitch scripts.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
