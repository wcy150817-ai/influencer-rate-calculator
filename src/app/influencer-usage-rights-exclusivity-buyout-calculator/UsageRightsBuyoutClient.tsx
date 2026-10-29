"use client";

import React, { useState } from "react";

type UsageDurationKey = "0" | "30" | "60" | "90" | "180" | "365" | "perpetual";
type ExclusivityScopeKey = "none" | "narrow" | "broad";
type RawFootageKey = "none" | "standard_35" | "full_50";

const USAGE_MULTIPLIERS: Record<
  UsageDurationKey,
  { label: string; pct: number; monthsForAmortization: number }
> = {
  "0": { label: "Organic Only — No Paid Ad Usage (0%)", pct: 0, monthsForAmortization: 1 },
  "30": { label: "30-Day Paid Social & Digital Usage (+30%)", pct: 0.3, monthsForAmortization: 1 },
  "60": { label: "60-Day Paid Social & Digital Usage (+50%)", pct: 0.5, monthsForAmortization: 2 },
  "90": { label: "90-Day Paid Social & Digital Usage (+75%)", pct: 0.75, monthsForAmortization: 3 },
  "180": { label: "6-Month Paid Digital Usage (+120%)", pct: 1.2, monthsForAmortization: 6 },
  "365": { label: "12-Month Full Digital Usage (+200%)", pct: 2.0, monthsForAmortization: 12 },
  perpetual: {
    label: "Perpetual In-Perpetuity Buyout (+300%)",
    pct: 3.0,
    monthsForAmortization: 24,
  },
};

