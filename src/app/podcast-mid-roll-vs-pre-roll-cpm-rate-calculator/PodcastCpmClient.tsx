"use client";

import React, { useState } from "react";

type SlotTypeKey = "preroll_30" | "midroll_60" | "postroll_30";
type DeliveryTypeKey = "dai_dynamic" | "baked_in";
type FlightLengthKey = "1" | "4" | "8" | "12";

const SLOT_CONFIGS: Record<SlotTypeKey, { label: string; defaultCpm: number }> = {
  preroll_30: {
    label: "15–30s Pre-Roll Opening Ad Read ($18 Base CPM)",
    defaultCpm: 18,
  },
  midroll_60: {
    label: "60s Host-Read Mid-Roll Core Slot ($26 Base CPM)",
    defaultCpm: 26,
  },
  postroll_30: {
    label: "15–30s Post-Roll Outro Slot ($12 Base CPM)",
    defaultCpm: 12,
  },
};

const FLIGHT_DISCOUNTS: Record<FlightLengthKey, { episodes: number; discountPct: number; label: string }> = {
  "1": { episodes: 1, discountPct: 0, label: "1 Episode — Single Test Drop (0% Discount)" },
  "4": { episodes: 4, discountPct: 0.08, label: "4 Episodes — Monthly Flight (-8% Volume Discount)" },
  "8": { episodes: 8, discountPct: 0.14, label: "8 Episodes — Bi-Monthly Flight (-14% Volume Discount)" },
  "12": { episodes: 12, discountPct: 0.2, label: "12 Episodes — Quarterly Anchor (-20% Volume Discount)" },
};

