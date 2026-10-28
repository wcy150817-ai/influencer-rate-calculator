"use client";

import React, { useState } from "react";

type VerticalKey = "finance" | "ecommerce" | "health" | "b2b_saas" | "arbitrage";

interface ScenarioPreset {
  label: string;
  payoutOrCpa: number;
  widgetCtrPct: number;
  preLanderCtrPct: number;
  offerCvrPct: number;
  targetMarginPct: number;
  targetWeeklyConvs: number;
}

const SCENARIO_PRESETS: Record<VerticalKey, ScenarioPreset> = {
  finance: {
    label: "Finance & Fintech Lead Gen (Illustrative Scenario)",
    payoutOrCpa: 95,
    widgetCtrPct: 0.28,
    preLanderCtrPct: 26,
    offerCvrPct: 4.2,
    targetMarginPct: 25,
    targetWeeklyConvs: 35,
  },
  ecommerce: {
    label: "Direct-to-Consumer E-Commerce (Illustrative Scenario)",
    payoutOrCpa: 68,
    widgetCtrPct: 0.35,
    preLanderCtrPct: 32,
    offerCvrPct: 2.8,
    targetMarginPct: 20,
    targetWeeklyConvs: 50,
  },
  health: {
    label: "Nutraceuticals & Wellness VSL/Advertorial (Illustrative Scenario)",
    payoutOrCpa: 115,
    widgetCtrPct: 0.42,
    preLanderCtrPct: 28,
    offerCvrPct: 2.2,
    targetMarginPct: 30,
    targetWeeklyConvs: 40,
  },
  b2b_saas: {
    label: "B2B SaaS Gated Tool / MQL Funnel (Illustrative Scenario)",
    payoutOrCpa: 140,
    widgetCtrPct: 0.22,
    preLanderCtrPct: 24,
    offerCvrPct: 5.5,
    targetMarginPct: 25,
    targetWeeklyConvs: 25,
  },
  arbitrage: {
    label: "Content & Search Arbitrage (Illustrative Scenario)",
    payoutOrCpa: 0.45,
    widgetCtrPct: 0.55,
    preLanderCtrPct: 65,
    offerCvrPct: 58,
    targetMarginPct: 20,
    targetWeeklyConvs: 500,
  },
};

