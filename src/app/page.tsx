import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import HomeRateCalculatorClient from "./HomeRateCalculatorClient";

const SITE = "https://www.influencerratecalc.com";

export const metadata: Metadata = {
  title: "Influencer Rate Calculator (2026) — Free Brand Deal & Sponsorship Pricing Tool",
  description:
    "Calculate fair sponsorship rates across YouTube, TikTok, Instagram, LinkedIn, Podcasts, and Newsletters—plus beginner brand deal pitch guides and 23 creator economics calculators.",
  alternates: {
    canonical: SITE,
  },
  openGraph: {
    title: "Influencer Rate Calculator (2026) — Free Brand Deal & Sponsorship Pricing Tool",
    description:
      "Calculate fair sponsorship rates across YouTube, TikTok, Instagram, LinkedIn, Podcasts, and Newsletters.",
    url: SITE,
    type: "website",
    images: [{ url: `${SITE}/images/irc-hero-creator-studio.jpg` }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Influencer Rate Calculator",
      url: SITE,
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do brands calculate what they are willing to pay a creator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Brand marketers evaluate creator deals primarily on expected impressions (CPM) and estimated conversions (CPA). Rather than paying for vanity follower counts, sponsor teams inspect your median views over your most recent 10 to 20 uploads alongside audience geography and category purchase intent.",
          },
        },
        {
          "@type": "Question",
          name: "Can a small creator under 10,000 followers charge cash for brand deals?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Small creators with focused audiences or strong short-form camera skills regularly earn paid fees through two channels: niche sponsorship integrations where high buyer trust offsets smaller reach, and User-Generated Content (UGC) licensing where brands pay for your filming and editing labor to run on their own ad accounts.",
          },
        },
        {
          "@type": "Question",
          name: "Do I legally have to disclose gifted products if a brand did not pay me cash?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Under the FTC Endorsement Guides (16 CFR Part 255), receiving free or discounted merchandise counts as a material connection even if no money changed hands and no post was guaranteed. Disclosures such as #gifted, #ad, or clear spoken statements must appear upfront where viewers cannot miss them.",
          },
        },
        {
          "@type": "Question",
          name: "How much extra should creators charge for Spark Ads, whitelisting, or usage rights?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An organic sponsorship quote covers posting on your own channel only. When a brand asks for a TikTok Spark Ad code, Meta Partnership Ad access, or raw video files for paid social ads, standard creator licensing adds 30% to 50% of the base production rate for each 30-day paid usage window.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-lg shadow-fuchsia-500/20">
              <DollarSign className="w-5 h-5 font-bold" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">InfluencerRate</span>
              <span className="text-cyan-400 font-extrabold text-lg">Calc</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-300">
            <Link href="/first-brand-deal-pitch-guide-small-creators" className="text-fuchsia-300 hover:text-fuchsia-200">
              First Brand Deal Guide
            </Link>
            <Link href="/youtube-sponsorship-rate-calculator" className="hover:text-cyan-300">
              YouTube Rates
            </Link>
            <Link href="/tiktok-vs-ig-reels-cpv" className="hover:text-cyan-300">
              TikTok &amp; Reels
            </Link>
            <Link href="/influencer-usage-rights-exclusivity-buyout-calculator" className="hover:text-cyan-300">
              Usage Rights
            </Link>
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Free &amp; Browser-Local
            </span>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800 py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.22),transparent_48%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.20),transparent_46%)]" />
        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-400/30">
              <Sparkles className="w-3.5 h-3.5" /> 2026 Creator Sponsorship &amp; UGC Pricing Suite
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              How Much Should You Charge for a Sponsored Post?
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Whether you just hit 2,000 followers and got your first &quot;free product&quot; DM or you manage six-figure YouTube and newsletter ad buys—model fair CPM rates, usage rights add-ons, and ready-to-send pitch emails in seconds.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/first-brand-deal-pitch-guide-small-creators"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-slate-950 hover:opacity-95 transition shadow-lg shadow-fuchsia-500/20"
              >
                Under 10K Followers? First Paid Deal Playbook <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ugc-video-ad-production-cost"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-slate-900 text-slate-100 border border-slate-700 hover:border-cyan-400/60 transition"
              >
                UGC Video Pricing Calculator
              </Link>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Editorial &amp; Affiliate Disclosure:</strong> All rate calculators run 100% free in your browser using transparent CPM and production-hour formulas. Some creator gear and software guides include sponsored partner links at no extra cost to you.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-fuchsia-400/30 shadow-2xl shadow-fuchsia-950/60 bg-slate-900">
              <img
                src="/images/irc-hero-creator-studio.jpg"
                alt="Dark neon creator studio with mirrorless cinema camera on carbon tripod and broadcast podcast microphone lit by cyan and magenta LED tubes"
                width={1440}
                height={810}
                className="w-full h-auto object-cover block"
              />
              <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-cyan-300">23 Free Creator Calculators</span>
                <span>YouTube &bull; TikTok &bull; Reels &bull; UGC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 md:py-12 w-full space-y-14 leading-relaxed">
        {/* Interactive Rate Calculator + Illustrated Everyday Creator Guides & Full Directory */}
        <HomeRateCalculatorClient hideChrome />

        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fuchsia-700">
                <Sparkles className="w-3.5 h-3.5" /> Everyday Creator Starter Guides
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                New to Sponsorships? Practical Guides for Everyday Creators
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Approachable step-by-step playbooks for pitching brands, turning gifted DMs into cash budgets, and protecting your video rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <Link href="/first-brand-deal-pitch-guide-small-creators" className="block overflow-hidden bg-slate-950">
                <img
                  src="/images/irc-card-first-deal.jpg"
                  alt="Small creator filming unbranded frosted skincare dropper bottles and wireless earbuds on a desk rig with LED key light and purple neon shelf glow"
                  width={1440}
                  height={810}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-fuchsia-50 text-fuchsia-800 border border-fuchsia-200">
                    Under 10K Followers
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    <Link href="/first-brand-deal-pitch-guide-small-creators" className="hover:text-fuchsia-700">
                      How Small Creators Land Their First Paid Brand Deal (2026 Pitch Guide)
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600">
                    How to reply to &quot;free product only&quot; emails, build a one-page media kit, stay compliant with FTC <code>#ad</code> rules, and quote your first $150–$500 package.
                  </p>
                </div>
                <Link href="/first-brand-deal-pitch-guide-small-creators" className="text-xs font-extrabold text-fuchsia-700 hover:text-fuchsia-900 inline-flex items-center gap-1">
                  Read Starter Playbook &amp; Evaluator &rarr;
                </Link>
              </div>
            </article>

            <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <Link href="/influencer-usage-rights-exclusivity-buyout-calculator" className="block overflow-hidden bg-slate-950">
                <img
                  src="/images/irc-hero-creator-studio.jpg"
                  alt="Studio camera and broadcast boom arm microphone illuminated by cyan and violet neon tubes"
                  width={1440}
                  height={810}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                    Contract Protection
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    <Link href="/influencer-usage-rights-exclusivity-buyout-calculator" className="hover:text-cyan-700">
                      Usage Rights, Exclusivity &amp; Raw Footage Buyout Calculator
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600">
                    Never sign away perpetual ad rights for free. Price 30-, 90-, and 365-day paid social usage windows and category exclusivity clauses accurately.
                  </p>
                </div>
                <Link href="/influencer-usage-rights-exclusivity-buyout-calculator" className="text-xs font-extrabold text-cyan-700 hover:text-cyan-900 inline-flex items-center gap-1">
                  Calculate Licensing Multipliers &rarr;
                </Link>
              </div>
            </article>

            <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <Link href="/ugc-video-ad-production-cost" className="block overflow-hidden bg-slate-950">
                <img
                  src="/images/irc-card-first-deal.jpg"
                  alt="Overhead smartphone rig filming desktop product demonstration with warm key lighting"
                  width={1440}
                  height={810}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                    Zero-Follower Income
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    <Link href="/ugc-video-ad-production-cost" className="hover:text-indigo-700">
                      UGC Video Ad Production Cost &amp; Hook Bundle Calculator
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600">
                    Get paid purely for filming and editing short-form product ads—even with zero followers—by bundling hook variations and B-roll deliverables.
                  </p>
                </div>
                <Link href="/ugc-video-ad-production-cost" className="text-xs font-extrabold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1">
                  Price Your UGC Packages &rarr;
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section
          aria-label="Specialized Creator and Paid Media Calculators"
          className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm"
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Complete Tool Directory (23 Calculators &amp; Playbooks)
            </p>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Specialized Sponsorship, Usage Rights &amp; Paid Media Calculators
            </h2>
            <p className="text-sm text-slate-600">
              Drill down into platform-specific sponsorship pricing, paid usage licensing multipliers, TikTok Shop unit economics, and native advertising CAC models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-3 bg-slate-50/80 rounded-xl p-5 border border-slate-200/70">
              <h3 className="font-bold text-slate-900 text-sm">
                1. Creator Sponsorship &amp; Platform Rate Calculators
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/first-brand-deal-pitch-guide-small-creators" className="text-indigo-700 hover:underline font-medium block">Small Creator First Paid Brand Deal Pitch Guide (Under 10K)</Link></li>
                <li><Link href="/youtube-sponsorship-rate-calculator" className="text-indigo-700 hover:underline font-medium block">YouTube Sponsorship Rate Calculator</Link></li>
                <li><Link href="/youtube-cpm-rpm-calculator" className="text-indigo-700 hover:underline font-medium block">YouTube CPM &amp; RPM Revenue Calculator</Link></li>
                <li><Link href="/instagram-sponsored-reel-rate-calculator" className="text-indigo-700 hover:underline font-medium block">Instagram Sponsored Reel Rate Calculator</Link></li>
                <li><Link href="/tiktok-vs-ig-reels-cpv" className="text-indigo-700 hover:underline font-medium block">TikTok vs Instagram Reels CPV &amp; Rate Comparison</Link></li>
                <li><Link href="/linkedin-b2b-influencer-thought-leader-ad-rate-calculator" className="text-indigo-700 hover:underline font-medium block">LinkedIn B2B Influencer &amp; Thought Leader Ad Calculator</Link></li>
                <li><Link href="/podcast-mid-roll-vs-pre-roll-cpm-rate-calculator" className="text-indigo-700 hover:underline font-medium block">Podcast Mid-Roll vs Pre-Roll CPM Rate Calculator</Link></li>
                <li><Link href="/substack-vs-beehiiv-vs-convertkit-sponsorship-calculator" className="text-indigo-700 hover:underline font-medium block">Substack vs Beehiiv vs ConvertKit Newsletter Sponsorship Calculator</Link></li>
                <li><Link href="/sponsored-stream-rate-calculator" className="text-indigo-700 hover:underline font-medium block">Twitch &amp; Live Stream Sponsorship Rate Calculator</Link></li>
              </ul>
            </div>

            <div className="space-y-3 bg-slate-50/80 rounded-xl p-5 border border-slate-200/70">
              <h3 className="font-bold text-slate-900 text-sm">
                2. Usage Rights, Whitelisting, UGC &amp; TikTok Shop Economics
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/influencer-usage-rights-exclusivity-buyout-calculator" className="text-indigo-700 hover:underline font-medium block">Influencer Usage Rights, Exclusivity &amp; Raw Footage Buyout Calculator</Link></li>
                <li><Link href="/influencer-whitelisting-paid-partnership-cac-calculator" className="text-indigo-700 hover:underline font-medium block">Influencer Whitelisting &amp; Paid Partnership CAC Calculator</Link></li>
                <li><Link href="/ugc-video-ad-production-cost" className="text-indigo-700 hover:underline font-medium block">UGC Video Ad Production Cost &amp; Breakeven CPA Calculator</Link></li>
                <li><Link href="/tiktok-shop-affiliate-vs-spark-ads-roas-calculator" className="text-indigo-700 hover:underline font-medium block">TikTok Shop Affiliate Commission vs Spark Ads ROAS Calculator</Link></li>
                <li><Link href="/tiktok-shop-open-vs-target-collab-margin-calculator" className="text-indigo-700 hover:underline font-medium block">TikTok Shop Open vs Target Collaboration Margin Calculator</Link></li>
              </ul>
            </div>

            <div className="space-y-3 bg-slate-50/80 rounded-xl p-5 border border-slate-200/70">
              <h3 className="font-bold text-slate-900 text-sm">
                3. Native Advertising, Arbitrage &amp; B2B Paid Media CAC
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/taboola-vs-outbrain-vs-mgid" className="text-indigo-700 hover:underline font-medium block">Taboola vs Outbrain vs MGID Break-Even CPC Calculator</Link></li>
                <li><Link href="/native-advertising-benchmarks-by-vertical-2026" className="text-indigo-700 hover:underline font-medium block">Native Advertising CTR, CPC &amp; Breakeven EPC Benchmarks by Vertical</Link></li>
                <li><Link href="/native-ad-benchmarks-taboola-outbrain" className="text-indigo-700 hover:underline font-medium block">Taboola &amp; Outbrain Native Ad Benchmarks Guide</Link></li>
                <li><Link href="/native-ad-kpi-benchmarks" className="text-indigo-700 hover:underline font-medium block">Native Ad KPI &amp; Funnel Conversion Benchmarks</Link></li>
                <li><Link href="/native-ad-pre-landing-page-calculator" className="text-indigo-700 hover:underline font-medium block">Native Ad Pre-Landing Page VSL Drop-Off Calculator</Link></li>
                <li><Link href="/b2b-saas-native-ads-cac" className="text-indigo-700 hover:underline font-medium block">B2B SaaS Native Ads Funnel Drop-Off &amp; CAC Calculator</Link></li>
                <li><Link href="/google-search-vs-bing-ads-vs-native-ads-b2b-cac" className="text-indigo-700 hover:underline font-medium block">Google Search vs Bing Ads vs Native Ads B2B CAC Comparison</Link></li>
                <li><Link href="/arbitrage-roi-calculator" className="text-indigo-700 hover:underline font-medium block">Paid Media &amp; Content Arbitrage ROI Calculator</Link></li>
                <li><Link href="/revcontent-black-friday-arbitrage" className="text-indigo-700 hover:underline font-medium block">Revcontent Q4 &amp; Black Friday Native Arbitrage Margin Calculator</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-5 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">
            How Creator Sponsorship Pricing Actually Works in 2026 (Beyond Follower Counts)
          </h2>
          <p className="text-sm sm:text-base text-slate-700">
            Five years ago, influencer marketing agencies priced creators almost entirely on subscriber tiers—paying a flat fee per ten thousand followers regardless of whether those followers still watched. Since short-form recommendation algorithms on TikTok, Instagram Reels, and YouTube Shorts decoupled reach from follower count, modern brand partnerships combine four distinct economic building blocks:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-slate-700">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">1. Median View CPM (Not Viral Outliers)</h3>
              <p>
                Sponsor buyers sort your last 10 to 15 uploads, drop the highest viral spike and the lowest outlier, and multiply your median views by a category CPM. Broad entertainment channels typically price lower per thousand views than high-margin B2B software, personal finance, or specialty skincare channels where a single customer purchase is worth hundreds of dollars.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">2. Production Labor Floor</h3>
              <p>
                Scripting, lighting, shooting B-roll, editing captions, and handling brand legal revisions takes three to eight hours even on a 45-second vertical video. For nano- and micro-creators under 10,000 followers, your production labor floor prevents you from accepting $25 CPM-only offers that pay less than minimum wage.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">3. Paid Ad Usage &amp; Whitelisting Licensing</h3>
              <p>
                Letting a brand put ad spend behind your handle (TikTok Spark Ads or Meta Partnership Ads) turns your organic video into a commercial creative asset competing in paid auctions. Licensing your likeness and raw footage in 30-day or 90-day increments—rather than signing &quot;in perpetuity&quot; contracts—often doubles a creator&apos;s total invoice.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900">4. Category Exclusivity &amp; FTC Transparency</h3>
              <p>
                If a skincare, VPN, or fintech brand asks you not to work with competing brands for 60 days, that exclusivity blocks rival income and warrants a 15% to 30% surcharge. Equally important, every paid or gifted integration must follow the FTC Endorsement Guides (16 CFR Part 255) with clear, upfront <code>#ad</code> or <code>#gifted</code> disclosures.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">
            5-Step Pre-Signature Brand Sponsorship Audit Checklist
          </h2>
          <p className="text-sm sm:text-base text-slate-700">
            Before sending your final invoice or uploading a draft video for brand legal review, verify five contract details that protect both first-time nano-creators and established full-time channels from unpaid scope creep:
          </p>
          <ol className="list-decimal pl-6 space-y-2.5 text-sm text-slate-700">
            <li>
              <strong>Separate Organic Posting From Paid Ad Amplification:</strong> Confirm in writing that your base fee covers publishing the video on your own feed only. Any TikTok Spark Ad authorization code, Meta Partnership Ad boost, YouTube paid whitelisting, or raw unwatermarked file transfer should carry a clear 30-day or 60-day licensing window rather than an open-ended perpetual grant.
            </li>
            <li>
              <strong>Narrow Competitor Exclusivity to Exact Sub-Categories:</strong> Never agree to broad exclusivity wording such as &quot;no technology, software, or beauty brands for six months.&quot; Narrow the restriction to direct product competitors (for example, &quot;standalone password managers&quot; or &quot;mineral facial sunscreens&quot;) for 30 days around your publish date.
            </li>
            <li>
              <strong>Lock Talking Points Before Filming Begins:</strong> Submit a bulleted outline or script for written brand sign-off before setting up lights and cameras. Reshooting an entire integration because a brand changed campaign messaging after delivery should trigger a reshoot fee, whereas factual caption or audio fixes fit inside one standard edit round.
            </li>
            <li>
              <strong>Specify Net-15 or Net-30 Payment Triggers From Draft Delivery:</strong> Anchor your payment clock to draft submission or publish date—never &quot;30 days after the brand finishes its quarterly campaign,&quot; which can delay payouts by four months.
            </li>
            <li>
              <strong>Verify Upfront FTC Disclosure Placement:</strong> Under 16 CFR Part 255, place unambiguous disclosures such as <code>#ad</code>, <code>#sponsored</code>, or <code>#gifted</code> at the start of text descriptions and speak or superimpose the disclosure inside video integrations so viewers never have to click &quot;more&quot; to recognize a brand partnership.
            </li>
          </ol>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">
            Frequently Asked Questions About Creator Sponsorship Rates
          </h2>

          <details className="border border-slate-200 rounded-xl p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">
              How do brands calculate what they are willing to pay a creator?
            </summary>
            <p className="mt-2 text-sm text-slate-700">
              Brand marketers evaluate creator deals primarily on expected impressions (CPM) and estimated conversions (CPA). Rather than paying for vanity follower counts, sponsor teams inspect your median views over your most recent 10 to 20 uploads alongside audience geography and category purchase intent.
            </p>
          </details>

          <details className="border border-slate-200 rounded-xl p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">
              Can a small creator under 10,000 followers charge cash for brand deals?
            </summary>
            <p className="mt-2 text-sm text-slate-700">
              Yes. Small creators with focused audiences or strong short-form camera skills regularly earn paid fees through two channels: niche sponsorship integrations where high buyer trust offsets smaller reach, and User-Generated Content (UGC) licensing where brands pay for your filming and editing labor to run on their own ad accounts.
            </p>
          </details>

          <details className="border border-slate-200 rounded-xl p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">
              Do I legally have to disclose gifted products if a brand did not pay me cash?
            </summary>
            <p className="mt-2 text-sm text-slate-700">
              Yes. Under the FTC Endorsement Guides (16 CFR Part 255), receiving free or discounted merchandise counts as a material connection even if no money changed hands and no post was guaranteed. Disclosures such as <code>#gifted</code>, <code>#ad</code>, or clear spoken statements must appear upfront where viewers cannot miss them.
            </p>
          </details>

          <details className="border border-slate-200 rounded-xl p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">
              How much extra should creators charge for Spark Ads, whitelisting, or usage rights?
            </summary>
            <p className="mt-2 text-sm text-slate-700">
              An organic sponsorship quote covers posting on your own channel only. When a brand asks for a TikTok Spark Ad code, Meta Partnership Ad access, or raw video files for paid social ads, standard creator licensing adds 30% to 50% of the base production rate for each 30-day paid usage window.
            </p>
          </details>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="text-slate-200 font-semibold">© 2026 InfluencerRateCalc. Built for creators, talent managers, and independent publishers.</p>
          <p>
            Calculators provide illustrative pricing formulas based on CPM, production labor, and usage licensing structure. Always verify contract terms and FTC disclosure rules before publishing sponsored content.
          </p>
        </div>
      </footer>
    </div>
  );
}