export default function PodcastCpmClient() {
  const [downloads30d, setDownloads30d] = useState<number>(25000);
  const [slotKey, setSlotKey] = useState<SlotTypeKey>("midroll_60");
  const [customCpm, setCustomCpm] = useState<number>(26);
  const [deliveryKey, setDeliveryKey] = useState<DeliveryTypeKey>("baked_in");
  const [flightKey, setFlightKey] = useState<FlightLengthKey>("4");
  const [youtubeBonusViews, setYoutubeBonusViews] = useState<number>(12000);
  const [contributionPerOrder, setContributionPerOrder] = useState<number>(65);
  const [attributionMultiplier, setAttributionMultiplier] = useState<number>(2.5);
  const [calcRun, setCalcRun] = useState<number>(1);

  const handleSlotChange = (key: SlotTypeKey) => {
    setSlotKey(key);
    setCustomCpm(SLOT_CONFIGS[key].defaultCpm);
    setCalcRun((r) => r + 1);
  };

  const safeDownloads = Math.max(500, downloads30d);
  const safeCpm = Math.max(4, customCpm);
  const safeYtViews = Math.max(0, youtubeBonusViews);
  const safeMarginPerOrder = Math.max(5, contributionPerOrder);
  const safeAttrMult = Math.max(1.0, attributionMultiplier);

  const flightInfo = FLIGHT_DISCOUNTS[flightKey];
  const isBakedIn = deliveryKey === "baked_in";

  // Baked-in ads typically carry a +20% rate premium over capped DAI, but generate +35% lifetime evergreen back-catalog downloads over 12 months
  const deliveryRateMultiplier = isBakedIn ? 1.2 : 1.0;
  const lifetimeAudioImpressionsPerEp = isBakedIn ? safeDownloads * 1.35 : safeDownloads;

  // YouTube video podcast simulcast value (valued at 50% of audio CPM when bundled, or +$12 CPM on bonus video views)
  const youtubeSimulcastAdderPerEp = (safeYtViews / 1000) * 12;

  // Gross & Discounted Per-Episode Rate
  const grossAudioRatePerEp = (safeDownloads / 1000) * safeCpm * deliveryRateMultiplier;
  const grossCombinedRatePerEp = grossAudioRatePerEp + youtubeSimulcastAdderPerEp;
  const netRatePerEpisode = grossCombinedRatePerEp * (1 - flightInfo.discountPct);
  const totalFlightBudget = netRatePerEpisode * flightInfo.episodes;

  // Total Blended Impressions (Lifetime Audio + YouTube Video Views across flight)
  const totalImpressionsPerEp = lifetimeAudioImpressionsPerEp + safeYtViews;
  const totalFlightImpressions = totalImpressionsPerEp * flightInfo.episodes;
  const blendedEcpm =
    totalFlightImpressions > 0 ? (totalFlightBudget / totalFlightImpressions) * 1000 : 0;

  // Breakeven Conversions
  const totalBreakevenCustomers = totalFlightBudget / safeMarginPerOrder;
  const directPromoCodeConversionsNeeded = totalBreakevenCustomers / safeAttrMult;

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 sm:p-7 shadow-sm my-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
          Interactive Podcast CPM, DAI vs Baked-In &amp; Breakeven ROI Simulator
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
          IAB v2.2 Certified Download Model
        </span>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">
        Calculate Per-Episode Rates, Multi-Episode Flight Budgets, Blended eCPM &amp; Breakeven Conversions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="downloadsInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            IAB 30-Day Downloads / Episode
          </label>
          <input
            id="downloadsInput"
            type="number"
            min={500}
            max={2000000}
            step={500}
            value={downloads30d}
            onChange={(e) => setDownloads30d(Number(e.target.value) || 5000)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="slotSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Ad Slot Placement
          </label>
          <select
            id="slotSelect"
            value={slotKey}
            onChange={(e) => handleSlotChange(e.target.value as SlotTypeKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="preroll_30">15–30s Pre-Roll Opening ($18 CPM)</option>
            <option value="midroll_60">60s Host-Read Mid-Roll ($26 CPM)</option>
            <option value="postroll_30">15–30s Post-Roll Outro ($12 CPM)</option>
          </select>
        </div>

        <div>
          <label htmlFor="cpmBidInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Negotiated Audio Base CPM ($)
          </label>
          <input
            id="cpmBidInput"
            type="number"
            min={5}
            max={120}
            step={1}
            value={customCpm}
            onChange={(e) => setCustomCpm(Number(e.target.value) || 20)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="deliverySelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Ad Delivery Mechanism (DAI vs. Baked-In)
          </label>
          <select
            id="deliverySelect"
            value={deliveryKey}
            onChange={(e) => setDeliveryKey(e.target.value as DeliveryTypeKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="baked_in">
              Baked-In / Embedded Audio (+20% Rate | +35% Evergreen Tail)
            </option>
            <option value="dai_dynamic">
              Dynamic Ad Insertion (DAI) — Capped Impression Flight (1.0x)
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="flightSelect" className="block text-xs font-bold text-slate-700 mb-1.5">
            Multi-Episode Flight Commitment
          </label>
          <select
            id="flightSelect"
            value={flightKey}
            onChange={(e) => setFlightKey(e.target.value as FlightLengthKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 bg-white"
          >
            <option value="1">1 Episode — Single Test Drop (0% Discount)</option>
            <option value="4">4 Episodes — Monthly Flight (-8% Discount)</option>
            <option value="8">8 Episodes — Bi-Monthly Flight (-14% Discount)</option>
            <option value="12">12 Episodes — Quarterly Anchor (-20% Discount)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label htmlFor="ytViewsInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            YouTube Video Simulcast Views / Ep
          </label>
          <input
            id="ytViewsInput"
            type="number"
            min={0}
            max={2000000}
            step={1000}
            value={youtubeBonusViews}
            onChange={(e) => setYoutubeBonusViews(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="marginOrderInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Contribution Margin / Customer ($)
          </label>
          <input
            id="marginOrderInput"
            type="number"
            min={5}
            max={5000}
            step={5}
            value={contributionPerOrder}
            onChange={(e) => setContributionPerOrder(Number(e.target.value) || 50)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="attrMultInput" className="block text-xs font-bold text-slate-700 mb-1.5">
            Promo-Code Halo Multiplier (e.g. 2.5x)
          </label>
          <input
            id="attrMultInput"
            type="number"
            min={1.0}
            max={5.0}
            step={0.1}
            value={attributionMultiplier}
            onChange={(e) => setAttributionMultiplier(Number(e.target.value) || 2.0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCalcRun((r) => r + 1)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition cursor-pointer mb-5"
      >
        Calculate Per-Episode Podcast Rate, Total Flight Budget &amp; Breakeven Conversions
      </button>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Total {flightInfo.episodes}-Episode Flight Budget ({(flightInfo.discountPct * 100).toFixed(0)}%
            Discount Applied &bull; Run #{calcRun}):
          </span>
          <strong className="text-2xl font-extrabold text-slate-900">
            ${Math.round(totalFlightBudget).toLocaleString("en-US")} (${Math.round(netRatePerEpisode).toLocaleString("en-US")}{" "}
            / episode)
          </strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-slate-600 uppercase">
              1. Net Per-Episode Rate
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              ${Math.round(netRatePerEpisode).toLocaleString("en-US")} / ep
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Audio: ${Math.round(grossAudioRatePerEp).toLocaleString("en-US")} + YT Simulcast: $
              {Math.round(youtubeSimulcastAdderPerEp).toLocaleString("en-US")}
            </div>
          </div>

          <div className="bg-white border border-emerald-300 rounded-lg p-3.5">
            <div className="text-xs font-bold text-emerald-800 uppercase">
              2. Blended Multi-Channel eCPM
            </div>
            <div className="text-lg font-extrabold text-emerald-900 mt-1">
              ${blendedEcpm.toFixed(2)} eCPM
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {Math.round(totalFlightImpressions).toLocaleString("en-US")} total audio + video views
            </div>
          </div>

          <div className="bg-white border border-indigo-200 rounded-lg p-3.5">
            <div className="text-xs font-bold text-indigo-800 uppercase">
              3. Breakeven Orders Needed
            </div>
            <div className="text-lg font-extrabold text-slate-900 mt-1">
              {Math.ceil(totalBreakevenCustomers)} Total ({Math.ceil(directPromoCodeConversionsNeeded)} Promo Code)
            </div>
            <div className="text-xs text-slate-600 mt-1">
              At ${safeMarginPerOrder}/order &amp; {safeAttrMult.toFixed(1)}x attribution halo
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-indigo-950 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2.5 leading-relaxed">
          <strong>Podcast Media Buying Verdict:</strong> Booking a{" "}
          <strong>{flightInfo.episodes}-episode flight</strong> at{" "}
          <strong>${Math.round(netRatePerEpisode).toLocaleString("en-US")}/episode</strong>{" "}
          (including {safeYtViews.toLocaleString("en-US")} YouTube simulcast views and{" "}
          {isBakedIn ? "+35% evergreen baked-in back-catalog listens" : "capped DAI delivery"}) drives
          your true <strong>Blended eCPM down to ${blendedEcpm.toFixed(2)}</strong>. You only need{" "}
          <strong>{Math.ceil(directPromoCodeConversionsNeeded)} tracked promo-code redemptions</strong>{" "}
          across the entire flight ({Math.ceil(totalBreakevenCustomers)} total orders at a{" "}
          {safeAttrMult.toFixed(1)}x search/direct halo multiplier) to break even on contribution margin.
        </div>
      </div>
    </div>
  );
}
