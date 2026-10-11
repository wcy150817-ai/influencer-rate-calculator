import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import ArbitrageCalculator from './ArbitrageCalculator';

const URL_PATH = 'https://influencerratecalc.com/arbitrage-roi-calculator';
const TITLE = 'Arbitrage ROI Calculator: Find Your Break-Even CPC for E-Commerce Offers';
const DESCRIPTION =
  'Free arbitrage ROI calculator. Enter CPC, landing-page CTR, offer EPC or conversion rate x AOV x payout, refunds and fees to get break-even CPC, profit per 1,000 clicks, ROI and the conversion rate you need.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/arbitrage-roi-calculator' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL_PATH, type: 'article', locale: 'en_US' },
};

const faqs = [
  {
    q: 'What is break-even CPC in traffic arbitrage?',
    a: 'Break-even CPC is the highest price you can pay per ad click before the campaign starts losing money. It equals the net revenue you earn on average from each ad click after refunds and platform fees. Bid below it and you profit; bid above it and every click costs more than it returns.',
  },
  {
    q: 'What is the difference between offer EPC and revenue per ad click?',
    a: 'Offer EPC is earnings per click sent to the offer. Revenue per ad click is what you earn per click you bought, which also depends on landing-page CTR, because only the share of visitors who click through to the offer can earn anything. Revenue per ad click equals landing-page CTR times offer EPC, before refunds and fees.',
  },
  {
    q: 'How do I calculate ROI for an arbitrage campaign?',
    a: 'ROI equals profit divided by ad spend. Per click, that is net revenue per click minus CPC, divided by CPC. If your CPC is zero the ratio is undefined because you would be dividing by zero, so the calculator shows Undefined instead of a number.',
  },
  {
    q: 'What conversion rate do I need to hit a target ROI?',
    a: 'Divide your required net revenue per click, which is CPC times one plus the target ROI, by everything else in the revenue chain: landing-page CTR, AOV, payout share, and the refund and fee survival rates. The result is the minimum offer conversion rate. The calculator does this for you in conversion-rate mode.',
  },
  {
    q: 'Should refunds and chargebacks be included in the calculation?',
    a: 'Yes. Revenue that is reversed is not revenue. Even when refunds arrive weeks later, treat them as a deduction from the day you spent the money, otherwise early campaign reports will look better than they really are.',
  },
  {
    q: 'Are the example numbers on this page industry benchmarks?',
    a: 'No. Every number in the worked examples is an illustrative example chosen to make the arithmetic easy to follow. The only external figure cited is a payment processor rate, attributed in the text. Always replace the defaults with your own tracked data.',
  },
];

