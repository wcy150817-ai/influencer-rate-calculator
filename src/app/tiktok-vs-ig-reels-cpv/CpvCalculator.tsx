'use client';

import React, { useState } from 'react';

export default function CpvCalculator() {
  const [budget, setBudget] = useState<number>(3000);
  const [aov, setAov] = useState<number>(55);
  const [niche, setNiche] = useState<string>('ecommerce');

  /* Industry median CPV and conversion benchmarks */
  const benchmarks: Record<string, { ttCpv: number; igCpv: number; ttCtr: number; igCtr: number; ttConv: number; igConv: number }> = {
    ecommerce: { ttCpv: 0.013, igCpv: 0.026, ttCtr: 0.014, igCtr: 0.021, ttConv: 0.022, igConv: 0.029 },
    beauty: { ttCpv: 0.011, igCpv: 0.024, ttCtr: 0.016, igCtr: 0.024, ttConv: 0.025, igConv: 0.033 },
    saas: { ttCpv: 0.022, igCpv: 0.042, ttCtr: 0.009, igCtr: 0.016, ttConv: 0.018, igConv: 0.025 },
    gaming: { ttCpv: 0.009, igCpv: 0.019, ttCtr: 0.018, igCtr: 0.019, ttConv: 0.019, igConv: 0.022 },
  };

  const current = benchmarks[niche] || benchmarks.ecommerce;

  /* TikTok Projections */
  const ttViews = Math.round(budget / current.ttCpv);
  const ttClicks = Math.round(ttViews * current.ttCtr);
  const ttOrders = Math.round(ttClicks * current.ttConv);
  const ttRevenue = ttOrders * aov;
  const ttRoas = (ttRevenue / budget).toFixed(2);
  const ttCpc = (budget / Math.max(ttClicks, 1)).toFixed(2);

  /* Instagram Reels Projections */
  const igViews = Math.round(budget / current.igCpv);
  const igClicks = Math.round(igViews * current.igCtr);
  const igOrders = Math.round(igClicks * current.igConv);
  const igRevenue = igOrders * aov;
  const igRoas = (igRevenue / budget).toFixed(2);
  const igCpc = (budget / Math.max(igClicks, 1)).toFixed(2);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 sm:p-8 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 overflow-x-hidden box-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 font-semibold text-xs tracking-wider uppercase rounded-full mb-2">
            B2B Media Buying Modeling Engine
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            TikTok vs. Instagram Reels CPV Arbitrage Calculator
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Simulate top-of-funnel video view volume, click-through drop-off, and projected e-commerce ROAS.
          </p>
        </div>
      </div>

      {/* Input Form Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
          <label htmlFor="budgetInput" className="text-xs uppercase font-bold text-slate-400 block mb-1">
            Campaign Media Budget ($)
          </label>
          <input
            id="budgetInput"
            type="number"
            min="200"
            max="100000"
            step="100"
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value) || 500)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-lg font-bold font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
          />
          <span className="text-xs text-slate-500 mt-1 block">Paid Ad Spend or Creator Fee</span>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
          <label htmlFor="aovInput" className="text-xs uppercase font-bold text-slate-400 block mb-1">
            Average Order Value ($)
          </label>
          <input
            id="aovInput"
            type="number"
            min="10"
            max="1000"
            step="5"
            value={aov}
            onChange={(e) => setAov(parseFloat(e.target.value) || 20)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-lg font-bold font-mono text-white focus:outline-none focus:border-emerald-500"
          />
          <span className="text-xs text-slate-500 mt-1 block">Expected basket size per conversion</span>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
          <label htmlFor="nicheSelect" className="text-xs uppercase font-bold text-slate-400 block mb-1">
            Industry / Category
          </label>
          <select
            id="nicheSelect"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm font-semibold text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="ecommerce">E-Commerce &amp; Consumer Tech</option>
            <option value="beauty">Beauty &amp; Skincare</option>
            <option value="saas">B2B SaaS &amp; Digital Tools</option>
            <option value="gaming">Mobile Gaming &amp; Apps</option>
          </select>
          <span className="text-xs text-slate-500 mt-1 block">Adjusts CPV &amp; CTR benchmarks</span>
        </div>
      </div>

      {/* Comparative Simulation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* TikTok Output Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-800/70 border border-slate-700 relative overflow-hidden">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
            <span className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              TikTok Sponsored Video
            </span>
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
              Avg CPV: ${(current.ttCpv).toFixed(3)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Total Views</span>
              <span id="ttViews" className="text-xl font-bold font-mono text-cyan-300">
                {ttViews.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Est. Clicks</span>
              <span className="text-xl font-bold font-mono text-white">
                {ttClicks.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 block">CPC ~${ttCpc}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-700/60 text-sm">
            <span className="text-slate-300">Gross Revenue (ROAS):</span>
            <span className="font-mono font-bold text-cyan-400">
              ${ttRevenue.toLocaleString()} ({ttRoas}x)
            </span>
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            High volume viral ceiling; ideal for rapid brand awareness and impulse discovery.
          </span>
        </div>

        {/* IG Reels Output Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-800/70 border border-slate-700 relative overflow-hidden">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
            <span className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse"></span>
              Instagram Reels Sponsored
            </span>
            <span className="font-mono text-xs text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-800/50">
              Avg CPV: ${(current.igCpv).toFixed(3)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Total Views</span>
              <span id="igViews" className="text-xl font-bold font-mono text-pink-300">
                {igViews.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Est. Clicks</span>
              <span className="text-xl font-bold font-mono text-white">
                {igClicks.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 block">CPC ~${igCpc}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-700/60 text-sm">
            <span className="text-slate-300">Gross Revenue (ROAS):</span>
            <span className="font-mono font-bold text-pink-400">
              ${igRevenue.toLocaleString()} ({igRoas}x)
            </span>
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            Higher click intent and checkout conversion; premium audience purchasing power.
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <strong>Media Buyer Rule of Thumb:</strong> TikTok generates approximately <strong>{(current.igCpv / current.ttCpv).toFixed(1)}x more raw video views</strong> for identical ad spend. However, Instagram Reels compensates with <strong>{(current.igCtr / current.ttCtr).toFixed(1)}x higher click-through intent</strong> and stronger immediate checkout velocity for high-AOV offers (&gt;$50).
      </div>
    </div>
  );
}
