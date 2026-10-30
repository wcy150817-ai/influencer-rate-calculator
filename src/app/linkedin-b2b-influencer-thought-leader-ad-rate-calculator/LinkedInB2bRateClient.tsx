"use client";

import React, { useState } from "react";

type SeniorityKey = "csuite_vp" | "director_mgr" | "ic_practitioner";
type FormatKey = "text_carousel" | "native_video" | "linkedin_newsletter" | "live_event";
type TlaLicenseKey = "none_0" | "tla_30d" | "tla_90d";

const SENIORITY_TIERS: Record<SeniorityKey, { label: string; baseCpm: number }> = {
  csuite_vp: {
    label: "C-Suite, Founder & VP Decision-Makers ($85 Base CPM)",
    baseCpm: 85,
  },
  director_mgr: {
    label: "Directors, Engineering Leads & Dept Heads ($68 Base CPM)",
    baseCpm: 68,
  },
  ic_practitioner: {
    label: "Practitioners, Developers & Analysts ($52 Base CPM)",
    baseCpm: 52,
  },
};

const FORMAT_MULTIPLIERS: Record<FormatKey, { label: string; multiplier: number }> = {
  text_carousel: {
    label: "Long-Form Text + Document Carousel / Image Post (1.0x)",
    multiplier: 1.0,
  },
  native_video: {
    label: "Native LinkedIn Video Post + First-Comment CTA (1.25x)",
    multiplier: 1.25,
  },
  linkedin_newsletter: {
    label: "LinkedIn Native Newsletter Issue Integration (1.30x)",
    multiplier: 1.3,
  },
  live_event: {
    label: "LinkedIn Live / Audio Event Co-Host + Post (1.60x)",
    multiplier: 1.6,
  },
};

const TLA_MULTIPLIERS: Record<TlaLicenseKey, { label: string; pct: number }> = {
  none_0: { label: "Organic Post Only — No Thought Leader Ad Boost (0%)", pct: 0 },
  tla_30d: {
    label: "30-Day LinkedIn Thought Leader Ad Permission (+30%)",
    pct: 0.3,
  },
  tla_90d: {
    label: "90-Day LinkedIn Thought Leader Ad Permission (+65%)",
    pct: 0.65,
  },
};