export default function ArbitrageRoiCalculatorPage() {
  const software = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Arbitrage ROI Calculator',
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
    datePublished: '2026-10-11',
    dateModified: '2026-10-11',
    author: { '@type': 'Organization', name: 'InfluencerRateCalc' },
    publisher: { '@type': 'Organization', name: 'InfluencerRateCalc' },
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 font-sans text-gray-900 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-5 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Arbitrage ROI Calculator: Find Your Break-Even CPC for E-Commerce Offers
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Traffic arbitrage is a spread business: you buy clicks at one price and earn from them at another. This calculator
            tells you where the spread turns negative, so you can set a bid cap before you spend a dollar.
          </p>
          <p className="text-sm text-gray-500">
            <a href="#calculator" className="font-semibold text-indigo-700 underline">Jump to the calculator</a>
            {' | '}
            <a href="#math" className="font-semibold text-indigo-700 underline">Read the math</a>
            {' | '}
            <a href="#faq" className="font-semibold text-indigo-700 underline">FAQ</a>
          </p>
        </header>

        <ArbitrageCalculator />

        <article className="prose prose-lg prose-indigo max-w-none rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2>What arbitrage ROI actually measures</h2>
          <p>
            In paid-traffic arbitrage you do not own the product or the checkout. You buy clicks from an ad network, send those
            visitors through a content page or pre-sell page, and then pass them to an e-commerce offer that pays you either a
            commission or a margin. Every campaign decision reduces to one comparison: what does an average click cost, and what
            does an average click earn? If the second number is larger, you have a business. If it is smaller, no amount of
            creative testing will save the campaign unless it moves one of the inputs in the formula below.
          </p>
          <p>
            That is why break-even CPC is the most useful single number in arbitrage. It converts a messy funnel into a bid
            ceiling. Once you know that a click is worth, for example, 18 cents after refunds and fees, you can instruct your
            bidding tool never to pay more than that, and you can judge every traffic source against the same yardstick. The
            calculator above computes it for you, and the sections below show every step by hand so you can audit the result.
          </p>

          <h2 id="math">The math, step by step</h2>
          <p>
            All formulas below use rates as decimals (a 3% conversion rate is 0.03). The calculator accepts percentages and
            converts them for you. Five quantities build on each other.
          </p>
          <h3>1. Offer EPC</h3>
          <p>
            Offer EPC is the average earnings per click that reaches the offer. Your affiliate network or tracker may report it
            directly. If it does not, derive it from three inputs:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
{`Offer EPC = Conversion rate x AOV x Payout share`}
          </pre>
          <p>
            Payout share is the commission percentage when you promote someone else&apos;s store. If you sell the product yourself
            through a dropshipping or private-label store, use your gross margin percentage after product cost and shipping, because
            that is the money left to pay for ads.
          </p>
          <h3>2. Revenue per ad click</h3>
          <p>
            You pay for the click on your ad, not the click to the offer. When you use a pre-sell page, only a fraction of visitors
            continue to the merchant. That fraction is the landing-page CTR. If you send traffic straight to the offer, set it to
            100%.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
{`Gross revenue per ad click = Landing-page CTR x Offer EPC`}
          </pre>
          <h3>3. Net revenue per ad click</h3>
          <p>
            Refunds and chargebacks reverse revenue, and fees reduce what you keep. Both scale with revenue, so they act as
            survival rates multiplied together:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
{`Net revenue per click = Gross revenue per click x (1 - Refund rate) x (1 - Platform fee)`}
          </pre>
          <h3>4. Break-even CPC, profit and ROI</h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
{`Break-even CPC = Net revenue per click
Profit per 1,000 clicks = 1,000 x (Net revenue per click - CPC)
ROI = (Net revenue per click - CPC) / CPC
Max CPC for a target ROI = Net revenue per click / (1 + Target ROI)`}
          </pre>
          <p>
            Break-even CPC equals net revenue per click because profit is zero exactly when cost and revenue are equal. ROI divides
            by CPC, so a CPC of zero would be a division by zero. The calculator reports ROI as undefined in that case rather than
            showing infinity or a misleading number. It also refuses to run when landing-page CTR is zero or any percentage is out
            of range, and it tells you which field to fix.
          </p>
          <h3>5. Required conversion rate for a target ROI</h3>
          <p>
            Rearrange the chain to solve for the conversion rate. You need net revenue per click equal to CPC times one plus your
            target ROI, so:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
{`Required CR = CPC x (1 + Target ROI) / (CTR x AOV x Payout x (1 - Refund) x (1 - Fee))`}
          </pre>
          <p>
            The denominator is the revenue you would earn per ad click at a 100% conversion rate. If it is zero, because AOV,
            payout or CTR is zero or refunds and fees consume everything, no conversion rate can reach the target, and the
            calculator says so. In EPC mode the same rearrangement gives a required offer EPC instead, since conversion rate is not
            a separate input there.
          </p>

          <h2>Worked examples (illustrative)</h2>
          <p>
            Every figure in this section is an illustrative example chosen for clean arithmetic. None is a benchmark or a
            recorded campaign result. Use them to check that you understand the formulas, then enter your own numbers above.
          </p>
          <h3>Example A: a healthy spread</h3>
          <p>
            Assume a CPC of $0.12, a landing-page CTR of 35%, an offer conversion rate of 3%, an AOV of $80, a payout share of 25%,
            an 8% refund rate and a 3% platform fee. Offer EPC is 0.03 x 80 x 0.25 = $0.60. Gross revenue per ad click is 0.35 x
            0.60 = $0.21. After refunds, 0.21 x 0.92 = $0.1932. After fees, 0.1932 x 0.97 = $0.1874. That is the break-even CPC.
          </p>
          <p>
            Paying $0.12 leaves $0.0674 per click, or $67.40 per 1,000 clicks, which is a 56.2% ROI. For a 100% ROI target you
            would need a conversion rate of 0.12 x 2 / (0.35 x 80 x 0.25 x 0.92 x 0.97) = 3.84%. For plain break-even you need
            only 1.92%, so this offer has roughly a 36% cushion on conversion rate (3.00% against 1.92%) before it turns unprofitable.
          </p>
          <h3>Example B: EPC mode with no fees</h3>
          <p>
            Assume the network reports an offer EPC of $0.45. Landing-page CTR is 25%, refunds are 5%, there is no platform fee,
            and CPC is $0.08. Gross revenue per click is 0.25 x 0.45 = $0.1125, and net is 0.1125 x 0.95 = $0.1069. Profit per
            1,000 clicks is $26.88 and ROI is 33.6%. To hit a 50% target ROI at the same CPC you would need an EPC of 0.08 x 1.5 /
            (0.25 x 0.95) = $0.505, so this offer falls short and you would negotiate a higher payout or improve the pre-sell page
            before scaling.
          </p>
          <h3>Example C: a campaign that cannot work</h3>
          <p>
            Assume a $0.30 CPC, 20% landing-page CTR, 2% conversion rate, $50 AOV, 30% payout, 10% refunds and a 5% fee. Offer EPC
            is 0.02 x 50 x 0.30 = $0.30, gross revenue per click is $0.06, and net revenue per click is 0.06 x 0.90 x 0.95 =
            $0.0513. Profit is minus $248.70 per 1,000 clicks and ROI is minus 82.9%. Breaking even would take a conversion rate of
            11.7%, almost six times the assumed 2%. When the required rate is that far above anything plausible, the fix is not
            optimization; it is a cheaper traffic source, a better-paying offer, or walking away.
          </p>

          <h3>Scenario table for Example A</h3>
          <p>
            The table repeats Example A at different CPCs, holding net revenue per click at $0.1874. All values are illustrative.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>CPC</th>
                  <th>Profit per 1,000 clicks</th>
                  <th>ROI</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$0.08</td><td>$107.40</td><td>134.3%</td><td>Strong margin, but may not win enough auctions</td></tr>
                <tr><td>$0.10</td><td>$87.40</td><td>87.4%</td><td>Comfortable</td></tr>
                <tr><td>$0.12</td><td>$67.40</td><td>56.2%</td><td>Base case</td></tr>
                <tr><td>$0.15</td><td>$37.40</td><td>24.9%</td><td>Thin; refund spikes hurt</td></tr>
                <tr><td>$0.1874</td><td>$0.00</td><td>0.0%</td><td>Break-even</td></tr>
                <tr><td>$0.22</td><td>-$32.60</td><td>-14.8%</td><td>Losing money</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Notice the asymmetry. Raising CPC from $0.12 to $0.15, a 25% increase, cuts profit nearly in half, from $67.40 to $37.40
            per 1,000 clicks. Small bid changes move profit a lot when the spread is narrow, which is why a bid cap derived from
            break-even CPC is worth setting before launch.
          </p>

          <h2>Where to get each input</h2>
          <p>
            A calculator is only as honest as its inputs. Pull each one from a source you can defend, and prefer your own tracked
            data to anyone&apos;s averages.
          </p>
          <ul>
            <li>
              <strong>CPC:</strong> read it from your ad platform&apos;s reporting for the same traffic source and geography you plan to
              scale. Blended CPC across countries hides the fact that cheap clicks often convert worst.
            </li>
            <li>
              <strong>Landing-page CTR:</strong> measure it in your tracker as clicks to the offer divided by landing-page visits. Do
              not use the ad&apos;s own CTR, which measures a different step.
            </li>
            <li>
              <strong>Offer EPC or conversion rate:</strong> early EPC figures are noisy. At a 3% conversion rate you need about 1,000
              clicks to the offer just to expect 30 sales, and ratios built on 30 sales still swing widely. Treat early results as a
              range and test the low end in the scenario tables.
            </li>
            <li>
              <strong>AOV and payout:</strong> use the merchant&apos;s actual commission terms. Tiered payouts, cookie windows and
              product-category exclusions change effective payout, so check the program terms rather than the headline percentage.
            </li>
            <li>
              <strong>Refund and chargeback rate:</strong> use a rate from reversed commissions over a meaningful window. Reversals
              usually arrive weeks after the sale, so a campaign that looks profitable in week one can drift lower.
            </li>
            <li>
              <strong>Platform fee:</strong> add every percentage-based cut between the shopper&apos;s card and your bank account, such as
              network fees, tracker costs allocated per click, and payment processing if you run your own checkout.
            </li>
          </ul>

          <h2>Payment fees: a fixed amount that percentages hide</h2>
          <p>
            If you run your own store, card processing is a real cost. Per Stripe&apos;s public pricing page, its standard US rate for
            domestic cards was listed as 2.9% plus 30 cents per successful transaction when this page was written; confirm the
            current rate and your own contract, since negotiated and regional pricing differs. The fixed 30 cents matters more on
            small orders. On an $80 order the effective rate is 2.9% + 0.30 / 80 = 3.28%. On a $20 order it is 2.9% + 0.30 / 20 =
            4.4%. If your AOV is low, enter a higher platform fee than the headline percentage, or the calculator will flatter the
            campaign. Dispute fees vary by processor and are separate again, so treat them as part of your refund and chargeback
            assumption.
          </p>

          <h2>Common mistakes that make arbitrage look better than it is</h2>
          <p>
            <strong>Ignoring the second click.</strong> A common error is treating the offer&apos;s EPC as if it were earned on every
            ad click. If only a third of your visitors continue past the pre-sell page, revenue per ad click is about a third of the
            offer EPC, and a bid cap built on the unadjusted figure loses money from day one.
          </p>
          <p>
            <strong>Using revenue instead of profit.</strong> A payout share of 100% only makes sense if the offer pays you the
            entire order value. For your own store, margin after product cost and shipping is the correct figure; otherwise the break-even
            CPC will be too high.
          </p>
          <p>
            <strong>Skipping the refund lag.</strong> Reversals can land long after the spend. Hold back a reserve in your reporting,
            or run the calculator with a refund rate a few points above what the first week suggests.
          </p>
          <p>
            <strong>Optimizing for ROI percentage alone.</strong> A 200% ROI on a few dollars a day is not the same business as a 40%
            ROI on thousands. Use the profit per 1,000 clicks figure alongside ROI, and remember that scale usually forces you to
            bid higher, which compresses the spread in the first scenario table.
          </p>
          <p>
            <strong>Treating one scenario as the forecast.</strong> Use the second scenario table. If a 20% drop in revenue per click
            flips the campaign to a loss, you do not have a safety margin, you have a coin flip.
          </p>

          <h2>Using traffic-cost data alongside this calculator</h2>
          <p>
            If you are still deciding which network to buy from, our <Link href="/native-ad-benchmarks-taboola-outbrain" className="font-semibold text-indigo-700 underline">native ad benchmarks page for Taboola and Outbrain</Link>{' '}
            lists CPC, CTR and CPA figures for e-commerce and SaaS. We have not attached primary sources to those figures, so treat
            them as directional starting points to test against your own tracker, not as verified industry averages. A sensible
            workflow is to take a CPC range from that page or a network&apos;s own estimate, run it through the calculator with your offer
            data, and see how much conversion rate you need before spending a cent.
          </p>
          <p>
            Once a test budget confirms your numbers, return to the scenario tables, set your bid cap at or below the maximum CPC for
            your target ROI, and re-run the calculation each week as refund data matures. If you also work with creators, the{' '}
            <Link href="/" className="font-semibold text-indigo-700 underline">influencer rate calculator</Link> on our home page
            prices sponsored posts using the same logic of comparing what a placement costs with what it can return.
          </p>

          <h2>Limits of this model</h2>
          <p>
            The calculator assumes constant averages. Real campaigns vary by placement, device, time of day and creative, and your
            blended numbers can hide profitable and unprofitable segments. It does not model taxes, currency conversion, ad-platform
            minimum spends, traffic quality penalties or cash-flow timing, and it treats refund and fee rates as proportional to
            revenue. Use the output as a decision aid for bid ceilings and go or no-go checks, not as a forecast or financial advice.
            Check each ad platform&apos;s and merchant&apos;s terms before you run traffic, including rules on disclosures and pre-sell pages.
          </p>

          <h2 id="faq">Frequently asked questions</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <section className="rounded-2xl bg-indigo-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Check your numbers against traffic data</h2>
          <p className="mx-auto mt-2 max-w-2xl">
            Compare your break-even CPC with the CPC ranges on our native advertising page, then come back and adjust the inputs.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/native-ad-benchmarks-taboola-outbrain"
              className="rounded-lg px-5 py-3 font-semibold"
              style={{ backgroundColor: '#ffffff', color: '#3730a3' }}
            >
              View native ad benchmarks
            </Link>
            <a href="#calculator" className="rounded-lg px-5 py-3 font-semibold" style={{ backgroundColor: '#4338ca', color: '#ffffff' }}>
              Back to the calculator
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
