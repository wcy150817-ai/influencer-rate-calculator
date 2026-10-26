"use client";

import React, { useState } from "react";

export default function WhitelistingCacClient() {
  const [creatorBaseFee, setCreatorBaseFee] = useState<number>(2500);
  const [numCreators, setNumCreators] = useState<number>(3);
  const [whitelistingPct, setWhitelistingPct] = useState<number>(25);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(30000);
  const [agencyPctOfSpend, setAgencyPctOfSpend] = useState<number>(15);
  const [agencyMinFlat, setAgencyMinFlat] = useState<number>(3500);
  const [inHouseMonthlyCost, setInHouseMonthlyCost] = useState<number>(6500);
  const [cpm, setCpm] = useState<number>(18.5);
  const [ctrPct, setCtrPct] = useState<number>(1.85);
  const [cvrPct, setCvrPct] = useState<number>(3.4);
  const [aov, setAov] = useState<number>(85);
  const [calcRun, setCalcRun] = useState<number>(1);

  const safeBase = Math.max(0, creatorBaseFee);
  const safeCreators = Math.max(1, numCreators);
  const safeWlPct = Math.max(0, whitelistingPct) / 100;
  const safeSpend = Math.max(500, monthlyAdSpend);
  const safeAgencyPct = Math.max(1, agencyPctOfSpend) / 100;
  const safeAgencyMin = Math.max(0, agencyMinFlat);
  const safeInHouse = Math.max(0, inHouseMonthlyCost);
  const safeCpm = Math.max(1, cpm);
  const safeCtr = Math.max(0.1, ctrPct) / 100;
  const safeCvr = Math.max(0.1, cvrPct) / 100;
  const safeAov = Math.max(5, aov);

  // Creator & Licensing costs
  const totalBaseFees = safeBase * safeCreators;
  const totalWhitelistingFees = totalBaseFees * safeWlPct;
  const totalCreatorOutlay = totalBaseFees + totalWhitelistingFees;

  // Agency vs In-House fees
  const agencyFee = Math.max(safeAgencyMin, safeSpend * safeAgencyPct);
  const breakevenSpendForInHouse = safeInHouse / safeAgencyPct;

  // Media Funnel
  const impressions = (safeSpend / safeCpm) * 1000;
  const clicks = impressions * safeCtr;
  const effectiveCpc = clicks > 0 ? safeSpend / clicks : 0;
  const orders = clicks * safeCvr;
  const grossRevenue = orders * safeAov;

  // CAC & ROAS comparisons
  const paidOnlyCac = orders > 0 ? safeSpend / orders : 0;
  const paidOnlyRoas = safeSpend > 0 ? grossRevenue / safeSpend : 0;

  const totalLoadedAgencySpend = safeSpend + totalCreatorOutlay + agencyFee;
  const loadedAgencyCac = orders > 0 ? totalLoadedAgencySpend / orders : 0;
  const loadedAgencyRoas = totalLoadedAgencySpend > 0 ? grossRevenue / totalLoadedAgencySpend : 0;

  const totalLoadedInHouseSpend = safeSpend + totalCreatorOutlay + safeInHouse;
  const loadedInHouseCac = orders > 0 ? totalLoadedInHouseSpend / orders : 0;
  const loadedInHouseRoas = totalLoadedInHouseSpend > 0 ? grossRevenue / totalLoadedInHouseSpend : 0;

  const hiddenFeeTaxPct =
    paidOnlyCac > 0 ? ((loadedAgencyCac - paidOnlyCac) / paidOnlyCac) * 100 : 0;

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-7 shadow-sm my-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
          Interactive Paid Partnership &amp; Whitelisting Unit Economics Simulator
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
          Adjustable Illustrative Scenario Inputs
        </span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">
        Calculate True All-In Loaded CAC, Whitelisting Licensing Overhead &amp; Agency vs In-House Breakeven
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="creatorBaseInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Creator Base Deliverable Fee ($ / Creator)
          </label>
          <input
            id="creatorBaseInput"
            type="number"
            min={100}
            max={100000}
            step={100}
            value={creatorBaseFee}
            onChange={(e) => setCreatorBaseFee(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="numCreatorsInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Active Whitelisted Creators / Mo
          </label>
          <input
            id="numCreatorsInput"
            type="number"
            min={1}
            max={50}
            step={1}
            value={numCreators}
            onChange={(e) => setNumCreators(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="wlPctInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            30-Day Whitelisting Licensing Fee (% of Base)
          </label>
          <input
            id="wlPctInput"
            type="number"
            min={0}
            max={100}
            step={5}
            value={whitelistingPct}
            onChange={(e) => setWhitelistingPct(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <label htmlFor="adSpendInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Monthly Paid Ad Spend ($)
          </label>
          <input
            id="adSpendInput"
            type="number"
            min={1000}
            max={1000000}
            step={1000}
            value={monthlyAdSpend}
            onChange={(e) => setMonthlyAdSpend(Number(e.target.value) || 1000)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="agencyPctInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Agency Retainer (% of Spend)
          </label>
          <input
            id="agencyPctInput"
            type="number"
            min={5}
            max={35}
            step={1}
            value={agencyPctOfSpend}
            onChange={(e) => setAgencyPctOfSpend(Number(e.target.value) || 10)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="agencyMinInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Agency Monthly Minimum ($)
          </label>
          <input
            id="agencyMinInput"
            type="number"
            min={0}
            max={25000}
            step={250}
            value={agencyMinFlat}
            onChange={(e) => setAgencyMinFlat(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="inHouseInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            In-House Coordinator Cost ($/Mo)
          </label>
          <input
            id="inHouseInput"
            type="number"
            min={1000}
            max={30000}
            step={250}
            value={inHouseMonthlyCost}
            onChange={(e) => setInHouseMonthlyCost(Number(e.target.value) || 4000)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div>
          <label htmlFor="cpmInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Paid Media CPM ($)
          </label>
          <input
            id="cpmInput"
            type="number"
            min={2}
            max={80}
            step={0.5}
            value={cpm}
            onChange={(e) => setCpm(Number(e.target.value) || 15)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="ctrInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Outbound Link CTR (%)
          </label>
          <input
            id="ctrInput"
            type="number"
            min={0.2}
            max={10}
            step={0.05}
            value={ctrPct}
            onChange={(e) => setCtrPct(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="cvrInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Landing Page CVR (%)
          </label>
          <input
            id="cvrInput"
            type="number"
            min={0.2}
            max={15}
            step={0.1}
            value={cvrPct}
            onChange={(e) => setCvrPct(Number(e.target.value) || 2)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="aovInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Average Order Value ($ AOV)
          </label>
          <input
            id="aovInput"
            type="number"
            min={10}
            max={2000}
            step={5}
            value={aov}
            onChange={(e) => setAov(Number(e.target.value) || 50)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCalcRun((r) => r + 1)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer mb-5"
      >
        Recalculate All-In Whitelisting CAC &amp; Agency Breakeven Threshold
      </button>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Monthly Creator Base + Whitelisting Licensing Overhead:
          </span>
          <strong className="text-xl sm:text-2xl font-extrabold text-slate-900">
            ${totalCreatorOutlay.toLocaleString("en-US")} (${totalBaseFees.toLocaleString("en-US")} Base + $
            {totalWhitelistingFees.toLocaleString("en-US")} Licensing &bull; Run #{calcRun})
          </strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-slate-600 uppercase">
              1. Ad Manager Reported (Media Only)
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              CAC: ${paidOnlyCac.toFixed(2)} | ROAS: {paidOnlyRoas.toFixed(2)}x
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Spend: ${safeSpend.toLocaleString("en-US")} &rarr; {Math.round(orders).toLocaleString("en-US")} orders
              (${effectiveCpc.toFixed(2)} eCPC)
            </div>
          </div>

          <div className="bg-white border border-rose-300 rounded-lg p-3.5">
            <div className="text-xs font-bold text-rose-800 uppercase">
              2. All-In Loaded (With Agency Retainer)
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              CAC: ${loadedAgencyCac.toFixed(2)} | ROAS: {loadedAgencyRoas.toFixed(2)}x
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Loaded Spend: ${totalLoadedAgencySpend.toLocaleString("en-US")} (+${agencyFee.toLocaleString("en-US")} agency fee)
            </div>
          </div>

          <div className="bg-white border border-emerald-300 rounded-lg p-3.5">
            <div className="text-xs font-bold text-emerald-800 uppercase">
              3. All-In Loaded (In-House Outreach)
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              CAC: ${loadedInHouseCac.toFixed(2)} | ROAS: {loadedInHouseRoas.toFixed(2)}x
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Loaded Spend: ${totalLoadedInHouseSpend.toLocaleString("en-US")} (+${safeInHouse.toLocaleString("en-US")} in-house)
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
          <strong>Unit Economics Verdict:</strong> Counting only Ad Manager spend understates your true
          customer acquisition cost by <strong>+{hiddenFeeTaxPct.toFixed(1)}%</strong> (${paidOnlyCac.toFixed(2)}{" "}
          reported vs. ${loadedAgencyCac.toFixed(2)} loaded agency CAC). At a{" "}
          <strong>{(safeAgencyPct * 100).toFixed(0)}% agency fee</strong> vs.{" "}
          <strong>${safeInHouse.toLocaleString("en-US")}/mo in-house coordinator</strong>, bringing
          whitelisting outreach in-house becomes cheaper once monthly paid partnership spend exceeds{" "}
          <strong>${Math.round(breakevenSpendForInHouse).toLocaleString("en-US")}/month</strong>.
        </div>
      </div>
    </div>
  );
}
