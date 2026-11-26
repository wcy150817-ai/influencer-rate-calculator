"use client";

import React, { useState } from "react";

export default function FirstDealPitchCalc() {
  const [medianViews, setMedianViews] = useState<number>(3500);
  const [retailGiftValue, setRetailGiftValue] = useState<number>(65);
  const [productionHours, setProductionHours] = useState<number>(4);
  const [hourlyTarget, setHourlyTarget] = useState<number>(35);
  const [wantsSparkAd, setWantsSparkAd] = useState<boolean>(true);
  const [evaluated, setEvaluated] = useState<boolean>(false);

  const cpmValue = (medianViews / 1000) * 28;
  const laborFloor = productionHours * hourlyTarget;
  const organicBase = Math.max(75, Math.round((cpmValue * 0.55 + laborFloor * 0.65) / 5) * 5);
  const rightsFee = wantsSparkAd ? Math.round((organicBase * 0.35) / 5) * 5 : 0;
  const recommendedCashQuote = organicBase + rightsFee;
  const netGapIfUnpaid = recommendedCashQuote - retailGiftValue;

  return (
    <section
      aria-label="Small Creator Gifted vs Paid Deal Evaluator"
      className="rounded-2xl border border-fuchsia-500/30 bg-slate-950 text-slate-100 p-6 sm:p-8 shadow-xl space-y-6 my-8"
    >
      <div className="space-y-2">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-400/30">
          Interactive Small-Creator Deal Helper
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Gifted Product vs. Paid Counter-Offer Calculator (Under 10K Followers)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Check whether a &quot;free product collaboration&quot; email actually covers your filming and editing labor—and calculate a fair cash counter-offer based on your median views and ad usage rights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="deal-views" className="block text-xs font-bold text-slate-300">
            Median Views Over Last 10 Videos
          </label>
          <input
            id="deal-views"
            type="number"
            min={100}
            max={500000}
            step={250}
            value={medianViews}
            onChange={(e) => setMedianViews(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-fuchsia-400 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="deal-gift-value" className="block text-xs font-bold text-slate-300">
            Retail Price of Gifted Product ($)
          </label>
          <input
            id="deal-gift-value"
            type="number"
            min={0}
            max={5000}
            step={5}
            value={retailGiftValue}
            onChange={(e) => setRetailGiftValue(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-fuchsia-400 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="deal-hours" className="block text-xs font-bold text-slate-300">
            Scripting, Filming &amp; Editing Hours
          </label>
          <input
            id="deal-hours"
            type="number"
            min={1}
            max={40}
            step={0.5}
            value={productionHours}
            onChange={(e) => setProductionHours(Math.max(0.5, Number(e.target.value) || 1))}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-fuchsia-400 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="deal-hourly" className="block text-xs font-bold text-slate-300">
            Minimum Production Hourly Rate ($/hr)
          </label>
          <input
            id="deal-hourly"
            type="number"
            min={15}
            max={250}
            step={5}
            value={hourlyTarget}
            onChange={(e) => setHourlyTarget(Math.max(10, Number(e.target.value) || 25))}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-fuchsia-400 focus:outline-none"
          />
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-slate-200 cursor-pointer">
        <input
          id="deal-spark-toggle"
          type="checkbox"
          checked={wantsSparkAd}
          onChange={(e) => setWantsSparkAd(e.target.checked)}
          className="w-4 h-4 rounded border-slate-600 text-fuchsia-500"
        />
        <span>Brand also asks for a Spark Ad code, Meta Partnership Ad, or raw video file (+35% 30-day usage fee)</span>
      </label>

      <button
        id="deal-calc-btn"
        type="button"
        onClick={() => setEvaluated(true)}
        style={{ backgroundColor: "#d946ef", color: "#ffffff" }}
        className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-sm tracking-tight hover:opacity-95 transition cursor-pointer"
      >
        Evaluate Deal &amp; Generate Counter-Offer
      </button>

      <div
        id="deal-result"
        className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-slate-400">Organic Integration Base</div>
            <div className="text-2xl font-black text-cyan-300">${organicBase}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">30-Day Ad Usage Add-On</div>
            <div className="text-2xl font-black text-fuchsia-300">+${rightsFee}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Fair Cash Counter-Offer</div>
            <div className="text-2xl font-black text-emerald-400">${recommendedCashQuote}</div>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {evaluated ? "Counter-offer verdict: " : "Baseline deal check: "}
          {netGapIfUnpaid > 0
            ? `Accepting a $${retailGiftValue} product alone underpays your production and reach value by ~$${netGapIfUnpaid} (plus free merchandise cannot pay rent). Counter with $${recommendedCashQuote} + gifted unit for a dedicated deliverable, or offer an optional no-obligation unboxing story if they have zero cash budget.`
            : `Because the $${retailGiftValue} item exceeds your $${recommendedCashQuote} production + view floor—and only if you genuinely wanted to buy that exact item anyway—a gifted test can make sense provided you retain 100% editorial freedom and zero paid-ad usage obligations.`}
        </p>
      </div>
    </section>
  );
}
