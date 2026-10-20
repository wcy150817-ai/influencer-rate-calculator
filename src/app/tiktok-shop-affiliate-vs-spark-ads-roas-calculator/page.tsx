import Link from 'next/link';
import type { Metadata } from 'next';
import TikTokShopRoasCalculator from './TikTokShopRoasCalculator';

export const metadata: Metadata = {
  title: 'TikTok Shop Affiliate Commission vs Spark Ads ROAS Calculator for Brands (2026)',
  description:
    'Calculate your TikTok Shop break-even Spark Ads ROAS, Open Collaboration vs Target Collaboration creator commission margins, 6% platform referral fee impact, and Shop Ads Commission overrides (2026).',
  alternates: { canonical: '/tiktok-shop-affiliate-vs-spark-ads-roas-calculator' },
  openGraph: {
    title: 'TikTok Shop Affiliate Commission vs Spark Ads ROAS Calculator for Brands (2026)',
    description:
      'Interactive TikTok Shop unit-economics simulator: model Open Plan vs Target Plan creator CPS, avoid the Spark Ads double-commission trap, and calculate your exact break-even ROAS.',
    url: 'https://influencerratecalc.com/tiktok-shop-affiliate-vs-spark-ads-roas-calculator',
    type: 'article',
  },
};

const PAGE_URL = 'https://influencerratecalc.com/tiktok-shop-affiliate-vs-spark-ads-roas-calculator';

