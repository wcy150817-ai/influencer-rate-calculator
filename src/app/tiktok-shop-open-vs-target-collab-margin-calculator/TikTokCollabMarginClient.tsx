"use client";

import React, { useState } from "react";

export default function TikTokCollabMarginClient() {
  const [retailPrice, setRetailPrice] = useState<number>(38);
  const [unitCogs, setUnitCogs] = useState<number>(8.5);
  const [sampleShipCost, setSampleShipCost] = useState<number>(4.75);
  const [samplesPerMonth, setSamplesPerMonth] = useState<number>(120);
  const [openPostRatePct, setOpenPostRatePct] = useState<number>(45);
  const [targetPostRatePct, setTargetPostRatePct] = useState<number>(78);
  const [openCommPct, setOpenCommPct] = useState<number>(12);
  const [targetCommPct, setTargetCommPct] = useState<number>(18);
  const [referralFeePct, setReferralFeePct] = useState<number>(6);
  const [gmvPerPostedVideo, setGmvPerPostedVideo] = useState<number>(420);
  const [calcRun, setCalcRun] = useState<number>(1);

  const safePrice = Math.max(5, retailPrice);
  const safeCogs = Math.max(0.5, unitCogs);
  const safeShip = Math.max(0, sampleShipCost);
  const safeSamples = Math.max(1, samplesPerMonth);
  const safeOpenPost = Math.min(100, Math.max(5, openPostRatePct)) / 100;
  const safeTargetPost = Math.min(100, Math.max(5, targetPostRatePct)) / 100;
  const safeOpenComm = Math.min(50, Math.max(1, openCommPct)) / 100;
  const safeTargetComm = Math.min(50, Math.max(1, targetCommPct)) / 100;
  const safeRefFee = Math.min(20, Math.max(1, referralFeePct)) / 100;
  const safeGmvPerVid = Math.max(0, gmvPerPostedVideo);

  // Sample unit cost
  const costPerSample = safeCogs + safeShip;
  const totalSampleBudget = costPerSample * safeSamples;

  // Open Collaboration math
  const openPostedVideos = safeSamples * safeOpenPost;
  const openUnpostedSamples = safeSamples - openPostedVideos;
  const openWriteOffLoss = openUnpostedSamples * costPerSample;
  const openCostPerLiveVideo = openPostedVideos > 0 ? totalSampleBudget / openPostedVideos : 0;

  const openUnitRefFee = safePrice * safeRefFee;
  const openUnitCreatorComm = safePrice * safeOpenComm;
  const openUnitMarginDollar =
    safePrice - safeCogs - safeShip - openUnitRefFee - openUnitCreatorComm;
  const openUnitMarginRatio = safePrice > 0 ? openUnitMarginDollar / safePrice : 0;

  const openTotalGmv = openPostedVideos * safeGmvPerVid;
  const openGrossContribution = openTotalGmv * openUnitMarginRatio;
  const openNetProfitAfterSamples = openGrossContribution - totalSampleBudget;
  const openBreakevenGmvPerSample =
    openUnitMarginRatio > 0 ? costPerSample / openUnitMarginRatio : 0;

  // Target Collaboration math (assuming vetted creators drive 1.35x GMV per posted video or same baseline adjustable)
  const targetPostedVideos = safeSamples * safeTargetPost;
  const targetUnpostedSamples = safeSamples - targetPostedVideos;
  const targetWriteOffLoss = targetUnpostedSamples * costPerSample;
  const targetCostPerLiveVideo =
    targetPostedVideos > 0 ? totalSampleBudget / targetPostedVideos : 0;

  const targetUnitRefFee = safePrice * safeRefFee;
  const targetUnitCreatorComm = safePrice * safeTargetComm;
  const targetUnitMarginDollar =
    safePrice - safeCogs - safeShip - targetUnitRefFee - targetUnitCreatorComm;
  const targetUnitMarginRatio = safePrice > 0 ? targetUnitMarginDollar / safePrice : 0;

  const targetTotalGmv = targetPostedVideos * safeGmvPerVid;
  const targetGrossContribution = targetTotalGmv * targetUnitMarginRatio;
  const targetNetProfitAfterSamples = targetGrossContribution - totalSampleBudget;
  const targetBreakevenGmvPerSample =
    targetUnitMarginRatio > 0 ? costPerSample / targetUnitMarginRatio : 0;

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-7 shadow-sm my-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
          Interactive TikTok Shop Sample Seeding &amp; Collab Margin Simulator
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
          6.0% Referral Fee &amp; Sample Write-Off Model
        </span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">
        Compare Open Collaboration vs Target Collaboration Sample Write-Offs, Cost Per Live Video &amp; Net Margin
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <label htmlFor="retailPriceInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Product Retail Price ($ AOV)
          </label>
          <input
            id="retailPriceInput"
            type="number"
            min={5}
            max={500}
            step={1}
            value={retailPrice}
            onChange={(e) => setRetailPrice(Number(e.target.value) || 20)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="unitCogsInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Landed Unit COGS ($)
          </label>
          <input
            id="unitCogsInput"
            type="number"
            min={0.5}
            max={250}
            step={0.5}
            value={unitCogs}
            onChange={(e) => setUnitCogs(Number(e.target.value) || 5)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="sampleShipInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Outbound Sample Shipping ($)
          </label>
          <input
            id="sampleShipInput"
            type="number"
            min={0}
            max={50}
            step={0.25}
            value={sampleShipCost}
            onChange={(e) => setSampleShipCost(Number(e.target.value) || 4)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="samplesMonthInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Samples Shipped / Month
          </label>
          <input
            id="samplesMonthInput"
            type="number"
            min={5}
            max={5000}
            step={10}
            value={samplesPerMonth}
            onChange={(e) => setSamplesPerMonth(Number(e.target.value) || 50)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="openPostInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Open Collab Posting Rate (%)
          </label>
          <input
            id="openPostInput"
            type="number"
            min={5}
            max={100}
            step={1}
            value={openPostRatePct}
            onChange={(e) => setOpenPostRatePct(Number(e.target.value) || 40)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="targetPostInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Target Collab Posting Rate (%)
          </label>
          <input
            id="targetPostInput"
            type="number"
            min={5}
            max={100}
            step={1}
            value={targetPostRatePct}
            onChange={(e) => setTargetPostRatePct(Number(e.target.value) || 75)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="gmvPerVidInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Avg. GMV per Posted Video ($)
          </label>
          <input
            id="gmvPerVidInput"
            type="number"
            min={20}
            max={25000}
            step={20}
            value={gmvPerPostedVideo}
            onChange={(e) => setGmvPerPostedVideo(Number(e.target.value) || 250)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label htmlFor="openCommInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Open Plan Commission (%)
          </label>
          <input
            id="openCommInput"
            type="number"
            min={1}
            max={40}
            step={1}
            value={openCommPct}
            onChange={(e) => setOpenCommPct(Number(e.target.value) || 10)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="targetCommInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Target Plan Commission (%)
          </label>
          <input
            id="targetCommInput"
            type="number"
            min={1}
            max={40}
            step={1}
            value={targetCommPct}
            onChange={(e) => setTargetCommPct(Number(e.target.value) || 18)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="refFeeInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            TikTok Referral Fee (%)
          </label>
          <input
            id="refFeeInput"
            type="number"
            min={1}
            max={15}
            step={0.5}
            value={referralFeePct}
            onChange={(e) => setReferralFeePct(Number(e.target.value) || 6)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCalcRun((r) => r + 1)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer mb-5"
      >
        Calculate Sample COGS Write-Off, Cost Per Live Video &amp; Net Margin
      </button>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Total Monthly Sample Seeding Outlay ({safeSamples} units @ ${costPerSample.toFixed(2)}/sample):
          </span>
          <strong className="text-xl sm:text-2xl font-extrabold text-slate-900">
            ${totalSampleBudget.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Run #{calcRun})
          </strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
          <div className="bg-white border border-rose-200 rounded-lg p-4">
            <div className="text-xs font-bold text-rose-800 uppercase">
              1. Open Collaboration ({openPostRatePct}% Post Rate | {openCommPct}% CPS)
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              Cost/Live Video: ${openCostPerLiveVideo.toFixed(2)} | Net Profit: $
              {Math.round(openNetProfitAfterSamples).toLocaleString("en-US")}
            </div>
            <ul className="text-xs text-slate-600 mt-2 space-y-1">
              <li>
                &bull; <strong>Ghosted Sample Write-Off Loss:</strong> $
                {openWriteOffLoss.toFixed(2)} ({Math.round(openUnpostedSamples)} unposted units)
              </li>
              <li>
                &bull; <strong>Unit Contribution Margin:</strong> ${openUnitMarginDollar.toFixed(2)}/unit (
                {(openUnitMarginRatio * 100).toFixed(1)}% of retail)
              </li>
              <li>
                &bull; <strong>Min. Breakeven GMV / Sample:</strong> $
                {openBreakevenGmvPerSample.toFixed(2)} GMV required per sample shipped
              </li>
            </ul>
          </div>

          <div className="bg-white border border-emerald-300 rounded-lg p-4">
            <div className="text-xs font-bold text-emerald-800 uppercase">
              2. Target Collaboration ({targetPostRatePct}% Post Rate | {targetCommPct}% CPS)
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              Cost/Live Video: ${targetCostPerLiveVideo.toFixed(2)} | Net Profit: $
              {Math.round(targetNetProfitAfterSamples).toLocaleString("en-US")}
            </div>
            <ul className="text-xs text-slate-600 mt-2 space-y-1">
              <li>
                &bull; <strong>Ghosted Sample Write-Off Loss:</strong> $
                {targetWriteOffLoss.toFixed(2)} ({Math.round(targetUnpostedSamples)} unposted units)
              </li>
              <li>
                &bull; <strong>Unit Contribution Margin:</strong> $
                {targetUnitMarginDollar.toFixed(2)}/unit (
                {(targetUnitMarginRatio * 100).toFixed(1)}% of retail)
              </li>
              <li>
                &bull; <strong>Min. Breakeven GMV / Sample:</strong> $
                {targetBreakevenGmvPerSample.toFixed(2)} GMV required per sample shipped
              </li>
            </ul>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
          <strong>Seeding Margin Verdict:</strong> Even though Target Collaboration pays a higher
          creator commission ({targetCommPct}% vs. {openCommPct}%), raising your sample fulfillment
          posting rate from <strong>{openPostRatePct}% to {targetPostRatePct}%</strong> cuts your
          ghosted sample write-off loss from <strong>${openWriteOffLoss.toFixed(2)}</strong> down to{" "}
          <strong>${targetWriteOffLoss.toFixed(2)}</strong>, lowering your effective seeding cost per
          live shoppable video from <strong>${openCostPerLiveVideo.toFixed(2)}</strong> to{" "}
          <strong>${targetCostPerLiveVideo.toFixed(2)}</strong> and generating{" "}
          <strong>
            ${Math.round(targetNetProfitAfterSamples - openNetProfitAfterSamples).toLocaleString("en-US")}
          </strong>{" "}
          in additional monthly net contribution profit.
        </div>
      </div>
    </div>
  );
}
