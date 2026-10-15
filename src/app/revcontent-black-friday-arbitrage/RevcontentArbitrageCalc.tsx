'use client';

import React, { useState, useMemo } from 'react';

export default function RevcontentArbitrageCalc() {
  const [cpcBid, setCpcBid] = useState<number>(0.22);
  const [creativeCtr, setCreativeCtr] = useState<number>(0.85);
  const [landerCtr, setLanderCtr] = useState<number>(34);
  const [monetizationEpc, setMonetizationEpc] = useState<number>(0.82);

  const stats = useMemo(() => {
    const cpc = Math.max(0.01, Number(cpcBid) || 0.01);
    const ctr = Math.max(0.05, Number(creativeCtr) || 0.05);
    const lpCtr = Math.max(1, Math.min(100, Number(landerCtr) || 1));
    const epc = Math.max(0.01, Number(monetizationEpc) || 0.01);

    /* 
      Revcontent publisher auction metric:
      eCPM = CPC * CTR% * 1000
    */
    const ecpm = cpc * (ctr / 100) * 1000;

    /* 
      Arbitrage Economics:
      For every 1,000 native clicks acquired:
      Cost = 1000 * CPC
      Pre-lander clicks passed to advertiser = 1000 * (lpCtr / 100)
      Revenue = passed clicks * monetizationEpc = 1000 * (lpCtr / 100) * epc
      Effective Revenue Per Native Click (RPNC) = (lpCtr / 100) * epc
      Net Profit Per Click = RPNC - CPC
      ROI % = ((RPNC - CPC) / CPC) * 100
    */
    const revenuePerNativeClick = (lpCtr / 100) * epc;
    const netProfitPerClick = revenuePerNativeClick - cpc;
    const roiPercentage = Math.round((netProfitPerClick / cpc) * 100);

    /* 
      Break-Even Analysis:
      Break-even CPC = (lpCtr / 100) * epc
      Break-even CTR at current CPM floor = (cpc / (epc * (lpCtr / 100))) * base...
    */
    const breakEvenCpc = Number(revenuePerNativeClick.toFixed(3));
    const breakEvenCtr = Number(((cpc / Math.max(0.01, revenuePerNativeClick)) * (ctr * 0.7)).toFixed(2));

    /* 50,000 daily native impressions scenario */
    const dailyImpressions = 50000;
    const dailyClicks = Math.round(dailyImpressions * (ctr / 100));
    const dailyAdSpend = Math.round(dailyClicks * cpc);
    const dailyRevenue = Math.round(dailyClicks * revenuePerNativeClick);
    const dailyNetProfit = dailyRevenue - dailyAdSpend;

    let auctionTier = 'Competitive Tier 1 Winner';
    let auctionColor = 'text-emerald-400';
    if (ecpm < 1.0) {
      auctionTier = 'Deprioritized / Low Win-Rate (<$1.00 eCPM)';
      auctionColor = 'text-rose-400';
    } else if (ecpm < 1.8) {
      auctionTier = 'Mid-Tier Placements ($1.00 - $1.80 eCPM)';
      auctionColor = 'text-amber-400';
    } else if (ecpm <= 3.5) {
      auctionTier = 'Prime Top-of-Widget Delivery ($1.80 - $3.50 eCPM)';
      auctionColor = 'text-emerald-400';
    } else {
      auctionTier = 'Dominant BFCM Premium Publisher Lock (> $3.50 eCPM)';
      auctionColor = 'text-emerald-300';
    }

    return {
      cpc,
      ctr,
      lpCtr,
      epc,
      ecpm: Number(ecpm.toFixed(2)),
      revenuePerNativeClick: Number(revenuePerNativeClick.toFixed(3)),
      roiPercentage,
      breakEvenCpc,
      breakEvenCtr: Math.max(0.2, breakEvenCtr),
      dailyClicks,
      dailyAdSpend,
      dailyRevenue,
      dailyNetProfit,
      auctionTier,
      auctionColor,
    };
  }, [cpcBid, creativeCtr, landerCtr, monetizationEpc]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 my-10 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Revcontent Black Friday Native Arbitrage &amp; EPC Calculator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Simulate widget eCPM auction priority, pre-lander pass-through efficiency, and Q4 Black Friday holiday ROI.
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full self-start sm:self-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            2026 Q4 Algorithm Model
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders & Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="inputCpc" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Native Ad Bid CPC ($ USD)
              </label>
              <span className="text-sm font-black text-emerald-400" id="val-cpc">
                ${stats.cpc.toFixed(2)} / click
              </span>
            </div>
            <input
              id="inputCpc"
              type="range"
              min="0.05"
              max="0.80"
              step="0.01"
              value={cpcBid}
              onChange={(e) => setCpcBid(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>$0.05 (Off-Peak)</span>
              <span>$0.25 (BFCM Tier-1)</span>
              <span>$0.80 (Aggressive)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="inputCtr" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Native Ad Creative CTR (%)
              </label>
              <span className="text-sm font-black text-emerald-400" id="val-ctr">
                {stats.ctr.toFixed(2)}%
              </span>
            </div>
            <input
              id="inputCtr"
              type="range"
              min="0.20"
              max="2.20"
              step="0.05"
              value={creativeCtr}
              onChange={(e) => setCreativeCtr(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0.20% (Throttle Risk)</span>
              <span>0.85% (Profitable Target)</span>
              <span>2.20% (Super-Winner)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="inputLpCtr" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Pre-Lander Click-Through Rate (%)
              </label>
              <span className="text-sm font-black text-emerald-400" id="val-lp-ctr">
                {stats.lpCtr}% pass-through
              </span>
            </div>
            <input
              id="inputLpCtr"
              type="range"
              min="15"
              max="65"
              step="1"
              value={landerCtr}
              onChange={(e) => setLanderCtr(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>15% (Weak Story)</span>
              <span>35% (Vetted Quiz/Advertorial)</span>
              <span>65% (Direct Intent)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="inputEpc" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Offer EPC (Earnings Per Offer Click)
              </label>
              <span className="text-sm font-black text-emerald-400" id="val-epc">
                ${stats.epc.toFixed(2)} / affiliate click
              </span>
            </div>
            <input
              id="inputEpc"
              type="range"
              min="0.20"
              max="2.00"
              step="0.02"
              value={monetizationEpc}
              onChange={(e) => setMonetizationEpc(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>$0.20 (AdSense / Feeds)</span>
              <span>$0.80 (Direct E-com / CPA)</span>
              <span>$2.00 (High-Ticket Finance)</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-xl border border-emerald-500/30">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Projected Net Arbitrage ROI
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl sm:text-4xl font-black ${stats.roiPercentage >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                id="dispNetProfit"
              >
                {stats.roiPercentage >= 0 ? `+${stats.roiPercentage}%` : `${stats.roiPercentage}%`}
              </span>
              <span className="text-slate-400 text-sm font-semibold">Net ROI</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Revenue Per Native Click: <strong className="text-slate-200">${stats.revenuePerNativeClick.toFixed(2)}</strong> vs Cost:{' '}
              <strong className="text-slate-200">${stats.cpc.toFixed(2)}</strong>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Revcontent eCPM:</span>
                <strong className="text-slate-100 text-sm" id="dispEcpm">
                  ${stats.ecpm.toFixed(2)} eCPM
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block">Max Break-Even CPC:</span>
                <strong className="text-emerald-400 text-sm" id="dispBreakEvenCtr">
                  ${stats.breakEvenCpc.toFixed(2)}
                </strong>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs">
              <span className="text-slate-400 block">Publisher Widget Priority Status:</span>
              <strong className={`text-xs font-bold ${stats.auctionColor}`}>
                {stats.auctionTier}
              </strong>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Daily Scale Projection (50,000 Impressions)
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Daily Ad Spend</span>
                <strong className="text-slate-200 text-sm">${stats.dailyAdSpend.toLocaleString()}</strong>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Gross Revenue</span>
                <strong className="text-slate-200 text-sm">${stats.dailyRevenue.toLocaleString()}</strong>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Net Profit</span>
                <strong
                  className={`text-sm ${stats.dailyNetProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                  id="dispDailyNet"
                >
                  ${stats.dailyNetProfit.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