export default function TikTokShopAffiliateVsSparkAdsPage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'TikTok Shop Affiliate Commission vs Spark Ads ROAS Calculator for Brands (2026)',
    description:
      'A quantitative e-commerce media buying guide comparing TikTok Shop Open and Target Collaboration creator commissions against paid Spark Ads and GMV Max campaigns, including break-even ROAS equations.',
    datePublished: '2026-10-20',
    dateModified: '2026-10-20',
    mainEntityOfPage: PAGE_URL,
    author: { '@type': 'Organization', name: 'InfluencerRateCalc Media Buying & Creator Economics Desk' },
    publisher: { '@type': 'Organization', name: 'InfluencerRateCalc' },
  };

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TikTok Shop Affiliate Commission vs Spark Ads Break-Even ROAS Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All modern web browsers',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the standard TikTok Shop US referral fee in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TikTok Shop US charges a standard 6.0% platform referral fee on total Gross Merchandise Value (GMV)—calculated as item price minus seller-funded promotional discounts, excluding buyer-paid sales tax—across major categories including Beauty, Personal Care, Apparel, Health, and Home Goods.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Open Collaboration and Target Collaboration in TikTok Shop Affiliate Center?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open Collaboration (Open Plan) lists your product publicly in the TikTok Shop Creator Marketplace at a blanket commission rate (typically 10% to 20% CPS) so any eligible creator can request a sample or link your SKU. Target Collaboration (Target Plan) allows sellers to invite specific creators privately at a custom commission rate. If a creator is active in both plans for the same product, the Target Collaboration rate always overrides the Open Collaboration rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do brands pay both the creator affiliate commission and ad spend when boosting a TikTok Spark Ad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. When a customer purchases through a creator video boosted via Spark Ads (Video Shopping Ads or GMV Max), the brand pays both the paid ad spend and the creator affiliate commission. To prevent margin erosion, sellers should configure a separate, lower Shop Ads Commission rate (for example, 5% to 8% instead of 15% to 20%) inside TikTok Shop Seller Center for paid ad-attributed orders.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you calculate Break-Even ROAS for TikTok Shop Spark Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'First calculate your Pre-Ad Contribution Margin per unit: subtract Landed COGS, Fulfilled by TikTok (FBT) or seller shipping, the 6% TikTok Shop referral fee, your return reserve, and the applicable Shop Ads creator commission from your Average Order Value (AOV). Divide that dollar margin by AOV to find your Pre-Ad Contribution Margin Ratio, then compute Break-Even ROAS = 1 / Pre-Ad Contribution Margin Ratio.',
        },
      },
    ],
  };

  return (
    <div
      className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-50 text-slate-900 font-sans"
      style={{ maxWidth: '100vw', overflowX: 'hidden' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            <Link href="/" className="hover:text-slate-900 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/tiktok-vs-ig-reels-cpv" className="hover:text-slate-900 transition">
              Short-Form Video Economics
            </Link>
            <span>/</span>
            <span className="text-indigo-600">TikTok Shop Affiliate vs Spark Ads ROAS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            TikTok Shop Affiliate Commission vs Spark Ads ROAS Calculator for Brands (2026)
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Scaling on TikTok Shop requires balancing two stacked acquisition costs: <strong>Creator Affiliate Commissions (Open Plan vs Target Plan)</strong> and <strong>Paid Spark Ads / GMV Max Media Spend</strong>—all on top of TikTok&apos;s mandatory <strong>6.0% platform referral fee</strong>. Use our unit-economics calculator below to find your exact Break-Even ROAS and eliminate the &ldquo;Double-Commission Margin Trap.&rdquo;
          </p>
          <div className="mt-3 text-xs text-slate-500">
            By InfluencerRateCalc Media Buying &amp; Creator Economics Desk &bull; Updated October 20, 2026 &bull; Verified TikTok Shop Seller Center Mechanics
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full min-w-0 overflow-x-hidden box-border">
        <div className="bg-slate-100 border-l-4 border-indigo-600 p-4 rounded-r-lg text-xs sm:text-sm text-slate-700 mb-8 leading-relaxed">
          <strong>Methodology &amp; Affiliate Disclosure:</strong> All fee equations and collaboration rules in this guide are based on published TikTok Shop US Seller Center documentation (6.0% standard referral fee, Open vs Target Collaboration priority hierarchy, and Shop Ads Commission overrides). Example ROAS figures are illustrative financial models—enter your own SKU COGS and FBT rates below. Some outbound links to creator marketplaces and landing page tools are sponsored affiliate links (<code>rel=&quot;sponsored&quot;</code>) that may earn us a commission at no extra cost to you.
        </div>

        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            Why E-Commerce Brands Lose Money on Viral TikTok Shop Videos
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">
            On traditional Shopify stores running Meta or TikTok website-conversion ads, your customer acquisition cost (CAC) consists of a single variable: paid media spend. On <strong>TikTok Shop</strong>, however, every transaction flows through an integrated checkout ecosystem where <strong>platform referral fees (6.0%)</strong>, <strong>Fulfilled by TikTok (FBT) pick-pack fees</strong>, <strong>creator affiliate commissions (10% to 25% CPS)</strong>, and <strong>Spark Ads media spend</strong> stack on top of the same order.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">
            If your media buyer grabs a creator&apos;s Spark Ad authorization code and puts $10,000 behind that video in TikTok Ads Manager without adjusting your <strong>Shop Ads Commission override</strong>, your brand pays the creator&apos;s full 15%–20% organic affiliate commission <em>plus</em> the entire paid ad CPA on every boosted checkout.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6 text-sm sm:text-base">
            Before negotiating flat-fee retainer videos or whitelisting codes, benchmark your organic view costs in our <Link href="/tiktok-vs-ig-reels-cpv" className="text-indigo-600 font-semibold underline">TikTok vs Instagram Reels CPV &amp; CPM Comparison</Link>, price flat-fee creator deliverables in our <Link href="/instagram-sponsored-reel-rate-calculator" className="text-indigo-600 font-semibold underline">Instagram Sponsored Reel Rate Calculator</Link>, estimate raw creative production costs in our <Link href="/ugc-video-ad-production-cost" className="text-indigo-600 font-semibold underline">UGC Video Ad Production Cost Guide</Link>, and model media-buying margin in our <Link href="/arbitrage-roi-calculator" className="text-indigo-600 font-semibold underline">Media Buying Arbitrage ROI Calculator</Link>.
          </p>

          <div className="flex flex-wrap gap-3 my-6">
            <div dangerouslySetInnerHTML={{ __html: '<a href="https://bbux.me/r9xBvo61g" target="_blank" rel="sponsored noopener" style="display:inline-block;background:#059669;color:#ffffff !important;font-weight:700;padding:12px 20px;border-radius:10px;text-decoration:none;font-size:14px;">Hire TikTok Shop UGC Creators &amp; Ad Editors on Fiverr (CPS) &rarr;</a>' }} />
            <div dangerouslySetInnerHTML={{ __html: '<a href="https://bbux.me/P9xAgpccg" target="_blank" rel="sponsored noopener" style="display:inline-block;background:#4f46e5;color:#ffffff !important;font-weight:700;padding:12px 20px;border-radius:10px;text-decoration:none;font-size:14px;">Build High-Converting External TikTok Landing Pages on Unbounce (CPS) &rarr;</a>' }} />
            <div dangerouslySetInnerHTML={{ __html: '<a href="https://bbux.me/X9xA3jda0" target="_blank" rel="sponsored noopener" style="display:inline-block;background:#0f172a;color:#ffffff !important;font-weight:700;padding:12px 20px;border-radius:10px;text-decoration:none;font-size:14px;">Scale Mobile Ad Funnels with Instapage (CPS) &rarr;</a>' }} />
          </div>
        </section>

        <section className="mb-12">
          <TikTokShopRoasCalculator />
        </section>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            1. The Core TikTok Shop Unit-Economics &amp; Break-Even ROAS Equations
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">
            To avoid mistaking top-line Gross Merchandise Value (GMV) for net profit, e-commerce finance teams evaluate TikTok Shop SKUs using four sequential equations:
          </p>

          <div className="bg-slate-900 text-slate-100 rounded-xl p-5 font-mono text-xs sm:text-sm overflow-x-auto mb-6 border border-slate-800 leading-relaxed">
            <div>1. Platform Referral Fee ($) = AOV &times; 0.06 (Standard 6.0% TikTok Shop US Fee)</div>
            <div>2. Pre-Ad Unit Margin ($M_unit) = AOV - COGS - FBT_Shipping - Referral_Fee - Return_Reserve - Creator_Commission</div>
            <div>3. Pre-Ad Margin Ratio (m_ratio) = $M_unit &divide; AOV</div>
            <div>4. Break-Even Spark Ads ROAS = 1 &divide; m_ratio = AOV &divide; $M_unit</div>
            <div>5. Max Allowable Paid CPA = $M_unit</div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            Worked Example: $42 Beauty Serum with 15% Open Commission vs 6% Shop Ads Override
          </h3>
          <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">
            Suppose your DTC skincare brand sells a <strong>$42.00 Vitamin C Serum</strong> on TikTok Shop with <strong>$11.00 landed COGS</strong>, <strong>$4.50 FBT shipping</strong>, <strong>6.0% TikTok referral fee ($2.52)</strong>, and a <strong>3.0% refund/return allowance ($1.26)</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-slate-700 mb-6">
            <li>
              <strong>Scenario A — Pure Organic Affiliate Sale (15% Open/Target CPS = $6.30):</strong> Your net profit per organic creator order is <code>$42.00 - $11.00 - $4.50 - $2.52 - $1.26 - $6.30 = $16.42</code> (a healthy <strong>39.1% net contribution margin</strong> with zero paid ad spend risk).
            </li>
            <li>
              <strong>Scenario B — Spark Ads WITHOUT Shop Ads Commission Override (Paying 15% CPS + Ad Spend):</strong> Because your pre-ad margin is only $16.42 (39.1%), your Break-Even Spark Ads ROAS is <code>1 / 0.391 = 2.56x</code>.
            </li>
            <li>
              <strong>Scenario C — Spark Ads WITH 6% Shop Ads Commission Override ($2.52 CPS):</strong> Lowering the paid-traffic commission rate from 15% to 6% raises your pre-ad unit margin to <strong>$20.20 (48.1% of AOV)</strong>, dropping your Break-Even Spark Ads ROAS to <strong>2.08x</strong> and expanding your maximum allowable paid CPA from $16.42 to $20.20!
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            2. Open Collaboration vs Target Collaboration vs Shop Ads Commission Matrix
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">
            Inside TikTok Shop Seller Center &rarr; Affiliate Center, brands manage creator payouts across three distinct commission tiers. Understanding the priority hierarchy prevents accidental overpayments:
          </p>

          <div className="w-full max-w-full overflow-x-auto my-6 border border-slate-200 rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-semibold">
                  <th className="p-3 sm:p-4">Collaboration Tier</th>
                  <th className="p-3 sm:p-4">Typical CPS Rate</th>
                  <th className="p-3 sm:p-4">Creator Visibility &amp; Sampling</th>
                  <th className="p-3 sm:p-4">Attribution &amp; Override Rule</th>
                  <th className="p-3 sm:p-4">Primary Strategic Goal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-slate-900">Open Collaboration (Open Plan)</td>
                  <td className="p-3 sm:p-4">10% – 15% CPS</td>
                  <td className="p-3 sm:p-4">Public to all marketplace creators; auto/manual free sample filters</td>
                  <td className="p-3 sm:p-4">Baseline fallback rate for organic showcase/video links</td>
                  <td className="p-3 sm:p-4">Long-tail discovery &amp; high-volume UGC seeding</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 sm:p-4 font-bold text-slate-900">Target Collaboration (Target Plan)</td>
                  <td className="p-3 sm:p-4 font-bold text-indigo-700">15% – 25% CPS</td>
                  <td className="p-3 sm:p-4">Private invite-only link for vetted top-GMV creators</td>
                  <td className="p-3 sm:p-4"><strong>Always overrides Open Plan</strong> when both are active</td>
                  <td className="p-3 sm:p-4">Poaching high-converting category affiliates</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-slate-900">Shop Ads Commission Override</td>
                  <td className="p-3 sm:p-4 font-bold text-emerald-700">5% – 8% CPS</td>
                  <td className="p-3 sm:p-4">Applies only to creators who grant Spark Ads authorization codes</td>
                  <td className="p-3 sm:p-4"><strong>Applies only to paid Video Shopping Ads / GMV Max orders</strong></td>
                  <td className="p-3 sm:p-4">Prevents paying 20% organic CPS on paid ad traffic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            3. Spark Ads Authorization Codes, Video Shopping Ads (VSA) &amp; GMV Max Mechanics
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">
            Unlike standard dark-post ads uploaded directly into TikTok Ads Manager, <strong>Spark Ads</strong> boost an existing organic creator post directly from the creator&apos;s handle—preserving all native social proof, comment threads, profile clicks, and yellow shopping-cart anchor links.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                1. Spark Code Authorization Windows (7, 30, 60, or 365 Days)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When a creator toggles on &ldquo;Ad Settings &rarr; Generate Code&rdquo; inside the TikTok app, they select an authorization window of 7, 30, 60, or 365 days. Always require a minimum <strong>60-day or 365-day Spark authorization code</strong> in your Target Collaboration brief so your winning ad groups do not abruptly pause mid-scaling when a 7-day code expires.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                2. GMV Max &amp; Automated Creative Rotation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                TikTok&apos;s <strong>Product GMV Max</strong> and <strong>LIVE GMV Max</strong> campaign types automatically ingest every authorized affiliate Spark video associated with your Shop SKU and dynamically allocate budget toward a target ROI threshold. Because GMV Max blends organic and paid velocity, setting your <strong>Shop Ads Commission override</strong> before launching GMV Max is essential to protect net contribution margin.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            4. Free Sample Seeding Economics: How to Calculate Sample-to-Post Conversion Cost
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">
            Before a single Spark Ad dollar is spent, brands must account for the sunk cost of seeding physical units through the TikTok Shop Affiliate Center. If your landed COGS + FBT sample fulfillment equals <strong>$15.50 per unit</strong> and you ship <strong>100 free samples</strong> ($1,550 total seeding outlay):
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-xs sm:text-sm text-slate-700 mb-6">
            <li>
              <strong>Fulfillment-to-Post Rate (Typically 60%–75%):</strong> If 70 out of 100 creators actually publish a shoppable video within 14 days, your effective cost per live affiliate video is <code>$1,550 / 70 = $22.14 per video</code>—roughly 90% cheaper than hiring traditional flat-fee UGC actors off-platform.
            </li>
            <li>
              <strong>The Pareto Winner Rule (Top 10% Drive 80% of GMV):</strong> Typically, 5 to 7 of those 70 seeded videos will demonstrate an organic click-through rate (CTR &gt; 2.5%) and hook retention (2-second thumbstop &gt; 35%) strong enough to graduate into paid <strong>Spark Ads</strong>.
            </li>
          </ol>

          <div className="flex flex-wrap gap-3 my-6">
            <div dangerouslySetInnerHTML={{ __html: '<a href="https://bbux.me/r9xBvo61g" target="_blank" rel="sponsored noopener" style="display:inline-block;background:#059669;color:#ffffff !important;font-weight:700;padding:12px 20px;border-radius:10px;text-decoration:none;font-size:14px;">Book Vetted TikTok Shop Video Editors on Fiverr (CPS) &rarr;</a>' }} />
            <div dangerouslySetInnerHTML={{ __html: '<a href="https://bbux.me/P9xAgpccg" target="_blank" rel="sponsored noopener" style="display:inline-block;background:#4f46e5;color:#ffffff !important;font-weight:700;padding:12px 20px;border-radius:10px;text-decoration:none;font-size:14px;">Launch A/B Tested Pre-Sell Pages on Unbounce (CPS) &rarr;</a>' }} />
            <div dangerouslySetInnerHTML={{ __html: '<a href="https://bbux.me/WarLXD1C" target="_blank" rel="sponsored noopener" style="display:inline-block;background:#0284c7;color:#ffffff !important;font-weight:700;padding:12px 20px;border-radius:10px;text-decoration:none;font-size:14px;">Master Performance Marketing Analytics on Coursera &rarr;</a>' }} />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            5. Frequently Asked Questions: TikTok Shop Commissions &amp; Spark Ads ROAS
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                What is the standard TikTok Shop US referral fee in 2026?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                TikTok Shop US charges a standard 6.0% platform referral fee on total Gross Merchandise Value (GMV)—calculated as item price minus seller-funded promotional discounts, excluding buyer-paid sales tax—across major categories including Beauty, Personal Care, Apparel, Health, and Home Goods.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                What is the difference between Open Collaboration and Target Collaboration in TikTok Shop Affiliate Center?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Open Collaboration (Open Plan) lists your product publicly in the TikTok Shop Creator Marketplace at a blanket commission rate (typically 10% to 20% CPS) so any eligible creator can request a sample or link your SKU. Target Collaboration (Target Plan) allows sellers to invite specific creators privately at a custom commission rate. If a creator is active in both plans for the same product, the Target Collaboration rate always overrides the Open Collaboration rate.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Do brands pay both the creator affiliate commission and ad spend when boosting a TikTok Spark Ad?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes. When a customer purchases through a creator video boosted via Spark Ads (Video Shopping Ads or GMV Max), the brand pays both the paid ad spend and the creator affiliate commission. To prevent margin erosion, sellers should configure a separate, lower Shop Ads Commission rate (for example, 5% to 8% instead of 15% to 20%) inside TikTok Shop Seller Center for paid ad-attributed orders.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                How do you calculate Break-Even ROAS for TikTok Shop Spark Ads?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                First calculate your Pre-Ad Contribution Margin per unit: subtract Landed COGS, Fulfilled by TikTok (FBT) or seller shipping, the 6% TikTok Shop referral fee, your return reserve, and the applicable Shop Ads creator commission from your Average Order Value (AOV). Divide that dollar margin by AOV to find your Pre-Ad Contribution Margin Ratio, then compute Break-Even ROAS = 1 / Pre-Ad Contribution Margin Ratio.
              </p>
            </div>
          </div>
        </section>

        {(() => { return null; })()}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16 py-8 text-center text-xs text-slate-500">
        <p>&copy; 2026 InfluencerRateCalc. Independent creator economy &amp; media-buying unit economics.</p>
      </footer>
    </div>
  );
}
