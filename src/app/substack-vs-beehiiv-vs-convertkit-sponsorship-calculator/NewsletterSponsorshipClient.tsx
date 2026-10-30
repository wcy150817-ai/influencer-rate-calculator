"use client";

import React, { useState } from "react";

type PlacementTypeKey = "primary_100" | "secondary_60" | "classified_25" | "dedicated_180";
type NicheKey = "b2b_exec" | "dev_ai" | "ecommerce_marketing" | "consumer_lifestyle";

const PLACEMENT_MULTIPLIERS: Record<
  PlacementTypeKey,
  { label: string; multiplier: number; ctorFactor: number }
> = {
  primary_100: {
    label: "Primary Top Banner + 150-Word Editorial Read (1.0x)",
    multiplier: 1.0,
    ctorFactor: 1.0,
  },
  secondary_60: {
    label: "Mid-Issue Secondary Native Block (0.60x)",
    multiplier: 0.6,
    ctorFactor: 0.62,
  },
  classified_25: {
    label: "Bottom Classified Text Link / Bullet (0.25x)",
    multiplier: 0.25,
    ctorFactor: 0.28,
  },
  dedicated_180: {
    label: "Dedicated Single-Sponsor Solo Email Blast (1.80x)",
    multiplier: 1.8,
    ctorFactor: 1.65,
  },
};

const NICHE_PRESETS: Record<NicheKey, { label: string; defaultOpenCpm: number; defaultCtor: number }> =
  {
    b2b_exec: {
      label: "B2B SaaS, Fintech & Executive Finance",
      defaultOpenCpm: 65,
      defaultCtor: 3.2,
    },
    dev_ai: {
      label: "Software Engineering, AI & Cloud Infrastructure",
      defaultOpenCpm: 58,
      defaultCtor: 3.5,
    },
    ecommerce_marketing: {
      label: "DTC E-Commerce, Growth & Creator Economy",
      defaultOpenCpm: 52,
      defaultCtor: 3.0,
    },
    consumer_lifestyle: {
      label: "Consumer Lifestyle, Productivity & General News",
      defaultOpenCpm: 28,
      defaultCtor: 2.2,
    },
  };

