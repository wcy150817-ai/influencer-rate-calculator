import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import YouTubeRateCalculator from './YouTubeRateCalculator';

const URL_PATH = 'https://influencerratecalc.com/youtube-sponsorship-rate-calculator';
const TITLE = 'YouTuber Sponsorship Rate Calculator: How Much to Pay for 100k Subs (2026)';
const DESCRIPTION =
  'Free YouTube sponsorship rate calculator and pricing guide. Calculate fair sponsor fees, view CPM benchmarks across 6 verticals, integration formats, and contracts for 100k subscriber channels.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    type: 'article',
    locale: 'en_US',
  },
};

const faqs = [
  {
    q: 'How much should you pay a YouTuber with 100k subscribers in 2026?',
    a: 'On average, a 100k subscriber YouTube channel generates between $800 and $3,500 for a standard 60-second integrated mid-roll sponsorship. The exact fee depends directly on average 30-day views (typically 10,000 to 25,000 views) and content vertical. A 100k finance channel commands $2,000 to $4,500, whereas a 100k gaming or comedy channel typically charges $800 to $1,500.',
  },
  {
    q: 'Why is subscriber count a misleading metric for sponsorship pricing?',
    a: 'Subscribers represent historical registrations rather than active attention. Dead channels with 500k subscribers may average fewer than 3,000 views per video, while hyper-active 40k subscriber channels may average 50,000 views. Sophisticated media buyers always calculate rates using 30-day median views rather than cumulative subscriber totals.',
  },
  {
    q: 'What is the standard CPM formula for YouTube sponsorships?',
    a: 'YouTube sponsorships are calculated as: Sponsorship Fee = (Estimated 30-Day Views / 1,000) * Target Niche CPM * Format Multiplier * Usage Rights Multiplier. Standard integrated 60-second mid-rolls represent the 1.0x baseline, while dedicated product reviews demand 2.5x to 3.5x multipliers.',
  },
  {
    q: 'What is paid whitelisting and how does it affect sponsorship costs?',
    a: 'Paid whitelisting allows a brand sponsor to run paid ad campaigns through the creator’s authentic handle across YouTube, Meta, or TikTok. Because the brand leverages the creator’s likeness and algorithmic credibility, creators typically charge a 30% to 60% surcharge for 30-day to 90-day advertising usage rights.',
  },
  {
    q: 'How do performance clawback clauses work in creator contracts?',
    a: 'A performance clawback or view guarantee clause stipulates that if a sponsored video fails to reach at least 70% or 80% of its agreed projected 30-day view threshold, the creator must either provide a partial fee refund or grant a free make-good integration in an upcoming video.',
  },
];

