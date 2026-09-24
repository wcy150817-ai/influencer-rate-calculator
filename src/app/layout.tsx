import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://influencerratecalc.com"),
  alternates: {
    canonical: "/",
  },
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
    url: "https://influencerratecalc.com",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Influencer Rate Calculator",
              applicationCategory: "BusinessApplication",
              operatingSystem: "All",
              description:
                "Free online calculator for creators and influencers to calculate fair market rates for brand sponsorships.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