export default function VerticalEpcCalculatorClient() {
  const [vertical, setVertical] = useState<VerticalKey>("ecommerce");
  const [desktopSharePct, setDesktopSharePct] = useState<number>(45);
  const [payoutOrCpa, setPayoutOrCpa] = useState<number>(68);
  const [widgetCtrPct, setWidgetCtrPct] = useState<number>(0.35);
  const [preLanderCtrPct, setPreLanderCtrPct] = useState<number>(32);
  const [offerCvrPct, setOfferCvrPct] = useState<number>(2.8);
  const [targetMarginPct, setTargetMarginPct] = useState<number>(20);
  const [targetWeeklyConvs, setTargetWeeklyConvs] = useState<number>(50);
  const [calcRun, setCalcRun] = useState<number>(1);

  const handlePresetChange = (key: VerticalKey) => {
    setVertical(key);
    const p = SCENARIO_PRESETS[key];
    setPayoutOrCpa(p.payoutOrCpa);
    setWidgetCtrPct(p.widgetCtrPct);
    setPreLanderCtrPct(p.preLanderCtrPct);
    setOfferCvrPct(p.offerCvrPct);
    setTargetMarginPct(p.targetMarginPct);
    setTargetWeeklyConvs(p.targetWeeklyConvs);
    setCalcRun((r) => r + 1);
  };

  const safeDesktop = Math.min(100, Math.max(0, desktopSharePct));
  const mobileSharePct = 100 - safeDesktop;
  const safePayout = Math.max(0.05, payoutOrCpa);
  const safeWidgetCtr = Math.max(0.02, widgetCtrPct) / 100;
  const safeLpCtr = Math.min(100, Math.max(1, preLanderCtrPct)) / 100;
  const safeCvr = Math.min(100, Math.max(0.05, offerCvrPct)) / 100;
  const safeMargin = Math.min(80, Math.max(0, targetMarginPct)) / 100;
  const safeWeeklyConvs = Math.max(5, targetWeeklyConvs);

  // Device modifier on end-to-end conversion rate (illustrative desktop intent weight: Desktop 1.15x vs Mobile 0.90x relative to baseline)
  const deviceQualityMultiplier = (safeDesktop * 1.15 + mobileSharePct * 0.9) / 100;

  // End-to-End Click-to-Conversion Rate = LP_CTR * Offer_CVR * Device_Multiplier
  const netClickToConvRate = safeLpCtr * safeCvr * deviceQualityMultiplier;

  // Breakeven EPC ($) = Payout * Net_Click_to_Conv_Rate
  const breakevenEpc = safePayout * netClickToConvRate;

  // Maximum Profitable CPC Bid ($) = Breakeven_EPC * (1 - Target_Margin)
  const maxProfitableCpc = breakevenEpc * (1 - safeMargin);

  // Equivalent Widget eCPM at Breakeven & Target Margin = CPC * Widget_CTR * 1000
  const breakevenEcpm = breakevenEpc * safeWidgetCtr * 1000;
  const targetBidEcpm = maxProfitableCpc * safeWidgetCtr * 1000;

  // Learning Phase Budget (1-week window & 48-hour untouched floor)
  const oneWeekLearningBudget = safeWeeklyConvs * safePayout * (1 - safeMargin);
  const min48HourUntouchedFloor = (oneWeekLearningBudget / 7) * 2;

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-7 shadow-sm my-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
          Interactive Native Ad Vertical EPC, Max CPC &amp; Learning Budget Simulator
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
          Adjustable Illustrative Scenario Presets
        </span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">
        Calculate Breakeven EPC, Max Profitable CPC Bid &amp; 7-Day Learning Phase Budget by Vertical
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="verticalSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Select Illustrative Vertical Scenario Preset
          </label>
          <select
            id="verticalSelect"
            value={vertical}
            onChange={(e) => handlePresetChange(e.target.value as VerticalKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="finance">Finance &amp; Fintech Lead Gen (Illustrative)</option>
            <option value="ecommerce">Direct-to-Consumer E-Commerce (Illustrative)</option>
            <option value="health">Nutraceuticals &amp; Health VSL (Illustrative)</option>
            <option value="b2b_saas">B2B SaaS Gated Tool / MQL (Illustrative)</option>
            <option value="arbitrage">Content &amp; Search Arbitrage (Illustrative)</option>
          </select>
        </div>

        <div>
          <label htmlFor="desktopShareInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Device Split: Desktop Share ({safeDesktop}% Desktop / {mobileSharePct}% Mobile)
          </label>
          <input
            id="desktopShareInput"
            type="number"
            min={0}
            max={100}
            step={5}
            value={desktopSharePct}
            onChange={(e) => setDesktopSharePct(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="payoutInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Target CPA / Offer Payout ($)
          </label>
          <input
            id="payoutInput"
            type="number"
            min={0.05}
            max={2000}
            step={1}
            value={payoutOrCpa}
            onChange={(e) => setPayoutOrCpa(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="widgetCtrInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Native Widget CTR (%)
          </label>
          <input
            id="widgetCtrInput"
            type="number"
            min={0.05}
            max={5}
            step={0.05}
            value={widgetCtrPct}
            onChange={(e) => setWidgetCtrPct(Number(e.target.value) || 0.25)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="lpCtrInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Pre-Lander Click-Through (LP CTR %)
          </label>
          <input
            id="lpCtrInput"
            type="number"
            min={1}
            max={100}
            step={1}
            value={preLanderCtrPct}
            onChange={(e) => setPreLanderCtrPct(Number(e.target.value) || 25)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label htmlFor="offerCvrInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Checkout / Lead Form CVR (%)
          </label>
          <input
            id="offerCvrInput"
            type="number"
            min={0.1}
            max={100}
            step={0.1}
            value={offerCvrPct}
            onChange={(e) => setOfferCvrPct(Number(e.target.value) || 2)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="marginInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Target Net Profit Margin (%)
          </label>
          <input
            id="marginInput"
            type="number"
            min={0}
            max={75}
            step={5}
            value={targetMarginPct}
            onChange={(e) => setTargetMarginPct(Number(e.target.value) || 20)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="weeklyConvsInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Target 7-Day Learning Conversions
          </label>
          <input
            id="weeklyConvsInput"
            type="number"
            min={10}
            max={2000}
            step={5}
            value={targetWeeklyConvs}
            onChange={(e) => setTargetWeeklyConvs(Number(e.target.value) || 30)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCalcRun((r) => r + 1)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer mb-5"
      >
        Calculate Exact Breakeven EPC, Max Profitable CPC &amp; Learning Budget
      </button>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Active Scenario Model ({SCENARIO_PRESETS[vertical].label}):
          </span>
          <strong className="text-lg sm:text-xl font-extrabold text-slate-900">
            Net Click-to-Conversion Rate: {(netClickToConvRate * 100).toFixed(2)}% (Run #{calcRun})
          </strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-slate-700 uppercase">
              1. Breakeven EPC (0% Margin Ceiling)
            </div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              ${breakevenEpc.toFixed(3)} / click
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Breakeven Widget eCPM: ${breakevenEcpm.toFixed(2)} (@ {widgetCtrPct}% CTR)
            </div>
          </div>

          <div className="bg-white border border-emerald-300 rounded-lg p-3.5">
            <div className="text-xs font-bold text-emerald-800 uppercase">
              2. Max Profitable CPC Bid ({targetMarginPct}% Margin)
            </div>
            <div className="text-xl font-extrabold text-emerald-900 mt-1">
              ${maxProfitableCpc.toFixed(3)} / click
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Target Auction eCPM: ${targetBidEcpm.toFixed(2)}
            </div>
          </div>

          <div className="bg-white border border-indigo-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-indigo-800 uppercase">
              3. Learning Phase Budget (48h / 7-Day)
            </div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              ${Math.round(oneWeekLearningBudget).toLocaleString("en-US")} / 1-Wk
            </div>
            <div className="text-xs text-slate-600 mt-1">
              48h No-Touch Floor: ${Math.round(min48HourUntouchedFloor).toLocaleString("en-US")} ({safeWeeklyConvs} conv/wk)
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
          <strong>Bidding Strategy Guidance:</strong> To lock in a{" "}
          <strong>{targetMarginPct}% net margin</strong> on a{" "}
          <strong>${safePayout.toFixed(2)} payout/CPA</strong>, cap your Fixed Bid or Enhanced CPC
          baseline at <strong>${maxProfitableCpc.toFixed(3)}</strong> (strictly below your{" "}
          <strong>${breakevenEpc.toFixed(3)} Breakeven EPC</strong>). When running{" "}
          <strong>Outbrain Conversion Bid Strategy</strong> (Target CPA, Target ROAS, or Max
          Conversions) or <strong>Taboola Realize Maximize Conversions (SmartBid)</strong>, budget{" "}
          <strong>${Math.round(oneWeekLearningBudget).toLocaleString("en-US")}</strong> for the up
          to 1-week learning phase and wait at least <strong>48 hours</strong> ($
          {Math.round(min48HourUntouchedFloor).toLocaleString("en-US")} spend) before making manual
          bid or publisher changes.
        </div>
      </div>
    </div>
  );
}