export default function UsageRightsBuyoutClient() {
  const [baseFee, setBaseFee] = useState<number>(3000);
  const [usageKey, setUsageKey] = useState<UsageDurationKey>("90");
  const [exclusivityScope, setExclusivityScope] = useState<ExclusivityScopeKey>("narrow");
  const [exclusivityMonths, setExclusivityMonths] = useState<number>(2);
  const [rawFootageKey, setRawFootageKey] = useState<RawFootageKey>("standard_35");
  const [includeWhitelisting, setIncludeWhitelisting] = useState<boolean>(true);
  const [includeLinkInBio, setIncludeLinkInBio] = useState<boolean>(false);
  const [calcRun, setCalcRun] = useState<number>(1);

  const safeBase = Math.max(100, baseFee);
  const safeExclMonths = exclusivityScope === "none" ? 0 : Math.min(12, Math.max(1, exclusivityMonths));

  // 1. Paid Ad Usage Fee
  const usageInfo = USAGE_MULTIPLIERS[usageKey];
  const paidUsageFee = safeBase * usageInfo.pct;

  // 2. Category Exclusivity Fee
  const monthlyExclRate =
    exclusivityScope === "narrow" ? 0.15 : exclusivityScope === "broad" ? 0.3 : 0;
  const exclusivityFee = safeBase * monthlyExclRate * safeExclMonths;

  // 3. Raw Unedited Footage Buyout
  const rawFootagePct =
    rawFootageKey === "standard_35" ? 0.35 : rawFootageKey === "full_50" ? 0.5 : 0;
  const rawFootageFee = safeBase * rawFootagePct;

  // 4. Handle Whitelisting & Link-in-Bio Add-Ons
  const whitelistingFee = includeWhitelisting ? safeBase * 0.25 : 0;
  const linkInBioFee = includeLinkInBio ? safeBase * 0.1 : 0;
  const addOnsFee = whitelistingFee + linkInBioFee;

  // Totals
  const totalLicensingPremium = paidUsageFee + exclusivityFee + rawFootageFee + addOnsFee;
  const totalContractValue = safeBase + totalLicensingPremium;
  const premiumMultiplierPct = safeBase > 0 ? (totalLicensingPremium / safeBase) * 100 : 0;
  const monthlyAmortizedCost = totalContractValue / usageInfo.monthsForAmortization;

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-7 shadow-sm my-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
          Interactive Creator Contract &amp; Licensing Multiplier Calculator
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
          Itemized SOW Line-Item Builder
        </span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">
        Calculate Usage Rights Multipliers, Category Exclusivity Surcharges &amp; Raw Footage Buyout Fees
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="baseFeeInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Creator Organic Base Deliverable Fee ($ USD)
          </label>
          <input
            id="baseFeeInput"
            type="number"
            min={100}
            max={250000}
            step={100}
            value={baseFee}
            onChange={(e) => setBaseFee(Number(e.target.value) || 500)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="usageSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Paid Ad Usage Licensing Duration
          </label>
          <select
            id="usageSelect"
            value={usageKey}
            onChange={(e) => setUsageKey(e.target.value as UsageDurationKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="0">None — Organic Feed Post Only (0%)</option>
            <option value="30">30 Days Paid Ad Usage (+30%)</option>
            <option value="60">60 Days Paid Ad Usage (+50%)</option>
            <option value="90">90 Days Paid Ad Usage (+75%)</option>
            <option value="180">6 Months Paid Ad Usage (+120%)</option>
            <option value="365">12 Months Paid Ad Usage (+200%)</option>
            <option value="perpetual">Perpetual Buyout (+300%)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="exclScopeSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Category Exclusivity Scope
          </label>
          <select
            id="exclScopeSelect"
            value={exclusivityScope}
            onChange={(e) => setExclusivityScope(e.target.value as ExclusivityScopeKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="none">No Category Exclusivity (0%)</option>
            <option value="narrow">Direct Named Sub-Category (+15% / mo)</option>
            <option value="broad">Broad Industry Vertical (+30% / mo)</option>
          </select>
        </div>

        <div>
          <label htmlFor="exclMonthsInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Exclusivity Window (Months)
          </label>
          <input
            id="exclMonthsInput"
            type="number"
            min={0}
            max={12}
            step={1}
            disabled={exclusivityScope === "none"}
            value={exclusivityScope === "none" ? 0 : exclusivityMonths}
            onChange={(e) => setExclusivityMonths(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 disabled:bg-slate-100"
          />
        </div>

        <div>
          <label htmlFor="rawFootageSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Raw Unedited Footage Buyout
          </label>
          <select
            id="rawFootageSelect"
            value={rawFootageKey}
            onChange={(e) => setRawFootageKey(e.target.value as RawFootageKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="none">Final Edited Cut Only (0%)</option>
            <option value="standard_35">Raw B-Roll &amp; Clean Takes (+35%)</option>
            <option value="full_50">Full Multi-Hook Project &amp; Raw Files (+50%)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <label className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={includeWhitelisting}
            onChange={(e) => setIncludeWhitelisting(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600"
          />
          Include Creator Handle Whitelisting / Spark Code (+25% of Base)
        </label>

        <label className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={includeLinkInBio}
            onChange={(e) => setIncludeLinkInBio(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600"
          />
          Include 7-Day Link-in-Bio / Pinned Comment Anchor (+10% of Base)
        </label>
      </div>

      <button
        type="button"
        onClick={() => setCalcRun((r) => r + 1)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer mb-5"
      >
        Generate Itemized Creator Licensing Quote &amp; Monthly Amortization
      </button>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Total All-In Contract Quote (Base + Licensing Premium &bull; Run #{calcRun}):
          </span>
          <strong className="text-2xl font-extrabold text-slate-900">
            ${totalContractValue.toLocaleString("en-US", { minimumFractionDigits: 0 })} (+
            {premiumMultiplierPct.toFixed(0)}% Over Base)
          </strong>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="text-xs font-bold text-slate-500 uppercase">1. Paid Usage Fee</div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              +${paidUsageFee.toLocaleString("en-US")}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {(usageInfo.pct * 100).toFixed(0)}% of ${safeBase.toLocaleString("en-US")} base
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="text-xs font-bold text-slate-500 uppercase">2. Exclusivity Surcharge</div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              +${exclusivityFee.toLocaleString("en-US")}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {safeExclMonths} mo &times; {(monthlyExclRate * 100).toFixed(0)}%/mo
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="text-xs font-bold text-slate-500 uppercase">3. Raw Footage Buyout</div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              +${rawFootageFee.toLocaleString("en-US")}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {(rawFootagePct * 100).toFixed(0)}% unedited B-roll rights
            </div>
          </div>

          <div className="bg-white border border-emerald-300 rounded-lg p-3">
            <div className="text-xs font-bold text-emerald-800 uppercase">4. Monthly Amortization</div>
            <div className="text-lg font-extrabold text-emerald-900 mt-1">
              ${Math.round(monthlyAmortizedCost).toLocaleString("en-US")} / mo
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Incl. ${addOnsFee.toLocaleString("en-US")} handle/bio add-ons
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
          <strong>Contract Negotiation Summary:</strong> Starting from a{" "}
          <strong>${safeBase.toLocaleString("en-US")} organic base fee</strong>, adding{" "}
          <strong>{usageInfo.label}</strong> (+${paidUsageFee.toLocaleString("en-US")}),{" "}
          <strong>{safeExclMonths}-month category exclusivity</strong> (+$
          {exclusivityFee.toLocaleString("en-US")}), <strong>raw footage buyout</strong> (+$
          {rawFootageFee.toLocaleString("en-US")}), and <strong>handle/bio add-ons</strong> (+$
          {addOnsFee.toLocaleString("en-US")}) yields a{" "}
          <strong>${totalLicensingPremium.toLocaleString("en-US")} licensing premium</strong> and a{" "}
          <strong>${totalContractValue.toLocaleString("en-US")} total SOW value</strong>.
        </div>
      </div>
    </div>
  );
}