export default function NewsletterSponsorshipClient() {
  const [subscribers, setSubscribers] = useState<number>(35000);
  const [rawOpenRatePct, setRawOpenRatePct] = useState<number>(48);
  const [applyAppleMppDeflation, setApplyAppleMppDeflation] = useState<boolean>(true);
  const [nicheKey, setNicheKey] = useState<NicheKey>("b2b_exec");
  const [openCpmBid, setOpenCpmBid] = useState<number>(65);
  const [placementKey, setPlacementKey] = useState<PlacementTypeKey>("primary_100");
  const [primaryCtorPct, setPrimaryCtorPct] = useState<number>(3.2);
  const [calcRun, setCalcRun] = useState<number>(1);

  const handleNicheChange = (key: NicheKey) => {
    setNicheKey(key);
    setOpenCpmBid(NICHE_PRESETS[key].defaultOpenCpm);
    setPrimaryCtorPct(NICHE_PRESETS[key].defaultCtor);
    setCalcRun((r) => r + 1);
  };

  const safeSubs = Math.max(500, subscribers);
  const safeRawOpen = Math.min(95, Math.max(5, rawOpenRatePct)) / 100;
  // Apple MPP machine-open deflation (~20% relative discount when toggled on)
  const verifiedHumanOpenRate = applyAppleMppDeflation ? safeRawOpen * 0.8 : safeRawOpen;

  const rawOpens = safeSubs * safeRawOpen;
  const verifiedHumanOpens = safeSubs * verifiedHumanOpenRate;

  const placementInfo = PLACEMENT_MULTIPLIERS[placementKey];
  const safeCpm = Math.max(5, openCpmBid);
  const safeCtor = Math.min(35, Math.max(0.2, primaryCtorPct)) / 100;

  // Flat Issue Sponsorship Price based on Verified Human Opens * Niche Open CPM * Placement Multiplier
  const flatIssuePrice = (verifiedHumanOpens / 1000) * safeCpm * placementInfo.multiplier;

  // Effective CPMs
  const totalListCpm = (flatIssuePrice / safeSubs) * 1000;
  const effectiveHumanOpenCpm =
    verifiedHumanOpens > 0 ? (flatIssuePrice / verifiedHumanOpens) * 1000 : 0;

  // Clicks & Sponsor eCPC (Click-to-Open Rate applied against verified human opens)
  const adjustedPlacementCtor = safeCtor * placementInfo.ctorFactor;
  const estimatedUniqueClicks = verifiedHumanOpens * adjustedPlacementCtor;
  const sponsorEcpc = estimatedUniqueClicks > 0 ? flatIssuePrice / estimatedUniqueClicks : 0;

  // Platform Monetization Comparison (Net Creator Payout on a 4-issue monthly flight)
  const monthlyGrossSponsorRev = flatIssuePrice * 4;
  // Direct invoice via Stripe (Substack takes 0% of external direct ad sponsorships, only ~2.9% Stripe processing; Substack takes 10% + Stripe only on native paid subscriptions)
  const directStripeNet = monthlyGrossSponsorRev * (1 - 0.029);
  // Managed Sponsor Network (e.g., Kit Sponsor Network / Managed Ad Representation typically 20%–23.5% fee)
  const managedNetworkNet = monthlyGrossSponsorRev * (1 - 0.2);

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-7 shadow-sm my-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
          Interactive Newsletter Sponsorship CPM, CTOR &amp; eCPC Simulator
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
          Apple MPP Open-Rate Deflator Included
        </span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">
        Calculate Flat Issue Ad Rates, Verified Human-Open CPM &amp; Sponsor Cost-Per-Click (eCPC)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="subsInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Total Active Email Subscribers
          </label>
          <input
            id="subsInput"
            type="number"
            min={500}
            max={2000000}
            step={500}
            value={subscribers}
            onChange={(e) => setSubscribers(Number(e.target.value) || 5000)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="openRateInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            ESP Reported Open Rate (%)
          </label>
          <input
            id="openRateInput"
            type="number"
            min={5}
            max={90}
            step={1}
            value={rawOpenRatePct}
            onChange={(e) => setRawOpenRatePct(Number(e.target.value) || 40)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="nicheSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Audience Niche Preset
          </label>
          <select
            id="nicheSelect"
            value={nicheKey}
            onChange={(e) => handleNicheChange(e.target.value as NicheKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="b2b_exec">B2B SaaS, Fintech &amp; Exec Finance</option>
            <option value="dev_ai">Software Engineering, AI &amp; Cloud</option>
            <option value="ecommerce_marketing">DTC E-Commerce &amp; Marketing</option>
            <option value="consumer_lifestyle">Consumer Lifestyle &amp; General News</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="placementSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Newsletter Ad Placement Slot
          </label>
          <select
            id="placementSelect"
            value={placementKey}
            onChange={(e) => setPlacementKey(e.target.value as PlacementTypeKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="primary_100">Primary Top Editorial Read (1.0x)</option>
            <option value="secondary_60">Mid-Issue Secondary Slot (0.60x)</option>
            <option value="classified_25">Classified Footer Link (0.25x)</option>
            <option value="dedicated_180">Dedicated Solo Send Blast (1.80x)</option>
          </select>
        </div>

        <div>
          <label htmlFor="openCpmInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Target CPM on Unique Opens ($ USD)
          </label>
          <input
            id="openCpmInput"
            type="number"
            min={5}
            max={250}
            step={2}
            value={openCpmBid}
            onChange={(e) => setOpenCpmBid(Number(e.target.value) || 35)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="ctorInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Primary Ad Click-to-Open Rate (CTOR %)
          </label>
          <input
            id="ctorInput"
            type="number"
            min={0.2}
            max={25}
            step={0.2}
            value={primaryCtorPct}
            onChange={(e) => setPrimaryCtorPct(Number(e.target.value) || 2.5)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <label className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={applyAppleMppDeflation}
            onChange={(e) => setApplyAppleMppDeflation(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600"
          />
          Apply Apple Mail Privacy Protection (MPP) Deflation (-20% adjustment from raw ESP opens to
          isolate verified human opens: {(verifiedHumanOpenRate * 100).toFixed(1)}% real open rate)
        </label>
      </div>

      <button
        type="button"
        onClick={() => setCalcRun((r) => r + 1)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer mb-5"
      >
        Calculate Flat Issue Sponsorship Rate, Verified Open CPM &amp; Sponsor eCPC
      </button>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Recommended Flat Sponsorship Rate Per Issue ({placementInfo.label}):
          </span>
          <strong className="text-2xl font-extrabold text-slate-900">
            ${Math.round(flatIssuePrice).toLocaleString("en-US")} / issue (Run #{calcRun})
          </strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-slate-600 uppercase">
              1. Verified Human Opens
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              {Math.round(verifiedHumanOpens).toLocaleString("en-US")} opens
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Raw ESP Opens: {Math.round(rawOpens).toLocaleString("en-US")} | List CPM: $
              {totalListCpm.toFixed(2)}
            </div>
          </div>

          <div className="bg-white border border-emerald-300 rounded-lg p-3.5">
            <div className="text-xs font-bold text-emerald-800 uppercase">
              2. Sponsor Clicks &amp; eCPC
            </div>
            <div className="text-lg font-extrabold text-emerald-900 mt-1">
              {Math.round(estimatedUniqueClicks).toLocaleString("en-US")} clicks | $
              {sponsorEcpc.toFixed(2)} eCPC
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Placement CTOR: {(adjustedPlacementCtor * 100).toFixed(2)}% | Open CPM: $
              {effectiveHumanOpenCpm.toFixed(2)}
            </div>
          </div>

          <div className="bg-white border border-indigo-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-indigo-800 uppercase">
              3. 4-Issue Flight Creator Net
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              ${Math.round(directStripeNet).toLocaleString("en-US")} Direct
            </div>
            <div className="text-xs text-slate-600 mt-1">
              vs. ${Math.round(managedNetworkNet).toLocaleString("en-US")} via Managed Ad Network
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
          <strong>Newsletter Pricing Verdict:</strong> With{" "}
          <strong>{safeSubs.toLocaleString("en-US")} active subscribers</strong> and{" "}
          <strong>{Math.round(verifiedHumanOpens).toLocaleString("en-US")} verified human opens</strong>{" "}
           per issue, a <strong>{placementInfo.label}</strong> commands{" "}
          <strong>${Math.round(flatIssuePrice).toLocaleString("en-US")} per send</strong>—delivering
          approximately <strong>{Math.round(estimatedUniqueClicks)} high-intent sponsor clicks</strong>{" "}
          at an effective Cost Per Click of <strong>${sponsorEcpc.toFixed(2)} eCPC</strong>.
        </div>
      </div>
    </div>
  );
}
