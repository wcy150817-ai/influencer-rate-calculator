'use client';

import React, { useState } from 'react';

export default function TikTokShopRoasCalculator() {
  const [aov, setAov] = useState<number>(42);
  const [cogs, setCogs] = useState<number>(11);
  const [shipping, setShipping] = useState<number>(4.5);
  const [organicAffPct, setOrganicAffPct] = useState<number>(15);
  const [shopAdsCommPct, setShopAdsCommPct] = useState<number>(6);
  const [adSpend, setAdSpend] = useState<number>(3000);
  const [actualRoas, setActualRoas] = useState<number>(2.8);
  const [calcRun, setCalcRun] = useState<number>(0);

  const safeAov = aov > 1 ? aov : 1;
  const referralFeePct = 6.0;
  const returnAllowancePct = 3.0;

  const referralFeeDollars = safeAov * (referralFeePct / 100);
  const returnDollars = safeAov * (returnAllowancePct / 100);
  const organicAffDollars = safeAov * (organicAffPct / 100);
  const shopAdsAffDollars = safeAov * (shopAdsCommPct / 100);

  const organicNetPerOrder =
    safeAov - cogs - shipping - referralFeeDollars - returnDollars - organicAffDollars;
  const organicMarginPct = (organicNetPerOrder / safeAov) * 100;

  const preAdPaidUnitMargin =
    safeAov - cogs - shipping - referralFeeDollars - returnDollars - shopAdsAffDollars;
  const preAdPaidMarginRatio = preAdPaidUnitMargin / safeAov;

  const breakEvenRoas = preAdPaidMarginRatio > 0.01 ? 1 / preAdPaidMarginRatio : 99.9;
  const maxAllowableCpa = preAdPaidUnitMargin > 0 ? preAdPaidUnitMargin : 0;

  const doubleDipUnitMargin = organicNetPerOrder;
  const doubleDipRatio = doubleDipUnitMargin / safeAov;
  const doubleDipBreakEvenRoas = doubleDipRatio > 0.01 ? 1 / doubleDipRatio : 99.9;

  const sparkGmv = adSpend * actualRoas;
  const sparkOrders = sparkGmv / safeAov;
  const sparkNetProfit = sparkOrders * preAdPaidUnitMargin - adSpend;

  return (
    <div className="my-8 rounded-2xl border-2 border-indigo-600 bg-white p-5 sm:p-7 shadow-md max-w-full overflow-hidden">
      <div className="border-b border-slate-200 pb-4 mb-5">
        <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-800 mb-1">
          Interactive TikTok Shop Unit Economics &amp; Spark Ads Simulator
        </span>
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
          TikTok Shop Affiliate Commission vs Spark Ads Break-Even ROAS Calculator
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        <div>
          <label htmlFor="aovInput" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
            1. Average Order Value (AOV $ USD)
          </label>
          <input
            id="aovInput"
            type="number"
            min={5}
            max={1000}
            step={1}
            value={aov}
            onChange={(e) => setAov(parseFloat(e.target.value) || 42)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="cogsInput" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
            2. Landed COGS per Unit ($ USD)
          </label>
          <input
            id="cogsInput"
            type="number"
            min={0.5}
            max={500}
            step={0.5}
            value={cogs}
            onChange={(e) => setCogs(parseFloat(e.target.value) || 11)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="shippingInput" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
            3. FBT / Pick-Pack Shipping ($ USD)
          </label>
          <input
            id="shippingInput"
            type="number"
            min={0}
            max={100}
            step={0.5}
            value={shipping}
            onChange={(e) => setShipping(parseFloat(e.target.value) || 4.5)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="organicAffPctInput" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
            4. Open / Target Affiliate Commission (%)
          </label>
          <input
            id="organicAffPctInput"
            type="number"
            min={1}
            max={50}
            step={1}
            value={organicAffPct}
            onChange={(e) => setOrganicAffPct(parseFloat(e.target.value) || 15)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="shopAdsCommPctInput" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
            5. Shop Ads Paid Commission Override (%)
          </label>
          <input
            id="shopAdsCommPctInput"
            type="number"
            min={0}
            max={40}
            step={1}
            value={shopAdsCommPct}
            onChange={(e) => setShopAdsCommPct(parseFloat(e.target.value) || 6)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="adSpendInput" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
            6. Monthly Spark Ads Spend ($ USD)
          </label>
          <input
            id="adSpendInput"
            type="number"
            min={100}
            max={500000}
            step={100}
            value={adSpend}
            onChange={(e) => setAdSpend(parseFloat(e.target.value) || 3000)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="actualRoasInput" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
          7. Expected or Actual Spark Ads Campaign ROAS (e.g. 2.8x)
        </label>
        <input
          id="actualRoasInput"
          type="number"
          min={0.5}
          max={15}
          step={0.1}
          value={actualRoas}
          onChange={(e) => setActualRoas(parseFloat(e.target.value) || 2.8)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
        />
      </div>

      <button
        id="calcTikTokBtn"
        type="button"
        onClick={() => setCalcRun((p) => p + 1)}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow hover:bg-indigo-700 transition mb-5 cursor-pointer"
      >
        Calculate Break-Even Spark Ads ROAS &amp; Net Contribution Margin
      </button>

      <div
        id="tiktokCalcResult"
        data-calc-run={calcRun}
        className="rounded-xl bg-slate-50 border border-indigo-200 p-4 sm:p-5"
      >
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">
          Unit Economics &amp; Break-Even Thresholds (Incl. 6% TikTok Referral + 3% Return Reserve)
        </div>
        <div className="text-base sm:text-lg font-extrabold text-slate-900 mb-3">
          Break-Even Spark Ads ROAS: {breakEvenRoas.toFixed(2)}x (vs {doubleDipBreakEvenRoas.toFixed(2)}x Without Shop Ads Override)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm border-t border-slate-200 pt-4">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-slate-500 font-semibold">Organic Affiliate Net / Order</div>
            <div className="text-base font-extrabold text-slate-900 mt-1">
              ${organicNetPerOrder.toFixed(2)} ({organicMarginPct.toFixed(1)}%)
            </div>
            <div className="text-[11px] text-slate-500">At {organicAffPct}% Open/Target CPS</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-emerald-300">
            <div className="text-emerald-800 font-semibold">Break-Even Spark ROAS</div>
            <div className="text-base font-extrabold text-emerald-700 mt-1">{breakEvenRoas.toFixed(2)}x</div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              Max Allowable CPA: ${maxAllowableCpa.toFixed(2)}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-amber-300">
            <div className="text-amber-800 font-semibold">Double-Dip Trap ROAS</div>
            <div className="text-base font-extrabold text-amber-800 mt-1">{doubleDipBreakEvenRoas.toFixed(2)}x</div>
            <div className="text-[11px] text-slate-600">If paying full {organicAffPct}% on Spark Ads</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-slate-700 font-semibold">Monthly Spark Ads Net Profit</div>
            <div className={`text-base font-extrabold mt-1 ${sparkNetProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              ${Math.round(sparkNetProfit).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500">
              On ${sparkGmv.toLocaleString()} GMV ({Math.round(sparkOrders)} orders)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
