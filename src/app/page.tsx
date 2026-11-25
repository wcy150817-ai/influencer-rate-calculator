import type { Metadata } from "next";
import Link from "next/link";
import HomeRateCalculatorClient from "./HomeRateCalculatorClient";

export const metadata: Metadata = {
  title: "Influencer Rate Calculator (2026) - Free Brand Deal & Sponsorship Pricing Tool",
  description:
    "Calculate fair sponsorship rates across YouTube, TikTok, Instagram, LinkedIn, Podcasts, and Newsletters. Explore 22 specialized creator rate, TikTok Shop ROAS, usage rights, and native ad CAC calculators.",
  alternates: {
    canonical: "https://www.influencerratecalc.com",
  },
};

const DIRECTORY_GROUPS = [
  {
    category: "Creator Sponsorship & Platform Rate Calculators",
    links: [
      { href: "/youtube-sponsorship-rate-calculator", label: "YouTube Sponsorship Rate Calculator" },
      { href: "/youtube-cpm-rpm-calculator", label: "YouTube CPM & RPM Revenue Calculator" },
      { href: "/instagram-sponsored-reel-rate-calculator", label: "Instagram Sponsored Reel Rate Calculator" },
      { href: "/tiktok-vs-ig-reels-cpv", label: "TikTok vs Instagram Reels CPV & Rate Comparison" },
      { href: "/linkedin-b2b-influencer-thought-leader-ad-rate-calculator", label: "LinkedIn B2B Influencer & Thought Leader Ad Calculator" },
      { href: "/podcast-mid-roll-vs-pre-roll-cpm-rate-calculator", label: "Podcast Mid-Roll vs Pre-Roll CPM Rate Calculator" },
      { href: "/substack-vs-beehiiv-vs-convertkit-sponsorship-calculator", label: "Substack vs Beehiiv vs ConvertKit Newsletter Sponsorship Calculator" },
      { href: "/sponsored-stream-rate-calculator", label: "Twitch & Live Stream Sponsorship Rate Calculator" },
    ],
  },
  {
    category: "Usage Rights, Whitelisting, UGC & TikTok Shop Economics",
    links: [
      { href: "/influencer-usage-rights-exclusivity-buyout-calculator", label: "Influencer Usage Rights, Exclusivity & Raw Footage Buyout Calculator" },
      { href: "/influencer-whitelisting-paid-partnership-cac-calculator", label: "Influencer Whitelisting & Paid Partnership CAC Calculator" },
      { href: "/ugc-video-ad-production-cost", label: "UGC Video Ad Production Cost & Breakeven CPA Calculator" },
      { href: "/tiktok-shop-affiliate-vs-spark-ads-roas-calculator", label: "TikTok Shop Affiliate Commission vs Spark Ads ROAS Calculator" },
      { href: "/tiktok-shop-open-vs-target-collab-margin-calculator", label: "TikTok Shop Open vs Target Collaboration Margin Calculator" },
    ],
  },
  {
    category: "Native Advertising, Arbitrage & B2B Paid Media CAC",
    links: [
      { href: "/taboola-vs-outbrain-vs-mgid", label: "Taboola vs Outbrain vs MGID Break-Even CPC Calculator" },
      { href: "/native-advertising-benchmarks-by-vertical-2026", label: "Native Advertising CTR, CPC & Breakeven EPC Benchmarks by Vertical" },
      { href: "/native-ad-benchmarks-taboola-outbrain", label: "Taboola & Outbrain Native Ad Benchmarks Guide" },
      { href: "/native-ad-kpi-benchmarks", label: "Native Ad KPI & Funnel Conversion Benchmarks" },
      { href: "/native-ad-pre-landing-page-calculator", label: "Native Ad Pre-Landing Page VSL Drop-Off Calculator" },
      { href: "/b2b-saas-native-ads-cac", label: "B2B SaaS Native Ads Funnel Drop-Off & CAC Calculator" },
      { href: "/google-search-vs-bing-ads-vs-native-ads-b2b-cac", label: "Google Search vs Bing Ads vs Native Ads B2B CAC Comparison" },
      { href: "/arbitrage-roi-calculator", label: "Paid Media & Content Arbitrage ROI Calculator" },
      { href: "/revcontent-black-friday-arbitrage", label: "Revcontent Q4 & Black Friday Native Arbitrage Margin Calculator" },
    ],
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Influencer Rate Calculator",
    url: "https://www.influencerratecalc.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    description:
      "Free online calculator suite for creators, talent managers, and paid media buyers to model sponsorship rates, usage rights buyouts, TikTok Shop margins, and native ad CAC.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do brands calculate what they are willing to pay?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brand marketers evaluate creator deals primarily on expected impressions (CPM) and estimated conversions (CPA). They look at your last 10–20 posts to gauge consistent median views rather than viral outlier hits.",
        },
      },
      {
        "@type": "Question",
        name: "What are usage rights and ad whitelisting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If a brand runs your video as a paid ad (TikTok Spark Ad, Meta Partnership Ad, or YouTube ad), standard industry practice is to charge an additional 30% to 50% licensing fee per 30–60 days of paid media usage.",
        },
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeRateCalculatorClient>
        <section
          aria-label="Specialized Creator and Paid Media Calculators"
          className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6"
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Complete Tool Suite (22 Calculators)
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Specialized Sponsorship, Usage Rights &amp; Paid Media Calculators
            </h2>
            <p className="text-sm text-slate-600">
              Drill down into platform-specific sponsorship pricing, paid usage licensing multipliers, TikTok Shop unit economics, and native advertising CAC models.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {DIRECTORY_GROUPS.map((group) => (
              <div key={group.category} className="space-y-3 bg-slate-50/70 rounded-xl p-4 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {group.category}
                </h3>
                <ul className="space-y-2 text-sm">
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-indigo-700 hover:text-indigo-900 hover:underline font-medium leading-snug block"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </HomeRateCalculatorClient>
    </>
  );
}
