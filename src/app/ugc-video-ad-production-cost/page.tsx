import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Video,
  DollarSign,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Film,
  Camera,
  Scissors,
} from 'lucide-react';
import UgcCostCalculator from './UgcCostCalculator';

const URL_PATH = 'https://influencerratecalc.com/ugc-video-ad-production-cost';
const TITLE = 'UGC Video Ad Production Costs (2026): Fiverr Creators vs Production Agencies Pricing Calculator';
const DESCRIPTION =
  'A rigorous B2B media buying analysis comparing user-generated content (UGC) video ad production costs across freelance Fiverr creators, boutique UGC marketplaces, and commercial production agencies.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/ugc-video-ad-production-cost' },
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
    q: 'How much does a single UGC video ad cost in 2026?',
    a: 'On average in 2026, direct freelance creators hired through marketplaces like Fiverr charge between $150 and $350 for a fully edited 30-to-60-second vertical video ad (often including raw B-roll and 2 to 3 alternate hook openers). Boutique UGC platforms (such as Billo or Insense) charge between $500 and $900 per video. Full-service traditional production agencies charge between $3,500 and $10,000+ per commercial project.',
  },
  {
    q: 'Why do high-end studio commercial ads frequently underperform UGC on TikTok and Instagram Reels?',
    a: 'Paid social algorithms prioritize viewer watch time and immediate engagement. High-production studio commercials look conspicuously like corporate advertisements, triggering banner blindness and leading mobile users to swipe away within the first 0.8 seconds. In contrast, authentic, smartphone-shot UGC blends natively into organic algorithmic feeds, resulting in 25% to 45% higher click-through rates (CTR) and lower effective Cost Per Acquisition (CPA).',
  },
  {
    q: 'What is the recommended ratio of creative production costs to paid ad spend?',
    a: 'Performance media buyers recommend allocating between 8% and 15% of your total monthly paid media budget to creative asset production. For example, on a $25,000 monthly ad spend, your creative production budget should range between $2,000 and $3,750, providing 10 to 15 fresh video iterations each month to combat ad fatigue.',
  },
  {
    q: 'What commercial usage rights should you secure from freelance UGC creators?',
    a: 'When commissioning UGC video ads, ensure the contract explicitly includes worldwide paid digital advertising rights (spanning Meta, TikTok, YouTube Shorts, and Pinterest) for a minimum of 6 to 12 months. Most freelance creators on Fiverr package organic portfolio rights and standard 6-month paid advertising rights directly into their commercial gig tiers.',
  },
  {
    q: 'What are hook variations and why are they vital for creative testing?',
    a: 'A hook variation involves filming 3 to 5 distinctly different opening 3-second segments for the same underlying core product demonstration video. Because the first 3 seconds dictate 70% to 80% of video retention on TikTok and Reels, testing multiple hooks allows performance marketers to discover winning creative angles at a fraction of the cost of producing entirely separate videos.',
  },
];

