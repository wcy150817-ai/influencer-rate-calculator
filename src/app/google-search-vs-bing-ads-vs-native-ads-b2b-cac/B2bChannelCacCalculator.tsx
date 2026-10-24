"use client";

import React, { useState } from "react";

export default function B2bChannelCacCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(15000);
  const [googleCpc, setGoogleCpc] = useState<number>(8.5);
  const [bingCpc, setBingCpc] = useState<number>(4.8);
  const [nativeCpc, setNativeCpc] = useState<number>(0.65);
  const [sqlCloseRate, setSqlCloseRate] = useState<number>(20);
  const [calcRun, setCalcRun] = useState<number>(1);

  const safeBudget = monthlyBudget > 0 ? monthlyBudget : 1000;
  const safeGoogleCpc = googleCpc > 0 ? googleCpc : 1;
  const safeBingCpc = bingCpc > 0 ? bingCpc : 1;
  const safeNativeCpc = nativeCpc > 0 ? nativeCpc : 0.1;
  const safeClose = (sqlCloseRate > 0 ? sqlCloseRate : 10) / 100;

  // 1. Google Search Ads (High-intent bottom-funnel: ~4.5% LP CVR to MQL, ~34% MQL-to-SQL)
  const googleClicks = safeBudget / safeGoogleCpc;
  const googleMqls = googleClicks * 0.045;
  const googleSqls = googleMqls * 0.34;
  const googleCustomers = googleSqls * safeClose;
  const googleCpl = safeBudget / (googleMqls > 0 ? googleMqls : 1);
  const googleCpSql = safeBudget / (googleSqls > 0 ? googleSqls : 1);
  const googleCac = safeBudget / (googleCustomers > 0 ? googleCustomers : 0.1);

  // 2. Microsoft Bing Ads + LinkedIn Profile Targeting (~4.8% LP CVR to MQL, ~38% MQL-to-SQL)
  const bingClicks = safeBudget / safeBingCpc;
  const bingMqls = bingClicks * 0.048;
  const bingSqls = bingMqls * 0.38;
  const bingCustomers = bingSqls * safeClose;
  const bingCpl = safeBudget / (bingMqls > 0 ? bingMqls : 1);
  const bingCpSql = safeBudget / (bingSqls > 0 ? bingSqls : 1);
  const bingCac = safeBudget / (bingCustomers > 0 ? bingCustomers : 0.1);

  // 3. Native Discovery Ads (Taboola/Outbrain -> 28% Pre-Lander CTR -> 9% Gated Lead CVR -> 14% MQL-to-SQL)
  const nativeClicks = safeBudget / safeNativeCpc;
  const nativePreLandClicks = nativeClicks * 0.28;
  const nativeMqls = nativePreLandClicks * 0.09;
  const nativeSqls = nativeMqls * 0.14;
  const nativeCustomers = nativeSqls * safeClose;
  const nativeCpl = safeBudget / (nativeMqls > 0 ? nativeMqls : 1);
  const nativeCpSql = safeBudget / (nativeSqls > 0 ? nativeSqls : 1);
  const nativeCac = safeBudget / (nativeCustomers > 0 ? nativeCustomers : 0.1);

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-7 shadow-sm my-8">
      <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-1">
        Interactive B2B Pipeline &amp; SQL Cost Simulator
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">
        Compare Cost Per MQL, Cost Per SQL &amp; Customer Acquisition Cost (CAC) Across Channels
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label
            htmlFor="budgetInput"
            className="block text-xs font-bold text-slate-700 mb-1.5"
          >
            Monthly Channel Spend ($ USD)
          </label>
          <input
            id="budgetInput"
            type="number"
            min={500}
            max={500000}
            step={500}
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(Number(e.target.value) || 1000)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label
            htmlFor="googleCpcInput"
            className="block text-xs font-bold text-slate-700 mb-1.5"
          >
            Google Search B2B CPC ($)
          </label>
          <input
            id="googleCpcInput"
            type="number"
            min={0.5}
            max={80}
            step={0.25}
            value={googleCpc}
            onChange={(e) => setGoogleCpc(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label
            htmlFor="bingCpcInput"
            className="block text-xs font-bold text-slate-700 mb-1.5"
          >
            Microsoft Bing Ads CPC ($)
          </label>
          <input
            id="bingCpcInput"
            type="number"
            min={0.5}
            max={60}
            step={0.25}
            value={bingCpc}
            onChange={(e) => setBingCpc(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="nativeCpcInput"
            className="block text-xs font-bold text-slate-700 mb-1.5"
          >
            Native Ads (Taboola/Outbrain) CPC ($)
          </label>
          <input
            id="nativeCpcInput"
            type="number"
            min={0.1}
            max={10}
            step={0.05}
            value={nativeCpc}
            onChange={(e) => setNativeCpc(Number(e.target.value) || 0.25)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label
            htmlFor="closeRateInput"
            className="block text-xs font-bold text-slate-700 mb-1.5"
          >
            SQL-to-Closed-Won Win Rate (%)
          </label>
          <input
            id="closeRateInput"
            type="number"
            min={2}
            max={80}
            step={1}
            value={sqlCloseRate}
            onChange={(e) => setSqlCloseRate(Number(e.target.value) || 10)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <button
        type="button"
        id="calcB2bChannelBtn"
        onClick={() => setCalcRun((r) => r + 1)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer mb-5"
      >
        Calculate B2B Cost Per MQL, Cost Per SQL &amp; Net CAC
      </button>

      <div
        id="b2bChannelResultBox"
        className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Simulated Monthly Spend Per Channel:
          </span>
          <strong className="text-2xl font-extrabold text-slate-900">
            ${safeBudget.toLocaleString("en-US")} / mo (Run #{calcRun})
          </strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-slate-700 uppercase">
              1. Google Search Ads
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              Cost/SQL: ${googleCpSql.toFixed(0)} | CAC: ${googleCac.toFixed(0)}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {Math.round(googleClicks).toLocaleString("en-US")} clicks &rarr;{" "}
              {googleMqls.toFixed(1)} MQLs (${googleCpl.toFixed(0)}/MQL) &rarr;{" "}
              {googleSqls.toFixed(1)} SQLs
            </div>
          </div>

          <div className="bg-white border border-emerald-300 rounded-lg p-3.5">
            <div className="text-xs font-bold text-emerald-800 uppercase">
              2. Microsoft Bing + LinkedIn
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              Cost/SQL: ${bingCpSql.toFixed(0)} | CAC: ${bingCac.toFixed(0)}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {Math.round(bingClicks).toLocaleString("en-US")} clicks &rarr;{" "}
              {bingMqls.toFixed(1)} MQLs (${bingCpl.toFixed(0)}/MQL) &rarr;{" "}
              {bingSqls.toFixed(1)} SQLs
            </div>
          </div>

          <div className="bg-white border border-indigo-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-indigo-800 uppercase">
              3. Native Discovery (Pre-Lander)
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              Cost/SQL: ${nativeCpSql.toFixed(0)} | CAC: ${nativeCac.toFixed(0)}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {Math.round(nativeClicks).toLocaleString("en-US")} clicks &rarr;{" "}
              {nativeMqls.toFixed(1)} MQLs (${nativeCpl.toFixed(0)}/MQL) &rarr;{" "}
              {nativeSqls.toFixed(1)} SQLs
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-900 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2.5">
          Optimal Allocation Verdict: Microsoft Bing + LinkedIn Profile Targeting delivers SQLs at $
          {bingCpSql.toFixed(0)} vs. ${googleCpSql.toFixed(0)} on Google Search, while Native Ads
          generate {nativeMqls.toFixed(0)} top-of-funnel MQLs/mo at ${nativeCpl.toFixed(0)}/MQL for
          retargeting.
        </div>
      </div>
    </div>
  );
}
