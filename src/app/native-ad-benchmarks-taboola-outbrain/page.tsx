import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Layers, Scale, Settings, ClipboardCheck, HelpCircle, ChevronRight, BookOpen, ShieldCheck } from "lucide-react";

const TITLE = "Taboola vs Outbrain (2026): Bidding, Tracking, Policies and How to Choose";
const DESCRIPTION =
  "A fact-checked comparison of Taboola Realize and Outbrain Amplify: documented bid strategies, learning phases, tracking, policy considerations and a fair test plan to decide which network suits your offer.";
const URL = "https://influencerratecalc.com/native-ad-benchmarks-taboola-outbrain";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/native-ad-benchmarks-taboola-outbrain" },
};

const faqs = [
  {
    q: "Is Taboola or Outbrain cheaper?",
    a: "Neither is cheaper in general. Cost per click comes from an auction and depends on your country, device, publisher mix, creative and bid strategy. The fair way to compare is to run the same offer, landing page, geo and creative on both networks and compare cost per acquisition or return on spend.",
  },
  {
    q: "Which has better automated bidding?",
    a: "Both document automated strategies. Taboola Realize offers Maximize Conversions and Enhanced CPC powered by its SmartBid algorithm, plus a manual Fixed Bid. Outbrain Amplify offers a Conversion Bid Strategy with Target CPA, Target ROAS and Max Conversions modes. Which performs better depends on your data volume and offer, so test rather than assume.",
  },
  {
    q: "Can I reuse the same ads on both platforms?",
    a: "You can upload the same creative, but each network reviews ads under its own policies, so approval and edits can differ. Read each platform's current advertiser policy before launching, especially for health, finance and other sensitive categories.",
  },
  {
    q: "How long should I test before choosing?",
    a: "Allow for each platform's learning period and enough conversions to compare fairly. Outbrain's documentation describes a learning phase that can last up to a week. Many buyers run at least two to three weeks per network, but that is a common practice and not a platform rule.",
  },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: "2026-10-10",
  dateModified: "2026-10-12",
  mainEntityOfPage: URL,
  author: { "@type": "Organization", name: "InfluencerRateCalc" },
  publisher: { "@type": "Organization", name: "InfluencerRateCalc", url: "https://influencerratecalc.com" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function TaboolaVsOutbrain() {
  const h2 = "text-2xl font-black text-slate-900 mt-2 mb-5 flex items-center gap-2";
  const h3 = "text-lg font-bold text-slate-800 mt-6 mb-3";
  const p = "text-base text-slate-700 leading-relaxed mb-5";
  const card = "bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <header>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">{TITLE}</h1>
          <p className="text-lg text-slate-600 font-medium">{DESCRIPTION}</p>
        </header>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <p className="text-sm text-indigo-800">
            Looking for general CTR, CPC and CPA guidance rather than a network comparison? Start with our <Link href="/native-ad-kpi-benchmarks" className="font-bold underline text-indigo-900">Native Ad KPI Benchmarks hub</Link>, which explains the formulas and how to set your own targets. This page does not quote performance averages, because we could not source them to a named, dated report.
          </p>
        </div>

        <section className={card}>
          <h2 className={h2}><Layers className="w-6 h-6 text-indigo-600" /> Two Networks, Same Basic Model</h2>
          <p className={p}>
            Taboola and Outbrain are the two best-known content discovery networks. Both show sponsored recommendations in widgets on publisher sites, usually below articles, and both sell clicks through an auction. Advertisers supply a headline, an image and a destination, and the network decides which ads to show where. Because the model is the same, the differences that matter to a media buyer are the tools, the policies and the supply you can reach, not the basic idea.
          </p>
          <p className={p}>
            Their interfaces have different names. Taboola&apos;s advertiser platform is called Realize and Outbrain&apos;s is called Amplify. The table below only lists differences that each platform documents, and leaves out performance claims we cannot verify.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-bold border-b border-slate-200">Topic</th>
                  <th className="px-4 py-3 font-bold border-b border-slate-200">Taboola Realize</th>
                  <th className="px-4 py-3 font-bold border-b border-slate-200">Outbrain Amplify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr><td className="px-4 py-3 font-semibold">Automated strategies</td><td className="px-4 py-3">Maximize Conversions and Enhanced CPC, both powered by SmartBid</td><td className="px-4 py-3">Conversion Bid Strategy with Target CPA, Target ROAS and Max Conversions</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Manual option</td><td className="px-4 py-3">Fixed Bid: you set the exact CPC</td><td className="px-4 py-3">Manual CPC bidding with adjustments by content, hour and publisher section</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Tracking</td><td className="px-4 py-3">Taboola pixel or server-to-server integration recommended</td><td className="px-4 py-3">Conversion tracking required for automated strategies</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Learning period</td><td className="px-4 py-3">Gradual budget changes recommended by agencies; check Taboola help</td><td className="px-4 py-3">Learning phase can last up to a week; wait at least 48 hours before manual changes</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={card}>
          <h2 className={h2}><Settings className="w-6 h-6 text-indigo-600" /> Bidding: What Each Platform Documents</h2>
          <h3 className={h3}>Taboola Realize</h3>
          <p className={p}>
            Taboola documents three bid approaches. Maximize Conversions is an automated strategy that uses the SmartBid algorithm to adjust CPC bids in real time toward the most conversions within your budget. Enhanced CPC lets you set a baseline bid and then raises or lowers it per impression based on how likely that impression is to lead to a result. Fixed Bid is fully manual: you set the exact CPC you are willing to pay and the system holds it. Taboola recommends implementing its pixel or server-to-server tracking so the algorithm has conversion data to learn from, and agencies commonly advise raising budgets gradually rather than in large jumps so the algorithm is not disrupted. Treat that last point as practitioner guidance, not an official limit.
          </p>
          <h3 className={h3}>Outbrain Amplify</h3>
          <p className={p}>
            Outbrain&apos;s Conversion Bid Strategy offers Target CPA, Target ROAS and Max Conversions modes. In Target CPA mode, the system adjusts CPCs to try to secure as many conversions as possible within your CPA goal. Outbrain&apos;s published guidance describes a learning phase that can last up to a week, recommends waiting at least 48 hours before making manual changes, and notes that manual adjustments at the content, hour or publisher-section level can interfere with automated optimisation. The same guidance suggests aiming for enough daily conversions for the system to learn, and starting with a daily budget in the low hundreds of dollars. Check the current help documentation, because these recommendations change.
          </p>
          <h3 className={h3}>What this means for your KPIs</h3>
          <ul className="list-disc pl-6 space-y-3 mb-5 text-slate-700">
            <li><strong>Automated strategies:</strong> CPC becomes an output. Judge success by CPA or ROAS against your goal, and give the system time to learn before reacting.</li>
            <li><strong>Manual strategies:</strong> CPC is your lever. Compare it with your break-even CPC and adjust by source, device and country.</li>
            <li><strong>Budget and data:</strong> Automated strategies need conversions to learn from. Low-volume offers may be better served by manual bidding at first.</li>
          </ul>
          <p className={p}>
            A third-party guide reports that Outbrain&apos;s technical minimum CPC is very low and that practical starting bids are much higher, but we could not confirm those figures in official documentation, so we do not quote them. Set your starting bid from your own break-even calculation instead.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}><ShieldCheck className="w-6 h-6 text-indigo-600" /> Policies and Creative Review</h2>
          <p className={p}>
            Both networks review every ad against written advertiser policies, and both place ads on publisher sites that care about brand safety. That means sensational headlines, misleading claims and sensitive categories such as health and finance are the most likely to be edited or rejected. The exact wording and enforcement of each policy changes, and we cannot verify claims that one network is stricter than the other, so do not choose a platform on rumours.
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-5 text-slate-700">
            <li><strong>Read the current policy pages</strong> for both networks before you build creatives, and note the rules for your vertical.</li>
            <li><strong>Make the headline match the landing page.</strong> A mismatch hurts conversion and increases the chance of rejection.</li>
            <li><strong>Avoid unsupported claims.</strong> Do not promise results, before-and-after outcomes or income that the page cannot support.</li>
            <li><strong>Use real images you have rights to.</strong> Thumbnails are the main attention driver, and rights problems create takedowns.</li>
            <li><strong>Keep disclosures clear</strong> on advertorials and landing pages so readers know they are looking at an ad.</li>
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}><Scale className="w-6 h-6 text-indigo-600" /> How to Choose</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm min-w-[560px]">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-bold border-b border-slate-200">Your situation</th>
                  <th className="px-4 py-3 font-bold border-b border-slate-200">What to do</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr><td className="px-4 py-3 font-semibold">Conversion tracking is set up and you have steady volume</td><td className="px-4 py-3">Test the automated strategy on both networks and compare CPA or ROAS</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Low volume or no reliable tracking yet</td><td className="px-4 py-3">Start with manual bids tied to your break-even CPC and build data first</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Sensitive vertical such as health or finance</td><td className="px-4 py-3">Read both policies first and expect creative edits on either network</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Small test budget</td><td className="px-4 py-3">Run one network at a time, long enough to pass its learning phase</td></tr>
              </tbody>
            </table>
          </div>
          <h3 className={h3}>A fair head-to-head test plan</h3>
          <ol className="list-decimal pl-6 space-y-3 mb-5 text-slate-700">
            <li>Use the same offer, landing page, tracking setup, country and device targeting on both networks.</li>
            <li>Upload the same creatives, and accept that policy edits may force small differences.</li>
            <li>Split the budget evenly and keep the bid strategy type as close as the platforms allow.</li>
            <li>Allow each network to pass its learning period before judging, and avoid manual changes during it.</li>
            <li>Compare CPA or ROAS over the same dates, then segment by source, device and creative before deciding.</li>
          </ol>
          <p className={p}>
            Once a campaign runs, check profitability with our <Link href="/arbitrage-roi-calculator" className="font-bold underline text-indigo-700">Arbitrage ROI Calculator</Link>, and use the <Link href="/native-ad-kpi-benchmarks" className="font-bold underline text-indigo-700">KPI hub</Link> to make sure your formulas are consistent.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}><Settings className="w-6 h-6 text-indigo-600" /> Tracking Basics Before You Spend</h2>
          <p className={p}>
            Automated bidding is only as good as the conversion signal it receives, so set up tracking before you raise budgets. There are two common approaches, and both platforms support conversion tracking in their own way.
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-5 text-slate-700">
            <li><strong>Browser pixel.</strong> A snippet on your thank-you page tells the platform when a conversion happens. It is quick to set up but can miss conversions when browsers block scripts or when the conversion happens on another domain.</li>
            <li><strong>Server-to-server (S2S) postback.</strong> Your tracker or affiliate network sends the conversion back to the platform using a click identifier. It is more reliable for affiliate flows but needs more configuration, and the click identifier must be passed through every redirect.</li>
          </ul>
          <p className={p}>
            Whichever method you use, fire a real test conversion, confirm it appears in the platform dashboard, and compare conversion counts with your own tracker for a few days. Small gaps are normal because of attribution windows and blocked scripts, but large gaps mean the algorithm is learning from bad data.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}><Scale className="w-6 h-6 text-indigo-600" /> Pitfalls When Running Both Networks</h2>
          <ul className="list-disc pl-6 space-y-3 mb-2 text-slate-700">
            <li><strong>Changing too much at once.</strong> If you swap networks and landing pages in the same week you cannot tell which change moved your numbers.</li>
            <li><strong>Judging during the learning phase.</strong> Early results are unstable on both platforms. Compare after the learning period, not after the first day.</li>
            <li><strong>Copying settings blindly.</strong> A bid or budget that suits one network may not suit the other, because each uses its own auction and optimisation.</li>
            <li><strong>Ignoring publisher-level data.</strong> Both networks let you look at performance by source. A few sources often drive most of the loss or most of the profit, so review them before declaring a winner.</li>
            <li><strong>Letting one network cannibalise the other.</strong> Running both on the same audience can inflate your own competition, so keep an eye on overlap if you scale both.</li>
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}><ClipboardCheck className="w-6 h-6 text-indigo-600" /> Launch Checklist</h2>
          <ul className="list-disc pl-6 space-y-2 mb-2 text-slate-700">
            <li>Break-even CPC or maximum CPA calculated before launch.</li>
            <li>Conversion tracking tested with a real test conversion.</li>
            <li>At least several headlines and thumbnails prepared for testing.</li>
            <li>Landing page loads quickly on mobile and matches the ad promise.</li>
            <li>Budget set so the platform can gather data through its learning phase.</li>
            <li>Policy pages read for both networks and your vertical.</li>
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}><HelpCircle className="w-6 h-6 text-indigo-600" /> Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-slate-900 hover:bg-slate-100 transition text-sm">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform duration-200" />
                </summary>
                <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className={card}>
          <h2 className={h2}><BookOpen className="w-6 h-6 text-indigo-600" /> Sources and Verification Notes</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
            <li>Taboola Realize bid strategies and tracking recommendations: Taboola Realize help documentation, reviewed October 2026.</li>
            <li>Outbrain Conversion Bid Strategy modes, learning phase and manual-override guidance: Outbrain Amplify documentation, reviewed October 2026.</li>
            <li>Budget-scaling advice for Taboola comes from agency guidance, not an official platform limit.</li>
            <li>We did not verify publisher lists, relative policy strictness or average performance for either network, so none are stated.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
