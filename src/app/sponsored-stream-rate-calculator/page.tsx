import type { Metadata } from "next";
import Link from "next/link";
import StreamRateClient from "./StreamRateClient";

const SITE = "https://www.influencerratecalc.com";
const SLUG = "/sponsored-stream-rate-calculator";
const TITLE = "Sponsored Stream Rate Calculator: Twitch, YouTube Live & Kick (2026)";
const DESC =
  "Free sponsored stream rate calculator: price a Twitch, YouTube Live or Kick sponsorship from average concurrent viewers, hours, deliverables, VOD rights and exclusivity.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SLUG },
  openGraph: { title: TITLE, description: DESC, url: SITE + SLUG, type: "article" },
};

const faqs = [
  {
    q: "How do you calculate a sponsored stream rate?",
    a: "Multiply your average concurrent viewers by the number of sponsored hours to get viewer-hours, multiply by your rate per viewer-hour, then adjust for the deliverable (overlay only, verbal mentions, a dedicated segment or a fully sponsored stream) and add separate fees for VOD rights, clips and exclusivity.",
  },
  {
    q: "Why use average concurrent viewers instead of followers?",
    a: "Followers measure people who clicked follow at some point; average concurrent viewers measure how many people were actually watching at a typical moment of the broadcast. Brands buying live placements care about who saw the logo and heard the mention, so average viewers is the number they ask for.",
  },
  {
    q: "Do I have to disclose a sponsored stream?",
    a: "Yes. The FTC's guidance for influencers says a material connection such as payment or free products must be disclosed clearly, and for live streams the disclosure should be repeated periodically so viewers who join late still see it. Twitch also provides a Branded Content checkbox in Stream Manager that labels the stream.",
  },
  {
    q: "Should I charge extra if the VOD stays up?",
    a: "Many creators do, because a public VOD keeps generating views of the sponsor after the live broadcast ends. The calculator treats it as a percentage of the base fee that you set; agree in writing how long the VOD must stay public.",
  },
  {
    q: "What is a fair rate per viewer-hour?",
    a: "There is no published standard rate. The calculator's default is only an illustrative starting value. The most reliable way to set it is to divide the fees you have actually been paid by the viewer-hours you delivered, then adjust for your niche and audience location.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: TITLE,
      description: DESC,
      mainEntityOfPage: SITE + SLUG,
      datePublished: "2026-11-02",
      dateModified: "2026-11-02",
      author: { "@type": "Organization", name: "InfluencerRateCalc" },
      publisher: { "@type": "Organization", name: "InfluencerRateCalc" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Sponsored Stream Rate Calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE + SLUG,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const CTA_HTML =
  `<a href="https://bbux.me/r9xBvo61g" target="_blank" rel="sponsored noopener" style="display:inline-block;color:#ffffff !important;background:#1DBF73;padding:14px 24px;border-radius:8px;font-weight:700;text-decoration:none;">Hire a Stream Overlay or Media Kit Designer on Fiverr</a>` +
  `<a href="https://bbux.me/jarM2gv4z" target="_blank" rel="sponsored noopener" style="display:inline-block;color:#ffffff !important;background:#111111;padding:14px 24px;border-radius:8px;font-weight:700;text-decoration:none;">Browse Logitech Streaming Webcams &amp; Mics</a>`;

const h2 = "text-2xl font-bold mt-10 mb-3 text-gray-900";
const p = "mb-4";
const td = "border p-2 align-top";
const th = "border p-2 bg-gray-100 text-left";

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
        Sponsored Stream Rate Calculator: How to Price a Twitch, YouTube Live or Kick Sponsorship
      </h1>
      <p className="text-sm text-gray-500 border-l-4 border-gray-300 pl-3 mb-6">
        Disclosure: some links on this page are affiliate links. We may earn a commission if you buy through them, at no extra cost to you.
      </p>

      <p className={p}>
        A sponsored livestream is priced differently from a sponsored video. A YouTube video keeps collecting views for months, so it is usually quoted on expected views. A live broadcast is bought for the people who are watching while the logo is on screen and the talking points are read, which is why brands and agencies ask streamers for their <strong>average concurrent viewers (CCV)</strong> and the length of the sponsored block. This calculator turns those two numbers into a quote, then layers on the things that change the price in real deals: what you actually have to do on stream, whether the VOD stays public, clips and social posts, exclusivity, and multi-stream packages.
      </p>
      <p className={p}>
        We have not run sponsored streams ourselves and we do not publish a "market rate" table, because we could not find a public, methodologically sound source for one. Instead the tool makes every assumption visible so you can plug in your own numbers. If you price YouTube uploads too, use the <Link href="/youtube-sponsorship-rate-calculator" className="text-blue-700 underline">YouTube sponsorship rate calculator</Link> for those; this page is for live.
      </p>

      <StreamRateClient />

      <h2 className={h2}>The Formula Behind the Calculator</h2>
      <p className={p}>The quote is built in four steps. You can do the same math on paper:</p>
      <ol className="list-decimal pl-6 mb-4 space-y-2">
        <li><strong>Viewer-hours</strong> = average concurrent viewers &times; sponsored hours. 250 CCV for 3 hours is 750 viewer-hours.</li>
        <li><strong>Base fee</strong> = viewer-hours &times; your rate per viewer-hour &times; the deliverable multiplier. At an illustrative $0.10 per viewer-hour and the "overlay + mentions" multiplier of 1, that is $75.</li>
        <li><strong>Add-ons</strong> = VOD premium (a percentage of the base) + clips or posts (count &times; fee each). With a 10% VOD premium and one $50 clip, the add-ons are $7.50 + $50.</li>
        <li><strong>Exclusivity</strong> = a percentage of the subtotal, because blocking competitors costs you future deals. At 0% the per-stream quote in this example is about $133; multiply by the number of streams for the package total.</li>
      </ol>
      <p className={p}>
        The two outputs at the bottom of the calculator are the ones to show a brand: the effective price per sponsored hour, and the effective cost per 1,000 viewer-hours. The second number lets a marketer compare your stream with other channels on a like-for-like basis, the same way they compare video CPMs.
      </p>

      <h2 className={h2}>What Each Deliverable Means (and Why the Multipliers Differ)</h2>
      <div className="overflow-x-auto my-6">
        <table className="min-w-[560px] w-full border-collapse text-sm">
          <thead>
            <tr><th className={th}>Deliverable</th><th className={th}>What you do on stream</th><th className={th}>Default multiplier</th></tr>
          </thead>
          <tbody>
            <tr><td className={td}>Logo / overlay only</td><td className={td}>A banner, panel link or corner logo; no scripted mentions</td><td className={td}>0.5x</td></tr>
            <tr><td className={td}>Overlay + verbal mentions</td><td className={td}>Logo plus talking points read roughly once an hour and a chat command or link</td><td className={td}>1x</td></tr>
            <tr><td className={td}>Dedicated segment</td><td className={td}>A planned block where you show, play or explain the product</td><td className={td}>1.5x</td></tr>
            <tr><td className={td}>Fully sponsored stream</td><td className={td}>The sponsor chooses the game, product or theme for the whole broadcast</td><td className={td}>2x</td></tr>
          </tbody>
        </table>
      </div>
      <p className={p}>
        The multipliers are our own illustrative defaults, chosen so that more effort and more brand control cost more. They are not an industry standard. If a deal includes things the table does not cover (a giveaway you administer, travel to an event, a custom overlay you have to build), price those as separate line items rather than stretching the multiplier.
      </p>

      <h2 className={h2}>Where to Find Your Average Concurrent Viewers</h2>
      <p className={p}>
        Use the average, not the peak. Peak viewers usually happen for a few minutes (a raid, a big moment), while the sponsor&apos;s logo is on screen for the whole block. Twitch shows average viewers for each broadcast in the stream summary inside the Creator Dashboard, and YouTube Studio shows concurrent-viewer data for each live stream in its analytics. Take the average of your last 10 to 30 comparable streams (same day of week, similar game or format) so one unusually good night does not set your price. If the sponsored block is only part of the stream, use the viewers during that part where your analytics allow it.
      </p>
      <p className={p}>
        Two adjustments are worth stating in your pitch rather than hiding in the number. First, audience geography: many brands only ship to certain countries, so the share of viewers in those countries matters more than the total. Second, chat activity: a smaller channel with a busy, engaged chat can justify a higher rate per viewer-hour than a large channel where the stream runs in background tabs.
      </p>

      <h2 className={h2}>Twitch vs YouTube Live vs Kick: What Changes for Sponsors</h2>
      <div className="overflow-x-auto my-6">
        <table className="min-w-[560px] w-full border-collapse text-sm">
          <thead>
            <tr><th className={th}>Platform</th><th className={th}>Platform disclosure tool</th><th className={th}>What to check before signing</th></tr>
          </thead>
          <tbody>
            <tr><td className={td}>Twitch</td><td className={td}>Branded Content checkbox in Stream Manager (Edit Stream Info) that labels the stream</td><td className={td}>Twitch&apos;s Branded Content Policy for what counts as branded content and how overlays may be used</td></tr>
            <tr><td className={td}>YouTube Live</td><td className={td}>Paid promotion disclosure setting in YouTube Studio</td><td className={td}>YouTube&apos;s ad policies for paid product placements; whether the VOD will stay public and keep earning views</td></tr>
            <tr><td className={td}>Kick</td><td className={td}>Check Kick&apos;s current guidelines; we could not confirm a dedicated sponsorship label</td><td className={td}>Kick&apos;s community guidelines and whether the brand accepts the platform</td></tr>
          </tbody>
        </table>
      </div>
      <p className={p}>
        The platform tool is not the whole job. The FTC&apos;s guidance for influencers says a material connection (payment, free product, a business relationship) must be disclosed clearly, and for live streams it recommends repeating the disclosure periodically because viewers join part-way through. In practice that means an on-screen &quot;Sponsored by&quot; or &quot;#ad&quot; graphic during the sponsored block plus a spoken reminder each time you read the talking points.
      </p>

      <h2 className={h2}>Worked Example: A 3-Stream Package for a Mid-Size Channel</h2>
      <p className={p}>
        Illustrative example. A streamer averages 400 concurrent viewers and agrees to three 4-hour streams with overlay plus verbal mentions, VOD kept public for 30 days (15% premium), two short clips per stream at $60 each, and 20% for category exclusivity during the campaign. Using an illustrative rate of $0.08 per viewer-hour:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Viewer-hours per stream: 400 &times; 4 = 1,600</li>
        <li>Base fee: 1,600 &times; $0.08 &times; 1 = $128</li>
        <li>VOD premium: 15% of $128 = $19.20; clips: 2 &times; $60 = $120</li>
        <li>Subtotal: $267.20; exclusivity 20% = $53.44; per stream = $320.64</li>
        <li>Package total for 3 streams: about $962</li>
      </ul>
      <p className={p}>
        Notice how much of the total comes from the clips and exclusivity rather than the live viewers. That is typical of smaller channels and is a good reason to itemize: if the brand pushes back on price, you can drop clips or exclusivity instead of cutting your base rate.
      </p>

      <h2 className={h2}>How to Set Your Rate per Viewer-Hour</h2>
      <ol className="list-decimal pl-6 mb-4 space-y-2">
        <li>List the sponsored streams you have done, the fee for each, and the viewer-hours delivered (CCV &times; sponsored hours).</li>
        <li>Divide fee by viewer-hours for each deal. That is your historical rate; use the median, not the best deal.</li>
        <li>If you have no history, start from a figure you would be comfortable defending, quote it as a package, and record the result. After three or four deals you will have real data.</li>
        <li>Revisit the rate when your average viewers change meaningfully, not after every stream.</li>
      </ol>
      <p className={p}>
        A clean media kit with your average viewers, audience countries and past sponsors makes these conversations faster. If design is not your strength, freelance designers on Fiverr build stream overlays and media kits, and better audio and video gear is one of the few upgrades viewers notice immediately.
      </p>
      <div
        className="flex flex-wrap gap-3 justify-center my-8"
        dangerouslySetInnerHTML={{
          __html: CTA_HTML,
        }}
      />

      <h2 className={h2}>Contract Points to Agree Before You Go Live</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Exact deliverables:</strong> number of mentions per hour, segment length, overlay size and position, chat command or link.</li>
        <li><strong>Proof of delivery:</strong> which analytics screenshots you will send (average viewers, hours streamed) and by when.</li>
        <li><strong>VOD and clip rights:</strong> how long the VOD stays public and whether the brand may reuse your clips in its own ads. Paid usage of your footage is a separate fee; see the <Link href="/influencer-usage-rights-exclusivity-buyout-calculator" className="text-blue-700 underline">usage rights &amp; exclusivity buyout calculator</Link>.</li>
        <li><strong>Exclusivity scope:</strong> which competitor categories, for how long, and on which platforms.</li>
        <li><strong>Cancellation and make-goods:</strong> what happens if a stream is cut short by an outage or if viewers come in below an agreed minimum.</li>
        <li><strong>Payment terms:</strong> deposit, invoice date and payment window.</li>
      </ul>

      <h2 className={h2}>Common Pricing Mistakes</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Quoting on followers.</strong> It overprices dormant channels and underprices small, loyal ones. Quote on average viewers.</li>
        <li><strong>Using peak viewers.</strong> The brand will compare your claim with your average and trust drops.</li>
        <li><strong>Bundling everything into one number.</strong> Itemize so you have something to trade in negotiation.</li>
        <li><strong>Forgetting the VOD.</strong> If the replay keeps getting views, that is extra exposure for the sponsor.</li>
        <li><strong>Skipping disclosure on late-join viewers.</strong> One mention at the start is not enough on a multi-hour stream.</li>
      </ul>

      <h2 className={h2}>Frequently Asked Questions</h2>
      {faqs.map((f) => (
        <details key={f.q} className="border rounded-lg p-4 my-2">
          <summary className="font-semibold cursor-pointer">{f.q}</summary>
          <p className="mt-2">{f.a}</p>
        </details>
      ))}

      <h2 className={h2}>Related Calculators</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li><Link href="/youtube-sponsorship-rate-calculator" className="text-blue-700 underline">YouTube Sponsorship Rate Calculator</Link> for uploaded videos</li>
        <li><Link href="/podcast-mid-roll-vs-pre-roll-cpm-rate-calculator" className="text-blue-700 underline">Podcast Mid-Roll vs Pre-Roll CPM Calculator</Link> for audio and video podcasts</li>
        <li><Link href="/influencer-whitelisting-paid-partnership-cac-calculator" className="text-blue-700 underline">Influencer Whitelisting &amp; Paid Partnership CAC Calculator</Link></li>
        <li><Link href="/" className="text-blue-700 underline">Influencer Rate Calculator</Link> for TikTok, Instagram and X posts</li>
      </ul>

      <p className="mt-10 text-sm text-gray-500">
        Sources: FTC, &quot;Disclosures 101 for Social Media Influencers&quot; (ftc.gov) for disclosure and periodic repetition in live streams; Twitch Branded Content Policy and Stream Manager help (twitch.tv) for the Branded Content checkbox. All rates, multipliers and examples on this page are illustrative and user-editable. Checked November 2026.
      </p>
    </main>
  );
}
