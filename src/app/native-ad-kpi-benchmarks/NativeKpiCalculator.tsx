'use client';

import React, { useState } from 'react';

export default function NativeKpiCalculator() {
  const [platformMode, setPlatformMode] = useState<'outbrain' | 'taboola' | 'mgid'>('outbrain');
  const [targetCpa, setTargetCpa] = useState<number>(65);
  const [bidCpc, setBidCpc] = useState<number>(0.42);
  const [widgetCtr, setWidgetCtr] = useState<number>(0.28);
  const [lpCtr, setLpCtr] = useState<number>(24);
  const [offerCvr, setOfferCvr] = useState<number>(3.2);
  const [viewability, setViewability] = useState<number>(65);

  const safeTargetCpa = Math.max(1, targetCpa || 1);
  const safeBidCpc = Math.max(0.01, bidCpc || 0.01);
  const safeWidgetCtr = Math.max(0.01, widgetCtr || 0.01);
  const safeLpCtr = Math.max(1, Math.min(100, lpCtr || 1));
  const safeOfferCvr = Math.max(0.05, offerCvr || 0.05);
  const safeViewability = Math.max(10, Math.min(100, viewability || 65));

  const netFunnelCvr = (safeLpCtr / 100) * (safeOfferCvr / 100);
  const maxBreakEvenCpc = safeTargetCpa * netFunnelCvr;
  const projectedCpa = safeBidCpc / netFunnelCvr;
  const cpaDelta = safeTargetCpa - projectedCpa;
  const servedEcpm = safeBidCpc * (safeWidgetCtr / 100) * 1000;
  const viewableVcpm = servedEcpm / (safeViewability / 100);
  const minCtrForDollarFiftyEcpm = (1.5 / (safeBidCpc * 1000)) * 100;
  const recommendedDailyLearningBudget = Math.round((safeTargetCpa * 30) / 7);

  const modeGuidance =
    platformMode === 'outbrain'
      ? 'Outbrain Amplify CBS (Target CPA / Target ROAS): Documented learning phase lasts up to 7 days; wait at least 48 hours before manual bid overrides.'
      : platformMode === 'taboola'
      ? 'Taboola Realize SmartBid (Maximize Conversions / Enhanced CPC): Requires Pixel or S2S postback data to modulate baseline CPC bids per impression.'
      : 'MGID Selective Widget Bidding: Apply sub-ID bid coefficients after a publisher widget accumulates enough clicks to evaluate EPC vs break-even CPC.';

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <span className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            Interactive Auction &amp; Funnel Solver
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Outbrain &amp; Taboola Break-Even CPC, vCPM &amp; CTR Calculator
          </h3>
        </div>
        <div className="text-xs text-slate-400">
          Deterministic Formula Engine (Illustrative Inputs)
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div>
          <label htmlFor="kpiPlatformMode" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Native Platform &amp; Bid Mode
          </label>
          <select
            id="kpiPlatformMode"
            value={platformMode}
            onChange={(e) => setPlatformMode(e.target.value as 'outbrain' | 'taboola' | 'mgid')}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="outbrain">Outbrain Amplify (CBS Target CPA)</option>
            <option value="taboola">Taboola Realize (SmartBid / eCPC)</option>
            <option value="mgid">MGID (Widget Selective Bidding)</option>
          </select>
        </div>

        <div>
          <label htmlFor="kpiTargetCpa" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Target CPA / Payout ($ USD)
          </label>
          <input
            id="kpiTargetCpa"
            type="number"
            min={5}
            max={2000}
            step={5}
            value={targetCpa}
            onChange={(e) => setTargetCpa(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="kpiBidCpc" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Planned / Actual CPC Bid ($ USD)
          </label>
          <input
            id="kpiBidCpc"
            type="number"
            min={0.05}
            max={15}
            step={0.05}
            value={bidCpc}
            onChange={(e) => setBidCpc(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="kpiWidgetCtr" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Native Widget Ad CTR (%)
          </label>
          <input
            id="kpiWidgetCtr"
            type="number"
            min={0.05}
            max={5}
            step={0.05}
            value={widgetCtr}
            onChange={(e) => setWidgetCtr(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="kpiLpCtr" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Pre-Lander Click-Through Rate (%)
          </label>
          <input
            id="kpiLpCtr"
            type="number"
            min={1}
            max={100}
            step={1}
            value={lpCtr}
            onChange={(e) => setLpCtr(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="kpiOfferCvr" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Offer Checkout CVR (%)
          </label>
          <input
            id="kpiOfferCvr"
            type="number"
            min={0.1}
            max={50}
            step={0.1}
            value={offerCvr}
            onChange={(e) => setOfferCvr(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="kpiViewability" className="text-xs font-semibold text-slate-300 whitespace-nowrap">
            MRC Widget Viewability (%):
          </label>
          <input
            id="kpiViewability"
            type="number"
            min={20}
            max={100}
            step={5}
            value={viewability}
            onChange={(e) => setViewability(parseFloat(e.target.value) || 65)}
            className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
          />
        </div>
        <button
          id="kpiCalcBtn"
          type="button"
          onClick={() => setTargetCpa((v) => v)}
          style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
          className="px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition hover:opacity-95"
        >
          Recalculate Native KPI Matrix &rarr;
        </button>
      </div>

      <div id="kpiResultBox" className="mt-6 bg-slate-800/90 border border-slate-700 rounded-xl p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-700 text-center">
          <div className="p-3 bg-indigo-950/50 border border-indigo-500/30 rounded-lg">
            <div className="text-[11px] font-semibold text-indigo-300 uppercase">Max Break-Even CPC</div>
            <div className="text-2xl font-black text-white mt-1">${maxBreakEvenCpc.toFixed(2)}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Net Funnel CVR: {(netFunnelCvr * 100).toFixed(2)}%</div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Projected CPA at ${safeBidCpc.toFixed(2)} CPC</div>
            <div className={`text-2xl font-black mt-1 ${cpaDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${projectedCpa.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {cpaDelta >= 0 ? `+$${cpaDelta.toFixed(2)} margin/conv` : `-$${Math.abs(cpaDelta).toFixed(2)} over target`}
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Served eCPM / Viewable vCPM</div>
            <div className="text-2xl font-black text-white mt-1">
              ${servedEcpm.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ ${viewableVcpm.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">At {safeViewability}% MRC Viewability</div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Min CTR for $1.50 eCPM Floor</div>
            <div className="text-2xl font-black text-amber-300 mt-1">{minCtrForDollarFiftyEcpm.toFixed(2)}%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">7d Learning Budget: ~${recommendedDailyLearningBudget}/day</div>
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-4 leading-relaxed">
          <strong className="text-white">Platform Pacing Note:</strong> {modeGuidance}
        </p>
      </div>
    </div>
  );
}