export default function YouTubeSponsorshipCalculatorPage() {
  const software = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube Sponsorship Rate Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: URL_PATH,
    description: DESCRIPTION,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    datePublished: '2026-10-12',
    dateModified: '2026-10-12',
    author: {
      '@type': 'Organization',
      name: 'InfluencerRateCalc Editorial Staff',
      url: 'https://influencerratecalc.com',
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const fiverrAffiliateHtml = `<a href="https://bbux.me/JarLdlZPa" target="_blank" rel="sponsored noopener" style="display:inline-block;color:#ffffff !important;background:#111111;padding:14px 28px;border-radius:12px;font-weight:700;text-decoration:none;text-align:center;box-sizing:border-box;max-width:100%;">Hire Freelance Video Editors &amp; Producers on Fiverr</a>`;

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-slate-950 text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-lg text-emerald-400 tracking-tight flex items-center gap-2">
            <span>InfluencerRateCalc</span>
          </Link>
          <nav className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <Link href="/arbitrage-roi-calculator" className="hover:text-emerald-400 transition">
              Arbitrage ROI
            </Link>
            <Link href="/native-ad-kpi-benchmarks" className="hover:text-emerald-400 transition">
              Native Ad Benchmarks
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 sm:py-12 w-full max-w-full min-w-0 space-y-12 box-border">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span>&gt;</span>
          <span className="text-slate-300">YouTube Sponsorship Calculator</span>
        </div>

        {/* Title Header */}
        <div>
          <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full mb-3">
            Media Buying &amp; Creator Economy Guide (2026)
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            YouTuber Sponsorship Rate Calculator: How Much to Pay for 100k Subs (2026)
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Stop overpaying for vanity subscriber metrics. Use our dynamic mathematical model to calculate fair market sponsorship rates based on 30-day verified view velocity, audience commercial intent, and ad usage rights.
          </p>
        </div>

        {/* The Interactive Calculator Component */}
        <YouTubeRateCalculator />

        {/* Section 1: The Fallacy of Subscriber-Based Pricing */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-3">
            The &quot;Price Per Subscriber&quot; Fallacy: Why 100k Subs Ranges from $500 to $5,000
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            One of the most persistent errors made by marketing coordinators and direct-to-consumer (DTC) founders is budgeting influencer campaigns using flat subscriber tiers. In 2026, algorithmic content distribution has thoroughly decoupled channel subscriber counts from actual impression delivery.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Consider two real-world channel archetypes with identical 100,000 subscriber counters:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="border border-rose-900/60 bg-rose-950/20 rounded-xl p-5 space-y-2">
              <h3 className="font-bold text-rose-300 text-sm">Channel A: Decaying Entertainment / Vlog</h3>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                <li><strong>Subscribers:</strong> 100,000 (accumulated over 7 years)</li>
                <li><strong>Recent 30-Day Views:</strong> 4,200 views per video</li>
                <li><strong>Audience Demographic:</strong> Teenagers &amp; casual streamers</li>
                <li><strong>Commercial Intent:</strong> Low; high entertainment escapism</li>
                <li><strong>True Media Value:</strong> $80 &ndash; $150 per integrated ad</li>
              </ul>
            </div>
            <div className="border border-emerald-900/60 bg-emerald-950/20 rounded-xl p-5 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm">Channel B: Specialized B2B Tech / FinTech</h3>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                <li><strong>Subscribers:</strong> 100,000 (focused tutorial catalog)</li>
                <li><strong>Recent 30-Day Views:</strong> 28,000 views per video</li>
                <li><strong>Audience Demographic:</strong> Working software engineers &amp; managers</li>
                <li><strong>Commercial Intent:</strong> Very high; viewers seeking software solutions</li>
                <li><strong>True Media Value:</strong> $1,800 &ndash; $3,200 per integrated ad</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Contracting Channel A at a flat &quot;\$20 per 1,000 subs&quot; fee (\$2,000) results in an astronomical effective view CPM of nearly \$500, destroying campaign return on ad spend (ROAS). Conversely, offering \$500 to Channel B will be immediately rejected by their talent agency.
          </p>
        </section>

        {/* Section 2: 2026 YouTube CPM Benchmarks Table by Vertical */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-3">
            2026 YouTube Sponsorship CPM Benchmarks by Industry Vertical
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            In media buying, Cost Per Mille (CPM) represents the cost to achieve 1,000 verified video impressions. Sponsorship CPMs are heavily dictated by the purchasing power of the viewer and the Average Order Value (AOV) or Lifetime Value (LTV) of the sponsoring product:
          </p>

          <div className="w-full max-w-full overflow-x-auto block border border-slate-800 rounded-xl">
            <table className="w-full text-left text-sm border-collapse min-w-[580px]">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <th className="py-3 px-4 font-bold">Content Vertical</th>
                  <th className="py-3 px-4 font-bold">Typical CPM Range</th>
                  <th className="py-3 px-4 font-bold">Audience Characteristics</th>
                  <th className="py-3 px-4 font-bold">Ideal Sponsor Profiles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400 text-xs">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Finance, Crypto &amp; Real Estate</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono font-bold">$45 &ndash; $85 CPM</td>
                  <td className="py-3 px-4">High net-worth, active investors, accredited buyers</td>
                  <td className="py-3 px-4">Fintech, brokerage apps, wealth advisors, tax tools</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">B2B SaaS, Cloud &amp; Dev Tools</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono font-bold">$35 &ndash; $70 CPM</td>
                  <td className="py-3 px-4">Corporate decision makers, devs, agency owners</td>
                  <td className="py-3 px-4">Hosting, cybersecurity, project management tools</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Health, Longevity &amp; Supplements</td>
                  <td className="py-3 px-4 text-indigo-400 font-mono font-bold">$25 &ndash; $50 CPM</td>
                  <td className="py-3 px-4">Health-conscious adults (ages 28&ndash;55), high disposable income</td>
                  <td className="py-3 px-4">Athletic greens, meal kits, wearables, mattress brands</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Productivity &amp; Career Education</td>
                  <td className="py-3 px-4 text-indigo-400 font-mono font-bold">$28 &ndash; $55 CPM</td>
                  <td className="py-3 px-4">Ambitious professionals, college grads, freelancers</td>
                  <td className="py-3 px-4">Online course academies, resume builders, audiobooks</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Lifestyle, Fashion &amp; Beauty</td>
                  <td className="py-3 px-4 text-slate-300 font-mono font-bold">$18 &ndash; $40 CPM</td>
                  <td className="py-3 px-4">DTC fashion enthusiasts, aesthetic trend seekers</td>
                  <td className="py-3 px-4">Skincare, luxury apparel, fragrance, luggage brands</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Gaming, Esports &amp; Comedy</td>
                  <td className="py-3 px-4 text-slate-300 font-mono font-bold">$12 &ndash; $30 CPM</td>
                  <td className="py-3 px-4">High-volume, younger demographics; ad-block heavy</td>
                  <td className="py-3 px-4">Mobile games, VPNs, gaming hardware, energy drinks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Integration Formats & Multipliers */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-3">
            Sponsorship Placement Formats: Integrated vs. Dedicated vs. Shorts
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The structure of the ad placement dramatically shifts viewer attention and conversion momentum. Understanding the three primary delivery formats allows media buyers to negotiate optimal value:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Industry Standard (1.0x)</span>
              <h3 className="font-bold text-white text-base">Integrated Mid-Roll (45&ndash;60s)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Appears organically between minutes 2 and 6 of a standard 12-minute long-form video. Because the viewer is already invested in the core narrative, drop-off is minimal. Delivers the highest conversion volume per dollar spent.
              </p>
            </div>

            <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Budget Option (0.6x &ndash; 0.7x)</span>
              <h3 className="font-bold text-white text-base">Pre-Roll Shoutout (15&ndash;30s)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Placed directly after the hook before the intro title sequence. While impression exposure is 100%, viewer patience is low, and many users instinctively press skip or wait out the commercial before actively engaging.
              </p>
            </div>

            <div className="border border-slate-800 bg-slate-900/60 rounded-xl p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Premium Tier (2.5x &ndash; 3.5x)</span>
              <h3 className="font-bold text-white text-base">Full Dedicated Video</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The entire 10-to-15 minute video is built around testing, reviewing, or utilizing the sponsor&apos;s product. High upfront capital requirement, but establishes evergreen search authority on YouTube SEO queries.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Negotiation Rules & Legal Protections */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-3">
            5 Ironclad Contract Clauses Every Media Buyer Must Include
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Never disburse upfront sponsorship wire transfers without a signed Insertion Order (IO) protecting your media spend against underperformance and controversy:
          </p>

          <ol className="space-y-3 text-xs sm:text-sm text-slate-300 list-decimal pl-5">
            <li>
              <strong>30-Day View Velocity Benchmark:</strong> Anchor pricing to median views from the creator&apos;s prior 10 organic uploads (excluding viral outliers and Shorts).
            </li>
            <li>
              <strong>Performance Make-Good Guarantee:</strong> If the sponsored video generates fewer than 70% of projected views within 30 days due to poor algorithmic performance, the creator must offer a free secondary integration or community tab shoutout.
            </li>
            <li>
              <strong>Strict Category Exclusivity Window:</strong> Forbid the creator from promoting a direct competitor in the same video and for a minimum 14-day window before and after publication.
            </li>
            <li>
              <strong>Paid Media Whitelisting Rights:</strong> Ensure explicit contractual permission if your media team plans to run Spark Ads or Meta partnership ads using the creator&apos;s handle.
            </li>
            <li>
              <strong>Mandatory FTC Disclosure Compliance:</strong> Require both verbal disclosure (&quot;Sponsored by...&quot;) and visual on-screen tags within the first 15 seconds to eliminate regulatory exposure.
            </li>
          </ol>
        </section>

        
        {/* Section 4b: Anatomy of a High-Converting YouTube Ad Read */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-3">
            The Anatomy of a High-Converting 60-Second YouTube Integration
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Paying fair market rates for a creator integration is only half the battle. The structural architecture of the sponsor segment determines whether viewers click through or skip forward 60 seconds with their keyboard arrows. Top-performing YouTube direct response campaigns adhere to a strict four-part anatomy:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>1. The Organic Narrative Pivot (Seconds 0&ndash;12)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Never allow a creator to shout &quot;And now a word from our sponsor!&quot; Abrupt verbal speed bumps trigger instant skip behavior. Instead, the creator must segue organically from the video topic into a relevant personal frustration that the sponsor directly addresses.
              </p>
            </div>

            <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <span>2. The Visual Screen Recording Demo (Seconds 13&ndash;35)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Talking-head endorsements convert poorly compared to live screen captures or physical product handling. The creator must demonstrate the actual software UI, physical unboxing, or workflow application, validating that they genuinely use the product.
              </p>
            </div>

            <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>3. Specific Value Proposition &amp; Pain Elimination (Seconds 36&ndash;48)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Articulate one singular core benefit rather than reading a list of ten bulleted specifications. Focus on time saved, money earned, or anxiety removed. A single sharp hook outperforms diffuse feature recitations every time.
              </p>
            </div>

            <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span>4. Frictionless CTA with Urgency Tag (Seconds 49&ndash;60)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide a short vanity URL or exclusive promotional code prominently rendered on-screen and pinned at the very top of the video description and pinned comment. Add limited-time urgency to spur same-day conversions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4c: Channel Due Diligence Checklist */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-3">
            Due Diligence: 4 Fraud Checks Before Wiring Creator Deposits
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Before signing an insertion order and wiring thousands of dollars, media buyers must perform rigorous forensic vetting to ensure subscriber and view metrics are genuine:
          </p>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
              <h3 className="font-bold text-white mb-1">1. The Shorts vs. Long-Form View Discrepancy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Many YouTube channels gained 200,000 subscribers through viral 15-second YouTube Shorts, but their 10-minute horizontal videos only average 1,500 views. Ensure the creator pricing is anchored exclusively to horizontal long-form video metrics if buying long-form integration.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
              <h3 className="font-bold text-white mb-1">2. Comment Velocity &amp; Qualitative Sentiment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect the comments on recent videos. Are viewers leaving substantive, paragraph-length responses debating the video thesis, or are comments dominated by generic emoji strings (&quot;🔥 Great video bro!&quot;) from botted accounts? Genuine audience engagement indicates high brand trust.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
              <h3 className="font-bold text-white mb-1">3. Geographic Demographic Breakdown</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Demand a screenshot of the creator&apos;s YouTube Studio geographic analytics from the past 90 days. If 70% of an English-speaking channel&apos;s audience resides in non-Tier-1 markets with lower purchasing power, but the creator quotes US-tier CPMs, recalculate your offer immediately.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
              <h3 className="font-bold text-white mb-1">4. Sponsor Saturation &amp; Burnout</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check how many consecutive videos have featured brand sponsorships. If a channel has run aggressive mobile game ads on 15 consecutive uploads, viewer fatigue will depress click-through rates. Channels that sponsor sparingly convert at 2x to 3x higher multiples.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4d: Attribution & Calculating Campaign ROAS */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-3">
            Attribution Modeling: Tracking YouTube ROI Beyond Last-Click
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unlike search ads where users click through immediately, YouTube is predominantly consumed on connected television screens (Smart TVs) and mobile apps where direct clicking is inconvenient. Media buyers who rely strictly on Google Analytics last-click UTM tracking systematically undervalue YouTube campaigns by 40% to 60%.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            To capture the true total impact of a creator sponsorship, implement a blended three-tier attribution framework:
          </p>
          <ul className="text-xs sm:text-sm text-slate-400 space-y-2 list-disc pl-5 leading-relaxed">
            <li>
              <strong>Direct Last-Click UTMs:</strong> Capture immediate purchases via tracking links in the description and pinned comments.
            </li>
            <li>
              <strong>Checkout Promo Code Redemptions:</strong> Catch buyers who watched on television or mobile and completed their purchase later on a desktop computer.
            </li>
            <li>
              <strong>Post-Purchase Survey Verification:</strong> Deploy a simple &quot;How did you hear about us?&quot; dropdown with creator attribution at checkout to measure halo brand search lift.
            </li>
          </ul>
        </section>

        {/* Section 5: Creator Production Hub CTA */}
        <section className="border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                Video Production &amp; Editing Resource
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Scaling Your YouTube Output? Hire Vetted Video Freelancers
              </h3>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                Whether you need professional scriptwriting, retention-focused video editing, or high-CTR thumbnail designers, explore verified freelance talent across global marketplaces.
              </p>
            </div>
            <div className="shrink-0" dangerouslySetInnerHTML={{ __html: fiverrAffiliateHtml }} />
          </div>
        </section>

        {/* Section 6: Frequently Asked Questions */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-slate-800 pb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="border border-slate-800 bg-slate-900/40 rounded-xl p-4 group">
                <summary className="font-bold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-slate-500 group-open:rotate-90 transition-transform">&gt;</span>
                </summary>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Section 7: Internal Ecosystem Cross-Links */}
        <section className="border-t border-slate-800 pt-6 text-xs text-slate-500 space-y-2">
          <div className="font-bold text-slate-400">Related Media Buying Tools &amp; Data Hubs:</div>
          <div className="flex flex-wrap gap-4 pt-1">
            <Link href="/arbitrage-roi-calculator" className="text-emerald-400 hover:underline">
              Arbitrage ROI Calculator: Find Your Break-Even CPC
            </Link>
            <span>&bull;</span>
            <Link href="/native-ad-kpi-benchmarks" className="text-emerald-400 hover:underline">
              2026 Native Ad KPI Benchmarks: Primary Data Hub
            </Link>
            <span>&bull;</span>
            <Link href="/native-ad-benchmarks-taboola-outbrain" className="text-emerald-400 hover:underline">
              Taboola vs Outbrain: Platform Comparison
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/60 py-8 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} InfluencerRateCalc. All rights reserved.
      </footer>
    </div>
  );
}