export default function UgcProductionCostPage() {
  const software = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UGC Video Ad Production Cost & Media Efficiency Calculator',
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
    mainEntityOfPage: URL_PATH,
    datePublished: '2026-10-14',
    dateModified: '2026-10-14',
    author: { '@type': 'Organization', name: 'InfluencerRateCalc Media Buying Research Group' },
    publisher: { '@type': 'Organization', name: 'InfluencerRateCalc' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const fiverrCtaHtml = `<a href="https://pbee.me/T21h0LEr7" target="_blank" rel="sponsored noopener" style="display:inline-block;color:#ffffff !important;background:#10b981;padding:14px 28px;border-radius:12px;font-weight:700;text-decoration:none;text-align:center;box-sizing:border-box;max-width:100%;box-shadow:0 4px 12px rgba(16,185,129,0.3)">Source Verified UGC Creators &amp; Video Editors on Fiverr &rarr;</a>`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans w-full max-w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Container */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-30 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500"></span>
            InfluencerRateCalc
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-400">
            <Link href="/tiktok-vs-ig-reels-cpv" className="hover:text-white transition">
              TikTok vs Reels CPV
            </Link>
            <Link href="/youtube-sponsorship-rate-calculator" className="hover:text-white transition">
              YouTube Sponsorships
            </Link>
            <Link href="/arbitrage-roi-calculator" className="hover:text-white transition">
              Arbitrage ROI
            </Link>
            <Link href="/native-ad-benchmarks-taboola-outbrain" className="hover:text-white transition">
              Native Ad Benchmarks
            </Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-slate-800/80 bg-slate-900/30 text-xs text-slate-400 py-2.5 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/tiktok-vs-ig-reels-cpv" className="hover:text-white">Paid Social Media Buying</Link>
          <span>/</span>
          <span className="text-slate-200">UGC Video Ad Production Costs</span>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full min-w-0 box-border">
        {/* Title Block */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            B2B Media Buying &amp; Creative Operations Guide (2026)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            UGC Video Ad Production Costs (2026): Fiverr Creators vs Production Agencies Pricing Calculator
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            In modern paid social advertising across TikTok, Meta (Instagram Reels), and YouTube Shorts, creative is the new targeting. Algorithmic delivery engines rely on rapid creative testing to overcome audience fatigue and lower customer acquisition costs. Yet many marketing teams remain trapped in obsolete agency pricing models—spending \$5,000 on a single polished commercial that fatigues in two weeks. This guide dissects unit economics, turnaround cycles, and testing efficiency between freelance creators and commercial production agencies.
          </p>
          <div className="mt-4 p-3.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400">
            <strong>Media Buying &amp; Editorial Disclosure:</strong> Rates, pricing benchmarks, and turnaround metrics cited in this report reflect verified 2026 B2B procurement data from freelance marketplaces and direct-response performance agencies. This guide contains affiliate referral links for vetted creative talent on Fiverr; our evaluations remain entirely independent.
          </div>
        </div>

        {/* Executive Comparison Summary Card */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl mb-10 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Film className="w-5 h-5 text-emerald-400" />
            Executive Snapshot: Creative Procurement Channels Compared
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-emerald-400 font-bold mb-1">Direct Freelancers (Fiverr / Upwork)</div>
              <p className="text-slate-400 leading-relaxed text-xs">
                <strong>\$150 – \$350 / video.</strong> Direct access to native content creators. Includes raw B-roll and 2-3 hook variations. Ideal for high-velocity A/B testing pipelines.
              </p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-blue-400 font-bold mb-1">Managed UGC Marketplaces (Billo / Trend)</div>
              <p className="text-slate-400 leading-relaxed text-xs">
                <strong>\$500 – \$900 / video.</strong> Automated product shipping workflows and platform escrow. Adds middleman markup without necessarily improving creative performance.
              </p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-amber-400 font-bold mb-1">Commercial Production Agencies</div>
              <p className="text-slate-400 leading-relaxed text-xs">
                <strong>\$3,500 – \$10,000+ / project.</strong> Cinema crews, studio lighting, and long pre-production cycles. High prestige for TV/OTT, but prone to banner blindness on vertical mobile feeds.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive UGC Cost Calculator */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            Interactive UGC Video Production Cost &amp; Media Efficiency Calculator
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Configure your monthly creative volume target, testing structure, and paid media budget to model your effective cost per creative hook angle and production-to-media ratio.
          </p>

          <UgcCostCalculator />
        </section>

        {/* Comprehensive Cost Matrix */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Production Model Breakdown: Deliverables, Turnaround &amp; Rights
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            When scaling a performance media buying account, evaluating production models requires examining more than just the upfront invoice. Deliverable format, hook flexibility, turnaround velocity, and licensing terms dictate overall creative agility:
          </p>

          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/60 mb-6 max-w-full">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
              <thead className="bg-slate-900 text-slate-200 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Procurement Channel</th>
                  <th className="p-3.5">Unit Cost (Finished Video)</th>
                  <th className="p-3.5">Hook Iterations Included</th>
                  <th className="p-3.5">Avg Turnaround Time</th>
                  <th className="p-3.5">Commercial Usage Rights</th>
                  <th className="p-3.5">Best Media Buying Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400">
                <tr>
                  <td className="p-3.5 font-bold text-white">Freelance Marketplace (Fiverr)</td>
                  <td className="p-3.5 text-emerald-400 font-bold">\$150 – \$350</td>
                  <td className="p-3.5 text-slate-200">2 – 4 variations standard</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">3 – 7 days</td>
                  <td className="p-3.5 text-slate-200">6–12 months digital ads included</td>
                  <td className="p-3.5">Weekly creative testing, rapid iteration</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Boutique UGC Platform (Billo/Trend)</td>
                  <td className="p-3.5 text-blue-400 font-bold">\$500 – \$900</td>
                  <td className="p-3.5 text-slate-200">1 variation (upsell for extra)</td>
                  <td className="p-3.5 text-slate-300">10 – 14 days</td>
                  <td className="p-3.5 text-slate-200">Platform perpetual digital license</td>
                  <td className="p-3.5">Hands-off physical product gifting</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Commercial Video Agency</td>
                  <td className="p-3.5 text-amber-400 font-bold">\$3,500 – \$10,000+</td>
                  <td className="p-3.5 text-slate-200">Fixed cut (costly re-edits)</td>
                  <td className="p-3.5 text-rose-400 font-semibold">3 – 6 weeks</td>
                  <td className="p-3.5 text-slate-200">Strict licensing / SAG union terms</td>
                  <td className="p-3.5">Brand equity, TV, homepage hero assets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center my-6" dangerouslySetInnerHTML={{ __html: fiverrCtaHtml }} />
        </section>

        {/* Why Production Agencies Fail on Paid Social */}
        <section className="mb-12 space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-bold text-white">
            The Algorithmic Paradox: Why \$10,000 Agency Ads Fail on TikTok &amp; Reels
          </h2>
          <p>
            In traditional broadcast television and digital billboard advertising, aesthetic polish and cinema-grade lighting conveyed institutional authority and brand prestige. However, the algorithmic architecture of vertical short-form platforms (TikTok, Instagram Reels, and YouTube Shorts) operates under inverted psychological rules.
          </p>
          <p>
            When users scroll through social feeds, their subconscious defense mechanisms actively scan for corporate marketing interruptions. High-end commercials shot on \$50,000 ARRI cinema cameras with shallow depth of field, studio backlights, and professional voiceover announcers are recognized as ads within <strong>0.3 to 0.8 seconds</strong>. The viewer swipes away before the product value proposition is ever verbalized.
          </p>
          <p>
            In contrast, authentic <strong>User-Generated Content (UGC)</strong>—captured on standard Apple iPhones or Google Pixels in natural living room or car lighting—mirrors the aesthetic of organic friend-to-friend recommendations. Viewers engage with the content as a story or candid review, allowing the creator to deliver the core problem hook and product demonstration before the viewer registers that they are watching a paid placement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-amber-500" />
                Commercial Studio Pitfalls on Paid Social
              </div>
              <ul className="text-xs sm:text-sm text-slate-400 space-y-2">
                <li>&bull; <strong>Banner Blindness:</strong> Studio gloss triggers immediate negative scroll momentum.</li>
                <li>&bull; <strong>Slow Iteration Velocity:</strong> 4-week production cycles make adapting to viral trends impossible.</li>
                <li>&bull; <strong>Exorbitant Creative Burn:</strong> A \$7,000 video that fatigues in 14 days destroys ROAS.</li>
                <li>&bull; <strong>Over-Scripted Dialogue:</strong> Corporate PR language sounds robotic on mobile feeds.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900 border border-emerald-500/30 rounded-xl">
              <div className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Performance UGC Advantages
              </div>
              <ul className="text-xs sm:text-sm text-slate-400 space-y-2">
                <li>&bull; <strong>Native Algorithmic Fit:</strong> Handheld framing bypasses ad defense mechanisms.</li>
                <li>&bull; <strong>Rapid Hook A/B Testing:</strong> 1 creator can deliver 5 hooks in a single afternoon session.</li>
                <li>&bull; <strong>Sustainable Economics:</strong> \$1,500 generates 6 to 8 fresh ad variations per month.</li>
                <li>&bull; <strong>Relatable Social Proof:</strong> Real human demonstrations solve trust deficits.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The 5-Step High-Velocity UGC Testing Playbook */}
        <section className="mb-12 space-y-5">
          <h2 className="text-2xl font-bold text-white">
            The 5-Step Performance Creative Testing Framework
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            To scale customer acquisition while keeping creative costs sub-15% of media spend, leading performance marketing teams utilize this structured production workflow:
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-black flex items-center justify-center shrink-0 text-sm">
                1
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Develop 3 Core Script Angles</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Draft three distinct conceptual frameworks for the same product: (1) <em>The Negative Problem Hook</em> (&ldquo;Stop doing X if you want Y&rdquo;), (2) <em>The Competitor Disruption Hook</em> (&ldquo;Why I threw away my expensive brand for this&rdquo;), and (3) <em>The Demonstration / Unboxing Hook</em>.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-black flex items-center justify-center shrink-0 text-sm">
                2
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Source Specialized Freelance Creators on Fiverr</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Filter for creators who match your core customer demographic (age, gender, aesthetic). Require video samples shot on iPhone 14 Pro or newer. Order packages that include raw B-roll and 3 distinct opening hook variations.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-black flex items-center justify-center shrink-0 text-sm">
                3
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Modular Post-Production Assembly</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Splice the 3 recorded hooks across 2 different body demonstrations. From a single \$250 creator commission, your video editor can generate <strong>6 unique video iterations</strong> with minimal editing effort.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-black flex items-center justify-center shrink-0 text-sm">
                4
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Dynamic Creative Testing (DCT) Launch</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Deploy all 6 video variations into a Meta Advantage+ Creative or TikTok Dynamic Showcase campaign with 3 text copy options. Allocate \$500 across 3 days to identify the winning hook retention curve.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-black flex items-center justify-center shrink-0 text-sm">
                5
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Scale Winner via Spark / Partnership Ads</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Take the top-performing creative variation and boost it directly through the creator’s native profile using TikTok Spark Ads or Meta Partnership Ads to capture lowest eCPA. For full channel view costs, review our <Link href="/tiktok-vs-ig-reels-cpv" className="text-emerald-400 underline">TikTok vs Reels CPV Benchmarks guide</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Section: The Anatomy of a High-Converting 45-Second UGC Script */}
        <section className="mb-12 space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-bold text-white">
            The Anatomy of a High-Converting 45-Second Direct-Response UGC Script
          </h2>
          <p>
            Commissioning freelance creators without a structured script blueprint frequently leads to disorganized footage that fails to drive purchasing intent. Top direct-to-consumer performance media buyers enforce a standardized 5-beat chronological structure designed to maintain retention and optimize downstream conversion:
          </p>
          
          <div className="space-y-4 my-6">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <span>Beat 1: The Visual &amp; Verbal Hook</span>
                <span>0:00 – 0:03</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Pattern Interrupt &amp; Core Friction</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The first 3 seconds determine whether an ad achieves scale. Successful hooks present an unexpected visual motion (e.g., pouring, applying, tapping, or tossing) paired with a high-conviction controversial or problem-centric statement (&ldquo;If you still do X to solve Y, please stop immediately&rdquo;). Avoid corporate logos or slow introductions.
              </p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                <span>Beat 2: Problem Agitation &amp; Relatable Frustration</span>
                <span>0:03 – 0:12</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Mirroring the Buyer&apos;s Daily Struggle</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The creator articulates the specific emotional or physical pain point that existing market alternatives failed to resolve. Demonstrating vulnerability creates parasocial trust that traditional television commercials cannot replicate.
              </p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <span>Beat 3: The Discovery &amp; Functional Demonstration</span>
                <span>0:12 – 0:25</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Mechanism of Action (B-Roll Focus)</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Close-up macro demonstration of the product in active use. The voiceover explains <em>how</em> the product functions differently from legacy solutions. Cutting rapidly between creator talking head and b-roll footage keeps eye-tracking active.
              </p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                <span>Beat 4: Concrete Transformation &amp; Social Proof</span>
                <span>0:25 – 0:35</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Proof, Clinical Backing &amp; Guarantees</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Clear presentation of before/after outcomes, third-party press mentions, dermatologist approvals, or customer review volume (&ldquo;Over 50,000 5-star reviews&rdquo;). This mitigates purchase hesitation and financial risk.
              </p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                <span>Beat 5: Urgent Call to Action (CTA)</span>
                <span>0:35 – 0:45</span>
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Direct Next Steps &amp; Risk Reversal</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Clear verbal direction instructing the viewer to click the link below, paired with an on-screen text banner highlighting free shipping, a seasonal discount, or a 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </section>

        {/* Legal & Licensing Protection */}
        <section className="mb-12 space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-bold text-white">
            Contractual Protection: 4 Crucial Clauses for Freelance UGC Agreements
          </h2>
          <p>
            When engaging creators outside of traditional modeling agencies, disputes frequently arise over intellectual property and usage rights. Ensure your procurement agreements or marketplace order terms explicitly codify the following protections:
          </p>
          <ul className="space-y-3 text-slate-400 text-xs sm:text-sm">
            <li className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
              <strong className="text-slate-200 block mb-0.5">1. Paid Advertising Whitelisting &amp; Dark Posting Permissions:</strong>
              The creator grants the brand authorization to run the video as a dark ad and generate TikTok Spark Ad authorization codes or Meta Partnership Access Tokens without requiring public organic timeline posting.
            </li>
            <li className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
              <strong className="text-slate-200 block mb-0.5">2. Mandatory Raw B-Roll Delivery:</strong>
              Contracts must mandate delivery of uncompressed raw video files (recorded at 4K 60fps) without pre-baked filters, text overlays, or background music. This allows internal editors to endlessly repurpose footage.
            </li>
            <li className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
              <strong className="text-slate-200 block mb-0.5">3. 12-Month Worldwide Digital Commercial Rights:</strong>
              Avoid restrictive 30-day usage windows. Standard freelance packages should provide a minimum of 6 to 12 months of global digital paid media rights across Meta, TikTok, Google/YouTube, and Pinterest.
            </li>
            <li className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
              <strong className="text-slate-200 block mb-0.5">4. FTC Compliance &amp; Trademark Indemnification:</strong>
              The creator agrees to disclose the partnership in accordance with Federal Trade Commission (FTC) guidelines and guarantees that no copyrighted background music or third-party trademarks appear in the frame.
            </li>
          </ul>
        </section>

        {/* Final Conversion CTA Banner */}
        <div className="p-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl text-center my-10 shadow-xl">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-2">
            Build Your Creative Testing Pipeline for Under \$100 Per Angle
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
            Stop overpaying traditional agencies for slow, bloated video production. Access thousands of native English, Spanish, and European UGC creators, actors, and professional short-form editors directly on Fiverr.
          </p>
          <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: fiverrCtaHtml }} />
          <div className="text-[11px] text-slate-500 mt-4">
            Transparent pricing &bull; Direct creator communication &bull; Commercial usage rights included
          </div>
        </div>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl cursor-pointer">
                <summary className="font-semibold text-white text-sm sm:text-base">{f.q}</summary>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4">
          <p>© 2026 InfluencerRateCalc. Independent media buying benchmarks, sponsorship calculators, and unit economics research.</p>
        </div>
      </footer>
    </div>
  );
}