export default function LinkedInB2bRateClient() {
  const [followers, setFollowers] = useState<number>(45000);
  const [avgImpressions, setAvgImpressions] = useState<number>(28000);
  const [seniorityKey, setSeniorityKey] = useState<SeniorityKey>("csuite_vp");
  const [formatKey, setFormatKey] = useState<FormatKey>("text_carousel");
  const [tlaKey, setTlaKey] = useState<TlaLicenseKey>("tla_30d");
  const [tlaMediaBudget, setTlaMediaBudget] = useState<number>(5000);
  const [landingPageCvrPct, setLandingPageCvrPct] = useState<number>(6.5);
  const [calcRun, setCalcRun] = useState<number>(1);

  const safeFollowers = Math.max(1000, followers);
  const safeImps = Math.max(500, avgImpressions);
  const seniorityInfo = SENIORITY_TIERS[seniorityKey];
  const formatInfo = FORMAT_MULTIPLIERS[formatKey];
  const tlaInfo = TLA_MULTIPLIERS[tlaKey];
  const safeTlaBudget = tlaKey === "none_0" ? 0 : Math.max(0, tlaMediaBudget);
  const safeCvr = Math.min(35, Math.max(0.5, landingPageCvrPct)) / 100;

  // Authority floor based on follower count + impression-based B2B CPM valuation
  const impressionBasedValuation = (safeImps / 1000) * seniorityInfo.baseCpm;
  const followerFloorValuation = (safeFollowers / 1000) * 22;
  const organicBaseFee = Math.max(450, impressionBasedValuation * 0.8 + followerFloorValuation * 0.2) * formatInfo.multiplier;

  const tlaLicensingFee = organicBaseFee * tlaInfo.pct;
  const totalCreatorPayout = organicBaseFee + tlaLicensingFee;
  const effectiveOrganicCpm = (organicBaseFee / safeImps) * 1000;

  // Lead projection: Organic + Thought Leader Ad boost vs Standard LinkedIn Company Page Ad
  // Illustrative CTR: Organic creator post ~1.35% link CTR; Thought Leader Ad ~1.65% CTR (~$4.80 eCPC); Company Page Sponsored Content ~$11.50 CPC
  const organicClicks = safeImps * 0.0135;
  const tlaPaidClicks = safeTlaBudget > 0 ? safeTlaBudget / 4.8 : 0;
  const totalCreatorFunnelClicks = organicClicks + tlaPaidClicks;
  const totalCreatorFunnelLeads = totalCreatorFunnelClicks * safeCvr;
  const totalAllInSpend = totalCreatorPayout + safeTlaBudget;
  const blendedCreatorCpl =
    totalCreatorFunnelLeads > 0 ? totalAllInSpend / totalCreatorFunnelLeads : 0;

  // Equivalent spend on Standard LinkedIn Company Page Sponsored Content ($11.50 illustrative B2B CPC)
  const standardCompanyAdClicks = totalAllInSpend / 11.5;
  const standardCompanyAdLeads = standardCompanyAdClicks * safeCvr;
  const standardCompanyCpl =
    standardCompanyAdLeads > 0 ? totalAllInSpend / standardCompanyAdLeads : 0;

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-7 shadow-sm my-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
          Interactive LinkedIn B2B Creator &amp; Thought Leader Ad Calculator
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
          2026 B2B Seniority &amp; TLA Model
        </span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">
        Calculate LinkedIn Creator Sponsorship Fees, Thought Leader Ad Rights &amp; B2B Cost-Per-Lead
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="followersInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Creator LinkedIn Followers
          </label>
          <input
            id="followersInput"
            type="number"
            min={1000}
            max={2000000}
            step={1000}
            value={followers}
            onChange={(e) => setFollowers(Number(e.target.value) || 10000)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="impsInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Avg. Organic Impressions / Post
          </label>
          <input
            id="impsInput"
            type="number"
            min={500}
            max={1000000}
            step={500}
            value={avgImpressions}
            onChange={(e) => setAvgImpressions(Number(e.target.value) || 10000)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="senioritySelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Audience Seniority Concentration
          </label>
          <select
            id="senioritySelect"
            value={seniorityKey}
            onChange={(e) => setSeniorityKey(e.target.value as SeniorityKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="csuite_vp">C-Suite / VP / Founder Heavy ($85 CPM)</option>
            <option value="director_mgr">Director / Dept Head Heavy ($68 CPM)</option>
            <option value="ic_practitioner">Practitioner / IC Heavy ($52 CPM)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="formatSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            LinkedIn Deliverable Format
          </label>
          <select
            id="formatSelect"
            value={formatKey}
            onChange={(e) => setFormatKey(e.target.value as FormatKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="text_carousel">Text + PDF Carousel / Image Post (1.0x)</option>
            <option value="native_video">Native LinkedIn Video Post (1.25x)</option>
            <option value="linkedin_newsletter">LinkedIn Newsletter Integration (1.30x)</option>
            <option value="live_event">LinkedIn Live / Audio Event Co-Host (1.60x)</option>
          </select>
        </div>

        <div>
          <label htmlFor="tlaSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Thought Leader Ads (TLA) Paid Licensing
          </label>
          <select
            id="tlaSelect"
            value={tlaKey}
            onChange={(e) => setTlaKey(e.target.value as TlaLicenseKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="none_0">Organic Post Only (0% Licensing Add-On)</option>
            <option value="tla_30d">30-Day Thought Leader Ad License (+30%)</option>
            <option value="tla_90d">90-Day Thought Leader Ad License (+65%)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label htmlFor="tlaBudgetInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Optional Thought Leader Ad Media Spend ($ USD)
          </label>
          <input
            id="tlaBudgetInput"
            type="number"
            min={0}
            max={250000}
            step={500}
            disabled={tlaKey === "none_0"}
            value={tlaKey === "none_0" ? 0 : tlaMediaBudget}
            onChange={(e) => setTlaMediaBudget(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 disabled:bg-slate-100"
          />
        </div>

        <div>
          <label htmlFor="lpCvrInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Gated Asset / Demo Landing Page CVR (%)
          </label>
          <input
            id="lpCvrInput"
            type="number"
            min={0.5}
            max={30}
            step={0.5}
            value={landingPageCvrPct}
            onChange={(e) => setLandingPageCvrPct(Number(e.target.value) || 5)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCalcRun((r) => r + 1)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer mb-5"
      >
        Calculate LinkedIn Creator Sponsorship Rate &amp; Thought Leader Ad CPL
      </button>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Recommended Total Creator Contract Payout (Base + TLA License &bull; Run #{calcRun}):
          </span>
          <strong className="text-2xl font-extrabold text-slate-900">
            ${Math.round(totalCreatorPayout).toLocaleString("en-US")} (${Math.round(organicBaseFee).toLocaleString("en-US")}{" "}
            Base + ${Math.round(tlaLicensingFee).toLocaleString("en-US")} TLA)
          </strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-slate-600 uppercase">
              1. Organic Deliverable Rate
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              ${Math.round(organicBaseFee).toLocaleString("en-US")}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Effective B2B Organic CPM: ${effectiveOrganicCpm.toFixed(2)}
            </div>
          </div>

          <div className="bg-white border border-emerald-300 rounded-lg p-3.5">
            <div className="text-xs font-bold text-emerald-800 uppercase">
              2. Creator + TLA Blended CPL
            </div>
            <div className="text-lg font-extrabold text-emerald-900 mt-1">
              ${blendedCreatorCpl.toFixed(0)} / Lead ({Math.round(totalCreatorFunnelLeads)} MQLs)
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Total Loaded Spend: ${Math.round(totalAllInSpend).toLocaleString("en-US")}
            </div>
          </div>

          <div className="bg-white border border-rose-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-rose-800 uppercase">
              3. Standard Company-Page Ad CPL
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              ${standardCompanyCpl.toFixed(0)} / Lead ({Math.round(standardCompanyAdLeads)} MQLs)
            </div>
            <div className="text-xs text-slate-600 mt-1">
              At $11.50 avg B2B feed CPC &amp; {landingPageCvrPct}% CVR
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
          <strong>B2B Demand Gen Verdict:</strong> Sponsoring a LinkedIn creator with{" "}
          <strong>{safeImps.toLocaleString("en-US")} average impressions</strong> at{" "}
          <strong>${Math.round(totalCreatorPayout).toLocaleString("en-US")}</strong> and amplifying
          the post via <strong>LinkedIn Thought Leader Ads</strong> (${safeTlaBudget.toLocaleString("en-US")}{" "}
          media budget) produces B2B leads at an estimated{" "}
          <strong>${blendedCreatorCpl.toFixed(0)} CPL</strong>—compared to{" "}
          <strong>${standardCompanyCpl.toFixed(0)} CPL</strong> on standard company-page Sponsored
          Content.
        </div>
      </div>
    </div>
  );
}
