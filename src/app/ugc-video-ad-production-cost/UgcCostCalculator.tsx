'use client';

import React, { useState, useMemo } from 'react';

export default function UgcCostCalculator() {
  const [videoCount, setVideoCount] = useState<number>(10);
  const [productionModel, setProductionModel] = useState<string>('freelance');
  const [hooksPerVideo, setHooksPerVideo] = useState<number>(3);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(25000);

  const stats = useMemo(() => {
    const count = Math.max(1, Number(videoCount) || 1);
    const hooks = Math.max(1, Number(hooksPerVideo) || 1);
    const spend = Math.max(1000, Number(monthlyAdSpend) || 1000);

    /* Unit costs per finished concept */
    let unitCost = 220; // Default freelance (Fiverr verified median: $180 - $260)
    if (productionModel === 'platform') unitCost = 650; // Managed UGC platform
    else if (productionModel === 'agency') unitCost = 4500; // Traditional production agency

    /* Agency reference unit cost for savings calculation */
    const agencyUnitCost = 4500;

    const totalProductionCost = count * unitCost;
    const totalAgencyCost = count * agencyUnitCost;
    const monthlySavings = Math.max(0, totalAgencyCost - totalProductionCost);

    /* Total creative angles (each hook creates a unique ad variation) */
    const totalAngles = count * hooks;
    const costPerAngle = Math.round(totalProductionCost / totalAngles);

    /* Production cost as % of total media spend */
    const productionPct = Math.round((totalProductionCost / spend) * 100);

    let efficiencyStatus = 'Optimal Creative Ratio (8% - 15%)';
    let statusColor = 'text-emerald-400';
    if (productionPct < 8) {
      efficiencyStatus = 'High Capital Efficiency (<8% of Media)';
      statusColor = 'text-emerald-300';
    } else if (productionPct <= 18) {
      efficiencyStatus = 'Healthy Performance Ratio (8% - 18%)';
      statusColor = 'text-emerald-400';
    } else if (productionPct <= 30) {
      efficiencyStatus = 'High Overhead Warning (19% - 30%)';
      statusColor = 'text-amber-400';
    } else {
      efficiencyStatus = 'Budget Starvation: Production Exceeds 30% of Ad Spend';
      statusColor = 'text-rose-400';
    }

    return {
      count,
      hooks,
      spend,
      unitCost,
      totalProductionCost,
      totalAgencyCost,
      monthlySavings,
      totalAngles,
      costPerAngle,
      productionPct,
      efficiencyStatus,
      statusColor,
    };
  }, [videoCount, productionModel, hooksPerVideo, monthlyAdSpend]);

  return (
    <div className="my-10 p-5 sm:p-8 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-full overflow-hidden box-border" id="ugc-calculator">
      <div className="border-b border-slate-800 pb-5 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          B2B Media Buyer Simulator
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          UGC Video Production Cost & Media Efficiency Calculator
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Model monthly video asset costs, hook variation economics, and production budget ratios across freelance creators, managed platforms, and commercial agencies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="input-video-count" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Monthly Video Concepts Needed
              </label>
              <span className="text-sm font-black text-emerald-400" id="val-count">
                {videoCount} videos / month
              </span>
            </div>
            <input
              id="input-video-count"
              type="range"
              min="2"
              max="40"
              step="1"
              value={videoCount}
              onChange={(e) => setVideoCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>2 (Starter)</span>
              <span>10 (Growth Tier)</span>
              <span>25 (Aggressive)</span>
              <span>40+ (Scale)</span>
            </div>
          </div>

          <div>
            <label htmlFor="select-model" className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
              Production Procurement Model
            </label>
            <select
              id="select-model"
              value={productionModel}
              onChange={(e) => setProductionModel(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-700 bg-slate-900 text-white text-sm outline-none focus:border-emerald-500"
            >
              <option value="freelance">Direct Freelance Creators (Fiverr / Upwork @ ~$220/video)</option>
              <option value="platform">Boutique Managed UGC Platform (Billo / Trend @ ~$650/video)</option>
              <option value="agency">Commercial Video Production Agency (~$4,500/video)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="input-hooks" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Alternate Hook Openers Per Video
              </label>
              <span className="text-sm font-black text-emerald-400" id="val-hooks">
                {hooksPerVideo} hooks / concept
              </span>
            </div>
            <input
              id="input-hooks"
              type="range"
              min="1"
              max="5"
              step="1"
              value={hooksPerVideo}
              onChange={(e) => setHooksPerVideo(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>1 (Single)</span>
              <span>3 (Standard A/B/C)</span>
              <span>5 (High Velocity)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="input-spend" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Monthly Paid Social Ad Spend ($ USD)
              </label>
              <span className="text-sm font-black text-emerald-400" id="val-spend">
                ${monthlyAdSpend.toLocaleString()} / mo
              </span>
            </div>
            <input
              id="input-spend"
              type="range"
              min="3000"
              max="100000"
              step="1000"
              value={monthlyAdSpend}
              onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>$3,000</span>
              <span>$25,000</span>
              <span>$50,000</span>
              <span>$100,000+</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-xl border border-emerald-500/30">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Total Monthly Creative Production Budget
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400" id="result-total-cost">
                ${stats.totalProductionCost.toLocaleString()}
              </span>
              <span className="text-slate-400 text-sm font-semibold">/ month</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Effective Cost Per Unique Angle: <strong className="text-slate-200" id="result-cost-per-angle">${stats.costPerAngle} / ad iteration</strong>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Total Tested Creative Angles:</span>
                <strong className="text-slate-100 text-sm" id="result-total-angles">
                  {stats.totalAngles} ad variations
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block">Creative % of Paid Media:</span>
                <strong className={`text-sm ${stats.statusColor}`} id="result-pct-spend">
                  {stats.productionPct}% of budget
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block">Est. Cost vs Traditional Agency:</span>
                <strong className="text-emerald-400 text-sm" id="result-savings">
                  Save ${stats.monthlySavings.toLocaleString()} / mo
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block">Workflow Efficiency Status:</span>
                <strong className="text-slate-200 text-xs">{stats.efficiencyStatus}</strong>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200 block mb-1">Performance Media Buying Guideline:</strong>
            Top direct-to-consumer (DTC) performance brands aim to produce creative at under $100 per hook angle. By hiring specialized UGC actors on Fiverr at $180-$250 with 3 hooks included, you feed Meta and TikTok algorithms continuous creative diversity without draining ad distribution budgets.
          </div>
        </div>
      </div>
    </div>
  );
}
