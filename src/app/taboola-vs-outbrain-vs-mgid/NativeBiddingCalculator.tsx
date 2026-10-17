'use client';

import React, { useState } from 'react';

export default function NativeBiddingCalculator() {
  const [targetCpa, setTargetCpa] = useState<number>(45);
  const [prelanderCtr, setPrelanderCtr] = useState<number>(22);
  const [offerCvr, setOfferCvr] = useState<number>(4.5);
  const [adCtr, setAdCtr] = useState<number>(0.45);
  const [weeklyConvGoal, setWeeklyConvGoal] = useState<number>(35);

  const safeCpa = Math.max(1, targetCpa || 1);
  const safePreCtr = Math.max(0.5, prelanderCtr || 0.5) / 100;
  const safeOffCvr = Math.max(0.1, offerCvr || 0.1) / 100;
  const safeAdCtr = Math.max(0.05, adCtr || 0.05) / 100;
  const safeWeeklyConv = Math.max(5, weeklyConvGoal || 5);

  const netFunnelCvr = safePreCtr * safeOffCvr;
  const breakEvenCpc = safeCpa * netFunnelCvr;
  const auctionEcpm = breakEvenCpc * safeAdCtr * 1000;
  const learningWeekBudget = Math.round(safeWeeklyConv * safeCpa);
  const dailyMinBudget = Math.round(learningWeekBudget / 7);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 overflow-x-hidden box-border">
      <div className="mb-6 pb-5 border-b border-slate-800">
        <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 font-semibold text-xs tracking-wider uppercase rounded-full mb-2">
          Interactive Native Media Buying Formula Tool (Illustrative)
        </span>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          Taboola vs. Outbrain vs. MGID Break-Even CPC, eCPM &amp; Learning Budget Calculator
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Because native ad auctions rank ads by effective CPM (CPC Bid &times; CTR &times; 1,000), enter your funnel metrics below to compute your exact break-even CPC ceiling and 7-day algorithm learning budget.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
          <label htmlFor="inputTargetCpa" className="block text-xs font-bold uppercase text-slate-300 mb-2">
            1. Target CPA ($ USD)
          </label>
          <input
            id="inputTargetCpa"
            type="number"
            min={1}
            max={2000}
            step={1}
            value={targetCpa}
            onChange={(e) => setTargetCpa(parseFloat(e.target.value || '1'))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-base"
          />
        </div>

        <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
          <label htmlFor="inputPrelanderCtr" className="block text-xs font-bold uppercase text-slate-300 mb-2">
            2. Pre-Lander CTR (%)
          </label>
          <input
            id="inputPrelanderCtr"
            type="number"
            min={1}
            max={100}
            step={1}
            value={prelanderCtr}
            onChange={(e) => setPrelanderCtr(parseFloat(e.target.value || '1'))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-base"
          />
        </div>

        <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
          <label htmlFor="inputOfferCvr" className="block text-xs font-bold uppercase text-slate-300 mb-2">
            3. Offer Page CVR (%)
          </label>
          <input
            id="inputOfferCvr"
            type="number"
            min={0.1}
            max={50}
            step={0.5}
            value={offerCvr}
            onChange={(e) => setOfferCvr(parseFloat(e.target.value || '0.5'))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-base"
          />
        </div>

        <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
          <label htmlFor="inputAdCtr" className="block text-xs font-bold uppercase text-slate-300 mb-2">
            4. Widget Ad CTR (%)
          </label>
          <input
            id="inputAdCtr"
            type="number"
            min={0.05}
            max={5}
            step={0.05}
            value={adCtr}
            onChange={(e) => setAdCtr(parseFloat(e.target.value || '0.1'))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-base"
          />
        </div>

        <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
          <label htmlFor="inputWeeklyConv" className="block text-xs font-bold uppercase text-slate-300 mb-2">
            5. Weekly Conv. Target
          </label>
          <input
            id="inputWeeklyConv"
            type="number"
            min={5}
            max={500}
            step={5}
            value={weeklyConvGoal}
            onChange={(e) => setWeeklyConvGoal(parseInt(e.target.value || '10', 10))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-base"
          />
        </div>
      </div>

      <button
        id="btnCalcNativeBid"
        type="button"
        onClick={() => setTargetCpa((c) => Math.max(1, c))}
        className="w-full py-3 px-4 mb-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition cursor-pointer"
      >
        Compute Break-Even CPC, Auction eCPM &amp; 7-Day Learning Budget
      </button>

      <div id="nativeBidResult" className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <span className="text-xs uppercase font-bold text-slate-400 block">Break-Even Max CPC</span>
            <span className="text-2xl font-extrabold text-amber-400 font-mono block mt-1">
              ${breakEvenCpc.toFixed(2)}
            </span>
            <span className="text-xs text-slate-300 mt-1 block">
              Net Funnel CVR: {(netFunnelCvr * 100).toFixed(2)}%
            </span>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-indigo-500/40">
            <span className="text-xs uppercase font-bold text-indigo-300 block">Implied Auction eCPM</span>
            <span className="text-2xl font-extrabold text-indigo-300 font-mono block mt-1">
              ${auctionEcpm.toFixed(2)}
            </span>
            <span className="text-xs text-slate-300 mt-1 block">
              At {adCtr.toFixed(2)}% Widget CTR
            </span>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <span className="text-xs uppercase font-bold text-slate-400 block">7-Day Learning Budget</span>
            <span className="text-2xl font-extrabold text-white font-mono block mt-1">
              ${learningWeekBudget.toLocaleString('en-US')}
            </span>
            <span className="text-xs text-slate-300 mt-1 block">
              For {safeWeeklyConv} Conversions / Week
            </span>
          </div>

          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40">
            <span className="text-xs uppercase font-bold text-emerald-300 block">Suggested Daily Pacing</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono block mt-1">
              ${dailyMinBudget.toLocaleString('en-US')}/day
            </span>
            <span className="text-xs text-emerald-200 mt-1 block">
              Hold 48h+ Before Edits
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <strong>Bidding Setup Formula (Illustrative):</strong> With a ${safeCpa} Target CPA and {(netFunnelCvr * 100).toFixed(2)}% end-to-end click-to-sale conversion rate, your maximum break-even bid is <strong>${breakEvenCpc.toFixed(2)} CPC</strong> (generating a <strong>${auctionEcpm.toFixed(2)} eCPM</strong> at {adCtr.toFixed(2)}% CTR). Launch on <strong>Taboola Realize</strong> using <em>Enhanced CPC (SmartBid)</em>, on <strong>Outbrain Amplify</strong> using <em>Conversion Bid Strategy (Target CPA)</em> with a 48-hour minimum no-touch window, or on <strong>MGID</strong> using <em>Selective Widget Multipliers</em> with a <strong>${dailyMinBudget}/day</strong> test cap.
        </div>
      </div>
    </div>
  );
}
