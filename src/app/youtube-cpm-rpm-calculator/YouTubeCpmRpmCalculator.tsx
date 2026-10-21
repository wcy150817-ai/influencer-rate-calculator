"use client";

import React, { useState } from "react";

export default function YouTubeCpmRpmCalculator() {
  const [niche, setNiche] = useState<string>("finance");
  const [monthlyLongViews, setMonthlyLongViews] = useState<number>(150000);
  const [monthlyShortsViews, setMonthlyShortsViews] = useState<number>(300000);
  const [monetizedRate, setMonetizedRate] = useState<number>(58);
  const [sponsoredVideosPerMonth, setSponsoredVideosPerMonth] = useState<number>(2);
  const [calcRun, setCalcRun] = useState<number>(1);

  const nicheBenchmarks: Record<
    string,
    { label: string; advCpm: number; sponsorCpm: number; shortsRpm: number }
  > = {
    finance: {
      label: "Personal Finance, Investing & B2B SaaS ($28.00 Avg CPM)",
      advCpm: 28.0,
      sponsorCpm: 50.0,
      shortsRpm: 0.09,
    },
    tech: {
      label: "Software Engineering, AI Tools & Cybersecurity ($18.50 Avg CPM)",
      advCpm: 18.5,
      sponsorCpm: 35.0,
      shortsRpm: 0.07,
    },
    gadgets: {
      label: "Consumer Tech, Cameras & Desk Hardware ($12.00 Avg CPM)",
      advCpm: 12.0,
      sponsorCpm: 28.0,
      shortsRpm: 0.06,
    },
    lifestyle: {
      label: "Fitness, Beauty, Fashion & Vlogs ($6.50 Avg CPM)",
      advCpm: 6.5,
      sponsorCpm: 22.0,
      shortsRpm: 0.05,
    },
    gaming: {
      label: "Gaming, Comedy & General Entertainment ($3.20 Avg CPM)",
      advCpm: 3.2,
      sponsorCpm: 15.0,
      shortsRpm: 0.04,
    },
  };

  const currentNiche = nicheBenchmarks[niche] || nicheBenchmarks.finance;
  const cleanLongViews = Math.max(0, Number(monthlyLongViews) || 0);
  const cleanShortsViews = Math.max(0, Number(monthlyShortsViews) || 0);
  const cleanMonRate = Math.max(15, Math.min(95, Number(monetizedRate) || 58)) / 100;
  const cleanSponsoredCount = Math.max(0, Math.min(30, Number(sponsoredVideosPerMonth) || 0));

  const realizedLongRpm = Math.round(currentNiche.advCpm * cleanMonRate * 0.55 * 100) / 100;
  const grossAdvSpend = Math.round((cleanLongViews / 1000) * cleanMonRate * currentNiche.advCpm);
  const netLongAdSense = Math.round((cleanLongViews / 1000) * realizedLongRpm);
  const netShortsAdSense = Math.round((cleanShortsViews / 1000) * currentNiche.shortsRpm);

  const avgViewsPerLongVideo = Math.max(1000, Math.round(cleanLongViews / 4));
  const sponsorRatePerIntegration = Math.round((avgViewsPerLongVideo / 1000) * currentNiche.sponsorCpm);
  const monthlySponsorshipTotal = sponsorRatePerIntegration * cleanSponsoredCount;
  const totalMonthlyCreatorIncome = netLongAdSense + netShortsAdSense + monthlySponsorshipTotal;

  return (
    <div className="my-8 rounded-2xl border-2 border-indigo-600 bg-white p-5 sm:p-7 shadow-md">
      <div className="border-b border-slate-200 pb-4 mb-5">
        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-800 mb-1">
          Interactive YPP 55/45 Split &amp; Brand Deal Modeler
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          YouTube CPM, Realized RPM &amp; Stacked Sponsorship Calculator (2026)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        <div>
          <label htmlFor="ytNicheSelect" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
            1. Channel Content Niche
          </label>
          <select
            id="ytNicheSelect"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"
          >
            <option value="finance">Finance, Investing &amp; B2B SaaS ($28 CPM)</option>
            <option value="tech">Software, AI &amp; Cybersecurity ($18.50 CPM)</option>
            <option value="gadgets">Consumer Tech &amp; Cameras ($12.00 CPM)</option>
            <option value="lifestyle">Beauty, Fitness &amp; Lifestyle ($6.50 CPM)</option>
            <option value="gaming">Gaming &amp; Entertainment ($3.20 CPM)</option>
          </select>
        </div>

        <div>
          <label htmlFor="ytLongViews" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
            2. Monthly Long-Form Views (8+ Min)
          </label>
          <input
            id="ytLongViews"
            type="number"
            min={0}
            step={5000}
            value={monthlyLongViews}
            onChange={(e) => setMonthlyLongViews(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="ytShortsViews" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
            3. Monthly YouTube Shorts Views
          </label>
          <input
            id="ytShortsViews"
            type="number"
            min={0}
            step={10000}
            value={monthlyShortsViews}
            onChange={(e) => setMonthlyShortsViews(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="ytMonetizedPct" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
            4. Monetized Playback Rate (%)
          </label>
          <input
            id="ytMonetizedPct"
            type="number"
            min={20}
            max={90}
            value={monetizedRate}
            onChange={(e) => setMonetizedRate(parseInt(e.target.value, 10) || 58)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="ytSponsorCount" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
            5. Sponsored Integrations / Month
          </label>
          <input
            id="ytSponsorCount"
            type="number"
            min={0}
            max={20}
            value={sponsoredVideosPerMonth}
            onChange={(e) => setSponsoredVideosPerMonth(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"
          />
        </div>

        <div className="flex items-end">
          <button
            id="ytCalcBtn"
            type="button"
            onClick={() => setCalcRun((r) => r + 1)}
            className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-indigo-700 transition"
          >
            Calculate Net RPM &amp; Total Revenue
          </button>
        </div>
      </div>

      <div id="ytResultBox" className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-3">
          {currentNiche.label} · {cleanLongViews.toLocaleString()} Long-Form Views · Run #{calcRun}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="rounded-lg bg-white p-3.5 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">Realized Creator RPM</div>
            <div className="text-xl font-extrabold text-slate-900">${realizedLongRpm.toFixed(2)}</div>
            <div className="text-xs text-slate-600 mt-0.5">
              vs. ${currentNiche.advCpm.toFixed(2)} Advertiser CPM (55% YPP Split)
            </div>
          </div>

          <div className="rounded-lg bg-white p-3.5 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">Long-Form AdSense (55%)</div>
            <div className="text-xl font-extrabold text-indigo-950">${netLongAdSense.toLocaleString()}/mo</div>
            <div className="text-xs text-slate-600 mt-0.5">
              Gross Ad Spend: ${grossAdvSpend.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg bg-white p-3.5 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">Shorts Pool + Brand Deals</div>
            <div className="text-xl font-extrabold text-emerald-800">
              ${(netShortsAdSense + monthlySponsorshipTotal).toLocaleString()}/mo
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Shorts: ${netShortsAdSense} · {cleanSponsoredCount} Sponsors: ${monthlySponsorshipTotal.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg bg-indigo-900 p-3.5 text-white">
            <div className="text-xs font-semibold text-indigo-200">Total Monthly Creator Income</div>
            <div className="text-xl font-extrabold text-white">${totalMonthlyCreatorIncome.toLocaleString()}/mo</div>
            <div className="text-xs text-indigo-200 mt-0.5">
              Annualized Run Rate: ${(totalMonthlyCreatorIncome * 12).toLocaleString()}/yr
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          <strong>YPP Funnel Math:</strong> At a <strong>{Math.round(cleanMonRate * 100)}% monetized playback rate</strong> and YouTube&apos;s <strong>55% creator revenue share</strong>, a <strong>${currentNiche.advCpm.toFixed(2)} advertiser CPM</strong> yields a net <strong>${realizedLongRpm.toFixed(2)} long-form RPM</strong>. Adding {cleanSponsoredCount} integrated 60-second mid-roll sponsorships (~${sponsorRatePerIntegration.toLocaleString()} per integration at ${currentNiche.sponsorCpm} CPV/CPM) increases total channel yield to <strong>${totalMonthlyCreatorIncome.toLocaleString()}/month</strong>.
        </p>
      </div>
    </div>
  );
}
