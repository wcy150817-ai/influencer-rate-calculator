'use client';

import React, { useState } from 'react';

export default function PreLanderVslCalculator() {
  const [adClicks, setAdClicks] = useState<number>(10000);
  const [nativeCpc, setNativeCpc] = useState<number>(0.45);
  const [bounceDropoffPct, setBounceDropoffPct] = useState<number>(18);
  const [preLanderCtrPct, setPreLanderCtrPct] = useState<number>(24);
  const [vslOfferCvrPct, setVslOfferCvrPct] = useState<number>(3.2);
  const [offerPayout, setOfferPayout] = useState<number>(85);

  const safeClicks = Math.max(100, adClicks || 100);
  const safeCpc = Math.max(0.01, nativeCpc || 0.01);
  const safeBounce = Math.min(95, Math.max(0, bounceDropoffPct || 0));
  const safeLpCtr = Math.min(100, Math.max(0.1, preLanderCtrPct || 0.1));
  const safeOfferCvr = Math.min(100, Math.max(0.05, vslOfferCvrPct || 0.05));
  const safePayout = Math.max(1, offerPayout || 1);

  const totalSpend = safeClicks * safeCpc;
  const landedSessions = Math.round(safeClicks * (1 - safeBounce / 100));
  const outboundClicks = Math.round(landedSessions * (safeLpCtr / 100));
  const effectiveOutboundCpc = outboundClicks > 0 ? totalSpend / outboundClicks : 0;
  const conversions = outboundClicks * (safeOfferCvr / 100);
  const revenue = conversions * safePayout;
  const netProfit = revenue - totalSpend;
  const roasPct = totalSpend > 0 ? (revenue / totalSpend) * 100 : 0;
  const actualCpa = conversions > 0 ? totalSpend / conversions : 0;

  const endToEndCvrDec = (1 - safeBounce / 100) * (safeLpCtr / 100) * (safeOfferCvr / 100);
  const breakEvenNativeCpc = safePayout * endToEndCvrDec;

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl my-8">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
          Interactive 5-Stage Funnel Simulator (Illustrative Model)
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          Native Ad Pre-Landing Page &amp; VSL Drop-Off Calculator
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Enter your own campaign parameters below to model how pre-render bounce drop-off, advertorial/VSL click-through rate (LP CTR), and checkout CVR determine your effective outbound CPC and break-even native bid.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="inputAdClicks" className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
            1. Billed Native Ad Clicks
          </label>
          <input
            id="inputAdClicks"
            type="number"
            min={100}
            step={500}
            value={adClicks}
            onChange={(e) => setAdClicks(parseFloat(e.target.value) || 100)}
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="inputNativeCpc" className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
            2. Average Native CPC Bid ($)
          </label>
          <input
            id="inputNativeCpc"
            type="number"
            min={0.01}
            step={0.05}
            value={nativeCpc}
            onChange={(e) => setNativeCpc(parseFloat(e.target.value) || 0.05)}
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="inputBounceDropoff" className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
            3. Click-to-Render Drop-Off (%)
          </label>
          <input
            id="inputBounceDropoff"
            type="number"
            min={0}
            max={90}
            step={1}
            value={bounceDropoffPct}
            onChange={(e) => setBounceDropoffPct(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="inputPreLanderCtr" className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
            4. Pre-Lander / VSL Outbound CTR (%)
          </label>
          <input
            id="inputPreLanderCtr"
            type="number"
            min={0.5}
            max={100}
            step={0.5}
            value={preLanderCtrPct}
            onChange={(e) => setPreLanderCtrPct(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="inputOfferCvr" className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
            5. Offer Checkout CVR (%)
          </label>
          <input
            id="inputOfferCvr"
            type="number"
            min={0.1}
            max={100}
            step={0.1}
            value={vslOfferCvrPct}
            onChange={(e) => setVslOfferCvrPct(parseFloat(e.target.value) || 0.5)}
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="inputOfferPayout" className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
            6. Target CPA / Offer Payout ($)
          </label>
          <input
            id="inputOfferPayout"
            type="number"
            min={1}
            step={5}
            value={offerPayout}
            onChange={(e) => setOfferPayout(parseFloat(e.target.value) || 10)}
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      <button
        id="btnCalcPreLander"
        type="button"
        onClick={() => setAdClicks((prev) => Math.max(100, prev))}
        className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm transition shadow-lg mb-6 cursor-pointer"
      >
        Compute Funnel Waterfall &amp; Break-Even Native Bid
      </button>

      <div id="dispPreLanderResult" className="bg-slate-800/90 border border-slate-700 rounded-xl p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-5 border-b border-slate-700">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="text-[11px] font-bold uppercase text-slate-400">Landed Sessions</div>
            <div className="text-xl font-extrabold text-white mt-0.5">
              {landedSessions.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              After {safeBounce}% load drop-off
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="text-[11px] font-bold uppercase text-indigo-300">Outbound Offer Clicks</div>
            <div className="text-xl font-extrabold text-indigo-400 mt-0.5">
              {outboundClicks.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              eCPC Out: ${effectiveOutboundCpc.toFixed(2)}/click
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="text-[11px] font-bold uppercase text-emerald-300">Est. Conversions &amp; CPA</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
              {conversions.toFixed(1)} sales
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Actual CPA: ${actualCpa.toFixed(2)}
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="text-[11px] font-bold uppercase text-amber-300">Max Break-Even CPC</div>
            <div className="text-xl font-extrabold text-amber-400 mt-0.5">
              ${breakEvenNativeCpc.toFixed(3)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              ROAS: {roasPct.toFixed(1)}% (Net ${netProfit.toFixed(0)})
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-4 leading-relaxed">
          <strong>Funnel Diagnostic:</strong> Out of <strong>{safeClicks.toLocaleString()}</strong> billed native clicks (${totalSpend.toLocaleString()} spend), <strong>{(safeClicks - landedSessions).toLocaleString()}</strong> clicks are lost before render ({safeBounce}% drop-off). Your pre-lander converts <strong>{safeLpCtr}%</strong> of landed readers into <strong>{outboundClicks.toLocaleString()}</strong> checkout visits at an effective outbound cost of <strong>${effectiveOutboundCpc.toFixed(2)}</strong> per offer click.
        </p>
      </div>
    </div>
  );
}
