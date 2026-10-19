"use client";

import React, { useState } from "react";

export default function InstagramReelRateCalculator() {
  const [avgViews, setAvgViews] = useState<number>(35000);
  const [targetCpm, setTargetCpm] = useState<number>(22);
  const [engagementRate, setEngagementRate] = useState<number>(3.2);
  const [usageMonths, setUsageMonths] = useState<number>(1);
  const [usageMonthlyPct, setUsageMonthlyPct] = useState<number>(30);
  const [exclMonths, setExclMonths] = useState<number>(0);
  const [rawBuyoutPct, setRawBuyoutPct] = useState<number>(0);
  const [calcCount, setCalcCount] = useState<number>(0);

  const safeViews = avgViews > 0 ? avgViews : 1000;
  const safeCpm = targetCpm > 0 ? targetCpm : 15;
  const safeEr = engagementRate >= 0 ? engagementRate : 2.5;

  // 1. Base Rate = (Avg_Reel_Views / 1000) * Target_CPM
  const rawBaseRate = (safeViews / 1000) * safeCpm;

  // 2. Engagement Rate Multiplier relative to 2.5% baseline (clamped 0.75x to 1.60x)
  const rawErMult = 1 + 0.12 * (safeEr - 2.5);
  const erMultiplier = Math.min(1.6, Math.max(0.75, rawErMult));
  const adjustedBaseRate = rawBaseRate * erMultiplier;

  // 3. Paid Partnership / Whitelisting Usage Fee
  const usageFee = adjustedBaseRate * (usageMonthlyPct / 100) * usageMonths;

  // 4. Category Exclusivity Fee (25% per month of exclusivity)
  const exclusivityFee = adjustedBaseRate * 0.25 * exclMonths;

  // 5. Raw / Unwatermarked UGC Footage Buyout
  const rawFootageFee = adjustedBaseRate * (rawBuyoutPct / 100);

  // 6. Total All-In Quote & Effective Metrics
  const totalQuote = adjustedBaseRate + usageFee + exclusivityFee + rawFootageFee;
  const effectiveAllInCpm = totalQuote / (safeViews / 1000);
  const effectiveCpv = totalQuote / safeViews;

  // Suggested negotiation range (-10% floor to +20% anchor)
  const floorQuote = totalQuote * 0.9;
  const anchorQuote = totalQuote * 1.2;

  return (
    <section
      id="ig-reel-rate-calculator"
      className="my-8 rounded-2xl border-2 border-indigo-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
            Interactive Sponsorship Pricing Engine
          </span>
          <h2 className="mt-1 text-xl font-extrabold text-slate-900">
            Instagram Sponsored Reel Rate &amp; Licensing Calculator (2026)
          </h2>
        </div>
        <span className="text-xs font-medium text-slate-500">
          Formula: Base Views CPM &times; ER Multiplier + Usage + Exclusivity
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="reelViewsInput"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-700"
          >
            Avg 30-Day Reel Views (Per Video)
          </label>
          <input
            id="reelViewsInput"
            type="number"
            min={500}
            max={10000000}
            step={500}
            value={avgViews}
            onChange={(e) => setAvgViews( parseFloat(e.target.value) || 0 )}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
          <p className="mt-1 text-xs text-slate-500">
            Use median views across last 10 organic Reels
          </p>
        </div>

        <div>
          <label
            htmlFor="reelCpmSelect"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-700"
          >
            Vertical Niche Target CPM ($ / 1K Views)
          </label>
          <select
            id="reelCpmSelect"
            value={targetCpm}
            onChange={(e) => setTargetCpm(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-indigo-600 focus:outline-none"
          >
            <option value={15}>$15 CPM — General Lifestyle / Entertainment</option>
            <option value={22}>$22 CPM — Beauty, Fashion &amp; Fitness (Standard)</option>
            <option value={28}>$28 CPM — Consumer Tech, Home &amp; Parenting</option>
            <option value={35}>$35 CPM — B2B SaaS, Finance &amp; High-AOV Health</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="reelErInput"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-700"
          >
            View-Based Engagement Rate (%)
          </label>
          <input
            id="reelErInput"
            type="number"
            min={0.2}
            max={25}
            step={0.1}
            value={engagementRate}
            onChange={(e) => setEngagementRate(parseFloat(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
          <p className="mt-1 text-xs text-slate-500">
            (Likes + Comments + Saves + Shares) &divide; Views
          </p>
        </div>

        <div>
          <label
            htmlFor="reelUsageMonthsSelect"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-700"
          >
            Paid Partnership / Whitelisting Rights
          </label>
          <select
            id="reelUsageMonthsSelect"
            value={usageMonths}
            onChange={(e) => setUsageMonths(parseInt(e.target.value, 10))}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-indigo-600 focus:outline-none"
          >
            <option value={0}>0 Months (Organic Creator Feed Post Only)</option>
            <option value={1}>30 Days Paid Ads / Whitelisting (+{usageMonthlyPct}%)</option>
            <option value={3}>90 Days Paid Ads / Whitelisting (+{usageMonthlyPct * 3}%)</option>
            <option value={6}>180 Days Paid Ads / Whitelisting (+{usageMonthlyPct * 6}%)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="reelExclMonthsSelect"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-700"
          >
            Competitor Category Exclusivity
          </label>
          <select
            id="reelExclMonthsSelect"
            value={exclMonths}
            onChange={(e) => setExclMonths(parseInt(e.target.value, 10))}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-indigo-600 focus:outline-none"
          >
            <option value={0}>None (No Competitor Lockout)</option>
            <option value={1}>30 Days Category Exclusivity (+25%)</option>
            <option value={3}>90 Days Category Exclusivity (+75%)</option>
            <option value={6}>180 Days Category Exclusivity (+150%)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="reelRawSelect"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-700"
          >
            Raw Unwatermarked Footage Buyout
          </label>
          <select
            id="reelRawSelect"
            value={rawBuyoutPct}
            onChange={(e) => setRawBuyoutPct(parseInt(e.target.value, 10))}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-indigo-600 focus:outline-none"
          >
            <option value={0}>No Raw Footage Transfer (+0%)</option>
            <option value={35}>12-Month Ad Cutdown Rights (+35%)</option>
            <option value={50}>Perpetual Raw B-Roll &amp; Hook Buyout (+50%)</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Monthly Usage Rate %:</span>
          <button
            type="button"
            onClick={() => setUsageMonthlyPct(25)}
            className={`rounded px-2 py-1 font-semibold ${
              usageMonthlyPct === 25
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            25%/mo
          </button>
          <button
            type="button"
            onClick={() => setUsageMonthlyPct(30)}
            className={`rounded px-2 py-1 font-semibold ${
              usageMonthlyPct === 30
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            30%/mo
          </button>
          <button
            type="button"
            onClick={() => setUsageMonthlyPct(35)}
            className={`rounded px-2 py-1 font-semibold ${
              usageMonthlyPct === 35
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            35%/mo
          </button>
        </div>

        <button
          id="reelCalcBtn"
          type="button"
          onClick={() => setCalcCount((c) => c + 1)}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
        >
          Recalculate Sponsorship Quote
        </button>
      </div>

      <div
        id="reelCalcResultBox"
        data-calc-run={calcCount}
        className="mt-6 rounded-xl bg-slate-900 p-5 text-white"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-800/80 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Total All-In Sponsored Reel Quote
            </div>
            <div className="mt-1 text-3xl font-extrabold text-white">
              ${totalQuote.toFixed(0)}
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Negotiation Band: ${floorQuote.toFixed(0)} – ${anchorQuote.toFixed(0)}
            </div>
          </div>

          <div className="rounded-lg bg-slate-800/80 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Organic Base Deliverable Rate
            </div>
            <div className="mt-1 text-2xl font-bold text-white">
              ${adjustedBaseRate.toFixed(0)}
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Raw CPM Base: ${rawBaseRate.toFixed(0)} &times; {erMultiplier.toFixed(2)}x ER Factor
            </div>
          </div>

          <div className="rounded-lg bg-slate-800/80 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Licensing &amp; Effective CPV / CPM
            </div>
            <div className="mt-1 text-lg font-bold text-white">
              +${(usageFee + exclusivityFee + rawFootageFee).toFixed(0)} Rights Add-Ons
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Eff. All-In CPM: ${effectiveAllInCpm.toFixed(2)} | Eff. CPV: ${effectiveCpv.toFixed(3)}/view
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
